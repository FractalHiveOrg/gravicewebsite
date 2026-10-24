import Image from "next/image";
import { NicoMark } from "@/components/NicoMark";

const W = 499;
const H = 440;

function pct(n: number, total: number) {
  return `${(n / total) * 100}%`;
}

const segments = [
  { src: "/sections/platform/segment-n.svg", inset: "5.63% 33.59% 78.45% 33.59%" },
  { src: "/sections/platform/segment-ne.svg", inset: "9.24% 9.24% 62.11% 62.11%" },
  { src: "/sections/platform/segment-e.svg", inset: "33.59% 5.63% 33.59% 78.45%" },
  { src: "/sections/platform/segment-se.svg", inset: "62.11% 9.24% 9.24% 62.11%" },
  { src: "/sections/platform/segment-s.svg", inset: "78.45% 33.59% 5.63% 33.59%" },
  { src: "/sections/platform/segment-sw.svg", inset: "62.11% 62.11% 9.24% 9.24%" },
  { src: "/sections/platform/segment-w.svg", inset: "33.59% 78.45% 33.59% 5.63%" },
  { src: "/sections/platform/segment-nw.svg", inset: "9.24% 62.11% 62.11% 9.24%" },
] as const;

const capabilities = [
  { label: "Audit trail", x: 245, y: 53, w: 70 },
  { label: "Smart alerts", x: 361, y: 97, w: 70 },
  { label: "Approval workflows", x: 410, y: 201, w: 70 },
  { label: "Document Intelligence", x: 361, y: 322, w: 70, lines: 2 },
  { label: "Dashboards & MIS", x: 245, y: 368, w: 70 },
  { label: "Access control", x: 131, y: 324, w: 70, lines: 2 },
  { label: "Integrations & APIs", x: 81.5, y: 203, w: 57, lines: 2 },
  { label: "Compliance reports", x: 129, y: 92, w: 70 },
] as const;

export function PlatformWheel({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[min(100%,560px)] overflow-visible ${className}`}
      style={{ aspectRatio: `${W} / ${H}` }}
      role="img"
      aria-label="Gravice platform layer: ElevateRM, V-Track, and NICO sit above LOS, CMS, ERP, and core banking, with shared assurance capabilities around the Gravity Mirror hub."
    >
      {/* Rings frame — outer ring scaled up so system labels sit in its band */}
      <div
        className="absolute"
        style={{
          left: pct(26, W),
          top: pct(-1, H),
          width: pct(438, W),
          height: pct(440, H),
        }}
      >
        <div className="absolute -inset-[7%]">
          <Image
            src="/sections/platform/ring-outer.svg"
            alt=""
            fill
            className="object-contain"
            unoptimized
          />
        </div>
        {segments.map((s) => (
          <div key={s.src} className="absolute" style={{ inset: s.inset }}>
            <Image
              src={s.src}
              alt=""
              fill
              className="object-fill"
              unoptimized
            />
          </div>
        ))}
      </div>

      {/* Product circles */}
      <div
        className="absolute"
        style={{
          left: pct(177.68, W),
          top: pct(103, H),
          width: pct(134.75, W),
          height: pct(134.75, H),
        }}
      >
        <Image
          src="/sections/platform/circle-elevaterm.svg"
          alt=""
          fill
          className="object-contain"
          unoptimized
        />
      </div>
      <div
        className="absolute"
        style={{
          left: pct(219.35, W),
          top: pct(175.19, H),
          width: pct(134.75, W),
          height: pct(134.75, H),
        }}
      >
        <Image
          src="/sections/platform/circle-vtrack.svg"
          alt=""
          fill
          className="object-contain"
          unoptimized
        />
      </div>
      <div
        className="absolute"
        style={{
          left: pct(136, W),
          top: pct(175.19, H),
          width: pct(134.75, W),
          height: pct(134.75, H),
        }}
      >
        <Image
          src="/sections/platform/circle-nico.svg"
          alt=""
          fill
          className="object-contain"
          unoptimized
        />
      </div>

      {/* Hub + symbol */}
      <div
        className="absolute"
        style={{
          left: pct(214.05, W),
          top: pct(187.5, H),
          width: pct(62, W),
          height: pct(62, H),
        }}
      >
        <Image
          src="/sections/platform/hub.svg"
          alt=""
          fill
          className="object-contain"
          unoptimized
        />
      </div>
      <div
        className="absolute"
        style={{
          left: pct(225.05, W),
          top: pct(198.5, H),
          width: pct(40, W),
          height: pct(40, H),
        }}
      >
        <Image
          src="/brand/symbol-on-dark.svg"
          alt=""
          fill
          className="object-contain"
          unoptimized
        />
      </div>

      {/* Product names on circles */}
      <p
        className="absolute -translate-x-1/2 font-serif text-[clamp(0.7rem,2.2vw,0.875rem)] font-normal leading-[1.3] text-white"
        style={{ left: pct(245.05, W), top: pct(132.5, H) }}
      >
        ElevateRM
      </p>
      <p
        className="absolute -translate-x-1/2 font-serif text-[clamp(0.7rem,2.2vw,0.875rem)] font-normal leading-[1.3] text-white"
        style={{ left: pct(311, W), top: pct(234, H) }}
      >
        V-Track
      </p>
      <div
        className="absolute flex -translate-x-1/2 items-center"
        style={{ left: pct(182, W), top: pct(234, H) }}
      >
        <NicoMark on="dark" height={16} />
      </div>

      {/* Capability labels */}
      {capabilities.map((c) => (
        <p
          key={c.label}
          className="absolute -translate-x-1/2 text-center text-[clamp(0.55rem,1.6vw,0.625rem)] leading-[1.4] text-paper"
          style={{
            left: pct(c.x, W),
            top: pct(c.y, H),
            width: pct(c.w, W),
          }}
        >
          {c.label}
        </p>
      ))}

      {/* Outer system labels — seated on the enlarged outer ring */}
      <p
        className="absolute -translate-x-1/2 text-[clamp(0.6rem,1.7vw,0.75rem)] font-semibold uppercase tracking-[0.08em] text-navy-200"
        style={{ left: pct(245, W), top: pct(8, H) }}
      >
        LOS
      </p>
      <p
        className="absolute -translate-x-1/2 text-[clamp(0.6rem,1.7vw,0.75rem)] font-semibold uppercase tracking-[0.08em] text-navy-200"
        style={{ left: pct(245, W), top: pct(412, H) }}
      >
        ERP
      </p>
      <p
        className="absolute -translate-y-1/2 rotate-90 text-[clamp(0.6rem,1.7vw,0.75rem)] font-semibold uppercase tracking-[0.08em] text-navy-200"
        style={{ left: pct(438, W), top: pct(220, H) }}
      >
        CMS
      </p>
      <p
        className="absolute -translate-y-1/2 -rotate-90 whitespace-nowrap text-[clamp(0.55rem,1.5vw,0.6875rem)] font-semibold uppercase tracking-[0.08em] text-navy-200"
        style={{ left: pct(4, W), top: pct(220, H) }}
      >
        Core banking
      </p>
    </div>
  );
}
