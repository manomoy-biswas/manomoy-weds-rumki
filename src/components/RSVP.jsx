import { useState } from "react";
import { Send } from "lucide-react";
import Reveal from "./common/Reveal";
import FoilFrame from "./common/FoilFrame";
import { C, IMG_DAMASK } from "./common/theme";

const moodOptions = ["The Food 🍛", "Dance Floor 💃", "The Rituals 🪔", "All of it ✨"];

/* ---------- RSVP section ---------- */
export default function RSVP() {
  const [name, setName] = useState("");
  const [count, setCount] = useState("");
  const [moods, setMoods] = useState([]);
  const [sent, setSent] = useState(false);

  const toggleMood = (m) => setMoods((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]));

  const handleRSVP = () => {
    if (!name.trim() || !count) return;
    const moodText = moods.length ? `%0AMost excited for: ${encodeURIComponent(moods.join(", "))}` : "";
    const msg = `Wedding RSVP%0AName: ${encodeURIComponent(name)}%0AGuests attending Reception: ${encodeURIComponent(count)}${moodText}`;
    window.open(`https://wa.me/918348682398?text=${msg}`, "_blank");
    setSent(true);
  };

  return (
    <section className="px-6 py-16" style={{ background: `linear-gradient(180deg, ${C.goldPale} 0%, ${C.ivory} 20%, ${C.ivory} 80%, ${C.goldPale} 100%)` }}>
      <div className="max-w-md mx-auto text-center">
        <Reveal>
          <h2 className="text-3xl mb-1" style={{ color: C.maroonDeep }}>RSVP</h2>
          <p className="text-lg mb-8" style={{ color: `${C.brown}99` }}>Kindly confirm your presence for the Reception</p>
        </Reveal>
        <Reveal delay={0.1}>
          <FoilFrame>
            <div className="rounded-xl p-6 text-left" style={{ background: `linear-gradient(160deg, ${C.maroonDeep}, ${C.maroon}), url(${IMG_DAMASK})`, backgroundBlendMode: "multiply", backgroundSize: "cover" }}>
              <label className="text-sm uppercase tracking-wider" style={{ color: C.gold }}>Your name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter full name" className="w-full mt-1 mb-4 px-3 py-2 rounded-md outline-none text-base" style={{ background: C.ivory, color: C.brown }} />
              <label className="text-sm uppercase tracking-wider" style={{ color: C.gold }}>Guests attending reception</label>
              <input type="number" min="1" value={count} onChange={(e) => setCount(e.target.value)} placeholder="Number of persons" className="w-full mt-1 mb-4 px-3 py-2 rounded-md outline-none text-base" style={{ background: C.ivory, color: C.brown }} />
              <label className="text-sm uppercase tracking-wider" style={{ color: C.gold }}>Most excited for</label>
              <div className="flex flex-wrap gap-2 mt-2 mb-5">
                {moodOptions.map((m) => (
                  <button key={m} type="button" onClick={() => toggleMood(m)} className="text-sm px-3 py-1.5 rounded-full border transition-colors" style={{ borderColor: C.gold, background: moods.includes(m) ? C.gold : "transparent", color: moods.includes(m) ? C.maroonDeep : C.goldPale }}>
                    {m}
                  </button>
                ))}
              </div>
              <button onClick={handleRSVP} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-base font-medium" style={{ background: C.gold, color: C.maroonDeep }}>
                <Send size={15} /> Send RSVP via WhatsApp
              </button>
              {sent && <p className="text-sm mt-3 text-center" style={{ color: C.goldLight }}>Opening WhatsApp — please tap send to confirm ✦</p>}
            </div>
          </FoilFrame>
        </Reveal>
      </div>
    </section>
  );
}
