import { useState, useRef, useEffect, useMemo } from "react";
import { MapPin } from "lucide-react";
import Reveal from "./common/Reveal";
import Kalka from "./common/Kalka";
import { useReveal } from "./common/hooks";
import {
  C, IMG_ICON_TRAY, IMG_BRIDE_BETEL2,
  IMG_CEREMONY_HALDI, IMG_CEREMONY_WEDDING, IMG_CEREMONY_RECEPTION,
} from "./common/theme";

/* ---------- Family / ceremony icons (small rail nodes) ---------- */
function IconTopor({ className }) {
  return (<svg viewBox="0 0 40 40" className={className}><path d="M6 30 L20 6 L34 30 Z" fill={C.ivory} stroke={C.gold} strokeWidth="1.3" /><path d="M12 30 L20 14 L28 30 Z" fill={C.goldPale} opacity="0.6" />{[10, 15, 20, 25, 30].map((x, i) => (<line key={i} x1={x} y1="30" x2={x + (20 - x) * 0.15} y2="36" stroke={C.gold} strokeWidth="1" />))}</svg>);
}
function IconMukut({ className }) {
  return (<svg viewBox="0 0 40 40" className={className}><path d="M4 32 L10 12 L16 22 L20 6 L24 22 L30 12 L36 32 Z" fill={C.gold} stroke={C.maroonDeep} strokeWidth="0.6" /><circle cx="20" cy="4" r="2.2" fill={C.maroon} /></svg>);
}
function IconGachKouto({ className }) {
  return (<svg viewBox="0 0 40 40" className={className}><path d="M12 36 L14 20 L26 20 L28 36 Z" fill={C.maroon} stroke={C.gold} strokeWidth="1" /><circle cx="20" cy="14" r="7" fill={C.turmeric} stroke={C.gold} strokeWidth="1" /><path d="M10 20 Q4 12 10 6 M30 20 Q36 12 30 6" stroke={C.green} strokeWidth="2" fill="none" strokeLinecap="round" /></svg>);
}
function IconSwastik({ className }) {
  return (<svg viewBox="0 0 40 40" className={className}><g stroke={C.maroonDeep} strokeWidth="2.4" strokeLinecap="square" fill="none"><path d="M20 6 V20 H34" /><path d="M34 20 H20 V6" /><path d="M20 34 V20 H6" /><path d="M6 20 H20 V34" /></g><path d="M32 14 L38 14 M32 26 L26 26 M8 26 L2 26 M8 14 L14 14" stroke={C.maroonDeep} strokeWidth="2" /></svg>);
}

/* ---------- Shubho Drishti (bride artwork) ---------- */
function ShubhoDristi({ className = "" }) {
  return (
    <div className={`overflow-hidden rounded-lg ${className}`} style={{ border: `1px solid ${C.gold}66` }}>
      <img src={IMG_BRIDE_BETEL2} alt="Shubho Drishti" className="w-full h-full object-cover" />
    </div>
  );
}

/* ---------- Celebration burst — party-popper style, on reveal complete ---------- */
function CelebrationBurst({ show }) {
  const particles = useMemo(() => {
    const emojis = ["🎉", "✨", "🎊", "🌸", "⭐"];
    return Array.from({ length: 22 }).map((_, i) => {
      const angle = Math.random() * 360;
      const dist = 55 + Math.random() * 70;
      const rad = (angle * Math.PI) / 180;
      return {
        tx: Math.cos(rad) * dist, ty: Math.sin(rad) * dist,
        delay: Math.random() * 0.2,
        isEmoji: Math.random() > 0.45,
        emoji: emojis[i % emojis.length],
        color: [C.gold, C.goldLight, C.maroon, "#ffffff"][i % 4],
      };
    });
  }, []);
  if (!show) return null;
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20 overflow-visible">
      {particles.map((p, i) =>
        p.isEmoji ? (
          <span key={i} className="absolute text-lg" style={{ "--tx": `${p.tx}px`, "--ty": `${p.ty}px`, animation: `confettiPop 1s ease-out ${p.delay}s forwards` }}>{p.emoji}</span>
        ) : (
          <span key={i} className="absolute rounded-full" style={{ width: 6, height: 6, background: p.color, "--tx": `${p.tx}px`, "--ty": `${p.ty}px`, animation: `confettiPop 0.9s ease-out ${p.delay}s forwards` }} />
        )
      )}
    </div>
  );
}

