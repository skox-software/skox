"use client";

import { createContext, useContext, useState } from "react";

/**
 * English/Spanish for the café concepts.
 *
 * San Julián's is a Venezuelan-Colombian café serving both Winter Park locals
 * and a large Colombian and Venezuelan community across the Orlando metro, so
 * the menu has to read naturally in Spanish rather than being an afterthought.
 *
 * Menu translation is keyed by the English string rather than by item id, so it
 * stays readable next to the source data and survives re-ordering.
 *
 * The context defaults to English with an identity translator, which means the
 * shared CafeMenu works unchanged on a page that never mounts a provider.
 */
export type Lang = "en" | "es";

const ui = {
  en: {
    langLabel: "Español",
    menu: "Menu",
    ourPlace: "Our place",
    visit: "Visit",
    orderPickup: "Order pickup",
    findUs: "Find us",
    eyebrow: "Colombian coffee · Winter Park",
    h1a: "Coffee grown in",
    h1b: "San Julián.",
    lede: "Beans from the hills of Caldas, Colombia. Empanadas and arepas made each morning. Breakfast served all day, in a room worth sitting in.",
    open: "Open",
    hours: "Mon–Sat 7:30–3:30\nSunday from 8:30",
    where: "Find us",
    address: "110 S Orlando Ave, Suite 4\nAcross from the library",
    rated: "Rated",
    ratedValue: "4.6 stars\n348 Google reviews",
    menuTitle: "The full menu",
    menuSub: "Every item, with published prices.",
    menuNote:
      "Demo only · Published marketplace base prices. Final prices, options and availability may differ.",
    viewPublished: "View published menu",
    chooseItem: "Choose an item to try the pickup preview.",
    addedSuffix: "added to your demo basket.",
    basketTitle: "Your pickup basket",
    basketEmpty: "A little coffee?\nFind something you like on the menu.",
    exploreMenu: "Explore the menu",
    subtotal: "Example subtotal",
    each: "each",
    continuePreview: "Continue preview",
    backToBasket: "Back to my basket",
    items: "items",
    item: "item",
    pickupPreview: "Pickup preview",
  },
  es: {
    langLabel: "English",
    menu: "Menú",
    ourPlace: "El local",
    visit: "Visítanos",
    orderPickup: "Ordenar para recoger",
    findUs: "Cómo llegar",
    eyebrow: "Café colombiano · Winter Park",
    h1a: "Café cultivado en",
    h1b: "San Julián.",
    lede: "Granos de las montañas de Caldas, Colombia. Empanadas y arepas hechas cada mañana. Desayuno todo el día, en un lugar donde da gusto quedarse.",
    open: "Horario",
    hours: "Lun–Sáb 7:30–3:30\nDomingo desde 8:30",
    where: "Dónde estamos",
    address: "110 S Orlando Ave, Suite 4\nFrente a la biblioteca",
    rated: "Calificación",
    ratedValue: "4.6 estrellas\n348 reseñas en Google",
    menuTitle: "El menú completo",
    menuSub: "Todos los productos, con precios publicados.",
    menuNote:
      "Solo demostración · Precios base publicados en plataformas. Los precios, opciones y disponibilidad finales pueden variar.",
    viewPublished: "Ver el menú publicado",
    chooseItem: "Elige un producto para probar la vista previa.",
    addedSuffix: "agregado a tu pedido de demostración.",
    basketTitle: "Tu pedido para recoger",
    basketEmpty: "¿Un cafecito?\nElige algo del menú.",
    exploreMenu: "Ver el menú",
    subtotal: "Subtotal de ejemplo",
    each: "c/u",
    continuePreview: "Continuar",
    backToBasket: "Volver a mi pedido",
    items: "productos",
    item: "producto",
    pickupPreview: "Vista previa",
  },
} as const;

