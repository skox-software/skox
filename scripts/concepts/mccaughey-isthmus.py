"""
Madison isthmus scene for the McCaughey Properties concept.

Run:  blender -b -P build.py -- <osm_dir> <out_dir> [--test FRAME] [--res W H]

Builds the isthmus from OpenStreetMap (lakes, ~18k building footprints, streets),
lights it at blue hour, keyframes a camera path over the two neighbourhoods,
renders a WebP frame sequence and writes the per-frame screen position of each
pin so the web page can lay crisp HTML labels over the renders.

Units: 1 Blender unit = 10 m. Origin = Wisconsin State Capitol.
"""
import bpy, bmesh, json, math, os, sys, random
from mathutils import Vector
from bpy_extras.object_utils import world_to_camera_view

argv = sys.argv[sys.argv.index("--") + 1:]
OSM, OUT = argv[0], argv[1]
TEST = int(argv[argv.index("--test") + 1]) if "--test" in argv else None
RES = (int(argv[argv.index("--res") + 1]), int(argv[argv.index("--res") + 2])) if "--res" in argv else (1280, 720)
os.makedirs(OUT, exist_ok=True)

LAT0, LON0 = 43.0746917, -89.3841658
KX = math.cos(math.radians(LAT0)) * 111320 / 10
KY = 110574 / 10


def xy(lat, lon):
    return ((lon - LON0) * KX, (lat - LAT0) * KY)


PINS = {
    "capitol": (43.0746917, -89.3841658, 9.4),
    "elmside": (43.0936854, -89.3419609, 0.9),
    "erin": (43.0598114, -89.4001035, 0.9),
}
HOME_IDS = {678050526: "elmside", 433662539: "erin"}
CAPITOL_ID = 26720999

# ---------------------------------------------------------------- reset
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
random.seed(7)


