type Bar = {
  label: string;
  value: number;
  color: string;
};

type Props = {
  bars: Bar[];
  height?: number;
};

export default function BarChart({ bars, height = 200 }: Props) {
  const max = Math.max(...bars.map((b) => b.value));

  return (
    <div className="flex items-end justify-between gap-2" style={{ height }}>
      {bars.map((bar, i) => {
        const pct = (bar.value / max) * 100;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
            <div className="relative w-full flex items-end justify-center" style={{ height: height - 30 }}>
              <div
                className="w-full max-w-[32px] rounded-t-lg rounded-b-sm transition-all duration-700 ease-out group-hover:opacity-80"
                style={{
                  height: `${pct}%`,
                  background: `linear-gradient(180deg, ${bar.color} 0%, ${bar.color}cc 100%)`,
                  animationDelay: `${i * 60}ms`,
                }}
              >
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {bar.value}
                </span>
              </div>
            </div>
            <span className="text-xs text-slate-400 font-medium">{bar.label}</span>
          </div>
        );
      })}
    </div>
  );
}
