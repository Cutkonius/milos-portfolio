"use client";

import type { ReactNode } from "react";
import { Button } from "./ui";

/**
 * Generic ordered-list editor: renders each item via a render prop, with
 * move-up / move-down / remove controls and an add button. Works for object
 * items and primitive items alike (the render prop replaces the whole item).
 */
export function ListEditor<T>({
  items,
  setItems,
  render,
  makeItem,
  addLabel = "+ Add",
}: {
  items: T[];
  setItems: (items: T[]) => void;
  render: (item: T, update: (next: T) => void, index: number) => ReactNode;
  makeItem: () => T;
  addLabel?: string;
}) {
  const update = (i: number, next: T) => setItems(items.map((it, idx) => (idx === i ? next : it)));
  const remove = (i: number) => setItems(items.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = items.slice();
    [next[i], next[j]] = [next[j], next[i]];
    setItems(next);
  };

  const ctrl =
    "grid h-7 w-7 place-items-center rounded-md text-text/40 transition-colors hover:bg-white/[0.06] hover:text-text disabled:pointer-events-none disabled:opacity-30";

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-white/[0.1] bg-white/[0.02] p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text/35">
              #{i + 1}
            </span>
            <div className="flex items-center gap-1">
              <button type="button" aria-label="Move up" disabled={i === 0} onClick={() => move(i, -1)} className={ctrl}>
                ↑
              </button>
              <button
                type="button"
                aria-label="Move down"
                disabled={i === items.length - 1}
                onClick={() => move(i, 1)}
                className={ctrl}
              >
                ↓
              </button>
              <button
                type="button"
                aria-label="Remove"
                onClick={() => remove(i)}
                className={`${ctrl} hover:!text-[#ff9d7a]`}
              >
                ✕
              </button>
            </div>
          </div>
          {render(item, (next) => update(i, next), i)}
        </div>
      ))}
      <Button variant="ghost" size="sm" onClick={() => setItems([...items, makeItem()])} className="self-start">
        {addLabel}
      </Button>
    </div>
  );
}
