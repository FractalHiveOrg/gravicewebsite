/** Static dot-globe illustration (used for newsroom thumbnails). */
export function DotGlobeArt({ size = 300, rotation = 0.3, dot = '#4A6FA5', core = '#F26B2F' }: { size?: number; rotation?: number; dot?: string; core?: string }) {
  const R = size * 0.42, c = size / 2, dr = size * 0.022;
  const els: JSX.Element[] = [];
  for (let la = -72; la <= 72; la += 12)
    for (let lo = 0; lo < 360; lo += 15) {
      const a = (la * Math.PI) / 180, b = (lo * Math.PI) / 180 + rotation;
      const x = Math.cos(a) * Math.sin(b), y = Math.sin(a), z = Math.cos(a) * Math.cos(b);
      if (z <= 0.02) continue;
      const px = c + R * x, py = c + R * y;
      els.push(
        <ellipse key={`${la}_${lo}`} cx={px} cy={py} rx={dr * Math.max(0.2, z)} ry={dr * (0.6 + 0.4 * z)} fill={dot} opacity={0.45 + 0.55 * z}
          transform={`rotate(${(Math.atan2(y, x) * 180) / Math.PI} ${px} ${py})`} />,
      );
    }
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} aria-hidden="true">
      <circle cx={c} cy={c} r={R * 0.6} fill={core} opacity={0.12} />
      {els}
      <circle cx={c} cy={c} r={R * 0.18} fill={core} />
    </svg>
  );
}
