"use client";

import { useEffect, useRef, useState } from "react";
import { menuItems, dollars, type MenuItem } from "./menu-data";
import { useLang } from "../lang";
import { ArrowUpRight, Check, Coffee, Minus, Plus, ShoppingBag } from "./icons";

const groups = [
  { id: "featured", name: "A few favorites" },
  { id: "coffee", name: "Coffee" },
  { id: "breakfast", name: "Breakfast" },
  { id: "bites", name: "Lunch & little bites" },
  { id: "refresh", name: "Tea & refreshers" },
];

const getItems = (category: string) =>
  menuItems.filter((item) =>
    category === "featured" ? item.featured : item.category === category,
  );

type Basket = Record<string, number>;

/**
 * Ported from the standalone prototype. The original leaned on shadcn's Tabs
 * and Dialog; those are hand-rolled here so the concept can live inside SKOX
 * without pulling a component library in for one private page.
 */
export default function CafeMenu() {
  const { t, tItem, tSection } = useLang();
  const [category, setCategory] = useState("featured");
  const [basket, setBasket] = useState<Basket>({});
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(false);
  const [notice, setNotice] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  const lines = menuItems.filter((item) => basket[item.id] > 0);
  const count = lines.reduce((sum, item) => sum + basket[item.id], 0);
  const total = lines.reduce(
    (sum, item) => sum + item.price * basket[item.id],
    0,
  );

  function add(item: MenuItem) {
    setBasket((previous) => ({
      ...previous,
      [item.id]: Math.min(20, (previous[item.id] || 0) + 1),
    }));
    setPreview(false);
    setNotice(`${tItem(item.name)} ${t("addedSuffix")}`);
  }

  function change(id: string, delta: number) {
    setBasket((previous) => {
      const next = { ...previous };
      const quantity = Math.min(20, Math.max(0, (next[id] || 0) + delta));
      if (quantity) next[id] = quantity;
      else delete next[id];
      return next;
    });
    setPreview(false);
  }

  function close() {
    setOpen(false);
    setPreview(false);
    openerRef.current?.focus();
  }

  // Escape closes, and focus moves into the panel — the two things the shadcn
  // Dialog was doing for us that actually matter here.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    dialogRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const items = getItems(category);
  // Grouped by the café's own section names so it reads like their menu board,
  // and every item in the tab is shown — nothing hidden behind a "show more".
  const sections = Array.from(
    items.reduce((map, item) => {
      (
        map.get(item.section) ?? map.set(item.section, []).get(item.section)!
      ).push(item);
      return map;
    }, new Map<string, MenuItem[]>()),
  );

  return (
    <>
      <section
        className="menu-section shell"
        id="menu"
        aria-labelledby="menu-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">FIND YOUR NEW USUAL</p>
            <h2 id="menu-title">
              A little of what
              <br />
              <em>you’re craving.</em>
            </h2>
          </div>
          <p>
            Start with a coffee.
            <br />
            Stay for the arepas.
          </p>
        </div>

        <div className="menu-tabs">
          <div className="menu-tab-scroll">
            <div
              className="menu-tab-list"
              role="tablist"
              aria-label="Menu categories"
            >
              {groups.map((group) => (
                <button
                  key={group.id}
                  type="button"
                  role="tab"
                  id={`tab-${group.id}`}
                  className="menu-tab"
                  aria-selected={category === group.id}
                  aria-controls="menu-panel"
                  tabIndex={category === group.id ? 0 : -1}
                  {...(category === group.id ? { "data-active": "" } : {})}
                  onClick={() => {
                    setCategory(group.id);
                  }}
                  onKeyDown={(event) => {
                    const index = groups.findIndex((g) => g.id === category);
                    let next = index;
                    if (event.key === "ArrowRight")
                      next = (index + 1) % groups.length;
                    else if (event.key === "ArrowLeft")
                      next = (index + groups.length - 1) % groups.length;
                    else if (event.key === "Home") next = 0;
                    else if (event.key === "End") next = groups.length - 1;
                    else return;
                    event.preventDefault();
                    setCategory(groups[next].id);
                    document.getElementById(`tab-${groups[next].id}`)?.focus();
                  }}
                >
                  {group.name}
                </button>
              ))}
            </div>
          </div>

          <div
            className="menu-panel"
            id="menu-panel"
            role="tabpanel"
            aria-labelledby={`tab-${category}`}
            tabIndex={0}
          >
            {sections.map(([section, list]) => (
              <div className="menu-section-group" key={section}>
                <h3 className="menu-section-head">
                  {tSection(section)}
                  <span>{list.length}</span>
                </h3>
                <div className="menu-grid">
                  {list.map((item) => (
                    <article className="menu-item" key={item.id}>
                      <div>
                        <h4>{tItem(item.name)}</h4>
                        <p>{dollars(item.price)}</p>
                      </div>
                      <button
                        type="button"
                        className="add-button"
                        disabled={(basket[item.id] || 0) >= 20}
                        aria-label={`${tItem(item.name)} — ${t("orderPickup")}`}
                        onClick={() => add(item)}
                      >
                        <Plus size={18} />
                      </button>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="menu-status" role="status" aria-live="polite">
          {notice || t("chooseItem")}
        </p>
        <div className="menu-bottom">
          <p className="menu-disclosure">
            Demo only · Published marketplace base prices. Final prices, options
            and availability may differ.
          </p>
          <a
            className="plain-link"
            href="https://www.ubereats.com/store/san-julians-coffee-bar/DWgSDzGPX5yh5H5sigTAWw"
            target="_blank"
            rel="noreferrer"
          >
            {t("viewPublished")} <ArrowUpRight size={15} />
          </a>
        </div>
      </section>

      {count > 0 && (
        <button
          type="button"
          ref={openerRef}
          className="basket-button"
          onClick={() => setOpen(true)}
        >
          <span className="basket-count">
            <ShoppingBag size={17} />
            {count} {count === 1 ? "item" : "items"}
          </span>
          <span>Pickup preview</span>
          <span className="basket-price">
            {dollars(total)} <span aria-hidden="true">↗</span>
          </span>
        </button>
      )}

      {open && (
        <div className="basket-backdrop" onClick={close}>
          <div
            className="basket-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="basket-title"
            tabIndex={-1}
            ref={dialogRef}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="basket-close"
              aria-label="Close the pickup preview"
              onClick={close}
            >
              ✕
            </button>
            <h2 className="basket-title" id="basket-title">
              {preview ? "Your coffee moment." : "Your pickup basket."}
            </h2>
            <p className="basket-intro">
              San Julián’s Coffee Bar · Winter Park
              <br />
              Unofficial concept. No live ordering or payments.
            </p>

            {preview ? (
              <div className="preview-ready">
                <Check size={35} />
                <h3>That’s the pickup preview.</h3>
                <p>
                  Your selection totals <strong>{dollars(total)}</strong> before
                  taxes or any fees. No order has been sent.
                </p>
                <div className="basket-notice">
                  The live website would hand your order to the café’s approved
                  ordering system for options, availability, payment and a
                  pickup time.
                </div>
                <p>
                  This concept does not collect your name, payment details or
                  contact information.
                </p>
                <button
                  type="button"
                  className="basket-checkout"
                  onClick={() => setPreview(false)}
                >
                  Back to my basket
                </button>
              </div>
            ) : count === 0 ? (
              <div className="basket-empty">
                <Coffee size={40} />
                <p>
                  A little coffee?
                  <br />
                  Find something you like on the menu.
                </p>
                <button
                  type="button"
                  className="basket-checkout"
                  onClick={() => {
                    close();
                    document.getElementById("menu")?.scrollIntoView();
                  }}
                >
                  Explore the menu
                </button>
              </div>
            ) : (
              <>
                <ul className="basket-items">
                  {lines.map((item) => (
                    <li className="basket-item" key={item.id}>
                      <div>
                        <h3>{item.name}</h3>
                        <span className="unit-price">
                          {dollars(item.price)} each
                        </span>
                        <div className="quantity-control">
                          <button
                            type="button"
                            aria-label={`Remove one ${item.name}`}
                            onClick={() => change(item.id, -1)}
                          >
                            <Minus size={14} />
                          </button>
                          <span aria-label={`Quantity ${basket[item.id]}`}>
                            {basket[item.id]}
                          </span>
                          <button
                            type="button"
                            disabled={basket[item.id] >= 20}
                            aria-label={`Add one ${item.name}`}
                            onClick={() => change(item.id, 1)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      <span className="line-price">
                        {dollars(item.price * basket[item.id])}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="basket-total">
                  <span>Example subtotal</span>
                  <strong>{dollars(total)}</strong>
                </div>
                <div className="basket-notice">
                  Prices are from the published marketplace menu. Taxes, fees,
                  modifiers and pickup times are not calculated in this demo.
                </div>
                <button
                  type="button"
                  className="basket-checkout"
                  onClick={() => setPreview(true)}
                >
                  Continue preview <ArrowUpRight size={17} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
