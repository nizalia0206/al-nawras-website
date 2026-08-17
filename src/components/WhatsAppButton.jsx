import { useState } from "react";

const WHATSAPP_NUMBER = "971551099885"; // Al Nawras Head Office mobile (Sharjah)
const DEFAULT_MESSAGE = "Hi Al Nawras, I'd like to enquire about your fire & life safety systems.";

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Chat with Al Nawras on WhatsApp"
      className="fixed z-40 flex items-center gap-2 rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.65)] transition-all duration-300 hover:shadow-[0_14px_36px_-6px_rgba(37,211,102,0.8)] hover:scale-105"
      style={{ right: "24px", bottom: "24px", padding: hovered ? "12px 18px 12px 14px" : "14px" }}
    >
      <svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor" aria-hidden="true">
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.34.663 4.523 1.812 6.38L4 29l7.85-1.77A11.9 11.9 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.7c-1.99 0-3.85-.55-5.44-1.51l-.39-.23-4.66 1.05 1.08-4.53-.25-.41A9.63 9.63 0 0 1 6.3 15c0-5.35 4.36-9.7 9.704-9.7 5.345 0 9.696 4.35 9.696 9.7 0 5.35-4.35 9.7-9.696 9.7Zm5.32-7.26c-.29-.145-1.71-.845-1.976-.94-.266-.096-.46-.145-.653.145-.194.29-.75.94-.92 1.135-.17.194-.34.218-.63.073-.29-.145-1.224-.451-2.332-1.437-.862-.769-1.444-1.719-1.613-2.009-.17-.29-.018-.447.127-.591.13-.13.29-.34.435-.51.145-.17.194-.29.29-.483.096-.194.048-.363-.024-.508-.073-.145-.653-1.574-.895-2.156-.236-.567-.476-.49-.653-.5-.169-.008-.363-.01-.556-.01a1.07 1.07 0 0 0-.774.362c-.266.29-1.016.993-1.016 2.422 0 1.43 1.04 2.81 1.185 3.005.145.194 2.048 3.128 4.964 4.386.694.3 1.235.48 1.657.614.696.221 1.33.19 1.83.115.558-.083 1.71-.7 1.951-1.375.242-.676.242-1.255.17-1.375-.073-.121-.266-.194-.556-.34Z" />
      </svg>
      <span
        className="whitespace-nowrap font-body text-[13.5px] font-semibold overflow-hidden transition-all duration-300"
        style={{ maxWidth: hovered ? "160px" : "0px", opacity: hovered ? 1 : 0 }}
      >
        Chat on WhatsApp
      </span>
    </a>
  );
}
