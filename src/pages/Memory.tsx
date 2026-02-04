import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Stars, MessageCircleHeart } from "lucide-react";

// --- Images ---
import meetImg from "../assets/images/meet.jpg";
import movieImg from "../assets/images/movie.jpg";
import travelImg from "../assets/images/travel.jpg";

const memories = [
  {
    id: "1",
    title: "The Days We Met With VC",
    image: meetImg,
    hiddenMessage:
      "အစောပိုင်းလတွေတုန်းက VC ပြောရင် မက စကားပြောရင်တို့  မျက်လုံးချင်းဆုံရင် ရှက်နေခဲ့တာလေးတွေကို သတိရမိသေးတယ်။ မက VC ပြောတိုင်း အမြဲတမ်း effect လေးသုံးပီး ပြောတတ်တာလေးက မောင့်အတွက်တော့ အရမ်းချစ်ဖို့ကောင်းခဲ့တာ။ အဲဒီ Video Call လေးတွေကနေစပြီး မောင့်ဘဝထဲ မ ရောက်လာခဲ့တာပါပဲ။ ❤️",
  },
  {
    id: "2",
    title: "First Movie Date",
    image: movieImg,
    hiddenMessage:
      "ဒါဟာ ဘဝမှာ ပထမဆုံးအကြိမ် မိန်းကလေးတစ်ယောက်နဲ့ အတူတူကြည့်ခဲ့ဖူးတဲ့ ရုပ်ရှင်လေးပေါ့။ အဲ့ဒီလူက မ ဖြစ်နေတာတင်မကဘဲ မောင့်အပေါ်  အရမ်းဂရုစိုက်ပြီး နွေးနွေးထွေးထွေး ရှိပေးတဲ့ကောင်မလေး တစ်ယောက်ပါ ခုချိန်ထိ ဖြစ်နေခဲ့တာ။ ❤️ (ပုံကတော့ အရမ်းလှနေကြတယ်😂)",
  },
  {
    id: "3",
    title: "First Travel Together",
    image: travelImg,
    hiddenMessage:
      "ဒါဟာ မ နဲ့အတူ ပထမဆုံးအကြိမ် ကားတူတူစီးခဲ့ဖူးတဲ့ အမှတ်တရလေးပေါ့။ အနားမှာ 'မ' ရှိနေပေးတော့ စိတ်ထဲမှာ အရမ်းလုံခြုံပြီး နွေးထွေးသလို ခံစားရတယ်။😅 ဒီ ကမ္ဘာကြီးထဲမှာ မောင့်ရဲ့ စိတ်အေးချမ်းရာလေး ဖြစ်ပေးလို့ ကျေးဇူးတင်ပါတယ်နော်။ နောင်လည်း ခုလိုပဲ မ့ လက်ကိုတွဲပြီး ကားတူတူစီးပီး ခရီးတွေသွားချင်သေးတယ်... အမြဲတမ်းပေါ့။ ❤️",
  },
];

const FallingHearts = () => {
  const [hearts] = useState<
    {
      id: number;
      x: number;
      delay: number;
      duration: number;
      size: number;
      xOffset: number;
    }[]
  >(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 5,
      size: 12 + Math.random() * 10,
      xOffset: Math.random() * 10 - 5,
    })),
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full h-full">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: -50, x: `${heart.x}vw`, opacity: 0 }}
          animate={{
            y: "110vh",
            opacity: [0, 1, 1, 0],
            x: `${heart.x + heart.xOffset}vw`,
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
          className="absolute"
        >
          <Heart
            size={heart.size}
            style={{ fill: "#FFB3C1", color: "#FFB3C1" }}
            className="opacity-40"
          />
        </motion.div>
      ))}
    </div>
  );
};

const MemoryCard = ({ item }: { item: (typeof memories)[0] }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative flex-shrink-0 w-[280px] h-[420px] sm:w-[320px] sm:h-[480px] cursor-pointer mx-3"
      style={{ perspective: "1200px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 50,
          damping: 15,
        }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="w-full h-full bg-white rounded-[24px] overflow-hidden shadow-xl border-[4px] border-white">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[70%] object-cover"
            />
            <div className="h-[30%] p-4 flex flex-col justify-center items-center text-center bg-white">
              <h3 className="text-md font-bold text-[#A4133C] leading-tight">
                {item.title}
              </h3>
              <p className="text-[10px] italic text-pink-500 mt-2 font-medium">
                Tap to see secret ✨
              </p>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-[#FFF9FB] to-[#FFE5EC] rounded-[24px] p-6 flex flex-col items-center justify-center text-center shadow-xl border-2 border-white/50">
            <MessageCircleHeart size={40} className="text-[#FF4D6D] mb-4" />
            <p className="text-sm italic leading-relaxed text-[#800F2F] font-medium">
              "{item.hiddenMessage}"
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function RomanticScrapbook() {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#FFF0F3] to-[#FFB3C1] overflow-hidden flex flex-col">
      <FallingHearts />

      {/* Header - Reduced padding (pt-6 instead of pt-12) */}
      <div className="relative z-10 pt-8 pb-2 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block"
        >
          <h1 className="text-xl font-black text-[#C9184A] flex items-center justify-center gap-2 tracking-tighter">
            <Stars size={20} className="text-yellow-400 fill-yellow-400" />
            OUR LOVE STORY
            <Stars size={20} className="text-yellow-400 fill-yellow-400" />
          </h1>
        </motion.div>
      </div>

      {/* Main Content - Flex-1 and justify-start helps move content up */}
      <div className="flex-1 flex items-start pt-4 relative z-10 overflow-x-auto no-scrollbar snap-x snap-mandatory">
        <div className="flex px-6 items-center min-h-full">
          {memories.map((memory) => (
            <div key={memory.id} className="snap-center">
              <MemoryCard item={memory} />
            </div>
          ))}
          <div className="w-10 flex-shrink-0" /> {/* Spacer */}
        </div>
      </div>

      {/* Bottom Hint - Moved closer to the cards */}
      <div className="relative z-10 pb-24 text-center pointer-events-none">
        <p className="text-[9px] font-black text-[#A4133C] opacity-40 uppercase tracking-[3px]">
          Swipe to explore
        </p>
      </div>
    </div>
  );
}
