import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { useLanguage } from "../../context/LanguageContext";
import { useCustomerAuth } from "../../context/CustomerAuthContext";
import { supabaseConfigured } from "../../lib/supabase";

export default function Register() {
  const { lang } = useLanguage();
  const { session, signUp } = useCustomerAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  if (session) return <Navigate to="/account" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { error } = await signUp(email, password, fullName);
    setBusy(false);
    if (error) {
      setError(error.message);
      return;
    }
    setDone(true);
  }

  return (
    <>
      <PageHeader
        eyebrow={lang === "ar" ? "حسابي" : "My Account"}
        title={lang === "ar" ? "إنشاء حساب" : "Create an Account"}
        desc={
          lang === "ar"
            ? "أنشئ حسابًا لمتابعة استفساراتك مع الأنوار."
            : "Create an account to track your enquiries with Al Nawras."
        }
        crumbs={[{ label: lang === "ar" ? "إنشاء حساب" : "Register" }]}
      />

      <section className="py-16 md:py-24 bg-paper">
        <div className="max-w-[420px] mx-auto px-6">
          <div className="bg-white border border-ink/[.08] rounded-md p-8 md:p-10">
            {!supabaseConfigured && (
              <div className="mb-6 rounded-md border border-flame1/30 bg-flame1/[.06] px-4 py-3 text-[13px] text-inksoft">
                {lang === "ar"
                  ? "إنشاء الحساب غير متاح حاليًا."
                  : "Registration isn't connected yet — please check back soon."}
              </div>
            )}

            {done ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-flame1/10 flex items-center justify-center text-flame1">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="font-display uppercase text-[16px] tracking-wide mb-2">
                  {lang === "ar" ? "تحقّق من بريدك الإلكتروني" : "Check your email"}
                </h3>
                <p className="text-[13.5px] text-inksoft leading-relaxed">
                  {lang === "ar"
                    ? "أرسلنا رابط تأكيد إلى بريدك الإلكتروني. اضغط عليه لتفعيل حسابك ثم سجّل الدخول."
                    : "We sent a confirmation link to your email. Click it to activate your account, then sign in."}
                </p>
                <Link to="/account/sign-in" className="inline-block mt-6 text-flame1 font-semibold text-[13.5px] hover:underline">
                  {lang === "ar" ? "الذهاب لتسجيل الدخول" : "Go to Sign In"}
                </Link>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-[12.5px] font-semibold text-inksoft mb-1.5">
                      {lang === "ar" ? "الاسم الكامل" : "Full Name"}
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-md border border-ink/[.14] px-3.5 py-2.5 text-[14px] outline-none focus:border-flame1 transition-colors"
                    />
                  </div>
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
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-md border border-ink/[.14] px-3.5 py-2.5 text-[14px] outline-none focus:border-flame1 transition-colors"
                    />
                    <p className="mt-1.5 text-[11.5px] text-inksoft/70">
                      {lang === "ar" ? "6 أحرف على الأقل" : "At least 6 characters"}
                    </p>
                  </div>
                  {error && <div className="mb-4 text-[13px] text-red-600">{error}</div>}
                  <button
                    type="submit"
                    disabled={busy}
                    className="w-full rounded-full bg-flame1 text-white font-semibold text-[14px] py-3 hover:bg-flame2 transition-colors disabled:opacity-60"
                  >
                    {busy
                      ? lang === "ar" ? "جارٍ الإنشاء…" : "Creating…"
                      : lang === "ar" ? "إنشاء حساب" : "Create Account"}
                  </button>
                </form>
                <p className="mt-6 text-center text-[13px] text-inksoft">
                  {lang === "ar" ? "لديك حساب بالفعل؟" : "Already have an account?"}{" "}
                  <Link to="/account/sign-in" className="text-flame1 font-semibold hover:underline">
                    {lang === "ar" ? "سجّل الدخول" : "Sign in"}
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
