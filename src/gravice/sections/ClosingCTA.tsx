import { CLOSING } from '../content';

/** Closing banner. The dots gather into the globe at data-gv="cta-globe" as you scroll in. */
export function ClosingCTA() {
  return (
    <section
      className="gv-band gv-cta"
      data-gv="cta"
      id="cta"
      data-cursor-surface="dark"
    >
      <div className="gv-wrap gv-cta-inner">
        <div className="gv-cta-globe" data-gv="cta-globe" aria-hidden="true" />
        <h2>{CLOSING.title}</h2>
        <p>{CLOSING.body}</p>
        <div className="gv-row"><a className="gv-btn gv-btn-primary" href={CLOSING.cta.href}>{CLOSING.cta.label}</a></div>
      </div>
    </section>
  );
}
