import { createContext, useContext, useEffect, useState } from "react";
import { supabase, supabaseConfigured } from "../lib/supabase";

/**
 * Site-wide settings editable in the CMS (Admin → Site Settings):
 * contact numbers, email, WhatsApp, social links and the headline stats.
 * Stored as one JSON row in the `site_settings` table (id = 'main').
 * Anything missing from the CMS row falls back to these defaults, so the
 * site looks exactly the same until something is changed in the CMS.
 */
export const DEFAULT_SETTINGS = {
  phone_sharjah: "+971 6 562 5425",
  phone_dubai: "+971 4 333 5373",
  phone_abudhabi: "+971 55 109 9886",
  email: "info@nawrassystems.com",
  website: "www.nawrassystems.com",
  whatsapp: "971551099885",
  linkedin: "https://ae.linkedin.com/in/al-nawras-91365b25b",
  instagram: "",
  x: "",
  stat_projects: 1300,
  stat_years: 20,
  stat_offices: 3,
  stat_brands: 6,
  stat_sectors: 10,
  stat_emirates: 7,
  // Logos — empty = the original logo files bundled with the website
  logo_header: "",       // header on white (scrolled header, inner pages, menus)
  logo_header_light: "", // header over the home-page hero photo
  logo_footer: "",       // footer (dark navy background, no white box)
};

const SiteSettingsContext = createContext(DEFAULT_SETTINGS);

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    if (!supabaseConfigured) return;
    let cancelled = false;
    supabase
      .from("site_settings")
      .select("data")
      .eq("id", "main")
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled || error || !data?.data) return;
        const clean = Object.fromEntries(
          Object.entries(data.data).filter(([, v]) => v !== null && v !== undefined && v !== "")
        );
        setSettings({ ...DEFAULT_SETTINGS, ...clean });
      });
    return () => { cancelled = true; };
  }, []);

  return <SiteSettingsContext.Provider value={settings}>{children}</SiteSettingsContext.Provider>;
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}

/** "+971 6 562 5425" -> "+97165625425" for tel: links */
export function telHref(phone) {
  return "tel:" + String(phone || "").replace(/[^\d+]/g, "");
}

/** Digits only, for wa.me links */
export function waNumber(n) {
  return String(n || "").replace(/\D/g, "");
}

/** https:// prefix for a bare domain like www.example.com */
export function siteHref(w) {
  return /^https?:\/\//i.test(w || "") ? w : `https://${w}`;
}
