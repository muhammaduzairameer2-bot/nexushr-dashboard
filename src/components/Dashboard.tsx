import StatCards from './StatCards';
import { DepartmentChart, ApplicationStats, EmployeeStructure, SalaryChart, LeaveTrendChart } from './Charts';
import { RecentActivities, TeamLeadsTable, UpcomingLeavesTable, TodaySection, TodoList, WelcomeBanner } from './DashboardWidgets';

export default function Dashboard() {
  return (
    <div className="space-y-5">
      <WelcomeBanner />
      <StatCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <SalaryChart />
        </div>
        <DepartmentChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <ApplicationStats />
        <EmployeeStructure />
        <LeaveTrendChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <TeamLeadsTable />
          <UpcomingLeavesTable />
        </div>
        <div className="space-y-5">
          <RecentActivities />
          <TodaySection />
          <TodoList />
        </div>
      </div>
    </div>
  );
}
