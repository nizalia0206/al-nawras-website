import { useRef, useState, useEffect } from "react";
import { ASK_AI_FAQS } from "../data/askAiFaqs";

function SparkleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 2.5c.5 3.2 1.1 5 2.3 6.2 1.2 1.2 3 1.8 6.2 2.3-3.2.5-5 1.1-6.2 2.3-1.2 1.2-1.8 3-2.3 6.2-.5-3.2-1.1-5-2.3-6.2-1.2-1.2-3-1.8-6.2-2.3 3.2-.5 5-1.1 6.2-2.3C10.9 7.5 11.5 5.7 12 2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function AskAI() {
  const [open, setOpen] = useState(false);
  const [thread, setThread] = useState([]); // { q, a, thinking }
  const [askedIdx, setAskedIdx] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [thread]);

  function askQuestion(faq, idx) {
    if (askedIdx.includes(idx)) return;
    setAskedIdx((prev) => [...prev, idx]);
    setThread((prev) => [...prev, { q: faq.q, a: null }]);

    // brief simulated "thinking" delay before revealing the canned answer
    window.setTimeout(() => {
      setThread((prev) =>
        prev.map((item, i) => (i === prev.length - 1 ? { ...item, a: faq.a } : item))
      );
    }, 550);
  }

  function resetThread() {
    setThread([]);
    setAskedIdx([]);
  }

  const remainingFaqs = ASK_AI_FAQS.map((f, i) => ({ ...f, i })).filter((f) => !askedIdx.includes(f.i));

  return (
    <>
      {/* Launcher */}
      <div
        className="fixed z-40"
        style={{ left: "24px", bottom: "24px" }}
      >
        {!open && (
          <>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full bg-aiBlue1/70"
              style={{ animation: "askaiRing 2.2s ease-out infinite" }}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full bg-aiBlue2/60"
              style={{ animation: "askaiRing 2.2s ease-out infinite", animationDelay: "0.7s" }}
            />
          </>
        )}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close Ask AI" : "Ask AI a question"}
          className="relative flex items-center gap-2 rounded-full bg-gradient-to-br from-aiBlue1 to-aiBlue2 text-white pl-3.5 pr-4 py-3 font-body text-[13.5px] font-semibold tracking-wide"
          style={{ animation: "askaiGlowShift 2.6s ease-in-out infinite" }}
        >
          <SparkleIcon width="18" height="18" />
          Ask AI
        </button>
      </div>

      {/* Panel */}
      {open && (
        <div
          className="fixed z-40 flex flex-col rounded-2xl bg-white shadow-[0_24px_60px_-16px_rgba(12,28,61,0.45)] border border-black/[.06] overflow-hidden"
          style={{
            left: "24px",
            bottom: "88px",
            width: "min(360px, 88vw)",
            maxHeight: "min(480px, 65vh)",
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-2.5 bg-navy px-4 py-3.5 text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-aiBlue1 to-aiBlue2">
              <SparkleIcon width="16" height="16" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-display text-[13.5px] tracking-wide leading-tight">Ask Al Nawras</p>
              <p className="text-[11px] text-steellight/80 leading-tight">Instant answers, no waiting</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="text-steellight/70 hover:text-white text-lg leading-none px-1"
            >
              ✕
            </button>
          </div>

          {/* Thread */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3.5 space-y-3.5 bg-paper">
            {thread.length === 0 && (
              <p className="text-[12.5px] text-inksoft leading-relaxed">
                Tap a question below to get an instant answer about our systems, brands, coverage or how to reach us.
              </p>
            )}
            {thread.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-navy text-white text-[12.5px] px-3 py-2 leading-snug">
                  {item.q}
                </div>
                <div className="mr-auto max-w-[90%] rounded-xl rounded-tl-sm bg-white border border-black/[.06] text-ink text-[12.5px] px-3 py-2 leading-relaxed">
                  {item.a ? (
                    item.a
                  ) : (
                    <span className="inline-flex gap-1 py-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-aiBlue1/70 animate-bounce [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-aiBlue1/70 animate-bounce [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-aiBlue1/70 animate-bounce" />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Question chips */}
          <div className="border-t border-black/[.06] bg-white px-3.5 py-3 space-y-2">
            {remainingFaqs.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 max-h-[104px] overflow-y-auto">
                {remainingFaqs.map((f) => (
                  <button
                    key={f.i}
                    onClick={() => askQuestion(f, f.i)}
                    className="rounded-full border border-aiBlue1/30 bg-aiBlue1/[.06] text-aiBlue1 text-[11.5px] font-medium px-3 py-1.5 hover:bg-aiBlue1/[.12] transition-colors text-left"
                  >
                    {f.q}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11.5px] text-inksoft">That's everything I know — for anything else, WhatsApp us.</p>
                <button
                  onClick={resetThread}
                  className="shrink-0 text-[11.5px] font-semibold text-aiBlue1 hover:underline"
                >
                  Reset
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
