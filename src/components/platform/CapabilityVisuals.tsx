import Image from "next/image";
import type { ReactNode } from "react";
import {
  Bell,
  Building2,
  Calculator,
  Check,
  ContactRound,
  Database,
  Eye,
  Folder,
  IdCard,
  Lock,
  MessageCircle,
  Share2,
  Shield,
  Sparkles,
  TriangleAlert,
  User,
  Users,
  X,
  Zap,
} from "lucide-react";

/**
 * Visuals for "Platform capabilities" (Figma: Platform — Desktop (v3), sticky scroll · 4 states).
 * Each one is drawn on a fixed 688 × 500 stage, which PlatformCapabilities scales to fit.
 * Demo data only.
 */

export const STAGE_W = 688;
export const STAGE_H = 500;

const SHADOW = "shadow-[0_8px_24px_rgba(13,26,43,0.12)]";

/** Product window with a navy frame, clipped by the stage on the right and bottom. */
function AppWindow({
  left,
  top,
  logo,
  title,
  titleIcon,
  children,
}: {
  left: number;
  top: number;
  logo: string;
  title: string;
  titleIcon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div
      style={{ left, top }}
      className="absolute h-[560px] w-[700px] overflow-hidden rounded-tl-[22px] border-t-[10px] border-l-[10px] border-[#1f3b63] bg-white"
    >
      <div className="flex h-[51px] items-center border-b border-[#ece9e2] px-[18px]">
        <Image src={logo} alt="" width={28} height={28} unoptimized />
      </div>
      <div className="flex h-[60px] items-center gap-3 border-b border-[#ece9e2] px-[18px]">
        {titleIcon}
        <p className="text-[20px] font-semibold text-deep-space">{title}</p>
      </div>
      {children}
    </div>
  );
}

/* —— 1 · Automate the flow —— */

const INVOICES = [
  { supplier: "Sharma Traders", amount: "₹1,84,500", ref: "INV-2048", flag: true },
  { supplier: "Patel Steel", amount: "₹62,300", ref: "INV-2049" },
  { supplier: "Patel Steel", amount: "₹62,300", ref: "INV-2049" },
  { supplier: "Kaveri Foods", amount: "₹38,900", ref: "INV-2050" },
];

export function AutomateStage() {
  return (
    <>
      <AppWindow left={96} top={60} logo="/NicoSymbolNavy.svg" title="Invoices waiting for approval">
        <div className="grid grid-cols-[231px_170px_1fr] bg-[#f4f2ed] text-[16px] font-semibold text-deep-space">
          {["Supplier", "Amount", "Check"].map((h) => (
            <span key={h} className="px-[17px] py-[17px]">
              {h}
            </span>
          ))}
        </div>
        {INVOICES.map((r, i) => (
          <div
            key={i}
            className={`grid h-[73px] grid-cols-[231px_170px_1fr] items-center border-b border-[#ece9e2] ${
              i === 2 ? "opacity-40" : i === 3 ? "opacity-20" : ""
            }`}
          >
            <span className="px-[17px] text-[16px] font-semibold text-deep-space">{r.supplier}</span>
            <span className="flex flex-col px-[17px]">
              <span className="text-[16px] font-semibold text-deep-space">{r.amount}</span>
              <span className="text-[13px] text-[#5a6472]">{r.ref}</span>
            </span>
            <span
              className={`flex items-center gap-2 px-[17px] text-[16px] font-medium ${
                r.flag ? "text-[#b4501f]" : "text-[#4a8a63]"
              }`}
            >
              {r.flag ? (
                <>
                  <TriangleAlert className="size-[18px]" strokeWidth={1.75} /> GSTIN mismatch
                </>
              ) : (
                <>
                  <Check className="size-[18px]" strokeWidth={1.75} /> Passed
                </>
              )}
            </span>
          </div>
        ))}
      </AppWindow>

      <div className="absolute top-[300px] left-7 flex h-[45px] w-[368px] items-center gap-3 rounded-lg bg-deep-space px-3.5 text-[15px] font-medium whitespace-nowrap text-paper shadow-[0_8px_20px_rgba(13,26,43,0.3)]">
        <TriangleAlert className="size-[18px] shrink-0 text-pull-orange" strokeWidth={1.75} />
        GSTIN doesn’t match the supplier record
      </div>
      <div className="absolute top-[354px] left-7 flex h-[44px] w-[396px] items-center gap-3 rounded-lg border-2 border-deep-space bg-white px-3.5 text-[15px] font-medium whitespace-nowrap text-deep-space shadow-[0_8px_20px_rgba(13,26,43,0.14)]">
        <Bell className="size-[18px] shrink-0 text-pull-orange" strokeWidth={1.75} />
        Routing to Finance head and alerting Priya...
      </div>
    </>
  );
}

