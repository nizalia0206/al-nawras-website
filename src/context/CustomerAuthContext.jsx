import { createContext, useContext, useEffect, useState } from "react";
import { supabase, supabaseConfigured } from "../lib/supabase";

const CustomerAuthContext = createContext(null);

export function CustomerAuthProvider({ children }) {
  const [session, setSession] = useState(undefined); // undefined = still loading

  useEffect(() => {
    if (!supabaseConfigured) {
      setSession(null);
      return;
    }
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
      if (sess?.user) syncCustomerRow(sess);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // Keeps the public `customers` table (used by the CMS's Customers admin
  // page) in sync with this person's account. Runs on every sign-in/sign-up
  // rather than only signUp, so it works whether or not email confirmation
  // is required before a session exists.
  async function syncCustomerRow(sess) {
    try {
      await supabase.from("customers").upsert({
        id: sess.user.id,
        email: sess.user.email,
        full_name: sess.user.user_metadata?.full_name || null,
      });
    } catch {
      // non-fatal — the customer's own sign-in still works even if this fails
    }
  }

  async function signUp(email, password, fullName) {
    if (!supabaseConfigured) return { error: { message: "Sign-up isn't available right now." } };
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    return { data, error };
  }

  async function signIn(email, password) {
    if (!supabaseConfigured) return { error: { message: "Sign-in isn't available right now." } };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  }

  async function signOut() {
    if (!supabaseConfigured) return;
    await supabase.auth.signOut();
  }

  return (
    <CustomerAuthContext.Provider value={{ session, loading: session === undefined, signUp, signIn, signOut }}>
      {children}
    </CustomerAuthContext.Provider>
  );
}

export function useCustomerAuth() {
  const ctx = useContext(CustomerAuthContext);
  if (!ctx) throw new Error("useCustomerAuth must be used inside <CustomerAuthProvider>");
  return ctx;
}