import {
  type DesignSystem,
  MorphElement,
  type Page,
  type SlideMeta,
  type SlideTransition,
  useSlidePageNumber,
} from '@open-slide/core';
import { type CSSProperties, type ReactNode, useState, useEffect, useRef } from 'react';

// Design tokens per open-slide contract - Bright High-End Motion Graphics Studio
export const design: DesignSystem = {
  palette: {
    bg: '#F8FAFC',
    text: '#090D16',
    accent: '#00D06C', // Vivid Nvidia Neon Emerald
  },
  fonts: {
    display: '"Plus Jakarta Sans", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
    body: '"SF Pro Text", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  typeScale: {
    hero: 68,
    body: 24,
  },
  radius: 20,
};

// High-End Vector Motion Palette
const ui = {
  bg: 'var(--osd-bg)',
  text: 'var(--osd-text)',
  textMuted: '#64748B',
  green: '#00D06C',
  greenDark: '#047857',
  greenSoft: '#ECFDF5',
  greenBorder: '#6EE7B7',
  pink: '#F43F5E',
  pinkDark: '#BE123C',
  pinkSoft: '#FFF1F2',
  pinkBorder: '#FDA4AF',
  blue: '#2563EB',
  blueSoft: '#EFF6FF',
  blueBorder: '#93C5FD',
  amber: '#F59E0B',
  amberDark: '#B45309',
  amberSoft: '#FFFBEB',
  amberBorder: '#FCD34D',
  purple: '#8B5CF6',
  cardBg: '#FFFFFF',
  cardBorder: '#E2E8F0',
  outline: '#090D16',
};

const font = {
  display: 'var(--osd-font-display)',
  body: 'var(--osd-font-body)',
  mono: '"JetBrains Mono", "SF Mono", Menlo, monospace',
};

// Slide transition config
export const transition: SlideTransition = {
  name: 'slide-horizontal',
  duration: 480,
  timing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
};

// Rich Animator Keyframe Styles
const STYLE_ID = 'osd-styles-pro-animator-max';
const css = `
  /* === CHARACTER GROOVES & DYNAMICS === */
  @keyframes char-groove { 0%, 100% { transform: translateY(0) rotate(0deg); } 25% { transform: translateY(-7px) rotate(-1.5deg); } 75% { transform: translateY(-5px) rotate(1.5deg); } }
  @keyframes char-swagger { 0%, 100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-10px) rotate(2deg); } }
  @keyframes eye-dart { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }

  /* === JENSEN CARTOON EXPRESSIONS === */
  @keyframes heart-eyes-boing { 0%, 100% { transform: scale(1) translateY(0); } 25% { transform: scale(1.6, 0.7) translateY(-3px); } 55% { transform: scale(0.85, 1.45) translateY(-14px); } 80% { transform: scale(1.15, 0.9) translateY(-2px); } }
  @keyframes jaw-drop { 0%, 100% { transform: translateY(0) scaleY(1); } 50% { transform: translateY(8px) scaleY(1.4); } }
  @keyframes steam-puff-l { 0% { transform: translate(0, 0) scale(0.2); opacity: 0; } 50% { opacity: 0.9; transform: translate(-20px, -15px) scale(1.2); } 100% { transform: translate(-38px, -28px) scale(1.8); opacity: 0; } }
  @keyframes steam-puff-r { 0% { transform: translate(0, 0) scale(0.2); opacity: 0; } 50% { opacity: 0.9; transform: translate(20px, -15px) scale(1.2); } 100% { transform: translate(38px, -28px) scale(1.8); opacity: 0; } }
  @keyframes blush-pulse { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.95; transform: scale(1.3); } }
  @keyframes tear-fountain-l { 0% { transform: translate(0, 0) scale(0.2); opacity: 0; } 30% { opacity: 1; transform: translate(-30px, -25px) scale(1.5); } 70% { opacity: 0.9; transform: translate(-70px, 20px) scale(1.1); } 100% { transform: translate(-100px, 70px) scale(0.3); opacity: 0; } }
  @keyframes tear-fountain-r { 0% { transform: translate(0, 0) scale(0.2); opacity: 0; } 30% { opacity: 1; transform: translate(30px, -25px) scale(1.5); } 70% { opacity: 0.9; transform: translate(70px, 20px) scale(1.1); } 100% { transform: translate(100px, 70px) scale(0.3); opacity: 0; } }
  @keyframes tremble-shiver { 0%, 100% { transform: translate(0, 0); } 20% { transform: translate(-3px, 1px); } 40% { transform: translate(3px, -1px); } 60% { transform: translate(-2px, -2px); } 80% { transform: translate(2px, 2px); } }
  @keyframes hair-stream { 0%, 100% { transform: rotate(0deg) skewX(0deg); } 50% { transform: rotate(-9deg) skewX(-14deg); } }
  @keyframes scream-mouth { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.3, 1.4); } }
  @keyframes flail-arms { 0%, 100% { transform: rotate(-18deg); } 50% { transform: rotate(22deg); } }
  @keyframes glint-twinkle { 0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; } 50% { transform: scale(1.5) rotate(90deg); opacity: 1; } }
  @keyframes spark-orbit { 0% { transform: rotate(0deg) translateX(55px) rotate(0deg); } 100% { transform: rotate(360deg) translateX(55px) rotate(-360deg); } }

  /* === ALICE CARTOON SPY DYNAMICS === */
  @keyframes brow-arch { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  @keyframes antenna-blink { 0%, 100% { opacity: 0.2; transform: scale(0.9); } 50% { opacity: 1; transform: scale(1.3); } }
  @keyframes olive-backflip { 0%, 100% { transform: translateY(0) rotate(0deg); } 30% { transform: translateY(-15px) rotate(35deg); } 60% { transform: translateY(4px) rotate(-15deg); } }
  @keyframes martini-splash { 0%, 100% { transform: translateY(0) scale(0.2); opacity: 0; } 50% { transform: translateY(-14px) scale(1.2); opacity: 0.9; } }
  @keyframes kiss-drift { 0% { transform: translate(0, 0) scale(0.7); opacity: 0; } 25% { opacity: 1; transform: translate(-35px, -15px) scale(1.2); } 100% { transform: translate(-140px, -40px) scale(1.6); opacity: 0; } }

  /* === TRUMP CARTOON APPARATUS === */
  @keyframes toupee-flight { 0%, 100% { transform: translateY(0) rotate(0deg); } 20% { transform: translateY(-28px) rotate(-12deg); } 40% { transform: translateY(-16px) rotate(8deg); } 60% { transform: translateY(-34px) rotate(-6deg); } 80% { transform: translateY(-10px) rotate(4deg); } }
  @keyframes accordion-arms { 0%, 100% { transform: scaleX(0.72); } 50% { transform: scaleX(1.38); } }
  @keyframes tie-pendulum { 0%, 100% { transform: rotate(-20deg); } 50% { transform: rotate(20deg); } }
  @keyframes mouth-shout { 0%, 100% { transform: scaleY(0.65); } 50% { transform: scaleY(1.5) scaleX(1.15); } }
  @keyframes sound-blast { 0% { r: 12px; opacity: 1; stroke-width: 5px; } 100% { r: 120px; opacity: 0; stroke-width: 1px; } }
  @keyframes gavel-hit { 0%, 80%, 100% { transform: rotate(0deg); } 20% { transform: rotate(-58deg); } 35% { transform: rotate(20deg); } 45% { transform: rotate(-6deg); } 55% { transform: rotate(0deg); } }
  @keyframes acoustic-burst { 0% { transform: scale(0.2); opacity: 1; } 50% { transform: scale(1.4); opacity: 0.9; } 100% { transform: scale(2.4); opacity: 0; } }

  /* === THE FED INSPECTOR & LAB SCAN === */
  @keyframes siren-sweep { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  @keyframes magnify-sweep { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 50% { transform: translate(-28px, -18px) rotate(-18deg); } }
  @keyframes scanline-laser { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(320px); } }
  @keyframes poly-scroll { to { stroke-dashoffset: -240; } }

  /* === MOTION GRAPHIC SETPIECES === */
  @keyframes fan-spin { to { transform: rotate(360deg); } }
  @keyframes gear-cw { to { transform: rotate(360deg); } }
  @keyframes gear-ccw { to { transform: rotate(-360deg); } }
  @keyframes conveyor-dashes { to { stroke-dashoffset: -40; } }
  @keyframes ship-slosh { 0%, 100% { transform: translateY(0) rotate(-1.5deg); } 50% { transform: translateY(-10px) rotate(2deg); } }
  @keyframes smoke-float { 0% { transform: translateY(0) scale(0.3); opacity: 0.9; } 100% { transform: translateY(-40px) scale(1.6); opacity: 0; } }
  @keyframes radar-cone { 0%, 100% { transform: rotate(-35deg); } 50% { transform: rotate(35deg); } }
  @keyframes spotlight-sway { 0%, 100% { transform: rotate(-14deg); } 50% { transform: rotate(14deg); } }
  @keyframes phone-buzz { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 20% { transform: translate(-3px, 2px) rotate(-3deg); } 40% { transform: translate(3px, -2px) rotate(3deg); } 60% { transform: translate(-2px, -1px) rotate(-2deg); } 80% { transform: translate(2px, 1px) rotate(2deg); } }
  @keyframes bubble-rise { 0% { transform: translateY(0) scale(0.6); opacity: 0; } 30% { opacity: 1; transform: translateY(-22px) scale(1.1); } 80% { opacity: 0.9; transform: translateY(-65px) scale(1); } 100% { transform: translateY(-100px) scale(0.8); opacity: 0; } }
  @keyframes coaster-pitch { 0%, 100% { transform: translateY(0) rotate(0deg); } 25% { transform: translateY(-14px) rotate(-8deg); } 50% { transform: translateY(8px) rotate(9deg); } 75% { transform: translateY(-8px) rotate(-4deg); } }
  @keyframes rocket-flame { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(1.45) scaleX(0.85); } }
  @keyframes searchlight-l { 0%, 100% { transform: rotate(-45deg); } 50% { transform: rotate(20deg); } }
  @keyframes searchlight-r { 0%, 100% { transform: rotate(35deg); } 50% { transform: rotate(-35deg); } }
  @keyframes confetti-flutter-1 { 0% { transform: translateY(-30px) rotate(0deg); opacity: 1; } 100% { transform: translateY(480px) rotate(720deg); opacity: 0; } }
  @keyframes confetti-flutter-2 { 0% { transform: translateY(-30px) rotate(0deg); opacity: 1; } 100% { transform: translateY(480px) rotate(-640deg); opacity: 0; } }
  @keyframes dollar-flutter { 0% { transform: translateY(-30px) rotate(0deg); opacity: 1; } 100% { transform: translateY(460px) rotate(540deg); opacity: 0; } }
  @keyframes ticker-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

  /* Class mappings */
  .anim-groove { animation: char-groove 3s ease-in-out infinite; }
  .anim-swagger { animation: char-swagger 2s ease-in-out infinite; }
  .anim-eye-dart { animation: eye-dart 2.2s ease-in-out infinite; }
  .anim-heart-boing { transform-origin: center; animation: heart-eyes-boing 1.1s ease-in-out infinite; }
  .anim-jaw-drop { animation: jaw-drop 1.1s ease-in-out infinite; }
  .anim-steam-l { animation: steam-puff-l 1.4s ease-out infinite; }
  .anim-steam-r { animation: steam-puff-r 1.4s ease-out 0.2s infinite; }
  .anim-blush { animation: blush-pulse 1.6s ease-in-out infinite; }
  .anim-tear-l { animation: tear-fountain-l 1.1s ease-out infinite; }
  .anim-tear-r { animation: tear-fountain-r 1.1s ease-out 0.3s infinite; }
  .anim-tremble { animation: tremble-shiver 0.2s ease-in-out infinite; }
  .anim-hair-wind { transform-origin: 90px 45px; animation: hair-stream 0.8s ease-in-out infinite; }
  .anim-scream-mouth { transform-origin: center; animation: scream-mouth 0.4s ease-in-out infinite; }
  .anim-flail-arms { transform-origin: center; animation: flail-arms 0.7s ease-in-out infinite; }
  .anim-glint { transform-origin: center; animation: glint-twinkle 2.4s ease-in-out infinite; }
  .anim-spark-orbit { animation: spark-orbit 4s linear infinite; }

  .anim-brow-arch { animation: brow-arch 1.8s ease-in-out infinite; }
  .anim-antenna-dot { transform-origin: center; animation: antenna-blink 0.9s ease-in-out infinite; }
  .anim-olive-flip { transform-origin: center; animation: olive-backflip 1.8s ease-in-out infinite; }
  .anim-martini-drop { animation: martini-splash 1.8s ease-out infinite; }
  .anim-kiss-float { animation: kiss-drift 2.2s ease-out infinite; }

  .anim-toupee-fly { transform-origin: 90px 40px; animation: toupee-flight 1.3s ease-in-out infinite; }
  .anim-accordion-arms { transform-origin: center; animation: accordion-arms 1s ease-in-out infinite; }
  .anim-tie-pendulum { transform-origin: 100px 170px; animation: tie-pendulum 1.2s ease-in-out infinite; }
  .anim-mouth-shout { transform-origin: center; animation: mouth-shout 0.28s ease-in-out infinite; }
  .anim-sound-ring { animation: sound-blast 1.3s ease-out infinite; }
  .anim-gavel-slam { transform-origin: 80px 80px; animation: gavel-hit 1.8s ease-in-out infinite; }
  .anim-comic-burst { transform-origin: 80px 115px; animation: acoustic-burst 1.8s ease-out infinite; }

  .anim-siren-beacon { transform-origin: 100px 24px; animation: siren-sweep 1.8s linear infinite; }
  .anim-magnify-pan { transform-origin: 140px 160px; animation: magnify-sweep 2.8s ease-in-out infinite; }
  .anim-laser-scan { animation: scanline-laser 2.2s ease-in-out infinite; }
  .anim-poly-wave { stroke-dasharray: 200 40; animation: poly-scroll 1.4s linear infinite; }

  .anim-chip-fan { transform-origin: center; animation: fan-spin 1.2s linear infinite; }
  .anim-gear-cw { transform-origin: center; animation: gear-cw 3s linear infinite; }
  .anim-gear-ccw { transform-origin: center; animation: gear-ccw 3s linear infinite; }
  .anim-conveyor { stroke-dasharray: 12 8; animation: conveyor-dashes 0.9s linear infinite; }
  .anim-ship-bob { animation: ship-slosh 2.6s ease-in-out infinite; }
  .anim-smoke-puff { animation: smoke-float 1.8s ease-out infinite; }
  .anim-radar-cone { transform-origin: 30px 30px; animation: radar-cone 3s ease-in-out infinite; }
  .anim-spotlight { transform-origin: top center; animation: spotlight-sway 3.2s ease-in-out infinite; }
  .anim-buzz-phone { animation: phone-buzz 0.3s ease-in-out infinite; }
  .anim-bubble-1 { animation: bubble-rise 2.4s ease-out infinite; }
  .anim-bubble-2 { animation: bubble-rise 2.6s ease-out 0.8s infinite; }
  .anim-bubble-3 { animation: bubble-rise 2.2s ease-out 1.5s infinite; }
  .anim-coaster { animation: coaster-pitch 1.4s ease-in-out infinite; }
  .anim-rocket-exhaust { transform-origin: top center; animation: rocket-flame 0.25s ease-in-out infinite; }
  .anim-search-l { transform-origin: bottom center; animation: searchlight-l 4.5s ease-in-out infinite; }
  .anim-search-r { transform-origin: bottom center; animation: searchlight-r 4.5s ease-in-out infinite; }
  .anim-confetti-1 { animation: confetti-flutter-1 2.8s linear infinite; }
  .anim-confetti-2 { animation: confetti-flutter-2 3.2s linear 0.9s infinite; }
  .anim-dollar-fall { animation: dollar-flutter 3.5s linear infinite; }
  .anim-ticker { animation: ticker-marquee 18s linear infinite; }

  /* Data still for export/PDF */
  [data-still] * { animation: none !important; }
`;

