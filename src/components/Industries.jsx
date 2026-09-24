import { useEffect, useRef } from "react";
import { industries } from "../data/content";
import { industriesAr } from "../i18n/arabicContent";
import { useLanguage } from "../context/LanguageContext";

const AUTO_SPEED = 0.45; // px per frame for the slow auto-scroll

export default function Industries({ id }) {
  const { t, lang } = useLanguage();
  const isRtl = lang === "ar";
  // duplicated list so the track can loop seamlessly
  const track = [...industries, ...industries];
  const scrollerRef = useRef(null);
  const pausedRef = useRef(false);
  const resumeTimer = useRef(null);

  // Slow continuous auto-scroll that loops at the halfway point.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let raf;
    let pos = Math.abs(el.scrollLeft);
    const step = () => {
      const half = el.scrollWidth / 2;
      if (!pausedRef.current && !reduce && half > 0) {
        pos += AUTO_SPEED;
        if (pos >= half) pos -= half;
        el.scrollLeft = isRtl ? -pos : pos;
      } else {
        pos = Math.abs(el.scrollLeft);
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isRtl]);

  const pause = () => {
    pausedRef.current = true;
    clearTimeout(resumeTimer.current);
  };
  const resumeLater = (ms = 2500) => {
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => (pausedRef.current = false), ms);
  };

  const scrollByCard = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    pause();
    const card = el.querySelector(".industries-card");
    const amount = (card ? card.offsetWidth + 22 : 280) * dir * (isRtl ? -1 : 1);
    const half = el.scrollWidth / 2;
    // keep inside the duplicated range so back/forth never hits an edge
    const cur = Math.abs(el.scrollLeft);
    if (dir < 0 && cur < 300) el.scrollLeft = isRtl ? -(cur + half) : cur + half;
    if (dir > 0 && cur > half + 300) el.scrollLeft = isRtl ? -(cur - half) : cur - half;
    el.scrollBy({ left: amount, behavior: "smooth" });
    resumeLater(4000);
  };

  const arrowCls =
    "absolute top-1/2 -translate-y-1/2 z-[2] h-11 w-11 flex items-center justify-center rounded-full bg-white text-ink border border-ink/10 shadow-[0_10px_24px_-10px_rgba(19,28,51,.35)] transition-colors duration-300 hover:bg-flame1 hover:text-white hover:border-flame1";

  return (
    <section id={id} className="bg-white py-[34px] md:py-[46px] overflow-hidden border-t border-ink/[.06]">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="flex items-center gap-3 mb-[18px]">
          <span className="inline-flex items-center justify-center px-2.5 py-1 text-[11px] font-bold tracking-[.08em] uppercase text-flame1 border border-flame1/40 bg-flame1/[.06] rounded ltr-content">
            {t("industries.badge")}
          </span>
          <span className="text-[11.5px] font-semibold tracking-[.22em] uppercase text-inksoft">
            {t("industries.eyebrow")}
          </span>
        </div>
        <h2 className="font-display font-semibold uppercase text-[28px] md:text-[40px] leading-[1.08] text-ink max-w-[680px]">
          {t("industries.title")}
        </h2>
      </div>

      <div className="relative mt-14" onMouseEnter={pause} onMouseLeave={() => resumeLater(800)}>
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label={isRtl ? "السابق" : "Previous"}
          className={arrowCls}
          style={{ [isRtl ? "right" : "left"]: "1rem" }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isRtl ? "scaleX(-1)" : undefined }}>
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label={isRtl ? "التالي" : "Next"}
          className={arrowCls}
          style={{ [isRtl ? "left" : "right"]: "1rem" }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isRtl ? "scaleX(-1)" : undefined }}>
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>

        <div
          ref={scrollerRef}
          className="industries-marquee"
          onTouchStart={pause}
          onTouchEnd={() => resumeLater()}
          onWheel={() => { pause(); resumeLater(); }}
        >
          <div className="industries-track">
            {track.map((item, i) => (
              <div key={`${item.id}-${i}`} className="industries-card" aria-hidden={i >= industries.length}>
                <div className="industries-card-img">
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>
                <div className="industries-card-label">
                  <span>{lang === "ar" ? industriesAr[item.id] || item.title : item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
