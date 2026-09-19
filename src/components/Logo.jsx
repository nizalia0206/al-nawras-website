import logoFull from "../assets/brand/logo-full.png";
import logoMark from "../assets/brand/logo-mark.png";

/**
 * size = rendered height in px. Width follows the artwork's own aspect ratio.
 * showText=false renders just the flame "N/S" mark (used as the large Hero watermark);
 * showText=true (default) renders the full lockup — mark + wordmark + tagline.
 *
 * light = the logo sits over the hero/loading-screen background (sky blue,
 * not dark) with no plate behind it. The black lettering stays as-is — it
 * reads fine there — just with a soft light halo behind it for extra lift.
 */
export default function Logo({ size = 48, showText = true, light = false, className = "", responsive = false, sizeClasses = null }) {
  // When responsive, the logo scales down fluidly below `size` on narrow
  // viewports instead of forcing a fixed pixel height that can crowd the
  // header on mobile.
  // When `sizeClasses` is provided (Tailwind responsive height utilities), it takes
  // over sizing completely — this is what keeps the logo from ever growing taller
  // than the header row at a given breakpoint (which was causing it to spill over
  // and visually "merge" into whatever section sits below the nav bar).
  const style = sizeClasses ? undefined : { height: responsive ? `clamp(40px, 9vw, ${size}px)` : size, width: "auto" };
  const sizingClasses = sizeClasses ? `${sizeClasses} w-auto` : "";
  const shadow = light ? "drop-shadow-[0_2px_8px_rgba(255,255,255,.55)]" : "";

  if (!showText) {
    return (
      <img
        src={logoMark}
        alt="Al Nawras"
        style={style}
        className={`shrink-0 object-contain ${sizingClasses} ${light ? "drop-shadow-[0_4px_16px_rgba(0,0,0,.35)]" : ""} ${className}`}
      />
    );
  }

  return (
    <img
      src={logoFull}
      alt="Al Nawras Safety & Security Systems LLC"
      style={style}
      className={`block shrink-0 object-contain ${sizingClasses} ${shadow} ${className}`}
    />
  );
}