if (typeof document !== 'undefined') {
  let style = document.getElementById(STYLE_ID);
  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }
  if (style.textContent !== css) style.textContent = css;
}

// 1920x1080 stage style
const canvasStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  background: ui.bg,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '40px 60px',
  boxSizing: 'border-box',
};


// Synchronized Presenter Notes & Speech Narration
export const notes: string[] = [
  // Page 1
  `"Welcome, ladies and gentlemen. Behold Jensen Huang in full glory.
Three point five trillion dollar market cap. A ninety-eight percent monopoly on artificial intelligence compute.
He does not wear suits. He wears the sovereign leather jacket.
Every tech titan on earth is begging him for Blackwell B200 allocations. Life could not possibly be better.
Until... he booked a flight to Southeast Asia."`,

  // Page 2
  `"Act Two: Singapore, midnight at Marina Bay Sands.
Enter Alice Huang of Megaspeed.
U.S. intelligence agencies identify her as an alleged intelligence operative for China's Ministry of State Security.
Jensen is completely captivated. Look at those heart eyes—he thinks she's just passionately in love with CUDA parallel computing architecture!
A two billion dollar data center deal is signed over dinner."`,

  // Page 3
  `"Act Three: The Transshipment Pipeline.
Fifty thousand state-of-the-art GPUs legally depart Santa Clara bound for Singapore.
Suddenly, federal radar lights up in Washington.
Why are server clusters in Singapore allegedly being remote-leased to sanctioned Chinese AI developers in Shenzhen?
The Bureau of Industry and Security starts tracking cargo vessels across the Pacific."`,

  // Page 4
  `"Act Four: The 2:00 AM All-Hands Email.
Before the tabloids or federal investigators can leak the story, Jensen pulls the ultimate power move:
He emails all thirty thousand Nvidia employees at 2:00 in the morning and admits the affair directly.
'I was unfaithful to my wife. There is no excuse. I take full responsibility.'
His Slack is melting down, but he draws a hard line: Not a single semiconductor blueprint was ever compromised."`,

  // Page 5
  `"Act Five: Washington goes DEFCON 1.
Capitol Hill turns into an absolute media circus.
Donald Trump is waving his arms, his hair is flying off his head, demanding tariffs and treason trials.
Congress slams gavels so hard the committee desks are splintering.
Jensen raises the Blackwell B200 as a physical shield against the barrage of subpoenas."`,

  // Page 6
  `"Act Six: The Forensic Crime Lab.
The independent board and cybersecurity audit teams go to work.
They scan every email, every WeChat text, every circuit schematic.
The polygraph scan results come back clear:
Infidelity? 100% guilty.
National security treason? Zero evidence. The CUDA crown jewels never left Santa Clara."`,

  // Page 7
  `"Act Seven: The Wall Street Rollercoaster.
Premarket trading drops 120 billion dollars in thirty minutes as algorithms panic.
Then Wall Street fund managers open their spreadsheets, wipe their foreheads, and remember:
AMD cannot supply this volume. Intel is years behind. You literally cannot train frontier AI without Nvidia.
The stock bounces off the CUDA moat trampoline and rockets straight to an all-time record high!"`,

  // Page 8
  `"Act Eight: Untouchable.
Trump gives a thumbs up. The Fed inspector stamps the file closed.
Alice Huang waves goodbye from Singapore with her martini.
And Jensen Huang puts on a second pair of sunglasses over his glasses.
CEOs can survive scandals when the entire planet runs on their chips.
The leather jacket remains undefeated. Thank you very much."`,
];

// ---------------------------------------------------------------------------
// AUDIO / VOICEOVER CONTROLLER (Universal Multi-AI Voiceover Engine)
// ---------------------------------------------------------------------------
const VoiceoverController = ({ currentEpisode }: { currentEpisode: number }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    const noteText = notes[currentEpisode - 1] || '';
    const cleanSpeech = noteText.replace(/^"|"$/g, '').trim();

    // Multi-format audio resolver (supports ElevenLabs, OpenAI, Gemini, Edge-TTS, macOS)
    const formats = ['m4a', 'mp3', 'wav', 'ogg', 'webm'];
    let didFallback = false;

    const playNextFormat = (formatIdx: number) => {
      if (formatIdx >= formats.length) {
        // Universal fallback to browser SpeechSynthesis AI voice
        if (!didFallback && typeof window !== 'undefined' && 'speechSynthesis' in window) {
          didFallback = true;
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(cleanSpeech);
          utterance.rate = 1.05;
          utterance.pitch = 1.0;

          const voices = window.speechSynthesis.getVoices();
          const preferred = voices.find(
            (v) =>
              v.lang.startsWith('en') &&
              (v.name.includes('Natural') ||
                v.name.includes('Daniel') ||
                v.name.includes('Samantha') ||
                v.name.includes('Google') ||
                v.name.includes('Alex'))
          );
          if (preferred) utterance.voice = preferred;
          window.speechSynthesis.speak(utterance);
        }
        return;
      }

      const ext = formats[formatIdx];
      const audioUrl = new URL(`./assets/audio/act-${currentEpisode}.${ext}`, import.meta.url).href;
      const testAudio = new Audio(audioUrl);
      audioRef.current = testAudio;

      testAudio.play().catch(() => {
        playNextFormat(formatIdx + 1);
      });
    };

    playNextFormat(0);

    return () => {
      didFallback = true;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isPlaying, currentEpisode]);

  return (
    <button
      onClick={() => setIsPlaying(!isPlaying)}
      title="Toggle Multi-AI Audio Voiceover"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: isPlaying ? ui.green : '#FFFFFF',
        color: isPlaying ? '#000000' : ui.text,
        border: `1.5px solid ${isPlaying ? ui.green : ui.cardBorder}`,
        borderRadius: 20,
        padding: '5px 12px',
        fontFamily: font.mono,
        fontSize: 12,
        fontWeight: 800,
        cursor: 'pointer',
        boxShadow: isPlaying ? '0 0 14px rgba(0, 208, 108, 0.45)' : 'none',
        transition: 'all 0.2s ease',
      }}
    >
      <span style={{ fontSize: 13 }}>{isPlaying ? '🔊' : '🎙️'}</span>
      <span>{isPlaying ? 'VOICEOVER: ACTIVE' : 'VOICEOVER: OFF'}</span>
    </button>
  );
};

