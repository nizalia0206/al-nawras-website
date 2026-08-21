import { useEffect, useState } from "react";
import { supabase, supabaseConfigured } from "../lib/supabase";
import { certifications as STATIC_CERTS } from "../data/content";

/** Returns { certifications, loading }. Falls back to the bundled static
 *  list if Supabase isn't connected, the table is empty, or the request fails. */
export default function useCertifications() {
  const [certifications, setCertifications] = useState(STATIC_CERTS);
  const [loading, setLoading] = useState(supabaseConfigured);

  useEffect(() => {
    if (!supabaseConfigured) return;
    let cancelled = false;
    supabase
      .from("certifications")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (!error && data && data.length > 0) {
          setCertifications(
            data.map((c) => ({
              num: c.num,
              title: c.title,
              desc: c.description,
              image: c.image_url || undefined,
            }))
          );
        }
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return { certifications, loading };
}
