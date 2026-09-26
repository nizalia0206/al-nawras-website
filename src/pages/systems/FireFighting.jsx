import PageHeader from "../../components/PageHeader";
import SystemsSubNav from "../../components/SystemsSubNav";
import SystemSections from "../../components/SystemSections";
import { useLanguage } from "../../context/LanguageContext";
import fireFightingEnv from "../../assets/hero/fire-fighting-env.png";

const S = "/assets/systems/fire-fighting/";

const SECTIONS = [
  { title: "Fire Pumps", titleAr: "مضخات الحريق", src: S + "complete-fire-pump-set.jpg" },
  { title: "Hose Reel System", titleAr: "نظام بكرات خراطيم الحريق", src: S + "fire-hose-reel-cabinets.jpg" },
  { title: "Sprinkler System", titleAr: "نظام الرشاشات", src: S + "automatic-sprinklers.jpg" },
  { title: "Special Suppression Systems", titleAr: "أنظمة الإطفاء الخاصة", src: S + "suppression-cylinders.jpg" },
  { title: "Fire Hydrants System", titleAr: "نظام صنابير الحريق", src: S + "fire-hydrants.jpg" },
];

export default function FireFighting() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <>
      <PageHeader
        image={fireFightingEnv}
        eyebrow={isAr ? "الأنظمة والحلول" : "Systems & Solutions"}
        eyebrowClassName="!text-[16px] sm:!text-[17px] !font-extrabold"
        title={isAr ? "أنظمة مكافحة الحريق" : "Firefighting Systems"}
        desc={
          isAr
            ? "منظومة متكاملة لمكافحة الحريق، مصمّمة ومورّدة ومركّبة وفق أعلى المعايير."
            : "A complete firefighting scope designed, supplied and installed to the highest standards."
        }
        crumbs={[
          { label: isAr ? "الأنظمة والحلول" : "Systems & Solutions" },
          { label: isAr ? "مكافحة الحريق" : "Firefighting" },
        ]}
      />
      <SystemsSubNav />
      <SystemSections
        sections={SECTIONS}
        system={{ en: "Firefighting Systems", ar: "أنظمة مكافحة الحريق" }}
      />
    </>
  );
}
