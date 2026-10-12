import { useSiteSettings } from "../../context/SiteSettingsContext";
import { rich, tx } from "../../i18n/tx";
import PageHeader from "../../components/PageHeader";
import AboutSubNav from "../../components/AboutSubNav";
import useReveal from "../../hooks/useReveal";
import { useLanguage } from "../../context/LanguageContext";
import { aboutPages } from "../../i18n/pagesAr";
import headerImage from "../../assets/page-headers/who-we-are.jpg";

const OV_P1 = "Al Nawras Safety & Security Systems LLC was founded in Sharjah in 2005 by Eng. Mohammed Ghazy, bringing with him over thirty (30) years of experience in the safety and security industry in the UAE. The company has grown into one of the UAE's trusted names in fire & life safety and extra-low-voltage (ELV) systems. With branches in **Sharjah, Dubai and Abu Dhabi**, plus a dedicated warehouse and workshop, the company offers a genuine one-stop shop for developers, contractors and consultants across the Emirates.";
const OV_P2 = "Al Nawras is Civil Defense-licensed to design, supply, install, test and commission fire detection, fire alarm, firefighting, emergency lighting and smoke control systems in Sharjah, Dubai and Abu Dhabi, and holds ISO 9001:2015 certification for its quality management system.";
const OV_P3 = "Today, the company operates as an authorized distributor and sub-distributor for globally certified manufacturers \u2014 Honeywell, Teknoware, Waterfall, KD Industries, Uranus and H3C \u2014 bringing internationally recognized equipment to every fire, life-safety and ELV project it delivers.";

export default function Overview() {
  const { lang } = useLanguage();
  const ar = aboutPages.overview;
  const site = useSiteSettings();
  const copyRef = useReveal();
  const statsRef = useReveal();

  const stats = [
    { n: "2005", l: tx("pages.about.overview.statYear", lang, "Year Founded", ar.statYear) },
    {
      n: lang === "ar" ? `+${Number(site.stat_projects).toLocaleString("en-US")}` : `${Number(site.stat_projects).toLocaleString("en-US")}+`,
      l: tx("pages.about.overview.statProjects", lang, "Projects Executed", ar.statProjects),
    },
    { n: String(site.stat_offices), l: tx("pages.about.overview.statOffices", lang, "UAE Branches", ar.statOffices) },
    { n: String(site.stat_brands), l: tx("pages.about.overview.statBrands", lang, "Global Brand Partners", ar.statBrands) },
  ];

  return (
    <>
      <PageHeader
        eyebrow={tx("pages.about.overview.eyebrow", lang, "Al Nawras Overview", ar.eyebrow)}
        title={tx("pages.about.overview.title", lang, "Who We Are", ar.title)}
        desc={
          tx("pages.about.overview.desc", lang, "A UAE-based fire, life-safety and ELV solutions provider, delivering consultancy, products and support to the highest standards since 2005.", ar.desc)
        }
        crumbs={[{ label: tx("pages.about.overview.crumb", lang, "About", ar.crumb) }]}
        image={headerImage}
      />
      <AboutSubNav />

      <section className="py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 md:grid-cols-[1.1fr_.9fr] gap-12 md:gap-20 items-start">
          <div ref={copyRef} className="reveal">
            <p className="text-[16px] leading-[1.85] text-inksoft mb-5">
              {rich(tx("pages.about.overview.p1", lang, OV_P1, `${ar.p1a} **${ar.p1b}**${ar.p1c}`))}
            </p>
            <p className="text-[16px] leading-[1.85] text-inksoft mb-5">{tx("pages.about.overview.p2", lang, OV_P2, ar.p2)}</p>
            <p className="text-[16px] leading-[1.85] text-inksoft">{tx("pages.about.overview.p3", lang, OV_P3, ar.p3)}</p>
          </div>

          <div ref={statsRef} className="reveal grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.l} className="bg-paper2 p-6 border border-black/[.06]">
                <div className="font-display text-[28px] font-semibold text-flame1 ltr-content">{s.n}</div>
                <div className="text-[12.5px] tracking-wide uppercase text-inksoft mt-1.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
