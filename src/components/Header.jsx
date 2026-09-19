import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";
import * as Icons from "./Icons";
import { IconChevron, IconArrow } from "./Icons";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "../context/LanguageContext";
import { useCustomerAuth } from "../context/CustomerAuthContext";

function useNav(t) {
  return [
    { label: t("nav.home"), to: "/" },
    {
      label: t("nav.about"),
      wide: true,
      items: [
        { icon: "IconHardHat", title: t("nav.about_overview"), desc: t("nav.about_overview_desc"), to: "/about/overview" },
        { icon: "IconFlame", title: t("nav.about_mission"), desc: t("nav.about_mission_desc"), to: "/about/mission" },
        { icon: "IconPerson", title: t("nav.about_founder"), desc: t("nav.about_founder_desc"), to: "/about/founder" },
        { icon: "IconPerson", title: t("nav.about_team"), desc: t("nav.about_team_desc"), to: "/about/team" },
        { icon: "IconTag", title: t("nav.about_certifications"), desc: t("nav.about_certifications_desc"), to: "/about/certifications" },
      ],
    },
    {
      label: t("nav.systems"),
      wide: true,
      items: [
        { icon: "IconFlame", title: t("nav.systems_fire"), desc: t("nav.systems_fire_desc"), to: "/systems/fire-fighting" },
        { icon: "IconPanel", title: t("nav.systems_alarm"), desc: t("nav.systems_alarm_desc"), to: "/systems/fire-alarm" },
        { icon: "IconSpeaker", title: t("nav.systems_voice"), desc: t("nav.systems_voice_desc"), to: "/systems/voice-evacuation" },
        { icon: "IconLightbulb", title: t("nav.systems_light"), desc: t("nav.systems_light_desc"), to: "/systems/emergency-lighting" },
        { icon: "IconELV", title: t("nav.systems_elv"), desc: t("nav.systems_elv_desc"), to: "/systems/elv" },
        { icon: "IconSmoke", title: t("nav.systems_smoke"), desc: t("nav.systems_smoke_desc"), to: "/systems/smoke-management" },
      ],
    },
    {
      label: t("nav.brands"),
      wide: true,
      items: [
        { icon: "IconTag", title: t("nav.brands_all"), desc: t("nav.brands_all_desc"), to: "/products" },
        { icon: "IconPanel", title: "Honeywell", desc: t("nav.brands_honeywell_desc"), to: "/products?supplier=honeywell" },
        { icon: "IconLightbulb", title: "Teknoware / ESCALUX", desc: t("nav.brands_teknoware_desc"), to: "/products?supplier=teknoware" },
        { icon: "IconPump", title: "Waterfall", desc: t("nav.brands_waterfall_desc"), to: "/products?supplier=waterfall" },
        { icon: "IconCable", title: "Uranus Cable", desc: t("nav.brands_uranus_desc"), to: "/products?supplier=uranus" },
        { icon: "IconServer", title: "H3C", desc: t("nav.brands_h3c_desc"), to: "/products?supplier=h3c" },
        { icon: "IconPipe", title: "KD Pipes", desc: t("nav.brands_kdpipes_desc"), to: "/products?supplier=kdpipes" },
      ],
    },
    {
      label: t("nav.projects"),
      wide: true,
      items: [
        { icon: "IconTag", title: t("nav.projects_all"), desc: t("nav.projects_all_desc"), to: "/projects" },
        { icon: "IconBuilding", title: t("nav.projects_residential"), desc: t("nav.projects_residential_desc"), to: "/projects?type=Residential" },
        { icon: "IconHardHat", title: t("nav.projects_commercial"), desc: t("nav.projects_commercial_desc"), to: "/projects?type=Commercial" },
        { icon: "IconCross", title: t("nav.projects_healthcare"), desc: t("nav.projects_healthcare_desc"), to: "/projects?type=Healthcare" },
        { icon: "IconBed", title: t("nav.projects_hospitality"), desc: t("nav.projects_hospitality_desc"), to: "/projects?type=Hospitality" },
      ],
    },
    { label: t("nav.careers"), to: "/careers" },
    { label: t("nav.contact"), to: "/contact" },
  ];
}

