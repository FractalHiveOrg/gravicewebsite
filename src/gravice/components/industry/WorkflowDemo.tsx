'use client';

import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../../engine/core';

/**
 * Manufacturing page, "Workflow engine": tabs of example workflows. An orange dot runs along the
 * steps and each step lights up as the dot reaches it (one run = 7.5s), then the next example shows.
 * Clicking a tab picks that example and restarts the cycle. Reduced motion: no dot, no auto-cycle.
 * The CSS (gv-wf-*) is in gravice.css; the timing assumes 5 steps per workflow.
 */
export type WorkflowStep = { kind: string; title: string; detail: string };
export type Workflow = { name: string; steps: WorkflowStep[] };

export const MANUFACTURING_WORKFLOWS: Workflow[] = [
  { name: 'Supplier invoice approval', steps: [
    { kind: 'Trigger', title: 'Invoice arrives', detail: 'WhatsApp, email or upload' },
    { kind: 'Extract', title: 'NICO reads and checks', detail: 'Details, line items, your rules' },
    { kind: 'Rule', title: 'Above your limit?', detail: 'Route it for approval' },
    { kind: 'Notify', title: 'Approver alerted', detail: 'On WhatsApp or email' },
    { kind: 'Action', title: 'Entry posted', detail: 'To Tally / Zoho / ERP' },
  ] },
  { name: 'New order confirmation', steps: [
    { kind: 'Trigger', title: 'New order placed', detail: 'Website, email or WhatsApp' },
    { kind: 'Rule', title: 'Order checked', detail: 'Stock, value and customer type' },
    { kind: 'Notify', title: 'Confirmation sent', detail: 'Email to the customer' },
    { kind: 'Notify', title: 'Dispatch alerted', detail: 'WhatsApp or email to the warehouse team' },
    { kind: 'Action', title: 'Order recorded', detail: 'In Tally / Zoho / ERP' },
  ] },
  { name: 'Abandoned cart follow-up', steps: [
    { kind: 'Trigger', title: 'Cart abandoned', detail: 'Item added, no checkout' },
    { kind: 'Wait', title: '2 hours later', detail: 'Still no order' },
    { kind: 'Rule', title: 'High-value cart?', detail: 'Above your threshold' },
    { kind: 'Notify', title: 'Sales team alerted', detail: 'WhatsApp or email, with cart details' },
    { kind: 'Action', title: 'Follow-up created', detail: 'A call task for the business development team' },
  ] },
];

export function WorkflowDemo({ workflows = MANUFACTURING_WORKFLOWS, cycleMs = 7500 }: { workflows?: Workflow[]; cycleMs?: number }) {
  const [active, setActive] = useState(0);
  const [epoch, setEpoch] = useState(0); // bump to restart the timer on click
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => setActive((a) => (a + 1) % workflows.length), cycleMs);
    return () => clearInterval(id);
  }, [epoch, cycleMs, workflows.length]);
  const wf = workflows[active];
  return (
    <div className="gv-wf" style={{ ['--gv-wf-cycle' as string]: `${cycleMs}ms` }}>
      <div className="gv-wf-tabs" role="tablist">
        {workflows.map((w, i) => (
          <button key={w.name} type="button" role="tab" aria-selected={i === active} className={'gv-wf-tab' + (i === active ? ' gv-on' : '')}
            onClick={() => { setActive(i); setEpoch((e) => e + 1); }}>{w.name}</button>
        ))}
      </div>
      {/* key forces a remount so the CSS animations restart in sync with the tab */}
      <div className="gv-wf-panel" key={`${active}-${epoch}`} role="tabpanel" aria-label={`Example workflow: ${wf.name}`}>
        <div className="gv-wf-line" /><div className="gv-wf-run"><span className="gv-wf-dot" /></div>
        <ol className="gv-wf-steps">
          {wf.steps.map((s, i) => (
            <li key={i} style={{ ['--i' as string]: i }}><span className="gv-wf-k">{s.kind}</span><b>{s.title}</b><small>{s.detail}</small></li>
          ))}
        </ol>
      </div>
    </div>
  );
}
