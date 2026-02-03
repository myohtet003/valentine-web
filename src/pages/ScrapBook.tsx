import  { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import { X } from "lucide-react";

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
];

export default function DigitalScrapbook() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  import type { PanInfo } from "framer-motion";

  const handleDragEnd = (_: MouseEvent | TouchEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold && currentPage < scrapbookData.length - 1) {
      setCurrentPage(currentPage + 1);
    } else if (info.offset.x > threshold && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    // 1. Root Container: Padding Bottom ထည့်ထားခြင်းဖြင့် Tab bar နဲ့ မငြိတော့ပါ
    <div className="fixed inset-0 bg-[#FFB3C1] flex flex-col items-center justify-start overflow-hidden touch-none pb-[80px]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF0F3] via-[#FFCCD5] to-[#FFB3C1]" />

      {/* 2. Phone Wrapper: Height ကို 100% မယူဘဲ Tab bar အတွက် နေရာချန်ထားပါတယ် */}
      <div className="relative w-full h-[calc(100vh-100px)] max-w-[430px] z-10 perspective-[2000px] mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{
              duration: 0.6,
              type: "spring",
              stiffness: 200,
              damping: 25,
            }}
            // Card ကို အောက်ခြေထိ မဆင်းစေရန် margin-bottom ပေးထားသည်
            className="absolute inset-x-4 inset-y-2 rounded-[40px] border border-white/40 overflow-hidden bg-gradient-to-br from-[#FFD6E0] to-[#FFF0F3] shadow-2xl flex flex-col preserve-3d"
          >
            {/* Header */}
            <div className="pt-10 pb-4 flex flex-col items-center z-20 pointer-events-none">
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
                  key={idx}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  style={{
                    position: "absolute",
                    top: item.top,
                    left: item.left,
                    rotate: `${item.rotate}deg`,
                    zIndex: item.type === "sticker" ? 10 : 5,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (item.type === "photo")
                      setSelectedPhoto(item.source as string);
                  }}
                >
                  <div
                    className={`${item.type === "photo" ? "p-2 bg-white shadow-lg" : ""}`}
                  >
                    <img
                      src={item.source as string}
                      alt="memory"
                      style={{ width: item.width, height: item.height }}
                      className="object-cover"
                    />
                    {item.type === "photo" && (
                      <div className="text-center text-[10px] mt-1 text-pink-400">
                        ♡
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 3. Lottie Animation: Z-index ကို အမြင့်ဆုံးထားပြီး pointer-events-none လုပ်ထားသည် */}
            <div className="absolute bottom-2 right-2 w-32 h-32 z-30 pointer-events-none">
              <Lottie
                animationData={heartAnimation}
                loop={true}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Indicators */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
          {scrapbookData.map((_, i) => (
            <div
              key={i}
              className={`h-1 w-1 rounded-full ${i === currentPage ? "bg-[#C9184A] w-4" : "bg-white/40"}`}
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
              className="max-w-full max-h-[70vh] rounded-xl"
            />
            <button className="mt-6 text-white/50 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
              <X size={16} /> Tap to Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
