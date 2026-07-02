import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Heart,
  Lock,
  Calendar,
  Edit2,
  Clock,
  Quote,
  X,
  Camera,
  Cake,
  Gift,
  Sparkles,
  Star,
} from "lucide-react";
// --- Types ---
interface TimeStats {
  days: number;
  hours: number;
  mins: number;
  secs: number;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

// --- Constants ---
const loveNotes = [
  "ကိန္နရီ ကိန္နရာလို တစ်သက်လုံး မခွဲပဲ ချစ်နေမာ။ 🕊️❤️",
  "မ ရှိတဲ့အရပ်က မောင့်အတွက်တော့ နိဗ္ဗာန်ပဲ။ 🏔️🌸",
  "မ့ရဲ့ 'မောင်' ဆိုတဲ့ ခေါ်သံလေးက အချိုသာဆုံး ဂီတပဲ။ 🎶💖",
  "မဟာတံတိုင်းကြီးထက် မောင့်ရဲ့ ရင်ခွင်က ပိုလုံခြုံပါတယ်နော်။ 🧱🫂",
  "ကမ္ဘာကျော် စိန်ပွင့်တွေထက် မ့ မျက်ဝန်းလေးတွေက ပိုတောက်ပတာ။ 💎 👀",
  "သမုဒ္ဒရာတွေထက် မ့အပေါ်ထားတဲ့ သစ္စာက ပိုနက်ရှိုင်းတယ်။ 🌊⚓",
  "မ့ နှုတ်ခမ်းလေး စူနေတာကအစ မောင့်အတွက်တော့ အနုပညာပဲ။ 😗🎨",
  "လောကကြီးတစ်ခုလုံးနဲ့ ယှဉ်ရင်တောင် မ့ကိုပဲ ရွေးချယ်ပစ်မှာ။ ⚔️❤️",
  "မ့အတွက်ဆိုရင် မောင့်အချိန်၊ အင်အား၊ အရာအားလုံးပေးနိုင်တယ်။ 🔥❤️",
  "မောင့်နှလုံးသားက 'မ-မ-မ' လို့ပဲ တစ်ချိန်လုံး ခုန်နေတာ။ 💓🔊",
  "ကမ္ဘာမြေကြီး လည်ပတ်တာသာ ရပ်ရင်ရပ်သွားမယ် မောင့်အချစ်က ရပ်မှာ မဟုတ်ဘူးရယ်။ 🌎🛑",
  "မ့ လက်ကို တွဲထားရရင် ဘယ်နေရာမဆို နန်းတော်ပဲ။ 🏰🤝",
  "မ က မောင့်ရဲ့ Bubu လေး... မောင်က မ့ရဲ့ Dudu လေးပေါ့။ 💕✨",
  "မ့ နဖူးလေးကို ဖွဖွလေး နမ်းပြီး အမြဲ ဂရုစိုက်ပါ့မယ်လို့ ကတိပေးတယ်။ 💋🌸",
  "မောင် ပင်ပန်းလို့ စိတ်ညစ်နေရင်တောင် မ့ အသံလေး ကြားရင် အားပြန်ပြည့်ရော။ (#crd from win2)🔋🎧",
  "မောင့်ပျော်ရွှင်မှုတွေက မ့ ဆီက မြစ်ဖျားခံပြီးတော့ပဲ စီးဆင်းတာ။ 🌊😊",
  "မောင့်အချစ်တွေက လကွယ်ညလို ဘယ်တော့မှ မှောင်မသွားဘူး။ 🌙💡",
  "မ့ရဲ့ ဘေးနားက Dudu လေးက မောင် ဖြစ်ချင်တယ်။ 🥲🐻",
  "မ့အိမ်မက်ထဲအထိ လိုက်နှောင့်ယှက်ပီး ချစ်တဲ့အကြောင်းတွေပြောပြမာမို့ ဒီညလည်း အိပ်ပျော်အောင်အိပ်။ 😴🌙",
  "မ့ရဲ့ အရိပ်ကလေးကအစ မောင့်ဘဝကို အဓိပ္ပာယ်ရှိစေတယ်။ 👤🎨",
  "Bubu က Dudu ကို ဆိုးသမျှ မောင်လည်း မ့ရဲ့ အဆိုးတွေကို အကုန် ခံနိုင်တယ်လေ။ 💁‍♂️❤️",
  "မ့ ခြေဖဝါးအောက်မှာ မောင့်ကမ္ဘာတစ်ခုလုံး ပုံအပ်ထားတယ်။ 👑👣",
  "မ့ကို ပိုပြီး ချစ်ပေးနိုင်မယ့်သူ မောင်ကလွဲ ရှိတော့မယ် မထင်။ 💖",
  "မ့ မျက်ရည်တစ်စက်က မောင့်အတွက်တော့ ကမ္ဘာပျက်တာပဲ။ 💧🙅‍♂️",
  "ညအိပ်ရင် Bubu အရုပ်လေးကို မြဲမြဲဖက်ပြီး မောင့်အကြောင်း တွေးအိပ်နော်။ 😴🌙",
  "ကြယ်တွေ ဘယ်လောက်စုံစုံ မ့ မျက်ဝန်းလောက် မလှဘူး။ ✨👀",
  "ဘဝဆိုတဲ့ ပုစ္ဆာမှာ မ က မောင့်အတွက် တစ်ခုတည်းသော အဖြေ။(ကလေးအကွက်တေ😂) ✅📝",
  "မ့ကို လွမ်းတဲ့စိတ်က မောင့်ကို အမြဲ နွေးထွေးစေပါတယ်။ 🔥❤️",
  "မ့ ပခုံးလေးကို မှီပြီး ဘာအကြောင်းပြချက်မှမရှိဘဲ အကြာကြီး ငေးနေချင်တာ။ 💆‍♂️✨",
  "မ့ စိတ်တိုင်းကျ ဖြစ်စေရမယ်... မောင့်မှာ ငြင်းပိုင်ခွင့် မရှိဘူးလေ။ 🏳️‍🌈👑",
];
const NOTE_LOCK_MS = 24 * 60 * 60 * 1000;
const BIRTHDAY_DATE_KEY = "2026-10-23";

const getYangonDateKey = () => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Yangon",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const dateParts = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );

