import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useIndustries from "../hooks/useIndustries";
import useProjects from "../hooks/useProjects";
import { industriesAr } from "../i18n/arabicContent";
import { useLanguage } from "../context/LanguageContext";

const AUTO_SPEED = 0.85; // px per frame for the slow auto-scroll

// Sector card -> matching project category on /projects (?type=<category>).
// Matched by the sector's id/title keywords so sectors added in the CMS link up too;
// a sector with no matching project category opens the full projects list.
const SECTOR_KEYWORDS = [
  [/hotel|hospitality|resort/i, /hospitality|hotel/i],
  [/health|hospital|clinic|medical/i, /health|medical/i],
  [/school|universit|educat|college/i, /educat|school/i],
  [/manufactur|industr|factory|plant|oil|gas/i, /industr|oil|gas|manufactur/i],
  [/warehouse|logistic/i, /warehouse|logistic/i],
  [/mall|retail|shopping/i, /mall|shopping|retail/i],
  [/residential|tower|office|commercial|high-rise/i, /residential|commercial|high-rise/i],
  [/government|public|civic/i, /government|public/i],
];
function sectorHref(item, categories) {
  const hay = `${item.id || ""} ${item.title || ""}`;
  for (const [sectorRe, catRe] of SECTOR_KEYWORDS) {
    if (!sectorRe.test(hay)) continue;
    const cat = categories.find((c) => catRe.test(c));
    if (cat) return `/projects?type=${encodeURIComponent(cat)}`;
  }
  return "/projects";
}

export default function Industries({ id }) {
  const { t, lang } = useLanguage();
  const isRtl = lang === "ar";
  const industries = useIndustries();
  const { projects } = useProjects();
  const categories = [...new Set(projects.map((p) => p.category).filter(Boolean))];
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
        </div>
        <div className="sec-head">{t("industries.eyebrow")}</div>
        <h2 className="sec-sub max-w-[680px]">
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
              <Link
                key={`${item.id}-${i}`}
                to={sectorHref(item, categories)}
                className="industries-card"
                aria-hidden={i >= industries.length || undefined}
                tabIndex={i >= industries.length ? -1 : undefined}
                draggable="false"
              >
                <div className="industries-card-img">
                  <img src={item.image} alt={item.title} loading="lazy" draggable="false" />
                </div>
                <div className="industries-card-label">
                  <span>{lang === "ar" ? industriesAr[item.id] || item.title : item.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