export default function Header({ overlayOnHero = false }) {
  const { t, lang } = useLanguage();
  const { session } = useCustomerAuth();
  const NAV = useNav(t);
  const [shrink, setShrink] = useState(false);
  const [openIdx, setOpenIdx] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerGroup, setDrawerGroup] = useState(null);
  const headerRef = useRef(null);

  const overlay = overlayOnHero && !shrink && !drawerOpen;

  useEffect(() => {
    const onScroll = () => setShrink(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const closeAll = () => setOpenIdx(null);
    document.addEventListener("click", closeAll);
    return () => document.removeEventListener("click", closeAll);
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  function closeDrawer() {
    setDrawerOpen(false);
    setDrawerGroup(null);
  }

  return (
    <>
      <header
        ref={headerRef}
        className={`${overlayOnHero ? "fixed top-[38px]" : "sticky top-0"} left-0 right-0 z-[200] transition-all duration-300 ${
          overlay
            ? "bg-transparent border-b border-transparent"
            : "bg-white/95 backdrop-blur-md border-b border-ink/[.08] shadow-[0_2px_20px_-8px_rgba(0,0,0,.08)]"
        }`}
      >
        {overlay && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-full"
            style={{ background: "linear-gradient(180deg, rgba(0,0,0,.4) 0%, transparent 100%)" }}
          />
        )}
        <div
          className={`relative max-w-[1280px] mx-auto px-4 sm:px-8 flex items-center justify-between gap-3 transition-[height] duration-300 h-[72px] ${
            shrink ? "xl:h-[124px]" : "xl:h-[144px]"
          }`}
        >
          <Link to="/" className="flex items-center shrink-0">
            <Logo
              light={overlay}
              sizeClasses={
                overlay
                  ? "h-11 sm:h-12 md:h-[52px] xl:h-[96px]"
                  : "h-11 sm:h-12 md:h-[52px] xl:h-[88px]"
              }
            />
          </Link>

          {/* Desktop nav — hidden below lg, unchanged above it */}
          <nav className="hidden xl:flex flex-1 min-w-0 items-center gap-1 justify-end">
            {NAV.map((item, idx) => {
              return (
              <div
                key={item.label}
                className="relative shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                {item.items ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                      className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-3.5 rounded-full text-[12px] xl:text-[13px] font-semibold uppercase tracking-[.06em] whitespace-nowrap transition-all duration-300 ${
                        overlay ? "text-white hover:text-flame2" : "text-ink hover:text-flame1"
                      }`}
                    >
                      {item.label}
                      <IconChevron
                        className={`w-2.5 h-2.5 opacity-60 transition-transform duration-300 ${
                          openIdx === idx ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <span
                      className={`absolute left-3 right-3 bottom-2 h-[2px] bg-gradient-to-r from-flame1 to-gold origin-left transition-transform duration-300 ${
                        openIdx === idx ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                    <div
                      className={`absolute top-full ${
                        item.wide
                          ? `${idx >= 3 ? "right-0" : "left-1/2 -translate-x-1/2"} min-w-[640px] xl:min-w-[720px] grid grid-cols-2 lg:grid-cols-3 gap-1.5`
                          : idx >= 3
                          ? "right-0 min-w-[340px]"
                          : "left-1/2 -translate-x-1/2 min-w-[340px]"
                      } bg-white border border-ink/[.08] rounded-md shadow-[0_30px_60px_-20px_rgba(0,0,0,.15)] p-3 transition-all duration-300 ${
                        openIdx === idx ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-2"
                      }`}
                    >
                      {item.items.map((sub) => {
                        const SubIcon = sub.icon ? Icons[sub.icon] : null;
                        const content = (
                          <>
                            {SubIcon && (
                              <span className="nav-mega-icon w-9 h-9 text-flame1 mb-1.5 transition-colors duration-300">
                                <SubIcon className="w-full h-full" />
                              </span>
                            )}
                            <span className="nav-mega-title text-[13.5px] font-semibold uppercase tracking-wide text-ink transition-colors duration-300">
                              {sub.title}
                            </span>
                            <span className="nav-mega-desc text-[12px] leading-[1.5] text-inksoft transition-colors duration-300">
                              {sub.desc}
                            </span>
                            {sub.desc && (
                              <span className="nav-mega-learn mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-flame1 transition-colors duration-300">
                                {t("services.learnMore")} <IconArrow className="w-2.5 h-2.5" />
                              </span>
                            )}
                          </>
                        );
                        return sub.to ? (
                          <Link
                            key={sub.title}
                            to={sub.to}
                            onClick={() => setOpenIdx(null)}
                            className="nav-mega-card"
                          >
                            {content}
                          </Link>
                        ) : (
                          <a
                            key={sub.title}
                            href={sub.href}
                            onClick={() => setOpenIdx(null)}
                            className="nav-mega-card"
                          >
                            {content}
                          </a>
                        );
                      })}
                    </div>
                  </>
                ) : item.to ? (
                  <Link
                    to={item.to}
                    className={`relative flex items-center px-2.5 xl:px-3 py-3.5 text-[12px] xl:text-[13px] font-semibold uppercase tracking-[.06em] whitespace-nowrap transition-colors group ${
                      overlay ? "text-white hover:text-flame2" : "text-ink hover:text-flame1"
                    }`}
                  >
                    {item.label}
                    <span className="absolute left-3 right-3 bottom-2 h-[2px] bg-gradient-to-r from-flame1 to-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className={`relative flex items-center px-2.5 xl:px-3 py-3.5 text-[12px] xl:text-[13px] font-semibold uppercase tracking-[.06em] whitespace-nowrap transition-colors group ${
                      overlay ? "text-white hover:text-flame2" : "text-ink hover:text-flame1"
                    }`}
                  >
                    {item.label}
                    <span className="absolute left-3 right-3 bottom-2 h-[2px] bg-gradient-to-r from-flame1 to-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </a>
                )}
              </div>
            );})}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
            <Link
              to={session ? "/account" : "/account/sign-in"}
              className={`hidden sm:inline-flex items-center gap-1.5 rounded-full border px-3.5 xl:px-5 py-2.5 text-[12px] xl:text-[13px] font-semibold transition-all duration-300 ${
                overlay
                  ? "border-white/40 text-white hover:border-white hover:bg-white/10"
                  : "border-ink/[.16] text-ink hover:border-flame1 hover:text-flame1"
              }`}
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <path d="M10 17l5-5-5-5" />
                <path d="M15 12H3" />
              </svg>
              {session
                ? lang === "ar" ? "حسابي" : "My Account"
                : lang === "ar" ? "تسجيل الدخول" : "Sign In"}
            </Link>

            {/* Mobile hamburger — hidden at xl and above (mobile-menu-toggle is a hard CSS failsafe, see index.css) */}
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setDrawerOpen(true)}
              className="mobile-menu-toggle xl:hidden w-10 h-10 flex items-center justify-center flex-col gap-[5px] shrink-0"
            >
              <span className={`w-[22px] h-0.5 transition-colors ${overlay ? "bg-white" : "bg-ink"}`} />
              <span className={`w-[22px] h-0.5 transition-colors ${overlay ? "bg-white" : "bg-ink"}`} />
              <span className={`w-[22px] h-0.5 transition-colors ${overlay ? "bg-white" : "bg-ink"}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[300] bg-white overflow-y-auto transition-transform duration-400 xl:hidden ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-5 py-4 border-b border-ink/[.08]">
          <Logo size={48} />
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <button
              onClick={closeDrawer}
              aria-label="Close menu"
              className="w-10 h-10 flex items-center justify-center text-ink text-2xl leading-none"
            >
              &times;
            </button>
          </div>
        </div>

        <div className="px-3 pb-10 pt-2">
          {NAV.map((item, idx) => (
            <div key={item.label} className="border-b border-ink/[.08]">
              {item.items ? (
                <>
                  <button
                    type="button"
                    onClick={() => setDrawerGroup(drawerGroup === idx ? null : idx)}
                    className="w-full flex justify-between items-center px-2.5 py-4 text-ink text-[16px] font-semibold uppercase tracking-wide"
                  >
                    {item.label}
                    <IconChevron
                      className={`w-3 h-3 transition-transform duration-300 ${
                        drawerGroup === idx ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-[max-height] duration-400 ${
                      drawerGroup === idx ? "max-h-[600px]" : "max-h-0"
                    }`}
                  >
                    {item.items.map((sub) =>
                      sub.to ? (
                        <Link
                          key={sub.title}
                          to={sub.to}
                          onClick={closeDrawer}
                          className="block px-2.5 py-2.5 pl-5 text-[14px] text-inksoft border-l-2 border-ink/[.08] hover:text-flame1"
                        >
                          {sub.title}
                        </Link>
                      ) : (
                        <a
                          key={sub.title}
                          href={sub.href}
                          onClick={closeDrawer}
                          className="block px-2.5 py-2.5 pl-5 text-[14px] text-inksoft border-l-2 border-ink/[.08] hover:text-flame1"
                        >
                          {sub.title}
                        </a>
                      )
                    )}
                  </div>
                </>
              ) : item.to ? (
                <Link
                  to={item.to}
                  onClick={closeDrawer}
                  className="block px-2.5 py-4 text-ink text-[16px] font-semibold uppercase tracking-wide"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  onClick={closeDrawer}
                  className="block px-2.5 py-4 text-ink text-[16px] font-semibold uppercase tracking-wide"
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}

          <Link
            to={session ? "/account" : "/account/sign-in"}
            onClick={closeDrawer}
            className="mt-5 flex items-center justify-center gap-1.5 rounded-full border border-ink/[.16] text-ink px-5 py-3 text-[14px] font-semibold mx-2.5"
          >
            {session
              ? lang === "ar" ? "حسابي" : "My Account"
              : lang === "ar" ? "تسجيل الدخول" : "Sign In"}
          </Link>
        </div>
      </div>
    </>
  );
}