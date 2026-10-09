/**
 * Front of House awning mark, reversed for dark surfaces: an Ember rail over
 * 9 scalloped bays alternating Ember and Bone, Ember at both ends.
 */
export function FohMark({ className }: { className?: string }) {
  const left = 24;
  const bay = 192 / 9;
  return (
    <svg viewBox="20 3 200 64" className={className} aria-hidden="true" focusable="false">
      {Array.from({ length: 9 }, (_, i) => {
        const x = left + i * bay;
        const r = bay / 2;
        return (
          <path
            key={i}
            d={`M${x} 18 H${x + bay} V52 A${r} ${r * 0.62} 0 0 1 ${x} 52 Z`}
            fill={i % 2 === 0 ? "#c75b39" : "#f4ecdd"}
            stroke="#221c18"
            strokeWidth="1.6"
          />
        );
      })}
      <rect x="24" y="7" width="192" height="11" rx="3" fill="#c75b39" />
    </svg>
  );
}
