import { NicoLogo } from '@/components/NicoLogo';
import { PRODUCTS, STORY } from '../content';
import { VtrackLogo } from '@/components/vtrack';
import { ElevateRMLogo } from '@/components/ElevateRMLogo';

/**
 * Three-column scroll story: sticky heading | sticky stage with the orbs | scrolling product steps.
 * The DotField engine reads data-gv attributes here; each step names its orb in data-gv-orb.
 */
export function ProductStory() {
  return (
    <section
      className="gv-band gv-story gv-light"
      data-gv="story"
      id="what"
      data-cursor-surface="light"
    >
      <div className="gv-wrap gv-story-grid">
        <div className="gv-s-left">
          <div className="gv-eyebrow">{STORY.eyebrow}</div>
          <h2>{STORY.title}</h2>
          <p>{STORY.body}</p>
          <div className="gv-ticks" aria-hidden="true">
            {STORY.steps.map((s) => (
              <span key={s.product} data-gv="tick">
                {PRODUCTS[s.product].name == "NICO" && <NicoLogo variant="black" size={60} />}
                {PRODUCTS[s.product].name == "V-Track" && <VtrackLogo variant="black" size={80} />}
                {PRODUCTS[s.product].name == "ElevateRM" && <ElevateRMLogo variant="black" size={80} />}
              </span>
            ))}

          </div>
        </div>
        <div className="gv-s-stage" data-gv="stage" aria-hidden="true">
          <canvas data-gv="orb-canvas" className="gv-orb-canvas" />
        </div>
        <div className="gv-s-right">
          {STORY.steps.map((s) => {
            const p = PRODUCTS[s.product];
            return (
              <div className="gv-step" data-gv="step" data-gv-orb={s.orb} key={s.product} style={{ ['--c' as string]: `var(--gv-${s.product})` }}>
                <div className="gv-eyebrow gv-eyebrow-product">

                  {/* {p.name} */}
                  {p.name == "NICO" && <NicoLogo variant="black" size={70} />}
                  {p.name == "V-Track" && <VtrackLogo variant="black" size={100} />}
                  {p.name == "ElevateRM" && <ElevateRMLogo variant="black" size={130} />}


                </div>
                <h3 className='whitespace-pre-line'>{s.title}</h3>
                <p>{s.body}</p>
                <a className="gv-textlink" href={p.href} data-clarity-event="product_link_click" data-clarity-source={`story_${s.product}`} {...(p.external ? { target: '_blank', rel: 'noreferrer' } : {})}>{s.link}</a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
