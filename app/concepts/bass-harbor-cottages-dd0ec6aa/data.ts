/**
 * Every string here traces to a row in
 * docs/prospects/previews/bass-harbor-cottages/ledger.md (L#) or reviews.md
 * (L57+, R#). Nothing is invented. Keep it that way.
 */

import type { Credential } from "../_shared";

export const SLUG = "bass-harbor-cottages-dd0ec6aa";
/** The portal deal, so the first open after sending alerts the team. */
export const DEAL_ID = "e7405417-9f74-4eae-8d53-e3db84fef087";
export const BUSINESS = "Bass Harbor Cottages and Country Inn"; // L1
export const PHONE_DISPLAY = "(207) 244-3460"; // L3
export const PHONE_TEL = "+12072443460";
export const EMAIL = "info@bassharborcottages.com"; // L4
export const ADDRESS = ["95 Harbor Drive (Route 102A)", "Bass Harbor, Maine 04653"]; // L2
export const MAP_URL = "https://maps.google.com/?q=95+Harbor+Drive,+Bass+Harbor,+ME+04653";

export type Rate = { label: string; amount: number; per: "week" | "night" };

export type Place = {
  id: string;
  name: string;
  /** One line in their words. */
  line: string;
  features: string[];
  /** Max guests, children included (L38). */
  sleeps: number;
  sleepsText: string;
  minNights: number;
  /** "From" rates exactly as published on the Accommodations page (A). */
  may?: Rate;
  august?: Rate;
  daily?: Rate;
  rateNote?: string;
  img: { src: string; alt: string; w: number; h: number };
  img2?: { src: string; alt: string; w: number; h: number };
  source: string;
};

const IMG = "/concepts/bass-harbor-cottages";