/* —— 2 · Connect your systems —— */

const LEFT_APPS = [
  { label: "ERP", icon: Database },
  { label: "CRM", icon: ContactRound },
  { label: "Accounting", icon: Calculator },
  { label: "HR", icon: IdCard },
];
const RIGHT_APPS = [
  { label: "Drives", icon: Folder },
  { label: "AI tools", icon: Sparkles },
  { label: "Social media", icon: Share2 },
  { label: "Chat & email", icon: MessageCircle },
];

const TILE_TOPS = [40, 150, 260, 370];
const TILE = 74;
const MID_Y = 241;
const LINE = "#d0c9ba";

/** Elbow from a tile to the centre tile, via a vertical bus at `bus`. */
function elbow(fromX: number, y: number, bus: number, toX: number) {
  const dir = toX > fromX ? 1 : -1;
  const dy = MID_Y - y;
  if (Math.abs(dy) < 1) return `M${fromX} ${y}H${toX}`;
  const sy = dy > 0 ? 1 : -1;
  const r = 14;
  return `M${fromX} ${y}H${bus - dir * r}Q${bus} ${y} ${bus} ${y + sy * r}V${MID_Y - sy * r}Q${bus} ${MID_Y} ${
    bus + dir * r
  } ${MID_Y}H${toX}`;
}

function AppTile({ label, icon: Icon, x, y }: { label: string; icon: typeof Database; x: number; y: number }) {
  return (
    <div style={{ left: x, top: y }} className="absolute flex w-[74px] flex-col items-center gap-1.5">
      <span className="flex size-[74px] items-center justify-center rounded-[20px] bg-linear-to-b from-[#1f3556] to-[#0e1b2c] shadow-[0_6px_14px_rgba(13,26,43,0.25)]">
        <Icon className="size-[34px] text-paper" strokeWidth={1.4} />
      </span>
      <span className="text-[12.5px] whitespace-nowrap text-[#5a6472]">{label}</span>
    </div>
  );
}

