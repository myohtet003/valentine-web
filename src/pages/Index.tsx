import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Lock,
  Calendar,
  Edit2,
  Clock,
  Quote,
  X,
  Camera,
} from "lucide-react";

// --- Types ---
interface TimeStats {
  days: number;
  hours: number;
  mins: number;
  secs: number;
}

// --- Constants ---
const loveNotes = [
  "မ့ ကြည့်ရတာ မောင့်ကို အရမ်းလွမ်းနေသလိုပဲ... ဟီး 😊",
  "မ့ ဘေးနားလေးမှာ လာနေချင်လို့ 🥲🌟",
  "မောင့်ဘဝထဲကို ရောက်လာပေးလို့ ကျေးဇူးအများကြီးတင်တယ်နော်။ ❤️",
  "မ့ကို ကြည့်ရတာ ဒီနေ့ အရမ်းလှနေပါလား... ဟီး 😊",
  "မ့ဘေးနားလေးမှာ တစ်သက်လုံး အတူတူရှိနေချင်တာ။ 🥲🌟",
  "ဒီလောကကြီးထဲမှာ မကသာ မောင့်အတွက် အေးချမ်းမှုအပေးနိုင်ဆုံးပါ။ 🌸",
  "အချိန်တွေ ဘယ်လောက်ကြာပါစေ မကိုတွေ့ရင် အမြဲရင်ခုန်နေတုန်းပဲ။",
  "မက မောင့်ကမ္ဘာလေးရဲ့ အလှပဆုံးအရာပါ။ ✨",
  "ဒီနေ့လည်း မ့ကို မနေ့ကထက် ပိုချစ်တယ်နော်။ 💖",
  "မ့ မျက်နှာလေး မြင်ချင်လို့ vc ပြောချင်လှပေါ့။ 👀💖",
  "အလုပ်သာ လုပ်နေတာ စိတ်က မ့ဆီကို ပဲရောက်။ 💼➡️❤️",
  "ဒီနေ့ကစပြီး အနာဂတ်တိုင်းမှာ မ့ လက်ကိုပဲ တွဲထားချင်တာ။ 🤝✨",
  "မ့ အပြုံးလေးတွေက မောင့်ကမ္ဘာကြီးကို လင်းထိန်စေတယ်နော်။ 😊☀️",
  "ဘယ်လိုအခြေအနေမျိုးမှာဖြစ်ဖြစ် မ့ နားမှာ မောင်အမြဲရှိနေမှာပါ။ 🫂❤️",
  "မ ရှိနေပေးတာနဲ့တင် မောင့်ဘဝက ပြည့်စုံနေပါပြီ။ 🌸💎",
  "မောင်တို့နှစ်ယောက်ရဲ့ ပုံရိပ်လေးတွေကို ပြန်ကြည့်တိုင်း အရမ်းပျော်ဖို့ကောင်းတယ်။ 📸💕",
  "မက စိတ်ဆိုးနေရင်တောင် မောင့်မျက်လုံးထဲမှာ အရမ်းချစ်ဖို့ကောင်းနေတုန်းပဲ။ 😘💢",
  "မ့ကို အများကြီး ဂရုစိုက်ချင်လို့ မောင့်နားမှာပဲ အမြဲနေပေးပါဦး။ 🧸💌",
  "တစ်ကမ္ဘာလုံးနဲ့ ယှဉ်ရင်တောင် မ့ကိုပဲ မောင်က ရွေးချယ်မှာပါ။ 🌎🌹",
  "မ့ရဲ့ အသံလေး ကြားနေရတာတင် မောင့်အတွက်တော့ စိတ်အေးချမ်းမှုပဲ။ 🎧💓",
  "မောင့်ရဲ့ တစ်ဦးတည်းသော 'မ' အဖြစ် အမြဲရှိနေပေးပါနော်။ 👑👰",
  "မနဲ့တွေ့မှပဲ အချစ်ဆိုတာ ဘာလဲဆိုတာ မောင်သိခဲ့ရတာ။ 🥰📖",
];

// --- Sub-Components ---
const TimeBlock = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center gap-1">
    <div className="bg-[#FFF0F3] px-3 py-2 min-w-[60px] rounded-2xl shadow-inner border border-white/50">
      <span className="text-2xl font-bold text-[#A4133C] block text-center">
        {value < 10 ? `0${value}` : value}
      </span>
    </div>
    <span className="text-[10px] font-bold text-[#C9184A] uppercase tracking-wider">
      {label}
    </span>
  </div>
);

