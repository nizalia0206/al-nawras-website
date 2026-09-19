import { Link } from "react-router-dom";
import { partners } from "../data/partnerLogos";
import { useLanguage } from "../context/LanguageContext";

function PartnerItem({ p, hidden }) {
  return (
    <li className="partners-item" aria-hidden={hidden || undefined}>
      <Link
        to={`/products?supplier=${p.supplier}`}
        tabIndex={hidden ? -1 : undefined}
        title={p.name}
        className="partners-link"
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
 * Footer strip: endless sliding row of brand-partner logos.
 * - Two identical lists side by side; the track slides -50% for a seamless loop.
 * - Each list repeats the partners twice so it stays wider than large screens.
 * - dir="ltr" keeps the slide direction correct when the site is in Arabic (RTL).
 * - Pauses on hover; static and wrapped when the visitor prefers reduced motion.
 */
export default function PartnersStrip() {
  const { t } = useLanguage();
  if (!partners.length) return null;
  const run = [...partners, ...partners];

  return (
    <section aria-label={t("brands.eyebrow")} className="bg-white border-b border-ink/[.08]">
      <div className="pt-7 pb-6">
        <div className="text-center font-display text-[12px] tracking-[.22em] uppercase text-inksoft mb-5 px-8">
          {t("brands.eyebrow")}
        </div>
        <div className="partners-marquee" dir="ltr">
          <div className="partners-track">
            <ul className="partners-list">
              {run.map((p, i) => (
                <PartnerItem key={`a-${i}`} p={p} hidden={i >= partners.length} />
              ))}
            </ul>
            <ul className="partners-list" aria-hidden="true">
              {run.map((p, i) => (
                <PartnerItem key={`b-${i}`} p={p} hidden />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
