import { useEffect, useState } from "react";
import { supabase, supabaseConfigured } from "../lib/supabase";
import { industries as STATIC_INDUSTRIES } from "../data/content";

/** Sectors strip on the home page. Editable in the CMS (Admin → Sectors).
 *  Falls back to the bundled list if Supabase isn't connected or the table is empty. */
export default function useIndustries() {
  const [industries, setIndustries] = useState(STATIC_INDUSTRIES);

  useEffect(() => {
    if (!supabaseConfigured) return;
    let cancelled = false;
    supabase
      .from("industries")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data, error }) => {
        if (cancelled || error || !data || data.length === 0) return;
        setIndustries(data.map((r) => ({ id: r.id, title: r.title, image: r.image })));
      });
    return () => { cancelled = true; };
  }, []);

  return industries;
}
