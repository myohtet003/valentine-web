import type React from "react";
import { motion } from "framer-motion";
import { Camera, Clock, Heart } from "lucide-react";
import type { TimeStats } from "../../lib/dashboard/types";
import { TimeBlock } from "./TimeBlock";

interface LoveTimerCardProps {
  leftPhoto: string | null;
  rightPhoto: string | null;
  timeStats: TimeStats;
  onPhotoUpload: (
    event: React.ChangeEvent<HTMLInputElement>,
    side: "left" | "right",
  ) => void;
}

export function LoveTimerCard({
  leftPhoto,
  rightPhoto,
  timeStats,
  onPhotoUpload,
}: LoveTimerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-[40px] shadow-2xl shadow-pink-200/50 border border-white"
    >
      <div className="flex items-center justify-center gap-4 mb-8">
        <PhotoUpload
          photo={leftPhoto}
          side="left"
          onPhotoUpload={onPhotoUpload}
        />

        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <Heart size={32} fill="#FF4D6D" className="text-[#FF4D6D]" />
        </motion.div>

        <PhotoUpload
          photo={rightPhoto}
          side="right"
          onPhotoUpload={onPhotoUpload}
        />
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
  );
}

interface PhotoUploadProps {
  photo: string | null;
  side: "left" | "right";
  onPhotoUpload: (
    event: React.ChangeEvent<HTMLInputElement>,
    side: "left" | "right",
  ) => void;
}

function PhotoUpload({ photo, side, onPhotoUpload }: PhotoUploadProps) {
  return (
    <label className="relative cursor-pointer group">
      <div className="w-20 h-20 rounded-full border-4 border-pink-100 overflow-hidden bg-pink-50 flex items-center justify-center shadow-inner">
        {photo ? (
          <img src={photo} className="w-full h-full object-cover" />
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
        onChange={(event) => onPhotoUpload(event, side)}
      />
    </label>
  );
}

