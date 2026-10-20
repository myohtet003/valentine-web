import { Calendar, Edit2 } from "lucide-react";

interface StoryDateButtonProps {
  title: string;
  startDate: Date;
  onClick: () => void;
}

export function StoryDateButton({
  title,
  startDate,
  onClick,
}: StoryDateButtonProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center gap-2 bg-white/40 backdrop-blur-sm py-2 px-6 rounded-full w-fit mx-auto cursor-pointer border border-white/50 hover:bg-white/60 transition-all shadow-sm"
    >
      <Calendar size={16} />
      <span className="font-semibold text-sm">
        {title}: {startDate.toDateString()}
      </span>
      <Edit2 size={14} />
    </div>
  );
}
