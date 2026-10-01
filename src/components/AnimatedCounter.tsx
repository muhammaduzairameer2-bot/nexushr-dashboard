import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  value: number;
  className?: string;
  duration?: number;
};

export default function AnimatedCounter({ value, className = '', duration = 1200 }: Props) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value, duration]);

  return <span className={cn(className)}>{display.toLocaleString()}</span>;
}

export function TrendBadge({ value, positive }: { value: string; positive: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full',
        positive ? 'text-success-600 bg-success-50' : 'text-danger-600 bg-danger-50'
      )}
    >
      {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
      {value}
    </span>
  );
}