/** L20–L34. Rates from the Accommodations overview; the unit pages differ (L53). */
export const PLACES: Place[] = [
  {
    id: "pine",
    name: "The Pine Cottage",
    line: "Footsteps from the shore.",
    features: [
      "Screened-in porch with panoramic views of Bass Harbor, the inner harbor islands and the setting sun",
      "Skylight living area with electric fireplace",
      "Two bedrooms: one queen, one double",
      "Full modern kitchen with dishwasher",
      "Kayak storage and tidal launching from the rocky shore",
    ],
    sleeps: 4,
    sleepsText: "Up to four guests, including the little ones",
    minNights: 4,
    may: { label: "May", amount: 1500, per: "week" },
    august: { label: "August", amount: 2500, per: "week" },
    daily: { label: "Daily", amount: 250, per: "night" },
    img: { src: `${IMG}/pine-window.jpg`, alt: "Bass Harbor through the Pine Cottage's bedroom windows, pines framing the water", w: 1138, h: 1080 },
    img2: { src: `${IMG}/pine-porch.jpg`, alt: "The Pine Cottage's screened porch with a table and chairs among the pines", w: 480, h: 640 },
    source: "https://www.bassharborcottages.com/the-pine-cottage.html",
  },
  {
    id: "carriage",
    name: "The Carriage House",
    line: "Close to the water. Sauna, fireplaces, balcony, skylights.",
    features: [
      "Deck and balcony overlooking Bass Harbor, Swans Island and Blue Hill Bay",
      "Master suite with balcony, fireplace, queen bed and a skylight sauna",
      "Two first-floor bedrooms and a full bath",
      "Living area with gas log fireplace, full galley kitchen",
      "Kayak storage with tidal launching from the rocky shore",
    ],
    sleeps: 5,
    sleepsText: "Up to five guests, including the little ones",
    minNights: 5,
    may: { label: "May", amount: 1600, per: "week" },
    august: { label: "August", amount: 2800, per: "week" },
    daily: { label: "Daily", amount: 300, per: "night" },
    img: { src: `${IMG}/carriage-exterior.jpg`, alt: "The shingled Carriage House with its upper balcony, yellow broom in flower below", w: 923, h: 338 },
    img2: { src: `${IMG}/carriage-suite.jpg`, alt: "The Carriage House master suite: queen bed, fireplace and a door out to the balcony", w: 640, h: 480 },
    source: "https://www.bassharborcottages.com/the-carriage-house.html",
  },
  {
    id: "boathouse",
    name: "Suites at the Boat House",
    line: "Harbor front. Decks, a sunset balcony, AC.",
    features: [
      "Overlooks the cove, across Bass Harbor to Bernard",
      "The Loft: third-floor private sunset balcony, fireplaces, skylights, AC",
      "The Queen Suite with a second-floor deck",
      "Add the Heron Room for three or four guests",
      "Modern kitchens, full and shower baths",
    ],
    sleeps: 6,
    sleepsText: "Two to four guests per suite, or the whole cottage for six",
    minNights: 4,
    may: { label: "May", amount: 1200, per: "week" },
    august: { label: "August", amount: 2000, per: "week" },
    daily: { label: "Daily", amount: 170, per: "night" },
    img: { src: `${IMG}/boathouse-view.jpg`, alt: "The lawn running down to the cove from the Boat House, Bass Harbor beyond", w: 923, h: 338 },
    img2: { src: `${IMG}/boathouse-exterior.jpg`, alt: "The white Boat House with stacked decks facing the water", w: 923, h: 338 },
    source: "https://www.bassharborcottages.com/suites-boat-house.html",
  },
  {
    id: "johns",
    name: "Johns Island, at the Country Inn",
    line: "Private entrance from the farmer's porch.",
    features: [
      "Side view to Bass Harbor over the meadow",
      "Vermont Castings gas fireplace, air-conditioning",
      "Queen bed, private shower bath",
      "Microwave, in-room coffee and refrigerator",
    ],
    sleeps: 2,
    sleepsText: "Rooms for two",
    minNights: 3,
    may: { label: "May", amount: 160, per: "night" },
    august: { label: "August", amount: 230, per: "night" },
    img: { src: `${IMG}/inn-room.jpg`, alt: "A Country Inn room with a wood stove, armchair and a small round table by the windows", w: 1400, h: 1050 },
    source: "https://www.bassharborcottages.com/the-country-inn.html",
  },
  {
    id: "tapley",
    name: "The Tapley Suite, at the Country Inn",
    line: "Named for the local horse-and-buggy doctor, Thomas Tapley.",
    features: [
      "Second floor, overlooking the meadow and peeking at the harbor",
      "Gas fireplace, air-conditioning",
      "Kitchen alcove with oven, dishwasher and refrigerator",
      "Queen bed, private shower bath, short walk to the shore",
    ],
    sleeps: 2,
    sleepsText: "Queen bed for two guests",
    minNights: 3,
    may: { label: "May", amount: 1000, per: "week" },
    august: { label: "August", amount: 1900, per: "week" },
    daily: { label: "Daily", amount: 150, per: "night" },
    img: { src: `${IMG}/inn-exterior.jpg`, alt: "The white 1890 farmhouse inn behind its maples, the sign out front", w: 1400, h: 993 },
    source: "https://www.bassharborcottages.com/accommodations.html",
  },
];

/** The four "places" shown as sections; the two Inn rooms share one block. */
export const INN = {
  name: "The Country Inn",
  line: "Built in 1890, tucked under shade trees.", // L29
  body: "Corner rooms are named for the islands of Bass Harbor and for our beloved local horse-and-buggy doctor, Thomas Tapley. Queen beds and private baths, in-room coffee and refrigerators, air-conditioning and Vermont Castings gas fireplaces.", // L29, L30
  rates: "From $180 to $300 a night, May to August. Three-night minimum.", // L31
};

/** L44–L47, L40–L43. Their rules, in their words where it matters. */
export const RULES = [
  "Quiet hours from 9 pm to 9 am",
  "No pets, smoking or drones",
  "No outdoor cooking, including grilling and BBQ",
  "Well-behaved children welcome, under adult supervision",
  "Please don't invite others to join you here; every place has a maximum occupancy, children included",
  "A vehicle is necessary: we're a drive-to location",
];

