import { useRef } from 'react';
import { NEWS } from '../content';
import { DotGlobeArt } from '../components/DotGlobeArt';

/** Newsroom rail. Its bottom edge is where the closing animation's dots rise from (data-gv="news"). */
export function Newsroom() {
  const rail = useRef<HTMLDivElement>(null);
  const by = (dx: number) => rail.current?.scrollBy({ left: dx, behavior: 'smooth' });
  return (
    <section
      className="gv-band gv-news gv-light"
      data-gv="news"
      id="news"
      data-cursor-surface="light"
    >
      <div className="gv-wrap">
        <div className="gv-news-top">
          <div className="gv-stack"><div className="gv-eyebrow">{NEWS.eyebrow}</div><h2>{NEWS.title}</h2></div>
          <div className="gv-rail-nav">
            <button type="button" aria-label="Scroll news left" onClick={() => by(-320)}>‹</button>
            <button type="button" aria-label="Scroll news right" onClick={() => by(320)}>›</button>
          </div>
        </div>
        <div className="gv-rail" ref={rail}>
          {NEWS.posts.map((p, i) => (
            <a className="gv-post" href={p.href} key={p.title}>
              <div className="gv-post-img"><DotGlobeArt size={300} rotation={0.3 + i * 0.5} /></div>
              <div className="gv-post-body"><span className="gv-cat">{p.cat}</span><h3>{p.title}</h3><p>{p.meta}</p></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
