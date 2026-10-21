import type { Review } from "./data";

/**
 * From docs/prospects/previews/artisans-kitchen-flagstaff/reviews.md, read
 * 2026-10-20. Quotes are exact; "…" marks an omitted stretch. Dates are the
 * relative dates Google showed on that day.
 */
const G =
  "https://www.google.com/maps/place/Artisans+Kitchen/@35.2121152,-111.5770749,17z/data=!4m8!3m7!1s0x872d8ea6a6160d65:0xc33347b8630865df!8m2!3d35.2121152!4d-111.5770749!9m1!1b1!16s%2Fg%2F11by_fcv4h";

export const RATING = { value: 4.3, count: 27, source: "Google", url: G };

export const REVIEWS: Review[] = [
  {
    name: "Katie H.",
    stars: 5,
    date: "a month ago",
    text: "Sean and the team at Artisan's Kitchen catered our 100ish person wedding and absolutely knocked it out of the park. … We received SO many compliments on the food with several people telling us it was the best wedding food they had ever had! We went with a Mediterranean menu. It was important to me to have good vegetarian options and to be able to feed a couple of picky eaters, and Sean was willing to work with us every step of the way. … They even brought us a plate of apps to enjoy before the ceremony, which was thoughtful and very needed.",
    source: "Google",
    url: G,
  },
  {
    name: "Sara M.",
    stars: 5,
    date: "a year ago",
    text: "Our wedding day ended up being chillier than we had hoped and Sean had the brilliant idea to serve hot apple cider - every guest had a cup in hand immediately after the ceremony! Sean designed gorgeous charcuterie for cocktail hour and then had THE BEST dinner. Our guests loved it and are still reaching out for his contact information! 10/10 would recommend.",
    source: "Google",
    url: G,
  },
  {
    name: "Frank B.",
    stars: 5,
    date: "4 years ago",
    text: "The cocktail hour was an antipasto tower … with all house made pickled vegetables and fancy cheeses and meats. … My daughter and husband wanted Street tacos for their wedding, I thought it would not be enough food, but was I wrong. … Service was delayed like an hour because newlyweds went off the premises for photographs but the food was still cooked perfectly. … He left five big dispensers with hot cocoa, coffee and hot water for the rest of the evening.",
    source: "Google",
    url: G,
  },
  {
    name: "Kimberly W.",
    stars: 5,
    date: "a year ago",
    text: "Artisan's Kitchen catered our 20 person event and was able to do a custom Puerto Rican menu which was so delicious! Sean was quick to reply when I reached out and put together a couple different menus I could choose from based on what I requested. … While our event was wrapping up, they quietly cleaned up and had all the leftovers packaged for us which was a nice touch.",
    source: "Google",
    url: G,
  },
  {
    name: "Bruce E.",
    stars: 5,
    date: "a year ago",
    text: "I sure wish there had been a ton of leftovers from the 60-person outdoor community event recently completed in Flagstaff, Arizona. It was that good. … Delicious food, great service, professional appearance, and certainly the waffle cones filled with ice cream, earn Artisan's Kitchen a 5-star rating.",
    source: "Google",
    url: G,
  },
  {
    name: "Elizabeth T.",
    stars: 5,
    date: "10 months ago",
    text: "They catered the Americana Motor Hotel Christmas party last night and all the food was INCREDIBLE and AMAZING!! DELICIOUS. Thank you!!",
    source: "Google",
    url: G,
  },
];
