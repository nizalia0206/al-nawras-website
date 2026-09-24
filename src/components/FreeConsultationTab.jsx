import { useLanguage } from "../context/LanguageContext";

// Vertical "Get a Quote" tab, pinned to the viewport edge on every page.
export default function FreeConsultationTab() {
  const { lang } = useLanguage();

  return (
    <a
      href="/contact"
      className="hidden md:flex fixed z-[150] items-center justify-center gap-2 bg-gradient-to-b from-flame1 to-flame2 text-white font-display text-[12.5px] font-semibold tracking-[.18em] uppercase px-3 py-5 shadow-flame hover:brightness-105 transition-all duration-300"
      style={{
        [lang === "ar" ? "left" : "right"]: 0,
        top: "50%",
        transform: "translateY(-50%) rotate(180deg)",
        writingMode: "vertical-rl",
        borderRadius: lang === "ar" ? "0 8px 8px 0" : "8px 0 0 8px",
      }}
    >
      {lang === "ar" ? "احصل على عرض سعر" : "Get a Quote"}
    </a>
  );
}
