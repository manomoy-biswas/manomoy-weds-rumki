import Reveal from "./common/Reveal";
import { C, IMG_HANDS } from "./common/theme";

export default function Footer() {
  return (
    <footer
      className="relative text-center pt-16 sm:pt-20 pb-10 px-6 overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${C.goldPale} 0%, ${C.maroon} 35%, ${C.maroonDeep} 100%)` }}
    >
      <Reveal>
        <img
          src={IMG_HANDS}
          alt=""
          className="w-32 mx-auto mb-4"
          style={{
            WebkitMaskImage: "radial-gradient(circle, #000 55%, transparent 85%)",
            maskImage: "radial-gradient(circle, #000 55%, transparent 85%)",
          }}
        />
      </Reveal>
      <Reveal delay={0.1}>
        <p className="text-xl" style={{ color: C.ivory }}>With love, Manomoy & Rumki</p>
      </Reveal>
    </footer>
  );
}