export function ConnectStage() {
  const ys = TILE_TOPS.map((t) => t + TILE / 2);
  return (
    <>
      <svg viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} className="absolute inset-0 size-full" fill="none">
        {ys.map((y) => (
          <path key={`l${y}`} d={elbow(58 + TILE, y, 212, 274)} stroke={LINE} strokeWidth="1.6" />
        ))}
        {ys.map((y) => (
          <path key={`r${y}`} d={elbow(STAGE_W - 58 - TILE, y, 476, 414)} stroke={LINE} strokeWidth="1.6" />
        ))}
        {/* Data moving along the lines. */}
        {ys.map((y) => (
          <path key={`lm${y}`} d={`M167 ${y}H177`} stroke="#f6682e" strokeWidth="3" strokeLinecap="round" />
        ))}
        {[ys[1], ys[3]].map((y) => (
          <path key={`rm${y}`} d={`M510 ${y}H520`} stroke="#f6682e" strokeWidth="3" strokeLinecap="round" />
        ))}
        <path d="M212 126V136M212 212V222M212 258V268M476 200V210M476 266V276" stroke="#f6682e" strokeWidth="3" strokeLinecap="round" />
      </svg>

      {LEFT_APPS.map((a, i) => (
        <AppTile key={a.label} {...a} x={58} y={TILE_TOPS[i]} />
      ))}
      {RIGHT_APPS.map((a, i) => (
        <AppTile key={a.label} {...a} x={STAGE_W - 58 - TILE} y={TILE_TOPS[i]} />
      ))}

      <div className="absolute top-[172px] left-[274px] flex size-[139px] items-center justify-center rounded-[30px] border border-[#6b4a3f] bg-linear-to-b from-[#1f3556] to-[#0e1b2c] shadow-[0_12px_28px_rgba(13,26,43,0.3)]">
        <span
          className="absolute size-[96px] rounded-full opacity-80"
          style={{
            backgroundImage: "radial-gradient(#4a6fa5 1.1px, transparent 1.6px)",
            backgroundSize: "7px 7px",
            maskImage: "radial-gradient(circle, #000 55%, transparent 72%)",
          }}
        />
        <span className="relative size-[18px] rounded-full bg-pull-orange shadow-[0_0_18px_6px_rgba(246,104,46,0.55)]" />
      </div>
      <p className="absolute top-[322px] left-0 w-full text-center text-[15px] font-semibold text-deep-space">
        GraviceOS
      </p>
      <p className="absolute top-[347px] left-1/2 -translate-x-1/2 rounded-full border border-[#d9d3c6] bg-white/70 px-3 py-[3px] text-[12px] whitespace-nowrap text-[#5a6472]">
        + many more apps
      </p>
    </>
  );
}

/* —— 3 · Secure and traceable —— */

const ACCESS = [
  { role: "Credit officers", note: "Can edit", icon: User, badge: "bg-[#1f6b3a]", badgeIcon: Check },
  { role: "Risk team", note: "Can view", icon: Shield, badge: "bg-[#24467a]", badgeIcon: Eye },
  { role: "Relationship managers", note: "Can view", icon: Users, badge: "bg-[#24467a]", badgeIcon: Eye },
  { role: "Outside valuers", note: "No access", icon: Building2, badge: "bg-[#b4501f]", badgeIcon: Lock },
];

const RECORD = [
  {
    field: "Revaluation date",
    value: "15 Dec 2026",
    delta: "was 15 Jan 2027 ▼",
    deltaClass: "text-[#b4501f]",
    who: "R. Mehta",
    when: "Today, 10:42",
  },
  {
    field: "Market value",
    value: "₹48,20,000",
    delta: "was ₹46,75,000 ▲",
    deltaClass: "text-[#2f7a4a]",
    who: "A. Khan",
    when: "Today, 10:15",
  },
  {
    field: "Valuation report",
    value: "Version 2",
    delta: "was version 1",
    deltaClass: "text-[#8a93a0]",
    who: "A. Khan",
    when: "Today, 10:15",
    faded: true,
  },
];

