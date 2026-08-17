import PageHeader from "../../components/PageHeader";
import SystemsSubNav from "../../components/SystemsSubNav";
import Gallery from "../../components/Gallery";
import useReveal from "../../hooks/useReveal";
import { IconCable, IconSwitch, IconWifi } from "../../components/Icons";
import { elvImages } from "../../data/systemImages";
import { useLanguage } from "../../context/LanguageContext";
import { systemsCommon, systemsPages, systemImageCaptionsAr } from "../../i18n/pagesAr";

const PRODUCTS_EN = [
  { icon: IconCable, name: "Structured Cabling", desc: "Data, voice and building-automation cabling infrastructure." },
  { icon: IconSwitch, name: "Network Switching", desc: "Access, aggregation and core switching for converged ELV networks." },
  { icon: IconWifi, name: "Wireless & Access Control", desc: "Wi-Fi coverage, CCTV and access control integration." },
];
const ICONS = [IconCable, IconSwitch, IconWifi];

export default function Elv() {
  const { lang } = useLanguage();
  const ar = systemsPages.elv;
  const introRef = useReveal();

  const PRODUCTS = lang === "ar" ? ar.products.map((p, i) => ({ ...p, icon: ICONS[i] })) : PRODUCTS_EN;
  const images = lang === "ar"
    ? elvImages.map((it) => ({ ...it, name: systemImageCaptionsAr[it.name] || it.name }))
    : elvImages;

  return (
    <>
      <PageHeader
        eyebrow={lang === "ar" ? "الأنظمة والحلول" : "Systems & Solutions"}
        title={lang === "ar" ? ar.title : "ELV Systems"}
        desc={lang === "ar" ? ar.desc : "Structured cabling, CCTV, access control and BMS integration delivered as a single low-voltage infrastructure, so every building system reports back through one manageable network."}
        crumbs={[
          { label: lang === "ar" ? "الأنظمة والحلول" : "Systems & Solutions" },
          { label: lang === "ar" ? ar.breadcrumb : "ELV Systems" },
        ]}
      />
      <SystemsSubNav />

      <section className="py-16 md:py-20">
        <div className="max-w-[1280px] mx-auto px-8">
          <div ref={introRef} className="reveal max-w-[70ch] mb-12 md:mb-16">
            <div className="sec-eyebrow">{lang === "ar" ? systemsCommon.overviewLabel : "Overview"}</div>
            <p className="text-[16px] md:text-[17px] leading-[1.85] text-inksoft">
              {lang === "ar" ? ar.overviewP : "Structured cabling, CCTV, access control, BMS integration and low-voltage infrastructure that ties every building system into one manageable network."}
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
            <span className="w-6 h-[2px] bg-gradient-to-r from-flame1 to-gold" />
            {lang === "ar" ? ar.galleryHeading : "Access Control & CCTV"}
          </h2>
          <Gallery items={images} />
        </div>
      </section>
    </>
  );
}
