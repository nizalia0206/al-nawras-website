import { tx } from "../../i18n/tx";
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
        eyebrow={tx("pages.systems.fireAlarm.systems_solutions", (isAr ? "ar" : "en"), "Systems & Solutions", "الأنظمة والحلول")}
        eyebrowClassName="!text-[16px] sm:!text-[17px] !font-extrabold"
        title={tx("pages.systems.fireAlarm.fire_alarm_voice_evacuation_systems", (isAr ? "ar" : "en"), "Fire Alarm & Voice Evacuation Systems", "أنظمة إنذار الحريق والإخلاء الصوتي")}
        desc={
          tx("pages.systems.fireAlarm.advanced_fire_detection_alarm_and_voice_", (isAr ? "ar" : "en"), "Advanced fire detection, alarm and voice evacuation solutions engineered to provide reliable early warning, clear emergency communication, and enhanced life safety.", "حلول متقدمة لكشف الحريق والإنذار والإخلاء الصوتي، مصمّمة لتوفير إنذار مبكر موثوق واتصال واضح في حالات الطوارئ وسلامة أعلى للأرواح.")
        }
        crumbs={[
          { label: tx("pages.systems.fireAlarm.systems_solutions", (isAr ? "ar" : "en"), "Systems & Solutions", "الأنظمة والحلول") },
          { label: tx("pages.systems.fireAlarm.fire_alarm_voice_evacuation", (isAr ? "ar" : "en"), "Fire Alarm & Voice Evacuation", "إنذار الحريق والإخلاء الصوتي") },
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
