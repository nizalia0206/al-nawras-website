import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import TopBar from "./TopBar";
import Header from "./Header";
import Footer from "./Footer";
import AskAI from "./AskAI";
import WhatsAppButton from "./WhatsAppButton";
import FreeConsultationTab from "./FreeConsultationTab";

export default function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  // Always land at the top of the new page — covers footer links and
  // header dropdown navigation, which previously kept the old scroll position.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
      {!isHome && <TopBar />}
      <Header overlayOnHero={isHome} />
      <Outlet />
      <Footer />
      <FreeConsultationTab />
      <AskAI />
      <WhatsAppButton />
    </div>
  );
}