export const BRING = [
  "Your own linen for weekly stays, or rent ours",
  "Bakeware, foodstuffs, condiments and spices; kitchens have the basics",
  "Watershoes for brisk saltwater wading",
];

export const POLICY = {
  deposit:
    "Your deposit is refundable, minus a $25 per day service charge, if we are able to re-rent for the length of your original stay.", // L40
  cancel: "Refunds are not available for cancellations within 30 days of check-in.", // L41
  daily: "Daily stays are pre-paid in full.", // L42
  tax: "Rates are subject to Maine State Lodging Tax; additional cleaning and security apply, as needed.", // L39
  cameras: "There are security cameras in our parking areas, shorefront and office.", // L45
};

/** L11, L15–L17. Their distances. */
export const NEARBY = [
  { place: "Bass Harbor Head Lighthouse", dist: "5 minutes" },
  { place: "Bass Harbor village: store, post office, restaurants", dist: "½ mile" },
  { place: "Back Beach in Bernard, brisk salt-water swimming", dist: "1 mile" },
  { place: "Southwest Harbor village", dist: "3 miles" },
  { place: "Echo Lake's sandy beach, with lifeguards", dist: "8 miles" },
  { place: "Acadia's carriage paths", dist: "20 minutes" },
  { place: "Whale watches from Bar Harbor", dist: "about ½ hour" },
  { place: "Hancock County Airport (Trenton/Bar Harbor)", dist: "½ hour" },
];

export const CREDENTIALS: Credential[] = [
  {
    href: "https://www.airbnb.com/users/profile/1462834791379625112",
    mark: { initials: "★" },
    big: "4.79",
    text: "on Airbnb, Superhost",
    small: "371 reviews",
  }, // L57
  {
    href: "https://www.airbnb.com/rooms/18946788",
    mark: { initials: "★" },
    big: "4.96",
    text: "for the Pine Cottage on Airbnb",
    small: "26 reviews",
  }, // L58
  {
    href: "https://www.airbnb.com/rooms/1981333",
    mark: { initials: "ME" },
    big: "Since 1986",
    text: "hosts living on site",
    small: "licensed by the State of Maine",
  }, // L60, L6
  {
    href: "https://business.visitbarharbor.com/list/member/bass-harbor-cottages-country-inn-503",
    mark: { initials: "BH" },
    big: "Member",
    text: "Bar Harbor Chamber of Commerce",
  }, // L61
];

export type Review = { name: string; stars: number; date: string; place: string; text: string; source: string; url: string };

/** reviews.md R1–R6, verbatim excerpts. */
export const REVIEWS: Review[] = [
  {
    name: "Andrew",
    stars: 5,
    date: "August 2022",
    place: "Pine Cottage",
    text: "It sits right at water's edge in the best corner of Mt. Desert Island. … The view from the screened in porch is quintessentially Maine. Comfortable beds, basic kitchen (with requisite lobster pot) and a cozy living room made for an ideal week away.",
    source: "Airbnb",
    url: "https://www.airbnb.com/rooms/18946788",
  },
  {
    name: "Elaine",
    stars: 5,
    date: "July 2025",
    place: "Pine Cottage",
    text: "Quiet, right on the water. Beautiful early morning views of boats setting out, a comfortable porch, chairs to relax in nestled just above the tide coming in and out. … Great place for writing.",
    source: "Airbnb",
    url: "https://www.airbnb.com/rooms/18946788",
  },
  {
    name: "Rebecca",
    stars: 5,
    date: "October 2026",
    place: "Johns Island",
    text: "Mel's place provided a great oasis away from the bustle of Bar Harbor. … He went above and beyond by providing us with a map of road closures for the MDI marathon upon our arrival so that our trip wouldn't be interrupted unexpectedly.",
    source: "Airbnb",
    url: "https://www.airbnb.com/rooms/1981333",
  },
  {
    name: "Sarah",
    stars: 5,
    date: "July 2024",
    place: "Pine Cottage",
    text: "We loved the view of the harbor and the sunsets which looked different every day. We saw a ton of deer - including several who roamed right by the cottage window one morning.",
    source: "Airbnb",
    url: "https://www.airbnb.com/rooms/18946788",
  },
  {
    name: "Ron",
    stars: 5,
    date: "July 2023",
    place: "Johns Island",
    text: "Benches along the shoreline of the property provided amazing views of the water. … The grounds and house are very well kept.",
    source: "Airbnb",
    url: "https://www.airbnb.com/rooms/1981333",
  },
  {
    name: "beardogmom",
    stars: 5,
    date: "September 2026",
    place: "Pine Cottage",
    text: "Easy stairs to the rocky beach at low tide for treasure hunting! … this is cottage living in Maine!",
    source: "Tripadvisor",
    url: "https://www.tripadvisor.com/Hotel_Review-g40504-d77137-Reviews-Bass_Harbor_Cottages_and_Country_Inn-Bass_Harbor_Tremont_Mount_Desert_Island_Maine.html",
  },
];

