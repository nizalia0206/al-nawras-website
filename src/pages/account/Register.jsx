import { tx } from "../../i18n/tx";
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
        eyebrow={tx("pages.account.register.my_account", lang, "My Account", "حسابي")}
        title={tx("pages.account.register.create_an_account", lang, "Create an Account", "إنشاء حساب")}
        desc={
          tx("pages.account.register.create_an_account_to_track_your_enquirie", lang, "Create an account to track your enquiries with Al Nawras.", "أنشئ حسابًا لمتابعة استفساراتك مع الأنوار.")
        }
        crumbs={[{ label: tx("pages.account.register.register", lang, "Register", "إنشاء حساب") }]}
      />

      <section className="py-16 md:py-24 bg-paper">
        <div className="max-w-[420px] mx-auto px-6">
          <div className="bg-white border border-ink/[.08] rounded-md p-8 md:p-10">
            {!supabaseConfigured && (
              <div className="mb-6 rounded-md border border-flame1/30 bg-flame1/[.06] px-4 py-3 text-[13px] text-inksoft">
                {tx("pages.account.register.registration_isn_t_connected_yet_please_", lang, "Registration isn't connected yet — please check back soon.", "إنشاء الحساب غير متاح حاليًا.")}
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
                  {tx("pages.account.register.check_your_email", lang, "Check your email", "تحقّق من بريدك الإلكتروني")}
                </h3>
                <p className="text-[13.5px] text-inksoft leading-relaxed">
                  {tx("pages.account.register.we_sent_a_confirmation_link_to_your_emai", lang, "We sent a confirmation link to your email. Click it to activate your account, then sign in.", "أرسلنا رابط تأكيد إلى بريدك الإلكتروني. اضغط عليه لتفعيل حسابك ثم سجّل الدخول.")}
                </p>
                <Link to="/account/sign-in" className="inline-block mt-6 text-flame1 font-semibold text-[13.5px] hover:underline">
                  {tx("pages.account.register.go_to_sign_in", lang, "Go to Sign In", "الذهاب لتسجيل الدخول")}
                </Link>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-[12.5px] font-semibold text-inksoft mb-1.5">
                      {tx("pages.account.register.full_name", lang, "Full Name", "الاسم الكامل")}
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
                      {tx("pages.account.register.email", lang, "Email", "البريد الإلكتروني")}
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
                      {tx("pages.account.register.password", lang, "Password", "كلمة المرور")}
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
                      {tx("pages.account.register.at_least_6_characters", lang, "At least 6 characters", "6 أحرف على الأقل")}
                    </p>
                  </div>
                  {error && <div className="mb-4 text-[13px] text-red-600">{error}</div>}
                  <button
                    type="submit"
                    disabled={busy}
                    className="w-full rounded-full bg-flame1 text-white font-semibold text-[14px] py-3 hover:bg-flame2 transition-colors disabled:opacity-60"
                  >
                    {busy
                      ? tx("pages.account.register.creating", lang, "Creating…", "جارٍ الإنشاء…")
                      : tx("pages.account.register.create_account", lang, "Create Account", "إنشاء حساب")}
                  </button>
                </form>
                <p className="mt-6 text-center text-[13px] text-inksoft">
                  {tx("pages.account.register.already_have_an_account", lang, "Already have an account?", "لديك حساب بالفعل؟")}{" "}
                  <Link to="/account/sign-in" className="text-flame1 font-semibold hover:underline">
                    {tx("pages.account.register.sign_in", lang, "Sign in", "سجّل الدخول")}
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
