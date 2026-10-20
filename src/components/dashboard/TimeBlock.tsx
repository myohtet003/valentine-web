interface TimeBlockProps {
  value: number;
  label: string;
}

export function TimeBlock({ value, label }: TimeBlockProps) {
  return (
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
}
