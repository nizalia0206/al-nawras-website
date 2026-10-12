import { useEffect, useState } from "react";
import { supabase, supabaseConfigured } from "../lib/supabase";
import { partners as STATIC_PARTNERS } from "../data/partnerLogos";

/** Footer "Brand Partners" logo strip. Editable in the CMS (Admin → Brand Partners).
 *  Falls back to the bundled logos if Supabase isn't connected or the table is empty. */
export default function usePartners() {
  const [partners, setPartners] = useState(STATIC_PARTNERS);

  useEffect(() => {
    if (!supabaseConfigured) return;
    let cancelled = false;
    supabase
      .from("brand_partners")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data, error }) => {
        if (cancelled || error || !data || data.length === 0) return;
        setPartners(
          data.map((r) => ({
            id: r.id,
            name: r.name,
            supplier: r.supplier || "",
            logo: r.logo || null,
            height: Number(r.height) || 40,
          }))
        );
      });
    return () => { cancelled = true; };
  }, []);

  return partners;
}
