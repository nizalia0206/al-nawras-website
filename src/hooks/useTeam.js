import { useEffect, useState } from "react";
import { supabase, supabaseConfigured } from "../lib/supabase";
import { team as STATIC_TEAM } from "../data/content";

/** Returns { team, loading }. Falls back to the bundled static team list
 *  if Supabase isn't connected, the table is empty, or the request fails. */
export default function useTeam() {
  const [team, setTeam] = useState(STATIC_TEAM);
  const [loading, setLoading] = useState(supabaseConfigured);

  useEffect(() => {
    if (!supabaseConfigured) return;
    let cancelled = false;
    supabase
      .from("team_members")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (!error && data && data.length > 0) {
          setTeam(
            data.map((p) => ({
              id: p.id,
              initials: (p.name || "")
                .split(" ")
                .filter(Boolean)
                .slice(-2)
                .map((w) => w[0])
                .join("")
                .toUpperCase(),
              name: p.name,
              role: p.role,
              phone: p.phone,
              icon: p.icon || "person",
              highlight: p.highlight || false,
            }))
          );
        }
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return { team, loading };
}
