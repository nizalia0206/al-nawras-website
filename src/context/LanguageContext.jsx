import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "../i18n/translations";
import { supabase, supabaseConfigured } from "../lib/supabase";
import { setTextOverrides, getOverride } from "../i18n/tx";

const LanguageContext = createContext(null);

function getInitialLang() {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem("nawras-lang");
  return saved === "ar" ? "ar" : "en";
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);
  // bumps when CMS text overrides arrive, so every page re-renders with them
  const [textVersion, setTextVersion] = useState(0);

  useEffect(() => {
    if (!supabaseConfigured) return;
    let cancelled = false;
    supabase
      .from("site_text")
      .select("key, en, ar")
      .then(({ data, error }) => {
        if (cancelled || error || !data) return;
        setTextOverrides(data);
        setTextVersion((v) => v + 1);
      });
    return () => { cancelled = true; };
  }, []);

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
    const o = getOverride(path);
    if (o) {
      if (lang === "ar" && o.ar) return o.ar;
      if (lang !== "ar" && o.en) return o.en;
    }
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
    <LanguageContext.Provider value={{ lang, dir, setLang, toggleLang, t, textVersion }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
