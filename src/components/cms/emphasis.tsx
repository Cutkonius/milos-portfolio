import { Fragment, type ReactNode } from "react";

/**
 * Lightweight inline markup used in editable body copy: `*word*` renders as
 * amber emphasis, matching the hand-authored `<em>` accents on the site.
 */
export function renderEmphasis(text: string): ReactNode {
  return text.split(/(\*[^*]+\*)/g).map((part, i) => {
    if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} className="font-semibold not-italic text-amber">
          {part.slice(1, -1)}
        </em>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
