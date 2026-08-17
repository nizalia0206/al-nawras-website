import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "../i18n/translations";

const LanguageContext = createContext(null);

function getInitialLang() {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem("nawras-lang");
  return saved === "ar" ? "ar" : "en";
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.documentElement.classList.toggle("lang-ar", lang === "ar");
    window.localStorage.setItem("nawras-lang", lang);
  }, [lang]);

  const dir = lang === "ar" ? "rtl" : "ltr";

  function toggleLang() {
    setLang((l) => (l === "en" ? "ar" : "en"));
  }

  // Looks up a dot-path in the translations dictionary, e.g. t("header.getInTouch").
  // Falls back to the English string, then to the key itself, so missing
  // translations never break the page.
  function t(path) {
    const parts = path.split(".");
    let en = translations.en;
    let ar = translations.ar;
    for (const p of parts) {
      en = en?.[p];
      ar = ar?.[p];
    }
    if (lang === "ar") return ar ?? en ?? path;
    return en ?? path;
  }

  return (
    <LanguageContext.Provider value={{ lang, dir, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
