"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MediaCoverage } from "@/lib/news";

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

const AUTO_ADVANCE_MS = 5000;

/** Distance from one card's start to the next (card width + gap). */
function cardStride(track: HTMLElement) {
  const [a, b] = Array.from(track.children as HTMLCollectionOf<HTMLElement>);
  return a && b ? b.offsetLeft - a.offsetLeft : track.clientWidth;
}

/**
 * Horizontal, swipeable row of press-coverage cards with prev/next buttons. Cards are sized so ~20% of
 * the next card peeks in, and the row advances one card every few seconds (looping back to the start),
 * pausing while hovered, focused or touched, and never for users who prefer reduced motion.
 */
export function MediaCarousel({ items }: { items: MediaCoverage[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [update]);

  /** Arrows move by the number of fully visible cards. */
  const scrollByPage = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const stride = cardStride(el);
    const perPage = Math.max(1, Math.floor((el.clientWidth + 1) / stride));
    el.scrollBy({ left: dir * perPage * stride, behavior: "smooth" });
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      const el = trackRef.current;
      if (!el || pausedRef.current || document.hidden) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
      else el.scrollBy({ left: cardStride(el), behavior: "smooth" });
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, []);

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  const buttonClass =
    "flex size-11 items-center justify-center rounded-full border border-navy-100 bg-white text-deep-space transition-colors hover:border-navy hover:text-navy disabled:cursor-default disabled:opacity-35 disabled:hover:border-navy-100 disabled:hover:text-deep-space";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Media coverage"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
    >
      <div
        ref={trackRef}
        // padding (offset by negative margin) leaves room for the hover lift and shadow, which overflow would clip
        className="-mx-4 -my-4 flex snap-x snap-mandatory scroll-px-4 gap-6 overflow-x-auto px-4 pt-4 pb-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <a
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="motion-card group flex w-[calc((100%-24px)/1.2)] shrink-0 snap-start flex-col gap-3 rounded-[20px] border border-navy-100/60 bg-white px-6 pb-6 pt-5 hover:border-navy-100 sm:w-[calc((100%-48px)/2.2)] lg:w-[calc((100%-72px)/3.2)]"
          >
            <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-slate">
              {item.publication}
              {item.date && (
                <>
                  {" · "}
                  <time dateTime={item.date}>{formatDate(item.date)}</time>
                </>
              )}
            </p>
            <h3 className="font-serif text-[20px] font-normal leading-[1.2] text-deep-space transition-colors group-hover:text-navy">
              {item.title}
            </h3>
            <span className="mt-auto pt-2 text-[14px] font-medium text-pull-orange-deep">
              Read on {item.publication} ↗
            </span>
          </a>
        ))}
      </div>

      <div className="mt-0 flex justify-end gap-3">
        <button
          type="button"
          aria-label="Previous articles"
          className={buttonClass}
          disabled={!canPrev}
          onClick={() => scrollByPage(-1)}
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Next articles"
          className={buttonClass}
          disabled={!canNext}
          onClick={() => scrollByPage(1)}
        >
          →
        </button>
      </div>
    </div>
  );
}
