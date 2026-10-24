import { useState, useEffect } from "react";
import GlobalStyles from "./components/common/GlobalStyles";
import GlitterField from "./components/common/GlitterField";
import EnvelopeOverlay from "./components/EnvelopeOverlay";
import AudioPlayer from "./components/AudioPlayer";
import TopBanner from "./components/TopBanner";
import DateReveal from "./components/DateReveal";
import DescriptionSection from "./components/DescriptionSection";
import ProgramRoadmap from "./components/ProgramRoadmap";
import MakeAGuess from "./components/MakeAGuess";
import Countdown from "./components/Countdown";
import RSVP from "./components/RSVP";
import SendBlessings from "./components/SendBlessings";
import Footer from "./components/Footer";
import { C } from "./components/common/theme";

export default function WeddingInvitation() {
  const [phase, setPhase] = useState("closed"); // closed | opening | open

  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.body.style.overflow = phase === "open" ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [phase]);

  const handleOpenEnvelope = () => {
    window.scrollTo(0, 0);
    setPhase("opening");
    setTimeout(() => setPhase("open"), 1500);
  };

  return (
    <div style={{ background: C.ivory, fontFamily: "'Cormorant Garamond', serif" }} className="min-h-screen relative">
      <GlobalStyles />
      <AudioPlayer phase={phase} />
      <GlitterField />
      <EnvelopeOverlay phase={phase} onOpen={handleOpenEnvelope} />

      <TopBanner />
      <DateReveal />
      <DescriptionSection />
      <ProgramRoadmap />
      <MakeAGuess />
      <Countdown />
      <RSVP />
      <SendBlessings />
      <Footer />
    </div>
  );
}
