type Star = {
  top: string;
  left?: string;
  right?: string;
  size?: 2 | 3;
  dur?: number;
  delay?: number;
};

/** A handful of twinkling stars, absolutely positioned inside a relative parent. */
export function Stars({ stars }: { stars: Star[] }) {
  return (
    <>
      {stars.map((s, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="star"
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            width: s.size === 2 ? 2 : 3,
            height: s.size === 2 ? 2 : 3,
            ["--tw-dur" as string]: `${s.dur ?? 4}s`,
            ["--tw-delay" as string]: `${s.delay ?? 0}s`,
          }}
        />
      ))}
    </>
  );
}
