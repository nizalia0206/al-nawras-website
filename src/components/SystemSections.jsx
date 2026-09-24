import useReveal from "../hooks/useReveal";
import { useLanguage } from "../context/LanguageContext";
import { IconArrow } from "./Icons";

const WA_NUMBER = "971551099885";

/**
 * Systems & Solutions sub-system layout:
 * each section = headline + one high-quality photo (no detail text, no per-item button),
 * followed by ONE "Get Quote" call-to-action for the whole system.
 *
 * sections: [{ title, titleAr?, src }]
 * system:   { en, ar } — system name used in the quote CTA / WhatsApp message
 */
export default function SystemSections({ sections, system }) {
  const { lang } = useLanguage();
  const gridRef = useReveal();
  const isAr = lang === "ar";
  const systemName = isAr ? system.ar : system.en;
  const waText = `Hi Al Nawras, I'd like to get a quote for ${system.en}.`;

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8">
        <div
          ref={gridRef}
          className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {sections.map((s) => (
            <article
              key={s.title}
              className="group bg-white border border-ink/[.08] rounded-xl overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-flame1/40 hover:shadow-[0_24px_48px_-24px_rgba(19,28,51,.25)]"
            >
              <div className="aspect-square bg-white flex items-center justify-center p-6 sm:p-8">
                <img
                  src={s.src}
                  alt={s.title}
                  loading="lazy"
                  className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <h2 className="px-6 py-5 border-t border-ink/[.06] bg-paper2 font-display uppercase text-[17px] md:text-[18px] tracking-wide text-ink">
                {isAr ? s.titleAr || s.title : s.title}
              </h2>
            </article>
          ))}
        </div>

        {/* single quote CTA for the whole system */}
        <div className="mt-14 md:mt-16 rounded-xl bg-footerdark text-white px-6 py-8 sm:px-10 sm:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="font-display uppercase text-[22px] md:text-[26px] leading-tight !text-white">
              {isAr ? `احصل على عرض سعر لـ${systemName}` : `Get a quote for ${systemName}`}
            </h3>
            <p className="mt-2 text-[14.5px] text-white/70 max-w-[56ch]">
              {isAr
                ? "أرسل لنا تفاصيل مشروعك وسيعود إليك فريقنا الهندسي بعرض متكامل."
                : "Share your project details and our engineering team will come back with a complete proposal."}
            </p>
          </div>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-flame shrink-0"
          >
            {isAr ? "احصل على عرض سعر" : "Get Quote"} <IconArrow />
          </a>
        </div>
      </div>
    </section>
  );
}
