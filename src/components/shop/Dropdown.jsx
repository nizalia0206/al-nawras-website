import { useState, useRef, useEffect } from "react";
import { Icon } from "./Icons.jsx";

/**
 * Fully custom animated dropdown — replaces native <select> so the
 * open menu can actually be styled/branded instead of falling back
 * to the OS's plain list.
 *
 * options: [{ value, label }]
 */
export default function Dropdown({ label, value, options, onChange, align = "left" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const current = options.find((o) => o.value === value) || options[0];

  return (
    <div className={`cdd ${open ? "cdd-open" : ""}`} ref={ref}>
      <button type="button" className="cdd-trigger" onClick={() => setOpen((o) => !o)}>
        {label ? <span className="cdd-label">{label}:</span> : null}
        <span className="cdd-value">{current?.label}</span>
        <Icon.chevronDown className="cdd-caret" />
      </button>
      <div className={`cdd-menu cdd-align-${align}`} role="listbox">
        {options.map((o) => (
          <button
            type="button"
            key={o.value}
            className={`cdd-option ${o.value === value ? "selected" : ""}`}
            onClick={() => { onChange(o.value); setOpen(false); }}
          >
            <span>{o.label}</span>
            {o.value === value && <Icon.check className="cdd-check" />}
          </button>
        ))}
      </div>
    </div>
  );
}
