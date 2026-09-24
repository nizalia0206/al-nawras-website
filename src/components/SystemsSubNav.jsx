import { NavLink } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function SystemsSubNav() {
  const { t } = useLanguage();
  const TABS = [
    { label: t("nav.systems_fire"), to: "/systems/fire-fighting" },
    { label: t("nav.systems_alarm"), to: "/systems/fire-alarm" },
    { label: t("nav.systems_light"), to: "/systems/emergency-lighting" },
    { label: t("nav.systems_elv"), to: "/systems/elv" },
    { label: t("nav.systems_smoke"), to: "/systems/smoke-management" },
  ];
  return (
    <div className="border-b border-black/[.09] bg-paper2">
      <div className="max-w-[1280px] mx-auto px-8 flex gap-1 overflow-x-auto">
        {TABS.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            className={({ isActive }) =>
              `relative px-5 py-4 text-[14px] font-medium whitespace-nowrap transition-colors ${
                isActive ? "text-ink" : "text-inksoft hover:text-ink"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {t.label}
                <span
                  className={`absolute left-5 right-5 bottom-0 h-[2px] bg-gradient-to-r from-flame1 to-gold transition-transform duration-300 origin-left ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
