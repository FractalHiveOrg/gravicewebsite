import type { ReactElement } from "react";

/** Small Gravice logo mark (dot globe with the orange core), drawn as SVG. */
export function GlobeMark({ size = 28, dot = '#4A6FA5', core = '#F26B2F' }: { size?: number; dot?: string; core?: string }) {
  const els: ReactElement[] = [];
  for (let la = -60; la <= 60; la += 30)
    for (let lo = -75; lo <= 75; lo += 25) {
      const a = (la * Math.PI) / 180, o = (lo * Math.PI) / 180;
      const x = Math.cos(a) * Math.sin(o), y = Math.sin(a), z = Math.cos(a) * Math.cos(o);
      const cx = 14 + 12 * x, cy = 14 + 12 * y;
      els.push(
        <ellipse key={`${la}_${lo}`} cx={cx} cy={cy} rx={1.25 * Math.max(0.3, z)} ry={1.25} fill={dot} opacity={0.4 + 0.6 * z}
          transform={`rotate(${(Math.atan2(y, x) * 180) / Math.PI} ${cx} ${cy})`} />,
      );
    }
  return (
    <svg viewBox="0 0 28 28" width={size} height={size} aria-hidden="true">
      {els}
      <circle cx={14} cy={14} r={3.6} fill={core} />
    </svg>
  );
}
