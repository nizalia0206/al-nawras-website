import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Icon } from "../components/CatalogIcons.jsx";
import Reveal from "../components/Reveal.jsx";
import { useLanguage } from "../context/LanguageContext";
import useProjects from "../hooks/useProjects";
import { projectDetailPage, projectCategoriesAr, projectsPage } from "../i18n/pagesAr";

// Break a long scope sentence into distinct system/scope bullet points for a
// cleaner "what was delivered" list on the detail page.
function scopeToBullets(scope) {
  // Protect commas inside numbers (e.g. "30,200 sqm") before splitting on
  // list-separating commas/ampersands/and, then restore them.
  const protectedScope = scope.replace(/(\d),(\d)/g, "$1\u0000$2");
  return protectedScope
    .replace(/\.$/, "")
    .split(/,| & | and /gi)
    .map((s) => s.replace(/\u0000/g, ",").trim())
    .filter((s) => s.split(" ").length >= 2 && s.length < 90)
    .slice(0, 8);
}

export default function ProjectDetail() {
  const { lang } = useLanguage();
  const ar = projectDetailPage;
  const { slug } = useParams();
  const navigate = useNavigate();
  const { projects: PROJECTS, loading } = useProjects();
  const project = PROJECTS.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Show the project's own name in the browser tab (mirrors the brand name shown for
  // partner links on /products) instead of the generic site title on every project page.
  useEffect(() => {
    if (!project) return;
    const prevTitle = document.title;
    document.title = `${project.title} | Al Nawras Safety & Security Systems LLC`;
    return () => {
      document.title = prevTitle;
    };
  }, [project]);

  if (!project) {
    if (loading) return null;
    return (
      <div className="container" style={{ padding: "100px 20px", textAlign: "center" }}>
        <h2>{lang === "ar" ? ar.projectNotFound : "Project not found"}</h2>
        <Link to="/projects" className="btn btn-primary" style={{ marginTop: 16 }}>{lang === "ar" ? ar.backToProjects : "Back to Projects"}</Link>
      </div>
    );
  }

  const related = PROJECTS.filter((p) => p.category === project.category && p.slug !== project.slug).slice(0, 3);
  const bullets = scopeToBullets(project.scope);
  const catLabel = lang === "ar" ? projectCategoriesAr[project.category] || project.category : project.category;

  return (
    <>
      <div className="project-detail-hero" style={{ backgroundImage: `url(${project.image})` }}>
        <div className="project-detail-hero-scrim" />
        <div className="container project-detail-hero-inner">
          <div className="breadcrumb" style={{ color: "rgba(255,255,255,.75)" }}>
            <Link to="/">{lang === "ar" ? ar.breadcrumbHome : "Home"}</Link><span className="sep">/</span>
            <Link to="/projects">{lang === "ar" ? ar.breadcrumbProjects : "Projects"}</Link><span className="sep">/</span>
            <button
              type="button"
              className="breadcrumb-link"
              onClick={() => navigate(`/projects`)}
              style={{ background: "none", border: "none", padding: 0, color: "rgba(255,255,255,.75)", cursor: "pointer" }}
            >
              {catLabel}
            </button>
          </div>
          <span className="badge" style={{ marginTop: 16 }}>{catLabel}</span>
          <h1>{project.title}</h1>
          <p className="lead">{project.location}</p>
        </div>
      </div>

      <main className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          <div className="project-detail-grid">
            <div className="project-detail-main">
              <span className="eyebrow">{lang === "ar" ? ar.overviewLabel : "PROJECT OVERVIEW"}</span>
              <h2 style={{ marginTop: 10, fontSize: 26 }}>{lang === "ar" ? ar.scopeOfWork : "Scope of Work"}</h2>
              <p className="project-detail-desc">{project.scope}</p>

              {bullets.length > 2 && (
                <ul className="project-detail-bullets">
                  {bullets.map((b, i) => (
                    <li key={i}><Icon.check /> {b}</li>
                  ))}
                </ul>
              )}

              <div className="project-detail-cta-row">
                <a href="mailto:info@nawrassystems.com" className="btn btn-primary">
                  {lang === "ar" ? ar.discussProject : "Discuss a Similar Project"} <Icon.arrowRight />
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Hi, I'd like to discuss a project similar to ${project.title}.`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <Icon.phone /> {lang === "ar" ? ar.whatsappUs : "WhatsApp Us"}
                </a>
              </div>
            </div>

            <aside className="project-detail-sidebar">
              <div className="project-detail-card">
                <div className="project-detail-card-row">
                  <span className="lbl"><Icon.map /> {lang === "ar" ? ar.location : "Location"}</span>
                  <span className="val">{project.location}</span>
                </div>
                <div className="project-detail-card-row">
                  <span className="lbl"><Icon.briefcase /> {lang === "ar" ? ar.client : "Client"}</span>
                  <span className="val">{project.client}</span>
                </div>
                <div className="project-detail-card-row">
                  <span className="lbl"><Icon.check /> {lang === "ar" ? ar.reference : "Reference"}</span>
                  <span className="val">{project.ref}</span>
                </div>
                <div className="project-detail-card-row">
                  <span className="lbl"><Icon.shield /> {lang === "ar" ? ar.category : "Category"}</span>
                  <span className="val">{catLabel}</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {related.length > 0 && (
        <Reveal as="section" className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <span className="eyebrow">{lang === "ar" ? ar.moreInCategory : "MORE IN THIS CATEGORY"}</span>
            <h2 style={{ marginTop: 12, marginBottom: 24, fontSize: 26 }}>{lang === "ar" ? ar.relatedProjects : "Related Projects"}</h2>
            <div className="project-grid">
              {related.map((p) => (
                <div
                  className="card project-card project-card-tap"
                  key={p.slug}
                  onClick={() => navigate(`/projects/${p.slug}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); navigate(`/projects/${p.slug}`); } }}
                >
                  <div className="thumb">
                    <div className="cover-img" style={{ backgroundImage: `url(${p.image})` }} />
                    <div className="cover-scrim" />
                    <span className="badge">{lang === "ar" ? projectCategoriesAr[p.category] || p.category : p.category}</span>
                    <h3>{p.title}</h3>
                  </div>
                  <div className="body">
                    <p>{p.scope}</p>
                    <div className="project-meta">
                      <span><Icon.map /> {p.location}</span>
                      <span>{lang === "ar" ? projectsPage.ref : "Ref"}: {p.ref}</span>
                    </div>
                    <span className="project-view-link">
                      {lang === "ar" ? projectsPage.viewProject : "View Project"} <Icon.arrowRight />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}
    </>
  );
}
