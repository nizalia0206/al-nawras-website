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
        eyebrow={lang === "ar" ? "الأنظمة والحلول" : "Systems & Solutions"}
        eyebrowClassName="!text-[16px] sm:!text-[17px] !font-extrabold"
        title={lang === "ar" ? ar.title : "Smoke Management"}
        desc={lang === "ar" ? ar.desc : "Fire and smoke dampers, extraction fans and electronic control units, specified and installed to keep stairwells and escape routes clear for the duration of an event."}
        crumbs={[
          { label: lang === "ar" ? "الأنظمة والحلول" : "Systems & Solutions" },
          { label: lang === "ar" ? ar.breadcrumb : "Smoke Management" },
        ]}
      />
      <SystemsSubNav />

      <section className="py-16 md:py-20">
        <div className="max-w-[1280px] mx-auto px-8">
          <h2 className="font-display uppercase text-[22px] md:text-[26px] tracking-wide text-ink mb-6 flex items-center gap-3">
            {lang === "ar" ? ar.galleryHeading : "Dampers, Fans & Controls"}
          </h2>
          <Gallery items={images} category={lang === "ar" ? "إدارة الدخان" : "SMOKE MANAGEMENT"} />
        </div>
      </section>
    </>
  );
}
