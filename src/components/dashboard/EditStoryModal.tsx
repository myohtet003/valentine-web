import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface EditStoryModalProps {
  isOpen: boolean;
  inputDate: string;
  title: string;
  onInputDateChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
}

export function EditStoryModal({
  isOpen,
  inputDate,
  title,
  onInputDateChange,
  onTitleChange,
  onClose,
  onSave,
}: EditStoryModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white w-full max-w-sm p-8 rounded-[32px] shadow-2xl relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X />
            </button>
            <h3 className="text-xl font-bold mb-6">Update Our Story</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={inputDate}
                onChange={(event) => onInputDateChange(event.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-pink-100"
                placeholder="YYYY-MM-DD"
              />
              <input
                type="text"
                value={title}
                onChange={(event) => onTitleChange(event.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-pink-100"
                placeholder="Title"
              />
              <button
                onClick={onSave}
                className="w-full h-12 bg-[#FF4D6D] text-white font-bold rounded-xl shadow-md"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

