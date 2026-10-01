type Segment = { label: string; value: number; color: string };
type Props = { segments: Segment[]; centerLabel?: string; centerValue?: string; size?: number };

export default function DonutChart({ segments, centerLabel, centerValue, size = 180 }: Props) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  let cumulative = 0;
  const radius = size / 2;
  const stroke = 28;
  const innerRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * innerRadius;
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={radius} cy={radius} r={innerRadius} fill="none" stroke="#f1f5f9" strokeWidth={stroke} />
          {segments.map((seg, i) => {
            const fraction = seg.value / total;
            const dashLength = fraction * circumference;
            const dashOffset = -cumulative * circumference;
            cumulative += fraction;
            return (
              <circle key={i} cx={radius} cy={radius} r={innerRadius} fill="none" stroke={seg.color} strokeWidth={stroke} strokeDasharray={`${dashLength} ${circumference - dashLength}`} strokeDashoffset={dashOffset} strokeLinecap="butt" className="donut-segment" style={{ transition: 'stroke-dasharray 1s ease-out, stroke-dashoffset 1s ease-out' }} />
            );
          })}
        </svg>
        {(centerLabel || centerValue) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {centerValue && <span className="text-2xl font-bold text-slate-800">{centerValue}</span>}
            {centerLabel && <span className="text-xs text-slate-400 font-medium mt-0.5">{centerLabel}</span>}
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: seg.color }} />
            <span className="text-sm text-slate-500 font-medium">{seg.label}</span>
            <span className="text-sm font-semibold text-slate-700">{seg.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
