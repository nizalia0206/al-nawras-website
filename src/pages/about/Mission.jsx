import { tx } from "../../i18n/tx";
import PageHeader from "../../components/PageHeader";
import AboutSubNav from "../../components/AboutSubNav";
import useReveal from "../../hooks/useReveal";
import { useLanguage } from "../../context/LanguageContext";
import { aboutPages } from "../../i18n/pagesAr";
import headerImage from "../../assets/page-headers/mission-vision.jpg";

const CARDS_EN = [
  {
    num: "01",
    title: "Our Mission",
    desc: "To protect life and property through our high dedication to enhance the safety standards, along with a positive contribution to the community we live in and operate at. To reduce and eliminate risk from fire in the community we serve, and to be the first choice provider for safety and security solutions within the UAE market.",
  },
  {
    num: "02",
    title: "Our Vision",
    desc: "To be the UAE's most trusted integrated safety and security partner, recognized for technical excellence, authorized brand partnerships and a zero-compromise approach to compliance.",
  },
  {
    num: "03",
    title: "Quality Commitment",
    desc: "ISO 9001:2015 certified, with Class A civil defense approvals across three Emirates (SHJ, DXB & ADH) and an in-house team of licensed engineers and technicians who stand behind every installation.",
  },
];

function Card({ item }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal bg-white border border-black/[.08] p-8 md:p-10">
      <div className="font-mono text-[13px] text-flame1 font-semibold mb-4 ltr-content">{item.num}</div>
      <h3 className="font-display text-[22px] uppercase tracking-wide mb-4">{item.title}</h3>
      <p className="text-[15px] text-inksoft leading-[1.75]">{item.desc}</p>
    </div>
  );
}

export default function Mission() {
  const { lang } = useLanguage();
  const ar = aboutPages.mission;
  const CARDS = CARDS_EN.map((c, i) => ({
    num: c.num,
    title: tx(`pages.about.mission.card${i + 1}.title`, lang, c.title, ar.cards?.[i]?.title),
    desc: tx(`pages.about.mission.card${i + 1}.desc`, lang, c.desc, ar.cards?.[i]?.desc),
  }));

  return (
    <>
      <PageHeader
        eyebrow={tx("pages.about.mission.eyebrow", lang, "Al Nawras Overview", ar.eyebrow)}
        title={tx("pages.about.mission.title", lang, "Mission & Vision", ar.title)}
        desc={
          tx("pages.about.mission.desc", lang, "Progressive thinking and a systematic approach to every project, so our clients keep coming back to us.", ar.desc)
        }
        crumbs={[
          { label: tx("pages.about.mission.crumbAbout", lang, "About", ar.crumbAbout), href: "/about/overview" },
          { label: tx("pages.about.mission.crumbCurrent", lang, "Mission & Vision", ar.crumbCurrent) },
        ]}
        image={headerImage}
      />
      <AboutSubNav />

      <section className="py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CARDS.map((c) => (
              <Card key={c.num} item={c} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
