import { PRODUCTS, WORKFLOW } from '../content';

/** Workflow map: four stages, the product that owns each, one shared platform bar underneath. */
export function WorkflowMap() {
  return (
    <section className="gv-band gv-flow gv-light" id="products">
      <div className="gv-wrap">
        <div className="gv-flow-head">
          <div className="gv-eyebrow">{WORKFLOW.eyebrow}</div>
          <h2>{WORKFLOW.title}</h2>
          <p>{WORKFLOW.body}</p>
        </div>
        <ol className="gv-stages">
          {WORKFLOW.stages.map((st) => {
            const p = PRODUCTS[st.product];
            return (
              <li className="gv-stage" key={st.n} style={{ ['--c' as string]: `var(--gv-${st.product})`, ['--t' as string]: `var(--gv-${st.product}-t)` }}>
                <span className="gv-num">{st.n}</span>
                <h3>{st.title}</h3>
                <ul>{st.items.map((it) => <li key={it}>{it}</li>)}</ul>
                <span className="gv-ind">{st.who}</span>
                <a className="gv-badge" href={p.href} {...(p.external ? { target: '_blank', rel: 'noreferrer' } : {})}><i>{p.letter}</i>{p.name}</a>
              </li>
            );
          })}
        </ol>
        <div className="gv-platform">
          <div className="gv-pf-stream" aria-hidden="true"><span className="gv-pf-core" /></div>
          <div className="gv-pf-copy"><b>{WORKFLOW.platform.title}</b><span>{WORKFLOW.platform.body}</span></div>
        </div>
        <div className="gv-pfoot"><a className="gv-btn gv-btn-primary" href="#cta">Book a demo</a></div>
      </div>
    </section>
  );
}
