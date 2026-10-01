import { Users, Building2, CalendarDays, Wallet } from 'lucide-react';
import AnimatedCounter, { TrendBadge } from './AnimatedCounter';

const cards = [
  { label: 'Employees', value: 130, icon: Users, trend: '+2.1%', positive: true, subtext: 'from last month', color: 'primary' as const },
  { label: 'Departments', value: 18, icon: Building2, trend: '+0.5%', positive: true, subtext: 'from last month', color: 'accent' as const },
  { label: 'Leaves', value: 73, icon: CalendarDays, trend: '-1.2%', positive: false, subtext: 'from last month', color: 'warning' as const },
  { label: 'Payroll', value: 376, icon: Wallet, trend: '+3.4%', positive: true, subtext: 'from last month', color: 'success' as const, prefix: '$', suffix: 'K' },
];

const colorMap = {
  primary: { bg: 'bg-primary-50', icon: 'bg-primary-600', text: 'text-primary-600', glow: 'from-primary-200/40' },
  accent: { bg: 'bg-accent-50', icon: 'bg-accent-500', text: 'text-accent-600', glow: 'from-accent-200/40' },
  warning: { bg: 'bg-warning-50', icon: 'bg-warning-500', text: 'text-warning-600', glow: 'from-warning-200/40' },
  success: { bg: 'bg-success-50', icon: 'bg-success-500', text: 'text-success-600', glow: 'from-success-200/40' },
};

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 animate-fade-in">
      {cards.map((card) => {
        const Icon = card.icon;
        const c = colorMap[card.color];
        return (
          <div key={card.label} className="stat-card group">
            <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${c.glow} to-transparent blur-2xl opacity-60 group-hover:opacity-100 transition-opacity`} />
            <div className="relative flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-slate-500 font-medium mb-1">{card.label}</p>
                <p className="text-3xl font-bold text-slate-800 tracking-tight">{card.prefix}<AnimatedCounter value={card.value} />{card.suffix}</p>
              </div>
              <div className={`w-12 h-12 rounded-2xl ${c.bg} flex items-center justify-center`}>
                <div className={`w-8 h-8 rounded-xl ${c.icon} flex items-center justify-center`}>
                  <Icon className="w-[18px] h-[18px] text-white" strokeWidth={2} />
                </div>
              </div>
            </div>
            <div className="relative flex items-center gap-2">
              <TrendBadge value={card.trend} positive={card.positive} />
              <span className="text-xs text-slate-400">{card.subtext}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
