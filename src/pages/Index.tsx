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

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

// --- Constants ---
const loveNotes = [
  "မ့ လက်ကလေးကို ဆုပ်ကိုင်ထားရရင် ဘာကိုမှ မကြောက်တော့ဘူး။ 🤝🛡️",
  "မောင်တို့နှစ်ယောက်ရဲ့ အမှတ်တရတွေက မောင့်ဘဝရဲ့ တန်ဖိုးအရှိဆုံး အရာတွေပါ။ 💎✨",
  "ဒီနေ့ကစပြီး အသက်တေကြီးတဲ့အထိ မ့ ဘေးနားမှာပဲ ရှိနေမယ်နော်။ 👴👵❤️",
  "မ့ စိတ်ဆိုးနေရင်တောင် ချော့ရတာကိုက မောင့်အတွက်တော့ ပျော်စရာပါ။ 🍭🧸",
  "မ က မောင့်ဘဝရဲ့ ကံကောင်းစေတဲ့ လက်ဆောင်လေးပါ။ 🎁🍀",
  "မောင့်ရဲ့ တစ်နေ့တာလုံးမှာ မ့အကြောင်း တွေးနေရတဲ့ အချိန်က အများဆုံးပဲ။ 💭💘",
  "မ့ကို ကြည့်ရင်းနဲ့တင် အချိန်တွေ အကြာကြီး ကုန်ဆုံးသွားချင်တာ။ ⏳👀",
  "ဘယ်လောက်ပဲ ဝေးဝေး မောင့်နှလုံးသားက မ့ အနားမှာပဲ အမြဲရှိနေမှာပါ။ 📍❤️",
  "မ့ ဆီက message လေး တစ်ခု ရောက်လာတာနဲ့တင် မောင့်မျက်နှာက ပြုံးရွှင်သွားရော။ 📱😊",
  "မ က မောင့်အတွက်တော့ အစားထိုးလို့မရတဲ့ တစ်ဦးတည်းသောသူပါ။ 🥇🌹",
  "မ့ကို ပိုပြီး ဂရုစိုက်နိုင်တဲ့ မောင် ဖြစ်အောင် အမြဲ ကြိုးစားနေမယ်နော်။ 💪💗",
  "မောင်တို့နှစ်ယောက် အတူတူ သွားခဲ့တဲ့ နေရာတိုင်းက မောင့်အတွက် အမှတ်တရပဲ။ 🗺️✨",
  "မ ပျော်နေရင် မောင်လည်း ပျော်တယ်။ မ ဝမ်းနည်းရင် မောင်က ပိုဝမ်းနည်းတယ်။ 🫂❤️",
  "မောင့်ဘဝရဲ့ ဇာတ်လမ်းလေးမှာ မ က အဓိက ဇာတ်ဆောင်မင်းသမီးလေးပေါ့။ 👸🎬",
  "မ့ မျက်နှာလေးကို ငေးကြည့်နေရရင် ကမ္ဘာပေါ်မှာ မောင်အပျော်ဆုံးပဲ။ 😍✨",
  "မနဲ့သာဆိုရင် ဘယ်လိုအခက်အခဲပဲဖြစ်ဖြစ် မောင် ရင်ဆိုင်ရဲတယ်နော်။ 🛡️❤️",
  "မောင့်ဘဝရဲ့ နေ့ရက်တိုင်းမှာ မ ရှိနေပေးတာက အကြီးမားဆုံး ဆုလာဘ်ပဲ။ 🎁🌸",
  "မ့ရဲ့ နူးညံ့တဲ့ စိတ်ထားလေးကို မောင် အမြတ်နိုးဆုံးပါ။ ✨💖",
  "တခြားသူတွေ ဘယ်လိုပဲဖြစ်ဖြစ် မောင့်အတွက်တော့ မက အမြဲ အမှတ် (၁) ပဲ။ 🥇🌹",
  "မ့ကို ပိုချစ်လာရတာကလွဲလို့ မောင့်မှာ တခြားအလုပ် မရှိပါဘူး။ 🥰💍",
  "မောင့်ရဲ့ အနာဂတ်အစီအစဉ်တိုင်းမှာ မ က အမြဲတမ်း ပါဝင်နေမှာပါ။ 📝👩‍❤️‍👨",
  "မ့ကို လွမ်းတဲ့စိတ်က မောင့်နှလုံးသားကို အမြဲတမ်း နွေးထွေးစေတယ်။ 🔥❤️",
  "မောင့်ဘဝရဲ့ အမှောင်ဆုံးနေ့တွေမှာ မ က မီးအိမ်လေးလို လင်းထိန်စေခဲ့တာ။ 💡🌟",
  "မ့ကို အနိုင်ပေးရတာက မောင့်အတွက်တော့ အကြီးမားဆုံး အောင်ပွဲပဲ။ 🏳️‍🌈💌",
  "မောင့်ရဲ့ တစ်ခုတည်းသော ဆန္ဒက မ့ ဘေးနားမှာ အိုမင်းသွားချင်တာပါ။ 👴👵✨",
  "မ့ မျက်ရည်တစ်စက် ကျမှာကိုတောင် မောင်က ကမ္ဘာပျက်သလို ကြောက်တာ။ 💧🙅‍♂️",
  "မ က မောင့်ဘဝရဲ့ ပျော်ရွှင်ခြင်း သော့ချက်လေးပါ။ 🔑😊",
  "ဘယ်သူတွေ ဘာပြောပြော မောင့်ယုံကြည်မှုအားလုံးက မ့ ဆီမှာပဲ ရှိတယ်။ 🤝💞",
  "မ့ဆီက ဖုန်းဝင်လာရင် ရင်ခုန်ရတာ ခုထိ မရိုးသေးဘူးနော်။ 📞💓",
  "မ က မောင့်ဘဝထဲကို ကောင်းကင်က ပေးလိုက်တဲ့ နတ်သမီးလေးလိုပဲ။ 🧚‍♀️✨",
  "မ့ ရဲ့ အသေးအမွှားလေးကအစ မောင့်အတွက်တော့ အရေးကြီးပါတယ်။ 🔎❤️",
  "မောင်တို့နှစ်ယောက်ရဲ့ အချစ်က ကမ္ဘာတည်သရွေ့ ခိုင်မြဲနေမှာပါ။ 🌎♾️",
  "မ့ကို ဂရုစိုက်ရတာ မောင့်အတွက်တော့ ဝတ္တရားမဟုတ်ဘဲ ပျော်ရွှင်မှုပါ။ 🥰🌸",
  "ဒီညလည်း မောင့်အိပ်မက်ထဲကို မ့ကို လာခဲ့ဖို့ ဖိတ်ခေါ်တယ်နော်။ 😴🌙",
  "နပိုလီယံ ကမ္ဘာတစ်ခြမ်းပဲ ပိုင်တာလောက်တော့ သနားတာပေါ့... မောင့်မှာတော့ 'မ' ဆိုတဲ့ တစ်ကမ္ဘာလုံး ရှိနေတာ။ 🌍👑", 
  "ကမ္ဘာကျော် ပန်းချီဆရာတွေ ဘယ်လောက်တော်တော် မ့ အပြုံးလောက်တော့ အသက်မဝင်နိုင်ပါဘူး။ 🎨✨", 
  "တခြားသူတွေက စာအုပ်တွေထဲမှာ အချစ်ကို ရှာကြပေမယ့် မောင့်အတွက်တော့ 'မ' က အသက်ရှင်နေတဲ့ ကဗျာတစ်ပုဒ်ပါ။ 📖🌹", 
  "မောင့်ကမ္ဘာကြီးရဲ့ နေမင်းက 'မ' ပါပဲ... မ ရှိမှ မောင့်ရဲ့ နေ့ရက်တွေက လင်းထိန်တာ။ ☀️💛",  
  "ကမ္ဘာကြီးက ဘယ်လောက်ပဲ ကျယ်ပြောပါစေ မောင့်ခြေလှမ်းတိုင်းက မ့ ဆီကိုပဲ ဦးတည်နေတာ။ 👣❤️",
  "မောင့်ရဲ့ အချစ်တွေက ပင်လယ်ထက် နက်ပြီး ကောင်းကင်ထက် ပိုကျယ်တယ်။ 🌊☁️",
  "ဘဝဆိုတဲ့ ပုစ္ဆာမှာ မ က မောင့်အတွက် အဖြေမှန်တစ်ခုတည်းပါပဲ။ ✅📝",
  "မောင့်ရဲ့ နှလုံးခုန်သံတိုင်းက 'မ-မ-မ' လို့ပဲ အမြဲ အော်နေတာ။ 💓🔊",  
  "မ့ကို ချစ်ရတာက မောင့်ဘဝရဲ့ အလုပ်အဖြစ်ဆုံးနဲ့ အမြတ်ဆုံး ရင်းနှီးမြှုပ်နှံမှုပဲ။ 📈💎",
  "မောင့်ဘဝရဲ့ နောက်ဆုံးစာမျက်နှာအထိ 'မ' နဲ့ပဲ အတူတူ ဖြတ်သန်းသွားချင်တာ။ 📖🖋️"
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
  const [anniversaryRipples, setAnniversaryRipples] = useState<Ripple[]>([]);
  const [timeStats, setTimeStats] = useState<TimeStats>({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });
  const now = new Date();
  const todayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  // const isPreviewAnniversary =
  //   import.meta.env.DEV && todayKey !== "2026-04-17";
  const isThirdAnniversary = todayKey === "2026-04-17";

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

  const handleAnniversaryTouch = (
    e: React.PointerEvent<HTMLDivElement>,
  ) => {
    const box = e.currentTarget.getBoundingClientRect();
    const size = Math.max(box.width, box.height) * 0.9;
    const ripple: Ripple = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      x: e.clientX - box.left,
      y: e.clientY - box.top,
      size,
    };

    setAnniversaryRipples((prev) => [...prev, ripple]);
    setTimeout(() => {
      setAnniversaryRipples((prev) => prev.filter((item) => item.id !== ripple.id));
    }, 850);
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
          {isThirdAnniversary && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
              onPointerDown={handleAnniversaryTouch}
              className="relative overflow-hidden rounded-3xl border border-pink-200/80 bg-gradient-to-br from-[#FF4D8D] via-[#FF6FA3] to-[#FF8DBA] p-7 text-center shadow-2xl"
            >
              {anniversaryRipples.map((ripple) => (
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

              {/* Floating rose petals */}
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={`petal-${i}`}
                  className="absolute pointer-events-none"
                  style={{ left: `${8 + i * 9}%`, top: "-10%" }}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{
                    y: [0, 190 + (i % 3) * 30],
                    x: [0, i % 2 === 0 ? 16 : -16, i % 2 === 0 ? -10 : 10],
                    opacity: [0, 0.85, 0],
                    rotate: [0, i % 2 === 0 ? 18 : -18],
                  }}
                  transition={{
                    duration: 5.2 + (i % 3),
                    repeat: Infinity,
                    delay: i * 0.35,
                    ease: "easeInOut",
                  }}
                >
                  <span className="text-lg">🌹</span>
                </motion.div>
              ))}

              {/* Subtle sparkle trail */}
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.span
                  key={`spark-${i}`}
                  className="absolute text-pink-100/80 pointer-events-none"
                  style={{
                    top: `${14 + (i % 4) * 20}%`,
                    left: `${10 + (i % 6) * 15}%`,
                  }}
                  animate={{
                    opacity: [0.2, 1, 0.25],
                    scale: [0.8, 1.25, 0.85],
                  }}
                  transition={{
                    duration: 1.8 + (i % 3) * 0.45,
                    repeat: Infinity,
                    delay: i * 0.16,
                  }}
                >
                  ✨
                </motion.span>
              ))}

              <div className="absolute inset-0 bg-gradient-to-t from-[#C9184A]/40 via-transparent to-pink-100/20" />

              <p className="relative text-xs font-bold uppercase tracking-[3px] text-pink-100 mb-2">
                A Night of Love
              </p>
              {/* {isPreviewAnniversary && (
                <p className="relative text-[11px] font-semibold text-pink-100/90 mb-2">
                  Preview mode is ON
                </p>
              )} */}
              <h2 className="relative text-2xl font-extrabold text-white mb-3">
                Happy 3 Years Anni Par "Ma"
              </h2>
              <p className="relative text-sm text-pink-50 leading-relaxed">
                17/04/2026 — three beautiful years of us. Thank you for every
                smile, every memory, and every heartbeat together.{" "}
                <span className="font-bold text-[#FFD7F8]">I love you so much.</span>
              </p>
            </motion.div>
          )}

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
