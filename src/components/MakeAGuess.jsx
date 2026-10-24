import { useState } from "react";
import Reveal from "./common/Reveal";
import { C, IMG_CHIBI_PORTRAIT, IMG_CHIBI_FIRE } from "./common/theme";

/* ---------- Guess flip card ---------- */
function GuessCard({ question }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div onClick={() => setFlipped((f) => !f)} className="cursor-pointer rounded-lg p-4 text-center flex flex-col items-center justify-center" style={{ background: C.maroonDeep, border: `1px solid ${C.gold}55`, minHeight: 110 }}>
      {!flipped ? (
        <><p className="text-2xl mb-2" style={{ color: C.gold, fontFamily: "Marcellus, serif" }}>M or R?</p><p className="text-xl" style={{ color: `${C.ivory}CC` }}>{question}</p></>
      ) : (<p className="text-xl italic" style={{ color: C.goldLight }}>Ask us at the wedding 😉</p>)}
    </div>
  );
}

/* ---------- Make a Guess section ---------- */
export default function MakeAGuess() {
  return (
    <section className="px-6 py-16" style={{ background: `linear-gradient(180deg, ${C.goldPale} 0%, ${C.ivory} 20%, ${C.ivory} 80%, ${C.goldPale} 100%)` }}>
      <div className="max-w-2xl mx-auto text-center">
        <Reveal>
          <div className="flex justify-center gap-3 mb-2">
            <img src={IMG_CHIBI_PORTRAIT} alt="" className="w-14 h-14 rounded-full object-cover" style={{ border: `2px solid ${C.gold}` }} />
            <img src={IMG_CHIBI_FIRE} alt="" className="w-14 h-14 rounded-full object-cover" style={{ border: `2px solid ${C.gold}` }} />
          </div>
          <h2 className="text-3xl mb-1" style={{ color: C.maroonDeep }}>Make a Guess</h2>
        </Reveal>
        <Reveal delay={0.1}><p className="text-base mb-8" style={{ color: `${C.brown}99` }}>Tap a card and take a guess</p></Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Reveal delay={0.15}><GuessCard question="Who fell in love first?" /></Reveal>
          <Reveal delay={0.25}><GuessCard question="Who takes longer to get ready?" /></Reveal>
          <Reveal delay={0.35}><GuessCard question="Who will cry more at the mandap?" /></Reveal>
        </div>
      </div>
    </section>
  );
}