export function SecureStage() {
  return (
    <>
      <AppWindow left={150} top={56} logo="/vtrackSymbol.svg" title="Collateral Record">
        <div className="mx-[19px] mt-[2px] overflow-hidden rounded-t-xl border border-b-0 border-[#ece9e2]">
          <div className="grid grid-cols-[191px_200px_1fr] bg-[#f4f2ed] text-[16px] font-semibold text-deep-space">
            {["Field", "Current value", "Changed by"].map((h) => (
              <span key={h} className="px-[17px] py-[16px]">
                {h}
              </span>
            ))}
          </div>
          {RECORD.map((r) => (
            <div
              key={r.field}
              className={`grid h-[74px] grid-cols-[191px_200px_1fr] items-center border-t border-[#ece9e2] ${
                r.faded ? "opacity-40" : ""
              }`}
            >
              <span className="px-[17px] text-[15px] font-medium text-deep-space">{r.field}</span>
              <span className="flex flex-col px-[17px]">
                <span className="text-[16px] font-semibold text-deep-space">{r.value}</span>
                <span className={`text-[13px] ${r.deltaClass}`}>{r.delta}</span>
              </span>
              <span className="flex flex-col px-[17px]">
                <span className="text-[16px] font-semibold text-deep-space">{r.who}</span>
                <span className="text-[13px] text-[#5a6472]">{r.when}</span>
              </span>
            </div>
          ))}
        </div>
      </AppWindow>

      <div className="absolute top-[228px] left-[42px] flex flex-col gap-1.5">
        {ACCESS.map((a) => (
          <div
            key={a.role}
            className={`flex h-[59px] w-[299px] items-center gap-3 rounded-xl border border-[#e8e4db] bg-white pr-3.5 pl-2 ${SHADOW}`}
          >
            <span className="flex size-[42px] shrink-0 items-center justify-center rounded-lg bg-deep-space">
              <a.icon className="size-[22px] text-paper" strokeWidth={1.5} />
            </span>
            <span className="flex min-w-0 flex-1 flex-col whitespace-nowrap">
              <span className="text-[16px] font-semibold text-deep-space">{a.role}</span>
              <span className="text-[13px] text-[#5a6472]">{a.note}</span>
            </span>
            <span className={`flex size-7 shrink-0 items-center justify-center rounded-full ${a.badge}`}>
              <a.badgeIcon className="size-[15px] text-white" strokeWidth={2} />
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

/* —— 4 · Intelligence built in —— */

const FLOW_NODES = [
  { top: 224, w: 319, label: "If…", text: "invoice is on hold for 7+ days" },
  { top: 300, w: 276, label: "And…", text: "amount is over ₹1,00,000" },
  { top: 376, w: 383, label: "Then…", text: "Send a weekly summary to the Finance head" },
];

export function IntelligenceStage() {
  return (
    <>
      <AppWindow
        left={110}
        top={36}
        logo="/NicoSymbolNavy.svg"
        title="Workflow builder"
        titleIcon={
          <span className="flex size-10 items-center justify-center rounded-lg bg-deep-space">
            <Zap className="size-5 text-pull-orange" strokeWidth={1.75} />
          </span>
        }
      >
        <div
          className="h-full"
          style={{ backgroundImage: "radial-gradient(#ddd9cf 1.2px, transparent 1.6px)", backgroundSize: "26px 26px" }}
        />
      </AppWindow>

      {FLOW_NODES.map((n) => (
        <div
          key={n.top}
          style={{ top: n.top, left: 216, width: n.w }}
          className={`absolute flex h-[59px] items-center gap-3 rounded-xl border border-[#e8e4db] bg-white px-2.5 ${SHADOW}`}
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-deep-space">
            <Sparkles className="size-5 text-paper" strokeWidth={1.5} />
          </span>
          <span className="flex min-w-0 flex-col whitespace-nowrap">
            <span className="text-[12px] text-[#8a93a0]">{n.label}</span>
            <span className="text-[16px] font-semibold text-deep-space">{n.text}</span>
          </span>
        </div>
      ))}

      <div className="absolute top-[250px] left-6 w-[309px] overflow-hidden rounded-xl border-2 border-pull-orange bg-white shadow-[0_12px_28px_rgba(13,26,43,0.2)]">
        <div className="flex h-[46px] items-center gap-2 border-b border-[#ece9e2] px-3.5">
          <Sparkles className="size-[18px] text-pull-orange" strokeWidth={1.75} />
          <p className="flex-1 text-[16px] font-semibold text-deep-space">Gravice Intelligence</p>
          <X className="size-[16px] text-[#8a93a0]" strokeWidth={1.75} />
        </div>
        <div className="flex flex-col gap-3 p-3.5">
          <p className="ml-4 rounded-xl bg-[#efebe4] px-3.5 py-3 text-[14px] leading-[1.45] text-deep-space">
            Every Monday, email the Finance head a summary of invoices on hold for over 7 days and above ₹1 lakh.
          </p>
          <p className="flex items-center gap-2 text-[14px] text-[#b4501f]">
            <Sparkles className="size-[15px]" strokeWidth={1.75} />
            Building your workflow...
          </p>
        </div>
      </div>
    </>
  );
}
