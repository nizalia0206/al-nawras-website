import logoFull from "../assets/brand/logo-full.png";
import logoMark from "../assets/brand/logo-mark.png";

/**
 * size = rendered height in px. Width follows the artwork's own aspect ratio.
 * showText=false renders just the flame "N/S" mark (used as the large Hero watermark);
 * showText=true (default) renders the full lockup — mark + wordmark + tagline.
 */
export default function Logo({ size = 48, showText = true, light = false, className = "", responsive = false }) {
  // When responsive, the logo scales down fluidly below `size` on narrow
  // viewports instead of forcing a fixed pixel height that can crowd the
  // header on mobile.
  const height = responsive ? `clamp(40px, 9vw, ${size}px)` : size;

  if (!showText) {
    return (
      <img
        src={logoMark}
        alt="Al Nawras"
        style={{ height, width: "auto" }}
        className={`shrink-0 object-contain ${light ? "drop-shadow-[0_4px_16px_rgba(0,0,0,.35)]" : ""} ${className}`}
      />
    );
  }

  return (
    <img
      src={logoFull}
      alt="Al Nawras Safety & Security Systems LLC"
      style={{ height, width: "auto" }}
      className={`shrink-0 object-contain ${light ? "drop-shadow-[0_4px_16px_rgba(0,0,0,.35)]" : ""} ${className}`}
    />
  );
}