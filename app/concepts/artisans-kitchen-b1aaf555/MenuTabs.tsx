"use client";

import { useState } from "react";
import { DINNER_MENUS } from "./data";

/** The Dinner menu, tabbed by cuisine. This page is the one that 404s today. */
export default function MenuTabs() {
  const names = Object.keys(DINNER_MENUS);
  const [active, setActive] = useState(names[0]);
  return (
    <div className="menu">
      <div className="menu-tabs" role="tablist" aria-label="Dinner menus by cuisine">
        {names.map((n) => (
          <button
            key={n}
            role="tab"
            aria-selected={active === n}
            className="menu-tab"
            onClick={() => setActive(n)}
          >
            {n}
          </button>
        ))}
      </div>
      <div role="tabpanel" aria-label={`${active} dinner menu`}>
        <ol className="menu-list">
        {DINNER_MENUS[active].map((d) => (
          <li key={d}>
            <span>{d}</span>
          </li>
        ))}
        </ol>
      </div>
    </div>
  );
}
