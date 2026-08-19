import { useLanguage } from "../context/LanguageContext";

export default function LanguageToggle({ className = "", overlay = false }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full p-[3px] text-[11.5px] font-bold tracking-wide border ${
        overlay ? "border-white/30 bg-white/10 backdrop-blur-sm" : "border-ink/[.12] bg-paper2"
      } ${className}`}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`px-2.5 py-1 rounded-full transition-colors duration-200 ${
          lang === "en"
            ? overlay ? "bg-white text-navy" : "bg-navy text-white"
            : overlay ? "text-white/80 hover:text-white" : "text-inksoft hover:text-ink"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("ar")}
        aria-pressed={lang === "ar"}
        className={`px-2.5 py-1 rounded-full transition-colors duration-200 ${
          lang === "ar"
            ? overlay ? "bg-white text-navy" : "bg-navy text-white"
            : overlay ? "text-white/80 hover:text-white" : "text-inksoft hover:text-ink"
        }`}
        style={{ fontFamily: "'Cairo', sans-serif" }}
      >
        AR
      </button>
    </div>
  );
}