// Global Keynote Top Bar
const KeynoteNavBar = ({ episode, title }: { episode: number; title: string }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `2px solid ${ui.cardBorder}`,
        paddingBottom: 16,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <MorphElement id="film-scene-pill">
          <div
            style={{
              background: ui.green,
              color: '#000000',
              fontFamily: font.mono,
              fontWeight: 900,
              fontSize: 13,
              letterSpacing: '0.08em',
              padding: '6px 14px',
              borderRadius: 30,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 4px 12px rgba(0, 208, 108, 0.3)',
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#000000',
                display: 'inline-block',
              }}
            />
            ACT {episode.toString().padStart(2, '0')} / {total.toString().padStart(2, '0')}
          </div>
        </MorphElement>
        <span
          style={{
            fontFamily: font.display,
            fontWeight: 800,
            fontSize: 20,
            letterSpacing: '-0.02em',
            color: ui.text,
          }}
        >
          {title}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <VoiceoverController currentEpisode={current} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: ui.green }} />
          <span style={{ fontFamily: font.mono, fontSize: 13, color: ui.green, fontWeight: 700 }}>
            ANIMATION ENGINE
          </span>
        </div>
        <div
          style={{
            fontFamily: font.mono,
            fontSize: 14,
            fontWeight: 700,
            color: ui.textMuted,
            background: '#FFFFFF',
            border: `1.5px solid ${ui.cardBorder}`,
            padding: '4px 12px',
            borderRadius: 12,
          }}
        >
          {current} <span style={{ opacity: 0.4 }}>/</span> {total}
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 1. JENSEN HUANG ACTOR (Leather Jacket, Anime Hair, Wild Comedic Expressions)
// ---------------------------------------------------------------------------
const JensenActor = ({
  mood = 'boss',
  size = 210,
}: {
  mood?: 'boss' | 'heart-eyes' | 'sweating' | 'rollercoaster' | 'sunglasses' | 'smug';
  size?: number;
}) => {
  const containerClass =
    mood === 'sunglasses'
      ? 'anim-swagger'
      : mood === 'sweating'
      ? 'anim-tremble'
      : mood === 'rollercoaster'
      ? ''
      : 'anim-groove';

  return (
    <div className={containerClass} style={{ width: size, height: size * 1.25, display: 'inline-block', position: 'relative' }}>
      <svg viewBox="0 0 200 250" width="100%" height="100%">
        {/* Neon Emerald Ambient Aura */}
        <circle cx="100" cy="115" r="78" fill={ui.greenSoft} />

        {/* Orbiting Green Electric Sparks in Boss Mode */}
        {mood === 'boss' && (
          <g transform="translate(100, 115)">
            <g className="anim-spark-orbit">
              <circle cx="0" cy="0" r="5" fill={ui.green} />
            </g>
            <g className="anim-spark-orbit" style={{ animationDelay: '-2s' }}>
              <circle cx="0" cy="0" r="4" fill="#FACC15" />
            </g>
          </g>
        )}

        {/* Rollercoaster Frantic Arms in the Air */}
        {mood === 'rollercoaster' ? (
          <g className="anim-flail-arms">
            <line x1="45" y1="160" x2="20" y2="80" stroke="#14171F" strokeWidth="16" strokeLinecap="round" />
            <circle cx="20" cy="75" r="12" fill="#FED7AA" stroke={ui.outline} strokeWidth="3" />
            <line x1="155" y1="160" x2="180" y2="80" stroke="#14171F" strokeWidth="16" strokeLinecap="round" />
            <circle cx="180" cy="75" r="12" fill="#FED7AA" stroke={ui.outline} strokeWidth="3" />
          </g>
        ) : null}

        {/* Signature Biker Leather Jacket Body */}
        <path d="M 45 175 L 26 245 L 174 245 L 155 175 L 138 138 L 62 138 Z" fill="#14171F" stroke={ui.outline} strokeWidth="3.5" />
        {/* Leather Lapels */}
        <polygon points="62,138 100,185 82,222 52,154" fill="#242936" stroke={ui.outline} strokeWidth="3" />
        <polygon points="138,138 100,185 118,222 148,154" fill="#242936" stroke={ui.outline} strokeWidth="3" />
        {/* Metal Heavy-Duty Biker Zipper & Chrome Snaps */}
        <line x1="102" y1="185" x2="108" y2="245" stroke="#94A3B8" strokeWidth="4" strokeDasharray="3 3" />
        <circle cx="70" cy="168" r="3.5" fill="#E2E8F0" stroke="#000" strokeWidth="1" />
        <circle cx="130" cy="168" r="3.5" fill="#E2E8F0" stroke="#000" strokeWidth="1" />

        {/* Neck */}
        <rect x="86" y="118" width="28" height="26" fill="#FDBA74" stroke={ui.outline} strokeWidth="3" rx="5" />

        {/* Head */}
        <ellipse cx="100" cy="92" rx="44" ry="48" fill="#FED7AA" stroke={ui.outline} strokeWidth="3.5" />

        {/* Cartoon Blush Spots when In Love */}
        {mood === 'heart-eyes' && (
          <g className="anim-blush">
            <ellipse cx="66" cy="106" rx="12" ry="7" fill="#FB7185" />
            <ellipse cx="134" cy="106" rx="12" ry="7" fill="#FB7185" />
            {/* Cartoon Steam Puffs from Ears */}
            <g transform="translate(50, 95)" className="anim-steam-l">
              <circle cx="0" cy="0" r="6" fill="#FFFFFF" opacity="0.8" />
              <circle cx="-6" cy="-4" r="4" fill="#FFFFFF" opacity="0.7" />
            </g>
            <g transform="translate(150, 95)" className="anim-steam-r">
              <circle cx="0" cy="0" r="6" fill="#FFFFFF" opacity="0.8" />
              <circle cx="6" cy="-4" r="4" fill="#FFFFFF" opacity="0.7" />
            </g>
          </g>
        )}

        {/* Silver Pompadour Hair (Blows back in rollercoaster, sways normally) */}
        {mood === 'rollercoaster' ? (
          <g className="anim-hair-wind">
            <path
              d="M 50 82 C 40 30, 20 10, 5 15 C 40 0, 90 10, 150 40 C 130 50, 100 40, 75 55 C 60 65, 54 75, 50 82 Z"
              fill="#F8FAFC"
              stroke={ui.outline}
              strokeWidth="3.5"
            />
          </g>
        ) : (
          <path
            d="M 52 82 C 48 30, 85 20, 116 24 C 148 20, 156 46, 152 82 C 140 46, 110 34, 96 42 C 80 34, 60 52, 52 82 Z"
            fill="#F8FAFC"
            stroke={ui.outline}
            strokeWidth="3.5"
          />
        )}

        {/* Eye Variations */}
        {mood === 'sunglasses' ? (
          <g>
            {/* Triple Deal-With-It Sunglasses */}
            <polygon points="54,74 96,74 90,104 62,104" fill="#0F172A" stroke={ui.green} strokeWidth="3.5" />
            <polygon points="104,74 146,74 138,104 110,104" fill="#0F172A" stroke={ui.green} strokeWidth="3.5" />
            <line x1="96" y1="84" x2="104" y2="84" stroke={ui.outline} strokeWidth="4" />
            {/* Sparkle Glint Star */}
            <g transform="translate(142, 74)" className="anim-glint">
              <polygon points="0,-9 2,-2 9,0 2,2 0,9 -2,2 -9,0 -2,-2" fill="#FACC15" />
            </g>
            {/* Smug Smirk */}
            <path d="M 88 116 Q 100 126 118 112" stroke={ui.outline} strokeWidth="3.5" fill="none" strokeLinecap="round" />
          </g>
        ) : mood === 'heart-eyes' ? (
          <g>
            <rect x="66" y="78" width="28" height="22" rx="7" fill="rgba(255,255,255,0.8)" stroke={ui.outline} strokeWidth="4" />
            <rect x="106" y="78" width="28" height="22" rx="7" fill="rgba(255,255,255,0.8)" stroke={ui.outline} strokeWidth="4" />
            <line x1="94" y1="89" x2="106" y2="89" stroke={ui.outline} strokeWidth="4" />
            {/* Giant Tex Avery Heart Eyes Popping Out on Boing */}
            <g className="anim-heart-boing" transform="translate(80, 89)">
              <path d="M 0 -5 C 0 -12, -10 -12, -10 -5 C -10 2, 0 8, 0 8 C 0 8, 10 2, 10 -5 C 10 -12, 0 -12, 0 -5 Z" fill="#F43F5E" stroke="#BE123C" strokeWidth="2" />
            </g>
            <g className="anim-heart-boing" transform="translate(120, 89)">
              <path d="M 0 -5 C 0 -12, -10 -12, -10 -5 C -10 2, 0 8, 0 8 C 0 8, 10 2, 10 -5 C 10 -12, 0 -12, 0 -5 Z" fill="#F43F5E" stroke="#BE123C" strokeWidth="2" />
            </g>
            {/* Jaw Dropping to Floor */}
            <g className="anim-jaw-drop">
              <ellipse cx="100" cy="122" rx="14" ry="10" fill="#991B1B" stroke={ui.outline} strokeWidth="2.5" />
              <path d="M 94 122 Q 100 136 106 122" fill="#FB7185" />
            </g>
          </g>
        ) : mood === 'sweating' ? (
          <g>
            <rect x="66" y="78" width="28" height="22" rx="7" fill="rgba(255,255,255,0.8)" stroke={ui.outline} strokeWidth="4" />
            <rect x="106" y="78" width="28" height="22" rx="7" fill="rgba(255,255,255,0.8)" stroke={ui.outline} strokeWidth="4" />
            <line x1="94" y1="89" x2="106" y2="89" stroke={ui.outline} strokeWidth="4" />
            {/* Terrified Darting Eyes */}
            <g className="anim-eye-dart">
              <circle cx="80" cy="89" r="4.5" fill="#0F172A" />
              <circle cx="120" cy="89" r="4.5" fill="#0F172A" />
              <circle cx="82" cy="87" r="1.5" fill="#FFFFFF" />
              <circle cx="122" cy="87" r="1.5" fill="#FFFFFF" />
            </g>
            {/* Chattering Shivering Teeth & Mouth */}
            <ellipse cx="100" cy="122" rx="12" ry="7" fill="#991B1B" stroke={ui.outline} strokeWidth="2" />
            <rect x="92" y="117" width="16" height="4" fill="#FFFFFF" rx="1" />
            {/* Anime Sweat / Tear Sprinkler Geysers */}
            <g transform="translate(52, 74)" className="anim-tear-l">
              <ellipse cx="0" cy="0" rx="7" ry="12" fill="#38BDF8" stroke={ui.outline} strokeWidth="1.5" />
              <ellipse cx="-12" cy="15" rx="5" ry="8" fill="#38BDF8" opacity="0.8" />
            </g>
            <g transform="translate(148, 74)" className="anim-tear-r">
              <ellipse cx="0" cy="0" rx="7" ry="12" fill="#38BDF8" stroke={ui.outline} strokeWidth="1.5" />
              <ellipse cx="12" cy="15" rx="5" ry="8" fill="#38BDF8" opacity="0.8" />
            </g>
          </g>
        ) : mood === 'rollercoaster' ? (
          <g>
            <rect x="66" y="76" width="28" height="22" rx="7" fill="rgba(255,255,255,0.8)" stroke={ui.outline} strokeWidth="4" />
            <rect x="106" y="76" width="28" height="22" rx="7" fill="rgba(255,255,255,0.8)" stroke={ui.outline} strokeWidth="4" />
            <line x1="94" y1="87" x2="106" y2="87" stroke={ui.outline} strokeWidth="4" />
            {/* Wide Shouting Screaming Eyes & Mouth */}
            <circle cx="80" cy="87" r="5" fill="#0F172A" />
            <circle cx="120" cy="87" r="5" fill="#0F172A" />
            <g className="anim-scream-mouth">
              <ellipse cx="100" cy="122" rx="15" ry="14" fill="#991B1B" stroke={ui.outline} strokeWidth="3" />
              <ellipse cx="100" cy="128" rx="8" ry="5" fill="#FB7185" />
            </g>
          </g>
        ) : (
          <g>
            {/* Default Confident Boss Glasses */}
            <rect x="66" y="78" width="28" height="22" rx="7" fill="rgba(255,255,255,0.8)" stroke={ui.outline} strokeWidth="4" />
            <rect x="106" y="78" width="28" height="22" rx="7" fill="rgba(255,255,255,0.8)" stroke={ui.outline} strokeWidth="4" />
            <line x1="94" y1="89" x2="106" y2="89" stroke={ui.outline} strokeWidth="4" />
            <g className="anim-eye-dart">
              <circle cx="80" cy="89" r="4.5" fill="#0F172A" />
              <circle cx="120" cy="89" r="4.5" fill="#0F172A" />
              <circle cx="82" cy="87" r="1.5" fill="#FFFFFF" />
              <circle cx="122" cy="87" r="1.5" fill="#FFFFFF" />
            </g>
            <path d="M 88 116 Q 100 128 112 116" stroke={ui.outline} strokeWidth="3.5" fill="none" strokeLinecap="round" />
          </g>
        )}
      </svg>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 2. ALICE HUANG ACTOR (MSS Spy Antenna, Matrix Glasses, Jumping Olive Martini)
// ---------------------------------------------------------------------------
const AliceActor = ({ size = 210 }: { size?: number }) => (
  <div className="anim-groove" style={{ width: size, height: size * 1.25, display: 'inline-block', position: 'relative' }}>
    <svg viewBox="0 0 200 250" width="100%" height="100%">
      <circle cx="100" cy="115" r="78" fill={ui.pinkSoft} />

      {/* Secret MSS Transmitter Antenna sticking up behind hair */}
      <g transform="translate(136, 30)">
        <line x1="0" y1="20" x2="0" y2="0" stroke="#0F172A" strokeWidth="2.5" />
        <circle cx="0" cy="0" r="4.5" fill="#EF4444" className="anim-antenna-dot" />
      </g>

      {/* Deep Purple Trench Coat */}
      <path d="M 48 170 L 25 245 L 175 245 L 152 170 L 134 138 L 66 138 Z" fill="#4C1D4A" stroke={ui.outline} strokeWidth="3.5" />
      <polygon points="66,138 100,185 76,220 52,148" fill="#70246D" stroke={ui.outline} strokeWidth="2.5" />
      <polygon points="134,138 100,185 124,220 148,148" fill="#70246D" stroke={ui.outline} strokeWidth="2.5" />

      {/* Neck & Head */}
      <rect x="88" y="120" width="24" height="24" fill="#FDBA74" stroke={ui.outline} strokeWidth="3" rx="5" />
      <ellipse cx="100" cy="94" rx="40" ry="44" fill="#FED7AA" stroke={ui.outline} strokeWidth="3.5" />

      {/* Sleek Bob Hair */}
      <path
        d="M 52 115 C 46 40, 85 24, 115 28 C 150 24, 158 50, 152 115 C 142 90, 138 50, 100 48 C 65 50, 58 85, 52 115 Z"
        fill="#1E1B4B"
        stroke={ui.outline}
        strokeWidth="3.5"
      />

      {/* Devious Animated Arched Eyebrow */}
      <g className="anim-brow-arch">
        <path d="M 64 74 Q 80 66 94 74" stroke={ui.outline} strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M 106 74 Q 120 58 136 68" stroke={ui.outline} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      </g>

      {/* Femme Fatale Sunglasses with Matrix Lines */}
      <polygon points="60,80 95,80 88,102 66,102" fill="#0F172A" stroke={ui.pink} strokeWidth="3" />
      <polygon points="105,80 140,80 134,102 112,102" fill="#0F172A" stroke={ui.pink} strokeWidth="3" />
      <line x1="95" y1="86" x2="105" y2="86" stroke={ui.outline} strokeWidth="4" />
      {/* Matrix Reflection Glints */}
      <line x1="68" y1="84" x2="80" y2="96" stroke="#10B981" strokeWidth="2" opacity="0.9" strokeDasharray="3 2" />
      <line x1="114" y1="84" x2="126" y2="96" stroke="#10B981" strokeWidth="2" opacity="0.9" strokeDasharray="3 2" />

      {/* Twinkling Star Glint */}
      <g transform="translate(136, 80)" className="anim-glint">
        <polygon points="0,-7 2,-2 7,0 2,2 0,7 -2,2 -7,0 -2,-2" fill="#FFFFFF" />
      </g>

      {/* Crimson Red Smirk */}
      <path d="M 94 120 Q 106 128 114 118" stroke={ui.pink} strokeWidth="3.5" fill="none" strokeLinecap="round" />

      {/* Hand holding Martini with Jumping Olive and Splash Drops */}
      <g transform="translate(30, 185)">
        {/* Glass */}
        <polygon points="0,0 36,0 18,24" fill="rgba(255,255,255,0.7)" stroke={ui.outline} strokeWidth="2" />
        <line x1="18" y1="24" x2="18" y2="44" stroke={ui.outline} strokeWidth="2.5" />
        <ellipse cx="18" cy="44" rx="12" ry="4" fill="#E2E8F0" stroke={ui.outline} strokeWidth="2" />
        {/* Splash Drops */}
        <circle cx="10" cy="-6" r="2" fill="#38BDF8" className="anim-martini-drop" />
        <circle cx="26" cy="-8" r="2.5" fill="#38BDF8" className="anim-martini-drop" style={{ animationDelay: '0.4s' }} />
        {/* Backflipping Olive on Skewer */}
        <g className="anim-olive-flip">
          <line x1="8" y1="-8" x2="28" y2="10" stroke="#EF4444" strokeWidth="1.5" />
          <ellipse cx="18" cy="2" rx="4.5" ry="6" fill="#84CC16" stroke={ui.outline} strokeWidth="1" />
          <circle cx="18" cy="2" r="1.5" fill="#EF4444" />
        </g>
      </g>
    </svg>
  </div>
);

// ---------------------------------------------------------------------------
// 3. DONALD TRUMP ACTOR (Flying Bouffant Toupee, Accordion Arms, 6ft Pendulum Tie)
// ---------------------------------------------------------------------------
const TrumpActor = ({ size = 210 }: { size?: number }) => (
  <div style={{ width: size, height: size * 1.25, display: 'inline-block', position: 'relative' }}>
    <svg viewBox="0 0 200 250" width="100%" height="100%">
      <circle cx="100" cy="115" r="78" fill={ui.amberSoft} />

      {/* Navy Suit */}
      <path d="M 42 165 L 22 245 L 178 245 L 158 165 L 136 136 L 64 136 Z" fill="#1E293B" stroke={ui.outline} strokeWidth="3.5" />
      <polygon points="64,136 100,180 84,146" fill="#FFFFFF" />
      <polygon points="136,136 100,180 116,146" fill="#FFFFFF" />

      {/* Absurd 6ft Long Red Tie swinging wildly */}
      <g className="anim-tie-pendulum">
        <polygon points="94,172 106,172 118,248 100,254 82,248" fill="#EF4444" stroke={ui.outline} strokeWidth="2.5" />
      </g>

      {/* Orange-Tan Face & Neck */}
      <rect x="85" y="120" width="30" height="24" fill="#FDBA74" stroke={ui.outline} strokeWidth="3" rx="5" />
      <ellipse cx="100" cy="94" rx="44" ry="46" fill="#FB923C" stroke={ui.outline} strokeWidth="3.5" />

      {/* Golden Bouffant Toupee Flying Off Head like a UFO */}
      <g className="anim-toupee-fly">
        <path
          d="M 44 76 C 36 24, 80 14, 126 14 C 170 14, 170 38, 162 68 C 150 42, 120 30, 95 34 C 75 36, 56 50, 44 76 Z"
          fill="#FACC15"
          stroke={ui.outline}
          strokeWidth="3.5"
        />
        {/* Animated Fluttering Hair Strands */}
        <path d="M 120 16 Q 146 0 166 14" stroke={ui.outline} strokeWidth="3" fill="none" />
        <path d="M 80 18 Q 60 4 45 22" stroke={ui.outline} strokeWidth="2.5" fill="none" />
      </g>

      {/* Accordion Hands frantically squeezing */}
      <g className="anim-accordion-arms">
        <circle cx="28" cy="176" r="14" fill="#FB923C" stroke={ui.outline} strokeWidth="3" />
        <circle cx="172" cy="176" r="14" fill="#FB923C" stroke={ui.outline} strokeWidth="3" />
      </g>

      {/* Screaming Eyes */}
      <path d="M 72 88 Q 80 84 88 88" stroke={ui.outline} strokeWidth="3.5" fill="none" />
      <path d="M 112 88 Q 120 84 128 88" stroke={ui.outline} strokeWidth="3.5" fill="none" />
      <circle cx="80" cy="90" r="2.5" fill={ui.outline} />
      <circle cx="120" cy="90" r="2.5" fill={ui.outline} />

      {/* Massive Screaming Oval Mouth shouting continuous soundwaves */}
      <g className="anim-mouth-shout">
        <ellipse cx="100" cy="118" rx="15" ry="12" fill="#991B1B" stroke={ui.outline} strokeWidth="2.5" />
        <rect x="91" y="110" width="18" height="5" rx="2" fill="#FFFFFF" />
        <path d="M 94 124 Q 100 128 106 124" fill="#FB7185" />
      </g>
    </svg>
  </div>
);

// ---------------------------------------------------------------------------
// 4. THE FED INSPECTOR ACTOR (Police Siren Fedora, Panning Magnifying Glass)
// ---------------------------------------------------------------------------
const FedInspectorActor = ({ size = 210 }: { size?: number }) => (
  <div className="anim-groove" style={{ width: size, height: size * 1.25, display: 'inline-block', position: 'relative' }}>
    <svg viewBox="0 0 200 250" width="100%" height="100%">
      <circle cx="100" cy="115" r="78" fill={ui.blueSoft} />

      {/* Spinning Dual-Color Emergency Siren on Top of Fedora */}
      <g transform="translate(100, 24)" className="anim-siren-beacon">
        <polygon points="0,0 -20,-16 -12,-22" fill="#EF4444" opacity="0.85" />
        <polygon points="0,0 20,16 12,22" fill="#3B82F6" opacity="0.85" />
        <circle cx="0" cy="0" r="8" fill="#F8FAFC" stroke={ui.outline} strokeWidth="2" />
      </g>

      {/* Slate Gray Trench Coat */}
      <path d="M 42 165 L 22 245 L 178 245 L 158 165 L 136 136 L 64 136 Z" fill="#334155" stroke={ui.outline} strokeWidth="3.5" />
      <polygon points="64,136 100,180 84,146" fill="#FFFFFF" />
      <polygon points="136,136 100,180 116,146" fill="#FFFFFF" />
      {/* Gold Shield Badge */}
      <polygon points="68,180 78,175 88,180 84,196 78,202 72,196" fill="#FBBF24" stroke={ui.outline} strokeWidth="2" />

      {/* Head */}
      <ellipse cx="100" cy="98" rx="40" ry="44" fill="#FED7AA" stroke={ui.outline} strokeWidth="3.5" />

      {/* Fedora Hat */}
      <ellipse cx="100" cy="62" rx="58" ry="16" fill="#1E293B" stroke={ui.outline} strokeWidth="3" />
      <path d="M 66 60 C 66 32, 85 24, 100 25 C 115 24, 134 32, 134 60 Z" fill="#0F172A" />
      <rect x="68" y="52" width="64" height="8" fill="#38BDF8" />

      {/* Aviator Sunglasses */}
      <polygon points="62,88 94,88 88,108 68,108" fill="#0F172A" stroke={ui.blue} strokeWidth="2.5" />
      <polygon points="106,88 138,88 132,108 112,108" fill="#0F172A" stroke={ui.blue} strokeWidth="2.5" />
      <line x1="94" y1="94" x2="106" y2="94" stroke={ui.outline} strokeWidth="3.5" />

      {/* Stern Poker Face */}
      <line x1="90" y1="124" x2="110" y2="124" stroke={ui.outline} strokeWidth="3" strokeLinecap="round" />

      {/* Animated Panning Magnifying Glass */}
      <g className="anim-magnify-pan">
        <circle cx="150" cy="140" r="26" fill="rgba(56, 189, 248, 0.25)" stroke={ui.blue} strokeWidth="4" />
        <line x1="168" y1="158" x2="190" y2="185" stroke="#78350F" strokeWidth="7" strokeLinecap="round" />
        {/* Enlarged Detective Eye inside lens */}
        <circle cx="150" cy="140" r="10" fill="#FFFFFF" stroke={ui.outline} strokeWidth="2" />
        <circle cx="152" cy="140" r="5" fill="#0F172A" />
      </g>
    </svg>
  </div>
);

// ---------------------------------------------------------------------------
// 5. BLACKWELL B200 CHIP (High-Speed Dual Turbines, Glowing Copper Heatpipes)
// ---------------------------------------------------------------------------
const BlackwellB200 = ({ size = 160 }: { size?: number }) => (
  <div style={{ width: size, height: size * 0.65, display: 'inline-block' }}>
    <svg viewBox="0 0 160 100" width="100%" height="100%">
      {/* Industrial Heat Shield */}
      <rect x="6" y="8" width="148" height="84" rx="10" fill="#090D16" stroke={ui.green} strokeWidth="3.5" />

      {/* Gold PCIe Bus Fingers */}
      <line x1="30" y1="92" x2="130" y2="92" stroke="#F59E0B" strokeWidth="6" strokeDasharray="4 3" />
      {/* Copper Heatpipe Rails */}
      <path d="M 16 20 L 144 20" stroke="#EA580C" strokeWidth="2.5" />
      <path d="M 16 80 L 144 80" stroke="#EA580C" strokeWidth="2.5" />

      {/* High-speed animated turbines (Left & Right) */}
      <g transform="translate(48, 50)">
        <circle cx="0" cy="0" r="26" fill="#1E293B" stroke="#334155" strokeWidth="2.5" />
        <g className="anim-chip-fan">
          <circle cx="0" cy="0" r="8" fill={ui.green} />
          <line x1="-22" y1="0" x2="22" y2="0" stroke="#64748B" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="0" y1="-22" x2="0" y2="22" stroke="#64748B" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="-16" y1="-16" x2="16" y2="16" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="16" y1="-16" x2="-16" y2="16" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </g>
      <g transform="translate(112, 50)">
        <circle cx="0" cy="0" r="26" fill="#1E293B" stroke="#334155" strokeWidth="2.5" />
        <g className="anim-chip-fan">
          <circle cx="0" cy="0" r="8" fill={ui.green} />
          <line x1="-22" y1="0" x2="22" y2="0" stroke="#64748B" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="0" y1="-22" x2="0" y2="22" stroke="#64748B" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="-16" y1="-16" x2="16" y2="16" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="16" y1="-16" x2="-16" y2="16" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </g>

      {/* Center B200 Neon Badge */}
      <rect x="64" y="14" width="32" height="12" rx="3" fill={ui.green} />
      <text x="80" y="23" fill="#000" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
        B200
      </text>
    </svg>
  </div>
);

// ---------------------------------------------------------------------------
// SLIDE 1: THE EMPEROR OF COMPUTE (HEXAGON THRONE & LIVE TICKER TAPE)
// ---------------------------------------------------------------------------
const Slide1Kingpin: Page = () => (
  <div style={canvasStyle}>
    <KeynoteNavBar episode={1} title="THE EMPEROR OF COMPUTE" />

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, position: 'relative' }}>
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <h1
          style={{
            fontFamily: font.display,
            fontSize: 76,
            fontWeight: 900,
            letterSpacing: '-0.03em',
            margin: '0 0 8px 0',
            color: ui.text,
          }}
        >
          Jensen. <span style={{ color: ui.green }}>Emperor of AI.</span>
        </h1>
        <p style={{ fontFamily: font.display, fontSize: 26, color: ui.textMuted, margin: 0, fontWeight: 600 }}>
          $3,500,000,000,000 Monopoly. Total Sovereign Dominance. One Untouchable Jacket.
        </p>
      </div>

      {/* Visual Setpiece: The Compute Pyramid Throne & Laser Pillars */}
      <div style={{ position: 'relative', width: 900, height: 440, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <svg viewBox="0 0 900 440" width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
          {/* Hexagonal Throne */}
          <polygon points="450,240 620,320 620,410 450,440 280,410 280,320" fill="#FFFFFF" stroke={ui.cardBorder} strokeWidth="3" />
          <polygon points="450,240 620,320 450,360 280,320" fill={ui.greenSoft} stroke={ui.greenBorder} strokeWidth="2" />

          {/* Left Server Monolith with Green Laser Beam */}
          <rect x="110" y="150" width="110" height="250" rx="12" fill="#0F172A" stroke={ui.green} strokeWidth="3" />
          <line x1="165" y1="150" x2="165" y2="20" stroke={ui.green} strokeWidth="4" strokeDasharray="8 6" className="anim-conveyor" />
          <polygon points="155,20 175,20 165,5" fill={ui.green} />
          <line x1="130" y1="200" x2="200" y2="200" stroke={ui.green} strokeWidth="3" strokeDasharray="8 4" />
          <line x1="130" y1="240" x2="200" y2="240" stroke={ui.green} strokeWidth="3" strokeDasharray="8 4" />
          <line x1="130" y1="280" x2="200" y2="280" stroke={ui.green} strokeWidth="3" strokeDasharray="8 4" />

          {/* Right Server Monolith with Green Laser Beam */}
          <rect x="680" y="150" width="110" height="250" rx="12" fill="#0F172A" stroke={ui.green} strokeWidth="3" />
          <line x1="735" y1="150" x2="735" y2="20" stroke={ui.green} strokeWidth="4" strokeDasharray="8 6" className="anim-conveyor" />
          <polygon points="725,20 745,20 735,5" fill={ui.green} />
          <line x1="700" y1="200" x2="770" y2="200" stroke={ui.green} strokeWidth="3" strokeDasharray="8 4" />
          <line x1="700" y1="240" x2="770" y2="240" stroke={ui.green} strokeWidth="3" strokeDasharray="8 4" />
          <line x1="700" y1="280" x2="770" y2="280" stroke={ui.green} strokeWidth="3" strokeDasharray="8 4" />

          {/* Floating Metric Badges */}
          <g transform="translate(180, 80)">
            <rect x="0" y="0" width="130" height="34" rx="8" fill="#FFFFFF" stroke={ui.greenBorder} strokeWidth="2" />
            <text x="65" y="22" fill={ui.green} fontSize="13" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">
              CUDA MOAT: 100%
            </text>
          </g>
          <g transform="translate(590, 80)">
            <rect x="0" y="0" width="140" height="34" rx="8" fill="#FFFFFF" stroke={ui.greenBorder} strokeWidth="2" />
            <text x="70" y="22" fill={ui.green} fontSize="13" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">
              MARKET CAP: $3.5T
            </text>
          </g>
        </svg>

        {/* Jensen Centered with Blackwell B200 */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: -30 }}>
          <MorphElement id="actor-jensen">
            <div>
              <JensenActor mood="boss" size={240} />
            </div>
          </MorphElement>
          <div style={{ marginTop: -20 }}>
            <MorphElement id="actor-gpu">
              <div>
                <BlackwellB200 size={170} />
              </div>
            </MorphElement>
          </div>
        </div>
      </div>

      {/* High-Tech Animated Telemetry Ticker Tape */}
      <div
        style={{
          width: 900,
          overflow: 'hidden',
          background: '#0F172A',
          borderRadius: 14,
          padding: '8px 16px',
          marginTop: 10,
          whiteSpace: 'nowrap',
          border: `1.5px solid ${ui.green}`,
          position: 'relative',
        }}
      >
        <div className="anim-ticker" style={{ display: 'inline-block', fontFamily: font.mono, fontSize: 13, fontWeight: 700, color: ui.green }}>
          NASDAQ: NVDA ▲ $148.50 (+940% YoY) · B200 SHIPMENTS: 1,000,000+ UNITS · TSMC CAPACITY: 100% RESERVED · COMPETITION: 0% THREAT · SOVEREIGN COMPUTE EMPIRE INTACT · ALL SYSTEMS OPERATIONAL · 
          NASDAQ: NVDA ▲ $148.50 (+940% YoY) · B200 SHIPMENTS: 1,000,000+ UNITS · TSMC CAPACITY: 100% RESERVED · COMPETITION: 0% THREAT · SOVEREIGN COMPUTE EMPIRE INTACT · ALL SYSTEMS OPERATIONAL · 
        </div>
      </div>
    </div>

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${ui.cardBorder}`, paddingTop: 14, fontSize: 13, fontFamily: font.mono, color: ui.textMuted }}>
      <span>HIGH-END VECTOR ANIMATION · PRO ANIMATOR MOTION ENGINE</span>
      <span>EVERYTHING WAS PERFECT UNTIL SINGAPORE ➡️</span>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// SLIDE 2: OPERATION HONEY-CHIP (SINGAPORE ROOFTOP & FLOATING KISS)
// ---------------------------------------------------------------------------
const Slide2Honeytrap: Page = () => (
  <div style={canvasStyle}>
    <KeynoteNavBar episode={2} title="THE RENDEZVOUS" />

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <h2 style={{ fontFamily: font.display, fontSize: 62, fontWeight: 900, margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
          Singapore. <span style={{ color: ui.pink }}>11:42 PM.</span>
        </h2>
        <p style={{ fontSize: 24, color: ui.textMuted, margin: 0, fontWeight: 500 }}>
          U.S. Intelligence detects Alice Huang (Megaspeed): An alleged asset of Beijing’s Ministry of State Security.
        </p>
      </div>

      {/* The Visual Encounter Setpiece with Marina Bay Sands Backdrop */}
      <div
        style={{
          width: 1050,
          height: 450,
          background: '#FFFFFF',
          border: `2px solid ${ui.cardBorder}`,
          borderRadius: 28,
          boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          position: 'relative',
          padding: '0 40px',
        }}
      >
        {/* Floating Animated Kiss moving from Alice to Jensen */}
        <div style={{ position: 'absolute', top: 120, right: 380 }} className="anim-kiss-float">
          <svg viewBox="0 0 40 40" width="36" height="36">
            <path d="M 20 10 C 20 4, 8 4, 8 14 C 8 22, 20 32, 20 32 C 20 32, 32 22, 32 14 C 32 4, 20 4, 20 10 Z" fill={ui.pink} />
            <polygon points="34,10 38,12 34,14" fill="#FACC15" />
          </svg>
        </div>

        {/* Jensen with Tex Avery Boing Heart Eyes & Steam Puffs */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <MorphElement id="actor-jensen">
            <div>
              <JensenActor mood="heart-eyes" size={210} />
            </div>
          </MorphElement>
          <span style={{ fontFamily: font.display, fontWeight: 800, fontSize: 18, color: ui.pink, marginTop: 6 }}>
            "She Really Loves CUDA!"
          </span>
        </div>

        {/* The Connection Diagram: Shattered Electric Heart & $2B Contract */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          {/* Custom Drawn Vector Electric Heart */}
          <svg viewBox="0 0 100 90" width="90" height="80">
            <path d="M 50 25 C 50 10, 20 10, 20 35 C 20 55, 50 78, 50 78 C 50 78, 80 55, 80 35 C 80 10, 50 10, 50 25 Z" fill={ui.pinkSoft} stroke={ui.pink} strokeWidth="3.5" />
            <polyline points="48,20 56,42 44,48 54,72" fill="none" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
          </svg>

          {/* Morphable Blackwell Chip */}
          <MorphElement id="actor-gpu">
            <div>
              <BlackwellB200 size={140} />
            </div>
          </MorphElement>

          <span style={{ background: ui.pinkSoft, color: ui.pink, border: `1.5px solid ${ui.pinkBorder}`, fontFamily: font.mono, fontWeight: 800, fontSize: 14, padding: '5px 14px', borderRadius: 20 }}>
            $2,000,000,000 CONTRACT
          </span>
        </div>

        {/* Alice with Devious Arched Eyebrow & Martini */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <MorphElement id="actor-alice">
            <div>
              <AliceActor size={210} />
            </div>
          </MorphElement>
          <span style={{ fontFamily: font.display, fontWeight: 800, fontSize: 18, color: ui.pink, marginTop: 6 }}>
            Alice Huang (Megaspeed)
          </span>
        </div>
      </div>
    </div>

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${ui.cardBorder}`, paddingTop: 14, fontSize: 13, fontFamily: font.mono, color: ui.textMuted }}>
      <span>ACT 02 · OPERATION HONEY-CHIP</span>
      <span>NEXT: THE SMUGGLING PIPELINE ➡️</span>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// SLIDE 3: THE TRANSSHIPMENT PIPELINE (MOTORIZED CONVEYOR & SATELLITE RADAR)
