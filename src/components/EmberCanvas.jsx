import { useEffect, useRef } from "react";

export default function EmberCanvas({ boost = false, className = "absolute inset-0 w-full h-full z-[1]" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H, particles = [];
    let rafId;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    function makeParticle() {
      return {
        x: Math.random() * W,
        y: H + 20 + Math.random() * 80,
        r: Math.random() * (boost ? 1.6 : 1.1) + (boost ? 1.6 : 1.0),
        vy: Math.random() * (boost ? 0.55 : 0.4) + (boost ? 0.75 : 0.5),
        vx: (Math.random() - 0.5) * 0.35,
        life: 0,
        maxLife: Math.random() * 140 + 220,
        hue: Math.random() > 0.5 ? 24 : 34,
        flicker: Math.random() * Math.PI * 2,
      };
    }

    const base = window.innerWidth < 700 ? 32 : 60;
    const count = boost ? Math.round(base * 1.3) : base;
    for (let i = 0; i < count; i++) {
      const p = makeParticle();
      p.y = Math.random() * H;
      particles.push(p);
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.life++;
        p.y -= p.vy;
        p.x += p.vx + Math.sin(p.flicker + p.life * 0.02) * 0.22;
        p.flicker += 0.02;
        const lifeRatio = p.life / p.maxLife;
        const alpha = lifeRatio < 0.15 ? lifeRatio / 0.15 : Math.max(0, 1 - (lifeRatio - 0.15) / 0.85);
        const glowAlpha = (boost ? alpha : alpha * 0.9) * 0.68;
        const coreAlpha = (boost ? Math.min(1, alpha * 1.05) : alpha) * 0.78;

        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * (boost ? 4.4 : 3.6));
        grad.addColorStop(0, `hsla(${p.hue},95%,64%,${glowAlpha})`);
        grad.addColorStop(1, `hsla(${p.hue},95%,54%,0)`);
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.r * (boost ? 4.4 : 3.6), 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue + 8},95%,72%,${coreAlpha})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        if (p.life > p.maxLife || p.y < -20) {
          Object.assign(p, makeParticle());
        }
      });
      if (!reduceMotion) rafId = requestAnimationFrame(draw);
    }

    if (!reduceMotion) {
      rafId = requestAnimationFrame(draw);
    } else {
      draw();
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [boost]);

  return <canvas ref={canvasRef} className={className} />;
}
