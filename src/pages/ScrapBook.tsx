import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import { X, Stars } from "lucide-react";

// --- Assets Imports ---
import heartAnimation from "../assets/lottie/like.json";
import img1 from "../assets/images/phayar/1.jpg";
import img2 from "../assets/images/phayar/2.jpg";
import img3 from "../assets/images/phayar/3.jpg";
import img4 from "../assets/images/phayar/4.jpg";
import img5 from "../assets/images/phayar/5.jpg";
import bir1 from "../assets/images/birthday/1.jpg";
import bir2 from "../assets/images/birthday/2.jpg";
import bir3 from "../assets/images/birthday/3.jpg";
import bir4 from "../assets/images/birthday/4.jpg";
import bir5 from "../assets/images/birthday/6.jpg";
import tha1 from "../assets/images/thanakhar/1.jpg";
import tha2 from "../assets/images/thanakhar/2.jpg";
// import tha3 from "../assets/images/thanakhar/3.jpg";
import tha4 from "../assets/images/thanakhar/4.jpg";
import tha5 from "../assets/images/thanakhar/5.jpg";
import tha6 from "../assets/images/thanakhar/6.jpg";
import tha7 from "../assets/images/thanakhar/7.jpg";
import cof1 from "../assets/images/coffee/1.jpg";
import cof2 from "../assets/images/coffee/2.jpg";
import cof3 from "../assets/images/coffee/3.jpg";
import cof4 from "../assets/images/coffee/4.jpg";
import cof5 from "../assets/images/coffee/5.jpg";
import tog1 from "../assets/images/sport/1.jpg";
import tog2 from "../assets/images/sport/2.jpg";
import tog3 from "../assets/images/sport/3.jpg";
import tog4 from "../assets/images/sport/4.jpg";
import tog5 from "../assets/images/sport/5.jpg";
// import tog6 from "../assets/images/sport/6.jpg";

const scrapbookData = [
  {
    id: "page1",
    title: "Pagoda Visits✨",
    date: "Memories",
    items: [
      {
        type: "photo",
        source: img1,
        top: "8%",
        left: "5%",
        rotate: -6,
        width: 150,
        height: 180,
      },
      {
        type: "sticker",
        source: img2,
        top: "5%",
        left: "60%",
        rotate: 12,
        width: 90,
        height: 90,
      },
      {
        type: "photo",
        source: img3,
        top: "25%",
        left: "45%",
        rotate: 8,
        width: 140,
        height: 170,
      },
      {
        type: "photo",
        source: img4,
        top: "52%",
        left: "3%",
        rotate: -4,
        width: 140,
        height: 160,
      },
      {
        type: "photo",
        source: img5,
        top: "55%",
        left: "52%",
        rotate: -10,
        width: 130,
        height: 150,
      },
    ],
  },
  {
    id: "page2",
    title: "Birthday Fun 🎉",
    date: "Forever",
    items: [
      {
        type: "photo",
        source: bir1,
        top: "2%",
        left: "12%",
        rotate: -3,
        width: 220,
        height: 200,
      },
      {
        type: "photo",
        source: bir3,
        top: "38%",
        left: "5%",
        rotate: -8,
        width: 150,
        height: 170,
      },
      {
        type: "sticker",
        source: bir2,
        top: "35%",
        left: "65%",
        rotate: 15,
        width: 110,
        height: 90,
      },
      {
        type: "photo",
        source: bir4,
        top: "52%",
        left: "48%",
        rotate: 6,
        width: 160,
        height: 190,
      },
      {
        type: "sticker",
        source: bir5,
        top: "75%",
        left: "15%",
        rotate: -12,
        width: 120,
        height: 70,
      },
    ],
  },
  {
    id: "page3",
    title: "Thanakhar Challenge😂",
    date: "Funny Days",
    items: [
      {
        type: "photo",
        source: tha1,
        top: "5%",
        left: "22%",
        rotate: 4,
        width: 190,
        height: 150,
      },
      {
        type: "photo",
        source: tha4,
        top: "28%",
        left: "5%",
        rotate: -6,
        width: 140,
        height: 180,
      },
      {
        type: "photo",
        source: tha5,
        top: "30%",
        left: "55%",
        rotate: 10,
        width: 140,
        height: 180,
      },
      {
        type: "sticker",
        source: tha2,
        top: "52%",
        left: "35%",
        rotate: 0,
        width: 110,
        height: 70,
      },
      {
        type: "photo",
        source: tha6,
        top: "60%",
        left: "10%",
        rotate: -12,
        width: 130,
        height: 160,
      },
      {
        type: "photo",
        source: tha7,
        top: "65%",
        left: "52%",
        rotate: 5,
        width: 140,
        height: 170,
      },
    ],
  },
  {
    id: "page4",
    title: "Sweet Memories😍",
    date: "Scrapbook",
    items: [
      {
        type: "photo",
        source: cof1,
        top: "22%",
        left: "15%",
        rotate: 0,
        width: 250,
        height: 200,
      },
      {
        type: "sticker",
        source: cof2,
        top: "12%",
        left: "8%",
        rotate: -20,
        width: 70,
        height: 70,
      },
      {
        type: "photo",
        source: cof5,
        top: "4%",
        left: "55%",
        rotate: -12,
        width: 130,
        height: 140,
      },
      {
        type: "sticker",
        source: cof4,
        top: "65%",
        left: "65%",
        rotate: 15,
        width: 90,
        height: 90,
      },
      {
        type: "photo",
        source: cof3,
        top: "72%",
        left: "8%",
        rotate: 10,
        width: 120,
        height: 130,
      },
    ],
  },
  {
    id: "page5",
    title: "Together Moments 💖",
    date: "Forever With You",
    items: [
      {
        type: "photo",
        source: tog1,
        top: "5%",
        left: "5%",
        rotate: -5,
        width: 140,
        height: 170,
      },
      {
        type: "photo",
        source: tog3,
        top: "8%",
        left: "52%",
        rotate: 8,
        width: 130,
        height: 150,
      },
      {
        type: "photo",
        source: tog5,
        top: "32%",
        left: "22%",
        rotate: -2,
        width: 170,
        height: 210,
      },
      {
        type: "photo",
        source: tog4,
        top: "65%",
        left: "55%",
        rotate: 10,
        width: 130,
        height: 150,
      },
      {
        type: "sticker",
        source: tog2,
        top: "62%",
        left: "8%",
        rotate: -15,
        width: 100,
        height: 100,
      },
    ],
  },
];

