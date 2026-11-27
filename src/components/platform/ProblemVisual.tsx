import { MessageCircle, Table2, Mail } from "lucide-react";

/**
 * "The problem" visual (Figma: "Visual: held together by hand", Platform — Desktop (v3)).
 * A forwarded email and a chat thread, both tilted, sitting on a half-visible spreadsheet
 * where the same invoice has been typed in twice. Demo data only.
 */

const ROWS = [
  { n: 2, supplier: "Sharma Traders", amount: "1,84,500", approved: "?", approvedWarn: true },
  { n: 3, supplier: "Patel Steel", amount: "62,300", approved: "Yes (email)" },
  { n: 4, supplier: "Kaveri Foods", amount: "38,900", approved: "", approvedWarn: true },
  { n: 5, supplier: "Sharma Traders", amount: "1,84,500", approved: "?", rowWarn: true },
];

const CELL = "flex h-[42px] items-center border-r border-b border-[#e4e0d6] px-3.5 text-[13px] whitespace-nowrap";

export function ProblemVisual() {
  return (
    <div
      aria-hidden
      className="relative h-[460px] w-full max-w-[560px] overflow-hidden rounded-[24px] bg-[#e9e4da] max-sm:max-w-none"
    >
      {/* Spreadsheet, running off the right and bottom edges. */}
      <div className="absolute top-[156px] left-[113px] w-[470px] rounded-tl-xl bg-white">
        <div className="flex h-[48px] items-center gap-2.5 px-4 pt-2.5 text-[15px] font-semibold text-deep-space">
          <Table2 className="size-[18px] text-[#1f6b3a]" strokeWidth={1.75} />
          invoices_FINAL_v3 (2).xlsx
        </div>
        <div className="grid grid-cols-[35px_170px_120px_1fr] bg-[#f4f2ed] font-semibold text-deep-space">
          <span className={CELL} />
          <span className={CELL}>Supplier</span>
          <span className={CELL}>Amount</span>
          <span className={CELL}>Approved?</span>
        </div>
        {ROWS.map((r) => (
          <div
            key={r.n}
            className={`grid grid-cols-[35px_170px_120px_1fr] ${r.rowWarn ? "text-[#b4501f]" : "text-deep-space"}`}
          >
            <span className={`${CELL} justify-center bg-[#f4f2ed] px-0 text-[#8a93a0]`}>{r.n}</span>
            <span className={`${CELL} ${r.rowWarn ? "bg-[#fde9df]" : ""}`}>{r.supplier}</span>
            <span className={`${CELL} ${r.rowWarn ? "bg-[#fde9df]" : ""}`}>{r.amount}</span>
            <span
              className={`${CELL} ${r.approvedWarn ? "bg-[#fde9df] text-[#b4501f]" : ""}`}
            >
              {r.approved}
            </span>
          </div>
        ))}
        <div className="h-[80px]" />
      </div>

      <span className="absolute top-[320px] left-[409px] flex items-center gap-1.5 rounded-full bg-pull-orange px-3 py-[7px] text-[13px] font-semibold text-white shadow-[0_6px_14px_rgba(246,104,46,0.35)]">
        <span className="size-1.5 rounded-full bg-white" />
        Typed in twice
      </span>

      {/* Forwarded email */}
      <div className="absolute top-[22px] left-[6px] w-[266px] -rotate-[8deg] rounded-xl bg-white px-4 py-3.5 shadow-[0_10px_24px_rgba(0,0,0,0.14)]">
        <p className="flex items-center gap-2 text-[13px] font-semibold text-deep-space">
          <Mail className="size-4 shrink-0" strokeWidth={1.75} />
          Fwd: Fwd: RE: Invoice approval
        </p>
        <p className="mt-2 text-[13.5px] leading-[1.45] text-[#5a6472]">
          Can someone confirm if INV-2048 was approved? I can’t find the latest sheet.
        </p>
        <p className="mt-2 text-[11px] text-[#8a93a0]">Priya · 3 days ago</p>
      </div>

      {/* Finance chat */}
      <div className="absolute top-[16px] left-[290px] w-[262px] rotate-[8deg] rounded-xl bg-white p-3.5 shadow-[0_10px_24px_rgba(0,0,0,0.14)]">
        <p className="flex items-center gap-2 text-[13px] font-semibold text-deep-space">
          <MessageCircle className="size-4 shrink-0" strokeWidth={1.75} />
          Finance team chat
        </p>
        <p className="mt-2.5 rounded-lg bg-[#f0ece4] px-3 py-2.5 text-[13px] leading-[1.35] font-medium text-deep-space">
          Who changed the amount on INV-2048?
        </p>
        <p className="mt-2 ml-2 w-fit rounded-lg bg-deep-space px-3 py-2 text-[13px] font-medium text-white">
          Not sure. Check the sheet?
        </p>
      </div>
    </div>
  );
}
