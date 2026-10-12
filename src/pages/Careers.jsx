import { tx } from "../i18n/tx";
import { useState, useMemo } from "react";
import { Icon } from "../components/CatalogIcons.jsx";
import Reveal from "../components/Reveal.jsx";
import PageHeader from "../components/PageHeader";
import { useLanguage } from "../context/LanguageContext";
import { careersPage } from "../i18n/pagesAr";
import useJobPostings from "../hooks/useJobPostings";
import headerImage from "../assets/page-headers/careers-stairs.jpg";
import { supabase, supabaseConfigured } from "../lib/supabase";

const CV_TYPES = ["pdf", "doc", "docx"];
const CV_MAX_MB = 5;

const VALUES = [
  { icon: "shield", title: "Safety First", body: "Every project we deliver protects lives \u2014 that responsibility shapes how we hire, train and work." },
  { icon: "check", title: "Technical Excellence", body: "We invest in certified training so our engineers stay current with global fire and ICT standards." },
  { icon: "arrowRight", title: "Growth-Driven", body: "Clear career paths from technician to project lead, with mentorship from senior engineers." },
  { icon: "cart", title: "Team-Oriented", body: "Collaborative project teams spanning engineering, procurement and site execution." },
];

const BENEFITS = [
  ["Health Insurance", "Comprehensive medical coverage for you and your family."],
  ["Annual Leave & Flights", "Generous leave allowance plus annual flight tickets home."],
  ["Certified Training", "Manufacturer certification programs with Honeywell, H3C and more."],
  ["Performance Bonus", "Project-based incentives tied to delivery and client satisfaction."],
  ["Career Progression", "Structured paths toward senior engineering and management roles."],
  ["Modern Equipment", "Work with the latest tools and testing equipment on every site."],
];

