import { motion } from "framer-motion";
import type { Ripple } from "../../lib/dashboard/types";

interface AnniversaryCardProps {
  ripples: Ripple[];
  onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
}

export function AnniversaryCard({
  ripples,
  onPointerDown,
}: AnniversaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6 }}
      onPointerDown={onPointerDown}
      className="relative overflow-hidden rounded-3xl border border-pink-200/80 bg-gradient-to-br from-[#FF4D8D] via-[#FF6FA3] to-[#FF8DBA] p-7 text-center shadow-2xl"
    >
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none border border-white/70 bg-white/20"
          style={{
            width: ripple.size,
            height: ripple.size,
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
          }}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 1.35, opacity: 0 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
        />
      ))}

      {Array.from({ length: 10 }).map((_, index) => (
        <motion.div
          key={`petal-${index}`}
          className="absolute pointer-events-none"
          style={{ left: `${8 + index * 9}%`, top: "-10%" }}
          initial={{ y: -10, opacity: 0 }}
          animate={{
            y: [0, 190 + (index % 3) * 30],
            x: [
              0,
              index % 2 === 0 ? 16 : -16,
              index % 2 === 0 ? -10 : 10,
            ],
            opacity: [0, 0.85, 0],
            rotate: [0, index % 2 === 0 ? 18 : -18],
          }}
          transition={{
            duration: 5.2 + (index % 3),
            repeat: Infinity,
            delay: index * 0.35,
            ease: "easeInOut",
          }}
        >
          <span className="text-lg">🌹</span>
        </motion.div>
      ))}

      {Array.from({ length: 12 }).map((_, index) => (
        <motion.span
          key={`spark-${index}`}
          className="absolute text-pink-100/80 pointer-events-none"
          style={{
            top: `${14 + (index % 4) * 20}%`,
            left: `${10 + (index % 6) * 15}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.25],
            scale: [0.8, 1.25, 0.85],
          }}
          transition={{
            duration: 1.8 + (index % 3) * 0.45,
            repeat: Infinity,
            delay: index * 0.16,
          }}
        >
          ✨
        </motion.span>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-[#C9184A]/40 via-transparent to-pink-100/20" />

      <p className="relative text-xs font-bold uppercase tracking-[3px] text-pink-100 mb-2">
        A Night of Love
      </p>
      <h2 className="relative text-2xl font-extrabold text-white mb-3">
        Happy 3 Years Anni Par "Ma"
      </h2>
      <p className="relative text-sm text-pink-50 leading-relaxed">
        17/04/2026 — three beautiful years of us. Thank you for every smile,
        every memory, and every heartbeat together.{" "}
        <span className="font-bold text-[#FFD7F8]">
          I love you so much.
        </span>
      </p>
    </motion.div>
  );
}