  return `${dateParts.year}-${dateParts.month}-${dateParts.day}`;
};

// --- Sub-Components ---
const TimeBlock = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center gap-1">
    <div className="bg-[#FFF0F3] px-3 py-2 min-w-[60px] rounded-2xl shadow-inner border border-white/50">
      <span className="text-2xl font-bold text-[#A4133C] block text-center">
        {value < 10 ? `0${value}` : value}
      </span>
    </div>
    <span className="text-[10px] font-bold text-[#C9184A] uppercase tracking-wider">
      {label}
    </span>
  </div>
);

interface BirthdayCakeRevealProps {
  onOpen: () => void;
  passAudioInstance?: (audio: HTMLAudioElement) => void;
}

const BirthdayCakeReveal = ({
  onOpen,
  passAudioInstance,
}: BirthdayCakeRevealProps) => {
  const [hasInteracted, setHasInteracted] = useState(false);
  const handleStartSurprise = () => {
    const playlist = ["audio/birthday.mp3", "audio/birthday_song.mp3"];
    let currentTrackIndex = 0;

    const audio = new Audio(playlist[currentTrackIndex]);
    audio.loop = false;

    audio.onended = () => {
      currentTrackIndex++;
      if (currentTrackIndex < playlist.length) {
        audio.src = playlist[currentTrackIndex];
        audio.loop = false;

        audio
          .play()
          .catch((err) => console.error("Next track playback failed:", err));
      }
    };

    audio
      .play()
      .then(() => {
        if (passAudioInstance) {
          passAudioInstance(audio);
        }
      })
      .catch((e) => {
        console.error("Music playback failed:", e);
      });

    setHasInteracted(true);
  };

  const handleCakeClick = () => {
    onOpen();
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fff8fb] px-6 py-10 font-sans text-[#4a1231] selection:bg-[#ff8aba]/30">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#ffd6e8_0,transparent_28%),radial-gradient(circle_at_80%_15%,#c9f3ff_0,transparent_24%),radial-gradient(circle_at_50%_85%,#ffe5a8_0,transparent_30%),linear-gradient(135deg,#fff8fb_0%,#ffeef5_55%,#fff7d8_100%)]" />

      <AnimatePresence mode="wait">
        {!hasInteracted ? (
          <motion.div
            key="intro-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex w-full max-w-sm flex-col items-center rounded-[32px] border border-white/80 bg-white/60 p-8 text-center shadow-2xl shadow-pink-200/50 backdrop-blur-md"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#ff5d8f] text-white shadow-lg shadow-pink-200"
            >
              <Heart size={28} fill="currentColor" />
            </motion.div>

            <h2 className="text-2xl font-black text-[#590d22]">
              Hi, Cutie Pie! 🐼
            </h2>
            <p className="mt-3 text-sm font-medium leading-relaxed text-[#7a2948]">
              ဘာကြီးလဲ ဆိုပီး စိတ်ဝင်စားနေပီး မလား 😜
            </p>

            <button
              type="button"
              onClick={handleStartSurprise}
              className="group mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#ff5d8f] py-3.5 text-sm font-black uppercase tracking-[1px] text-white shadow-lg shadow-pink-200 transition-all hover:bg-[#c9184a] active:scale-98"
            >
              <Gift size={18} /> Open Surprise ✨
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="cake-reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 flex w-full max-w-lg flex-col items-center text-center"
          >
            {/* Floating Sparkles */}
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
              Tap the cake to open your birthday dashboard.
            </p>

            {/* Cake Button Container */}
            <motion.button
              type="button"
              onClick={handleCakeClick}
              aria-label="Open birthday dashboard"
              className="group relative mt-10 flex w-full max-w-xs flex-col items-center rounded-[36px] border border-white/80 bg-white/70 px-8 pb-9 pt-12 shadow-2xl shadow-pink-200/70 backdrop-blur active:scale-95"
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.96 }}
            >
              <div className="relative mb-8 h-28 w-48">
                {/* Bottom Cake */}
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
                {/* White Cream */}
                <motion.div
                  className="absolute bottom-5 left-0 h-7 w-full rounded-full bg-white/60"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.35 }}
                />
                {/* Top Cake */}
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

                {/* Decorations */}
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

                {/* Candle */}
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
                  {/* Flame */}
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
                Open Birthday Gift
              </motion.span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BirthdayDashboard = ({
  leftPhoto,
  rightPhoto,
}: {
  leftPhoto: string | null;
  rightPhoto: string | null;
}) => {
  const birthdayWishes = [
    "Your smile is still my favorite sunrise.",
    "May this year hold you softly and beautifully.",
    "Every candle today is a tiny wish from my heart.",
  ];

  const [currentWish, setCurrentWish] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWish((prev) => (prev + 1) % birthdayWishes.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Title Splitting Helper
  const titleText = "Happy Birthday,Mg's Ma";

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 12 },
    },
  };

  const polaroidVariants: (
    rotateAngle: number,
    delayTime: number,
  ) => Variants = (rotateAngle: number, delayTime: number): Variants => ({
    hidden: { opacity: 0, scale: 0.8, rotate: 0, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: rotateAngle,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 14,
        delay: delayTime,
      },
    },
  });

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fff7fb] font-sans text-[#3f1235] selection:bg-[#ff8aba]/30">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#ffd6e8_0,transparent_30%),radial-gradient(circle_at_bottom_right,#ffe3a8_0,transparent_26%),linear-gradient(135deg,#fff7fb_0%,#ffeaf3_45%,#fff1c8_100%)]" />

      {/* Confetti Spawns */}
      {Array.from({ length: 18 }).map((_, index) => (
        <motion.span
          key={`birthday-confetti-${index}`}
          className="absolute pointer-events-none rounded-full"
          style={{
            left: `${4 + ((index * 7) % 92)}%`,
            top: "-8%",
            width: 8 + (index % 4) * 4,
            height: 8 + (index % 4) * 4,
            backgroundColor:
              index % 3 === 0
                ? "#ff5d8f"
                : index % 3 === 1
                  ? "#ffd166"
                  : "#7bdff2",
          }}
          animate={{
            y: ["0vh", "115vh"],
            x: [0, index % 2 === 0 ? 24 : -24, 0],
            rotate: [0, 160, 320],
            opacity: [0, 0.9, 0],
          }}
          transition={{
            duration: 7 + (index % 5),
            repeat: Infinity,
            delay: index * 0.22,
            ease: "easeInOut",
          }}
        />
      ))}

      <main className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]"
        >
          {/* LEFT CONTENT SECTION */}
          <section className="space-y-6">
            {/* Header Badge */}
            <motion.div
              variants={itemVariants}
              className="flex w-fit items-center gap-2 rounded-full border border-[#ffb3c7]/70 bg-white/65 px-4 py-2 text-xs font-bold uppercase tracking-[2px] text-[#c9184a] shadow-sm backdrop-blur"
            >
              <Sparkles size={16} />
              23 October 2026
            </motion.div>

            <div className="space-y-4">
              {/* Character-by-Character Title Reveal */}
              <motion.h1
                className="flex flex-wrap text-4xl font-black leading-tight text-[#590d22] sm:text-6xl"
                variants={containerVariants}
              >
                {titleText.split(" ").map((word, wordIdx) => (
                  <span key={wordIdx} className="flex no-break mr-4">
                    {word.split("").map((char, charIdx) => (
                      <motion.span key={charIdx} variants={letterVariants}>
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </motion.h1>

              {/* Subtext Paragraph */}
              <motion.p
                variants={itemVariants}
                className="max-w-2xl text-base font-medium leading-8 text-[#7a2948] sm:text-lg"
              >
                Today the whole dashboard is yours. I hope your birthday feels
                gentle, bright, spoiled, and full of every little thing that
                makes your heart happy.
              </motion.p>
            </div>

            {/* Wish Grid Cards */}
            <div className="relative h-36 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentWish}
                  initial={{
                    x: 150,
                    opacity: 0,
                    rotate: 5,
                    scale: 0.95,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    x: -150,
                    opacity: 0,
                    rotate: -5,
                    scale: 0.95,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-0 rounded-3xl border border-white/80 bg-white/70 p-5 shadow-lg shadow-pink-100/70 backdrop-blur"
                >
                  <Star
                    size={20}
                    fill="#ffd166"
                    className="mb-3 text-[#f7b801]"
                  />

                  <p className="text-base font-semibold leading-7 text-[#6f1d46]">
                    {birthdayWishes[currentWish]}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </section>

          {/* RIGHT PHOTO/GRAPHICS SECTION */}
          <motion.section
            variants={itemVariants}
            className="relative mx-auto w-full max-w-sm"
          >
            {/* Floating Decorative Badges with subtle continuous breathing animation */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-5 top-10 z-30 flex h-16 w-16 items-center justify-center rounded-full bg-[#7bdff2] text-white shadow-xl"
            >
              <Gift size={30} />
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 3.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-4 bottom-16 z-30 flex h-16 w-16 items-center justify-center rounded-full bg-[#ffd166] text-[#7a2948] shadow-xl"
            >
              <Cake size={30} />
            </motion.div>

            {/* Main Image Framing Card */}
            <div className="rounded-[36px] border border-white/80 bg-white/75 p-5 shadow-2xl shadow-pink-200/70 backdrop-blur">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-gradient-to-br from-[#ffccd5] via-[#fff0f3] to-[#ffe3a8]">
                {/* Background Central Heart */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Heart
                    size={92}
                    fill="#ff5d8f"
                    className="text-[#ff5d8f] opacity-20"
                  />
                </div>

                {/* Left Polaroid Frame (Flips Out smoothly) */}
                <motion.div
                  variants={polaroidVariants(-7, 0.6)}
                  className="absolute left-5 top-5 h-36 w-36 overflow-hidden rounded-[30px] border-4 border-white bg-pink-50 shadow-xl"
                >
                  {leftPhoto ? (
                    <img
                      src={leftPhoto}
                      alt="Birthday memory"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Heart className="text-pink-200" />
                    </div>
                  )}
                </motion.div>

                {/* Right Polaroid Frame (Flips Out opposite direction) */}
                <motion.div
                  variants={polaroidVariants(6, 0.8)}
                  className="absolute bottom-6 right-5 h-40 w-40 overflow-hidden rounded-[34px] border-4 border-white bg-pink-50 shadow-xl"
                >
                  {rightPhoto ? (
                    <img
                      src={rightPhoto}
                      alt="Birthday memory"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Heart className="text-pink-200" />
                    </div>
                  )}
                </motion.div>

                {/* Bottom Overlay Toast Banner */}
                <motion.div
                  variants={itemVariants}
                  className="absolute inset-x-6 bottom-3 rounded-3xl bg-[#590d22]/80 px-5 py-4 text-center text-white shadow-xl backdrop-blur"
                >
                  <p className="text-xs font-bold uppercase tracking-[2px] text-[#ffd6e8]">
                    Birthday Wish
                  </p>
                  <p className="mt-1 text-lg font-black">
                    More joy, more dreams, more us.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </main>
    </div>
  );
};

export default function SweetDashboard() {
  const getStoredNoteIndex = () => {
    const storedIndex = localStorage.getItem("current_note_index");
    if (storedIndex !== null) {
      const parsed = Number(storedIndex);
      if (Number.isFinite(parsed) && parsed >= 0) {
        return parsed % loveNotes.length;
      }
    }
    const storedNote = localStorage.getItem("current_note");
    if (storedNote) {
      const index = loveNotes.indexOf(storedNote);
      if (index !== -1) return index;
    }
    return 0;
  };
  const getLockInfo = useCallback((nowTime: number) => {
    const lastClick = localStorage.getItem("last_love_note_time");
    if (!lastClick) {
      return { canClick: true, unlockTime: "" };
    }
    const lastClickTime = Number(lastClick);
    if (!Number.isFinite(lastClickTime)) {
      localStorage.removeItem("last_love_note_time");
      return { canClick: true, unlockTime: "" };
    }
    const lockDiff = lastClickTime + NOTE_LOCK_MS - nowTime;
    if (lockDiff <= 0) {
      return { canClick: true, unlockTime: "" };
    }
    const h = Math.floor(lockDiff / 3600000);
    const m = Math.floor((lockDiff % 3600000) / 60000);
    const s = Math.floor((lockDiff % 60000) / 1000);
    return { canClick: false, unlockTime: `${h}h ${m}m ${s}s` };
  }, []);
  const [isSaved, setIsSaved] = useState(
    () => localStorage.getItem("anni_date") !== null,
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("is_auth") === "true",
  );
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordHint, setPasswordHint] = useState("");

  const [startDate, setStartDate] = useState(() => {
    const saved = localStorage.getItem("anni_date");
    return saved ? new Date(`${saved}T00:00:00`) : new Date();
  });

  const [inputDate, setInputDate] = useState(
    () => localStorage.getItem("anni_date") || "",
  );
  const [title, setTitle] = useState(
    () => localStorage.getItem("anni_title") || "Our Love Story",
  );

  const [leftPhoto, setLeftPhoto] = useState<string | null>(() =>
    localStorage.getItem("left_photo"),
  );
  const [rightPhoto, setRightPhoto] = useState<string | null>(() =>
    localStorage.getItem("right_photo"),
  );

  const [showEditModal, setShowEditModal] = useState(false);
  const [noteIndex, setNoteIndex] = useState(getStoredNoteIndex);
  const [currentNote, setCurrentNote] = useState(
    () => loveNotes[getStoredNoteIndex()],
  );
  const initialLockState = useMemo(
    () => getLockInfo(Date.now()),
    [getLockInfo],
  );
  const [canClick, setCanClick] = useState(initialLockState.canClick);
  const [unlockTime, setUnlockTime] = useState(initialLockState.unlockTime);
  const [anniversaryRipples, setAnniversaryRipples] = useState<Ripple[]>([]);
  const [isBirthdayOpened, setIsBirthdayOpened] = useState(false);
  const [timeStats, setTimeStats] = useState<TimeStats>({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });
  const todayKey = getYangonDateKey();
  // const isPreviewAnniversary =
  //   import.meta.env.DEV && todayKey !== "2026-04-17";
  const isThirdAnniversary = todayKey === "2026-04-17";
  const isBirthday = todayKey === BIRTHDAY_DATE_KEY;

  // --- Image Compressor Helper ---
  const compressImage = (file: File, callback: (base64: string) => void) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
        callback(compressedBase64);
      };
    };
  };

  const updateTimers = useCallback(() => {
    const now = new Date();
    const diff = Math.abs(now.getTime() - startDate.getTime());
    setTimeStats({
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      mins: Math.floor((diff / (1000 * 60)) % 60),
      secs: Math.floor((diff / 1000) % 60),
    });

    const lockInfo = getLockInfo(now.getTime());
    setCanClick(lockInfo.canClick);
    setUnlockTime(lockInfo.unlockTime);
  }, [startDate, getLockInfo]);

  useEffect(() => {
    if (!isSaved || !isAuthenticated) return;
    updateTimers();
    const interval = setInterval(updateTimers, 1000);
    return () => clearInterval(interval);
  }, [isSaved, isAuthenticated, updateTimers]);

  const handleSaveInitial = () => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(inputDate)) {
      alert("Please use YYYY-MM-DD format");
      return;
    }
    localStorage.setItem("anni_date", inputDate);
    localStorage.setItem("anni_title", title);
    setStartDate(new Date(`${inputDate}T00:00:00`));
    setIsSaved(true);
  };

  const handleUnlock = () => {
    const cleanInput = passwordInput.replace(/\D/g, "");
    const cleanAnni = inputDate.replace(/\D/g, "");
    if (cleanInput === cleanAnni) {
      localStorage.setItem("is_auth", "true");
      setIsAuthenticated(true);
      window.location.reload();
    } else {
      setPasswordHint(`Hint: It's our special date!`);
      alert("Incorrect Date!");
    }
  };

  const handlePhotoUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    side: "left" | "right",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      compressImage(file, (compressedBase64) => {
        try {
          if (side === "left") {
            setLeftPhoto(compressedBase64);
            localStorage.setItem("left_photo", compressedBase64);
          } else {
            setRightPhoto(compressedBase64);
            localStorage.setItem("right_photo", compressedBase64);
          }
        } catch (err) {
          alert("Storage is full! Please try a different photo.");
          console.error(err);
        }
      });
    }
  };

  const handleNewNote = () => {
    if (!canClick) return;
    const nextIndex = (noteIndex + 1) % loveNotes.length;
    const newNote = loveNotes[nextIndex];
    setNoteIndex(nextIndex);
    setCurrentNote(newNote);
    setCanClick(false);
    const now = new Date().getTime().toString();
    localStorage.setItem("last_love_note_time", now);
    localStorage.setItem("current_note", newNote);
    localStorage.setItem("current_note_index", nextIndex.toString());
  };

  const handleAnniversaryTouch = (e: React.PointerEvent<HTMLDivElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    const size = Math.max(box.width, box.height) * 0.9;
    const ripple: Ripple = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      x: e.clientX - box.left,
      y: e.clientY - box.top,
      size,
    };

    setAnniversaryRipples((prev) => [...prev, ripple]);
    setTimeout(() => {
      setAnniversaryRipples((prev) =>
        prev.filter((item) => item.id !== ripple.id),
      );
    }, 850);
  };

  if (isSaved && isAuthenticated && isBirthday && !isBirthdayOpened) {
    return <BirthdayCakeReveal onOpen={() => setIsBirthdayOpened(true)} />;
  }

  if (isSaved && isAuthenticated && isBirthday && isBirthdayOpened) {
    return <BirthdayDashboard leftPhoto={leftPhoto} rightPhoto={rightPhoto} />;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#FFF0F3] via-[#FFCCD5] to-[#FFB3C1] font-sans text-[#590D22] selection:bg-[#FF4D6D]/30 pb-20">
      {/* 1. SETUP SCREEN */}
      {!isSaved && (
        <div className="flex min-h-screen items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-white p-8 rounded-[40px] shadow-xl"
          >
            <h1 className="text-2xl font-bold text-center mb-6">
              💕 Our Scrapbook
            </h1>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Start Date (YYYY-MM-DD)"
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
                className="w-full h-12 px-4 rounded-full border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
              <input
                type="text"
                placeholder="Story Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-12 px-4 rounded-full border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
              <button
                onClick={handleSaveInitial}
                className="w-full h-12 bg-[#FF4D6D] text-white font-bold rounded-full hover:bg-[#FF758F] transition-colors"
              >
                Start Our Story 💌
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* 2. AUTH SCREEN */}
      {isSaved && !isAuthenticated && (
        <div className="flex min-h-screen items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white p-8 rounded-[40px] shadow-xl text-center"
          >
            <Lock size={48} className="mx-auto text-[#FF4D6D] mb-4" />
            <h2 className="text-2xl font-bold mb-2">Locked with Love</h2>
            <p className="text-slate-500 mb-6 text-sm">
              Enter our anniversary date to unlock
              <br />
              (Format: YYYYMMDD)
            </p>
            <input
              type="password"
              inputMode="numeric"
              placeholder="Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full h-12 px-6 rounded-full border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-300 text-center text-xl tracking-widest"
            />
            {passwordHint && (
              <p className="text-pink-600 text-xs mt-2 font-bold uppercase">
                {passwordHint}
              </p>
            )}
            <button
              onClick={handleUnlock}
              className="w-full h-12 bg-[#FF4D6D] text-white font-bold rounded-full mt-6 hover:bg-[#FF758F] shadow-lg"
            >
              Unlock 🗝️
            </button>
          </motion.div>
        </div>
      )}

      {/* 3. MAIN DASHBOARD */}
      {isSaved && isAuthenticated && (
        <div className="max-w-xl mx-auto px-6 py-10 space-y-8">
          {isThirdAnniversary && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
              onPointerDown={handleAnniversaryTouch}
              className="relative overflow-hidden rounded-3xl border border-pink-200/80 bg-gradient-to-br from-[#FF4D8D] via-[#FF6FA3] to-[#FF8DBA] p-7 text-center shadow-2xl"
            >
              {anniversaryRipples.map((ripple) => (
                <motion.span
                  key={ripple.id}
                  className="absolute rounded-full pointer-events-none border border-white/70 bg-white/20"
                  style={{
                    width: ripple.size,
                    height: ripple.size,
                    left: ripple.x - ripple.size / 2,
                    top: ripple.y - ripple.size / 2,
                  }}
                  initial={{ scale: 0, opacity: 0.6 }}
                  animate={{ scale: 1.35, opacity: 0 }}
                  transition={{ duration: 0.85, ease: "easeOut" }}
                />
              ))}

              {/* Floating rose petals */}
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={`petal-${i}`}
                  className="absolute pointer-events-none"
                  style={{ left: `${8 + i * 9}%`, top: "-10%" }}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{
                    y: [0, 190 + (i % 3) * 30],
                    x: [0, i % 2 === 0 ? 16 : -16, i % 2 === 0 ? -10 : 10],
                    opacity: [0, 0.85, 0],
                    rotate: [0, i % 2 === 0 ? 18 : -18],
                  }}
                  transition={{
                    duration: 5.2 + (i % 3),
                    repeat: Infinity,
                    delay: i * 0.35,
                    ease: "easeInOut",
                  }}
                >
                  <span className="text-lg">🌹</span>
                </motion.div>
              ))}

              {/* Subtle sparkle trail */}
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.span
                  key={`spark-${i}`}
                  className="absolute text-pink-100/80 pointer-events-none"
                  style={{
                    top: `${14 + (i % 4) * 20}%`,
                    left: `${10 + (i % 6) * 15}%`,
                  }}
                  animate={{
                    opacity: [0.2, 1, 0.25],
                    scale: [0.8, 1.25, 0.85],
                  }}
                  transition={{
                    duration: 1.8 + (i % 3) * 0.45,
                    repeat: Infinity,
                    delay: i * 0.16,
                  }}
                >
                  ✨
                </motion.span>
              ))}

              <div className="absolute inset-0 bg-gradient-to-t from-[#C9184A]/40 via-transparent to-pink-100/20" />

              <p className="relative text-xs font-bold uppercase tracking-[3px] text-pink-100 mb-2">
                A Night of Love
              </p>
              {/* {isPreviewAnniversary && (
                <p className="relative text-[11px] font-semibold text-pink-100/90 mb-2">
                  Preview mode is ON
                </p>
              )} */}
              <h2 className="relative text-2xl font-extrabold text-white mb-3">
                Happy 3 Years Anni Par "Ma"
              </h2>
              <p className="relative text-sm text-pink-50 leading-relaxed">
                17/04/2026 — three beautiful years of us. Thank you for every
                smile, every memory, and every heartbeat together.{" "}
                <span className="font-bold text-[#FFD7F8]">
                  I love you so much.
                </span>
              </p>
            </motion.div>
          )}

          <div
            onClick={() => setShowEditModal(true)}
            className="flex items-center justify-center gap-2 bg-white/40 backdrop-blur-sm py-2 px-6 rounded-full w-fit mx-auto cursor-pointer border border-white/50 hover:bg-white/60 transition-all shadow-sm"
          >
            <Calendar size={16} />
            <span className="font-semibold text-sm">
              {title}: {startDate.toDateString()}
            </span>
            <Edit2 size={14} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-[40px] shadow-2xl shadow-pink-200/50 border border-white"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <label className="relative cursor-pointer group">
                <div className="w-20 h-20 rounded-full border-4 border-pink-100 overflow-hidden bg-pink-50 flex items-center justify-center shadow-inner">
                  {leftPhoto ? (
                    <img
                      src={leftPhoto}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Heart className="text-pink-200" />
                  )}
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 rounded-full transition-opacity">
                  <Camera size={16} className="text-white" />
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handlePhotoUpload(e, "left")}
                />
              </label>

              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Heart size={32} fill="#FF4D6D" className="text-[#FF4D6D]" />
              </motion.div>

              <label className="relative cursor-pointer group">
                <div className="w-20 h-20 rounded-full border-4 border-pink-100 overflow-hidden bg-pink-50 flex items-center justify-center shadow-inner">
                  {rightPhoto ? (
                    <img
                      src={rightPhoto}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Heart className="text-pink-200" />
                  )}
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 rounded-full transition-opacity">
                  <Camera size={16} className="text-white" />
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handlePhotoUpload(e, "right")}
                />
              </label>
            </div>

            <div className="flex items-center justify-center gap-2 mb-6 text-[#C9184A] tracking-[3px] font-bold text-xs uppercase opacity-80">
              <Clock size={16} /> Time Spent Together
            </div>

            <div className="flex justify-center gap-3">
              <TimeBlock value={timeStats.days} label="Days" />
              <TimeBlock value={timeStats.hours} label="Hours" />
              <TimeBlock value={timeStats.mins} label="Mins" />
              <TimeBlock value={timeStats.secs} label="Secs" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/60 backdrop-blur-md p-10 rounded-[40px] border-2 border-dashed border-pink-300 text-center shadow-lg"
          >
            <Quote
              size={32}
              className="mx-auto text-pink-400 opacity-50 mb-4"
            />
            <p className="text-xl italic font-medium leading-relaxed mb-8 px-4 text-[#590D22]">
              &quot;{currentNote}&quot;
            </p>
            <button
              disabled={!canClick}
              onClick={handleNewNote}
              className={`px-8 py-4 rounded-full font-bold text-white shadow-lg transition-all ${canClick ? "bg-[#FF4D6D] hover:bg-[#FF758F] scale-105 active:scale-95" : "bg-[#C9184A] opacity-70 cursor-not-allowed"}`}
            >
              {canClick ? "Open Daily Note" : `Unlock in ${unlockTime}`}
            </button>
          </motion.div>
        </div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white w-full max-w-sm p-8 rounded-[32px] shadow-2xl relative"
            >
              <button
                onClick={() => setShowEditModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <X />
              </button>
              <h3 className="text-xl font-bold mb-6">Update Our Story</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={inputDate}
                  onChange={(e) => setInputDate(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-pink-100"
                  placeholder="YYYY-MM-DD"
                />
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-pink-100"
                  placeholder="Title"
                />
                <button
                  onClick={() => {
                    handleSaveInitial();
                    setShowEditModal(false);
                  }}
                  className="w-full h-12 bg-[#FF4D6D] text-white font-bold rounded-xl shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
