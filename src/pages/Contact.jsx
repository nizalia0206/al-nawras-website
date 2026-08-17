import { useState } from "react";
import { Icon } from "../components/CatalogIcons.jsx";
import PageHeader from "../components/PageHeader";
import { useLanguage } from "../context/LanguageContext";
import { contactPage } from "../i18n/pagesAr";

export default function Contact() {
  const { lang } = useLanguage();
  const ar = contactPage;
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  }

  return (
    <>
      <PageHeader
        eyebrow={lang === "ar" ? ar.eyebrow : "Get In Touch"}
        title={lang === "ar" ? ar.title : "Let's Talk About Your Project"}
        desc={
          lang === "ar"
            ? ar.desc
            : "Whether it's a fire protection retrofit, a new ICT network, or a full building safety upgrade — our engineering team is ready to help."
        }
        crumbs={[{ label: lang === "ar" ? ar.crumb : "Contact" }]}
      />
      <section className="bg-ambient contact-hero" style={{ paddingTop: 32, paddingBottom: 32 }}>
        <div className="container">
          <div className="contact-cards">
            <div className="contact-card">
              <div className="icon-wrap"><Icon.phone /></div>
              <h4>{lang === "ar" ? ar.callUs : "Call Us"}</h4>
              <p className="ltr-content"><a href="tel:+97165625425">06-5625425</a> {lang === "ar" ? ar.sharjahLabel : "(Sharjah)"}<br /><a href="tel:+97143335373">04-3335373</a> {lang === "ar" ? ar.dubaiLabel : "(Dubai)"}</p>
            </div>
            <div className="contact-card">
              <div className="icon-wrap"><Icon.mail /></div>
              <h4>{lang === "ar" ? ar.emailUs : "Email Us"}</h4>
              <p><a href="mailto:info@nawrassystems.com" className="ltr-content">info@nawrassystems.com</a><br />{lang === "ar" ? ar.replyWithin : "We reply within 1 business day"}</p>
            </div>
            <div className="contact-card">
              <div className="icon-wrap"><Icon.map /></div>
              <h4>{lang === "ar" ? ar.visitUs : "Visit Us"}</h4>
              <p>{lang === "ar" ? ar.poBox : "P.O. Box 38081, Sharjah, UAE"}<br />{lang === "ar" ? ar.siteVisits : "Site visits by appointment"}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-main">
        <div className="container">
          <div className="contact-split">
            <div>
              <span className="eyebrow">{lang === "ar" ? ar.sendMessage : "SEND A MESSAGE"}</span>
              <h2 style={{ marginTop: 12, marginBottom: 26, fontSize: 28 }}>{lang === "ar" ? ar.requestCallback : "Request a Callback"}</h2>
              <div className={`success-note ${submitted ? "show" : ""}`}>
                <Icon.check />
                <span>{lang === "ar" ? ar.successNote : "Thank you — your message has been received. Our team will contact you shortly."}</span>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="field-row">
                  <div className="field"><label>{lang === "ar" ? ar.fullName : "Full Name *"}</label><input type="text" required placeholder={lang === "ar" ? ar.fullNamePlaceholder : "Your full name"} /></div>
                  <div className="field"><label>{lang === "ar" ? ar.company : "Company"}</label><input type="text" placeholder={lang === "ar" ? ar.companyPlaceholder : "Company name"} /></div>
                </div>
                <div className="field-row">
                  <div className="field"><label>{lang === "ar" ? ar.email : "Email *"}</label><input type="email" required placeholder={lang === "ar" ? ar.emailPlaceholder : "you@company.com"} /></div>
                  <div className="field"><label>{lang === "ar" ? ar.phone : "Phone"}</label><input type="tel" placeholder={lang === "ar" ? ar.phonePlaceholder : "+971 5X XXX XXXX"} /></div>
                </div>
                <div className="field">
                  <label>{lang === "ar" ? ar.helpWith : "What can we help with?"}</label>
                  <select defaultValue={lang === "ar" ? ar.helpOptions[0] : "Fire Alarm & Detection"}>
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
                <div className="field"><label>{lang === "ar" ? ar.message : "Message *"}</label><textarea required placeholder={lang === "ar" ? ar.messagePlaceholder : "Tell us about your project…"} /></div>
                <button type="submit" className="btn btn-primary btn-block">{lang === "ar" ? ar.sendMessageBtn : "Send Message"}</button>
              </form>
            </div>

            <div>
              <div className="map-card">
                <iframe src="https://www.google.com/maps?q=Sharjah%2C%20UAE&output=embed" loading="lazy" title="Al Nawras location map" />
              </div>
              <div className="info-panel">
                <h4>{lang === "ar" ? ar.companyInfo : "Company Information"}</h4>
                <div className="info-row">
                  <div className="ic"><Icon.briefcase /></div>
                  <div className="tx"><b>{lang === "ar" ? ar.companyName : "Al Nawras Safety & Security Systems LLC"}</b><span>{lang === "ar" ? ar.companyDesc : "Registered fire & life safety contractor, UAE"}</span></div>
                </div>
                <div className="info-row">
                  <div className="ic"><Icon.clock /></div>
                  <div className="tx"><b>{lang === "ar" ? ar.workingHours : "Working Hours"}</b><span>{lang === "ar" ? ar.workingHoursValue : "Sunday – Thursday, 8:00 AM – 6:00 PM"}</span></div>
                </div>
                <div className="info-row">
                  <div className="ic"><Icon.shield /></div>
                  <div className="tx"><b>{lang === "ar" ? ar.emergencySupport : "24/7 Emergency Support"}</b><span>{lang === "ar" ? ar.emergencySupportDesc : "For existing service contracts"}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
