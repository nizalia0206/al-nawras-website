import PageHeader from "../../components/PageHeader";
import SystemsSubNav from "../../components/SystemsSubNav";
import Gallery from "../../components/Gallery";
import useReveal from "../../hooks/useReveal";
import { IconSmoke, IconGateway, IconPanel } from "../../components/Icons";
import { smokeManagementImages } from "../../data/systemImages";
import { useLanguage } from "../../context/LanguageContext";
import useSystemImages from "../../hooks/useSystemImages";
import { systemsCommon, systemsPages, systemImageCaptionsAr } from "../../i18n/pagesAr";
import smokeFan from "../../assets/hero/smoke-fan.jpg";

const PRODUCTS_EN = [
  { icon: IconSmoke, name: "Fire/Smoke Dampers", desc: "Duct-mounted dampers that inhibit smoke spread between zones." },
  { icon: IconGateway, name: "Extraction Fans", desc: "Mechanical smoke extraction to keep stairwells and corridors clear." },
  { icon: IconPanel, name: "Control Units", desc: "Electronic control panels coordinating smoke control sequences." },
];
const ICONS = [IconSmoke, IconGateway, IconPanel];

export default function SmokeManagement() {
  const { lang } = useLanguage();
  const ar = systemsPages.smokeManagement;
  const introRef = useReveal();

  const PRODUCTS = lang === "ar" ? ar.products.map((p, i) => ({ ...p, icon: ICONS[i] })) : PRODUCTS_EN;
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
          <div ref={introRef} className="reveal max-w-[70ch] mb-12 md:mb-16">
            <div className="sec-eyebrow">{lang === "ar" ? systemsCommon.overviewLabel : "Overview"}</div>
            <p className="text-[16px] md:text-[17px] leading-[1.85] text-inksoft">
              {lang === "ar" ? ar.overviewP : "Fire & smoke dampers, ductwork inhibitors, extraction fans and electronic control units engineered to keep escape routes clear during an event."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 md:mb-20">
            {PRODUCTS.map((p) => (
              <div key={p.name} className="bg-paper2 p-6 border border-black/[.06] flex gap-4">
                <p.icon className="w-8 h-8 text-flame1 shrink-0" />
                <div>
                  <div className="font-display uppercase text-[14.5px] tracking-wide text-ink mb-1">{p.name}</div>
                  <div className="text-[13.5px] leading-[1.6] text-inksoft">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="font-display uppercase text-[22px] md:text-[26px] tracking-wide text-ink mb-6 flex items-center gap-3">
            {lang === "ar" ? ar.galleryHeading : "Dampers, Fans & Controls"}
          </h2>
          <Gallery items={images} category={lang === "ar" ? "إدارة الدخان" : "SMOKE MANAGEMENT"} />
        </div>
      </section>
    </>
  );
}