export default function SweetDashboard() {
  const [isSaved, setIsSaved] = useState(
    () => localStorage.getItem("anni_date") !== null,
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("is_auth") === "true",
  );
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordHint, setPasswordHint] = useState("");

  const [startDate, setStartDate] = useState(() => {
    const saved = localStorage.getItem("anni_date");
    return saved ? new Date(`${saved}T00:00:00`) : new Date();
  });

  const [inputDate, setInputDate] = useState(
    () => localStorage.getItem("anni_date") || "",
  );
  const [title, setTitle] = useState(
    () => localStorage.getItem("anni_title") || "Our Love Story",
  );

  const [leftPhoto, setLeftPhoto] = useState<string | null>(() =>
    localStorage.getItem("left_photo"),
  );
  const [rightPhoto, setRightPhoto] = useState<string | null>(() =>
    localStorage.getItem("right_photo"),
  );

  const [showEditModal, setShowEditModal] = useState(false);
  const [currentNote, setCurrentNote] = useState(
    () => localStorage.getItem("current_note") || loveNotes[0],
  );
  const [canClick, setCanClick] = useState(true);
  const [unlockTime, setUnlockTime] = useState("");
  const [timeStats, setTimeStats] = useState<TimeStats>({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });

  // --- Image Compressor Helper ---
  const compressImage = (file: File, callback: (base64: string) => void) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800; // Size ကို လျှော့ချမယ်
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Quality ကို 0.7 (70%) အထိ လျှော့ချပြီး base64 ပြောင်းမယ်
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
        callback(compressedBase64);
      };
    };
  };

  const updateTimers = useCallback(() => {
    const now = new Date();
    const diff = Math.abs(now.getTime() - startDate.getTime());
    setTimeStats({
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      mins: Math.floor((diff / (1000 * 60)) % 60),
      secs: Math.floor((diff / 1000) % 60),
    });

    const lastClick = localStorage.getItem("last_love_note_time");
    if (lastClick) {
      const lockDiff =
        parseInt(lastClick) + 24 * 60 * 60 * 1000 - now.getTime();
      if (lockDiff <= 0) {
        setCanClick(true);
        setUnlockTime("");
      } else {
        const h = Math.floor(lockDiff / 3600000);
        const m = Math.floor((lockDiff % 3600000) / 60000);
        const s = Math.floor((lockDiff % 60000) / 1000);
        setUnlockTime(`${h}h ${m}m ${s}s`);
        setCanClick(false);
      }
    }
  }, [startDate]);

  useEffect(() => {
    if (!isSaved || !isAuthenticated) return;
    const interval = setInterval(updateTimers, 1000);
    return () => clearInterval(interval);
  }, [isSaved, isAuthenticated, updateTimers]);

  const handleSaveInitial = () => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(inputDate)) {
      alert("Please use YYYY-MM-DD format");
      return;
    }
    localStorage.setItem("anni_date", inputDate);
    localStorage.setItem("anni_title", title);
    setStartDate(new Date(`${inputDate}T00:00:00`));
    setIsSaved(true);
  };

  const handleUnlock = () => {
    const cleanInput = passwordInput.replace(/\D/g, "");
    const cleanAnni = inputDate.replace(/\D/g, "");
    if (cleanInput === cleanAnni) {
      localStorage.setItem("is_auth", "true");
      setIsAuthenticated(true);
      window.location.reload();
    } else {
      setPasswordHint(`Hint: It's our special date!`);
      alert("Incorrect Date!");
    }
  };

  const handlePhotoUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    side: "left" | "right",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Size limit မထားတော့ဘဲ အလိုအလျောက် compress လုပ်မယ်
      compressImage(file, (compressedBase64) => {
        try {
          if (side === "left") {
            setLeftPhoto(compressedBase64);
            localStorage.setItem("left_photo", compressedBase64);
          } else {
            setRightPhoto(compressedBase64);
            localStorage.setItem("right_photo", compressedBase64);
          }
        } catch (err) {
          alert("Storage is full! Please try a different photo.");
          console.error(err);
        }
      });
    }
  };

  const handleNewNote = () => {
    if (!canClick) return;
    const newNote = loveNotes[Math.floor(Math.random() * loveNotes.length)];
    setCurrentNote(newNote);
    setCanClick(false);
    const now = new Date().getTime().toString();
    localStorage.setItem("last_love_note_time", now);
    localStorage.setItem("current_note", newNote);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#FFF0F3] via-[#FFCCD5] to-[#FFB3C1] font-sans text-[#590D22] selection:bg-[#FF4D6D]/30 pb-20">
      {/* 1. SETUP SCREEN */}
      {!isSaved && (
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
                onChange={(e) => setInputDate(e.target.value)}
                className="w-full h-12 px-4 rounded-full border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
              <input
                type="text"
                placeholder="Story Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-12 px-4 rounded-full border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
              <button
                onClick={handleSaveInitial}
                className="w-full h-12 bg-[#FF4D6D] text-white font-bold rounded-full hover:bg-[#FF758F] transition-colors"
              >
                Start Our Story 💌
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* 2. AUTH SCREEN */}
      {isSaved && !isAuthenticated && (
        <div className="flex min-h-screen items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white p-8 rounded-[40px] shadow-xl text-center"
          >
            <Lock size={48} className="mx-auto text-[#FF4D6D] mb-4" />
            <h2 className="text-2xl font-bold mb-2">Locked with Love</h2>
            <p className="text-slate-500 mb-6 text-sm">
              Enter our anniversary date to unlock
              <br />
              (Format: YYYYMMDD)
            </p>
            <input
              type="password"
              inputMode="numeric"
              placeholder="Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full h-12 px-6 rounded-full border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-300 text-center text-xl tracking-widest"
            />
            {passwordHint && (
              <p className="text-pink-600 text-xs mt-2 font-bold uppercase">
                {passwordHint}
              </p>
            )}
            <button
              onClick={handleUnlock}
              className="w-full h-12 bg-[#FF4D6D] text-white font-bold rounded-full mt-6 hover:bg-[#FF758F] shadow-lg"
            >
              Unlock 🗝️
            </button>
          </motion.div>
        </div>
      )}

      {/* 3. MAIN DASHBOARD */}
      {isSaved && isAuthenticated && (
        <div className="max-w-xl mx-auto px-6 py-10 space-y-8">
          <div
            onClick={() => setShowEditModal(true)}
            className="flex items-center justify-center gap-2 bg-white/40 backdrop-blur-sm py-2 px-6 rounded-full w-fit mx-auto cursor-pointer border border-white/50 hover:bg-white/60 transition-all shadow-sm"
          >
            <Calendar size={16} />
            <span className="font-semibold text-sm">
              {title}: {startDate.toDateString()}
            </span>
            <Edit2 size={14} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-[40px] shadow-2xl shadow-pink-200/50 border border-white"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <label className="relative cursor-pointer group">
                <div className="w-20 h-20 rounded-full border-4 border-pink-100 overflow-hidden bg-pink-50 flex items-center justify-center shadow-inner">
                  {leftPhoto ? (
                    <img
                      src={leftPhoto}
                      className="w-full h-full object-cover"
                    />
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
                  onChange={(e) => handlePhotoUpload(e, "left")}
                />
              </label>

              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Heart size={32} fill="#FF4D6D" className="text-[#FF4D6D]" />
              </motion.div>

              <label className="relative cursor-pointer group">
                <div className="w-20 h-20 rounded-full border-4 border-pink-100 overflow-hidden bg-pink-50 flex items-center justify-center shadow-inner">
                  {rightPhoto ? (
                    <img
                      src={rightPhoto}
                      className="w-full h-full object-cover"
                    />
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
                  onChange={(e) => handlePhotoUpload(e, "right")}
                />
              </label>
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/60 backdrop-blur-md p-10 rounded-[40px] border-2 border-dashed border-pink-300 text-center shadow-lg"
          >
            <Quote
              size={32}
              className="mx-auto text-pink-400 opacity-50 mb-4"
            />
            <p className="text-xl italic font-medium leading-relaxed mb-8 px-4 text-[#590D22]">
              &quot;{currentNote}&quot;
            </p>
            <button
              disabled={!canClick}
              onClick={handleNewNote}
              className={`px-8 py-4 rounded-full font-bold text-white shadow-lg transition-all ${canClick ? "bg-[#FF4D6D] hover:bg-[#FF758F] scale-105 active:scale-95" : "bg-[#C9184A] opacity-70 cursor-not-allowed"}`}
            >
              {canClick ? "Open Daily Note" : `Unlock in ${unlockTime}`}
            </button>
          </motion.div>
        </div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white w-full max-w-sm p-8 rounded-[32px] shadow-2xl relative"
            >
              <button
                onClick={() => setShowEditModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <X />
              </button>
              <h3 className="text-xl font-bold mb-6">Update Our Story</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={inputDate}
                  onChange={(e) => setInputDate(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-pink-100"
                  placeholder="YYYY-MM-DD"
                />
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-pink-100"
                  placeholder="Title"
                />
                <button
                  onClick={() => {
                    handleSaveInitial();
                    setShowEditModal(false);
                  }}
                  className="w-full h-12 bg-[#FF4D6D] text-white font-bold rounded-xl shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
