import { activities, teamLeads, upcomingLeaves, todayEvents, initialTodos } from '@/data/mockData';
import Avatar from './Avatar';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Cake, Stethoscope, Plus, Trash2, Check } from 'lucide-react';

export function RecentActivities() {
  return (
    <div className="card p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-800">Recent Activities</h3>
        <button className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">View All</button>
      </div>
      <div className="space-y-1">
        {activities.map((act) => (
          <div key={act.id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
            <Avatar name={act.employee} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-700">
                <span className="font-semibold">{act.employee}</span>{' '}
                <span className="text-slate-500">{act.action}</span>
              </p>
              <p className="text-xs text-slate-400 mt-0.5">{act.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TeamLeadsTable() {
  return (
    <div className="card p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-800">Team Leads</h3>
        <button className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider pb-3 pl-2">Lead Name</th>
              <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider pb-3">Team</th>
              <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider pb-3 pr-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {teamLeads.map((lead) => (
              <tr key={lead.id} className="table-row-hover border-b border-slate-50 last:border-0">
                <td className="py-3 pl-2">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={lead.name} size="sm" />
                    <span className="text-sm font-semibold text-slate-700">{lead.name}</span>
                  </div>
                </td>
                <td className="py-3"><span className="badge bg-slate-100 text-slate-600">{lead.team}</span></td>
                <td className="py-3 pr-2 text-sm text-slate-500">{lead.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function UpcomingLeavesTable() {
  const typeColors: Record<string, string> = {
    'Sick Leave': 'bg-danger-50 text-danger-600',
    'Casual Leave': 'bg-accent-50 text-accent-600',
    'Annual Leave': 'bg-primary-50 text-primary-600',
  };
  return (
    <div className="card p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-800">Upcoming Leaves</h3>
        <button className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider pb-3 pl-2">Employee</th>
              <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider pb-3">Date</th>
              <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider pb-3 pr-2">Type</th>
            </tr>
          </thead>
          <tbody>
            {upcomingLeaves.map((leave) => (
              <tr key={leave.id} className="table-row-hover border-b border-slate-50 last:border-0">
                <td className="py-3 pl-2">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={leave.employee} size="sm" />
                    <span className="text-sm font-semibold text-slate-700">{leave.employee}</span>
                  </div>
                </td>
                <td className="py-3 text-sm text-slate-500">{leave.date}</td>
                <td className="py-3 pr-2"><span className={cn('badge', typeColors[leave.type])}>{leave.type}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function TodaySection() {
  return (
    <div className="card p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-800">Today</h3>
        <span className="text-xs text-slate-400">{todayEvents.length} events</span>
      </div>
      <div className="space-y-2.5">
        {todayEvents.map((event) => (
          <div key={event.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
            <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center shrink-0', event.type === 'birthday' ? 'bg-accent-50' : 'bg-danger-50')}>
              {event.type === 'birthday' ? <Cake className="w-[18px] h-[18px] text-accent-500" /> : <Stethoscope className="w-[18px] h-[18px] text-danger-500" />}
            </div>
            <p className="text-sm text-slate-600 flex-1">{event.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [input, setInput] = useState('');
  const toggle = (id: number) => setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const remove = (id: number) => setTodos(todos.filter((t) => t.id !== id));
  const add = () => { if (!input.trim()) return; setTodos([...todos, { id: Date.now(), title: input.trim(), done: false, priority: 'medium' }]); setInput(''); };
  const priorityColors = { high: 'bg-danger-500', medium: 'bg-warning-500', low: 'bg-success-500' };
  return (
    <div className="card p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-800">To Do List</h3>
        <span className="badge bg-slate-100 text-slate-500">{todos.filter((t) => !t.done).length} pending</span>
      </div>
      <div className="flex gap-2 mb-4">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && add()} placeholder="Add a task..." className="input flex-1 text-sm" />
        <button onClick={add} className="btn-primary px-3"><Plus className="w-4 h-4" /></button>
      </div>
      <div className="space-y-1.5 max-h-64 overflow-y-auto">
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group">
            <button onClick={() => toggle(todo.id)} className={cn('w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all', todo.done ? 'bg-primary-500 border-primary-500' : 'border-slate-300 hover:border-primary-400')}>
              {todo.done && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
            </button>
            <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', priorityColors[todo.priority])} />
            <span className={cn('text-sm flex-1 transition-all', todo.done ? 'text-slate-400 line-through' : 'text-slate-700')}>{todo.title}</span>
            <button onClick={() => remove(todo.id)} className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-danger-500 transition-all"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WelcomeBanner() {
  return (
    <div className="relative card overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 border-0 animate-fade-in">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl" />
      <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-accent-400/10 rounded-full translate-y-1/2 blur-2xl" />
      <div className="relative p-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar name="Alex Rivera" size="lg" className="ring-4 ring-white/20" />
          <div>
            <h2 className="text-xl font-bold text-white">Welcome Back, Alex!</h2>
            <p className="text-sm text-primary-100 mt-1">You have 3 pending leave requests and 5 new applications to review.</p>
          </div>
        </div>
        <div className="hidden sm:block text-right">
          <p className="text-3xl font-bold text-white">30</p>
          <p className="text-sm text-primary-100">Sep 2026</p>
        </div>
      </div>
    </div>
  );
}
