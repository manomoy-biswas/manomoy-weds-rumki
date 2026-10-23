import Reveal from "./common/Reveal";
import { useRevealOnce } from "./common/hooks";
import { C } from "./common/theme";

/* Heart outline normalized to a 0–1 objectBoundingBox so the clip scales with its element */
const HEART_D = "M0.5 0.88 C0.5 0.88 0.1 0.62 0.1 0.35 C0.1 0.2 0.22 0.1 0.35 0.1 C0.42 0.1 0.48 0.14 0.5 0.2 C0.52 0.14 0.58 0.1 0.65 0.1 C0.78 0.1 0.9 0.2 0.9 0.35 C0.9 0.62 0.5 0.88 0.5 0.88 Z";

/* ---------- Heart-shaped reveal (save the date): the gold cover melts away once the hearts scroll into view ---------- */
function HeartReveal({ label, value, revealed, delay }) {
  return (
    <div className="relative w-24 sm:w-32 md:w-40" style={{ aspectRatio: "208 / 188", clipPath: "url(#heart-clip)", background: C.ivory }}>
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "scale(1)" : "scale(0.8)",
        transition: `opacity 0.8s ease ${delay + 0.5}s, transform 0.8s cubic-bezier(.2,.7,.2,1) ${delay + 0.5}s`,
      }}>
        <span className="text-xs sm:text-sm uppercase tracking-wide" style={{ color: C.maroonDeep }}>{label}</span>
        <span className="text-lg sm:text-2xl" style={{ color: C.maroonDeep, fontFamily: "Marcellus, serif" }}>{value}</span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{
        background: `linear-gradient(135deg, ${C.goldLight}, ${C.gold}, ${C.goldLight})`,
        opacity: revealed ? 0 : 1,
        transform: revealed ? "scale(1.4)" : "scale(1)",
        transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
      }}>
        <span className="text-2xl" style={{ color: C.maroonDeep }}>✦</span>
      </div>
    </div>
  );
}

/* ---------- Save the Date section ---------- */
export default function DateReveal() {
  const [heartsRef, revealed] = useRevealOnce(0.6);
  return (
    <section
      className="relative pt-6 sm:pt-8 md:pt-10 pb-14 sm:pb-16 md:pb-20 px-6 text-center overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${C.maroon} 0%, ${C.maroonDeep} 55%, ${C.maroon} 85%, ${C.goldPale} 100%)` }}
    >
      {/* shared heart clip path, referenced (not rendered) by each HeartReveal card */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="heart-clip" clipPathUnits="objectBoundingBox">
            <path d={HEART_D} />
          </clipPath>
        </defs>
      </svg>

      <div className="relative z-10 max-w-2xl mx-auto">
        <Reveal><p className="text-lg tracking-[0.25em] uppercase mb-1" style={{ color: C.gold }}><b>Save the Date</b></p></Reveal>
        <Reveal delay={0.1}><p className="text-2xl sm:text-3xl mb-7 sm:mb-10" style={{ color: C.ivory }}>Scroll on — the hearts hold the day</p></Reveal>
        <div ref={heartsRef} className="flex justify-center gap-5 sm:gap-8 md:gap-12 flex-wrap">
          <Reveal delay={0.15}><HeartReveal label="Day" value="25" revealed={revealed} delay={0.3} /></Reveal>
          <Reveal delay={0.22}><HeartReveal label="Month" value="Nov" revealed={revealed} delay={0.8} /></Reveal>
          <Reveal delay={0.29}><HeartReveal label="Year" value="2026" revealed={revealed} delay={1.3} /></Reveal>
        </div>
      </div>
    </section>
  );
}
