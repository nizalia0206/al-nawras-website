import { tx } from "../../i18n/tx";
import PageHeader from "../../components/PageHeader";
import SystemsSubNav from "../../components/SystemsSubNav";
import Gallery from "../../components/Gallery";
import { smokeManagementImages } from "../../data/systemImages";
import { useLanguage } from "../../context/LanguageContext";
import useSystemImages from "../../hooks/useSystemImages";
import { systemsPages, systemImageCaptionsAr } from "../../i18n/pagesAr";
import smokeFan from "../../assets/hero/smoke-fan.jpg";


export default function SmokeManagement() {
  const { lang } = useLanguage();
  const ar = systemsPages.smokeManagement;

  const { groups: liveGroups } = useSystemImages("smoke-management", [{ title: "", items: smokeManagementImages }]);
  const liveImages = liveGroups[0]?.items || [];
  const images = lang === "ar"
    ? liveImages.map((it) => ({ ...it, name: systemImageCaptionsAr[it.name] || it.name }))
    : liveImages;

  return (
    <>
      <PageHeader
        image={smokeFan}
        eyebrow={tx("pages.systems.smokeManagement.systems_solutions", lang, "Systems & Solutions", "الأنظمة والحلول")}
        eyebrowClassName="!text-[16px] sm:!text-[17px] !font-extrabold"
        title={tx("pages.systems.smokeManagement.title", lang, "Smoke Management", ar.title)}
        desc={tx("pages.systems.smokeManagement.desc", lang, "Fire and smoke dampers, extraction fans and electronic control units, specified and installed to keep stairwells and escape routes clear for the duration of an event.", ar.desc)}
        crumbs={[
          { label: tx("pages.systems.smokeManagement.systems_solutions", lang, "Systems & Solutions", "الأنظمة والحلول") },
          { label: tx("pages.systems.smokeManagement.breadcrumb", lang, "Smoke Management", ar.breadcrumb) },
        ]}
      />
      <SystemsSubNav />

      <section className="py-16 md:py-20">
        <div className="max-w-[1280px] mx-auto px-8">
          <h2 className="font-display uppercase text-[22px] md:text-[26px] tracking-wide text-ink mb-6 flex items-center gap-3">
            {tx("pages.systems.smokeManagement.galleryHeading", lang, "Dampers, Fans & Controls", ar.galleryHeading)}
          </h2>
          <Gallery items={images} category={tx("pages.systems.smokeManagement.smoke_management", lang, "SMOKE MANAGEMENT", "إدارة الدخان")} />
        </div>
      </section>
    </>
  );
}
