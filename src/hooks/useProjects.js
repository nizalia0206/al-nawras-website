import { useEffect, useState } from "react";
import { supabase, supabaseConfigured } from "../lib/supabase";
import { PROJECTS as STATIC_PROJECTS } from "../data/projects";

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Returns { projects, loading }. Falls back to the bundled static project
 *  list if Supabase isn't connected, the table is empty, or the request fails. */
export default function useProjects() {
  const [projects, setProjects] = useState(STATIC_PROJECTS);
  const [loading, setLoading] = useState(supabaseConfigured);

  useEffect(() => {
    if (!supabaseConfigured) return;
    let cancelled = false;
    supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (!error && data && data.length > 0) {
          setProjects(
            data.map((p) => ({
              title: p.title,
              ref: p.ref,
              category: p.category,
              location: p.location,
              client: p.client,
              scope: p.scope,
              image: p.image,
              slug: slugify(p.title),
            }))
          );
        }
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return { projects, loading };
}
