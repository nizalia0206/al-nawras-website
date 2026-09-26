import PageHeader from "../../components/PageHeader";
import SystemsSubNav from "../../components/SystemsSubNav";
import SystemSections from "../../components/SystemSections";
import { useLanguage } from "../../context/LanguageContext";
import fireAlarmEnv from "../../assets/hero/fire-alarm-env.png";

const S = "/assets/systems/";

const SECTIONS = [
  { title: "Fire Alarm Control Panels", titleAr: "لوحات التحكم بإنذار الحريق", src: S + "fire-alarm/addressable-control-panel.jpg" },
  { title: "Smoke & Heat Detection", titleAr: "كشف الدخان والحرارة", src: S + "fire-alarm/smoke-detectors-notification.jpg" },
  { title: "Voice Evacuation Systems", titleAr: "أنظمة الإخلاء الصوتي", src: S + "voice-evacuation/pa-amplifiers-control-rack.jpg" },
  { title: "Speakers & Paging", titleAr: "مكبرات الصوت والنداء", src: S + "voice-evacuation/ceiling-wall-speakers.jpg" },
];

export default function FireAlarm() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <>
      <PageHeader
        image={fireAlarmEnv}
        eyebrow={isAr ? "الأنظمة والحلول" : "Systems & Solutions"}
        eyebrowClassName="!text-[16px] sm:!text-[17px] !font-extrabold"
        title={isAr ? "أنظمة إنذار الحريق والإخلاء الصوتي" : "Fire Alarm & Voice Evacuation Systems"}
        desc={
          isAr
            ? "حلول متقدمة لكشف الحريق والإنذار والإخلاء الصوتي، مصمّمة لتوفير إنذار مبكر موثوق واتصال واضح في حالات الطوارئ وسلامة أعلى للأرواح."
            : "Advanced fire detection, alarm and voice evacuation solutions engineered to provide reliable early warning, clear emergency communication, and enhanced life safety."
        }
        crumbs={[
          { label: isAr ? "الأنظمة والحلول" : "Systems & Solutions" },
          { label: isAr ? "إنذار الحريق والإخلاء الصوتي" : "Fire Alarm & Voice Evacuation" },
        ]}
      />
      <SystemsSubNav />
      <SystemSections
        sections={SECTIONS}
        system={{ en: "Fire Alarm & Voice Evacuation Systems", ar: "أنظمة إنذار الحريق والإخلاء الصوتي" }}
      />
    </>
  );
}