export default function Careers() {
  const { lang } = useLanguage();
  const ar = careersPage;
  const { jobs: JOBS } = useJobPostings();
  const depts = useMemo(() => ["All", ...new Set(JOBS.map((j) => j.dept))], [JOBS]);
  const [dept, setDept] = useState("All");
  const [modalJob, setModalJob] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [applyError, setApplyError] = useState("");

  const list = dept === "All" ? JOBS : JOBS.filter((j) => j.dept === dept);
  const values = VALUES.map((v, i) => ({
    ...v,
    title: tx(`pages.careers.value${i + 1}.title`, lang, v.title, ar.values?.[i]?.title),
    body: tx(`pages.careers.value${i + 1}.body`, lang, v.body, ar.values?.[i]?.body),
  }));
  const benefits = BENEFITS.map(([title, body], i) => [
    tx(`pages.careers.benefit${i + 1}.title`, lang, title, ar.benefits?.[i]?.[0]),
    tx(`pages.careers.benefit${i + 1}.body`, lang, body, ar.benefits?.[i]?.[1]),
  ]);

  function closeModal() {
    setModalJob(null);
    setSubmitted(false);
    setApplyError("");
  }

  // Saves the application + CV to the CMS (Admin → Job Applications).
  async function handleApply(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    if (data.get("website")) { setSubmitted(true); return; } // spam trap
    const cv = data.get("cv");
    const isAr = lang === "ar";
    setApplyError("");

    if (cv && cv.size) {
      const ext = (cv.name.split(".").pop() || "").toLowerCase();
      if (!CV_TYPES.includes(ext)) {
        setApplyError(isAr ? "يرجى رفع السيرة الذاتية بصيغة PDF أو Word." : "Please upload your CV as a PDF or Word file.");
        return;
      }
      if (cv.size > CV_MAX_MB * 1024 * 1024) {
        setApplyError(isAr ? `حجم الملف يجب ألا يتجاوز ${CV_MAX_MB} ميغابايت.` : `Your CV must be smaller than ${CV_MAX_MB} MB.`);
        return;
      }
    }
    if (!supabaseConfigured) {
      setApplyError(isAr ? "تعذّر إرسال الطلب حالياً. يرجى المحاولة لاحقاً." : "Applications can't be sent right now. Please try again later.");
      return;
    }

    setSending(true);
    try {
      let cvPath = null;
      if (cv && cv.size) {
        const ext = cv.name.split(".").pop().toLowerCase();
        cvPath = `${new Date().toISOString().slice(0, 10)}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error: upErr } = await supabase.storage.from("cvs").upload(cvPath, cv, { contentType: cv.type || undefined, upsert: false });
        if (upErr) throw upErr;
      }
      const { data: sess } = await supabase.auth.getSession();
      const { error: dbErr } = await supabase.from("job_applications").insert({
        job_title: modalJob?.title || "",
        dept: modalJob?.dept || null,
        location: modalJob?.location || null,
        full_name: data.get("full_name") || "",
        email: data.get("email") || "",
        phone: data.get("phone") || "",
        experience: data.get("experience") || null,
        cover_note: data.get("cover_note") || null,
        cv_path: cvPath,
        cv_name: cv && cv.size ? cv.name : null,
        language: lang,
        customer_id: sess?.session?.user?.id || null,
      });
      if (dbErr) throw dbErr;
      form.reset();
      setSubmitted(true);
    } catch (err) {
      console.error("Could not send application:", err?.message || err);
      setApplyError(isAr ? "تعذّر إرسال الطلب. يرجى المحاولة مرة أخرى." : "Something went wrong sending your application. Please try again.");
    } finally {
      setSending(false);
    }
  }

  function jobTitle(j) {
    return lang === "ar" ? ar.jobTitles[j.title] || j.title : j.title;
  }
  function deptLabel(d) {
    if (d === "All") return tx("pages.careers.all", lang, "All", ar.all);
    return lang === "ar" ? ar.jobDepts[d] || d : d;
  }

  return (
    <>
      <PageHeader
        eyebrow={tx("pages.careers.eyebrow", lang, "Join Our Team", ar.eyebrow)}
        title={tx("pages.careers.title", lang, "Build Your Career at Al Nawras", ar.title)}
        desc={
          tx("pages.careers.desc", lang, "We're growing our team of fire protection engineers, ICT specialists and project managers. Help us secure lives and buildings across the UAE.", ar.desc)
        }
        crumbs={[{ label: tx("pages.careers.crumb", lang, "Careers", ar.crumb) }]}
        image={headerImage}
      />

      <Reveal as="section" className="section" style={{ paddingBottom: 20 }}>
        <div className="container">
          <span className="eyebrow">{tx("pages.careers.whyUs", lang, "WHY AL NAWRAS", ar.whyUs)}</span>
          <h2 style={{ marginTop: 12, fontSize: 28 }}>{tx("pages.careers.whatWeValue", lang, "What We Value", ar.whatWeValue)}</h2>
          <div className="values-grid">
            {values.map((v) => {
              const IconComp = Icon[v.icon];
              return (
                <div className="value-card" key={v.title}>
                  <div className="icon-wrap"><IconComp /></div>
                  <h4>{v.title}</h4>
                  <p>{v.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="section benefits-section">
        <div className="container">
          <span className="eyebrow">{tx("pages.careers.benefitsLabel", lang, "BENEFITS", ar.benefitsLabel)}</span>
          <h2 style={{ marginTop: 12, fontSize: 28 }}>{tx("pages.careers.benefitsTitle", lang, "What You'll Get", ar.benefitsTitle)}</h2>
          <div className="benefits-grid">
            {benefits.map(([title, body]) => (
              <div className="benefit-item" key={title}>
                <div className="ic"><Icon.check /></div>
                <div><h5>{title}</h5><p>{body}</p></div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <main className="section">
        <div className="container">
          <span className="eyebrow">{tx("pages.careers.openRoles", lang, "OPEN ROLES", ar.openRoles)}</span>
          <h2 style={{ marginTop: 12, fontSize: 28 }}>{tx("pages.careers.currentOpenings", lang, "Current Openings", ar.currentOpenings)}</h2>
          <div className="jobs-toolbar">
            {depts.map((d) => (
              <button key={d} className={`pill ${dept === d ? "active" : ""}`} onClick={() => setDept(d)}>{deptLabel(d)}</button>
            ))}
          </div>
          <div className="job-list">
            {list.map((j) => (
              <div className="job-card" key={j.title}>
                <div className="info">
                  <h4>{jobTitle(j)}</h4>
                  <div className="job-meta">
                    <span><Icon.briefcase /> {deptLabel(j.dept)}</span>
                    <span><Icon.clock /> {lang === "ar" ? "دوام كامل" : j.type}</span>
                    <span><Icon.map /> {lang === "ar" ? (j.location === "Sharjah" ? ar.jobLocationSharjah : ar.jobLocationDubai) : j.location}</span>
                  </div>
                </div>
                <button className="btn btn-primary btn-sm" onClick={() => setModalJob(j)}>{tx("pages.careers.applyNow", lang, "Apply Now", ar.applyNow)}</button>
              </div>
            ))}
          </div>
        </div>
      </main>

      <div className={`apply-modal ${modalJob ? "open" : ""}`}>
        <div className="scrim" onClick={closeModal} />
        <div className="sheet">
          <button className="close-x" aria-label="Close" onClick={closeModal}><Icon.close /></button>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div className="icon-circle" style={{ margin: "0 auto 20px" }}><Icon.check /></div>
              <h3 style={{ marginBottom: 8 }}>{tx("pages.careers.applicationSubmitted", lang, "Application Submitted", ar.applicationSubmitted)}</h3>
              <p style={{ color: "var(--slate-500)", fontSize: 14 }}>
                {lang === "ar"
                  ? `${ar.thankYouApplying} ${jobTitle(modalJob || {})}. ${ar.hrWillContact}`
                  : <>Thank you for applying to {modalJob?.title}. Our HR team will be in touch if there's a match.</>}
              </p>
            </div>
          ) : (
            <>
              <h3 style={{ marginBottom: 6 }}>{tx("pages.careers.applyNow", lang, "Apply Now", ar.applyNow)}</h3>
              <p style={{ color: "var(--slate-500)", fontSize: 13.5, marginBottom: 22 }}>{jobTitle(modalJob || {})} &mdash; {lang === "ar" ? (modalJob?.location === "Sharjah" ? ar.jobLocationSharjah : ar.jobLocationDubai) : modalJob?.location}</p>
              <form onSubmit={handleApply}>
                <div className="field"><label>{tx("pages.careers.fullName", lang, "Full Name *", ar.fullName)}</label><input type="text" name="full_name" required maxLength={200} /></div>
                <div className="field"><label>{tx("pages.careers.email", lang, "Email *", ar.email)}</label><input type="email" name="email" required maxLength={200} /></div>
                <div className="field"><label>{tx("pages.careers.phone", lang, "Phone *", ar.phone)}</label><input type="tel" name="phone" required maxLength={40} /></div>
                <div className="field"><label>{tx("pages.careers.yearsExperience", lang, "Years of Experience", ar.yearsExperience)}</label><input type="text" name="experience" maxLength={60} placeholder={tx("pages.careers.yearsExperiencePlaceholder", lang, "e.g. 5 years", ar.yearsExperiencePlaceholder)} /></div>
                <div className="field"><label>{tx("pages.careers.coverNote", lang, "Cover Note", ar.coverNote)}</label><textarea name="cover_note" maxLength={3000} placeholder={tx("pages.careers.coverNotePlaceholder", lang, "Tell us why you're a great fit…", ar.coverNotePlaceholder)} /></div>
                <div className="field">
                  <label>{tx("pages.careers.cv", lang, "CV / Resume * (PDF or Word, max 5 MB)", "السيرة الذاتية * (PDF أو Word، بحد أقصى 5 ميغابايت)")}</label>
                  <input type="file" name="cv" required accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
                </div>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />
                {applyError && <p style={{ color: "#c8390b", fontSize: 13.5, fontWeight: 600, margin: "0 0 14px" }}>{applyError}</p>}
                <button type="submit" className="btn btn-primary btn-block" disabled={sending}>
                  {sending
                    ? tx("pages.careers.sending", lang, "Sending…", "جارٍ الإرسال…")
                    : tx("pages.careers.submitApplication", lang, "Submit Application", ar.submitApplication)}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}