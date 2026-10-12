import { IconLinkedIn, IconInstagram, IconX } from "./Icons";
import { useLanguage } from "../context/LanguageContext";
import LanguageToggle from "./LanguageToggle";
import { useSiteSettings } from "../context/SiteSettingsContext";

export default function TopBar() {
  const { t } = useLanguage();
  const s = useSiteSettings();
  const socials = [
    { label: "LinkedIn", Icon: IconLinkedIn, href: s.linkedin || "#" },
    { label: "Instagram", Icon: IconInstagram, href: s.instagram || "#" },
    { label: "X", Icon: IconX, href: s.x || "#" },
  ];

  return (
    <div className="bg-paper2 text-inksoft text-[12px] tracking-wide border-b border-ink/[.06]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-[38px] flex items-center justify-between gap-3 overflow-hidden">
        <div className="flex items-center gap-5 md:gap-6 min-w-0">
          <a href={`mailto:${s.email}`} className="ltr-content truncate hover:text-flame1 transition-colors">{s.email}</a>
          <span className="hidden md:inline whitespace-nowrap">{t("topbar.cities")}</span>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden sm:flex items-center gap-3">
            {socials.map(({ label, Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-inksoft hover:text-flame1 transition-colors"
              >
                <Icon className="w-[16px] h-[16px]" />
              </a>
            ))}
          </div>
          <LanguageToggle className="!bg-white !p-[2px]" />
        </div>
      </div>
    </div>
  );
}