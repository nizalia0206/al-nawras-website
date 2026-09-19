import { useEffect, useState } from "react";
import { certificationsAr } from "../i18n/arabicContent";
import { useLanguage } from "../context/LanguageContext";
import useCertifications from "../hooks/useCertifications";

function slugify(str) {
  return (str || "certificate")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function fileExtFromUrl(url) {
  const match = /\.([a-zA-Z0-9]+)(?:\?|#|$)/.exec(url || "");
  return match ? match[1] : "jpg";
}

export default function CertificationsGrid() {
  const { lang } = useLanguage();
  const { certifications } = useCertifications();
  const withImages = certifications.filter((c) => c.image);
  const [active, setActive] = useState(null);
  const [downloading, setDownloading] = useState(null);

  // Certificate images may be hosted on Supabase (a different origin than the
  // site), and browsers silently ignore the `download` attribute on
  // cross-origin links — clicking would just open the image instead of
  // saving it. Fetching the file ourselves and saving it as a blob works
  // regardless of origin, with a new-tab fallback if the fetch is blocked.
  async function downloadCertificate(e, item, title) {
    e.preventDefault();
    setDownloading(item.num);
    const filename = `${slugify(title)}.${fileExtFromUrl(item.image)}`;
    try {
      const res = await fetch(item.image);
      if (!res.ok) throw new Error("Download failed");
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      window.open(item.image, "_blank", "noopener,noreferrer");
    } finally {
      setDownloading(null);
    }
  }

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % withImages.length);
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + withImages.length) % withImages.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, withImages.length]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((c) => {
          const ar = lang === "ar" ? certificationsAr[c.num] : null;
          const imgIndex = c.image ? withImages.findIndex((w) => w.num === c.num) : -1;

          return (
            <div
              key={c.num}
              className="group relative bg-white border border-ink/[.08] rounded-md overflow-hidden flex flex-col transition-all duration-300 hover:border-flame1/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_-18px_rgba(238,108,47,.35)]"
            >
              {c.image ? (
                <button
                  type="button"
                  onClick={() => setActive(imgIndex)}
                  className="relative h-[210px] w-full overflow-hidden bg-paper2 border-b border-ink/[.06]"
                  aria-label={`${ar?.title || c.title} — enlarge certificate`}
                >
                  <img
                    src={c.image}
                    alt={`${ar?.title || c.title} certificate`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 ease-[var(--ease)] group-hover:scale-[1.06]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/0 to-ink/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/95 text-ink flex items-center justify-center opacity-0 translate-y-1.5 scale-90 transition-all duration-300 ease-[var(--ease)] group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 shadow-md">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M9 3H3v6M15 3h6v6M9 21H3v-6M15 21h6v-6" />
                    </svg>
                  </span>
                  <span className="absolute top-3 left-3 font-display text-[22px] font-semibold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,.5)] ltr-content">
                    {c.num}
                  </span>
                </button>
              ) : (
                <div className="relative h-[210px] w-full overflow-hidden bg-gradient-to-br from-paper2 to-paper flex items-center justify-center border-b border-ink/[.06]">
                  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="text-flame1/30">
                    <path d="M12 2l2.4 4.86 5.36.78-3.88 3.78.92 5.34L12 14.27l-4.8 2.49.92-5.34-3.88-3.78 5.36-.78L12 2z" />
                  </svg>
                  <span className="absolute top-3 left-3 font-display text-[22px] font-semibold text-flame1 ltr-content">
                    {c.num}
                  </span>
                </div>
              )}

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-display text-[17px] uppercase tracking-wide mb-2.5">{ar?.title || c.title}</h3>
                <p className="svc-desc text-[13.5px] leading-[1.65] text-inksoft flex-grow">{ar?.desc || c.desc}</p>
                {c.image && (
                  <button
                    type="button"
                    onClick={(e) => downloadCertificate(e, c, ar?.title || c.title)}
                    disabled={downloading === c.num}
                    className="mt-4 pt-4 border-t border-ink/[.08] inline-flex items-center gap-1.5 text-[12.5px] font-semibold uppercase tracking-[.06em] text-flame1 hover:text-flame2 transition-colors disabled:opacity-60"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
                    </svg>
                    {downloading === c.num
                      ? lang === "ar" ? "جارٍ التنزيل…" : "Downloading…"
                      : lang === "ar" ? "تنزيل الشهادة" : "Download Certificate"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      <div
        className={`fixed inset-0 z-[400] flex items-center justify-center p-6 transition-all duration-400 ease-[var(--ease)] ${
          active !== null ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setActive(null)}
      >
        <div className="absolute inset-0 bg-bgdarker/92 backdrop-blur-sm" />

        {active !== null && (
          <div
            className="relative max-w-[560px] w-full max-h-[88vh] bg-white rounded-sm overflow-hidden shadow-[0_50px_100px_-30px_rgba(0,0,0,.6)] transition-all duration-400 ease-[var(--ease)] flex flex-col"
            style={{
              transform: active !== null ? "scale(1) translateY(0)" : "scale(.94) translateY(16px)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-ink/85 text-white flex items-center justify-center hover:bg-flame1 transition-colors duration-300"
            >
              &times;
            </button>

            <div className="flex-1 min-h-0 overflow-auto flex items-start justify-center p-6 bg-paper2">
              {(() => {
                const item = withImages[active];
                const ar = lang === "ar" ? certificationsAr[item.num] : null;
                return (
                  <img
                    key={active}
                    src={item.image}
                    alt={`${ar?.title || item.title} certificate`}
                    className="max-w-full h-auto rounded-sm shadow-lg animate-[fadeScale_.45s_var(--ease)]"
                  />
                );
              })()}
            </div>

            <div className="px-7 py-5 border-t border-black/[.07] flex items-center justify-between gap-4 shrink-0">
              <div>
                <div className="sec-eyebrow !mb-1 ltr-content">{withImages[active].num}</div>
                <h3 className="font-display uppercase text-[17px] tracking-wide text-ink">
                  {(lang === "ar" ? certificationsAr[withImages[active].num]?.title : null) || withImages[active].title}
                </h3>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {(() => {
                  const item = withImages[active];
                  const arT = lang === "ar" ? certificationsAr[item.num]?.title : null;
                  return (
                    <button
                      onClick={(e) => downloadCertificate(e, item, arT || item.title)}
                      disabled={downloading === item.num}
                      aria-label={lang === "ar" ? "تنزيل الشهادة" : "Download Certificate"}
                      className="w-9 h-9 rounded-full border border-black/[.12] flex items-center justify-center text-ink hover:border-flame1 hover:text-flame1 transition-colors duration-300 disabled:opacity-60"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
                      </svg>
                    </button>
                  );
                })()}
              {withImages.length > 1 && (
                <>
                  <button
                    onClick={() => setActive((active - 1 + withImages.length) % withImages.length)}
                    aria-label="Previous"
                    className="w-9 h-9 rounded-full border border-black/[.12] flex items-center justify-center text-ink hover:border-flame1 hover:text-flame1 transition-colors duration-300"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M15 6l-6 6 6 6" /></svg>
                  </button>
                  <button
                    onClick={() => setActive((active + 1) % withImages.length)}
                    aria-label="Next"
                    className="w-9 h-9 rounded-full border border-black/[.12] flex items-center justify-center text-ink hover:border-flame1 hover:text-flame1 transition-colors duration-300"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M9 6l6 6-6 6" /></svg>
                  </button>
                </>
              )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
