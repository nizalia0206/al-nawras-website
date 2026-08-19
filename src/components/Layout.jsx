import { Outlet, useLocation } from "react-router-dom";
import TopBar from "./TopBar";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div>
      {!isHome && <TopBar />}
      <Header overlayOnHero={isHome} />
      <Outlet />
      <Footer />
    </div>
  );
}
