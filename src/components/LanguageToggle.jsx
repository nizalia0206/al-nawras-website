import { useLanguage } from "../context/LanguageContext";

export default function LanguageToggle({ className = "" }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-ink/[.12] bg-paper2 p-[3px] text-[11.5px] font-bold tracking-wide ${className}`}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`px-2.5 py-1 rounded-full transition-colors duration-200 ${
          lang === "en" ? "bg-navy text-white" : "text-inksoft hover:text-ink"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("ar")}
        aria-pressed={lang === "ar"}
        className={`px-2.5 py-1 rounded-full transition-colors duration-200 ${
          lang === "ar" ? "bg-navy text-white" : "text-inksoft hover:text-ink"
        }`}
        style={{ fontFamily: "'Cairo', sans-serif" }}
      >
        AR
      </button>
    </div>
  );
}
