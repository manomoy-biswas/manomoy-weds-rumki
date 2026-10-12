import { useRef, useState, useEffect } from "react";
import Reveal from "./common/Reveal";
import { C } from "./common/theme";

/* Heart outline normalized to a 0–1 objectBoundingBox so the clip scales with its element */
const HEART_D = "M0.5 0.88 C0.5 0.88 0.1 0.62 0.1 0.35 C0.1 0.2 0.22 0.1 0.35 0.1 C0.42 0.1 0.48 0.14 0.5 0.2 C0.52 0.14 0.58 0.1 0.65 0.1 C0.78 0.1 0.9 0.2 0.9 0.35 C0.9 0.62 0.5 0.88 0.5 0.88 Z";

/* Canvas is drawn at a fixed internal resolution for crisp scratching; the
   element itself is sized responsively by its parent via CSS, so pointer
   coordinates are rescaled from rendered size to canvas resolution. */
const CANVAS_W = 208, CANVAS_H = 188;

/* ---------- Heart-shaped scratch reveal (save the date) ---------- */
function HeartScratch({ label, value }) {
  const canvasRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const drawing = useRef(false);
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const grad = ctx.createLinearGradient(0, 0, CANVAS_W, CANVAS_H);
    grad.addColorStop(0, C.goldLight); grad.addColorStop(0.5, C.gold); grad.addColorStop(1, C.goldLight);
    ctx.fillStyle = grad; ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.fillStyle = C.maroonDeep; ctx.font = "600 30px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("Scratch", CANVAS_W / 2, CANVAS_H / 2);
  }, []);
  const erase = (x, y) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath(); ctx.arc(x, y, CANVAS_W * 0.15, 0, Math.PI * 2); ctx.fill();
    try {
      const data = ctx.getImageData(0, 0, CANVAS_W, CANVAS_H).data;
      let t = 0;
      for (let i = 3; i < data.length; i += 20) if (data[i] === 0) t++;
      if (t / (data.length / 20) > 0.4) setRevealed(true);
    } catch (e) {}
  };
  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const p = e.touches ? e.touches[0] : e;
    return { x: (p.clientX - rect.left) * (CANVAS_W / rect.width), y: (p.clientY - rect.top) * (CANVAS_H / rect.height) };
  };
  return (
    <div className="relative w-24 sm:w-32 md:w-40" style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}`, clipPath: "url(#heart-clip)", background: C.ivory }}>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs sm:text-sm uppercase tracking-wide" style={{ color: C.maroonDeep }}>{label}</span>
        <span className="text-lg sm:text-2xl" style={{ color: C.maroonDeep, fontFamily: "Marcellus, serif" }}>{value}</span>
      </div>
      {!revealed && (
        <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H} className="absolute inset-0 w-full h-full cursor-pointer touch-none"
          onMouseDown={(e) => { drawing.current = true; const { x, y } = getPos(e); erase(x, y); }}
          onMouseMove={(e) => { if (drawing.current) { const { x, y } = getPos(e); erase(x, y); } }}
          onMouseUp={() => (drawing.current = false)} onMouseLeave={() => (drawing.current = false)}
          onTouchStart={(e) => { drawing.current = true; const { x, y } = getPos(e); erase(x, y); }}
          onTouchMove={(e) => { if (drawing.current) { const { x, y } = getPos(e); erase(x, y); } }}
          onTouchEnd={() => (drawing.current = false)} />
      )}
    </div>
  );
}

/* ---------- Save the Date section ---------- */
export default function DateReveal() {
  return (
    <section
      className="relative pt-6 sm:pt-8 md:pt-10 pb-14 sm:pb-16 md:pb-20 px-6 text-center overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${C.maroon} 0%, ${C.maroonDeep} 55%, ${C.maroon} 85%, ${C.goldPale} 100%)` }}
    >
      {/* shared heart clip path, referenced (not rendered) by each HeartScratch card */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="heart-clip" clipPathUnits="objectBoundingBox">
            <path d={HEART_D} />
          </clipPath>
        </defs>
      </svg>

      <div className="relative z-10 max-w-2xl mx-auto">
        <Reveal><p className="text-lg tracking-[0.25em] uppercase mb-1" style={{ color: C.gold }}><b>Save the Date</b></p></Reveal>
        <Reveal delay={0.1}><p className="text-2xl sm:text-3xl mb-7 sm:mb-10" style={{ color: C.ivory }}>Scratch the hearts to reveal</p></Reveal>
        <div className="flex justify-center gap-5 sm:gap-8 md:gap-12 flex-wrap">
          <Reveal delay={0.15}><HeartScratch label="Day" value="25" /></Reveal>
          <Reveal delay={0.22}><HeartScratch label="Month" value="Nov" /></Reveal>
          <Reveal delay={0.29}><HeartScratch label="Year" value="2026" /></Reveal>
        </div>
      </div>
    </section>
  );
}
