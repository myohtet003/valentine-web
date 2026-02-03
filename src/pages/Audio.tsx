import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Mic2 } from "lucide-react";

import Favicon from "../assets/images/favicon.png";
import White from "../assets/images/white.jpg";
import Data from "../assets/images/date.jpg";

// Assets - သင့် Path အတိုင်း ပြန်ချိန်ပေးပါ
const audioMemories = [
  {
    id: "1",
    date: "Jan 12, 2024",
    title: "The First Hello",
    audio: "/audio/mhk.mp3", // Web မှာဆိုရင် public folder ထဲ ထည့်သုံးတာ ပိုကောင်းပါတယ်
    image: Favicon,
  },
  {
    id: "2",
    date: "Feb 14, 2024",
    title: "Valentine's Secret",
    audio: "/audio/Bo Bo.mp3",
    image: White,
  },
  {
    id: "3",
    date: "Mar 03, 2024",
    title: "Thinking of You",
    audio: "/audio/moe.mp3",
    image: Data,
  },
];

interface AudioMemory {
  id: string;
  date: string;
  title: string;
  audio: string;
  image: string;
}

interface TimelineItemProps {
  item: AudioMemory;
  index: number;
}

const TimelineItem = ({ item, index }: TimelineItemProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isLeft = index % 2 === 0;

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(item.audio);
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex w-full justify-center mb-12 px-4 relative">
      {/* LEFT SIDE */}
      <div className="flex-1 flex justify-end">
        {isLeft && (
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="w-[160px] sm:w-[200px]"
          >
            <CardContent
              item={item}
              isPlaying={isPlaying}
              onPlay={togglePlay}
            />
          </motion.div>
        )}
      </div>

      {/* CENTER TIMELINE */}
      <div className="flex flex-col items-center mx-4 relative">
        {/* Vertical Line */}
        <div className="w-[2px] bg-[#FFCCD5] absolute h-[150%] top-0" />

        {/* Heart Node */}
        <motion.div
          animate={isPlaying ? { scale: [1, 1.2, 1] } : { scale: 1 }}
          transition={isPlaying ? { repeat: Infinity, duration: 0.6 } : {}}
          style={{ borderColor: isPlaying ? "#FF4D6D" : "#FFB3C1" }}
          className="w-9 h-9 rounded-full bg-white border-[3px] flex items-center justify-center z-10 shadow-sm transition-colors"
        >
          <Heart
            size={16}
            className={
              isPlaying ? "fill-[#FF4D6D] text-[#FF4D6D]" : "text-[#FFB3C1]"
            }
          />
        </motion.div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex justify-start">
        {!isLeft && (
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="w-[160px] sm:w-[200px]"
          >
            <CardContent
              item={item}
              isPlaying={isPlaying}
              onPlay={togglePlay}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

interface CardContentProps {
  item: AudioMemory;
  isPlaying: boolean;
  onPlay: () => void;
}

const CardContent = ({ item, isPlaying, onPlay }: CardContentProps) => (
  <div
    onClick={onPlay}
    className="bg-white rounded-[20px] overflow-hidden border border-[#FFF0F3] shadow-lg cursor-pointer transform transition-transform hover:scale-105 active:scale-95"
  >
    <img src={item.image} alt="thumb" className="w-full h-24 object-cover" />
    <div className="p-3 flex flex-col gap-1 text-left">
      <span className="text-[10px] font-bold text-[#C9184A] uppercase tracking-wider">
        {item.date}
      </span>
      <h3 className="text-sm font-bold text-[#590D22] leading-tight">
        {item.title}
      </h3>
      {isPlaying && (
        <span className="text-[10px] text-[#FF4D6D] italic font-medium animate-pulse">
          Playing...
        </span>
      )}
    </div>
  </div>
);

export default function AudioTimelineScrapbook() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF0F3] to-[#FFD6E0] pb-24 font-sans selection:bg-[#FFB3C1]">
      {/* Container for Phone Width Align */}
      <div className="max-w-[430px] mx-auto pt-12">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-3 mb-12">
          <div className="bg-white p-4 rounded-full shadow-md">
            <Mic2 size={32} className="text-[#C9184A]" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-[#C9184A]">
              Voice Timeline
            </h1>
            <p className="text-[#A4133C] italic text-sm mt-1">
              Every word, every heartbeat...
            </p>
          </div>
          <div className="h-1 w-12 bg-[#FF4D6D] mt-2 rounded-full" />
        </div>

        {/* Timeline List */}
        <div className="flex flex-col">
          {audioMemories.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
