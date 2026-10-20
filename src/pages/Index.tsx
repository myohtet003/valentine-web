import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BirthdayExperience } from "../components/birthday/BirthdayExperience";
import { AnniversaryCard } from "../components/dashboard/AnniversaryCard";
import { AuthScreen } from "../components/dashboard/AuthScreen";
import { DailyNoteCard } from "../components/dashboard/DailyNoteCard";
import { EditStoryModal } from "../components/dashboard/EditStoryModal";
import { LoveTimerCard } from "../components/dashboard/LoveTimerCard";
import { SetupScreen } from "../components/dashboard/SetupScreen";
import { StoryDateButton } from "../components/dashboard/StoryDateButton";
import {
  BIRTHDAY_DATE_KEY,
  loveNotes,
  NOTE_LOCK_MS,
} from "../lib/dashboard/constants";
import { getYangonDateKey } from "../lib/dashboard/date";
import { compressImage } from "../lib/dashboard/image";
import type { Ripple, TimeStats } from "../lib/dashboard/types";

export default function SweetDashboard() {
  const getStoredNoteIndex = () => {
    const storedIndex = localStorage.getItem("current_note_index");
    if (storedIndex !== null) {
      const parsed = Number(storedIndex);
      if (Number.isFinite(parsed) && parsed >= 0) {
        return parsed % loveNotes.length;
      }
    }

    const storedNote = localStorage.getItem("current_note");
    if (storedNote) {
      const index = loveNotes.indexOf(storedNote);
      if (index !== -1) return index;
    }

    return 0;
  };

  const getLockInfo = useCallback((nowTime: number) => {
    const lastClick = localStorage.getItem("last_love_note_time");
    if (!lastClick) {
      return { canClick: true, unlockTime: "" };
    }

    const lastClickTime = Number(lastClick);
    if (!Number.isFinite(lastClickTime)) {
      localStorage.removeItem("last_love_note_time");
      return { canClick: true, unlockTime: "" };
    }

    const lockDiff = lastClickTime + NOTE_LOCK_MS - nowTime;
    if (lockDiff <= 0) {
      return { canClick: true, unlockTime: "" };
    }

    const h = Math.floor(lockDiff / 3600000);
    const m = Math.floor((lockDiff % 3600000) / 60000);
    const s = Math.floor((lockDiff % 60000) / 1000);
    return { canClick: false, unlockTime: `${h}h ${m}m ${s}s` };
  }, []);

  const [isSaved, setIsSaved] = useState(
    () => localStorage.getItem("anni_date") !== null,
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("is_auth") === "true",
  );
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordHint, setPasswordHint] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [anniversaryRipples, setAnniversaryRipples] = useState<Ripple[]>([]);

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
  const [noteIndex, setNoteIndex] = useState(getStoredNoteIndex);
  const [currentNote, setCurrentNote] = useState(
    () => loveNotes[getStoredNoteIndex()],
  );
  const initialLockState = useMemo(
    () => getLockInfo(Date.now()),
    [getLockInfo],
  );
  const [canClick, setCanClick] = useState(initialLockState.canClick);
  const [unlockTime, setUnlockTime] = useState(initialLockState.unlockTime);
  const [timeStats, setTimeStats] = useState<TimeStats>({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });

  const todayKey = getYangonDateKey();
  const isThirdAnniversary = todayKey === "2026-04-17";
  const isBirthday = todayKey === BIRTHDAY_DATE_KEY;

  const updateTimers = useCallback(() => {
    const now = new Date();
    const diff = Math.abs(now.getTime() - startDate.getTime());

    setTimeStats({
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      mins: Math.floor((diff / (1000 * 60)) % 60),
      secs: Math.floor((diff / 1000) % 60),
    });

    const lockInfo = getLockInfo(now.getTime());
    setCanClick(lockInfo.canClick);
    setUnlockTime(lockInfo.unlockTime);
  }, [startDate, getLockInfo]);

  useEffect(() => {
    if (!isSaved || !isAuthenticated) return;

    updateTimers();
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
    event: React.ChangeEvent<HTMLInputElement>,
    side: "left" | "right",
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

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
  };

  const handleNewNote = () => {
    if (!canClick) return;

    const nextIndex = (noteIndex + 1) % loveNotes.length;
    const newNote = loveNotes[nextIndex];
    setNoteIndex(nextIndex);
    setCurrentNote(newNote);
    setCanClick(false);

    const now = new Date().getTime().toString();
    localStorage.setItem("last_love_note_time", now);
    localStorage.setItem("current_note", newNote);
    localStorage.setItem("current_note_index", nextIndex.toString());
  };

  const handleAnniversaryTouch = (event: React.PointerEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    const size = Math.max(box.width, box.height) * 0.9;
    const ripple: Ripple = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      x: event.clientX - box.left,
      y: event.clientY - box.top,
      size,
    };

    setAnniversaryRipples((prev) => [...prev, ripple]);
    setTimeout(() => {
      setAnniversaryRipples((prev) =>
        prev.filter((item) => item.id !== ripple.id),
      );
    }, 850);
  };

  if (isSaved && isAuthenticated && isBirthday) {
    return <BirthdayExperience leftPhoto={leftPhoto} rightPhoto={rightPhoto} />;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#FFF0F3] via-[#FFCCD5] to-[#FFB3C1] font-sans text-[#590D22] selection:bg-[#FF4D6D]/30 pb-20">
      {!isSaved && (
        <SetupScreen
          inputDate={inputDate}
          title={title}
          onInputDateChange={setInputDate}
          onTitleChange={setTitle}
          onSave={handleSaveInitial}
        />
      )}

      {isSaved && !isAuthenticated && (
        <AuthScreen
          passwordInput={passwordInput}
          passwordHint={passwordHint}
          onPasswordInputChange={setPasswordInput}
          onUnlock={handleUnlock}
        />
      )}

      {isSaved && isAuthenticated && (
        <div className="max-w-xl mx-auto px-6 py-10 space-y-8">
          {isThirdAnniversary && (
            <AnniversaryCard
              ripples={anniversaryRipples}
              onPointerDown={handleAnniversaryTouch}
            />
          )}

          <StoryDateButton
            title={title}
            startDate={startDate}
            onClick={() => setShowEditModal(true)}
          />

          <LoveTimerCard
            leftPhoto={leftPhoto}
            rightPhoto={rightPhoto}
            timeStats={timeStats}
            onPhotoUpload={handlePhotoUpload}
          />

          <DailyNoteCard
            currentNote={currentNote}
            canClick={canClick}
            unlockTime={unlockTime}
            onNewNote={handleNewNote}
          />
        </div>
      )}

      <EditStoryModal
        isOpen={showEditModal}
        inputDate={inputDate}
        title={title}
        onInputDateChange={setInputDate}
        onTitleChange={setTitle}
        onClose={() => setShowEditModal(false)}
        onSave={() => {
          handleSaveInitial();
          setShowEditModal(false);
        }}
      />
    </div>
  );
}

