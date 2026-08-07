'use client';

import { useAppStore } from '@/store/app-store';
import LoginPage from '@/components/pages/LoginPage';
import AppLayout from '@/components/AppLayout';
import dynamic from 'next/dynamic';

const DashboardPage = dynamic(() => import('@/components/pages/DashboardPage'), { ssr: false });
const CatalogPage = dynamic(() => import('@/components/pages/CatalogPage'), { ssr: false });
const WizardPage = dynamic(() => import('@/components/pages/WizardPage'), { ssr: false });
const DocumentsPage = dynamic(() => import('@/components/pages/DocumentsPage'), { ssr: false });
const ContactsPage = dynamic(() => import('@/components/pages/ContactsPage'), { ssr: false });
const AdminPage = dynamic(() => import('@/components/pages/AdminPage'), { ssr: false });
const PaymentsPage = dynamic(() => import('@/components/pages/PaymentsPage'), { ssr: false });

export default function Home() {
  const { user, currentPage, focusMode } = useAppStore();

  if (!user) {
    return <LoginPage />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <DashboardPage />;
      case 'catalog': return <CatalogPage />;
      case 'wizard': return <WizardPage />;
      case 'documents': return <DocumentsPage />;
      case 'contacts': return <ContactsPage />;
      case 'payments': return <PaymentsPage />;
      case 'admin':
      case 'admin-templates':
      case 'admin-clauses':
      case 'admin-users':
      case 'admin-requests':
      case 'admin-pricing':
        return <AdminPage />;
      default: return <DashboardPage />;
    }
  };

  if (focusMode) {
    return renderPage();
  }

  return (
    <AppLayout>
      {renderPage()}
    </AppLayout>
  );
}