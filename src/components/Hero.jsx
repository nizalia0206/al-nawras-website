import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import EmberCanvas from "./EmberCanvas";
import Counter from "./Counter";
import { useLanguage } from "../context/LanguageContext";
import {
  IconArrow,
  IconFlame,
  IconPump,
  IconDetector,
  IconSpeaker,
  IconBattery,
  IconELV,
  IconSmoke,
} from "./Icons";
import fireFightingEnv from "../assets/hero/fire-fighting-env.png";
import fireAlarmEnv from "../assets/hero/fire-alarm-env.png";
import voiceEvacEnv from "../assets/hero/voice-evac-env.png";
import emergencyLightEnv from "../assets/hero/emergency-light-env.png";
import elvCctv from "../assets/hero/elv-cctv.jpg";
import smokeFan from "../assets/hero/smoke-fan.jpg";

const AUTOPLAY_MS = 5500;

// slide 0 is the brand intro — no product image / float animation.
// slides 1+ are the product categories, each shown full-bleed across the whole slide,
// and the carousel advances automatically, exactly like it did before.
function useCategories(t) {
  return [
    {
      intro: true,
      icon: IconFlame,
      label: t("hero.eyebrowIntro"),
      tabLabel: t("hero.tabIntro"),
    },
    {
      icon: IconPump,
      label: t("nav.systems_fire"),
      to: "/systems/fire-fighting",
      image: fireFightingEnv,
      imagePosition: "center 78%",
    },
    {
      icon: IconDetector,
      label: t("nav.systems_alarm"),
      to: "/systems/fire-alarm",
      image: fireAlarmEnv,
      imagePosition: "center 22%",
    },
    {
      icon: IconSpeaker,
      label: t("nav.systems_voice"),
      to: "/systems/voice-evacuation",
      image: voiceEvacEnv,
      imagePosition: "right center",
    },
    {
      icon: IconBattery,
      label: t("nav.systems_light"),
      to: "/systems/emergency-lighting",
      image: emergencyLightEnv,
      imagePosition: "center 30%",
    },
    {
      icon: IconELV,
      label: t("nav.systems_elv"),
      to: "/systems/elv",
      image: elvCctv,
      imagePosition: "center 40%",
    },
    {
      icon: IconSmoke,
      label: t("nav.systems_smoke"),
      to: "/systems/smoke-management",
      image: smokeFan,
      imagePosition: "center 55%",
    },
  ];
}

// English/Arabic per-slide headline copy, keyed by slide index (1-6 = product slides).
const SLIDE_COPY = {
  en: {
    1: { line1: "Rapid Response,", line2: "Total Suppression", tagline: "Pumps, sprinklers, hydrants & risers engineered for total suppression coverage." },
    2: { line1: "Early Warning,", line2: "Zero Delay", tagline: "Addressable detection networks that catch a threat before it spreads." },
    3: { line1: "Clear Direction,", line2: "Safe Evacuation", tagline: "Life-safety audio and ECS systems that guide occupants to safety, clearly." },
    4: { line1: "Guided Path,", line2: "Always Lit", tagline: "Central battery & DALI systems that keep exit paths lit when it matters most." },
    5: { line1: "Connected Building,", line2: "Constant Watch", tagline: "Access control, CCTV and low-voltage infrastructure across every building." },
    6: { line1: "Clean Air,", line2: "Clear Escape", tagline: "Ventilation and smoke control systems engineered for safe evacuation." },
  },
  ar: {
    1: { line1: "استجابة سريعة،", line2: "إخماد كامل", tagline: "مضخات ورشاشات وحنفيات ومواسير رأسية مصمّمة لتغطية إخماد شاملة." },
    2: { line1: "إنذار مبكر،", line2: "بلا تأخير", tagline: "شبكات كشف قابلة للعنونة ترصد الخطر قبل انتشاره." },
    3: { line1: "توجيه واضح،", line2: "إخلاء آمن", tagline: "أنظمة صوت السلامة والاتصال الطارئ التي ترشد الشاغلين إلى الأمان بوضوح." },
    4: { line1: "مسار مُضاء،", line2: "دائم الإضاءة", tagline: "أنظمة بطارية مركزية وDALI تُبقي مسارات الخروج مضاءة عند الحاجة." },
    5: { line1: "مبنى متصل،", line2: "مراقبة دائمة", tagline: "التحكم بالدخول وكاميرات المراقبة والبنية التحتية منخفضة الجهد في كل مبنى." },
    6: { line1: "هواء نظيف،", line2: "مخرج آمن", tagline: "أنظمة تهوية وتحكم بالدخان مصمّمة لإخلاء آمن." },
  },
};

