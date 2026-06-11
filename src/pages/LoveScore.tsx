import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoveScoreApp() {
  // LocalStorage ကနေ Initial Value တွေကို ဆွဲယူခြင်း (မရှိရင် 0 ပြောင်းမည်)
  const [goodScore, setGoodScore] = useState<number>(() => {
    const saved = localStorage.getItem("romantic_good_score");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [badScore, setBadScore] = useState<number>(() => {
    const saved = localStorage.getItem("romantic_bad_score");
    return saved ? parseInt(saved, 10) : 0;
  });

  // ✨ Math.random() Error ကို ရှင်းရန်:
  // Component စဖွင့်ကတည်းက နှလုံးသား ၁၂ ခုအတွက် left position တွေကို State ထဲမှာ တစ်ခါတည်း ကြိုတင်တွက်ချက်ခြင်း။
  // ပထမဆုံးအကြိမ်ပဲ အလုပ်လုပ်မှာဖြစ်လို့ Render Flow ကို Pure ဖြစ်စေပြီး Error လုံးဝ မတက်တော့ပါ။
  const [heartPositions] = useState<string[]>(() =>
    [...Array(12)].map(() => `${Math.random() * 100}%`),
  );

  // အမှတ်တွေ ပြောင်းလဲသွားတိုင်း LocalStorage ထဲမှာ သိမ်းဆည်းပေးခြင်း
  useEffect(() => {
    localStorage.setItem("romantic_good_score", goodScore.toString());
  }, [goodScore]);

  useEffect(() => {
    localStorage.setItem("romantic_bad_score", badScore.toString());
  }, [badScore]);

  const scoreDifference = goodScore - badScore;

  // 5 Romantic Mood System
  const getMood = () => {
    if (scoreDifference <= -4) {
      return {
        key: "heartbroken",
        emoji: "😭",
        title: "မောင့်ကို စိတ်တော်တော်ဆိုးနေပြီ",
        message: "ချော့ဖို့သာ ပြင်ထားလိုက် ဟွန့် 💔",
        color: "text-red-500",
        bg: "from-red-100 via-pink-100 to-red-50",
        animation: { x: [-5, 5, -5, 5, 0] },
      };
    }

    if (scoreDifference < 0) {
      return {
        key: "sulking",
        emoji: "😒",
        title: "မောင့်ကို သိပ်ကြည်မနေဘူးနော်",
        message: "ချစ်ပေမယ့် စိတ်ကောက်တယ် 😤",
        color: "text-orange-500",
        bg: "from-orange-50 via-pink-50 to-orange-100",
        animation: { rotate: [-2, 2, -2, 2, 0] },
      };
    }

    if (scoreDifference <= 2) {
      return {
        key: "neutral",
        emoji: "🙂",
        title: "ပုံမှန်ပါပဲ",
        message: "သာမန်နေ့လေးပါပဲ 😌",
        color: "text-blue-500",
        bg: "from-blue-50 via-pink-50 to-blue-100",
        animation: { y: [0, -4, 0] },
      };
    }

    if (scoreDifference <= 6) {
      return {
        key: "love",
        emoji: "🥰",
        title: "မောင့်ကို ချစ်တယ်",
        message: "လိမ္မာနေလို့ အရမ်းသဘောကျတယ် 💕",
        color: "text-pink-500",
        bg: "from-pink-100 via-rose-50 to-pink-100",
        animation: { y: [0, -10, 0] },
      };
    }

    return {
      key: "obsessed",
      emoji: "💖",
      title: "မ့ရဲ့ အလိမ္မာလေး",
      message: "ဒီနေ့တော့ အရမ်းချစ်နေပြီ 💞✨",
      color: "text-rose-500",
      bg: "from-rose-100 via-pink-50 to-purple-100",
      animation: { scale: [1, 1.08, 1] },
    };
  };

  const mood = getMood();

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br ${mood.bg} relative overflow-hidden`}
    >
      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {heartPositions.map((leftPos, i) => (
          <motion.span
            key={i}
            className="absolute text-pink-300 text-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: [0, 0.5, 0], y: [-20, -300] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 0.6,
            }}
            style={{ left: leftPos }} // ✨ Error တက်စေတဲ့ Math.random() နေရာမှာ ကြိုတွက်ထားတဲ့ State တန်ဖိုးကို အစားထိုးလိုက်သည်
          >
            💖
          </motion.span>
        ))}
      </div>

      {/* Main Card */}
      <motion.div
        layout
        className="
          relative
          bg-white/90
          backdrop-blur-md
          p-8
          rounded-[32px]
          shadow-[0_20px_60px_rgba(255,105,180,0.2)]
          border border-pink-100
          w-full max-w-sm
          text-center
          overflow-hidden
        "
      >
        {/* Top Glow */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-pink-200 via-rose-100 to-pink-200 opacity-40" />

        {/* Mood Section */}
        <div className="mb-6 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={mood.key}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, ...mood.animation }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 180 }}
            >
              <motion.div
                className="text-7xl mb-3 select-none"
                animate={{ rotate: [-3, 3, -3, 3, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {mood.emoji}
              </motion.div>

              {scoreDifference >= 3 && (
                <motion.div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl"
                  animate={{ y: [-10, -30], opacity: [1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  💕
                </motion.div>
              )}

              <h2 className={`text-3xl font-black ${mood.color}`}>
                {mood.title}
              </h2>

              <p className="text-gray-500 mt-2">{mood.message}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Love Meter */}
        <div className="relative h-5 bg-pink-100 rounded-full overflow-hidden mb-6">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-red-400"
            animate={{
              width: `${Math.max(
                10,
                Math.min(100, 50 + scoreDifference * 8),
              )}%`,
            }}
            transition={{ type: "spring", stiffness: 80 }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white select-none">
            Love Meter 💖
          </div>
        </div>

        {/* Extra Message */}
        <p className="text-xs text-pink-500 mb-6 font-medium">
          {scoreDifference >= 6
            ? "💍 ဒီအတိုင်းဆို အိမ်မှာ ခေါ်ထားပစ်မယ်"
            : scoreDifference >= 3
              ? "🌹 အရမ်းချစ်တယ်"
              : scoreDifference >= 0
                ? "💕 ချစ်နေဆဲ"
                : scoreDifference > -4
                  ? "🥺 ချော့လိုက်ပါဦး"
                  : "💔 အမြန်ချော့တော့"}
        </p>

        {/* Scores */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-pink-50 p-4 rounded-2xl relative overflow-hidden">
            <p className="text-xs font-semibold text-pink-500">
              ချစ်စရာကောင်းတာ
            </p>
            <AnimatePresence mode="popLayout">
              <motion.div
                key={goodScore}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="text-4xl font-black text-pink-600 mt-1"
              >
                {goodScore}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="bg-red-50 p-4 rounded-2xl relative overflow-hidden">
            <p className="text-xs font-semibold text-red-600">
              စိတ်ဆိုးအောင်လုပ်တာ
            </p>
            <AnimatePresence mode="popLayout">
              <motion.div
                key={badScore}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="text-4xl font-black text-red-600 mt-1"
              >
                {badScore}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setGoodScore((p) => p + 1)}
            className="bg-[#f0c0ca] text-white py-3 rounded-2xl font-bold shadow-md hover:bg-[#f2a9b8] active:outline-none focus:outline-none transition-colors cursor-pointer select-none"
          >
            ချစ်စရာကောင်းလို့ အမှတ်ပေးမယ် 👍
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setBadScore((p) => p + 1)}
            className="bg-red-500 text-white py-3 rounded-2xl font-bold shadow-md hover:bg-red-600 active:outline-none focus:outline-none transition-colors cursor-pointer select-none"
          >
            စိတ်ဆိုးအောင်လုပ်လို့ အမှတ်လျှော့မယ် 👎
          </motion.button>
        </div>

        {/* Reset */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            if (
              typeof window !== "undefined" &&
              window.confirm("အမှတ်တွေကို တကယ် အစက ပြန်စမှာလားဟင်? 🥺")
            ) {
              setGoodScore(0);
              setBadScore(0);
            }
          }}
          className="text-xs text-gray-400 mt-6 underline cursor-pointer hover:text-gray-600 block mx-auto border-none bg-transparent focus:outline-none"
        >
          Reset အမှတ်များ
        </motion.button>
      </motion.div>
    </div>
  );
}