export default function DigitalScrapbook() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF0F3] to-[#FFB3C1] overflow-hidden flex flex-col font-sans select-none">
      {/* Header */}
      <div className="text-center mt-10 mb-2 relative z-10 px-4">
        <h1 className="text-2xl font-extrabold text-[#C9184A] flex items-center justify-center gap-2">
          <Stars size={20} /> Our Scrapbook <Stars size={20} />
        </h1>
      </div>

      {/* Main Horizontal Scrollable Area */}
      <div className="flex-1 flex items-center overflow-x-auto no-scrollbar snap-x snap-mandatory py-10">
        <div className="flex px-6 gap-6">
          {scrapbookData.map((page) => (
            <div
              key={page.id}
              className="relative flex-shrink-0 w-[85vw] max-w-[380px] h-[70vh] bg-[#FFF9FA] rounded-[40px] shadow-2xl border border-white/50 overflow-hidden snap-center flex flex-col"
            >
              {/* Page Header */}
              <div className="pt-8 pb-4 flex flex-col items-center z-20">
                <div className="bg-white/70 backdrop-blur-md px-5 py-1.5 rounded-full border border-pink-100 shadow-sm">
                  <span className="text-[#C9184A] font-bold text-xs uppercase tracking-widest">
                    {page.title}
                  </span>
                </div>
                <span className="text-[9px] text-pink-400 font-bold mt-2 tracking-[3px] uppercase opacity-60">
                  {page.date}
                </span>
              </div>

              {/* Items Area */}
              <div className="relative flex-1 w-full">
                {page.items.map((item, idx) => (
                  <motion.div
                    key={`${page.id}-${idx}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * idx }}
                    style={{
                      position: "absolute",
                      top: item.top,
                      left: item.left,
                      rotate: `${item.rotate}deg`,
                      zIndex: item.type === "sticker" ? 20 : 10,
                    }}
                    onClick={() =>
                      item.type === "photo" &&
                      setSelectedPhoto(item.source as string)
                    }
                  >
                    <div
                      className={
                        item.type === "photo"
                          ? "p-1.5 bg-white shadow-lg border-[0.5px] border-gray-100 active:scale-95 transition-transform"
                          : ""
                      }
                    >
                      <img
                        src={item.source as string}
                        style={{ width: item.width, height: item.height }}
                        className="object-cover rounded-sm block pointer-events-none"
                        alt=""
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Floating Animation for each page */}
              <div className="absolute bottom-4 right-4 w-12 h-12 z-30 opacity-80">
                <Lottie animationData={heartAnimation} loop={true} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="pb-10 text-center">
        <p className="text-[10px] font-bold text-[#A4133C] opacity-40 uppercase tracking-[3px]">
          Swipe to turn pages • Tap photos to zoom
        </p>
      </div>

      {/* Full Screen View (Zoom) */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-[100] flex flex-col items-center justify-center p-6"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.img
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              src={selectedPhoto}
              className="max-w-full max-h-[75vh] rounded-xl shadow-2xl border-2 border-white/20"
            />
            <button className="mt-8 text-white/70 flex items-center gap-2 border border-white/20 px-6 py-2 rounded-full hover:bg-white/10">
              <X size={18} /> Close Memory
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
