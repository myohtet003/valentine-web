import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Stars, MessageCircleHeart } from "lucide-react";

// ၁။ ပုံတွေကို Import အရင်လုပ်ပါ (Path မှန်အောင် စစ်ပေးပါ)
import meetImg from "../assets/images/meet.jpg";
import movieImg from "../assets/images/movie.jpg";
import travelImg from "../assets/images/travel.jpg";

const memories = [
  {
    id: "1",
    title: "The Days We Met With VC",
    image: meetImg, // variable ကို သုံးပါ
    hiddenMessage:
      "အစောပိုင်းလတွေတုန်းက VC ပြောရင် မက စကားပြောရင်တို့ မျက်လုံးချင်းဆုံရင် ရှက်နေခဲ့တာလေးတွေကို သတိရမိသေးတယ်။ ❤️",
  },
  {
    id: "2",
    title: "First Movie Date",
    image: movieImg,
    hiddenMessage:
      "ဒါဟာ ဘဝမှာ ပထမဆုံးအကြိမ် မိန်းကလေးတစ်ယောက်နဲ့ အတူတူကြည့်ခဲ့ဖူးတဲ့ ရုပ်ရှင်လေးပေါ့။ ❤️",
  },
  {
    id: "3",
    title: "First Travel Together",
    image: travelImg,
    hiddenMessage:
      "ဒါဟာ မ နဲ့အတူ ပထမဆုံးအကြိမ် ကားတူတူစီးခဲ့ဖူးတဲ့ အမှတ်တရလေးပေါ့။ ❤️",
  },
];

// --- Falling Hearts Background (မပြောင်းလဲပါ) ---
const FallingHearts = () => {
  const [hearts, setHearts] = React.useState<{ x: string; duration: number }[]>(
    [],
  );
  React.useEffect(() => {
    setHearts(
      Array.from({ length: 15 }, () => ({
        x: Math.random() * 100 + "%",
        duration: 7 + Math.random() * 5,
      })),
    );
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart, i) => (
        <motion.div
          key={i}
          initial={{ y: -100, x: heart.x, opacity: 0 }}
          animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: 360 }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "linear",
          }}
          className="absolute"
        >
          <Heart size={16} className="text-pink-300 fill-pink-300 opacity-40" />
        </motion.div>
      ))}
    </div>
  );
};

// --- Memory Card Component ---
const MemoryCard = ({ item }: { item: (typeof memories)[0] }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative flex-shrink-0 w-[300px] h-[500px] cursor-pointer perspective-1000 mx-4"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 60 }}
        className="relative w-full h-full preserve-3d"
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden">
          <div className="w-full h-full bg-white rounded-[32px] overflow-hidden shadow-xl border-4 border-white">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-3/4 object-cover"
            />
            <div className="h-1/4 p-4 flex flex-col justify-center bg-white/90">
              <h3 className="text-lg font-bold text-[#A4133C] leading-tight">
                {item.title}
              </h3>
              <p className="text-[10px] italic text-pink-500 mt-1">
                Tap to see secret ✨
              </p>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className="w-full h-full bg-gradient-to-br from-[#FFF9FB] to-[#FFE5EC] rounded-[32px] p-6 flex flex-col items-center justify-center text-center shadow-2xl border-2 border-pink-100">
            <MessageCircleHeart
              size={40}
              className="text-[#FF4D6D] mb-4 opacity-70"
            />
            <p className="text-sm italic leading-relaxed text-[#800F2F]">
              {item.hiddenMessage}
            </p>
            <span className="mt-4 text-[10px] font-bold text-[#C9184A] uppercase tracking-widest">
              Forever Yours ❤️
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function RomanticScrapbook() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF0F3] to-[#FFB3C1] overflow-hidden flex flex-col">
      <FallingHearts />

      {/* Header */}
      <div className="text-center mt-10 mb-6 relative z-10 px-4">
        <h1 className="text-2xl font-extrabold text-[#C9184A] flex items-center justify-center gap-2">
          <Stars size={20} /> Our Love Story <Stars size={20} />
        </h1>
      </div>

      {/* Horizontal Scroll Area */}
      <div className="flex-1 flex items-center relative z-10 overflow-x-auto no-scrollbar pb-20">
        <div className="flex px-8">
          {memories.map((memory) => (
            <MemoryCard key={memory.id} item={memory} />
          ))}
        </div>
      </div>

      <div className="fixed bottom-24 left-0 right-0 text-center pointer-events-none">
        <p className="text-[10px] font-bold text-[#A4133C] opacity-50 uppercase tracking-[2px]">
          Swipe left to see more
        </p>
      </div>
    </div>
  );
}
