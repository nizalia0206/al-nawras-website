import { Link } from "react-router-dom";
import { brands } from "../data/content";
import { brandsAr } from "../i18n/arabicContent";
import { useLanguage } from "../context/LanguageContext";

const BRAND_TO_SUPPLIER = {
  honeywell: "honeywell",
  teknoware: "teknoware",
  waterfall: "waterfall",
  "kd-industries": "kdpipes",
  uranus: "uranus",
  h3c: "h3c",
};

export default function Brands() {
  const { t, lang } = useLanguage();

  return (
    <section id="brands" className="bg-white py-[90px] md:py-[110px] border-t border-ink/[.06]">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div className="max-w-[680px]">
            <div className="sec-eyebrow">{t("brands.eyebrow")}</div>
            <h2 className="font-display font-semibold uppercase text-[28px] md:text-[40px] leading-[1.08] text-ink">
              {t("brands.title")}
            </h2>
            <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.75] text-inksoft">
              {t("brands.body")}
            </p>
          </div>
          <Link to="/products" className="btn btn-dark shrink-0">
            {t("brands.viewCatalog")}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {brands.map((b) => {
            const ar = lang === "ar" ? brandsAr[b.id] : null;
            return (
              <Link key={b.id} to={`/products?supplier=${BRAND_TO_SUPPLIER[b.id] || ""}`} className="svc-card">
                <h3 className="font-display text-[18px] uppercase tracking-wide mb-1.5">{ar?.name || b.name}</h3>
                <div className="text-[11.5px] font-semibold uppercase tracking-[.1em] text-flame1 mb-3">
                  {ar?.tag || b.tag}
                </div>
                <p className="svc-desc text-[13.5px] leading-[1.65] text-inksoft flex-grow">{ar?.desc || b.desc}</p>
                <span className="svc-learn mt-4 text-[12.5px] font-semibold uppercase tracking-[.06em] text-flame1">
                  {t("brands.shopPrefix")} {ar?.name || b.name} {t("brands.shopSuffix")} →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
