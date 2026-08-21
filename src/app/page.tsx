'use client';

import { useAppStore } from '@/store/app-store';
import LoginPage from '@/components/pages/LoginPage';
import AppLayout from '@/components/AppLayout';
import AssistantChat from '@/components/AssistantChat';
import dynamic from 'next/dynamic';

const DashboardPage = dynamic(() => import('@/components/pages/DashboardPage'), { ssr: false });
const CatalogPage = dynamic(() => import('@/components/pages/CatalogPage'), { ssr: false });
const WizardPage = dynamic(() => import('@/components/pages/WizardPage'), { ssr: false });
const DocumentsPage = dynamic(() => import('@/components/pages/DocumentsPage'), { ssr: false });
const ContactsPage = dynamic(() => import('@/components/pages/ContactsPage'), { ssr: false });
const AdminPage = dynamic(() => import('@/components/pages/AdminPage'), { ssr: false });
const PaymentsPage = dynamic(() => import('@/components/pages/PaymentsPage'), { ssr: false });
const InstallPWAButton = dynamic(() => import('@/components/InstallPWAButton'), { ssr: false });

export default function Home() {
  const { user, currentPage, focusMode, isVisitor, showLogin, hideLoginPage } = useAppStore();

  // Show login page when explicitly requested or when not visitor and not logged in
  if (!user && showLogin) {
    return <LoginPage onBack={hideLoginPage} />;
  }

  // Visitor mode: allow catalog and wizard without authentication
  if (!user) {
    if (isVisitor && (currentPage === 'catalog' || currentPage === 'wizard')) {
      const renderPage = () => {
        switch (currentPage) {
          case 'catalog': return <CatalogPage />;
          case 'wizard': return <WizardPage />;
          default: return <CatalogPage />;
        }
      };
      return (
        <>
          {renderPage()}
          <AssistantChat />
          <InstallPWAButton />
        </>
      );
    }
    return <LoginPage onBack={hideLoginPage} />;
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
      case 'admin-terminos':
      case 'admin-publications':
      case 'admin-permisos':
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
