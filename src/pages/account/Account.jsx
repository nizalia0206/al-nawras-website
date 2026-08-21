import { Navigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { useLanguage } from "../../context/LanguageContext";
import { useCustomerAuth } from "../../context/CustomerAuthContext";

export default function Account() {
  const { lang } = useLanguage();
  const { session, loading, signOut } = useCustomerAuth();

  if (loading) return null;
  if (!session) return <Navigate to="/account/sign-in" replace />;

  const name = session.user?.user_metadata?.full_name || "";
  const email = session.user?.email || "";

  return (
    <>
      <PageHeader
        eyebrow={lang === "ar" ? "حسابي" : "My Account"}
        title={lang === "ar" ? `مرحبًا${name ? "، " + name : ""}` : `Welcome${name ? ", " + name : ""}`}
        crumbs={[{ label: lang === "ar" ? "حسابي" : "My Account" }]}
      />

      <section className="py-16 md:py-24 bg-paper">
        <div className="max-w-[480px] mx-auto px-6">
          <div className="bg-white border border-ink/[.08] rounded-md p-8 md:p-10">
            <div className="mb-6">
              <div className="text-[12.5px] font-semibold text-inksoft mb-1">
                {lang === "ar" ? "البريد الإلكتروني" : "Email"}
              </div>
              <div className="text-[15px] text-ink ltr-content">{email}</div>
            </div>
            {name && (
              <div className="mb-6">
                <div className="text-[12.5px] font-semibold text-inksoft mb-1">
                  {lang === "ar" ? "الاسم" : "Name"}
                </div>
                <div className="text-[15px] text-ink">{name}</div>
              </div>
            )}
            <p className="text-[13px] text-inksoft leading-relaxed mb-6">
              {lang === "ar"
                ? "لأي استفسار حول مشروعك، تواصل معنا عبر صفحة التواصل أو واتساب."
                : "For any enquiries about your project, reach us via the Contact page or WhatsApp."}
            </p>
            <button
              onClick={signOut}
              className="w-full rounded-full border border-ink/[.16] text-ink font-semibold text-[14px] py-3 hover:border-flame1 hover:text-flame1 transition-colors"
            >
              {lang === "ar" ? "تسجيل الخروج" : "Sign Out"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
