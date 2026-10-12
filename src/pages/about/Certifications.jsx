import { tx } from "../../i18n/tx";
import PageHeader from "../../components/PageHeader";
import AboutSubNav from "../../components/AboutSubNav";
import CertificationsGrid from "../../components/CertificationsGrid";
import { useLanguage } from "../../context/LanguageContext";
import { aboutPages } from "../../i18n/pagesAr";
import headerImage from "../../assets/page-headers/certifications.jpg";

export default function Certifications() {
  const { t, lang } = useLanguage();
  const ar = aboutPages.certifications;

  return (
    <>
      <PageHeader
        eyebrow={t("certifications.eyebrow")}
        title={t("certifications.title")}
        desc={t("certifications.body")}
        crumbs={[
          { label: tx("pages.about.certifications.crumbAbout", lang, "About", ar.crumbAbout), href: "/about/overview" },
          { label: tx("pages.about.certifications.crumbCurrent", lang, "Certifications", ar.crumbCurrent) },
        ]}
        image={headerImage}
      />
      <AboutSubNav />

      <section className="bg-paper py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-8">
          <CertificationsGrid />
        </div>
      </section>
    </>
  );
}
