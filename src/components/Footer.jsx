import { Link } from "react-router-dom";
import PartnersStrip from "./PartnersStrip";
import logoFooterLight from "../assets/brand/logo-full-light.png";
import { IconLinkedIn, IconInstagram, IconX, IconArrow } from "./Icons";
import { useLanguage } from "../context/LanguageContext";
import { useSiteSettings, telHref, siteHref } from "../context/SiteSettingsContext";

export default function Footer() {
  const { t, lang } = useLanguage();
  const s = useSiteSettings();
  const ar = lang === "ar";
  return (
    <footer id="contact" className="bg-footerdark text-white">
      {/* Brand partners — endless sliding logo strip (white band on every page) */}
      <PartnersStrip />

      {/* CTA banner */}
      <div className="relative overflow-hidden border-b border-white/[.1]">
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 900px 500px at 82% 10%, rgba(238,108,47,.22), transparent 60%), radial-gradient(ellipse 700px 500px at 10% 0%, rgba(147,161,194,.14), transparent 60%)",
          }}
        />
        <div className="relative z-[1] max-w-[1280px] mx-auto px-8 py-12 md:py-14 flex flex-col md:flex-row items-center md:items-center justify-between gap-6 text-center md:text-left">
          <h3 className="font-display font-semibold uppercase text-[24px] md:text-[30px] leading-[1.2] max-w-[26ch] !text-white">
            {t("footer.ctaTitle")}
          </h3>
          <Link to="/contact" className="btn btn-flame shrink-0">
            {t("footer.getInTouch")} <IconArrow />
          </Link>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-x-10 gap-y-10 py-[60px] border-b border-white/[.1]">
          <div>
            <Link
              to="/"
              aria-label="Al Nawras Safety & Security Systems LLC"
              className="mb-5 inline-block"
            >
              <img
                src={s.logo_footer || logoFooterLight}
                alt="Al Nawras Safety & Security Systems LLC"
                className="block h-auto w-[240px] max-w-full"
              />
            </Link>
            <p className="text-[13.5px] leading-[1.75] text-white/60 max-w-[34ch]">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-2.5 mt-6">
              <a
                href={s.linkedin || "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-[40px] h-[40px] rounded-full border border-white/[.25] text-white flex items-center justify-center transition-all duration-300 hover:border-flame1 hover:bg-flame1"
              >
                <IconLinkedIn className="w-4.5 h-4.5" />
              </a>
              <a
                href={s.instagram || "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-[40px] h-[40px] rounded-full border border-white/[.25] text-white flex items-center justify-center transition-all duration-300 hover:border-flame1 hover:bg-flame1"
              >
                <IconInstagram className="w-4.5 h-4.5" />
              </a>
              <a
                href={s.x || "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="w-[40px] h-[40px] rounded-full border border-white/[.25] text-white flex items-center justify-center transition-all duration-300 hover:border-flame1 hover:bg-flame1"
              >
                <IconX className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-[13px] tracking-[.12em] uppercase text-white mb-5">
              {t("footer.colCompany")}
            </h4>
            <div className="flex flex-col gap-[13px]">
              <Link to="/about/overview" className="text-[14px] text-white/60 hover:text-white transition-colors">
                {t("nav.about_overview")}
              </Link>
              <Link to="/about/mission" className="text-[14px] text-white/60 hover:text-white transition-colors">
                {t("nav.about_mission")}
              </Link>
              <Link to="/about/founder" className="text-[14px] text-white/60 hover:text-white transition-colors">
                {t("nav.about_founder")}
              </Link>
              <Link to="/about/certifications" className="text-[14px] text-white/60 hover:text-white transition-colors">
                {t("nav.about_certifications")}
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-display text-[13px] tracking-[.12em] uppercase text-white mb-5">
              {t("footer.colSystems")}
            </h4>
            <div className="flex flex-col gap-[13px]">
              <Link to="/systems/fire-fighting" className="text-[14px] text-white/60 hover:text-white transition-colors">
                {t("nav.systems_fire")}
              </Link>
              <Link to="/systems/fire-alarm" className="text-[14px] text-white/60 hover:text-white transition-colors">
                {t("nav.systems_alarm")}
              </Link>
              <Link to="/systems/emergency-lighting" className="text-[14px] text-white/60 hover:text-white transition-colors">
                {t("nav.systems_light")}
              </Link>
              <Link to="/systems/elv" className="text-[14px] text-white/60 hover:text-white transition-colors">
                {t("nav.systems_elv")}
              </Link>
              <Link to="/systems/smoke-management" className="text-[14px] text-white/60 hover:text-white transition-colors">
                {t("nav.systems_smoke")}
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-display text-[13px] tracking-[.12em] uppercase text-white mb-5">
              {t("footer.colContact")}
            </h4>
            <div className="flex flex-col gap-[13px] text-[14px] text-white/60 leading-[1.5]">
              <a href={telHref(s.phone_sharjah)} className="hover:text-white transition-colors">{ar ? "المقر الرئيسي، الشارقة" : "Sharjah HQ"} · <span className="ltr-content">{s.phone_sharjah}</span></a>
              <a href={telHref(s.phone_dubai)} className="hover:text-white transition-colors">{ar ? "دبي" : "Dubai"} · <span className="ltr-content">{s.phone_dubai}</span></a>
              <a href={telHref(s.phone_abudhabi)} className="hover:text-white transition-colors">{ar ? "أبوظبي" : "Abu Dhabi"} · <span className="ltr-content">{s.phone_abudhabi}</span></a>
              <a href={`mailto:${s.email}`} className="ltr-content hover:text-white transition-colors">{s.email}</a>
              <a href={siteHref(s.website)} target="_blank" rel="noopener noreferrer" className="ltr-content hover:text-white transition-colors">{s.website}</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2.5 py-7 text-[12.5px] text-white/60">
          <span>{t("footer.copyright")}</span>
          <a
            href="https://zetacoding.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 underline decoration-white/30 underline-offset-4 hover:text-flame2 hover:decoration-flame2 transition-colors"
          >
            {t("footer.note")}
          </a>
        </div>
      </div>
    </footer>
  );
}
