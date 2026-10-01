import { initials } from '@/lib/utils';

type Props = {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizes = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
};

const colorPalette = [
  'bg-primary-100 text-primary-700',
  'bg-accent-100 text-accent-700',
  'bg-success-100 text-success-700',
  'bg-warning-100 text-warning-700',
  'bg-danger-100 text-danger-700',
  'bg-slate-200 text-slate-600',
];

function colorForName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colorPalette[Math.abs(hash) % colorPalette.length];
}

export default function Avatar({ name, size = 'md', className = '' }: Props) {
  return (
    <div
      className={`${sizes[size]} ${colorForName(name)} rounded-full flex items-center justify-center font-semibold shrink-0 ${className}`}
    >
      {initials(name)}
    </div>
  );
}
