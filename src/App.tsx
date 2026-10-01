import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import EmployeesPage from './components/EmployeesPage';
import LeavesPage from './components/LeavesPage';
import CompaniesPage from './components/CompaniesPage';
import PayrollPage from './components/PayrollPage';
import ReportsPage from './components/ReportsPage';
import SettingsPage from './components/SettingsPage';
import type { Page } from './components/Sidebar';

export default function App() {
  const [page, setPage] = useState<Page>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleNavigate = (p: Page) => {
    setPage(p);
  };

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <Dashboard />;
      case 'employees':
        return <EmployeesPage />;
      case 'leaves':
        return <LeavesPage />;
      case 'companies':
        return <CompaniesPage />;
      case 'payroll':
        return <PayrollPage />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar
        currentPage={page}
        onNavigate={handleNavigate}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-[76px]' : 'lg:ml-[260px]'}`}>
        <Header onToggleSidebar={() => setMobileSidebarOpen(true)} />
        <main className="p-4 lg:p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
