import Image from "next/image";

/**
 * Security band visual (Figma: "Visual: sign-in activity", Platform — Desktop (v3)).
 * A sign-in activity table, clipped by the right edge of the panel, with three
 * security-control cards floating over its lower left. Demo data only.
 */

const ROWS = [
  { user: "R. Mehta", where: "Mumbai · laptop", method: "2-step check", when: "Today, 09:58", allowed: true },
  { user: "Unknown user", where: "New device", method: "Password only", when: "Today, 09:41", allowed: false },
  { user: "A. Khan", where: "Pune · phone", method: "2-step check", when: "Today, 09:30", allowed: true },
];

const CONTROLS = [
  { title: "2-step sign-in", note: "On for everyone", icon: "/platform/security-control-key.svg" },
  { title: "Session timeout", note: "After 15 minutes idle", icon: "/platform/security-control-timer.svg" },
  { title: "Activity trail", note: "Every action recorded", icon: "/platform/security-control-trail.svg" },
];

const CELL = "flex w-[150px] shrink-0 flex-col justify-center gap-[3px] border-[#e8e4db] p-4 whitespace-nowrap";

function Status({ allowed }: { allowed: boolean }) {
  return (
    <span
      className={`flex items-center gap-1.5 rounded-full py-1 pr-2.5 pl-2 text-[13px] font-semibold whitespace-nowrap ${
        allowed ? "bg-[#e3f2e8] text-[#1f6b3a]" : "bg-[#fde9df] text-[#b4501f]"
      }`}
    >
      <Image
        src={allowed ? "/platform/security-status-allowed.svg" : "/platform/security-status-blocked.svg"}
        alt=""
        width={13}
        height={13}
        unoptimized
        className="shrink-0"
      />
      {allowed ? "Allowed" : "Blocked"}
    </span>
  );
}

export function SecurityActivity() {
  return (
    <div
      aria-hidden
      className="relative h-[480px] w-full max-w-[540px] shrink-0 overflow-hidden rounded-[24px] bg-[#e9e4da] max-sm:max-w-none"
    >
      <div className="absolute top-12 left-[130px] flex flex-col gap-5 rounded-[18px] bg-white px-7 pt-7 pb-40 shadow-[0_12px_32px_rgba(0,0,0,0.18)]">
        <div className="flex items-center gap-2.5">
          <Image src="/platform/security-shield.svg" alt="" width={22} height={22} unoptimized className="shrink-0" />
          <p className="text-[24px] font-semibold whitespace-nowrap text-deep-space">Sign-in activity</p>
        </div>
        <div className="flex flex-col overflow-hidden rounded-xl border border-[#e8e4db]">
          <div className="flex bg-[#f4f2ed] text-[15px] font-semibold text-deep-space">
            {["User", "Sign-in", "Status"].map((h, i) => (
              <div
                key={h}
                className={`flex w-[150px] shrink-0 items-center border-[#e8e4db] px-4 py-3.5 ${i > 0 ? "border-l" : ""}`}
              >
                {h}
              </div>
            ))}
          </div>
          {ROWS.map((r) => (
            <div key={r.user} className="flex border-t border-[#e8e4db]">
              <div className={CELL}>
                <p className="text-[14px] font-semibold text-deep-space">{r.user}</p>
                <p className="text-[12px] text-[#5a6472]">{r.where}</p>
              </div>
              <div className={`${CELL} border-l`}>
                <p className="text-[14px] font-semibold text-deep-space">{r.method}</p>
                <p className="text-[12px] text-[#5a6472]">{r.when}</p>
              </div>
              <div className={`${CELL} border-l`}>
                <div className="flex">
                  <Status allowed={r.allowed} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fades the table out toward the bottom of the panel. */}
      <div className="absolute top-[310px] left-[130px] h-[170px] w-[410px] bg-linear-to-b from-white/0 via-white/92 via-75% to-white" />

      <div className="absolute top-[258px] left-6 flex flex-col gap-1.5">
        {CONTROLS.map((c) => (
          <div
            key={c.title}
            className="flex w-[268px] items-center gap-3 rounded-xl border border-[#e8e4db] bg-white py-2 pr-3.5 pl-2 shadow-[0_6px_16px_rgba(0,0,0,0.14)]"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-deep-space">
              <Image src={c.icon} alt="" width={20} height={20} unoptimized />
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-px whitespace-nowrap">
              <span className="text-[14px] font-semibold text-deep-space">{c.title}</span>
              <span className="text-[12px] text-[#5a6472]">{c.note}</span>
            </span>
            <Image src="/platform/security-toggle-on.svg" alt="" width={36} height={20} unoptimized className="shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
