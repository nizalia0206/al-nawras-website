import { tx } from "../../i18n/tx";
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
        eyebrow={tx("pages.systems.fireFighting.systems_solutions", (isAr ? "ar" : "en"), "Systems & Solutions", "الأنظمة والحلول")}
        eyebrowClassName="!text-[16px] sm:!text-[17px] !font-extrabold"
        title={tx("pages.systems.fireFighting.firefighting_systems", (isAr ? "ar" : "en"), "Firefighting Systems", "أنظمة مكافحة الحريق")}
        desc={
          tx("pages.systems.fireFighting.a_complete_firefighting_scope_designed_s", (isAr ? "ar" : "en"), "A complete firefighting scope designed, supplied and installed to the highest standards.", "منظومة متكاملة لمكافحة الحريق، مصمّمة ومورّدة ومركّبة وفق أعلى المعايير.")
        }
        crumbs={[
          { label: tx("pages.systems.fireFighting.systems_solutions", (isAr ? "ar" : "en"), "Systems & Solutions", "الأنظمة والحلول") },
          { label: tx("pages.systems.fireFighting.firefighting", (isAr ? "ar" : "en"), "Firefighting", "مكافحة الحريق") },
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
