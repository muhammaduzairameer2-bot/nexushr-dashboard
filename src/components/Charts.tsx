import { departmentData, applicationStats, monthlySalaryData, genderData } from '@/data/mockData';
import DonutChart from './DonutChart';
import BarChart from './BarChart';
import LineChart from './LineChart';
import AnimatedCounter from './AnimatedCounter';

export function DepartmentChart() {
  const total = departmentData.reduce((s, d) => s + d.count, 0);
  return (
    <div className="card p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold text-slate-800">Total Employees</h3>
          <p className="text-xs text-slate-400 mt-0.5">By Department</p>
        </div>
        <span className="badge bg-primary-50 text-primary-600">Active</span>
      </div>
      <DonutChart
        segments={departmentData.map((d) => ({ label: d.name, value: d.count, color: d.color }))}
        centerLabel="Total"
        centerValue={String(total)}
      />
    </div>
  );
}

export function ApplicationStats() {
  return (
    <div className="card p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold text-slate-800">Total Applications</h3>
          <p className="text-xs text-slate-400 mt-0.5">Recruitment Overview</p>
        </div>
      </div>
      <div className="space-y-4">
        {applicationStats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 w-28 shrink-0">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: stat.color }} />
              <span className="text-sm text-slate-500 font-medium">{stat.label}</span>
            </div>
            <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${(stat.value / applicationStats[0].value) * 100}%`,
                  backgroundColor: stat.color,
                }}
              />
            </div>
            <span className="text-sm font-semibold text-slate-700 w-12 text-right">
              <AnimatedCounter value={stat.value} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function EmployeeStructure() {
  const total = genderData.reduce((s, g) => s + g.value, 0);
  return (
    <div className="card p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold text-slate-800">Employee Structure</h3>
          <p className="text-xs text-slate-400 mt-0.5">Gender Distribution</p>
        </div>
      </div>
      <DonutChart segments={genderData.map((g) => ({ label: g.label, value: g.value, color: g.color }))} centerLabel="Total" centerValue={String(total)} size={160} />
    </div>
  );
}

export function SalaryChart() {
  return (
    <div className="card p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold text-slate-800">Total Salary By Unit</h3>
          <p className="text-xs text-slate-400 mt-0.5">Monthly Overview (in $K)</p>
        </div>
        <span className="badge bg-success-50 text-success-600">+8.2%</span>
      </div>
      <BarChart
        height={200}
        bars={monthlySalaryData.map((d) => ({ label: d.month, value: d.amount, color: '#6366f1' }))}
      />
    </div>
  );
}

export function LeaveTrendChart() {
  return (
    <div className="card p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold text-slate-800">Leave Trends</h3>
          <p className="text-xs text-slate-400 mt-0.5">Monthly leave applications</p>
        </div>
        <span className="badge bg-accent-50 text-accent-600">2025</span>
      </div>
      <LineChart
        data={[
          { label: 'Jan', value: 12 },
          { label: 'Feb', value: 19 },
          { label: 'Mar', value: 26 },
          { label: 'Apr', value: 22 },
          { label: 'May', value: 31 },
          { label: 'Jun', value: 38 },
          { label: 'Jul', value: 33 },
          { label: 'Aug', value: 41 },
        ]}
        color="#f97316"
        prefix=""
        suffix=""
      />
    </div>
  );
}
