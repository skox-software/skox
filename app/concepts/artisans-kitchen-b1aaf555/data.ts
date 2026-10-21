/**
 * Every string here traces to a row in
 * docs/prospects/previews/artisans-kitchen-flagstaff/ledger.md (L#) or
 * reviews.md. Nothing is invented. Keep it that way.
 */

import type { Credential, OrderItem } from "../_shared";

export const SLUG = "artisans-kitchen-b1aaf555";
export const PHONE_DISPLAY = "928.779.3662"; // L3
export const PHONE_TEL = "+19287793662";

export const SERVICE_AREA = [
  "Flagstaff",
  "Grand Canyon",
  "Cottonwood",
  "Camp Verde",
  "Winslow",
  "Williams",
  "Hopi Reservation",
]; // L8

export const EVENT_TYPES = [
  "Weddings",
  "Rehearsal dinners",
  "Business meetings",
  "Quinceañeras",
  "Home events",
  "Movie sets",
  "River companies",
  "Glamping companies",
]; // L7

export const BUSINESS = "Artisan's Kitchen Catering";

export type Tag = "GF" | "LF" | "VT";
export type BagItem = OrderItem & { tags: Tag[]; course: "BBQ" | "Italian" | "Asian" | "Mexican" | "Sides" | "Breakfast" };

/** The GF/LF/VT tags as the Boil-Bag page prints them. */
export const TAG_LABEL: Record<Tag, string> = {
  GF: "Gluten-free",
  LF: "Lactose-free",
  VT: "Vegetarian",
};

/** L25–L30. Tags exactly as printed on the Boil-Bag page. */
export const BAG_MENU: BagItem[] = [
  { name: "Beef Tri-Tip", tags: ["GF", "LF"], course: "BBQ" },
  { name: "Pulled Pork or Chicken", tags: ["GF", "LF"], course: "BBQ" },
  { name: "Veggie-Q", tags: ["LF", "VT"], course: "BBQ" },
  { name: "St. Louis Style Ribs", tags: ["GF", "LF"], course: "BBQ" },
  { name: "Beef or Veggie Chili", tags: ["GF", "LF"], course: "BBQ" },
  { name: "Artichoke Pesto Lasagna", tags: ["GF", "LF", "VT"], course: "Italian" },
  { name: "Italian Sausage Lasagna", tags: ["GF", "LF", "VT"], course: "Italian" },
  { name: "Meatballs w/ Red Sauce", tags: ["GF", "LF"], course: "Italian" },
  { name: "Italian Stuffed Chicken", tags: ["GF", "LF"], course: "Italian" },
  { name: "Eggplant Parmesan", tags: ["GF", "LF"], course: "Italian" },
  { name: "Sweet Sour Pork", tags: ["GF", "VT", "LF"], course: "Asian" },
  { name: "Beef & Broccoli", tags: ["GF", "VT", "LF"], course: "Asian" },
  { name: "Chicken Curry", tags: ["GF", "VT", "LF"], course: "Asian" },
  { name: "Tofu Stir", tags: ["GF", "VT", "LF"], course: "Asian" },
  { name: "Veggie Posole", tags: ["GF", "VT", "LF"], course: "Mexican" },
  { name: "Pork Posole", tags: ["GF", "LF"], course: "Mexican" },
  { name: "Stuffed Mexican Chicken", tags: ["GF", "LF"], course: "Mexican" },
  { name: "Bean & Cheese Relleno", tags: ["GF", "VT", "LF"], course: "Mexican" },
  { name: "Tamales Calabacita", tags: ["GF", "VT", "LF"], course: "Mexican" },
  { name: "Chicken Enchiladas", tags: ["GF", "LF"], course: "Mexican" },
  { name: "Spinach Enchiladas", tags: ["GF", "VT", "LF"], course: "Mexican" },
  { name: "Smashed Yams", tags: ["GF", "LF", "VT"], course: "Sides" },
  { name: "Roasted Garlic Red Potato", tags: ["GF", "LF", "VT"], course: "Sides" },
  { name: "Potatoes Au Gratin", tags: ["GF", "VT"], course: "Sides" },
  { name: "Mac N Cheese", tags: ["VT"], course: "Sides" },
  { name: "Black Bean Medley", tags: ["GF", "LF", "VT"], course: "Sides" },
  { name: "Rice & Beans", tags: ["GF", "LF", "VT"], course: "Sides" },
  { name: "Honey Glazed Carrots", tags: ["GF", "LF", "VT"], course: "Sides" },
  { name: "Mediterranean Quinoa", tags: ["GF", "LF", "VT"], course: "Sides" },
  { name: "Egg scramble: Ham & American", tags: [], course: "Breakfast" },
  { name: "Egg scramble: Sausage & Cheddar", tags: [], course: "Breakfast" },
  { name: "Egg scramble: Green Chilis & Jack", tags: [], course: "Breakfast" },
  { name: "Egg scramble: Tomato, Basil & Mozz", tags: [], course: "Breakfast" },
  { name: "French Toast Mix w/ Cinnamon Apple", tags: [], course: "Breakfast" },
];

