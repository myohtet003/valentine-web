import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gift, Heart } from "lucide-react";

interface BirthdayCakeRevealProps {
  onOpen: () => void;
  onStart: () => void;
}

export function BirthdayCakeReveal({
  onOpen,
  onStart,
}: BirthdayCakeRevealProps) {
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleStartSurprise = () => {
    onStart();
    setHasInteracted(true);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fff8fb] px-6 py-10 font-sans text-[#4a1231] selection:bg-[#ff8aba]/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#ffd6e8_0,transparent_28%),radial-gradient(circle_at_80%_15%,#c9f3ff_0,transparent_24%),radial-gradient(circle_at_50%_85%,#ffe5a8_0,transparent_30%),linear-gradient(135deg,#fff8fb_0%,#ffeef5_55%,#fff7d8_100%)]" />

      <AnimatePresence mode="wait">
        {!hasInteracted ? (
          <motion.div
            key="intro-card"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -34, scale: 0.96 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 w-full max-w-sm overflow-hidden rounded-[34px] border-[6px] border-white bg-[#FFF0F3] p-5 text-center shadow-2xl shadow-pink-300/40"
            style={{
              backgroundImage:
                "radial-gradient(#ffb3c1 0.8px, transparent 0.8px)",
              backgroundSize: "24px 24px",
            }}
          >
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#FFCCD5]/90 to-transparent" />
            <div className="absolute -left-10 top-10 h-24 w-24 rounded-full bg-white/40 blur-xl" />
            <div className="absolute -right-8 bottom-10 h-28 w-28 rounded-full bg-[#FFB3C1]/35 blur-xl" />

            <div className="relative rounded-[28px] border border-white/80 bg-white/75 px-6 py-7 shadow-inner backdrop-blur">
              <motion.div
                animate={{ y: [0, -6, 0], rotate: [-1.5, 1.5, -1.5] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  ease: "easeInOut",
                }}
                className="relative mx-auto mb-6 h-36 w-40"
              >
                <div className="absolute left-1/2 top-0 h-12 w-28 -translate-x-1/2 rounded-t-[22px] bg-[#FF8FA3] shadow-lg">
                  <div className="absolute left-1/2 top-0 h-full w-6 -translate-x-1/2 bg-white/80" />
                  <div className="absolute -top-4 left-8 h-8 w-8 rounded-full border-[6px] border-[#FF4D6D]" />
                  <div className="absolute -top-4 right-8 h-8 w-8 rounded-full border-[6px] border-[#FF4D6D]" />
                </div>
                <div className="absolute bottom-0 h-24 w-full rounded-[28px] bg-[#FFB3C1] shadow-2xl shadow-pink-200">
                  <div className="absolute left-1/2 top-0 h-full w-8 -translate-x-1/2 bg-white/80" />
                  <div className="absolute left-0 right-0 top-8 h-8 bg-[#FF8FA3]" />
                  <Heart
                    size={34}
                    fill="#C9184A"
                    className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-[#C9184A]"
                  />
                </div>
              </motion.div>

              <p className="mb-2 text-[10px] font-black uppercase tracking-[3px] text-[#FF4D6D]">
                Birthday Box
              </p>
              <h2 className="text-3xl font-black leading-tight text-[#A4133C]">
                မ့အတွက် မောင့်ရဲ့ Surprise Box
              </h2>
              <p className="mt-3 text-sm font-bold leading-7 text-[#800F2F]/75">
                ဖွင့်ကြည့်လိုက်နော်။
              </p>

              <button
                type="button"
                onClick={handleStartSurprise}
                className="group mt-7 flex w-full items-center justify-center gap-3 rounded-[22px] bg-gradient-to-r from-[#FF4D6D] via-[#FF758F] to-[#C9184A] py-4 text-sm font-black uppercase tracking-[1.5px] text-white shadow-xl shadow-pink-300/60 transition-all hover:shadow-pink-300 active:scale-95"
              >
                <Gift size={20} />
                Open Birthday Box
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="cake-reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 flex w-full max-w-lg flex-col items-center text-center"
          >
            {Array.from({ length: 16 }).map((_, index) => (
              <motion.span
                key={`cake-sparkle-${index}`}
                className="absolute text-[#ff5d8f] text-lg"
                style={{
                  left: `${8 + ((index * 11) % 84)}%`,
                  top: `${10 + ((index * 17) % 78)}%`,
                }}
                animate={{
                  opacity: [0.25, 1, 0.25],
                  scale: [0.75, 1.2, 0.75],
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 2.1 + (index % 3) * 0.35,
                  repeat: Infinity,
                  delay: index * 0.12,
                }}
              >
                ✦
              </motion.span>
            ))}

            <div className="mb-5 flex items-center gap-2 rounded-full border border-[#ffb3c7]/70 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[2px] text-[#c9184a] shadow-sm backdrop-blur">
              <Gift size={16} />A tiny surprise
            </div>

            <h1 className="text-4xl font-black leading-tight text-[#590d22] sm:text-5xl">
              Make a wish first
            </h1>

            <p className="mt-4 max-w-md text-base font-medium leading-7 text-[#7a2948]">
              ဆုတောင်းလေးတစ်ခု ပြုပြီး ဖယောင်းတိုင်လေးကို ထိလိုက်နော်။
            </p>

            <motion.button
              type="button"
              onClick={onOpen}
              aria-label="Make a wish and open birthday dashboard"
              className="group relative mt-10 flex w-full max-w-xs flex-col items-center rounded-[36px] border border-white/80 bg-white/70 px-8 pb-9 pt-12 shadow-2xl shadow-pink-200/70 backdrop-blur active:scale-95"
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.96 }}
            >
              <div className="relative mb-8 h-28 w-48">
                <motion.div
                  className="absolute bottom-0 h-16 w-full rounded-[24px] bg-[#ff8fab] shadow-lg"
                  initial={{ y: -250, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    delay: 0.2,
                    stiffness: 60,
                    damping: 15,
                    mass: 2,
                  }}
                />
                <motion.div
                  className="absolute bottom-5 left-0 h-7 w-full rounded-full bg-white/60"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.35 }}
                />
                <motion.div
                  className="absolute bottom-12 left-6 h-10 w-36 rounded-[22px] bg-[#ffd6e8] shadow-md"
                  initial={{ y: -220, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    delay: 1.2,
                    stiffness: 60,
                    damping: 15,
                    mass: 2,
                  }}
                />

                {[
                  { left: "3rem", color: "#ffd166" },
                  { left: "6rem", color: "#7bdff2" },
                  { right: "3rem", color: "#ff5d8f" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="absolute bottom-16 h-4 w-4 rounded-full"
                    style={{
                      left: item.left,
                      right: item.right,
                      backgroundColor: item.color,
                    }}
                    initial={{ y: -180, opacity: 0, scale: 0, rotate: -180 }}
                    animate={{ y: 0, opacity: 1, scale: 1, rotate: 360 }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 10,
                      delay: 2.0 + index * 0.4,
                    }}
                  />
                ))}

                <motion.div
                  className="absolute left-1/2 top-0 h-12 w-4 -translate-x-1/2 rounded-full bg-[#7bdff2]"
                  initial={{ y: -250, opacity: 0 }}
                  animate={{ y: [0, -2, 0], opacity: 1 }}
                  transition={{
                    type: "spring",
                    delay: 4,
                    stiffness: 55,
                    damping: 16,
                    mass: 2,
                  }}
                >
                  <motion.span
                    className="absolute -top-5 left-1/2 h-7 w-5 -translate-x-1/2 rounded-full bg-[#ffb703]"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      opacity: 1,
                      scale: [0.85, 1.1, 0.85],
                      boxShadow: [
                        "0 0 12px rgba(255,183,3,0.55)",
                        "0 0 28px rgba(255,183,3,0.9)",
                        "0 0 12px rgba(255,183,3,0.55)",
                      ],
                    }}
                    transition={{
                      opacity: { delay: 5, duration: 0.2 },
                      scale: { delay: 5, duration: 1.1, repeat: Infinity },
                      boxShadow: {
                        delay: 5,
                        duration: 1.1,
                        repeat: Infinity,
                      },
                    }}
                  />
                </motion.div>
              </div>

              <motion.span
                className="rounded-full bg-[#ff5d8f] px-6 py-3 text-sm font-black uppercase tracking-[1px] text-white shadow-lg shadow-pink-200"
                whileHover={{ scale: 1.05 }}
              >
                Make a wish · Tap the candle
              </motion.span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