export type Note = { title: string; body: string; src: string; srcLabel: string };

/** Ledger L65–L74: public facts about the area, each from an official source. */
export const NOTES: Note[] = [
  {
    title: "The lighthouse down the road",
    body: "Bass Harbor Head Light was built in 1858, and its lantern still holds a fourth-order Fresnel lens. It is one of Acadia's most photographed landmarks. The tower is closed, but you can walk the grounds, five minutes from your porch.",
    src: "https://www.nps.gov/acad/planyourvisit/explore-bass-harbor-head-light-station.htm",
    srcLabel: "National Park Service",
  },
  {
    title: "An island day trip, from our own harbor",
    body: "The Maine State Ferry leaves Bass Harbor for Swan's Island, a 40-minute crossing, and for Frenchboro, about 50 minutes out.",
    src: "https://www.maine.gov/dot/programs-services/ferry/swans-island-ferry",
    srcLabel: "Maine State Ferry Service",
  },
  {
    title: "First sunrise in the country",
    body: "From October 7 to March 6, Cadillac Mountain is the first place in the country to see the sun rise. In season, the summit road needs a vehicle reservation.",
    src: "https://www.nps.gov/places/cadillac-mountain.htm",
    srcLabel: "National Park Service",
  },
  {
    title: "Dark skies over the harbor",
    body: "The Park Service notes Acadia's remarkably dark skies for somewhere so close to Portland, Boston and New York. On a clear night, gaze at the stars from the shore.",
    src: "https://www.nps.gov/acad/learn/nature/night-skies.htm",
    srcLabel: "National Park Service",
  },
  {
    title: "Why they call it the quietside",
    body: "The west side of Acadia is the quieter, more secluded half of Mount Desert Island. It is home to Southwest Harbor, Tremont and Bass Harbor, away from the Bar Harbor crowds.",
    src: "https://www.nps.gov/acad/planyourvisit/west-side.htm",
    srcLabel: "National Park Service",
  },
];

export type Fav = { name: string; where: string; why: string; by: string; url?: string };

/** Places our guests name in their reviews (reviews.md), and two from our own Things to Do page (T). */
export const FAVS: Fav[] = [
  {
    name: "Thurston's Lobster Pound",
    where: "Bernard, Memorial Day weekend through mid October",
    why: "If you want a great Lobster meal with all the fixings don't miss Thurston's",
    by: "Jorge, Airbnb guest, July 2025",
    url: "https://thurstonforlobster.com/",
  },
  {
    name: "Little Notch Bakery",
    where: "Southwest Harbor",
    why: "Some of the best pizza at Little Notch bakery there.",
    by: "Elizabeth, Pine Cottage guest, July 2025",
  },
  {
    name: "Wendell Gilley Museum",
    where: "Southwest Harbor",
    why: "An art and nature museum honoring the bird carver Wendell Gilley.",
    by: "From our Things to Do list",
    url: "https://www.wendellgilleymuseum.org/",
  },
  {
    name: "Seal Cove Auto Museum",
    where: "Tremont",
    why: "Some of the earliest automobiles and motorcycles, from 1895 into the 1920s.",
    by: "From our Things to Do list",
    url: "https://www.sealcoveautomuseum.org/",
  },
];
