import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import { X } from "lucide-react";
import type { PanInfo } from "framer-motion";

// Assets
import heartAnimation from "../assets/lottie/like.json";
import img1 from "../assets/images/phayar/1.jpg";

const scrapbookData = [
  {
    id: "page1",
    title: "pagoda visits✨ >>",
    date: "memories",
    items: [
      {
        type: "photo",
        source: img1,
        top: "15%",
        left: "10%",
        rotate: -8,
        width: 160,
        height: 200,
      },
      {
        type: "sticker",
        source: "https://picsum.photos/100/100?2",
        top: "10%",
        left: "60%",
        rotate: 15,
        width: 80,
        height: 80,
      },
      {
        type: "photo",
        source: "https://picsum.photos/200/300?3",
        top: "50%",
        left: "45%",
        rotate: 5,
        width: 140,
        height: 180,
      },
    ],
  },
  {
    id: "page2",
    title: "sweet moments✨ >>",
    date: "forever",
    items: [
      {
        type: "photo",
        source: img1,
        top: "15%",
        left: "10%",
        rotate: -8,
        width: 160,
        height: 200,
      },
      {
        type: "sticker",
        source: "https://picsum.photos/100/100?2",
        top: "10%",
        left: "60%",
        rotate: 15,
        width: 80,
        height: 80,
      },
      {
        type: "photo",
        source: "https://picsum.photos/200/300?3",
        top: "50%",
        left: "45%",
        rotate: 5,
        width: 140,
        height: 180,
      },
    ],
  },
];

export default function DigitalScrapbook() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false); // Animation ဖြစ်နေစဉ် drag ပိတ်ရန်

  const handleDragEnd = (_: MouseEvent | TouchEvent, info: PanInfo) => {
    if (isAnimating) return; // Animation မပြီးသေးရင် ဘာမှမလုပ်ပါ

    const threshold = 100; // Threshold ကို နည်းနည်းတိုးလိုက်ပါ (မတော်တဆ ထိမိတာ ကာကွယ်ရန်)
    const velocity = info.velocity.x;

    if (info.offset.x < -threshold || velocity < -500) {
      if (currentPage < scrapbookData.length - 1) {
        setIsAnimating(true);
        setCurrentPage((prev) => prev + 1);
      }
    } else if (info.offset.x > threshold || velocity > 500) {
      if (currentPage > 0) {
        setIsAnimating(true);
        setCurrentPage((prev) => prev - 1);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-[#FFB3C1] flex flex-col items-center justify-start overflow-hidden touch-none pb-[80px]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF0F3] via-[#FFCCD5] to-[#FFB3C1]" />

      <div className="relative w-full h-[calc(100vh-120px)] max-w-[430px] z-10 perspective-[2000px] mt-4 flex items-center justify-center">
        {/* popLayout mode သည် page အဟောင်းထွက်သွားမှ အသစ်ဝင်လာစေပြီး unresponsive ဖြစ်တာကို ကာကွယ်ပေးသည် */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentPage}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            onAnimationComplete={() => setIsAnimating(false)} // Animation ပြီးမှ နောက်တစ်ခါ ဆွဲခွင့်ပေးမည်
            initial={{ x: 300, opacity: 0, rotateY: 45 }}
            animate={{ x: 0, opacity: 1, rotateY: 0 }}
            exit={{ x: -300, opacity: 0, rotateY: -45 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="absolute w-[90%] h-[90%] rounded-[40px] border border-white/40 overflow-hidden bg-gradient-to-br from-[#FFD6E0] to-[#FFF0F3] shadow-2xl flex flex-col preserve-3d touch-none"
          >
            {/* Header */}
            <div className="pt-10 pb-4 flex flex-col items-center z-20 pointer-events-none select-none">
              <div className="bg-white/50 backdrop-blur-md px-6 py-2 rounded-full border border-white/60">
                <span className="text-[#C9184A] font-extrabold text-sm tracking-tight">
                  {scrapbookData[currentPage].title}
                </span>
              </div>
              <span className="text-[10px] text-[#A4133C] font-bold mt-2 uppercase tracking-[3px] opacity-60">
                {scrapbookData[currentPage].date}
              </span>
            </div>

            {/* Scrapbook Elements */}
            <div className="relative flex-1 w-full overflow-hidden">
              {scrapbookData[currentPage].items.map((item, idx) => (
                <motion.div
                  key={`${currentPage}-${idx}`} // Key ကို page id ပါထည့်ပေးမှ element တွေ မရောမှာဖြစ်သည်
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  style={{
                    position: "absolute",
                    top: item.top,
                    left: item.left,
                    rotate: `${item.rotate}deg`,
                    zIndex: item.type === "sticker" ? 10 : 5,
                  }}
                  onTap={() => {
                    // Click အစား Framer Motion ရဲ့ onTap ကိုသုံးခြင်းက Drag နဲ့ မငြိစေပါ
                    if (item.type === "photo")
                      setSelectedPhoto(item.source as string);
                  }}
                >
                  <div
                    className={`${item.type === "photo" ? "p-2 bg-white shadow-lg cursor-pointer" : ""}`}
                  >
                    <img
                      src={item.source as string}
                      alt="memory"
                      style={{ width: item.width, height: item.height }}
                      className="object-cover pointer-events-none" // Image ကို drag ဆွဲမိတာ ကာကွယ်ရန်
                    />
                    {item.type === "photo" && (
                      <div className="text-center text-[10px] mt-1 text-pink-400 font-bold">
                        ♡
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Lottie Animation */}
            <div className="absolute bottom-4 right-4 w-24 h-24 z-30 pointer-events-none">
              <Lottie animationData={heartAnimation} loop={true} />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Indicators */}
        <div className="absolute bottom-[-20px] left-0 right-0 flex justify-center gap-2 z-20">
          {scrapbookData.map((_, i) => (
            <motion.div
              key={i}
              animate={{ width: i === currentPage ? 16 : 4 }}
              className={`h-1 rounded-full ${i === currentPage ? "bg-[#C9184A]" : "bg-white/40"}`}
            />
          ))}
        </div>
      </div>

      {/* Full Image Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[999] flex flex-col items-center justify-center p-6"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              src={selectedPhoto}
              className="max-w-full max-h-[70vh] rounded-xl shadow-2xl"
            />
            <button className="mt-8 text-white/70 text-xs font-bold tracking-widest uppercase flex items-center gap-2 border border-white/20 px-4 py-2 rounded-full">
              <X size={14} /> Tap to Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
