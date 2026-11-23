import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import usePartners from "../hooks/usePartners";
import { useLanguage } from "../context/LanguageContext";

const AUTO_SPEED = 0.6; // px per frame for the slow auto-slide

function PartnerItem({ p, hidden, onClickCapture }) {
  return (
    <li className="partners-item" aria-hidden={hidden || undefined}>
      <Link
        to={p.supplier ? `/products?supplier=${p.supplier}` : "/products"}
        tabIndex={hidden ? -1 : undefined}
        title={p.name}
        className="partners-link"
        draggable="false"
        onClickCapture={onClickCapture}
      >
        {p.logo ? (
          <img
            src={p.logo}
            alt={hidden ? "" : p.name}
            draggable="false"
            className="partners-img"
            style={{ "--h": p.height }}
          />
        ) : (
          <span className="partners-wordmark">{p.name}</span>
        )}
      </Link>
    </li>
  );
}

/**
 * Footer strip: sliding row of partner logos that the visitor can also scroll
 * left & right (client review: "add the option to scroll left & right").
 * - Auto-slides slowly and loops seamlessly (the list is rendered twice).
 * - Arrow buttons, mouse drag, touch swipe and trackpad/shift-wheel all scroll it;
 *   auto-slide pauses while the visitor interacts and resumes a moment later.
 * - dir="ltr" keeps the direction correct when the site is in Arabic (RTL).
 * - Reduced-motion visitors get no auto-slide, but can still scroll manually.
 */
export default function PartnersStrip() {
  const { t } = useLanguage();
  const partners = usePartners();
  const scrollerRef = useRef(null);
  const pausedRef = useRef(false);
  const resumeTimer = useRef(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let raf;
    let pos = el.scrollLeft;
    const step = () => {
      const half = el.scrollWidth / 2;
      if (!pausedRef.current && !reduce && half > el.clientWidth / 2) {
        pos += AUTO_SPEED;
        if (pos >= half) pos -= half;
        el.scrollLeft = pos;
      } else {
        pos = el.scrollLeft;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [partners.length]);

  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  if (!partners.length) return null;
  const run = [...partners, ...partners];

  const pause = () => {
    pausedRef.current = true;
    clearTimeout(resumeTimer.current);
  };
  const resumeLater = (ms = 2500) => {
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => (pausedRef.current = false), ms);
  };

  // keep the scroll position inside the duplicated range so it never hits an edge
  const wrap = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const half = el.scrollWidth / 2;
    if (el.scrollLeft < 40) el.scrollLeft += half;
    else if (el.scrollLeft > half + 40) el.scrollLeft -= half;
  };

  const scrollByStep = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    pause();
    wrap();
    el.scrollBy({ left: dir * Math.max(240, el.clientWidth * 0.5), behavior: "smooth" });
    resumeLater(4000);
  };

  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse") return; // touch uses native scrolling
    const el = scrollerRef.current;
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft, moved: false };
    pause();
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 4) d.moved = true;
    scrollerRef.current.scrollLeft = d.startLeft - dx;
  };
  const endDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    wrap();
    resumeLater();
  };
  // a drag should not count as a click on the logo underneath
  const swallowClickAfterDrag = (e) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  const arrowCls =
    "partners-arrow absolute top-1/2 -translate-y-1/2 z-[2] h-10 w-10 flex items-center justify-center rounded-full bg-white text-ink border border-ink/10 shadow-[0_10px_24px_-10px_rgba(19,28,51,.35)] transition-colors duration-300 hover:bg-flame1 hover:text-white hover:border-flame1";

  return (
    <section aria-label={t("brands.eyebrow")} className="bg-white border-b border-ink/[.08]">
      <div className="pt-12 pb-12 md:pt-14 md:pb-14">
        <div className="sec-head sec-head-center mb-9 px-8">{t("brands.eyebrow")}</div>
        <div className="relative" dir="ltr" onMouseEnter={pause} onMouseLeave={() => { endDrag(); resumeLater(800); }}>
          <button type="button" onClick={() => scrollByStep(-1)} aria-label="Scroll partners left" className={arrowCls} style={{ left: "1rem" }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button type="button" onClick={() => scrollByStep(1)} aria-label="Scroll partners right" className={arrowCls} style={{ right: "1rem" }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
          </button>

          <div
            ref={scrollerRef}
            className="partners-marquee partners-scroller"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onTouchStart={pause}
            onTouchEnd={() => { wrap(); resumeLater(); }}
            onWheel={() => { pause(); wrap(); resumeLater(); }}
          >
            <div className="partners-track">
              <ul className="partners-list">
                {run.map((p, i) => (
                  <PartnerItem key={`a-${i}`} p={p} hidden={i >= partners.length} onClickCapture={swallowClickAfterDrag} />
                ))}
              </ul>
              <ul className="partners-list" aria-hidden="true">
                {run.map((p, i) => (
                  <PartnerItem key={`b-${i}`} p={p} hidden onClickCapture={swallowClickAfterDrag} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
