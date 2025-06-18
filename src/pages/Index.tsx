
import { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { DashboardHome } from '@/components/dashboard/DashboardHome';
import { ProductsPage } from '@/components/dashboard/ProductsPage';
import { OrdersPage } from '@/components/dashboard/OrdersPage';
import { CustomersPage } from '@/components/dashboard/CustomersPage';
import { PaymentsPage } from '@/components/dashboard/PaymentsPage';
import { StatisticsPage } from '@/components/dashboard/StatisticsPage';
import { ProfilePage } from '@/components/dashboard/ProfilePage';
import { LoginPage } from '@/components/auth/LoginPage';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <DashboardHome />;
      case 'products':
        return <ProductsPage />;
      case 'orders':
        return <OrdersPage />;
      case 'customers':
        return <CustomersPage />;
      case 'payments':
        return <PaymentsPage />;
      case 'statistics':
        return <StatisticsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onLogout={() => setIsLoggedIn(false)}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
};

export default Index;