export default function Hero() {
  const { t, lang } = useLanguage();
  const CATEGORIES = useCategories(t);
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(null);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(() => {
      setPrev(active);
      setActive((i) => (i + 1) % CATEGORIES.length);
    }, AUTOPLAY_MS);
    return () => clearTimeout(timerRef.current);
  }, [active, paused]);

  const current = CATEGORIES[active];
  const goTo = (i) => {
    if (i === active) return;
    setPrev(active);
    setActive(i);
  };
  const goPrev = () => goTo((active - 1 + CATEGORIES.length) % CATEGORIES.length);
  const goNext = () => goTo((active + 1) % CATEGORIES.length);

  return (
    <section id="home" className="relative bg-bgdark text-white overflow-hidden">
      {/* radial glow backdrop — shared across the whole section */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 900px 500px at 78% 18%, rgba(238,108,47,.22), transparent 60%), radial-gradient(ellipse 700px 500px at 15% 6%, rgba(147,161,194,.14), transparent 60%)",
        }}
      />

      {/* faint grid */}
      <div
        className="absolute inset-0 z-0 opacity-[.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 20%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 20%, black, transparent)",
        }}
      />

      {/* ===== single rotating hero carousel — slide 1 is the brand intro, slides 2+ are products, all auto-advancing ===== */}
      <div
        className="relative z-[2]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative overflow-hidden min-h-[480px] sm:min-h-[520px] md:min-h-[580px]">
          {/* stacked slide backdrops (crossfade) */}
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat.label}
              aria-hidden={i !== active}
              className={`absolute inset-0 z-0 transition-opacity duration-[900ms] ease-[var(--ease)] ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-[linear-gradient(180deg,#1a2c56_0%,#152447_25%,#0c1c3d_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_25%_55%,rgba(29,58,112,.55)_0%,transparent_70%)]" />

              {cat.intro ? (
                <>
                  {/* ambient glow — animated only on this brand slide */}
                  <span
                    className="absolute right-[6%] top-1/2 -translate-y-1/2 w-[52%] h-[80%] rounded-full blur-[90px] opacity-60"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(238,108,47,.32), rgba(247,148,29,.10) 60%, transparent 75%)",
                      animation: i === active ? "pulseGlow 5s ease-in-out infinite" : "none",
                    }}
                  />
                </>
              ) : (
                /* full-bleed environment photo — no color wash, just enough depth for text contrast */
                <>
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className="w-full h-full object-cover"
                      style={{
                        objectPosition: cat.imagePosition || "center center",
                        animation: i === active ? "kenBurns 6.5s ease-out forwards" : "none",
                        transformOrigin: cat.imagePosition || "center center",
                      }}
                    />
                  </div>
                  {/* light, neutral scrim — keeps the photo's real colour, just enough for text contrast */}
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1c3d]/70 via-transparent to-[#0c1c3d]/25" />
                </>
              )}

              <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#0c1c3d] to-transparent" />
            </div>
          ))}

          {/* embers — only on the Think Nawras slide; other slides stay static */}
          {active === 0 && (
            <EmberCanvas
              boost
              className="absolute inset-0 w-full h-full z-[1] pointer-events-none"
            />
          )}

          {/* transition flash */}
          {prev !== null && (
            <span
              key={active}
              className="absolute inset-0 z-[1] bg-white pointer-events-none"
              style={{ animation: "heroFlash 700ms ease-out forwards" }}
            />
          )}

          {/* prev / next arrow navigation */}
          <button
            type="button"
            onClick={goPrev}
            aria-label={lang === "ar" ? "الشريحة السابقة" : "Previous slide"}
            className="hidden sm:flex absolute top-1/2 -translate-y-1/2 z-[3] h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/40"
            style={{ [lang === "ar" ? "right" : "left"]: "1.25rem" }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label={lang === "ar" ? "الشريحة التالية" : "Next slide"}
            className="hidden sm:flex absolute top-1/2 -translate-y-1/2 z-[3] h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/40"
            style={{ [lang === "ar" ? "left" : "right"]: "4.5rem" }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>

          {/* slide dot indicators */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-5 z-[3] flex items-center gap-2">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat.label}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`${lang === "ar" ? "الانتقال إلى الشريحة" : "Go to slide"} ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? "w-6 bg-flame1" : "w-2 bg-white/35 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* vertical "Free Consultation" tab */}
          <a
            href="#contact"
            className="hidden md:flex absolute z-[3] items-center justify-center gap-2 bg-gradient-to-b from-flame1 to-flame2 text-white font-display text-[12.5px] font-semibold tracking-[.18em] uppercase px-3 py-5 shadow-flame"
            style={{
              [lang === "ar" ? "left" : "right"]: 0,
              top: "50%",
              transform: "translateY(-50%) rotate(180deg)",
              writingMode: "vertical-rl",
              borderRadius: lang === "ar" ? "0 8px 8px 0" : "8px 0 0 8px",
            }}
          >
            {lang === "ar" ? "استشارة مجانية" : "Free Consultation"}
          </a>

          {/* headline content */}
          <div className="relative z-[2] h-full flex flex-col items-center justify-center text-center max-w-[1280px] w-full mx-auto px-6 sm:px-8 pt-[118px] pb-8 md:pt-[132px] md:pb-10">
            <div className="max-w-[720px] flex flex-col items-center">
              <div
                key={"eyebrow-" + active}
                className="sec-eyebrow !text-flame2 !mb-3"
                style={{ animation: "slideIn .5s var(--ease)" }}
              >
                {current.label}
              </div>

              {current.intro ? (
                <>
                  <h1
                    key={"h-" + active}
                    className="font-display font-bold uppercase leading-[1.06] text-[28px] sm:text-[38px] md:text-[46px] max-w-[16ch]"
                    style={{ animation: "slideIn .55s var(--ease) .05s backwards" }}
                  >
                    {t("hero.h1line1")}
                    <br />
                    {t("hero.h1line2")}{" "}
                    <span className="bg-gradient-to-r from-flame2 via-gold to-flame1 bg-clip-text text-transparent">
                      {t("hero.h1brand")}
                    </span>
                  </h1>
                  <p
                    key={"p-" + active}
                    className="mt-4 text-[14px] sm:text-[15.5px] leading-[1.6] text-steellight max-w-[46ch]"
                    style={{ animation: "slideIn .55s var(--ease) .1s backwards" }}
                  >
                    {t("hero.subtitle")}
                  </p>
                  <div
                    key={"b-" + active}
                    className="flex justify-center gap-4 mt-6 flex-wrap"
                    style={{ animation: "slideIn .55s var(--ease) .16s backwards" }}
                  >
                    <a href="#projects" className="btn btn-flame">
                      {t("hero.viewProjects")} <IconArrow />
                    </a>
                    <a href="#contact" className="btn btn-ghost">
                      {t("hero.getConsultation")}
                    </a>
                  </div>
                  <div
                    key={"c-" + active}
                    className="flex justify-center mt-6 border-t border-white/[.08] flex-wrap"
                    style={{ animation: "slideIn .55s var(--ease) .22s backwards" }}
                  >
                    <Counter target={1000} suffix="+" label={t("hero.statProjects")} />
                    <Counter target={20} suffix="+" label={t("hero.statYears")} />
                    <Counter target={3} suffix="" label={t("hero.statOffices")} />
                    <Counter target={6} suffix="" label={t("hero.statBrands")} />
                  </div>
                </>
              ) : (
                <>
                  <h2
                    key={"h-" + active}
                    className="font-display font-bold uppercase leading-[1.06] text-[28px] sm:text-[38px] md:text-[46px]"
                    style={{
                      animation: "slideIn .55s var(--ease) .05s backwards",
                      textShadow: "0 4px 24px rgba(0,0,0,.45)",
                    }}
                  >
                    <span className="block text-white">{(SLIDE_COPY[lang][active] || SLIDE_COPY.en[active])?.line1}</span>
                    <span className="block text-steellight">{(SLIDE_COPY[lang][active] || SLIDE_COPY.en[active])?.line2}</span>
                  </h2>
                  <p
                    key={"p-" + active}
                    className="mt-4 text-[14px] sm:text-[15.5px] leading-[1.6] text-steellight max-w-[42ch]"
                    style={{ animation: "slideIn .55s var(--ease) .1s backwards", textShadow: "0 2px 12px rgba(0,0,0,.5)" }}
                  >
                    {(SLIDE_COPY[lang][active] || SLIDE_COPY.en[active])?.tagline}
                  </p>
                  <div key={"b-" + active} style={{ animation: "slideIn .55s var(--ease) .16s backwards" }}>
                    <Link to={current.to} className="btn btn-flame mt-6 w-fit">
                      {t("hero.exploreLabel")} {current.label} <IconArrow />
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* tab bar */}
        <div className="relative z-[2] border-t border-white/[.08] bg-[#122a52]/70 backdrop-blur-sm">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8 flex overflow-x-auto sm:grid sm:grid-cols-7 sm:overflow-visible">
            {CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              const isActive = i === active;
              return (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`relative flex items-center justify-center gap-2 min-w-[110px] sm:min-w-0 sm:w-full px-2 sm:px-2.5 py-3 text-center shrink-0 sm:shrink transition-colors duration-300 ${
                    isActive ? "text-white" : "text-steel hover:text-steellight"
                  }`}
                >
                  <Icon
                    className={`w-[18px] h-[18px] shrink-0 transition-all duration-300 ${
                      isActive ? "text-flame2 scale-110" : "text-steel"
                    }`}
                  />
                  <span className="text-[11px] sm:text-[11.5px] font-semibold leading-tight text-center">
                    {cat.intro ? cat.tabLabel : cat.label}
                  </span>

                  {/* progress underline */}
                  <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-white/[.08] overflow-hidden">
                    {isActive && (
                      <span
                        key={active}
                        className="block h-full bg-gradient-to-r from-flame1 to-gold"
                        style={{
                          animation: `fillBar ${AUTOPLAY_MS}ms linear forwards`,
                          animationPlayState: paused ? "paused" : "running",
                        }}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
