import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Gift, Heart, Mic } from "lucide-react";
import { birthdaySurprise } from "../../lib/dashboard/birthday";
import birthdayOne from "../../assets/images/birthday/1.jpg";
import birthdayTwo from "../../assets/images/birthday/2.jpg";
import birthdayThree from "../../assets/images/birthday/3.jpg";
import birthdayFour from "../../assets/images/birthday/4.jpg";

const memories = [
  { src: birthdayOne, caption: "မ့အပြုံးလေးက မောင့်အကြိုက်ဆုံးပဲ။" },
  { src: birthdayTwo, caption: "ဒီလို အမှတ်တရလေးတွေ ထပ်ဖန်တီးကြမယ်နော်။" },
  {
    src: birthdayThree,
    caption: "သာမန်နေ့လေးတွေတောင် မနဲ့ဆို အထူးနေ့လေးတွေပါပဲ။",
  },
  { src: birthdayFour, caption: "ရှေ့ဆက်မယ့် နေ့ရက်တိုင်းမှာလည်း မနဲ့အတူပဲ။" },
];

interface BirthdayExtrasProps {
  onVoicePlay: (audio: HTMLAudioElement) => void;
  onVoiceStop: () => void;
}

export function BirthdayExtras({
  onVoicePlay,
  onVoiceStop,
}: BirthdayExtrasProps) {
  const [memoryIndex, setMemoryIndex] = useState(0);
  const [giftOpened, setGiftOpened] = useState(false);
  const [voiceError, setVoiceError] = useState(false);
  const reducedMotion = useReducedMotion();
  const memory = memories[memoryIndex];

  return (
    <div className="mt-8 space-y-7">
      <section
        aria-labelledby="memory-story-title"
        className="rounded-[32px] border border-white bg-white/65 p-5 shadow-xl shadow-pink-200/40"
      >
        <p className="text-[10px] font-bold uppercase tracking-[3px] text-[#C9184A]">
          Collected with love
        </p>
        <h2
          id="memory-story-title"
          className="mt-2 font-serif text-2xl text-[#800F2F]"
        >
          Our little memories
        </h2>
        <div className="mt-6 overflow-hidden px-2 pb-3 pt-2">
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={memoryIndex}
              initial={{
                opacity: 0,
                x: reducedMotion ? 0 : 30,
                rotate: reducedMotion ? 0 : 2,
              }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              exit={{ opacity: 0, x: reducedMotion ? 0 : -30 }}
              transition={{ duration: reducedMotion ? 0 : 0.3 }}
              className="relative bg-white p-3 pb-5 shadow-lg"
            >
              <span
                aria-hidden="true"
                className="absolute -top-2 left-1/2 z-10 h-5 w-20 -translate-x-1/2 -rotate-3 bg-[#FFCCD5]/80"
              />
              <img
                src={memory.src}
                alt={`Our memory ${memoryIndex + 1}`}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              <figcaption className="px-2 pt-4 text-center text-sm font-medium leading-7 text-[#800F2F]">
                {memory.caption}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() =>
              setMemoryIndex(
                (previous) =>
                  (previous - 1 + memories.length) % memories.length,
              )
            }
            aria-label="Previous memory"
            className="rounded-full bg-white p-3 text-[#A4133C] shadow-sm focus-visible:outline-2 focus-visible:outline-[#C9184A]"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2" aria-label="Choose a memory">
            {memories.map((item, index) => (
              <button
                key={item.src}
                type="button"
                aria-label={`Memory ${index + 1}`}
                aria-pressed={memoryIndex === index}
                onClick={() => setMemoryIndex(index)}
                className="flex h-11 w-8 items-center justify-center"
              >
                <span
                  className={`h-1.5 rounded-full transition-all ${memoryIndex === index ? "w-6 bg-[#C9184A]" : "w-1.5 bg-[#FFB3C1]"}`}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              setMemoryIndex((previous) => (previous + 1) % memories.length)
            }
            aria-label="Next memory"
            className="rounded-full bg-white p-3 text-[#A4133C] shadow-sm focus-visible:outline-2 focus-visible:outline-[#C9184A]"
          >
            <ChevronRight size={18} />
          </button>
        </div>
        <p
          aria-live="polite"
          className="text-center text-[10px] tracking-[2px] text-[#A4133C]"
        >
          {memoryIndex + 1} / {memories.length}
        </p>
      </section>

      <section
        aria-labelledby="voice-message-title"
        className="rounded-[30px] border border-white bg-[#FFF9FB] p-6 shadow-lg shadow-pink-200/40"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-[#FFF0F3] p-3 text-[#C9184A]">
            <Mic size={22} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[2px] text-[#C9184A]">
              Just between us
            </p>
            <h2
              id="voice-message-title"
              className="mt-1 text-base font-semibold text-[#800F2F]"
            >
              မောင့်အသံလေး နားထောင်မယ်
            </h2>
          </div>
        </div>
        {birthdaySurprise.voiceMessageSrc ? (
          <>
            <audio
              controls
              preload="metadata"
              src={birthdaySurprise.voiceMessageSrc}
              aria-label="Birthday voice message from me"
              className="mt-5 w-full"
              onPlay={(event) => onVoicePlay(event.currentTarget)}
              onPause={onVoiceStop}
              onEnded={onVoiceStop}
              onError={() => {
                setVoiceError(true);
                onVoiceStop();
              }}
            />
            {voiceError && (
              <p
                role="status"
                className="mt-3 text-sm leading-7 text-[#A4133C]"
              >
                အသံလေး နားထောင်မရရင် ပြောနော်။
              </p>
            )}
          </>
        ) : (
          <p className="mt-4 text-sm leading-7 text-[#800F2F]/75">
            မောင့်အသံနဲ့ ဆုတောင်းလေး မကြာခင် ရောက်လာမယ်နော်။ ♡
          </p>
        )}
      </section>

      <section
        aria-labelledby="birthday-gift-title"
        className="relative overflow-hidden rounded-[32px] border border-white bg-gradient-to-br from-white to-[#FFCCD5] p-7 text-center shadow-xl shadow-pink-200/50"
      >
        <p className="text-[10px] font-bold uppercase tracking-[3px] text-[#C9184A]">
          Saved the sweetest for last
        </p>
        <h2
          id="birthday-gift-title"
          className="mt-2 font-serif text-2xl text-[#800F2F]"
        >
          One more surprise
        </h2>
        <AnimatePresence mode="wait" initial={false}>
          {giftOpened ? (
            <motion.div
              key="gift"
              initial={{ opacity: 0, y: reducedMotion ? 0 : 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-[22px] border border-dashed border-[#C9184A]/30 bg-white/80 p-6"
              role="region"
              aria-label="Your birthday gift"
              aria-live="polite"
            >
              <Heart size={26} className="mx-auto text-[#C9184A]" />
              <h3 className="mt-3 font-serif text-xl text-[#A4133C]">
                {birthdaySurprise.giftTitle}
              </h3>
              <p className="mt-4 text-sm leading-8 text-[#800F2F]">
                {birthdaySurprise.giftMessage}
              </p>
              <p className="mt-5 text-xs italic text-[#C9184A]">
                With all my love, Mg
              </p>
            </motion.div>
          ) : (
            <motion.button
              key="wrapped"
              type="button"
              onClick={() => setGiftOpened(true)}
              whileHover={reducedMotion ? undefined : { y: -4 }}
              whileTap={{ scale: 0.97 }}
              className="mx-auto mt-6 flex w-full flex-col items-center rounded-[24px] border border-white bg-white/65 p-6 text-[#A4133C] shadow-sm focus-visible:outline-2 focus-visible:outline-[#C9184A]"
            >
              <span className="rounded-[22px] bg-[#FFF0F3] p-5">
                <Gift size={46} strokeWidth={1.2} />
              </span>
              <span className="mt-4 text-sm font-semibold">
                မ့အတွက် လက်ဆောင်လေး
              </span>
              <span className="mt-2 text-xs text-[#C9184A]">
                Tap to unwrap ♡
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
