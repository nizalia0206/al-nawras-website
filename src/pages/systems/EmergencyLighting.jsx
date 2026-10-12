import { tx } from "../../i18n/tx";
import PageHeader from "../../components/PageHeader";
import SystemsSubNav from "../../components/SystemsSubNav";
import SystemSections from "../../components/SystemSections";
import { emergencyLightImages } from "../../data/systemImages";
import { useLanguage } from "../../context/LanguageContext";
import useSystemImages from "../../hooks/useSystemImages";
import { systemsPages, systemImageCaptionsAr } from "../../i18n/pagesAr";
import emergencyLightEnv from "../../assets/hero/emergency-light-env.png";

export default function EmergencyLighting() {
  const { lang } = useLanguage();
  const ar = systemsPages.emergencyLighting;

  // Same CMS-managed images the page always used — just laid out as plain
  // picture cards (SystemSections) like Fire Fighting & Fire Alarm, instead of
  // the older overview-paragraph + icon-grid + gallery layout.
  const { groups: liveGroups } = useSystemImages("emergency-lighting", [{ title: "", items: emergencyLightImages }]);
  const liveImages = liveGroups[0]?.items || [];
  const images = lang === "ar"
    ? liveImages.map((it) => ({ ...it, name: systemImageCaptionsAr[it.name] || it.name }))
    : liveImages;
  // images[].name is already resolved to the current language above, so the
  // same value works for both title and titleAr here.
  const sections = images.map((it) => ({ title: it.name, titleAr: it.name, src: it.src }));

  return (
    <>
      <PageHeader
        image={emergencyLightEnv}
        eyebrow={tx("pages.systems.emergencyLighting.systems_solutions", lang, "Systems & Solutions", "الأنظمة والحلول")}
        eyebrowClassName="!text-[16px] sm:!text-[17px] !font-extrabold"
        title={tx("pages.systems.emergencyLighting.title", lang, "Emergency Lighting", ar.title)}
        desc={tx("pages.systems.emergencyLighting.desc", lang, "Central battery systems and DALI-addressable emergency and exit luminaires from Teknoware ESCALUX, monitored end-to-end through IntelliPanel and ESC-GATE gateways for consistent, code-compliant coverage.", ar.desc)}
        crumbs={[
          { label: tx("pages.systems.emergencyLighting.systems_solutions", lang, "Systems & Solutions", "الأنظمة والحلول") },
          { label: tx("pages.systems.emergencyLighting.breadcrumb", lang, "Emergency Lighting", ar.breadcrumb) },
        ]}
      />
      <SystemsSubNav />
      <SystemSections
        sections={sections}
        system={{ en: "Emergency Lighting", ar: ar.title }}
      />
    </>
  );
}