def mat(name, color, rough=0.8, emit=None, strength=0.0, metallic=0.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    p = m.node_tree.nodes["Principled BSDF"]
    p.inputs["Base Color"].default_value = (*color, 1)
    p.inputs["Roughness"].default_value = rough
    p.inputs["Metallic"].default_value = metallic
    if emit:
        p.inputs["Emission Color"].default_value = (*emit, 1)
        p.inputs["Emission Strength"].default_value = strength
    return m


M_GROUND = mat("ground", (0.085, 0.085, 0.095), 0.95)
M_WATER = mat("water", (0.004, 0.012, 0.03), 0.12, (0.06, 0.14, 0.32), 0.12)
M_BUILD = mat("build", (0.62, 0.6, 0.57), 0.7)
M_CAP = mat("capitol", (0.85, 0.83, 0.78), 0.5, (1.0, 0.85, 0.6), 0.35)
M_HOME = mat("home", (1.0, 0.4, 0.1), 0.5, (1.0, 0.32, 0.05), 5.0)
M_ROAD = mat("road", (0.0, 0.0, 0.0), 1.0, (1.0, 0.5, 0.18), 1.8)
M_BEAM = mat("beam", (0, 0, 0), 1.0, (1.0, 0.3, 0.04), 5.0)


def obj_from(name, verts, faces, material):
    me = bpy.data.meshes.new(name)
    me.from_pydata(verts, [], faces)
    me.validate()
    ob = bpy.data.objects.new(name, me)
    scene.collection.objects.link(ob)
    me.materials.append(material)
    return ob


# ---------------------------------------------------------------- lakes
def stitch(segments):
    """Join open way segments into closed rings by matching endpoints."""
    segs = [s[:] for s in segments if len(s) > 1]
    rings = []
    while segs:
        ring = segs.pop(0)
        changed = True
        while ring[0] != ring[-1] and changed:
            changed = False
            for i, s in enumerate(segs):
                if s[0] == ring[-1]:
                    ring += s[1:]
                elif s[-1] == ring[-1]:
                    ring += s[::-1][1:]
                elif s[-1] == ring[0]:
                    ring = s[:-1] + ring
                elif s[0] == ring[0]:
                    ring = s[::-1][:-1] + ring
                else:
                    continue
                segs.pop(i)
                changed = True
                break
        rings.append(ring)
    return rings


water = json.load(open(os.path.join(OSM, "water.json")))
seen = set()
for e in water["elements"]:
    name = e.get("tags", {}).get("name")
    if e["type"] == "relation":
        segs = [[(p["lat"], p["lon"]) for p in m["geometry"]]
                for m in e["members"] if m.get("role") == "outer" and "geometry" in m]
        rings = stitch(segs)
    else:
        rings = [[(p["lat"], p["lon"]) for p in e["geometry"]]]
    for ring in rings:
        if len(ring) < 4:
            continue
        key = (name, round(ring[0][0], 4), len(ring))
        if key in seen:
            continue
        seen.add(key)
        pts = [xy(*p) for p in ring[:-1] if True]
        v = [(x, y, 0.25) for x, y in pts]
        obj_from(f"lake_{name}", v, [list(range(len(v)))], M_WATER)

bpy.ops.mesh.primitive_plane_add(size=40000, location=(0, 0, 0))
bpy.context.object.data.materials.append(M_GROUND)

# ---------------------------------------------------------------- city
city = json.load(open(os.path.join(OSM, "city.json")))
bv, bf = [], []
roads = []


def height(tags):
    h = tags.get("height")
    if h:
        try:
            return float(h.split()[0].replace("m", ""))
        except ValueError:
            pass
    lv = tags.get("building:levels")
    if lv:
        try:
            return float(lv.split(";")[0]) * 3.3 + 1
        except ValueError:
            pass
    kind = tags.get("building")
    base = {"house": 7.5, "detached": 7.5, "garage": 3.2, "garages": 3.2, "shed": 2.6,
            "apartments": 13, "commercial": 9, "retail": 6, "university": 18,
            "office": 16, "hospital": 22, "church": 14, "dormitory": 30,
            "residential": 9}.get(kind, 7.5)
    return base * random.uniform(0.85, 1.2)


homes = {}
for e in city["elements"]:
    tags = e.get("tags", {})
    g = [(p["lat"], p["lon"]) for p in e.get("geometry", [])]
    if "highway" in tags:
        roads.append((tags["highway"], [xy(*p) for p in g]))
        continue
    if len(g) < 4 or g[0] != g[-1]:
        continue
    pts = [xy(*p) for p in g[:-1]]
    if e["id"] in HOME_IDS:
        homes[HOME_IDS[e["id"]]] = pts
        continue
    if e["id"] == CAPITOL_ID:
        cap_pts = pts
        continue
    h = height(tags) / 10
    n = len(pts)
    o = len(bv)
    bv += [(x, y, 0) for x, y in pts] + [(x, y, h) for x, y in pts]
    bf.append([o + n + i for i in range(n)])
    bf += [[o + i, o + (i + 1) % n, o + n + (i + 1) % n, o + n + i] for i in range(n)]
obj_from("buildings", bv, bf, M_BUILD)


def prism(name, pts, h, material, z0=0.0):
    n = len(pts)
    v = [(x, y, z0) for x, y in pts] + [(x, y, z0 + h) for x, y in pts]
    f = [list(range(n, 2 * n))] + [[i, (i + 1) % n, n + (i + 1) % n, n + i] for i in range(n)]
    return obj_from(name, v, f, material)


# The capitol: the footprint as the wings, then drum, dome and lantern.
prism("capitol_wings", cap_pts, 2.6, M_CAP)
bpy.ops.mesh.primitive_cylinder_add(vertices=48, radius=2.2, depth=2.8, location=(0, 0, 2.6 + 1.4))
bpy.context.object.data.materials.append(M_CAP)
bpy.ops.mesh.primitive_cylinder_add(vertices=48, radius=1.75, depth=1.2, location=(0, 0, 5.6))
bpy.context.object.data.materials.append(M_CAP)
bpy.ops.mesh.primitive_uv_sphere_add(segments=48, ring_count=24, radius=1.75, location=(0, 0, 6.2))
dome = bpy.context.object
dome.scale.z = 1.45
dome.data.materials.append(M_CAP)
bpy.ops.mesh.primitive_cylinder_add(vertices=24, radius=0.35, depth=0.8, location=(0, 0, 8.7))
bpy.context.object.data.materials.append(M_CAP)
bpy.ops.mesh.primitive_cone_add(vertices=24, radius1=0.3, depth=0.4, location=(0, 0, 9.3))
bpy.context.object.data.materials.append(M_CAP)
# Capitol is lit at night; a soft light just above the dome sells it.
bpy.ops.object.light_add(type="POINT", location=(0, 0, 11))
bpy.context.object.data.energy = 2.0e5
bpy.context.object.data.color = (1.0, 0.82, 0.6)
bpy.context.object.data.shadow_soft_size = 3

# The two homes: glowing, with a light beam and a halo light.
for key, pts in homes.items():
    prism(f"home_{key}", pts, 0.8, M_HOME)
    lat, lon, _ = PINS[key]
    x, y = xy(lat, lon)
    bpy.ops.mesh.primitive_cylinder_add(vertices=16, radius=0.12, depth=40, location=(x, y, 20))
    bpy.context.object.data.materials.append(M_BEAM)
    bpy.ops.object.light_add(type="POINT", location=(x, y, 3))
    bpy.context.object.data.energy = 6.0e4
    bpy.context.object.data.color = (1.0, 0.55, 0.22)
    bpy.context.object.data.shadow_soft_size = 1

# Streets: one curve object, glowing like streetlights from above.
WIDTH = {"motorway": 0.9, "trunk": 0.8, "primary": 0.7, "secondary": 0.55, "tertiary": 0.45}
cu = bpy.data.curves.new("streets", "CURVE")
cu.dimensions = "3D"
cu.bevel_depth = 0.12
cu.bevel_resolution = 0
for kind, pts in roads:
    if len(pts) < 2:
        continue
    sp = cu.splines.new("POLY")
    sp.points.add(len(pts) - 1)
    w = WIDTH.get(kind, 0.2)
    for i, (x, y) in enumerate(pts):
        sp.points[i].co = (x, y, 0.4, 1)
        sp.points[i].radius = w
streets = bpy.data.objects.new("streets", cu)
cu.materials.append(M_ROAD)
scene.collection.objects.link(streets)

# ---------------------------------------------------------------- light & world
world = bpy.data.worlds.new("dusk")
scene.world = world
world.use_nodes = True
nt = world.node_tree
bg = nt.nodes["Background"]
sky = nt.nodes.new("ShaderNodeTexCoord")
sep = nt.nodes.new("ShaderNodeSeparateXYZ")
ramp = nt.nodes.new("ShaderNodeValToRGB")
nt.links.new(sky.outputs["Generated"], sep.inputs[0])
rng = nt.nodes.new("ShaderNodeMapRange")
rng.inputs["From Min"].default_value = -0.06
rng.inputs["From Max"].default_value = 1.0
nt.links.new(sep.outputs["Z"], rng.inputs["Value"])
nt.links.new(rng.outputs["Result"], ramp.inputs["Fac"])
els = ramp.color_ramp.elements
els[0].position, els[0].color = 0.0, (0.03, 0.03, 0.045, 1)
els[1].position, els[1].color = 0.55, (0.012, 0.02, 0.06, 1)
for pos, col in ((0.055, (1.0, 0.42, 0.18)), (0.2, (0.1, 0.12, 0.28))):
    e_ = els.new(pos)
    e_.color = (*col, 1)
nt.links.new(ramp.outputs["Color"], bg.inputs["Color"])
bg.inputs["Strength"].default_value = 0.9
vol = nt.nodes.new("ShaderNodeVolumePrincipled")
vol.inputs["Color"].default_value = (0.35, 0.4, 0.6, 1)
vol.inputs["Density"].default_value = 0.00025
# Eevee volumes over a 6 km scene swallowed all light; no world fog.
# nt.links.new(vol.outputs["Volume"], nt.nodes["World Output"].inputs["Volume"])

bpy.ops.object.light_add(type="SUN", rotation=(math.radians(76), 0, math.radians(-115)))
sun = bpy.context.object.data
sun.energy = 2.6
sun.color = (1.0, 0.62, 0.38)
sun.angle = math.radians(3)

# ---------------------------------------------------------------- camera
cam_data = bpy.data.cameras.new("cam")
cam_data.lens = 32
cam_data.clip_start = 4
cam_data.clip_end = 12000
cam = bpy.data.objects.new("cam", cam_data)
scene.collection.objects.link(cam)
scene.camera = cam
target = bpy.data.objects.new("target", None)
scene.collection.objects.link(target)
tt = cam.constraints.new("TRACK_TO")
tt.target = target
tt.track_axis = "TRACK_NEGATIVE_Z"
tt.up_axis = "UP_Y"

ex, ey = xy(*PINS["elmside"][:2])
rx, ry = xy(*PINS["erin"][:2])
KEYS = [
    # frame, camera, target
    (1, (430, -540, 240), (-10, 40, 0)),
    (28, (210, -260, 70), (0, 10, 4)),
    (52, (ex + 70, ey - 95, 26), (ex, ey, 0)),
    (62, (ex + 40, ey - 85, 22), (ex, ey, 0)),
    (76, (120, -160, 150), (40, 20, 0)),
    (90, (rx + 70, ry - 80, 24), (rx, ry, 0)),
    (100, (rx + 85, ry - 55, 20), (rx, ry, 0)),
    (120, (170, -500, 380), (60, -10, 0)),
]
for f, c, t in KEYS:
    cam.location = c
    target.location = t
    cam.keyframe_insert("location", frame=f)
    target.keyframe_insert("location", frame=f)
for ob in (cam, target):
    for fc in ob.animation_data.action.fcurves if hasattr(ob.animation_data.action, "fcurves") else []:
        for kp in fc.keyframe_points:
            kp.interpolation = "BEZIER"
            kp.easing = "EASE_IN_OUT"

scene.frame_start, scene.frame_end = 1, 120

# ---------------------------------------------------------------- haze
def add_haze(m, near=1400, far=7000):
    t = m.node_tree
    out = t.nodes["Material Output"]
    src = out.inputs["Surface"].links[0].from_socket
    cd = t.nodes.new("ShaderNodeCameraData")
    mr = t.nodes.new("ShaderNodeMapRange")
    mr.interpolation_type = "SMOOTHSTEP"
    mr.inputs["From Min"].default_value = near
    mr.inputs["From Max"].default_value = far
    mr.inputs["To Max"].default_value = 0.9
    t.links.new(cd.outputs["View Distance"], mr.inputs["Value"])
    em = t.nodes.new("ShaderNodeEmission")
    em.inputs["Color"].default_value = (1.0, 0.42, 0.18, 1)
    em.inputs["Strength"].default_value = 0.4
    mix = t.nodes.new("ShaderNodeMixShader")
    t.links.new(mr.outputs["Result"], mix.inputs["Fac"])
    t.links.new(src, mix.inputs[1])
    t.links.new(em.outputs[0], mix.inputs[2])
    t.links.new(mix.outputs[0], out.inputs["Surface"])


M_WATER.node_tree.nodes["Principled BSDF"].inputs["Specular IOR Level"].default_value = 0.25
for m in (M_GROUND, M_WATER, M_BUILD, M_ROAD):
    add_haze(m)

# ---------------------------------------------------------------- render
engines = {i.identifier for i in bpy.types.RenderSettings.bl_rna.properties["engine"].enum_items}
scene.render.engine = "BLENDER_EEVEE_NEXT" if "BLENDER_EEVEE_NEXT" in engines else "BLENDER_EEVEE"
ee = scene.eevee
for attr, val in (("taa_render_samples", 48), ("use_raytracing", True), ("use_shadows", True),
                  ("volumetric_end", 2500), ("volumetric_tile_size", "8")):
    if hasattr(ee, attr):
        try:
            setattr(ee, attr, val)
        except Exception as ex_:
            print("skip", attr, ex_)
scene.view_settings.view_transform = "AgX"
scene.view_settings.look = "AgX - Punchy" if "AgX - Punchy" in [l.identifier for l in bpy.types.ColorManagedViewSettings.bl_rna.properties["look"].enum_items] else "None"
scene.view_settings.exposure = 0.0
scene.render.resolution_x, scene.render.resolution_y = RES
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "WEBP"
scene.render.image_settings.quality = 72
scene.render.film_transparent = False

# Pin positions on screen, per frame, for the HTML labels.
pins3d = {k: Vector((*xy(la, lo), z)) for k, (la, lo, z) in PINS.items()}
track = []
for f in range(1, 121):
    scene.frame_set(f)
    row = {}
    for k, p in pins3d.items():
        v = world_to_camera_view(scene, cam, p)
        row[k] = [round(v.x, 4), round(1 - v.y, 4), 1 if v.z > 0 else 0]
    track.append(row)
json.dump(track, open(os.path.join(OUT, "pins.json"), "w"), separators=(",", ":"))

bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT, "isthmus.blend"))

if TEST is not None:
    scene.frame_set(TEST)
    scene.render.filepath = os.path.join(OUT, f"test_{TEST:03d}.webp")
    bpy.ops.render.render(write_still=True)
else:
    scene.render.filepath = os.path.join(OUT, "frames", "")
    bpy.ops.render.render(animation=True)