/* ---------- Reveal widgets (used inside modal) ---------- */
function ScratchReveal({ onComplete }) {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const done = useRef(false);
  const W = 240, H = 110;
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, C.goldLight); grad.addColorStop(0.5, C.gold); grad.addColorStop(1, C.goldLight);
    ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = C.maroonDeep; ctx.font = "600 13px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("✦ Scratch to reveal ✦", W / 2, H / 2);
  }, []);
  const erase = (x, y) => {
    if (done.current) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath(); ctx.arc(x, y, 20, 0, Math.PI * 2); ctx.fill();
    const data = ctx.getImageData(0, 0, W, H).data;
    let t = 0;
    for (let i = 3; i < data.length; i += 30) if (data[i] === 0) t++;
    if (t / (data.length / 30) > 0.45) { done.current = true; onComplete(); }
  };
  const getPos = (e) => { const r = canvasRef.current.getBoundingClientRect(); const p = e.touches ? e.touches[0] : e; return { x: p.clientX - r.left, y: p.clientY - r.top }; };
  return (
    <canvas ref={canvasRef} width={W} height={H} className="mx-auto rounded-md cursor-pointer touch-none block"
      onMouseDown={(e) => { drawing.current = true; const { x, y } = getPos(e); erase(x, y); }}
      onMouseMove={(e) => { if (drawing.current) { const { x, y } = getPos(e); erase(x, y); } }}
      onMouseUp={() => (drawing.current = false)} onMouseLeave={() => (drawing.current = false)}
      onTouchStart={(e) => { drawing.current = true; const { x, y } = getPos(e); erase(x, y); }}
      onTouchMove={(e) => { if (drawing.current) { const { x, y } = getPos(e); erase(x, y); } }}
      onTouchEnd={() => (drawing.current = false)} />
  );
}

function TapReveal({ onComplete }) {
  const [taps, setTaps] = useState(0);
  const handleTap = () => {
    if (taps >= 5) return;
    const next = taps + 1;
    setTaps(next);
    if (next >= 5) setTimeout(onComplete, 300);
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: `${C.gold}33` }}>
        <div style={{ width: `${taps * 20}%`, height: "100%", background: C.gold, transition: "width 0.3s ease" }} />
      </div>
      <button onClick={handleTap} className="w-20 h-20 rounded-full text-sm font-medium" style={{ background: C.maroonDeep, color: C.goldLight, border: `2px solid ${C.gold}`, boxShadow: taps > 0 ? `0 0 ${taps * 6}px ${C.gold}88` : "none" }}>
        Tap ({taps}/5)
      </button>
    </div>
  );
}

function HoldReveal({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const done = useRef(false);
  const start = () => {
    if (done.current) return;
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + 4, 100);
        if (next >= 100 && !done.current) { done.current = true; clearInterval(intervalRef.current); setTimeout(onComplete, 250); }
        return next;
      });
    }, 60);
  };
  const stop = () => clearInterval(intervalRef.current);
  useEffect(() => () => clearInterval(intervalRef.current), []);
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: `${C.gold}33` }}>
        <div style={{ width: `${progress}%`, height: "100%", background: C.gold, transition: "width 0.1s linear" }} />
      </div>
      <button onMouseDown={start} onMouseUp={stop} onMouseLeave={stop} onTouchStart={start} onTouchEnd={stop} className="w-24 h-24 rounded-full text-sm font-medium select-none" style={{ background: C.maroonDeep, color: C.goldLight, border: `2px solid ${C.gold}`, boxShadow: progress > 0 ? `0 0 ${progress / 3}px ${C.gold}88` : "none" }}>
        Press &amp; Hold
      </button>
    </div>
  );
}

function SwipeReveal({ onComplete }) {
  const [val, setVal] = useState(0);
  const done = useRef(false);
  const handleChange = (e) => {
    const v = Number(e.target.value);
    setVal(v);
    if (v >= 96 && !done.current) { done.current = true; setTimeout(onComplete, 200); }
  };
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: `${C.gold}33` }}>
        <div style={{ width: `${val}%`, height: "100%", background: C.gold }} />
      </div>
      <input type="range" min="0" max="100" value={val} onChange={handleChange} className="w-full" style={{ accentColor: C.gold }} />
      <p className="text-sm" style={{ color: `${C.brown}88` }}>Slide the ribbon all the way &rarr;</p>
    </div>
  );
}

