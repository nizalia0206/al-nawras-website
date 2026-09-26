import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Icon } from "../components/CatalogIcons.jsx";
import Reveal from "../components/Reveal.jsx";
import PageHeader from "../components/PageHeader";
import { useLanguage } from "../context/LanguageContext";
import useProjects from "../hooks/useProjects";
import { projectsPage, projectCategoriesAr } from "../i18n/pagesAr";
import headerImage from "../assets/page-headers/projects.jpg";

export default function Projects() {
  const { lang } = useLanguage();
  const ar = projectsPage;
  const { projects: PROJECTS } = useProjects();
  const PROJECT_CATS = useMemo(() => ["All", ...new Set(PROJECTS.map((p) => p.category))], [PROJECTS]);
  const [params] = useSearchParams();
  const typeParam = params.get("type");
  const [filter, setFilter] = useState(() => (typeParam && PROJECT_CATS.includes(typeParam) ? typeParam : "All"));
  const navigate = useNavigate();

  // The header's Projects dropdown (and the Partners/brand links elsewhere) link here
  // with ?type=<category> — react-router doesn't remount this component for a query-string
  // change alone, so without this the filter stayed on whatever it was initialised to
  // (always "All") no matter which category was clicked.
  useEffect(() => {
    if (typeParam && PROJECT_CATS.includes(typeParam)) setFilter(typeParam);
    else if (!typeParam) setFilter("All");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeParam, PROJECT_CATS.length]);

  const list = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  // When a category pill (or the header's Projects dropdown, which sets the same ?type=
  // filter) is active, show that category's name in the banner instead of the generic
  // catalog title — the same pattern used for a brand's name on /products.
  const catLabel = filter !== "All" ? (lang === "ar" ? projectCategoriesAr[filter] || filter : filter) : null;

  return (
    <>
      <PageHeader
        eyebrow={lang === "ar" ? ar.eyebrow : catLabel ? "Project Category" : "Our Track Record"}
        title={
          catLabel
            ? lang === "ar"
              ? `مشاريع ${catLabel}`
              : `${catLabel} Projects`
            : lang === "ar"
            ? ar.title
            : "Projects Delivered Across the UAE"
        }
        desc={
          catLabel
            ? lang === "ar"
              ? `تصفح مشاريع الأنوار المنجزة في قطاع ${catLabel}.`
              : `Browse Al Nawras projects delivered in the ${catLabel} sector.`
            : lang === "ar"
            ? ar.desc
            : "From malls and high-rise towers to hospitals, schools and oil & gas facilities — a selection of the fire protection, life safety and ELV projects Al Nawras has delivered."
        }
        crumbs={
          catLabel
            ? [{ label: lang === "ar" ? ar.crumb : "Projects", href: "/projects" }, { label: catLabel }]
            : [{ label: lang === "ar" ? ar.crumb : "Projects" }]
        }
        image={headerImage}
      />

      <Reveal as="section" className="stats-strip">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-box"><div className="num ltr-content">1300+</div><div className="lbl">{lang === "ar" ? ar.statCompleted : "Projects Completed"}</div></div>
            <div className="stat-box"><div className="num ltr-content">20+</div><div className="lbl">{lang === "ar" ? ar.statYears : "Years of Operation"}</div></div>
            <div className="stat-box"><div className="num ltr-content">10</div><div className="lbl">{lang === "ar" ? ar.statSectors : "Sectors Served"}</div></div>
            <div className="stat-box"><div className="num ltr-content">7</div><div className="lbl">{lang === "ar" ? ar.statEmirates : "Emirates Covered"}</div></div>
          </div>
        </div>
      </Reveal>

      <main className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="filter-pills">
            {PROJECT_CATS.map((c) => (
              <button key={c} className={`pill ${filter === c ? "active" : ""}`} onClick={() => setFilter(c)}>
                {lang === "ar" ? projectCategoriesAr[c] || c : c}
              </button>
            ))}
          </div>
          <div className="project-grid">
            {list.map((p) => (
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
                    <span>{lang === "ar" ? ar.ref : "Ref"}: {p.ref}</span>
                  </div>
                  <div className="project-ref">
                    <span>{p.client}</span>
                  </div>
                  <span className="project-view-link">
                    {lang === "ar" ? ar.viewProject : "View Project"} <Icon.arrowRight />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Reveal as="section" className="process-section section">
        <div className="container">
          <span className="eyebrow">{lang === "ar" ? ar.howWeWork : "HOW WE WORK"}</span>
          <h2 style={{ marginTop: 12, fontSize: 30 }}>{lang === "ar" ? ar.processTitle : "Our Project Delivery Process"}</h2>
          <div className="process-grid">
            {(lang === "ar" ? ar.steps : [
              { num: "01", title: "Site Assessment", desc: "Our engineers survey the site and review drawings to scope the right fire, life safety or ICT solution." },
              { num: "02", title: "Design & Proposal", desc: "We prepare a compliant system design and detailed proposal aligned with Civil Defense and NFPA requirements." },
              { num: "03", title: "Supply & Installation", desc: "Certified products are supplied and installed by our trained technical teams, on schedule and to code." },
              { num: "04", title: "Testing & Handover", desc: "Full system commissioning, authority approvals and handover documentation for long-term reliability." },
            ]).map((s) => (
              <div className="process-step" key={s.num}>
                <span className="num ltr-content">{s.num}</span>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </>
  );
}
