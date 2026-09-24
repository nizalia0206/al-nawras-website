import { Link } from "react-router-dom";
import useReveal from "../hooks/useReveal";
import { useLanguage } from "../context/LanguageContext";
import { IconArrow } from "./Icons";
import fireFightingEnv from "../assets/hero/fire-fighting-env.png";
import fireAlarmEnv from "../assets/hero/fire-alarm-env.png";
import emergencyLightEnv from "../assets/hero/emergency-light-env.png";
import elvCctv from "../assets/hero/elv-cctv.jpg";
import smokeFan from "../assets/hero/smoke-fan.jpg";

// Home-page systems section: section headline + one photo per system, nothing else.
export default function SystemsShowcase({ id }) {
  const { t } = useLanguage();
  const ref = useReveal();

  const SYSTEMS = [
    { key: "fire", label: t("nav.systems_fire"), to: "/systems/fire-fighting", image: fireFightingEnv, pos: "center 78%" },
    { key: "alarm", label: t("nav.systems_alarm"), to: "/systems/fire-alarm", image: fireAlarmEnv, pos: "center 22%" },
    { key: "light", label: t("nav.systems_light"), to: "/systems/emergency-lighting", image: emergencyLightEnv, pos: "center 30%" },
    { key: "elv", label: t("nav.systems_elv"), to: "/systems/elv", image: elvCctv, pos: "center 40%" },
    { key: "smoke", label: t("nav.systems_smoke"), to: "/systems/smoke-management", image: smokeFan, pos: "center 55%" },
  ];

  return (
    <section id={id} className="bg-paper py-[34px] md:py-[46px]">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8">
        <div className="max-w-[680px] mb-8">
          <div className="sec-eyebrow">{t("services.eyebrow")}</div>
          <h2 className="font-display font-semibold uppercase text-[28px] md:text-[40px] leading-[1.08] text-ink">
            {t("services.title")}
          </h2>
        </div>

        <div ref={ref} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
          {SYSTEMS.map((s, i) => (
            <Link
              key={s.key}
              to={s.to}
              className={`group relative block overflow-hidden rounded-xl aspect-[4/3] bg-bgdarker ${
                i < 2 ? "lg:col-span-3 lg:aspect-[16/9]" : "lg:col-span-2"
              }`}
            >
              <img
                src={s.image}
                alt={s.label}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                style={{ objectPosition: s.pos }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e3a]/85 via-[#0a1e3a]/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex items-end justify-between gap-4">
                <h3 className="font-display uppercase text-[19px] sm:text-[22px] leading-tight tracking-wide !text-white">
                  {s.label}
                </h3>
                <span className="shrink-0 w-10 h-10 rounded-full bg-white/15 border border-white/30 text-white flex items-center justify-center transition-colors duration-300 group-hover:bg-flame1 group-hover:border-flame1">
                  <IconArrow className="w-3.5 h-3.5 rtl:-scale-x-100" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
