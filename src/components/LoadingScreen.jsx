import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 700);
    const removeTimer = setTimeout(() => setVisible(false), 1050);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-bgdark transition-opacity duration-300 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-5">
        <Logo size={96} light />
        <span className="w-8 h-8 rounded-full border-2 border-white/25 border-t-white animate-spin" />
      </div>
    </div>
  );
}