/** Section headings, exactly as the café groups them. */
const sectionsEs: Record<string, string> = {
  "Hot Coffee": "Café caliente",
  "Cold Coffee": "Café frío",
  "Filtered Coffee": "Café de filtro",
  "Soft Drink and Tea": "Bebidas y té",
  "Fruit Juices": "Jugos naturales",
  "Breakfast Sandwich and Arepa": "Desayuno · sándwiches y arepas",
  "Antojos or Finger Food": "Antojos",
  "Lunch Sandwiches and Arepa": "Almuerzo · sándwiches y arepas",
  Dessert: "Postres",
};

/** Only names that actually change. Proper nouns and coffee terms stay put. */
const itemsEs: Record<string, string> = {
  "Café Con Leche": "Café con leche",
  Capuccino: "Capuchino",
  "Double Expresso": "Espresso doble",
  "Hot Chocolate": "Chocolate caliente",
  "Iced Latte": "Latte frío",
  "Mocca Shake": "Malteada de mocca",
  "Iced Americano": "Americano frío",
  "French Press": "Prensa francesa",
  Syphon: "Sifón",
  "Iced Matcha Latte": "Matcha latte frío",
  Coke: "Coca-Cola",
  "Diet Coke": "Coca-Cola Light",
  "Water (Bottle)": "Agua (botella)",
  "Pierrer Water": "Agua Perrier",
  "Green Tea": "Té verde",
  "Black Tea": "Té negro",
  "Mango & Passion Fruit Smoothie": "Smoothie de mango y maracuyá",
  "Mix Smoothie": "Smoothie mixto",
  "Mixed berries smoothie": "Smoothie de frutos rojos",
  "Agua panela": "Agua de panela",
  Lemonade: "Limonada",
  "Mango Juice": "Jugo de mango",
  "Pineapple Juice": "Jugo de piña",
  "Passion fruit juice": "Jugo de maracuyá",
  "Croissant Egg Sandwich": "Croissant con huevo",
  "Breakfast Egg Arepa": "Arepa de huevo",
  "Plain Bagel Egg Sandwich": "Bagel con huevo",
  "Ham and Cheese Croissant": "Croissant de jamón y queso",
  "Pannini Egg Sandwich": "Panini con huevo",
  "Combo 6 Any Flavor Tequeño": "Combo 6 tequeños · cualquier sabor",
  "Cheese Tequeño": "Tequeño de queso",
  "Guava And Cheese Tequeño": "Tequeño de guayaba y queso",
  "Nutella Tequeño": "Tequeño de Nutella",
  "Chicken Sandwich": "Sándwich de pollo",
  "Capresse Sandwich": "Sándwich caprese",
  "Southwest Sandwich": "Sándwich southwest",
  "Grilled Cheese Sandwich": "Sándwich de queso a la plancha",
  "Cheese quesito": "Quesito de queso",
  "Nutella Croissant": "Croissant de Nutella",
  "Guava and cheese quesito": "Quesito de guayaba y queso",
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: keyof typeof ui.en) => string;
  tItem: (name: string) => string;
  tSection: (name: string) => string;
};

const LangCtx = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const value: Ctx = {
    lang,
    setLang,
    t: (k) => ui[lang][k],
    tItem: (n) => (lang === "es" ? (itemsEs[n] ?? n) : n),
    tSection: (n) => (lang === "es" ? (sectionsEs[n] ?? n) : n),
  };
  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

/** Falls back to English so components work on pages without a provider. */
export function useLang(): Ctx {
  return (
    useContext(LangCtx) ?? {
      lang: "en",
      setLang: () => {},
      t: (k) => ui.en[k],
      tItem: (n) => n,
      tSection: (n) => n,
    }
  );
}

export function LangToggle() {
  const { lang, setLang, t } = useLang();
  return (
    <button
      type="button"
      className="lang-toggle"
      onClick={() => setLang(lang === "en" ? "es" : "en")}
      aria-label={
        lang === "en"
          ? "Ver este sitio en español"
          : "View this site in English"
      }
      lang={lang === "en" ? "es" : "en"}
    >
      {t("langLabel")}
    </button>
  );
}
