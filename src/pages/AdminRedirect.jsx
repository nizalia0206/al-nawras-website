import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// The CMS lives on its own deployment. vercel.json already redirects /admin on the
// server; this covers in-app navigation to /admin so it never shows a blank page.
export const CMS_URL = "https://al-nawras-cms.vercel.app";

export default function AdminRedirect() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.location.replace(CMS_URL + pathname);
  }, [pathname]);
  return (
    <div style={{ padding: "120px 24px", textAlign: "center", fontFamily: "sans-serif" }}>
      Redirecting to the Al Nawras CMS… <a href={CMS_URL + "/admin"}>Continue</a>
    </div>
  );
}
