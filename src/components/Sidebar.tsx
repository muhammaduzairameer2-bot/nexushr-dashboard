import { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarDays,
  Wallet,
  Settings,
  FileText,
  BarChart3,
  MessageSquare,
  ChevronLeft,
  Briefcase,
  UserCircle,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type Page = 'dashboard' | 'employees' | 'leaves' | 'companies' | 'payroll' | 'reports' | 'settings';

type NavItem = {
  id: Page;
  label: string;
  icon: typeof LayoutDashboard;
};

const mainNav: NavItem[] = [
  { id: 'dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
  { id: 'employees', label: 'Employees', icon: Users },
  { id: 'leaves', label: 'Leaves', icon: CalendarDays },
  { id: 'companies', label: 'Companies', icon: Building2 },
  { id: 'payroll', label: 'Payroll', icon: Wallet },
];

const managementNav: NavItem[] = [
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

type Props = {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
};

export default function Sidebar({ currentPage, onNavigate, collapsed, onToggleCollapse, mobileOpen, onCloseMobile }: Props) {
  const [hrOpen, setHrOpen] = useState(false);

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen bg-white border-r border-slate-100 flex flex-col transition-all duration-300 shadow-sidebar',
          collapsed ? 'w-[76px]' : 'w-[260px]',
          'max-lg:transition-transform',
          mobileOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full',
          'max-lg:shadow-2xl'
        )}
      >
      {/* Logo */}
      <div className="h-16 flex items-center gap-3 px-5 border-b border-slate-100 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shrink-0">
          <Briefcase className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
        {!collapsed && (
          <span className="text-lg font-bold text-slate-800 tracking-tight">
            Nexus<span className="text-primary-600">HR</span>
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {!collapsed && (
          <p className="px-4 pt-2 pb-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Main
          </p>
        )}
        {mainNav.map((item) => (
          <NavLink
            key={item.id}
            item={item}
            active={currentPage === item.id}
            collapsed={collapsed}
            onClick={() => handleNavigate(item.id)}
          />
        ))}

        {!collapsed && (
          <p className="px-4 pt-4 pb-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Management
          </p>
        )}
        <button
          onClick={() => setHrOpen(!hrOpen)}
          className={cn('nav-link w-full', collapsed && 'justify-center')}
        >
          <FileText className="w-[18px] h-[18px] shrink-0" />
          {!collapsed && (
            <>
              <span className="flex-1 text-left">HR Tools</span>
              <ChevronDown className={cn('w-4 h-4 transition-transform', hrOpen && 'rotate-180')} />
            </>
          )}
        </button>
        {hrOpen && !collapsed && (
          <div className="ml-4 pl-4 border-l border-slate-100 space-y-1 animate-slide-in">
            <button className="nav-link w-full text-xs">
              <MessageSquare className="w-4 h-4" />
              <span>Inbox</span>
            </button>
            <button className="nav-link w-full text-xs">
              <UserCircle className="w-4 h-4" />
              <span>Profile</span>
            </button>
          </div>
        )}

        {managementNav.map((item) => (
          <NavLink
            key={item.id}
            item={item}
            active={currentPage === item.id}
            collapsed={collapsed}
            onClick={() => handleNavigate(item.id)}
          />
        ))}
      </nav>

      {/* Collapse toggle - desktop only */}
      <div className="border-t border-slate-100 p-3 shrink-0 hidden lg:block">
        <button
          onClick={onToggleCollapse}
          className={cn('nav-link w-full', collapsed && 'justify-center')}
        >
          <ChevronLeft className={cn('w-[18px] h-[18px] transition-transform', collapsed && 'rotate-180')} />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
    </>
  );
}

function NavLink({
  item,
  active,
  collapsed,
  onClick,
}: {
  item: NavItem;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className={cn('nav-link w-full', active && 'nav-link-active', collapsed && 'justify-center')}
      title={collapsed ? item.label : undefined}
    >
      <Icon className="w-[18px] h-[18px] shrink-0" />
      {!collapsed && <span>{item.label}</span>}
      {active && !collapsed && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500" />}
    </button>
  );
}
