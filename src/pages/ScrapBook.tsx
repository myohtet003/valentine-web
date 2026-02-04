import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Heart } from "lucide-react";

// --- YOUR IMAGE IMPORTS ---
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

// --- SCRAPBOOK DATA ---
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
        width: 200,
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
        top: "55%",
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

export default function ScrapbookPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const paginate = (newDirection: number) => {
    const next = currentPage + newDirection;
    if (next >= 0 && next < scrapbookData.length) {
      setDirection(newDirection);
      setCurrentPage(next);
    }
  };

  // Variants for 3D Book Flip Animation
  const pageVariants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1,
    },
    exit: (direction: number) => ({
      rotateY: direction > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.9,
      zIndex: 0,
    }),
  };

  return (
    <div className="fixed inset-0 bg-[#FFCCD5] flex flex-col items-center justify-center font-sans overflow-hidden touch-none">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <Heart className="absolute top-10 left-10 text-white" size={40} />
        <Heart className="absolute bottom-20 right-10 text-white" size={60} />
      </div>

      {/* Header Info */}
      <div className="absolute top-8 text-center z-30">
        <motion.div
          key={`header-${currentPage}`}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/50 shadow-sm"
        >
          <h2 className="text-[#C9184A] font-bold text-lg leading-none">
            {scrapbookData[currentPage].title}
          </h2>
          <p className="text-[10px] text-[#A4133C] uppercase tracking-[3px] mt-1 font-medium">
            {scrapbookData[currentPage].date}
          </p>
        </motion.div>
      </div>

      {/* Main Book Container */}
      <div className="relative w-[85%] max-w-[380px] aspect-[9/14] perspective-1000">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentPage}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              rotateY: { type: "spring", stiffness: 100, damping: 20 },
              opacity: { duration: 0.3 },
            }}
            // Swipe Gestures for Mobile
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, { offset }) => {
              const swipe = offset.x;
              if (swipe < -50) paginate(1);
              else if (swipe > 50) paginate(-1);
            }}
            className="w-full h-full bg-[#FFF0F3] rounded-[30px] shadow-2xl border-[6px] border-white relative overflow-hidden"
            style={{
              backgroundImage: `radial-gradient(#ffb3c1 0.8px, transparent 0.8px)`,
              backgroundSize: "24px 24px",
            }}
          >
            {/* Scrapbook Content Items */}
            {scrapbookData[currentPage].items.map((item, idx) => (
              <motion.div
                key={`${currentPage}-${idx}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + idx * 0.08 }}
                style={{
                  position: "absolute",
                  top: item.top,
                  left: item.left,
                  rotate: `${item.rotate}deg`,
                  width: item.width,
                  height: item.height,
                  zIndex: item.type === "sticker" ? 20 : 10,
                }}
                className={`cursor-pointer active:scale-95 transition-transform ${
                  item.type === "photo"
                    ? "bg-white p-2 shadow-xl border border-pink-100"
                    : ""
                }`}
                onClick={() =>
                  item.type === "photo" && setSelectedPhoto(item.source)
                }
              >
                <img
                  src={item.source}
                  alt="memory"
                  className="w-full h-full object-cover rounded-sm"
                />
                {item.type === "photo" && (
                  <div className="absolute bottom-0 left-0 right-0 h-5 flex items-center justify-center text-[#C9184A] text-[10px]">
                    ♥
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-10 flex items-center gap-10 z-30">
        <button
          onClick={() => paginate(-1)}
          disabled={currentPage === 0}
          className={`p-3 rounded-full bg-white shadow-lg text-[#C9184A] transition-all ${currentPage === 0 ? "opacity-20" : "active:scale-75"}`}
        >
          <ChevronLeft size={28} />
        </button>

        <div className="flex gap-2.5">
          {scrapbookData.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-500 ${i === currentPage ? "bg-[#C9184A] w-6" : "bg-white w-2"}`}
            />
          ))}
        </div>

        <button
          onClick={() => paginate(1)}
          disabled={currentPage === scrapbookData.length - 1}
          className={`p-3 rounded-full bg-white shadow-lg text-[#C9184A] transition-all ${currentPage === scrapbookData.length - 1 ? "opacity-20" : "active:scale-75"}`}
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Photo Viewer Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[100] flex flex-col items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.img
              initial={{ scale: 0.5, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              src={selectedPhoto}
              className="max-w-full max-h-[70vh] rounded-lg shadow-2xl border-4 border-white"
            />
            <button className="mt-10 text-white flex items-center gap-2 font-bold tracking-widest text-xs uppercase bg-white/10 px-6 py-2 rounded-full">
              <X size={18} /> Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="absolute bottom-2 text-[10px] text-[#A4133C]/50 font-bold uppercase tracking-widest">
        Swipe to turn pages
      </p>
    </div>
  );
}
