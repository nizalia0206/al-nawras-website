import { useState } from "react";
import { Link } from "react-router-dom";
import * as Icons from "./Icons";
import { IconArrow } from "./Icons";
import { systems } from "../data/content";
import { systemsAr } from "../i18n/arabicContent";
import { useLanguage } from "../context/LanguageContext";

const SYSTEM_ROUTES = {
  "sys-fire": "/systems/fire-fighting",
  "sys-alarm": "/systems/fire-alarm",
  "sys-voice": "/systems/voice-evacuation",
  "sys-light": "/systems/emergency-lighting",
  "sys-elv": "/systems/elv",
  "sys-smoke": "/systems/smoke-management",
};

export default function ServicesGrid({
  eyebrow,
  title,
  desc,
  items = systems,
  activeId,
  id,
}) {
  const { t, lang } = useLanguage();
  const [hovered, setHovered] = useState(activeId ?? items[1]?.id ?? null);
  const resolvedEyebrow = eyebrow ?? t("services.eyebrow");
  const resolvedTitle = title ?? t("services.title");
  const resolvedDesc = desc === undefined ? t("services.desc") : desc;

  return (
    <section id={id} className="bg-paper py-[34px] md:py-[46px]">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="max-w-[680px] mb-7">
          <div className="sec-eyebrow">{resolvedEyebrow}</div>
          <h2 className="font-display font-semibold uppercase text-[28px] md:text-[40px] leading-[1.08] text-ink">
            {resolvedTitle}
          </h2>
          {resolvedDesc && <p className="mt-5 text-[15.5px] md:text-[16.5px] leading-[1.75] text-inksoft">{resolvedDesc}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => {
            const Icon = Icons[item.icon] || Icons.IconFlame;
            const to = SYSTEM_ROUTES[item.id];
            const isActive = hovered === item.id;
            const arVersion = lang === "ar" ? systemsAr[item.id] : null;
            const card = (
              <div
                onMouseEnter={() => setHovered(item.id)}
                className={`svc-card group relative overflow-hidden cursor-pointer ${isActive ? "is-active" : ""}`}
              >
                <div className="svc-icon w-11 h-11 text-flame1 mb-6">
                  <Icon className="w-full h-full" />
                </div>
                <h3 className="font-display text-[18px] uppercase tracking-wide mb-2.5">
                  {arVersion?.title || item.title}
                </h3>
                <p className="svc-desc text-[13.5px] leading-[1.65] text-inksoft flex-grow">
                  {arVersion?.desc || item.desc}
                </p>
                <span className="svc-learn mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold uppercase tracking-wide text-flame1">
                  {t("services.learnMore")} <IconArrow className="w-3 h-3" />
                </span>
                <span className="pointer-events-none absolute left-0 right-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-flame1 to-gold transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            );
            return to ? (
              <Link key={item.id} to={to} className="block">
                {card}
              </Link>
            ) : (
              <div key={item.id}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
