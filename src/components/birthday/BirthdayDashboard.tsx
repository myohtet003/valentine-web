import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cake, Heart, Quote, Sparkles } from "lucide-react";
import { BirthdayExtras } from "./BirthdayExtras";
import birthdayOne from "../../assets/images/birthday/1.jpg";
import birthdayTwo from "../../assets/images/birthday/2.jpg";
import birthdayThree from "../../assets/images/birthday/3.jpg";
import birthdayFour from "../../assets/images/birthday/4.jpg";

interface BirthdayDashboardProps {
  leftPhoto: string | null;
  rightPhoto: string | null;
  onVoicePlay: (audio: HTMLAudioElement) => void;
  onVoiceStop: () => void;
}

const birthdayWishes = [
  {
    title: "Happy Birthday မ 🎂✨",
    text: "မ့ မွေးနေ့မှာ စိတ်ရော ကိုယ်ပါ ပျော်ရွှင်ပါစေ။ အမြဲ ပြုံးနေပေးနော်။",
  },
  {
    title: "မ့ အလိုကျ 💖",
    text: "အရာအားလုံး အမြဲ မ့ အလိုကျပဲ ဖြစ်ပါစေဗျာ။",
  },
  {
    title: "အကြိုက်ဆုံး အပြုံး 🌸",
    text: "စိတ်ညစ်စရာတွေအကုန် ကင်းဝေးပြီး အပြုံးလေးတွေပဲ ပိုင်ဆိုင်နိုင်ပါစေ။",
  },
  {
    title: "မ့အတွက်ပဲ 🎁",
    text: "မွေးနေ့မှာ မ့ စိတ်ချမ်းသာဖို့ပဲ အရေးကြီးဆုံးမို့ အမြဲ ပျော်နေပေးနော်။",
  },
];

const scrapbookPhotos = [
  { src: birthdayOne, label: "Birthday memory", rotate: -7 },
  { src: birthdayTwo, label: "Sweet smile", rotate: 5 },
  { src: birthdayThree, label: "Pretty moment", rotate: -4 },
  { src: birthdayFour, label: "Forever us", rotate: 6 },
];

