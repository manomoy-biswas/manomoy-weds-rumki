import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { C, AUDIO_SRC } from "./common/theme";

/* Plays once, for the opening PLAY_SECONDS of the track, then stops
   (with a short fade-out instead of an abrupt cut). No looping. */
const PLAY_SECONDS = 31;
const FADE_OUT_SECONDS = 2.5;
const TARGET_VOLUME = 0.5;

function playOnce(ctx, masterGain, buffer) {
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const gainNode = ctx.createGain();
  source.connect(gainNode);
  gainNode.connect(masterGain);

  const startAt = ctx.currentTime;
  const fadeStart = startAt + PLAY_SECONDS - FADE_OUT_SECONDS;
  const playEnd = startAt + PLAY_SECONDS;

  gainNode.gain.setValueAtTime(1, startAt);
  gainNode.gain.setValueAtTime(1, fadeStart);
  gainNode.gain.linearRampToValueAtTime(0, playEnd);

  source.start(startAt, 0, PLAY_SECONDS);
}

/* ---------- Background music: plays once the envelope opens, mute toggle while open ---------- */
export default function AudioPlayer({ phase }) {
  const [muted, setMuted] = useState(false);
  const ctxRef = useRef(null);
  const masterGainRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    return () => { ctxRef.current?.close(); };
  }, []);

  useEffect(() => {
    if (phase !== "opening" || startedRef.current || !AUDIO_SRC) return;
    startedRef.current = true;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    ctxRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.value = TARGET_VOLUME;
    masterGain.connect(ctx.destination);
    masterGainRef.current = masterGain;

    fetch(AUDIO_SRC)
      .then((res) => res.arrayBuffer())
      .then((data) => ctx.decodeAudioData(data))
      .then((buffer) => {
        if (ctx.state === "suspended") ctx.resume();
        playOnce(ctx, masterGain, buffer);
      })
      .catch(() => {});
  }, [phase]);

  if (!AUDIO_SRC) return null;

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    const ctx = ctxRef.current;
    if (ctx && masterGainRef.current) {
      masterGainRef.current.gain.setTargetAtTime(next ? 0 : TARGET_VOLUME, ctx.currentTime, 0.05);
    }
  };

  return (
    phase === "open" && (
      <button onClick={toggleMute} className="fixed bottom-5 right-5 z-40 w-11 h-11 rounded-full flex items-center justify-center" style={{ background: C.maroonDeep, border: `1px solid ${C.gold}` }}>
        {muted ? <VolumeX size={18} color={C.gold} /> : <Volume2 size={18} color={C.gold} />}
      </button>
    )
  );
}
