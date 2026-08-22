import { useEffect, useState } from "react";
import { supabase, supabaseConfigured } from "../lib/supabase";

const STATIC_JOBS = [
  { title: "Fire Alarm Systems Engineer", dept: "Engineering", type: "Full-time", location: "Sharjah" },
  { title: "ICT Network Engineer", dept: "ICT", type: "Full-time", location: "Dubai" },
  { title: "Fire Protection Project Manager", dept: "Project Management", type: "Full-time", location: "Sharjah" },
  { title: "Site Supervisor — Fire Pumps", dept: "Engineering", type: "Full-time", location: "Sharjah" },
  { title: "Sales Engineer — Fire & Safety", dept: "Sales", type: "Full-time", location: "Dubai" },
  { title: "Junior CAD Draftsman", dept: "Engineering", type: "Full-time", location: "Sharjah" },
];

/** Returns { jobs, loading }. Falls back to the original bundled job list
 *  if Supabase isn't connected, the table is empty, or the request fails. */
export default function useJobPostings() {
  const [jobs, setJobs] = useState(STATIC_JOBS);
  const [loading, setLoading] = useState(supabaseConfigured);

  useEffect(() => {
    if (!supabaseConfigured) return;
    let cancelled = false;
    supabase
      .from("job_postings")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (!error && data && data.length > 0) {
          setJobs(
            data.map((j) => ({
              title: j.title,
              dept: j.dept,
              type: j.type || "Full-time",
              location: j.location,
            }))
          );
        }
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return { jobs, loading };
}
