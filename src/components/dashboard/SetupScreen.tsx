import { motion } from "framer-motion";

interface SetupScreenProps {
  inputDate: string;
  title: string;
  onInputDateChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  onSave: () => void;
}

export function SetupScreen({
  inputDate,
  title,
  onInputDateChange,
  onTitleChange,
  onSave,
}: SetupScreenProps) {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-8 rounded-[40px] shadow-xl"
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          💕 Our Scrapbook
        </h1>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Start Date (YYYY-MM-DD)"
            value={inputDate}
            onChange={(event) => onInputDateChange(event.target.value)}
            className="w-full h-12 px-4 rounded-full border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <input
            type="text"
            placeholder="Story Title"
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
            className="w-full h-12 px-4 rounded-full border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <button
            onClick={onSave}
            className="w-full h-12 bg-[#FF4D6D] text-white font-bold rounded-full hover:bg-[#FF758F] transition-colors"
          >
            Start Our Story 💌
          </button>
        </div>
      </motion.div>
    </div>
  );
}