// ---------------------------------------------------------------------------
const Slide3Heist: Page = () => (
  <div style={canvasStyle}>
    <KeynoteNavBar episode={3} title="THE TRANSSHIPMENT HEIST" />

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <h2 style={{ fontFamily: font.display, fontSize: 62, fontWeight: 900, margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
          The <span style={{ color: ui.amber }}>Transshipment</span> Route.
        </h2>
        <p style={{ fontSize: 24, color: ui.textMuted, margin: 0, fontWeight: 500 }}>
          How 50,000 GPUs shipped to Singapore — and raised federal sanctions evasion alarms.
        </p>
      </div>

      {/* Animated Freight Conveyor Setpiece */}
      <div
        style={{
          width: 1080,
          height: 450,
          background: '#FFFFFF',
          border: `2px solid ${ui.cardBorder}`,
          borderRadius: 28,
          boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.08)',
          position: 'relative',
          padding: 24,
        }}
      >
        <svg viewBox="0 0 1030 400" width="100%" height="100%">
          <rect x="20" y="20" width="990" height="360" rx="20" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />

          {/* Motorized Gear 1 */}
          <g transform="translate(200, 200)" className="anim-gear-cw">
            <circle cx="0" cy="0" r="16" fill="#CBD5E1" stroke="#475569" strokeWidth="2" />
            <line x1="-16" y1="0" x2="16" y2="0" stroke="#0F172A" strokeWidth="3" />
            <line x1="0" y1="-16" x2="0" y2="16" stroke="#0F172A" strokeWidth="3" />
          </g>

          {/* Node 1: Santa Clara HQ */}
          <g transform="translate(140, 200)">
            <circle cx="0" cy="0" r="48" fill={ui.greenSoft} stroke={ui.green} strokeWidth="3.5" />
            <rect x="-24" y="-20" width="48" height="40" rx="6" fill="#0F172A" />
            <text x="0" y="32" fill={ui.text} fontSize="14" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">SANTA CLARA</text>
            <text x="0" y="46" fill={ui.green} fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">NVIDIA HQ</text>
          </g>

          {/* Conveyor Line 1 (Green Legal Flow) */}
          <path d="M 195 200 Q 340 140 480 230" fill="none" stroke={ui.green} strokeWidth="7" className="anim-conveyor" />
          <rect x="290" y="150" width="140" height="30" rx="8" fill="#FFFFFF" stroke={ui.green} strokeWidth="2" />
          <text x="360" y="170" fill={ui.green} fontSize="12" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">
            50,000 LEGAL CHIPS
          </text>

          {/* Bobbing Ocean Cargo Ship */}
          <g transform="translate(350, 270)" className="anim-ship-bob">
            <polygon points="-25,10 25,10 20,24 -20,24" fill="#0284C7" stroke={ui.outline} strokeWidth="2" />
            <rect x="-8" y="0" width="16" height="10" fill="#FFFFFF" stroke={ui.outline} strokeWidth="1.5" />
            <rect x="-3" y="-8" width="6" height="8" fill="#EF4444" />
            {/* Smoke Puff from Chimney */}
            <circle cx="0" cy="-12" r="4" fill="#94A3B8" className="anim-smoke-puff" />
          </g>

          {/* Node 2: Singapore (Megaspeed Hub) */}
          <g transform="translate(520, 240)">
            <circle cx="0" cy="0" r="54" fill={ui.pinkSoft} stroke={ui.pink} strokeWidth="4" />
            <rect x="-26" y="-22" width="52" height="44" rx="6" fill="#4C1D4A" />
            <text x="0" y="34" fill={ui.text} fontSize="14" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">SINGAPORE</text>
            <text x="0" y="48" fill={ui.pink} fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">MEGASPEED</text>
          </g>

          {/* Conveyor Line 2 (Dashed Red Tunnel to Shenzhen) */}
          <path d="M 580 230 Q 710 210 820 160" fill="none" stroke={ui.pink} strokeWidth="7" strokeDasharray="8 6" className="anim-conveyor" />
          <rect x="660" y="170" width="140" height="30" rx="8" fill="#FFFFFF" stroke={ui.pink} strokeWidth="2" />
          <text x="730" y="190" fill={ui.pink} fontSize="12" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">
            "REMOTE LEASING"
          </text>

          {/* Node 3: Shenzhen Vault */}
          <g transform="translate(860, 160)">
            <circle cx="0" cy="0" r="48" fill="#FEF2F2" stroke="#EF4444" strokeWidth="3.5" />
            <rect x="-24" y="-20" width="48" height="40" rx="6" fill="#991B1B" />
            <text x="0" y="32" fill={ui.text} fontSize="14" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">SHENZHEN</text>
            <text x="0" y="46" fill="#EF4444" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">AI CLUSTERS?</text>
          </g>

          {/* Overhead Commerce Satellite Laser Scan */}
          <g transform="translate(500, 65)">
            <circle cx="30" cy="30" r="28" fill={ui.blueSoft} stroke={ui.blue} strokeWidth="2.5" />
            <g className="anim-radar-cone">
              <line x1="30" y1="30" x2="30" y2="130" stroke="#38BDF8" strokeWidth="3" strokeDasharray="4 2" />
              <polygon points="10,130 50,130 30,30" fill="rgba(56, 189, 248, 0.2)" />
            </g>
            <text x="30" y="76" fill={ui.blue} fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">
              U.S. COMMERCE WATCH
            </text>
          </g>
        </svg>

        {/* Morphable Actors in Transit */}
        <div style={{ position: 'absolute', bottom: 30, left: 60 }}>
          <MorphElement id="actor-jensen">
            <div>
              <JensenActor mood="smug" size={130} />
            </div>
          </MorphElement>
        </div>
        <div style={{ position: 'absolute', bottom: 30, right: 60 }}>
          <MorphElement id="actor-alice">
            <div>
              <AliceActor size={130} />
            </div>
          </MorphElement>
        </div>
      </div>
    </div>

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${ui.cardBorder}`, paddingTop: 14, fontSize: 13, fontFamily: font.mono, color: ui.textMuted }}>
      <span>ACT 03 · THE TRANSSHIPMENT PIPELINE</span>
      <span>NEXT: THE 2:00 AM CONFESSION ➡️</span>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// SLIDE 4: THE ALL-HANDS CONFESSION (WATERWORKS FOUNTAIN & BUZZING SLACK)
// ---------------------------------------------------------------------------
const Slide4Confession: Page = () => (
  <div style={canvasStyle}>
    <KeynoteNavBar episode={4} title="THE CONFESSION" />

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, position: 'relative' }}>
      {/* Oscillating Dramatic Theater Spotlight */}
      <div style={{ position: 'absolute', top: -40, left: 240, pointerEvents: 'none' }} className="anim-spotlight">
        <svg viewBox="0 0 400 600" width="400" height="600">
          <polygon points="200,0 50,600 350,600" fill="rgba(255, 255, 255, 0.35)" />
        </svg>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <h2 style={{ fontFamily: font.display, fontSize: 62, fontWeight: 900, margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
          The <span style={{ color: ui.pink }}>2:00 AM</span> All-Hands Email.
        </h2>
        <p style={{ fontSize: 24, color: ui.textMuted, margin: 0, fontWeight: 500 }}>
          Jensen breaks the news himself in an extraordinary mea culpa to all 30,000 employees.
        </p>
      </div>

      {/* Theatrical Stage with Podium & Waterworks Jensen */}
      <div
        style={{
          width: 1050,
          height: 450,
          background: '#FFFFFF',
          border: `2px solid ${ui.cardBorder}`,
          borderRadius: 28,
          boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0 40px',
          position: 'relative',
        }}
      >
        {/* Jensen Sweating Waterworks at the Press Microphone Podium */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          {/* Buzzing Smartphone with Notification Bubbles Rising */}
          <div style={{ position: 'absolute', top: -30, left: -40 }} className="anim-bubble-1">
            <span style={{ background: '#EF4444', color: '#FFF', fontSize: 11, fontWeight: 800, padding: '4px 10px', borderRadius: 20 }}>
              SLACK: 32,490 UNREAD!
            </span>
          </div>
          <div style={{ position: 'absolute', top: -50, right: -40 }} className="anim-bubble-2">
            <span style={{ background: ui.pink, color: '#FFF', fontSize: 11, fontWeight: 800, padding: '4px 10px', borderRadius: 20 }}>
              REPLY-ALL: OOPS!
            </span>
          </div>

          <MorphElement id="actor-jensen">
            <div>
              <JensenActor mood="sweating" size={230} />
            </div>
          </MorphElement>

          {/* Microphones Podium with Vibrating Buzzing Phone */}
          <div style={{ width: 140, height: 46, background: '#1E293B', borderRadius: 10, marginTop: -15, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
            <div className="anim-buzz-phone" style={{ width: 12, height: 20, background: '#38BDF8', borderRadius: 3 }} />
            <span style={{ color: '#FFFFFF', fontFamily: font.mono, fontSize: 12, fontWeight: 800 }}>PRESS LECTERN</span>
          </div>
        </div>

        {/* Leaked Email Display Card */}
        <div
          style={{
            width: 480,
            background: ui.pinkSoft,
            border: `2px solid ${ui.pinkBorder}`,
            borderRadius: 24,
            padding: '28px 32px',
            boxShadow: '0 12px 28px -6px rgba(244, 63, 94, 0.12)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontFamily: font.mono, fontSize: 12, fontWeight: 800, color: ui.pink }}>
              INTERNAL EMAIL · FROM JENSEN HUANG
            </span>
            <span style={{ background: ui.pink, color: '#FFF', fontSize: 11, fontWeight: 800, padding: '2px 8px', borderRadius: 4 }}>
              CONFIDENTIAL
            </span>
          </div>

          <p
            style={{
              fontFamily: '"Georgia", serif',
              fontStyle: 'italic',
              fontSize: 24,
              lineHeight: 1.45,
              color: ui.text,
              margin: '0 0 16px 0',
            }}
          >
            "I was unfaithful to my wife. My actions hurt her and our children. There is no excuse for what I did. I am deeply sorry... I take full responsibility."
          </p>

          <div style={{ borderTop: `1px solid ${ui.pinkBorder}`, paddingTop: 12, display: 'flex', justifyContent: 'space-between', fontSize: 13, fontFamily: font.mono, color: ui.pink, fontWeight: 700 }}>
            <span>NO TECH SECRETS COMPROMISED</span>
            <span>FULL AUDIT SUBMITTED</span>
          </div>
        </div>

        {/* Blackwell Chip Protected Behind Lock */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <MorphElement id="actor-gpu">
            <div>
              <BlackwellB200 size={140} />
            </div>
          </MorphElement>
          <span style={{ background: ui.greenSoft, color: ui.green, border: `1.5px solid ${ui.greenBorder}`, fontFamily: font.mono, fontSize: 12, fontWeight: 800, padding: '4px 12px', borderRadius: 12, marginTop: 10 }}>
            BLUEPRINTS LOCKED
          </span>
        </div>
      </div>
    </div>

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${ui.cardBorder}`, paddingTop: 14, fontSize: 13, fontFamily: font.mono, color: ui.textMuted }}>
      <span>ACT 04 · THE ALL-HANDS CONFESSION</span>
      <span>NEXT: WASHINGTON DEFCON 1 ➡️</span>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// SLIDE 5: WASHINGTON DEFCON 1 (TOUPEE FLIGHT & SLAMMING GAVEL CRACK)
