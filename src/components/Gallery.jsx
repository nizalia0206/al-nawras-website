import { useEffect, useState } from "react";
import useReveal from "../hooks/useReveal";
import { useLanguage } from "../context/LanguageContext";
import { systemsCommon } from "../i18n/pagesAr";

function GalleryCard({ item, category, onOpen }) {
  const { lang } = useLanguage();
  return (
    <div
      className="group relative bg-white rounded-sm border border-black/[.08] overflow-hidden text-left transition-all duration-500 ease-[var(--ease)] hover:-translate-y-1.5 hover:border-flame1/40 hover:shadow-[0_24px_50px_-20px_rgba(255,91,30,.4)]"
    >
      {/* image stage */}
      <button
        type="button"
        onClick={onOpen}
        className="relative w-full h-56 flex items-center justify-center p-8 overflow-hidden bg-paper2"
      >
        {/* glow that blooms in behind the product on hover */}
        <span
          className="pointer-events-none absolute w-40 h-40 rounded-full bg-gradient-to-br from-flame1/25 to-gold/20 blur-2xl scale-0 opacity-0 transition-all duration-500 ease-[var(--ease)] group-hover:scale-125 group-hover:opacity-100"
          aria-hidden="true"
        />

        {item.brand && (
          <span className="absolute top-3 left-3 z-[1] bg-ink/85 text-white text-[10.5px] font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full">
            {item.brand}
          </span>
        )}

        <img
          src={item.src}
          alt={item.name}
          loading="lazy"
          className="relative max-h-full max-w-full object-contain transition-transform duration-700 ease-[var(--ease)] group-hover:scale-[1.12] drop-shadow-[0_10px_18px_rgba(0,0,0,.12)]"
        />

        {/* expand hint */}
        <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-ink/85 text-white flex items-center justify-center opacity-0 -translate-y-1.5 scale-90 transition-all duration-400 ease-[var(--ease)] group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M9 3H3v6M15 3h6v6M9 21H3v-6M15 21h6v-6" />
          </svg>
        </span>
      </button>

      {/* body */}
      <div className="relative px-4 pt-3.5 pb-4 border-t border-black/[.07]">
        {category && (
          <div className="text-[10.5px] font-bold uppercase tracking-wider text-flame1 mb-1.5">
            {category}
          </div>
        )}
        <button
          type="button"
          onClick={onOpen}
          className="block text-[14px] font-semibold text-ink leading-snug text-left hover:text-flame1 transition-colors mb-1.5"
        >
          {item.name}
        </button>
        {item.desc && (
          <p className="text-[12.5px] leading-[1.55] text-inksoft mb-3.5">{item.desc}</p>
        )}
        <div className="border-t border-dashed border-black/[.12] pt-3.5">
          <a
            href={`https://wa.me/971551099885?text=${encodeURIComponent(
              `Hi Al Nawras, I'd like to get a quote for ${item.name}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="btn btn-flame !py-2.5 !text-[11.5px] w-full text-center"
          >
            {lang === "ar" ? "احصل على عرض سعر" : "Get Quote"}
          </a>
        </div>
        {/* animated underline accent */}
        <span className="absolute left-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-flame1 to-gold origin-left scale-x-0 transition-transform duration-500 ease-[var(--ease)] group-hover:scale-x-100" />
      </div>
    </div>
  );
}

export default function Gallery({ items, columns = "sm:grid-cols-2 lg:grid-cols-3", category }) {
  const { lang } = useLanguage();
  const [active, setActive] = useState(null);
  const ref = useReveal();

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % items.length);
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + items.length) % items.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, items.length]);

  return (
    <>
      <div ref={ref} className={`reveal-stagger grid grid-cols-1 ${columns} gap-5`}>
        {items.map((item, i) => (
          <GalleryCard key={item.name + i} item={item} category={category} onOpen={() => setActive(i)} />
        ))}
      </div>

      {/* Lightbox */}
      <div
        className={`fixed inset-0 z-[400] flex items-center justify-center p-6 transition-all duration-400 ease-[var(--ease)] ${
          active !== null ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setActive(null)}
      >
        <div className="absolute inset-0 bg-bgdarker/92 backdrop-blur-sm" />

        {active !== null && (
          <div
            className="relative max-w-[720px] w-full bg-white rounded-sm overflow-hidden shadow-[0_50px_100px_-30px_rgba(0,0,0,.6)] transition-all duration-400 ease-[var(--ease)]"
            style={{
              transform: active !== null ? "scale(1) translateY(0)" : "scale(.94) translateY(16px)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-ink/85 text-white flex items-center justify-center hover:bg-flame1 transition-colors duration-300"
            >
              &times;
            </button>

            <div className="h-[360px] md:h-[440px] flex items-center justify-center p-10 bg-paper2 relative overflow-hidden">
              <span className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-flame1/15 to-gold/15 blur-3xl" />
              <img
                key={active}
                src={items[active].src}
                alt={items[active].name}
                className="relative max-h-full max-w-full object-contain animate-[fadeScale_.45s_var(--ease)]"
              />
            </div>

            <div className="px-7 py-5 border-t border-black/[.07] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="sec-eyebrow !mb-1">
                  {items[active].brand
                    ? items[active].brand
                    : lang === "ar" ? systemsCommon.lightboxLabel : "Al Nawras Systems & Solutions"}
                </div>
                <h3 className="font-display uppercase text-[19px] tracking-wide text-ink">
                  {items[active].name}
                </h3>
                {items[active].desc && (
                  <p className="text-[13px] leading-[1.6] text-inksoft mt-1.5 max-w-[46ch]">{items[active].desc}</p>
                )}
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={`https://wa.me/971551099885?text=${encodeURIComponent(
                    `Hi Al Nawras, I'd like to get a quote for ${items[active].name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-flame !py-2.5 !px-5 !text-[12.5px]"
                >
                  {lang === "ar" ? "احصل على عرض سعر" : "Get Quote"}
                </a>
                {items.length > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActive((active - 1 + items.length) % items.length)}
                      aria-label="Previous"
                      className="w-9 h-9 rounded-full border border-black/[.12] flex items-center justify-center text-ink hover:border-flame1 hover:text-flame1 transition-colors duration-300"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M15 6l-6 6 6 6" /></svg>
                    </button>
                    <button
                      onClick={() => setActive((active + 1) % items.length)}
                      aria-label="Next"
                      className="w-9 h-9 rounded-full border border-black/[.12] flex items-center justify-center text-ink hover:border-flame1 hover:text-flame1 transition-colors duration-300"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M9 6l6 6-6 6" /></svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