export const BAG_SIZES = [2, 4, 6, 8]; // L23

/**
 * Credibility strip (P1–P7, C1–C4). No awards were found for this business,
 * so none are shown.
 */
const GOOGLE_PROFILE =
  "https://www.google.com/maps/place/Artisans+Kitchen/@35.2121152,-111.5770749,17z/data=!4m8!3m7!1s0x872d8ea6a6160d65:0xc33347b8630865df!8m2!3d35.2121152!4d-111.5770749!9m1!1b1!16s%2Fg%2F11by_fcv4h";

export const CREDENTIALS: Credential[] = [
  { href: GOOGLE_PROFILE, mark: "google", big: "4.3", text: "on Google", small: "27 reviews" },
  {
    href: "https://www.facebook.com/ArtisansKitchen/reviews",
    mark: "facebook",
    big: "100%",
    text: "recommend on Facebook",
    small: "5 reviews",
  },
  {
    href: "https://www.tripadvisor.com/Restaurant_Review-g60971-d9598626-Reviews-ARTISAN_S_KITCHEN-Flagstaff_Arizona.html",
    mark: "tripadvisor",
    big: "4.4",
    text: "on Tripadvisor",
    small: "7 reviews",
  },
  {
    href: "https://business.flagstaffchamber.com/members/member/artisan-s-kitchen-11293",
    mark: { image: "/concepts/artisans-kitchen/chamber-logo.png" },
    big: "Member",
    text: "Greater Flagstaff Chamber of Commerce",
  },
  {
    href: "https://podcasts.apple.com/us/podcast/artisans-kitchen/id1630235450?i=1000681456204",
    mark: { initials: "CB" },
    big: "Cordon Bleu",
    text: "certified, Scottsdale Culinary Institute",
  },
  { mark: { initials: "07" }, big: "Incorporated 2007", text: "Artisan\u2019s Kitchen, Inc." },
];

/** L17–L18 and L16: the dinner and wedding menus, by cuisine. */
export const DINNER_MENUS: Record<string, string[]> = {
  American: [
    "Mesquite Smoked Tri-Tip w/ Chimichurri",
    "Prime Rib w/ Rosemary Rub & Au Jus",
    "Beef Tenderloin w/ Cracked Peppercorns & Horseradish Cream",
    "Baby Back Ribs w/ Peach BBQ Salsa",
    "Roasted Turkey w/ Red Eye Gravy",
    "Pork Tenderloin Wrapped in Bacon w/ Apricot Chutney",
    "Baked Cod w/ Lemon Caper Butter",
  ],
  Italian: [
    "Chicken Marsala w/ Cremini Mushrooms",
    "Braised Beef w/ Red Wine, Capers & Tomatoes",
    "Butternut Squash Ravioli w/ Sage Butter",
    "Lasagna: Artichoke Pesto, Italian Sausage or Classic Beef",
    "Pork Osso Buco w/ Lemon Gremolata",
    "Porchetta w/ Artichoke & Fennel",
    "Salmon Stuffed w/ Ricotta & Spinach",
  ],
  Mexican: [
    "Snapper Veracruzana w/ Green Chilies, Tomatoes, Capers & Olives",
    "Pork Verde w/ Avocado Corn Salsa",
    "Beef Tejano w/ Pico de Gallo",
    "Chili Rellenos: Cheese, Chicken, Pork or Shrimp",
    "Enchiladas: Spinach, Chicken or Beef",
    "Tilapia Rodrigo w/ Citrus Cilantro Salsa",
  ],
  Asian: [
    "Sesame Ahi Tuna atop Sprout & Seaweed",
    "Lemongrass Salmon",
    "Drunken Sake Shrimp w/ Baby Bok Choy",
    "Tandoori Chicken",
    "Sweet Chili Pork Tenderloin",
    "Grilled Halibut w/ Soy & Scallions",
  ],
  French: [
    "Beef Bourguignon",
    "Coq au Vin",
    "Duck à l'Orange",
    "Rack of Lamb Herbes de Provence",
    "Bouillabaisse",
    "Brie Stuffed Portabellas atop Ratatouille",
  ],
};

export type Review = {
  name: string;
  stars: number;
  date: string;
  text: string;
  source: string;
  url: string;
};

/** Filled from reviews.md once the profile research lands. */
export { REVIEWS, RATING } from "./reviews";