// ---------------------------------------------------------------------------
const Slide5Washington: Page = () => (
  <div style={canvasStyle}>
    <KeynoteNavBar episode={5} title="CAPITOL HILL INQUIRY" />

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <h2 style={{ fontFamily: font.display, fontSize: 62, fontWeight: 900, margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
          Washington Goes <span style={{ color: ui.amber }}>DEFCON 1.</span>
        </h2>
        <p style={{ fontSize: 24, color: ui.textMuted, margin: 0, fontWeight: 500 }}>
          Donald Trump and Congress turn the semiconductor affair into a national security spectacle.
        </p>
      </div>

      {/* The Congressional Circus Stage */}
      <div
        style={{
          width: 1050,
          height: 450,
          background: '#FFFFFF',
          border: `2px solid ${ui.cardBorder}`,
          borderRadius: 28,
          boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0 40px',
        }}
      >
        {/* Trump with Flying Toupee & Megaphone Soundwaves */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          {/* Concentric Megaphone Soundwave Rings */}
          <div style={{ position: 'absolute', top: 50, right: -40, pointerEvents: 'none' }}>
            <svg viewBox="0 0 100 100" width="80" height="80">
              <circle cx="50" cy="50" r="10" fill="none" stroke={ui.amber} strokeWidth="3" className="anim-sound-ring" />
              <circle cx="50" cy="50" r="25" fill="none" stroke={ui.amber} strokeWidth="2" className="anim-sound-ring" style={{ animationDelay: '0.4s' }} />
            </svg>
          </div>

          <MorphElement id="actor-trump">
            <div>
              <TrumpActor size={210} />
            </div>
          </MorphElement>
          <div
            style={{
              background: ui.amberSoft,
              border: `1.5px solid ${ui.amberBorder}`,
              borderRadius: 14,
              padding: '10px 16px',
              marginTop: 6,
              fontWeight: 800,
              fontSize: 14,
              color: ui.text,
              textAlign: 'center',
              maxWidth: 240,
            }}
          >
            "HE GOT PLAYED! NO MORE CHIPS FOR BEIJING!"
          </div>
        </div>

        {/* Slamming Congressional Gavel Animation with Comic Shockwaves */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          <svg viewBox="0 0 180 180" width="180" height="180">
            {/* Comic Starburst Acoustic Shockwave */}
            <g className="anim-comic-burst">
              <circle cx="90" cy="120" r="35" fill="none" stroke={ui.amber} strokeWidth="4" />
              <circle cx="90" cy="120" r="60" fill="none" stroke={ui.amber} strokeWidth="2" strokeDasharray="6 4" />
            </g>
            {/* Sound Block */}
            <rect x="55" y="120" width="70" height="20" rx="4" fill="#334155" />
            {/* Slamming Wooden Gavel */}
            <g className="anim-gavel-slam">
              <line x1="90" y1="85" x2="150" y2="45" stroke="#854D0E" strokeWidth="9" strokeLinecap="round" />
              <rect x="66" y="74" width="48" height="28" rx="5" fill="#A16207" stroke="#78350F" strokeWidth="2.5" />
            </g>
          </svg>
          <span style={{ fontFamily: font.display, fontSize: 30, fontWeight: 900, color: ui.amber, marginTop: -15 }}>
            BAM!
          </span>
          <span style={{ fontFamily: font.mono, fontSize: 13, color: ui.textMuted, fontWeight: 700 }}>
            HOUSE SELECT COMMITTEE
          </span>
        </div>

        {/* Jensen Behind His Shield */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <MorphElement id="actor-jensen">
            <div>
              <JensenActor mood="sweating" size={200} />
            </div>
          </MorphElement>
          <div style={{ marginTop: 6 }}>
            <MorphElement id="actor-gpu">
              <div>
                <BlackwellB200 size={130} />
              </div>
            </MorphElement>
          </div>
        </div>
      </div>
    </div>

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${ui.cardBorder}`, paddingTop: 14, fontSize: 13, fontFamily: font.mono, color: ui.textMuted }}>
      <span>ACT 05 · CAPITOL HILL INQUIRY</span>
      <span>NEXT: THE FORENSIC POLYGRAPH SCANNER ➡️</span>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// SLIDE 6: THE FORENSIC SCANNER (VERTICAL LASER SCAN & OSCILLOSCOPE WAVE)
// ---------------------------------------------------------------------------
const Slide6Polygraph: Page = () => (
  <div style={canvasStyle}>
    <KeynoteNavBar episode={6} title="THE CRIME LAB SCAN" />

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <h2 style={{ fontFamily: font.display, fontSize: 62, fontWeight: 900, margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
          The <span style={{ color: ui.blue }}>Forensic</span> Scanner.
        </h2>
        <p style={{ fontSize: 24, color: ui.textMuted, margin: 0, fontWeight: 500 }}>
          Independent directors and forensic cyber auditors inspect every laptop, message, and chip blueprint.
        </p>
      </div>

      {/* Futuristic X-Ray Scanner Setpiece */}
      <div
        style={{
          width: 1050,
          height: 450,
          background: '#FFFFFF',
          border: `2px solid ${ui.cardBorder}`,
          borderRadius: 28,
          boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0 40px',
          position: 'relative',
        }}
      >
        {/* The Fed Inspector with Dual-Color Police Beacon & Magnifier */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <MorphElement id="actor-fed">
            <div>
              <FedInspectorActor size={210} />
            </div>
          </MorphElement>
          <span style={{ fontFamily: font.mono, fontSize: 13, fontWeight: 800, color: ui.blue, marginTop: 8 }}>
            INDEPENDENT COUNSEL
          </span>
        </div>

        {/* Digital X-Ray Diagnostic Display with Real Oscilloscope Polygraph Wave */}
        <div
          style={{
            width: 440,
            background: '#0F172A',
            borderRadius: 20,
            padding: '24px 28px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Moving Vertical Laser Scanner Beam */}
          <div
            className="anim-laser-scan"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: 4,
              background: 'linear-gradient(90deg, transparent, #38BDF8, #00D06C, transparent)',
              boxShadow: '0 0 15px #38BDF8',
              pointerEvents: 'none',
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: 10 }}>
            <span style={{ fontFamily: font.mono, fontSize: 13, color: ui.blue, fontWeight: 800 }}>POLYGRAPH AUDIT SCAN</span>
            <span style={{ fontFamily: font.mono, fontSize: 13, color: ui.green, fontWeight: 800 }}>COMPLETED</span>
          </div>

          {/* Continuous Polygraph Heartbeat Wave */}
          <svg viewBox="0 0 380 40" width="100%" height="35">
            <path
              d="M 0 20 L 50 20 L 70 5 L 85 35 L 100 20 L 160 20 L 175 2 L 195 38 L 210 20 L 280 20 L 300 8 L 320 32 L 340 20 L 380 20"
              fill="none"
              stroke={ui.green}
              strokeWidth="2.5"
              className="anim-poly-wave"
            />
          </svg>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 600 }}>Personal Conduct:</span>
            <span style={{ background: ui.pink, color: '#FFFFFF', fontWeight: 800, fontSize: 12, padding: '4px 10px', borderRadius: 6 }}>
              GUILTY (AFFAIR)
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 600 }}>Blackwell Blueprints:</span>
            <span style={{ background: ui.green, color: '#000000', fontWeight: 800, fontSize: 12, padding: '4px 10px', borderRadius: 6 }}>
              100% SECURE
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 600 }}>National Security:</span>
            <span style={{ background: ui.green, color: '#000000', fontWeight: 800, fontSize: 12, padding: '4px 10px', borderRadius: 6 }}>
              ZERO LEAKS
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 600 }}>CEO Tenure:</span>
            <span style={{ background: ui.amber, color: '#000000', fontWeight: 800, fontSize: 12, padding: '4px 10px', borderRadius: 6 }}>
              UNANIMOUS BACKING
            </span>
          </div>
        </div>

        {/* Jensen & Chip Passing the Scanner */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <MorphElement id="actor-jensen">
            <div>
              <JensenActor mood="smug" size={190} />
            </div>
          </MorphElement>
          <div style={{ marginTop: 6 }}>
            <MorphElement id="actor-gpu">
              <div>
                <BlackwellB200 size={120} />
              </div>
            </MorphElement>
          </div>
        </div>
      </div>
    </div>

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${ui.cardBorder}`, paddingTop: 14, fontSize: 13, fontFamily: font.mono, color: ui.textMuted }}>
      <span>ACT 06 · FORENSIC CLEARANCE</span>
      <span>NEXT: THE ROLLERCOASTER MARKET REBOUND ➡️</span>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// SLIDE 7: THE 3-HOUR ROLLERCOASTER (SCREAMING JENSEN & ROCKET REBOUND)
// ---------------------------------------------------------------------------
const Slide7Rollercoaster: Page = () => (
  <div style={canvasStyle}>
    <KeynoteNavBar episode={7} title="THE MARKET ROLLERCOASTER" />

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <h2 style={{ fontFamily: font.display, fontSize: 62, fontWeight: 900, margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
          The <span style={{ color: ui.green }}>3-Hour</span> Panic.
        </h2>
        <p style={{ fontSize: 24, color: ui.textMuted, margin: 0, fontWeight: 500 }}>
          Premarket algorithms panicked for 180 minutes — until Wall Street remembered CUDA has no competition.
        </p>
      </div>

      {/* Massive Rollercoaster Track Visual with Screaming Jensen in Cart */}
      <div
        style={{
          width: 1050,
          height: 450,
          background: '#FFFFFF',
          border: `2px solid ${ui.cardBorder}`,
          borderRadius: 28,
          boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.08)',
          position: 'relative',
          padding: '20px 40px',
        }}
      >
        <svg viewBox="0 0 970 380" width="100%" height="100%">
          <line x1="40" y1="90" x2="930" y2="90" stroke="#F1F5F9" strokeWidth="2" />
          <line x1="40" y1="190" x2="930" y2="190" stroke="#F1F5F9" strokeWidth="2" />
          <line x1="40" y1="290" x2="930" y2="290" stroke="#F1F5F9" strokeWidth="2" />

          {/* High Energy Rollercoaster Track */}
          <path
            d="M 60 270 Q 200 240 300 110 Q 370 40 450 160 Q 520 310 600 270 Q 700 80 880 50"
            fill="none"
            stroke={ui.green}
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* AI Climb Peak */}
          <circle cx="300" cy="110" r="10" fill={ui.amber} stroke="#FFFFFF" strokeWidth="3" />
          <text x="300" y="85" fill={ui.amber} fontSize="14" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">
            AI HYPE ROCKET
          </text>

          {/* Spy Drop Plunge */}
          <circle cx="520" cy="310" r="12" fill={ui.pink} stroke="#FFFFFF" strokeWidth="3" />
          <text x="520" y="344" fill={ui.pink} fontSize="14" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">
            -$120B PREMARKET PANIC
          </text>

          {/* Trampoline Rebound Moat */}
          <rect x="560" y="270" width="110" height="26" rx="6" fill={ui.greenSoft} stroke={ui.green} strokeWidth="2" />
          <text x="615" y="288" fill={ui.green} fontSize="12" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">
            CUDA MOAT
          </text>

          {/* All-Time High Rocket Explosion */}
          <circle cx="880" cy="50" r="14" fill={ui.green} stroke="#FFFFFF" strokeWidth="3" />
          <text x="880" y="30" fill={ui.green} fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
            +$250B NEW RECORD
          </text>
        </svg>

        {/* Jensen Riding the Rollercoaster Cart with Flailing Arms & Chip! */}
        <div style={{ position: 'absolute', top: 30, right: 80 }} className="anim-coaster">
          {/* Custom Rollercoaster Cart */}
          <div
            style={{
              background: '#0F172A',
              border: `3px solid ${ui.green}`,
              borderRadius: '16px 16px 6px 6px',
              padding: '10px 14px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
              position: 'relative',
            }}
          >
            {/* Rocket Thruster Flame Behind Cart */}
            <div
              className="anim-rocket-exhaust"
              style={{
                position: 'absolute',
                bottom: -22,
                left: '50%',
                marginLeft: -8,
                width: 16,
                height: 22,
                background: 'linear-gradient(180deg, #F59E0B, #EF4444, transparent)',
                borderRadius: '0 0 8px 8px',
              }}
            />

            <MorphElement id="actor-jensen">
              <div>
                <JensenActor mood="rollercoaster" size={130} />
              </div>
            </MorphElement>
            <div style={{ marginTop: -15 }}>
              <MorphElement id="actor-gpu">
                <div>
                  <BlackwellB200 size={90} />
                </div>
              </MorphElement>
            </div>
            {/* Wheels */}
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 4 }}>
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#F59E0B', border: '2px solid #000' }} />
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#F59E0B', border: '2px solid #000' }} />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${ui.cardBorder}`, paddingTop: 14, fontSize: 13, fontFamily: font.mono, color: ui.textMuted }}>
      <span>ACT 07 · THE MARKET REBOUND</span>
      <span>NEXT: THE GRAND FINALE ➡️</span>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// SLIDE 8: UNTOUCHABLE (CONFETTI STORM, HOLLYWOOD SEARCHLIGHTS & WINNERS)
// ---------------------------------------------------------------------------
const Slide8Finale: Page = () => (
  <div style={canvasStyle}>
    <KeynoteNavBar episode={8} title="UNTOUCHABLE" />

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, position: 'relative' }}>
      {/* Hollywood Sweeping Searchlights */}
      <div style={{ position: 'absolute', bottom: 0, left: 180, pointerEvents: 'none' }} className="anim-search-l">
        <svg viewBox="0 0 200 700" width="200" height="700">
          <polygon points="100,700 0,0 200,0" fill="rgba(0, 208, 108, 0.15)" />
        </svg>
      </div>
      <div style={{ position: 'absolute', bottom: 0, right: 180, pointerEvents: 'none' }} className="anim-search-r">
        <svg viewBox="0 0 200 700" width="200" height="700">
          <polygon points="100,700 0,0 200,0" fill="rgba(245, 158, 11, 0.15)" />
        </svg>
      </div>

      {/* Cascading Confetti Shower & Falling Dollar Bills */}
      <svg viewBox="0 0 1000 420" width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
        <circle cx="150" cy="50" r="7" fill={ui.green} className="anim-confetti-1" />
        <rect x="250" y="40" width="12" height="12" fill={ui.pink} className="anim-confetti-2" />
        <circle cx="750" cy="60" r="8" fill={ui.amber} className="anim-confetti-1" />
        <rect x="850" y="30" width="14" height="14" fill={ui.blue} className="anim-confetti-2" />
        <polygon points="450,20 460,40 440,40" fill={ui.green} className="anim-confetti-1" />
        <polygon points="550,30 560,50 540,50" fill={ui.amber} className="anim-confetti-2" />
        {/* Floating Green $100 Dollar Bills */}
        <g transform="translate(320, 20)" className="anim-dollar-fall">
          <rect x="0" y="0" width="28" height="14" rx="2" fill="#86EFAC" stroke="#15803D" strokeWidth="1" />
          <circle cx="14" cy="7" r="3" fill="#15803D" />
        </g>
        <g transform="translate(680, 50)" className="anim-dollar-fall" style={{ animationDelay: '1.4s' }}>
          <rect x="0" y="0" width="28" height="14" rx="2" fill="#86EFAC" stroke="#15803D" strokeWidth="1" />
          <circle cx="14" cy="7" r="3" fill="#15803D" />
        </g>
      </svg>

      {/* Finale Title */}
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <h2 style={{ fontFamily: font.display, fontSize: 68, fontWeight: 900, margin: '0 0 8px 0', letterSpacing: '-0.03em' }}>
          Untouchable. <span style={{ color: ui.green }}>The Leather Jacket Survives.</span>
        </h2>
        <p style={{ fontSize: 24, color: ui.textMuted, margin: 0, fontWeight: 500 }}>
          Scandals come and go. $3.5 Trillion in sovereign compute is forever.
        </p>
      </div>

      {/* Grand Winner's Podium Stage */}
      <div
        style={{
          width: 1050,
          height: 440,
          background: '#FFFFFF',
          border: `2px solid ${ui.cardBorder}`,
          borderRadius: 28,
          boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.08)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          position: 'relative',
          paddingBottom: 40,
          gap: 24,
        }}
      >
        {/* Trump on Podium 2 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <MorphElement id="actor-trump">
            <div>
              <TrumpActor size={150} />
            </div>
          </MorphElement>
          <span style={{ fontFamily: font.display, fontSize: 15, fontWeight: 800, color: ui.amber, marginTop: 4 }}>
            "TREMENDOUS SHOW!"
          </span>
        </div>

        {/* Fed Inspector */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <MorphElement id="actor-fed">
            <div>
              <FedInspectorActor size={140} />
            </div>
          </MorphElement>
          <span style={{ fontFamily: font.display, fontSize: 15, fontWeight: 800, color: ui.blue, marginTop: 4 }}>
            "CASE CLOSED"
          </span>
        </div>

        {/* Jensen Champion on #1 Gold Pedestal with Triple Deal-With-It Sunglasses! */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16 }}>
          <MorphElement id="actor-jensen">
            <div>
              <JensenActor mood="sunglasses" size={210} />
            </div>
          </MorphElement>
          <div style={{ marginTop: -15 }}>
            <MorphElement id="actor-gpu">
              <div>
                <BlackwellB200 size={140} />
              </div>
            </MorphElement>
          </div>
          <span style={{ background: ui.green, color: '#000000', fontFamily: font.display, fontSize: 16, fontWeight: 900, padding: '4px 16px', borderRadius: 20, marginTop: 6, boxShadow: '0 4px 14px rgba(0,208,108,0.4)' }}>
            STILL THE KING
          </span>
        </div>

        {/* Alice on Podium 3 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <MorphElement id="actor-alice">
            <div>
              <AliceActor size={150} />
            </div>
          </MorphElement>
          <span style={{ fontFamily: font.display, fontSize: 15, fontWeight: 800, color: ui.pink, marginTop: 4 }}>
            "SEE YOU IN SINGAPORE"
          </span>
        </div>
      </div>
    </div>

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${ui.cardBorder}`, paddingTop: 14, fontSize: 13, fontFamily: font.mono, color: ui.textMuted }}>
      <span>FINALE · THE SHOW GOES ON</span>
      <span>PRESS "P" FOR PRESENTER SCRIPT 🎬</span>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// METADATA & SPEAKER NOTES (Full Synchronized Standup Script)
// ---------------------------------------------------------------------------
export const meta: SlideMeta = {
  title: 'The Sovereign Leather Jacket: The Nvidia Investigation',
  description: 'A continuous, high-end motion graphics cartoon presentation documenting the Nvidia espionage and extramarital affair saga.',
};



export default [
  Slide1Kingpin,
  Slide2Honeytrap,
  Slide3Heist,
  Slide4Confession,
  Slide5Washington,
  Slide6Polygraph,
  Slide7Rollercoaster,
  Slide8Finale,
];
