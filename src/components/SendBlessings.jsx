import { useState } from "react";
import { Send } from "lucide-react";
import Reveal from "./common/Reveal";
import FoilFrame from "./common/FoilFrame";
import { C, IMG_DAMASK, IMG_ICON_BETEL } from "./common/theme";

/* ---------- Guestbook note: guests send a blessing/wish for the couple ---------- */
export default function SendBlessings() {
  const [noteName, setNoteName] = useState("");
  const [note, setNote] = useState("");
  const [noteSent, setNoteSent] = useState(false);

  const handleNote = () => {
    if (!note.trim() || !noteName.trim()) return;
    const msg = `A note for the couple 💌%0AFrom: ${encodeURIComponent(noteName)}%0A"${encodeURIComponent(note)}"`;
    window.open(`https://wa.me/918348682398?text=${msg}`, "_blank");
    setNoteSent(true);
  };

  return (
    <section className="px-6 py-16" style={{ background: `linear-gradient(180deg, ${C.goldPale} 0%, ${C.ivory} 20%, ${C.ivory} 80%, ${C.goldPale} 100%)` }}>
      <div className="max-w-md mx-auto text-center">
        <Reveal>
          <img src={IMG_ICON_BETEL} alt="" className="w-16 h-16 object-contain mx-auto mb-2" />
          <h2 className="text-3xl mb-1" style={{ color: C.maroonDeep }}>Leave Us a Note</h2>
          <p className="text-lg mb-8" style={{ color: `${C.brown}99` }}>Share a wish or blessing for us</p>
        </Reveal>
        <Reveal delay={0.1}>
          <FoilFrame>
            <div className="rounded-xl p-6 text-left" style={{ background: `linear-gradient(160deg, ${C.maroonDeep}, ${C.maroon}), url(${IMG_DAMASK})`, backgroundBlendMode: "multiply", backgroundSize: "cover" }}>
              <label className="text-sm uppercase tracking-wider" style={{ color: C.gold }}>Your name</label>
              <input value={noteName} onChange={(e) => setNoteName(e.target.value)} placeholder="Enter your name" className="w-full mt-1 mb-4 px-3 py-2 rounded-md outline-none text-base" style={{ background: C.ivory, color: C.brown }} />
              <label className="text-sm uppercase tracking-wider" style={{ color: C.gold }}>Your note</label>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} placeholder="Write something from the heart..." className="w-full mt-1 mb-4 px-3 py-2 rounded-md outline-none text-base resize-none" style={{ background: C.ivory, color: C.brown }} />
              <button onClick={handleNote} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-base font-medium" style={{ background: C.gold, color: C.maroonDeep }}>
                <Send size={15} /> Send Love
              </button>
              {noteSent && <p className="text-sm mt-3 text-center" style={{ color: C.goldLight }}>Thank you — opening WhatsApp ✦</p>}
            </div>
          </FoilFrame>
        </Reveal>
      </div>
    </section>
  );
}
