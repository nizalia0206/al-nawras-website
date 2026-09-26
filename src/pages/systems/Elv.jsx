import PageHeader from "../../components/PageHeader";
import SystemsSubNav from "../../components/SystemsSubNav";
import SystemSections from "../../components/SystemSections";
import { elvImages } from "../../data/systemImages";
import { useLanguage } from "../../context/LanguageContext";
import useSystemImages from "../../hooks/useSystemImages";
import { systemsPages, systemImageCaptionsAr } from "../../i18n/pagesAr";
import elvCctv from "../../assets/hero/elv-cctv.jpg";

export default function Elv() {
  const { lang } = useLanguage();
  const ar = systemsPages.elv;

  // Same CMS-managed images the page always used — just laid out as plain
  // picture cards (SystemSections) like Fire Fighting & Fire Alarm, instead of
  // the older overview-paragraph + icon-grid + gallery layout.
  const { groups: liveGroups } = useSystemImages("elv", [{ title: "", items: elvImages }]);
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
        image={elvCctv}
        eyebrow={lang === "ar" ? "الأنظمة والحلول" : "Systems & Solutions"}
        eyebrowClassName="!text-[16px] sm:!text-[17px] !font-extrabold"
        title={lang === "ar" ? ar.title : "ELV Systems"}
        desc={lang === "ar" ? ar.desc : "Structured cabling, CCTV, access control and BMS integration delivered as a single low-voltage infrastructure, so every building system reports back through one manageable network."}
        crumbs={[
          { label: lang === "ar" ? "الأنظمة والحلول" : "Systems & Solutions" },
          { label: lang === "ar" ? ar.breadcrumb : "ELV Systems" },
        ]}
      />
      <SystemsSubNav />
      <SystemSections
        sections={sections}
        system={{ en: "ELV Systems", ar: ar.title }}
      />
    </>
  );
}
