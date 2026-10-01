type Point = { label: string; value: number };
type Props = { data: Point[]; height?: number; color?: string; prefix?: string; suffix?: string };

export default function LineChart({ data, height = 200, color = '#6366f1', prefix = '', suffix = 'K' }: Props) {
  const width = 600;
  const padding = { top: 20, right: 10, bottom: 30, left: 35 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1)) * chartW;
    const y = padding.top + chartH - ((d.value - min) / range) * chartH;
    return { x, y, ...d };
  });
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padding.top + chartH} L ${points[0].x} ${padding.top + chartH} Z`;
  const gridLines = 4;
  const yLabels = Array.from({ length: gridLines + 1 }, (_, i) => min + (range / gridLines) * i);
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height }} preserveAspectRatio="none">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {yLabels.map((val, i) => {
        const y = padding.top + chartH - (i / gridLines) * chartH;
        return (
          <g key={i}>
            <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#f1f5f9" strokeWidth="1" />
            <text x={padding.left - 8} y={y + 4} textAnchor="end" className="fill-slate-300" style={{ fontSize: '10px' }}>{prefix}{Math.round(val)}{suffix}</text>
          </g>
        );
      })}
      <path d={areaPath} fill="url(#areaGrad)" />
      <path d={linePath} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <g key={i} className="group">
          <circle cx={p.x} cy={p.y} r="4" fill="white" stroke={color} strokeWidth="2.5" />
          <circle cx={p.x} cy={p.y} r="12" fill="transparent" className="cursor-pointer"><title>{`${p.label}: ${prefix}${p.value}${suffix}`}</title></circle>
        </g>
      ))}
      {points.map((p, i) => (
        <text key={i} x={p.x} y={height - 8} textAnchor="middle" className="fill-slate-400" style={{ fontSize: '10px' }}>{p.label}</text>
      ))}
    </svg>
  );
}