/* ---------- Reveal modal ---------- */
function RevealModal({ ceremony, onClose, onComplete }) {
  const labels = { scratch: "Scratch to reveal", tap: "Tap 5 times to reveal", hold: "Press & hold to reveal", swipe: "Slide to reveal" };
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6" style={{ background: `${C.maroonDeep}E6` }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-xs rounded-xl overflow-hidden" style={{ background: C.ivory, border: `1px solid ${C.gold}` }}>
        <div className="w-full aspect-video overflow-hidden"><img src={ceremony.image} alt={ceremony.titleEn} className="w-full h-full object-cover" /></div>
        <div className="p-5 text-center">
          <p className="text-xl mb-1" style={{ color: C.maroonDeep, fontFamily: "'Cormorant Garamond', serif" }}>{ceremony.titleEn}</p>
          <p className="text-sm mb-4 uppercase tracking-wide" style={{ color: `${C.brown}88` }}>{labels[ceremony.revealType]}</p>
          {ceremony.revealType === "scratch" && <ScratchReveal onComplete={onComplete} />}
          {ceremony.revealType === "tap" && <TapReveal onComplete={onComplete} />}
          {ceremony.revealType === "hold" && <HoldReveal onComplete={onComplete} />}
          {ceremony.revealType === "swipe" && <SwipeReveal onComplete={onComplete} />}
          <button onClick={onClose} className="mt-5 text-sm uppercase tracking-wide" style={{ color: `${C.brown}77` }}>Close</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Journey timeline row ---------- */
function TimelineRow({ ceremony, isLast, revealedFlag, justRevealed, onOpen }) {
  const [ref, visible] = useReveal(0.15);
  const Icon = ceremony.Icon;
  return (
    <div ref={ref} className="relative flex gap-4 sm:gap-6 md:gap-10">
      <div className="flex flex-col items-center shrink-0">
        <div className="rounded-full flex items-center justify-center transition-all duration-700 z-10 w-11 h-11 md:w-16 md:h-16" style={{ background: visible ? C.gold : C.goldPale, boxShadow: visible ? `0 0 0 5px ${C.gold}22, 0 6px 16px -6px ${C.maroonDeep}` : "none", transform: visible ? "scale(1)" : "scale(0.7)" }}>
          <Icon className="w-7 h-7 md:w-10 md:h-10" />
        </div>
        {!isLast && (
          <div className="w-[2px] md:w-[3px] flex-1 mt-1 mb-1 overflow-hidden min-h-[46px] md:min-h-[64px]" style={{ background: `${C.gold}33` }}>
            <div style={{ width: "100%", height: visible ? "100%" : "0%", background: C.gold, transition: "height 1s ease 0.3s" }} />
          </div>
        )}
      </div>
      <Reveal delay={0.1} className="pb-10 md:pb-16 flex-1 min-w-0">
        <p className="text-xl md:text-4xl leading-none mb-3 md:mb-5" style={{ color: C.maroonDeep, fontFamily: "'Cormorant Garamond', serif" }}>{ceremony.titleEn}</p>
        <div className="rounded-lg overflow-hidden relative" style={{ boxShadow: `0 10px 24px -12px ${C.maroonDeep}99` }}>
          <div className="w-full aspect-video overflow-hidden"><img src={ceremony.image} alt={ceremony.titleEn} className="w-full h-full object-cover" /></div>
          {!revealedFlag ? (
            <button onClick={() => onOpen(ceremony)} className="w-full py-4 md:py-6 text-center text-base md:text-lg font-medium uppercase tracking-wide" style={{ background: C.gold, color: C.maroonDeep }}>
              Tap to Reveal
            </button>
          ) : (
            <div className="relative p-5 md:p-8" style={{ background: C.ivory, border: `1px solid ${C.gold}55`, borderTop: "none" }}>
              <CelebrationBurst show={justRevealed} />
              <span className="text-sm md:text-base tracking-widest uppercase" style={{ color: C.maroonDeep, fontFamily: "Marcellus, serif" }}>{ceremony.date}</span>
              <p className="text-base md:text-lg mt-1" style={{ color: C.brown }}>{ceremony.time}</p>
              <div className="flex items-start gap-1.5 md:gap-2 mt-2 md:mt-4">
                <MapPin size={17} color={C.green} className="mt-0.5 shrink-0 md:w-5 md:h-5" />
                <div>
                  <p className="text-base md:text-lg font-medium" style={{ color: C.brown }}>{ceremony.venue}</p>
                  <p className="text-sm md:text-sm" style={{ color: `${C.brown}99` }}>{ceremony.venueDetail}</p>
                </div>
              </div>
              <a href={ceremony.mapUrl} target="_blank" rel="noreferrer" className="mt-3 md:mt-5 inline-flex items-center gap-1.5 text-sm md:text-sm font-medium uppercase tracking-wide px-4 py-1.5 md:px-6 md:py-2.5 rounded-full w-fit" style={{ background: C.green, color: C.ivory }}>
                <MapPin size={14} /> View on Maps
              </a>
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
}

const MAP_URL_HOME = "https://maps.app.goo.gl/SwACzGaL2Z6sn8Rg9";
const MAP_URL_BANIJYA_BHABAN = "https://maps.app.goo.gl/GPjZbdu7w2tEP75f7";
const MAP_URL_ABASHIKA_ANUSHTHAN_BHABAN = "https://maps.app.goo.gl/nBnKTB3TGBG4fVFb8";

const ceremonies = [
  { id: "holud", titleEn: "Gaye Holud", date: "25 November 2026", time: "10:00 AM onwards", venue: "Biswas Residence", venueDetail: "Purba Akhanagar, Kaliyaganj", mapUrl: MAP_URL_HOME, Icon: IconGachKouto, image: IMG_CEREMONY_HALDI, revealType: "tap" },
  { id: "wedding", titleEn: "Wedding Ceremony", date: "25 November 2026", time: "4:51 PM – 8:41 PM", venue: "Banijya Bhaban", venueDetail: "Raiganj", mapUrl: MAP_URL_BANIJYA_BHABAN, Icon: IconSwastik, image: IMG_CEREMONY_WEDDING, revealType: "hold" },
  { id: "reception", titleEn: "Reception", date: "27 November 2026", time: "8:00 PM onwards", venue: "Abashika Anushthan Bhaban", venueDetail: "Kaliyaganj", mapUrl: MAP_URL_ABASHIKA_ANUSHTHAN_BHABAN, Icon: IconMukut, image: IMG_CEREMONY_RECEPTION, revealType: "swipe" },
];

/* ---------- Program roadmap / journey section ---------- */
export default function ProgramRoadmap() {
  const [revealedMap, setRevealedMap] = useState({});
  const [activeCeremony, setActiveCeremony] = useState(null);
  const [justRevealed, setJustRevealed] = useState(null);

  const openModal = (c) => setActiveCeremony(c);
  const closeModal = () => setActiveCeremony(null);
  const completeReveal = (id) => {
    setRevealedMap((r) => ({ ...r, [id]: true }));
    setJustRevealed(id);
    setTimeout(() => setActiveCeremony(null), 600);
    setTimeout(() => setJustRevealed(null), 1900);
  };

  return (
    <section className="relative px-6 py-16 md:py-24 overflow-hidden" style={{ background: `linear-gradient(180deg, ${C.goldPale} 0%, ${C.ivory} 15%, ${C.ivory} 85%, ${C.goldPale} 100%)` }}>
      <Kalka className="absolute top-4 left-2 w-7 h-10 opacity-70" />
      <Kalka className="absolute top-4 right-2 w-7 h-10 opacity-70" flip />
      <div className="max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-center text-3xl md:text-5xl lg:text-6xl mb-2 md:mb-4" style={{ color: C.maroonDeep }}>The Journey Ahead</h2>
          <p className="text-center text-lg md:text-lg mb-2" style={{ color: `${C.brown}99` }}>Tap each stop — every one reveals a different way</p>
        </Reveal>
        <div className="mt-8 md:mt-14">
          {ceremonies.map((c, i) => (
            <TimelineRow key={c.id} ceremony={c} isLast={i === ceremonies.length - 1} revealedFlag={!!revealedMap[c.id]} justRevealed={justRevealed === c.id} onOpen={openModal} />
          ))}
        </div>
      </div>
      {activeCeremony && <RevealModal ceremony={activeCeremony} onClose={closeModal} onComplete={() => completeReveal(activeCeremony.id)} />}
    </section>
  );
}
