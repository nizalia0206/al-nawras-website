import PageHeader from "../../components/PageHeader";
import AboutSubNav from "../../components/AboutSubNav";
import useReveal from "../../hooks/useReveal";
import { useLanguage } from "../../context/LanguageContext";
import { aboutPages } from "../../i18n/pagesAr";
import headerImage from "../../assets/page-headers/founder.png";

export default function Founder() {
  const { lang } = useLanguage();
  const ar = aboutPages.founder;
  const ref = useReveal();

  return (
    <>
      <PageHeader
        eyebrow={lang === "ar" ? ar.eyebrow : "Al Nawras Overview"}
        title={lang === "ar" ? ar.title : "Message from the Founder"}
        desc={
          lang === "ar"
            ? ar.desc
            : "A commitment to delivering superior and professional safety & security services to the UAE community."
        }
        crumbs={[
          { label: lang === "ar" ? ar.crumbAbout : "About", href: "/about/overview" },
          { label: lang === "ar" ? ar.crumbCurrent : "Founder" },
        ]}
        image={headerImage}
      />
      <AboutSubNav />

      <section className="bg-paper py-16 md:py-24">
        <div className="max-w-[900px] mx-auto px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-[18px]">
            <span className="inline-flex items-center justify-center px-2.5 py-1 text-[11px] font-bold tracking-[.08em] uppercase text-flame1 border border-flame1/40 bg-flame1/[.06] rounded ltr-content">
              {lang === "ar" ? ar.badge : "MD-01"}
            </span>
            <span className="text-[11.5px] font-semibold tracking-[.22em] uppercase text-inksoft">
              {lang === "ar" ? ar.badgeLabel : "Message from the Managing Director"}
            </span>
          </div>
          <h1 className="font-display font-semibold uppercase text-[28px] md:text-[40px] leading-[1.1] text-ink">
            {lang === "ar" ? (
              <>
                {ar.heading1} <span className="text-flame1">{ar.heading2}</span>
              </>
            ) : (
              <>
                A word from <span className="text-flame1">Eng. Mohammed Ghazy</span>
              </>
            )}
          </h1>
          <span className="block w-14 h-[3px] mx-auto mt-5 rounded-full bg-gradient-to-r from-flame1 to-gold" />
        </div>

        <div ref={ref} className="reveal max-w-[1080px] mx-auto px-8 mt-14">
          <div className="relative bg-white border border-ink/[.08] rounded-lg shadow-[0_30px_60px_-30px_rgba(19,28,51,.18)] px-8 py-10 md:px-16 md:py-14">
            <span
              className="absolute top-6 left-6 md:top-8 md:left-10 font-display text-[110px] md:text-[140px] leading-none text-flame1/[.08] select-none pointer-events-none"
              aria-hidden="true"
            >
              &ldquo;
            </span>

            <div className="relative">
              {lang === "ar" ? (
                <>
                  <p className="text-[16px] md:text-[17px] leading-[1.85] text-inksoft mb-6">{ar.p1}</p>
                  <p className="text-[16px] md:text-[17px] leading-[1.85] text-inksoft mb-6">{ar.p2}</p>
                  {ar.p3 && <p className="text-[16px] md:text-[17px] leading-[1.85] text-inksoft">{ar.p3}</p>}
                </>
              ) : (
                <>
                  <p className="text-[16px] md:text-[17px] leading-[1.85] text-inksoft mb-6">
                    "The UAE has undergone an unprecedented phase of expansion in the construction market over
                    the last decades, and we are glad to be participating in the UAE's renaissance period.
                    Considering the importance of this, it has become imperative that we operate Al Nawras S&amp;S
                    as a company that specializes in delivering superior and professional safety &amp; security
                    services.
                  </p>
                  <p className="text-[16px] md:text-[17px] leading-[1.85] text-inksoft">
                    At Al Nawras, we are committed to conducting our business professionally with all clients.
                    Our main aim is to enhance the overall safety standards in the UAE community that we enjoy
                    living and working in."
                  </p>
                </>
              )}

              <div className="mt-9 pt-7 border-t border-ink/[.08] flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-bgdark to-flame1 flex items-center justify-center shrink-0">
                  <span className="font-display text-[15px] tracking-wide text-white">MG</span>
                </div>
                <div className="text-left">
                  <div className="font-display font-semibold text-[15px] tracking-wide uppercase text-ink">
                    {lang === "ar" ? ar.name : "Eng. Mohammed Ghazy"}
                  </div>
                  <div className="text-[13.5px] text-inksoft mt-0.5">
                    {lang === "ar" ? ar.role : "Managing Director, Al Nawras Safety & Security"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
