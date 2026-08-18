import { Link } from "react-router-dom";
import Logo from "./Logo";
import { IconLinkedIn, IconInstagram, IconX, IconArrow } from "./Icons";
import WaveField from "./WaveField";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer id="contact" className="bg-bgdark text-white">
      {/* CTA banner */}
      <div className="relative overflow-hidden border-b border-white/[.1]">
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 900px 500px at 82% 10%, rgba(238,108,47,.22), transparent 60%), radial-gradient(ellipse 700px 500px at 10% 0%, rgba(147,161,194,.14), transparent 60%)",
          }}
        />
        <WaveField className="opacity-70 mix-blend-screen" />
        <div className="relative z-[1] max-w-[1280px] mx-auto px-8 py-12 md:py-14 flex flex-col md:flex-row items-center md:items-center justify-between gap-6 text-center md:text-left">
          <h3 className="font-display font-semibold uppercase text-[24px] md:text-[30px] leading-[1.2] max-w-[26ch] !text-white">
            {t("footer.ctaTitle")}
          </h3>
          <a href="mailto:info@nawrassystems.com" className="btn btn-flame shrink-0">
            {t("footer.getInTouch")} <IconArrow />
          </a>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-x-10 gap-y-10 py-[60px] border-b border-white/[.1]">
          <div>
            <div className="mb-5">
              <div className="inline-block bg-white rounded-lg px-4 py-2.5">
                <Logo size={34} />
              </div>
            </div>
            <p className="text-[13.5px] leading-[1.75] text-steellight max-w-[34ch]">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-2.5 mt-6">
              <a
                href="https://ae.linkedin.com/in/al-nawras-91365b25b"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-[40px] h-[40px] rounded-full border border-white/[.25] text-white flex items-center justify-center transition-all duration-300 hover:border-flame1 hover:bg-flame1"
              >
                <IconLinkedIn className="w-4.5 h-4.5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-[40px] h-[40px] rounded-full border border-white/[.25] text-white flex items-center justify-center transition-all duration-300 hover:border-flame1 hover:bg-flame1"
              >
                <IconInstagram className="w-4.5 h-4.5" />
              </a>
              <a
                href="#"
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
              <Link to="/about/overview" className="text-[14px] text-steellight hover:text-white transition-colors">
                {t("nav.about_overview")}
              </Link>
              <Link to="/about/mission" className="text-[14px] text-steellight hover:text-white transition-colors">
                {t("nav.about_mission")}
              </Link>
              <Link to="/about/founder" className="text-[14px] text-steellight hover:text-white transition-colors">
                {t("nav.about_founder")}
              </Link>
              <Link to="/about/certifications" className="text-[14px] text-steellight hover:text-white transition-colors">
                {t("nav.about_certifications")}
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-display text-[13px] tracking-[.12em] uppercase text-white mb-5">
              {t("footer.colSystems")}
            </h4>
            <div className="flex flex-col gap-[13px]">
              <Link to="/systems/fire-fighting" className="text-[14px] text-steellight hover:text-white transition-colors">
                {t("nav.systems_fire")}
              </Link>
              <Link to="/systems/fire-alarm" className="text-[14px] text-steellight hover:text-white transition-colors">
                {t("nav.systems_alarm")}
              </Link>
              <Link to="/systems/emergency-lighting" className="text-[14px] text-steellight hover:text-white transition-colors">
                {t("nav.systems_light")}
              </Link>
              <Link to="/systems/elv" className="text-[14px] text-steellight hover:text-white transition-colors">
                {t("nav.systems_elv")}
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-display text-[13px] tracking-[.12em] uppercase text-white mb-5">
              {t("footer.colContact")}
            </h4>
            <div className="flex flex-col gap-[13px] text-[14px] text-steellight leading-[1.5]">
              <span>{t("footer.sharjahHQ")}</span>
              <span>{t("footer.dubai")}</span>
              <span className="ltr-content">info@nawrassystems.com</span>
              <span className="ltr-content">www.nawrassystems.com</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2.5 py-7 text-[12.5px] text-steellight">
          <span>{t("footer.copyright")}</span>
          <span>{t("footer.note")}</span>
        </div>
      </div>
    </footer>
  );
}
