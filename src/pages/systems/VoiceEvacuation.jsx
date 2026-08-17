import PageHeader from "../../components/PageHeader";
import SystemsSubNav from "../../components/SystemsSubNav";
import Gallery from "../../components/Gallery";
import useReveal from "../../hooks/useReveal";
import { IconSpeaker, IconPanel, IconGateway } from "../../components/Icons";
import { voiceEvacImages } from "../../data/systemImages";
import { useLanguage } from "../../context/LanguageContext";
import { systemsCommon, systemsPages, systemImageCaptionsAr } from "../../i18n/pagesAr";

const PRODUCTS_EN = [
  { icon: IconSpeaker, name: "ECS Amplifiers & Speakers", desc: "Distributed amplifiers and ceiling/wall speakers for clear voice paging." },
  { icon: IconPanel, name: "Voice Evacuation Panels", desc: "Panels integrated with the fire alarm control system for simple operation." },
  { icon: IconGateway, name: "Networked Paging", desc: "Multi-zone, prioritized messaging across large or multi-building sites." },
];
const ICONS = [IconSpeaker, IconPanel, IconGateway];

export default function VoiceEvacuation() {
  const { lang } = useLanguage();
  const ar = systemsPages.voiceEvacuation;
  const introRef = useReveal();

  const PRODUCTS = lang === "ar" ? ar.products.map((p, i) => ({ ...p, icon: ICONS[i] })) : PRODUCTS_EN;
  const images = lang === "ar"
    ? voiceEvacImages.map((it) => ({ ...it, name: systemImageCaptionsAr[it.name] || it.name }))
    : voiceEvacImages;

  return (
    <>
      <PageHeader
        eyebrow={lang === "ar" ? "الأنظمة والحلول" : "Systems & Solutions"}
        title={lang === "ar" ? ar.title : "Voice Evacuation Systems"}
        desc={lang === "ar" ? ar.desc : "Integrated emergency communication and public address networks, engineered to deliver clear, prioritized evacuation instructions across a building of any scale."}
        crumbs={[
          { label: lang === "ar" ? "الأنظمة والحلول" : "Systems & Solutions" },
          { label: lang === "ar" ? ar.breadcrumb : "Voice Evacuation" },
        ]}
      />
      <SystemsSubNav />

      <section className="py-16 md:py-20">
        <div className="max-w-[1280px] mx-auto px-8">
          <div ref={introRef} className="reveal max-w-[70ch] mb-12 md:mb-16">
            <div className="sec-eyebrow">{lang === "ar" ? systemsCommon.overviewLabel : "Overview"}</div>
            <p className="text-[16px] md:text-[17px] leading-[1.85] text-inksoft">
              {lang === "ar" ? ar.overviewP : "Integrated emergency communication systems (ECS) and public address networks that deliver clear, prioritized evacuation instructions building-wide, when every second counts."}
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
            {lang === "ar" ? ar.galleryHeading : "Speakers, Amplifiers & Paging"}
          </h2>
          <Gallery items={images} columns="sm:grid-cols-2" />
        </div>
      </section>
    </>
  );
}
