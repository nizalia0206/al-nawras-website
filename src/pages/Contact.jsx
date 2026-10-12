import { tx } from "../i18n/tx";
import { useSiteSettings, telHref } from "../context/SiteSettingsContext";
import { useState } from "react";
import { Icon } from "../components/CatalogIcons.jsx";
import PageHeader from "../components/PageHeader";
import { useLanguage } from "../context/LanguageContext";
import { contactPage } from "../i18n/pagesAr";
import headerImage from "../assets/page-headers/contact-banner.jpg";
import { supabase, supabaseConfigured } from "../lib/supabase";

const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/info@nawrassystems.com";

export default function Contact() {
  const { lang } = useLanguage();
  const st = useSiteSettings();
  const ar = contactPage;
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(false);
    setSending(true);
    const form = e.target;
    const data = new FormData(form);
    // Hidden "website" field: real visitors never fill it, spam bots usually do.
    if (data.get("website")) { form.reset(); setSubmitted(true); setSending(false); return; }
    data.delete("website");

    // 1) Record the enquiry in the CMS (Admin → Enquiries). Linked to the customer's
    //    account when they're signed in on the website.
    let saved = false;
    if (supabaseConfigured) {
      try {
        const { data: sess } = await supabase.auth.getSession();
        const { error: dbErr } = await supabase.from("contact_messages").insert({
          full_name: data.get("Full Name") || "",
          company: data.get("Company") || null,
          email: data.get("Email") || "",
          phone: data.get("Phone") || null,
          help_with: data.get("Help With") || null,
          message: data.get("Message") || "",
          language: lang,
          customer_id: sess?.session?.user?.id || null,
        });
        saved = !dbErr;
        if (dbErr) console.error("Could not save enquiry:", dbErr.message);
      } catch (dbEx) {
        console.error("Could not save enquiry:", dbEx);
      }
    }

    // 2) Email notification to the office (FormSubmit), as before.
    data.append("_subject", "New enquiry from nawrassystems.com contact form");
    data.append("_template", "table");
    data.append("_captcha", "false");

    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      // FormSubmit can answer HTTP 200 with a JSON body reporting failure — most importantly
      // {"success":"false", "message":"This form needs Activation..."} when info@nawrassystems.com
      // hasn't clicked the one-time confirmation link FormSubmit emails on first use. Checking only
      // res.ok would show "message sent" while the message was actually silently discarded, so the
      // response body's own success flag (a string "true"/"false", not a boolean) has to be checked too.
      const body = await res.json().catch(() => null);
      const ok = res.ok && body && (body.success === "true" || body.success === true);
      if (!ok) {
        if (body?.message) console.error("FormSubmit rejected the submission:", body.message);
        throw new Error(body?.message || "Request failed");
      }
      form.reset();
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      // The email failed, but if the enquiry was recorded in the CMS it isn't lost.
      if (saved) {
        form.reset();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(true);
      }
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <PageHeader
        eyebrow={tx("pages.contact.eyebrow", lang, "Get In Touch", ar.eyebrow)}
        title={tx("pages.contact.title", lang, "Let's Talk About Your Project", ar.title)}
        desc={
          tx("pages.contact.desc", lang, "Whether it's a fire protection retrofit, a new ICT network, or a full building safety upgrade — our engineering team is ready to help.", ar.desc)
        }
        crumbs={[{ label: tx("pages.contact.crumb", lang, "Contact", ar.crumb) }]}
        image={headerImage}
      />
      <section className="bg-ambient contact-hero" style={{ paddingTop: 32, paddingBottom: 32 }}>
        <div className="container">
          <div className="contact-cards">
            <div className="contact-card">
              <div className="icon-wrap"><Icon.phone /></div>
              <h4>{tx("pages.contact.callUs", lang, "Call Us", ar.callUs)}</h4>
              <p className="ltr-content"><a href={telHref(st.phone_sharjah)}>{st.phone_sharjah}</a> {tx("pages.contact.sharjahLabel", lang, "(Sharjah)", ar.sharjahLabel)}<br /><a href={telHref(st.phone_dubai)}>{st.phone_dubai}</a> {tx("pages.contact.dubaiLabel", lang, "(Dubai)", ar.dubaiLabel)}<br /><a href={telHref(st.phone_abudhabi)}>{st.phone_abudhabi}</a> {tx("pages.contact.abu_dhabi", lang, "(Abu Dhabi)", "(أبوظبي)")}</p>
            </div>
            <div className="contact-card">
              <div className="icon-wrap"><Icon.mail /></div>
              <h4>{tx("pages.contact.emailUs", lang, "Email Us", ar.emailUs)}</h4>
              <p><a href={`mailto:${st.email}`} className="ltr-content">{st.email}</a><br />{tx("pages.contact.replyWithin", lang, "We reply within 1 business day", ar.replyWithin)}</p>
            </div>
            <div className="contact-card">
              <div className="icon-wrap"><Icon.map /></div>
              <h4>{tx("pages.contact.visitUs", lang, "Visit Us", ar.visitUs)}</h4>
              <p>{tx("pages.contact.poBox", lang, "P.O. Box 38081, Sharjah, UAE", ar.poBox)}<br />{tx("pages.contact.siteVisits", lang, "Site visits by appointment", ar.siteVisits)}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-main">
        <div className="container">
          <div className="contact-split">
            <div>
              <span className="eyebrow">{tx("pages.contact.sendMessage", lang, "SEND A MESSAGE", ar.sendMessage)}</span>
              <h2 style={{ marginTop: 12, marginBottom: 26, fontSize: 28 }}>{tx("pages.contact.requestCallback", lang, "Request a Callback", ar.requestCallback)}</h2>
              <div className={`success-note ${submitted ? "show" : ""}`}>
                <Icon.check />
                <span>{tx("pages.contact.successNote", lang, "Thank you — your message has been received. Our team will contact you shortly.", ar.successNote)}</span>
              </div>
              {error && (
                <div className="success-note show" style={{ background: "#fdecea", borderColor: "#f5c2c0" }}>
                  <span>{tx("pages.contact.something_went_wrong_sending_your_messag", lang, "Something went wrong sending your message — please try again, or email us directly.", "تعذّر الإرسال، يرجى المحاولة مرة أخرى.")}</span>
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="field-row">
                  <div className="field"><label>{tx("pages.contact.fullName", lang, "Full Name *", ar.fullName)}</label><input type="text" name="Full Name" required placeholder={tx("pages.contact.fullNamePlaceholder", lang, "Your full name", ar.fullNamePlaceholder)} /></div>
                  <div className="field"><label>{tx("pages.contact.company", lang, "Company", ar.company)}</label><input type="text" name="Company" placeholder={tx("pages.contact.companyPlaceholder", lang, "Company name", ar.companyPlaceholder)} /></div>
                </div>
                <div className="field-row">
                  <div className="field"><label>{tx("pages.contact.email", lang, "Email *", ar.email)}</label><input type="email" name="Email" required placeholder={tx("pages.contact.emailPlaceholder", lang, "you@company.com", ar.emailPlaceholder)} /></div>
                  <div className="field"><label>{tx("pages.contact.phone", lang, "Phone", ar.phone)}</label><input type="tel" name="Phone" placeholder={tx("pages.contact.phonePlaceholder", lang, "+971 5X XXX XXXX", ar.phonePlaceholder)} /></div>
                </div>
                <div className="field">
                  <label>{tx("pages.contact.helpWith", lang, "What can we help with?", ar.helpWith)}</label>
                  <select name="Help With" defaultValue={lang === "ar" ? ar.helpOptions[0] : "Fire Alarm & Detection"}>
                    {(lang === "ar" ? ar.helpOptions : [
                      "Fire Alarm & Detection",
                      "Fire Pumps",
                      "Emergency Lighting",
                      "Networking & ICT",
                      "Fire Resistant Cables",
                      "Pipes & Fittings",
                      "General Inquiry",
                    ]).map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />
                <div className="field"><label>{tx("pages.contact.message", lang, "Message *", ar.message)}</label><textarea name="Message" required placeholder={tx("pages.contact.messagePlaceholder", lang, "Tell us about your project…", ar.messagePlaceholder)} /></div>
                <button type="submit" className="btn btn-primary btn-block" disabled={sending}>
                  {sending
                    ? (tx("pages.contact.sending", lang, "Sending…", "جارٍ الإرسال…"))
                    : (tx("pages.contact.sendMessageBtn", lang, "Send Message", ar.sendMessageBtn))}
                </button>
              </form>
            </div>

            <div>
              <div className="map-card">
                <iframe src="https://www.google.com/maps?q=Sharjah%2C%20UAE&output=embed" loading="lazy" title="Al Nawras location map" />
              </div>
              <div className="info-panel">
                <h4>{tx("pages.contact.companyInfo", lang, "Company Information", ar.companyInfo)}</h4>
                <div className="info-row">
                  <div className="ic"><Icon.briefcase /></div>
                  <div className="tx"><b>{tx("pages.contact.companyName", lang, "Al Nawras Safety & Security Systems LLC", ar.companyName)}</b><span>{tx("pages.contact.companyDesc", lang, "Registered fire & life safety contractor, UAE", ar.companyDesc)}</span></div>
                </div>
                <div className="info-row">
                  <div className="ic"><Icon.clock /></div>
                  <div className="tx"><b>{tx("pages.contact.workingHours", lang, "Working Hours", ar.workingHours)}</b><span>{tx("pages.contact.workingHoursValue", lang, "Sunday – Thursday, 8:00 AM – 6:00 PM", ar.workingHoursValue)}</span></div>
                </div>
                <div className="info-row">
                  <div className="ic"><Icon.shield /></div>
                  <div className="tx"><b>{tx("pages.contact.emergencySupport", lang, "24/7 Emergency Support", ar.emergencySupport)}</b><span>{tx("pages.contact.emergencySupportDesc", lang, "For existing service contracts", ar.emergencySupportDesc)}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
