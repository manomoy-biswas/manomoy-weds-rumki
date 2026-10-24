import { useMemo } from "react";
import { C, IMG_DAMASK } from "./common/theme";

/* ---------- Envelope intro overlay: real flap-open animation, bounce, light, glitter ---------- */
export default function EnvelopeOverlay({ phase, onOpen }) {
  const opening = phase === "opening";
  const done = phase === "open";
  const active = opening || done;
  const sparkles = useMemo(() => Array.from({ length: 14 }).map(() => ({ top: Math.random() * 100, left: Math.random() * 100, delay: Math.random() * 2 })), []);
  return (
    <div
      onClick={phase === "closed" ? onOpen : undefined}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center px-6 text-center overflow-hidden ${phase === "closed" ? "cursor-pointer" : ""}`}
      style={{
        background: `radial-gradient(circle at 50% 38%, ${C.maroon}, ${C.maroonDeep}), url(${IMG_DAMASK})`,
        backgroundBlendMode: "multiply",
        backgroundSize: "cover, cover",
        backgroundPosition: "center, center",
        backgroundRepeat: "no-repeat, no-repeat",
        opacity: done ? 0 : 1,
        transform: done ? "scale(1.15)" : "scale(1)",
        pointerEvents: done ? "none" : "auto",
        transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
      }}
    >
      {sparkles.map((s, i) => (
        <span key={i} className="absolute rounded-full" style={{ top: `${s.top}%`, left: `${s.left}%`, width: 3, height: 3, background: C.goldLight, animation: `twinkle 2.6s ease-in-out ${s.delay}s infinite` }} />
      ))}

      <div className="relative flex items-center justify-center mb-6" style={{ perspective: 700 }}>
        <div className="absolute rounded-full" style={{ width: 240, height: 240, background: `radial-gradient(circle, ${C.goldLight}, transparent 70%)`, animation: opening ? "lightBurst 1.1s ease-out forwards" : "none", opacity: 0 }} />

        <div className="relative" style={{ width: 220, height: 150, animation: opening ? "envelopeBounce 0.9s ease" : "none" }}>
          {/* envelope back pocket */}
          <div className="absolute inset-0 rounded-md" style={{ background: C.goldPale, border: `1.5px solid ${C.gold}` }} />

          {/* left & right side folds, completing the classic 4-flap envelope shape */}
          <div className="absolute inset-0" style={{ clipPath: "polygon(0% 0%, 0% 100%, 48% 50%)", background: `linear-gradient(135deg, ${C.gold}55, transparent 80%)`, zIndex: 1 }} />
          <div className="absolute inset-0" style={{ clipPath: "polygon(100% 0%, 100% 100%, 52% 50%)", background: `linear-gradient(225deg, ${C.gold}55, transparent 80%)`, zIndex: 1 }} />

          {/* letter card sliding up from inside */}
          <div className="absolute left-1/2 rounded-sm flex items-center justify-center" style={{
            width: 168, height: 104, background: C.ivory, border: `1px solid ${C.gold}`,
            transform: "translateX(-50%)",
            bottom: active ? 78 : 14,
            transition: "bottom 1s cubic-bezier(.2,.8,.3,1) 0.45s",
            zIndex: 2, boxShadow: `0 10px 22px -8px ${C.maroonDeep}`,
          }}>
            <span style={{ color: C.maroonDeep, fontFamily: "'Cormorant Garamond', serif", fontSize: 20 }}>M &amp; R</span>
          </div>

          {/* bottom pocket triangle (in front of letter until flap opens) */}
          <div className="absolute bottom-0 left-0 w-full" style={{ height: 78, background: C.maroon, clipPath: "polygon(0% 100%, 100% 100%, 50% 15%)", zIndex: active ? 1 : 3 }} />

          {/* flap - rotates open like a real envelope; once it's rotated past edge-on it
              recedes behind the letter/pocket instead of always painting on top */}
          <div className="absolute top-0 left-0 w-full origin-top" style={{
            height: 78, background: `linear-gradient(160deg, ${C.gold}, ${C.goldLight})`,
            clipPath: "polygon(0% 0%, 100% 0%, 50% 92%)",
            transform: active ? "rotateX(178deg)" : "rotateX(0deg)",
            transformStyle: "preserve-3d",
            transition: "transform 0.85s cubic-bezier(.3,.7,.3,1), z-index 0s linear 0.4s",
            zIndex: active ? 0 : 4,
            boxShadow: `0 2px 6px ${C.maroonDeep}55`,
          }} />

          {/* wax seal on flap tip */}
          <div className="absolute rounded-full flex items-center justify-center" style={{
            width: 60, height: 60, left: "50%", top: 48, transform: `translateX(-50%) scale(${active ? 0 : 1})`,
            background: C.maroon, border: `1.5px solid ${C.goldLight}`, transition: "transform 0.4s ease", zIndex: 5,
          }}>
            <span style={{ color: C.goldLight, fontFamily: "'Cormorant Garamond', serif", fontSize: 20 }}>M&amp;R</span>
          </div>
        </div>
      </div>

      <p className="text-base tracking-[0.3em] uppercase" style={{ color: C.gold }}>{active ? "Opening..." : "Tap to Open"}</p>
      <p className="text-xl mt-2" style={{ color: `${C.ivory}99` }}><b>Manomoy &amp; Rumki's Wedding Invitation</b></p>
    </div>
  );
}