export function BirthdayDashboard({
  leftPhoto,
  rightPhoto,
  onVoicePlay,
  onVoiceStop,
}: BirthdayDashboardProps) {
  const [currentWish, setCurrentWish] = useState(0);
  const heroPhotos = [leftPhoto || birthdayOne, rightPhoto || birthdayThree];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWish((prev) => (prev + 1) % birthdayWishes.length);
    }, 4300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FFF0F3] font-sans text-[#590D22] selection:bg-[#FF4D6D]/25">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,179,193,0.65)_0,transparent_28%),radial-gradient(circle_at_85%_18%,rgba(255,214,226,0.8)_0,transparent_26%),linear-gradient(180deg,#FFF0F3_0%,#FFE5EC_54%,#FFCCD5_100%)]" />
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "radial-gradient(rgba(201,24,74,0.22) 0.8px, transparent 0.8px)",
          backgroundSize: "26px 26px",
        }}
      />

      {Array.from({ length: 16 }).map((_, index) => (
        <motion.div
          key={`birthday-heart-${index}`}
          className="absolute pointer-events-none text-[#FF8FA3]/55"
          style={{
            left: `${5 + ((index * 13) % 90)}%`,
            top: `${8 + ((index * 17) % 84)}%`,
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.25, 0.8, 0.25],
            scale: [0.85, 1.14, 0.85],
          }}
          transition={{
            duration: 3.6 + (index % 4) * 0.35,
            repeat: Infinity,
            delay: index * 0.18,
          }}
        >
          ♥
        </motion.div>
      ))}

      <main className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col px-5 py-8 pb-24">
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-white/70 bg-white/55 px-5 py-2 text-[11px] font-black uppercase tracking-[3px] text-[#C9184A] shadow-sm backdrop-blur">
            <Sparkles size={15} />
            23 October 2026
          </div>
          <h1 className="text-4xl font-black leading-tight text-[#A4133C] sm:text-6xl">
            Happy Birthday
            <span className="block text-[#FF4D6D]">Mg&apos;s Ma</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold leading-7 text-[#800F2F]/75 sm:text-base">
            မ့အတွက် ဒီနေ့လေးကို ချစ်ခြင်းတွေ၊ အမှတ်တရတွေ၊ ဆုတောင်းလေးတွေနဲ့
            သေချာ‌လေး ပြင်ထားပေးတယ်နော်။
          </p>
        </motion.header>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="relative overflow-hidden rounded-[34px] border-[6px] border-white bg-[#FFF9FB] p-5 shadow-2xl shadow-pink-300/35"
          >
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#FFCCD5]/80 to-transparent" />
            <div className="relative z-10 flex items-center gap-3 text-[#C9184A]">
              <Cake size={24} />
              <div>
                <p className="text-[10px] font-black uppercase tracking-[3px]">
                  Birthday Letter
                </p>
                <h2 className="text-2xl font-black">မောင့်ဆုတောင်းလေး</h2>
              </div>
            </div>

            <div className="relative z-10 mt-6 rounded-[28px] border border-pink-100 bg-white/85 p-6 shadow-inner">
              <Quote size={28} className="mb-4 text-[#FF758F]" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentWish}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.35 }}
                  className="min-h-44"
                >
                  <p className="text-sm font-black uppercase tracking-[2px] text-[#FF4D6D]">
                    {birthdayWishes[currentWish].title}
                  </p>
                  <p className="mt-3 text-lg font-bold leading-9 text-[#590D22]">
                    {birthdayWishes[currentWish].text}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-5 flex gap-2">
                {birthdayWishes.map((wish, index) => (
                  <button
                    key={wish.title}
                    type="button"
                    aria-label={`Show ${wish.title}`}
                    onClick={() => setCurrentWish(index)}
                    className={`h-2 rounded-full transition-all ${
                      currentWish === index
                        ? "w-10 bg-[#FF4D6D]"
                        : "w-3 bg-[#FFB3C1]"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-5 rounded-[24px] bg-[#FFF0F3] p-4 text-center">
              <Heart
                size={26}
                fill="#FF4D6D"
                className="mx-auto mb-2 text-[#FF4D6D]"
              />
              <p className="text-sm font-black leading-7 text-[#A4133C]">
                မ့ဘေးနားမှာ အမြဲရှိနေမယ်။
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.22 }}
            className="relative min-h-[520px] overflow-hidden rounded-[36px] border-[6px] border-white bg-[#FFF0F3] shadow-2xl shadow-pink-300/35"
            style={{
              backgroundImage:
                "radial-gradient(#ffb3c1 0.8px, transparent 0.8px)",
              backgroundSize: "24px 24px",
            }}
          >
            <div className="absolute left-1/2 top-8 -translate-x-1/2 rounded-full bg-white/70 px-5 py-2 text-[10px] font-black uppercase tracking-[3px] text-[#C9184A] shadow-sm backdrop-blur">
              Our Pretty Memories
            </div>

            <MemoryPhoto
              src={heroPhotos[0]}
              alt="Birthday memory"
              className="left-[7%] top-[18%] h-56 w-44 rotate-[-8deg]"
            />
            <MemoryPhoto
              src={heroPhotos[1]}
              alt="Birthday memory"
              className="right-[7%] top-[28%] h-64 w-48 rotate-[7deg]"
            />
            <MemoryPhoto
              src={birthdayTwo}
              alt="Birthday memory"
              className="left-[17%] bottom-[12%] h-36 w-32 rotate-[5deg]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 }}
              className="absolute bottom-7 right-7 max-w-[210px] rounded-[26px] bg-[#C9184A]/90 px-5 py-4 text-white shadow-xl backdrop-blur"
            >
              <p className="text-[10px] font-black uppercase tracking-[2px] text-[#FFD7E0]">
                Promise
              </p>
              <p className="mt-1 text-base font-black leading-7">
                မ့ဘေးနားမှာ အမြဲရှိနေမယ်နော်။
              </p>
            </motion.div>
          </motion.div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {scrapbookPhotos.map((photo, index) => (
            <button
              key={photo.label}
              type="button"
              onClick={() => setCurrentWish(index)}
              className={`group rounded-[28px] border p-3 text-left shadow-lg transition-all ${
                currentWish === index
                  ? "border-[#FF4D6D] bg-white"
                  : "border-white/70 bg-white/60 hover:bg-white"
              }`}
            >
              <div
                className="aspect-[4/3] overflow-hidden rounded-[20px] bg-pink-50"
                style={{ rotate: `${photo.rotate / 2}deg` }}
              >
                <img
                  src={photo.src}
                  alt={photo.label}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-3 text-xs font-black uppercase tracking-[2px] text-[#C9184A]">
                {birthdayWishes[index].title}
              </p>
              <p className="mt-1 line-clamp-2 text-xs font-semibold leading-5 text-[#800F2F]/70">
                {birthdayWishes[index].text}
              </p>
            </button>
          ))}
        </motion.section>
        <BirthdayExtras onVoicePlay={onVoicePlay} onVoiceStop={onVoiceStop} />
      </main>
    </div>
  );
}

interface MemoryPhotoProps {
  src: string;
  alt: string;
  className: string;
}

function MemoryPhoto({ src, alt, className }: MemoryPhotoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 90, damping: 14 }}
      className={`absolute bg-white p-2 shadow-2xl ${className}`}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />
      <div className="absolute bottom-0 left-0 right-0 flex h-7 items-center justify-center text-xs font-black text-[#FF4D6D]">
        ♥
      </div>
    </motion.div>
  );
}
