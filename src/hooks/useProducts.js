import { useEffect, useState } from "react";
import { supabase, supabaseConfigured } from "../lib/supabase";
import { PRODUCTS as STATIC_PRODUCTS } from "../data/products";

/** Returns { products, loading }. Falls back to the bundled static catalog
 *  if Supabase isn't connected, the table is empty, or the request fails. */
export default function useProducts() {
  const [products, setProducts] = useState(STATIC_PRODUCTS);
  const [loading, setLoading] = useState(supabaseConfigured);

  useEffect(() => {
    if (!supabaseConfigured) return;
    let cancelled = false;
    supabase
      .from("products")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (!error && data && data.length > 0) setProducts(data);
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return { products, loading };
}
