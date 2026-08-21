import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { useLanguage } from "../../context/LanguageContext";
import { useCustomerAuth } from "../../context/CustomerAuthContext";
import { supabaseConfigured } from "../../lib/supabase";

export default function SignIn() {
  const { lang } = useLanguage();
  const { session, signIn } = useCustomerAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (session) return <Navigate to="/account" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { error } = await signIn(email, password);
    setBusy(false);
    if (error) {
      setError(error.message);
      return;
    }
    navigate("/account");
  }

  return (
    <>
      <PageHeader
        eyebrow={lang === "ar" ? "حسابي" : "My Account"}
        title={lang === "ar" ? "تسجيل الدخول" : "Sign In"}
        desc={
          lang === "ar"
            ? "سجّل الدخول لمتابعة استفساراتك وطلباتك."
            : "Sign in to track your enquiries and orders."
        }
        crumbs={[{ label: lang === "ar" ? "تسجيل الدخول" : "Sign In" }]}
      />

      <section className="py-16 md:py-24 bg-paper">
        <div className="max-w-[420px] mx-auto px-6">
          <div className="bg-white border border-ink/[.08] rounded-md p-8 md:p-10">
            {!supabaseConfigured && (
              <div className="mb-6 rounded-md border border-flame1/30 bg-flame1/[.06] px-4 py-3 text-[13px] text-inksoft">
                {lang === "ar"
                  ? "تسجيل الدخول غير متاح حاليًا."
                  : "Sign-in isn't connected yet — please check back soon."}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-[12.5px] font-semibold text-inksoft mb-1.5">
                  {lang === "ar" ? "البريد الإلكتروني" : "Email"}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-ink/[.14] px-3.5 py-2.5 text-[14px] outline-none focus:border-flame1 transition-colors"
                />
              </div>
              <div className="mb-6">
                <label className="block text-[12.5px] font-semibold text-inksoft mb-1.5">
                  {lang === "ar" ? "كلمة المرور" : "Password"}
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-ink/[.14] px-3.5 py-2.5 text-[14px] outline-none focus:border-flame1 transition-colors"
                />
              </div>
              {error && <div className="mb-4 text-[13px] text-red-600">{error}</div>}
              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-full bg-flame1 text-white font-semibold text-[14px] py-3 hover:bg-flame2 transition-colors disabled:opacity-60"
              >
                {busy ? (lang === "ar" ? "جارٍ الدخول…" : "Signing in…") : lang === "ar" ? "تسجيل الدخول" : "Sign In"}
              </button>
            </form>
            <p className="mt-6 text-center text-[13px] text-inksoft">
              {lang === "ar" ? "ليس لديك حساب؟" : "Don't have an account?"}{" "}
              <Link to="/account/register" className="text-flame1 font-semibold hover:underline">
                {lang === "ar" ? "أنشئ حسابًا" : "Create one"}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
