import { useEffect, useRef, useState } from "react";
import { RotateCcw, Volume2, VolumeX } from "lucide-react";
import { BirthdayCakeReveal } from "./BirthdayCakeReveal";
import { BirthdayDashboard } from "./BirthdayDashboard";

interface BirthdayExperienceProps {
  leftPhoto: string | null;
  rightPhoto: string | null;
}

export function BirthdayExperience({
  leftPhoto,
  rightPhoto,
}: BirthdayExperienceProps) {
  const [opened, setOpened] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [musicError, setMusicError] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const voiceRef = useRef<HTMLAudioElement | null>(null);
  const enabledRef = useRef(false);
  const voicePlayingRef = useRef(false);

  useEffect(
    () => () => {
      enabledRef.current = false;
      const music = musicRef.current;
      if (music) {
        music.onended = null;
        music.pause();
      }
      voiceRef.current?.pause();
    },
    [],
  );

  const playMusic = () => {
    const music = musicRef.current;
    if (!music) return;
    setMusicError(false);
    void music
      .play()
      .then(() => {
        if (
          musicRef.current !== music ||
          !enabledRef.current ||
          voicePlayingRef.current
        )
          music.pause();
      })
      .catch(() => {
        if (
          musicRef.current !== music ||
          !enabledRef.current ||
          voicePlayingRef.current
        )
          return;
        enabledRef.current = false;
        setMusicEnabled(false);
        setMusicError(true);
      });
  };

  const startMusic = () => {
    if (musicRef.current) return;
    const music = new Audio("/audio/birthday.mp3");
    music.volume = 0.45;
    musicRef.current = music;
    setMusicStarted(true);
    music.onended = () => {
      music.src = "/audio/birthday_song.mp3";
      music.loop = true;
      if (enabledRef.current && !voicePlayingRef.current) playMusic();
    };
    enabledRef.current = true;
    setMusicEnabled(true);
    playMusic();
  };

  const toggleMusic = () => {
    enabledRef.current = !enabledRef.current;
    setMusicEnabled(enabledRef.current);
    if (!enabledRef.current) musicRef.current?.pause();
    else if (!voicePlayingRef.current) playMusic();
  };

  const handleVoicePlay = (audio: HTMLAudioElement) => {
    voiceRef.current = audio;
    voicePlayingRef.current = true;
    musicRef.current?.pause();
  };

  const handleVoiceStop = () => {
    voicePlayingRef.current = false;
    if (enabledRef.current) playMusic();
  };

  const replay = () => {
    enabledRef.current = false;
    setMusicEnabled(false);
    voiceRef.current?.pause();
    voicePlayingRef.current = false;
    const music = musicRef.current;
    if (music) {
      music.pause();
      music.onended = null;
      musicRef.current = null;
    }
    setOpened(false);
    setMusicStarted(false);
    setMusicError(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <div className="relative bg-[#FFF0F3]">
      <div className="flex flex-wrap justify-end gap-2 px-5 pt-4">
        {opened && (
          <button
            type="button"
            onClick={replay}
            className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-[#A4133C] focus-visible:outline-2 focus-visible:outline-[#C9184A]"
          >
            <RotateCcw size={14} /> Replay surprise
          </button>
        )}
        {musicStarted && (
          <button
            type="button"
            onClick={toggleMusic}
            aria-label={
              musicEnabled
                ? "Turn birthday music off"
                : "Turn birthday music on"
            }
            aria-pressed={musicEnabled}
            className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-[#A4133C] focus-visible:outline-2 focus-visible:outline-[#C9184A]"
          >
            {musicEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />} Music{" "}
            {musicEnabled ? "on" : "off"}
          </button>
        )}
      </div>
      {musicError && (
        <p
          role="status"
          className="px-5 pt-2 text-center text-xs text-[#A4133C]"
        >
          Music couldn’t play. Tap Music to try again.
        </p>
      )}
      {opened ? (
        <BirthdayDashboard
          leftPhoto={leftPhoto}
          rightPhoto={rightPhoto}
          onVoicePlay={handleVoicePlay}
          onVoiceStop={handleVoiceStop}
        />
      ) : (
        <BirthdayCakeReveal
          onOpen={() => {
            setOpened(true);
            window.scrollTo({ top: 0, behavior: "instant" });
          }}
          onStart={startMusic}
        />
      )}
    </div>
  );
}
