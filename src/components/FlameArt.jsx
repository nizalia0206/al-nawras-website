// Large decorative flame illustration for the Hero brand-intro slide.
// Organic, asymmetric silhouette (not a symmetric icon) — three layered
// tongues of flame that lean and flicker independently for a realistic feel.
// `flip` mirrors the whole mark so it can flank both sides of the headline,
// each leaning outward away from the center like it's caught in a draft.
export default function FlameArt({ flip = false, className = "" }) {
  return (
    <svg
      viewBox="0 0 140 260"
      className={`flame-art ${flip ? "flame-art--flip" : ""} ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`flameBack${flip ? "R" : "L"}`} x1="0%" y1="100%" x2="30%" y2="0%">
          <stop offset="0%" stopColor="#c8501c" stopOpacity=".85" />
          <stop offset="55%" stopColor="#ee6c2f" stopOpacity=".55" />
          <stop offset="100%" stopColor="#f7941d" stopOpacity=".1" />
        </linearGradient>
        <linearGradient id={`flameMid${flip ? "R" : "L"}`} x1="10%" y1="100%" x2="55%" y2="0%">
          <stop offset="0%" stopColor="#ee6c2f" stopOpacity=".95" />
          <stop offset="50%" stopColor="#f28a45" stopOpacity=".8" />
          <stop offset="100%" stopColor="#f7941d" stopOpacity=".25" />
        </linearGradient>
        <linearGradient id={`flameTip${flip ? "R" : "L"}`} x1="20%" y1="100%" x2="70%" y2="0%">
          <stop offset="0%" stopColor="#f7941d" stopOpacity=".95" />
          <stop offset="45%" stopColor="#ffcf7a" stopOpacity=".85" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity=".55" />
        </linearGradient>
      </defs>

      {/* back tongue — widest, deepest colour, tallest */}
      <path
        className="flame-layer flame-layer--back"
        d="M62,252 C24,236 4,196 16,156 C24,130 10,110 20,82 C10,86 6,58 24,38
           C16,26 22,4 44,10 C40,-6 62,-8 68,10 C78,-2 96,6 92,26
           C110,18 120,42 104,58 C122,54 128,84 108,98
           C126,100 124,132 100,142 C114,150 106,180 78,190
           C92,196 84,224 58,232 C70,238 66,248 62,252 Z"
        fill={`url(#flameBack${flip ? "R" : "L"})`}
      />
      {/* mid tongue — leans further out, brighter */}
      <path
        className="flame-layer flame-layer--mid"
        d="M58,250 C30,232 18,198 28,166 C34,144 22,128 32,104
           C22,104 22,80 38,64 C30,52 40,32 58,36
           C56,20 76,14 82,30 C94,20 108,32 100,48
           C116,44 122,68 106,80 C120,80 120,106 100,114
           C112,120 106,146 84,152 C96,158 88,182 66,188
           C78,194 72,214 52,220 C64,226 62,240 58,250 Z"
        fill={`url(#flameMid${flip ? "R" : "L"})`}
      />
      {/* front tip — narrowest, brightest, curls at the top */}
      <path
        className="flame-layer flame-layer--tip"
        d="M56,246 C38,228 32,202 40,178 C44,160 36,148 44,130
           C36,128 38,108 50,96 C44,86 52,70 64,74
           C64,60 80,56 84,70 C94,62 104,72 98,84
           C110,82 114,100 102,108 C112,110 110,130 94,136
           C104,142 98,160 80,166 C90,172 84,190 68,196
           C78,202 74,216 58,222 C68,228 62,240 56,246 Z"
        fill={`url(#flameTip${flip ? "R" : "L"})`}
      />
    </svg>
  );
}
