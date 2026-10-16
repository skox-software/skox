"""
Pin screen positions for the McCaughey Earth Studio render.

Run:  python3 mccaughey-earth-pins.py <keys.json> <out pins.json> [--fov DEG]

Earth Studio's camera JSON export wasn't reachable, but the render job carries
the project itself: every keyframe, normalised to the attribute's range, with
Bézier easing handles. This replays that interpolation to get the camera for
each of the 121 frames, then projects each pin to normalised 0–1 screen
coordinates in the shape IsthmusFlight reads.

Decoded ranges (checked against the values typed into Earth Studio):
  longitude  = -32058 + (180 + 32058) * v
  latitude   = -89.9999 + 179.9998 * v
  altitude   = -500 + (65117481 + 500) * v      metres
  rotationX  = pan  = 360 * v                   heading, clockwise from north
  rotationY  = tilt = 180 * v                   0 = straight down, 90 = horizon
"""
import json, math, sys

src, out = sys.argv[1], sys.argv[2]
FOV_V = float(sys.argv[sys.argv.index("--fov") + 1]) if "--fov" in sys.argv else 19.8
keys = json.load(open(src))
FRAMES, W, H = 121, 1920, 1080

RANGES = {
    "longitude": (-32058, 180),
    "latitude": (-89.9999, 89.9999),
    "altitude": (-500, 65117481),
    "rotationX": (0, 360),
    "rotationY": (0, 180),
}


def bez(p0, p1, p2, p3, s):
    u = 1 - s
    return u ** 3 * p0 + 3 * u * u * s * p1 + 3 * u * s * s * p2 + s ** 3 * p3


def sample(ks, t):
    for i in range(len(ks) - 1):
        t0, v0, _, out0 = ks[i]
        t1, v1, in1, _ = ks[i + 1]
        if t0 <= t <= t1:
            seg = t1 - t0
            # End keys carry no handles; treat them as flat eases.
            ox, oy = out0 if out0 else (seg / 3, 0)
            ix, iy = in1 if in1 else (-seg / 3, 0)
            xs = (t0, t0 + ox, t1 + ix, t1)
            ys = (v0, v0 + oy, v1 + iy, v1)
            lo, hi = 0.0, 1.0
            for _ in range(60):
                mid = (lo + hi) / 2
                if bez(*xs, mid) < t:
                    lo = mid
                else:
                    hi = mid
            return bez(*ys, (lo + hi) / 2)
    return ks[-1][1]


def camera(frame):
    t = frame / (FRAMES - 1)
    v = {}
    for name, (a, b) in RANGES.items():
        v[name] = a + (b - a) * sample(keys[name]["keys"], t)
    return v


A, F = 6378137.0, 1 / 298.257223563
E2 = F * (2 - F)


def ecef(lat, lon, h):
    la, lo = math.radians(lat), math.radians(lon)
    n = A / math.sqrt(1 - E2 * math.sin(la) ** 2)
    return ((n + h) * math.cos(la) * math.cos(lo), (n + h) * math.cos(la) * math.sin(lo),
            (n * (1 - E2) + h) * math.sin(la))


def enu(lat, lon):
    la, lo = math.radians(lat), math.radians(lon)
    e = (-math.sin(lo), math.cos(lo), 0)
    n = (-math.sin(la) * math.cos(lo), -math.sin(la) * math.sin(lo), math.cos(la))
    u = (math.cos(la) * math.cos(lo), math.cos(la) * math.sin(lo), math.sin(la))
    return e, n, u


def comb(basis, w):
    return [sum(b[i] * c for b, c in zip(basis, w)) for i in range(3)]


dot = lambda a, b: sum(x * y for x, y in zip(a, b))

# Ground on the isthmus is ~262 m above sea level, but checking the Capitol
# dome against three rendered frames put pins ~30 m high, which matches the
# local geoid offset, so ground is taken as 232 m in Earth Studio's datum.
# The vertical FOV (19.8°) is Earth Studio's default 34.5° horizontal lens at
# 16:9, confirmed the same way.
GROUND = 232
PINS = {
    "capitol": (43.0746917, -89.3841658, GROUND + 80),
    "elmside": (43.0936854, -89.3419609, GROUND + 8),
    "erin": (43.0598114, -89.4001035, GROUND + 8),
}

fy = math.tan(math.radians(FOV_V) / 2)
fx = fy * W / H
track = []
for f in range(FRAMES):
    c = camera(f)
    h, tl = math.radians(c["rotationX"]), math.radians(c["rotationY"])
    basis = enu(c["latitude"], c["longitude"])
    fwd = comb(basis, (math.sin(tl) * math.sin(h), math.sin(tl) * math.cos(h), -math.cos(tl)))
    right = comb(basis, (math.cos(h), -math.sin(h), 0))
    up = [right[1] * fwd[2] - right[2] * fwd[1], right[2] * fwd[0] - right[0] * fwd[2],
          right[0] * fwd[1] - right[1] * fwd[0]]
    cam = ecef(c["latitude"], c["longitude"], c["altitude"])
    row = {}
    for k, (la, lo, ht) in PINS.items():
        d = [p - q for p, q in zip(ecef(la, lo, ht), cam)]
        z = dot(d, fwd)
        x = dot(d, right) / z / fx if z > 0 else 0
        y = dot(d, up) / z / fy if z > 0 else 0
        row[k] = [round(0.5 + x / 2, 4), round(0.5 - y / 2, 4), 1 if z > 0 else 0]
    track.append(row)
    if f in (0, 28, 52, 76, 90, 120):
        print(f, {k: round(v, 5) for k, v in c.items()}, row)
json.dump(track, open(out, "w"), separators=(",", ":"))
print("wrote", len(track), "frames")
