import { Link } from "react-router-dom";
import { projects } from "../data/content";
import { projectsHomeAr } from "../i18n/arabicContent";
import { useLanguage } from "../context/LanguageContext";

export default function Projects() {
  const { t, lang } = useLanguage();

  return (
    <section id="projects" className="bg-paper py-[34px] md:py-[46px]">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-7">
          <div className="max-w-[680px]">
            <div className="sec-eyebrow">{t("projectsHome.eyebrow")}</div>
            <h2 className="font-display font-semibold uppercase text-[28px] md:text-[40px] leading-[1.08] text-ink">
              {t("projectsHome.title")}
            </h2>
            <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.75] text-inksoft">
              {t("projectsHome.body")}
            </p>
          </div>
          <Link to="/projects" className="btn btn-dark shrink-0">
            {t("projectsHome.viewAll")}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.slice(0, 6).map((p) => {
            const ar = lang === "ar" ? projectsHomeAr[p.title] : null;
            return (
              <div
                key={p.title}
                className={`group relative overflow-hidden rounded-md border border-white/[.08] text-white p-7 flex flex-col min-h-[220px] bg-gradient-to-br ${p.grad} transition-all duration-300 hover:border-flame1/50 hover:-translate-y-1 hover:shadow-[0_22px_46px_-16px_rgba(238,108,47,.55)]`}
              >
                <span className="text-[11px] font-semibold uppercase tracking-[.12em] text-flame2 mb-3">
                  {ar?.tag || p.tag}
                </span>
                <h3 className="font-display text-[19px] uppercase tracking-wide mb-3 leading-tight">
                  {ar?.title || p.title}
                </h3>
                <p className="text-[13px] leading-[1.6] text-steellight">{ar?.meta || p.meta}</p>
                <p className="mt-auto pt-4 text-[12.5px] leading-[1.6] text-white/85 border-t border-white/[.12]">
                  {ar?.systems || p.systems}
                </p>
                <span className="pointer-events-none absolute left-0 right-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-flame1 to-gold transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
