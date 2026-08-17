import { IconLinkedIn, IconInstagram, IconX } from "./Icons";
import { useLanguage } from "../context/LanguageContext";

export default function TopBar() {
  const { t } = useLanguage();
  const socials = [
    { label: "LinkedIn", Icon: IconLinkedIn, href: "https://ae.linkedin.com/in/al-nawras-91365b25b" },
    { label: "Instagram", Icon: IconInstagram, href: "#" },
    { label: "X", Icon: IconX, href: "#" },
  ];

  return (
    <div className="bg-paper2 text-inksoft text-[12px] tracking-wide border-b border-ink/[.06]">
      <div className="max-w-[1280px] mx-auto px-8 h-[38px] flex items-center justify-between">
        <div className="flex items-center gap-5 md:gap-6">
          <span className="ltr-content">{t("topbar.email")}</span>
          <span className="hidden md:inline">{t("topbar.cities")}</span>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3 pl-4 border-l border-ink/[.1]">
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
        </div>
      </div>
    </div>
  );
}
