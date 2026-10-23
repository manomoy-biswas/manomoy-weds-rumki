import { useEffect } from "react";
import GlobalStyles from "./components/common/GlobalStyles";
import GlitterField from "./components/common/GlitterField";
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
  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: C.ivory, fontFamily: "'Cormorant Garamond', serif" }} className="min-h-screen relative">
      <GlobalStyles />
      <AudioPlayer />
      <GlitterField />

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
