import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface DailyNoteCardProps {
  currentNote: string;
  canClick: boolean;
  unlockTime: string;
  onNewNote: () => void;
}

export function DailyNoteCard({
  currentNote,
  canClick,
  unlockTime,
  onNewNote,
}: DailyNoteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white/60 backdrop-blur-md p-10 rounded-[40px] border-2 border-dashed border-pink-300 text-center shadow-lg"
    >
      <Quote size={32} className="mx-auto text-pink-400 opacity-50 mb-4" />
      <p className="text-xl italic font-medium leading-relaxed mb-8 px-4 text-[#590D22]">
        &quot;{currentNote}&quot;
      </p>
      <button
        disabled={!canClick}
        onClick={onNewNote}
        className={`px-8 py-4 rounded-full font-bold text-white shadow-lg transition-all ${canClick ? "bg-[#FF4D6D] hover:bg-[#FF758F] scale-105 active:scale-95" : "bg-[#C9184A] opacity-70 cursor-not-allowed"}`}
      >
        {canClick ? "Open Daily Note" : `Unlock in ${unlockTime}`}
      </button>
    </motion.div>
  );
}

