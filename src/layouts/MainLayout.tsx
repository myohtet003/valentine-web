import { Outlet, Link, useLocation } from "react-router-dom";
import { Heart, BookHeart, Music, Grid2X2 } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Tailwind class တွေကို merge လုပ်ဖို့ helper
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function MainLayout() {
  const location = useLocation();

  const tabs = [
    { name: "Today", path: "/", icon: Heart },
    { name: "Scrapbook", path: "/scrapbook", icon: BookHeart },
    { name: "Audio", path: "/audio", icon: Music },
    { name: "Memories", path: "/memory", icon: Grid2X2 },
  ];

  return (
    <div className="min-h-screen bg-[#FFF0F3] pb-24">
      {/* ညာဘက်မှာ ပေါ်မယ့် Content များ */}
      <div className="max-w-md mx-auto">
        <Outlet />
      </div>

      {/* --- Bottom Tab Bar --- */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#FFF0F3] border-t border-pink-100 px-6 py-3 pb-6 shadow-[0_-10px_20px_rgba(255,77,109,0.1)] flex justify-around items-center z-50">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;

          return (
            <Link
              key={tab.path}
              to={tab.path}
              className="flex flex-col items-center gap-1 relative group"
            >
              <div
                className={cn(
                  "p-2 rounded-2xl transition-all duration-300",
                  isActive
                    ? "bg-pink-100"
                    : "bg-transparent group-active:scale-90",
                )}
              >
                <Icon
                  size={24}
                  className={cn(
                    "transition-colors",
                    isActive
                      ? "text-[#FF4D6D] fill-[#FF4D6D]"
                      : "text-[#C9184A]",
                  )}
                />
              </div>
              <span
                className={cn(
                  "text-[10px] font-bold uppercase tracking-tighter transition-colors",
                  isActive ? "text-[#FF4D6D]" : "text-[#C9184A]",
                )}
              >
                {tab.name}
              </span>

              {/* Active ဖြစ်ရင် အောက်က အစက်လေး */}
              {isActive && (
                <div className="absolute -top-1 w-1 h-1 bg-[#FF4D6D] rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
