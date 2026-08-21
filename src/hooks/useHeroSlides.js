import { useEffect, useState } from "react";
import { supabase, supabaseConfigured } from "../lib/supabase";

/** Returns { [slide_key]: image_url } for any home hero slide images
 *  overridden via the CMS. Slides not present keep their bundled image. */
export default function useHeroSlides() {
  const [overrides, setOverrides] = useState({});

  useEffect(() => {
    if (!supabaseConfigured) return;
    let cancelled = false;
    supabase
      .from("home_hero_slides")
      .select("*")
      .then(({ data, error }) => {
        if (cancelled || error || !data) return;
        const map = {};
        for (const row of data) map[row.slide_key] = row.image_url;
        setOverrides(map);
      });
    return () => { cancelled = true; };
  }, []);

  return overrides;
}
