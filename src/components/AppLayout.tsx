'use client';

import { useState } from 'react';
import { useAppStore, type Page } from '@/store/app-store';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  LayoutDashboard, FileText, Library, FileStack, Users, Settings, CreditCard,
  ChevronLeft, ChevronRight, LogOut, Scale, Shield, Menu, X, Crown, Sun, Moon, Palette
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';

const CLIENT_NAV: { icon: typeof LayoutDashboard; label: string; page: Page; badge?: string }[] = [
  { icon: LayoutDashboard, label: 'Dashboard', page: 'dashboard' },
  { icon: Library, label: 'Catálogo', page: 'catalog' },
  { icon: FileText, label: 'Mis Documentos', page: 'documents' },
  { icon: Users, label: 'Mis Datos', page: 'contacts' },
  { icon: CreditCard, label: 'Pagos', page: 'payments' },
];

const ADMIN_NAV: { icon: typeof LayoutDashboard; label: string; page: Page }[] = [
  { icon: LayoutDashboard, label: 'Resumen', page: 'admin' },
  { icon: FileText, label: 'Plantillas', page: 'admin-templates' },
  { icon: FileStack, label: 'Cláusulas', page: 'admin-clauses' },
  { icon: Users, label: 'Usuarios', page: 'admin-users' },
  { icon: Settings, label: 'Solicitudes', page: 'admin-requests' },
  { icon: CreditCard, label: 'Precios', page: 'admin-pricing' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, currentPage, setCurrentPage, logout, sidebarOpen, setSidebarOpen, focusMode, toggleFocusMode } = useAppStore();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = user?.role === 'admin' ? ADMIN_NAV : CLIENT_NAV;

  const handleNav = (page: Page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada');
  };

  if (focusMode) {
    return (
      <div className="min-h-screen bg-background bg-grid-pattern">
        <div className="fixed top-3 right-3 z-50">
          <Button variant="ghost" size="sm" onClick={toggleFocusMode}
            className="bg-white/10 backdrop-blur border border-white/10 hover:bg-white/20 text-foreground">
            <X className="w-4 h-4 mr-1" /> Salir del enfoque
          </Button>
        </div>
        {children}
      </div>
    );
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-screen flex bg-background bg-grid-pattern">
        {/* Sidebar - Desktop */}
        <aside className={cn(
          'hidden lg:flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 relative',
          sidebarOpen ? 'w-64' : 'w-16'
        )}>
          <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
            <button onClick={toggleFocusMode} className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_12px_rgba(201,169,78,0.4)] transition-shadow">
                <Scale className="w-4.5 h-4.5 text-primary-foreground" />
              </div>
              {sidebarOpen && (
                <span className="text-sidebar-primary font-bold text-lg tracking-tight animate-fade-in-right">LexDoc</span>
              )}
            </button>
          </div>

          <ScrollArea className="flex-1 py-3 px-2 scrollbar-thin">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.page;
                return (
                  <Tooltip key={item.page}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleNav(item.page)}
                        className={cn(
                          'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200',
                          isActive
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm'
                            : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                        )}
                      >
                        <Icon className={cn('w-5 h-5 flex-shrink-0', isActive && 'text-primary')} />
                        {sidebarOpen && <span className="truncate">{item.label}</span>}
                      </button>
                    </TooltipTrigger>
                    {!sidebarOpen && <TooltipContent side="right"><p>{item.label}</p></TooltipContent>}
                  </Tooltip>
                );
              })}
            </nav>
          </ScrollArea>

          <div className="p-2 border-t border-sidebar-border space-y-1">
            {sidebarOpen && user?.role === 'admin' && (
              <div className="flex items-center gap-2 px-3 py-1.5 mb-1">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-xs text-primary font-medium">Administrador</span>
              </div>
            )}
            {user?.subscriptionPlan && user.subscriptionPlan !== 'Básico' && sidebarOpen && (
              <div className="flex items-center gap-2 px-3 py-1.5">
                <Crown className="w-4 h-4 text-primary" />
                <span className="text-xs text-sidebar-foreground">Plan {user.subscriptionPlan}</span>
              </div>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="w-full flex items-center justify-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-all"
                >
                  {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  {sidebarOpen && <span className="text-sm">Colapsar</span>}
                </button>
              </TooltipTrigger>
              {!sidebarOpen && <TooltipContent side="right"><p>Expandir menú</p></TooltipContent>}
            </Tooltip>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
        )}

        {/* Mobile Sidebar */}
        <aside className={cn(
          'lg:hidden fixed top-0 left-0 h-full w-72 bg-sidebar border-r border-sidebar-border z-50 transition-transform duration-300 flex flex-col',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}>
          <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
            <button onClick={toggleFocusMode} className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Scale className="w-4.5 h-4.5 text-primary-foreground" />
              </div>
              <span className="text-sidebar-primary font-bold text-lg">LexDoc</span>
            </button>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="text-sidebar-foreground hover:text-white">
              <X className="w-5 h-5" />
            </Button>
          </div>
          <ScrollArea className="flex-1 py-3 px-2">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    onClick={() => handleNav(item.page)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all',
                      isActive
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                    )}
                  >
                    <Icon className={cn('w-5 h-5', isActive && 'text-primary')} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </ScrollArea>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(true)}>
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h2 className="text-sm font-semibold text-foreground">
                  {navItems.find(n => n.page === currentPage)?.label || 'LexDoc'}
                </h2>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  {user?.role === 'admin' ? 'Panel de Administración' : 'Generación de documentos legales colombianos'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => {
                    if (theme === 'warm') setTheme('dark')
                    else if (theme === 'dark') setTheme('light')
                    else setTheme('warm')
                  }} className="text-muted-foreground hover:text-foreground">
                    {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : theme === 'light' ? <Palette className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>{theme === 'warm' ? 'Tema oscuro' : theme === 'dark' ? 'Tema claro' : 'Tema cálido'}</p></TooltipContent>
              </Tooltip>
              <Separator orientation="vertical" className="h-6 mx-1" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="text-xs font-semibold text-primary">{user?.name?.charAt(0) || 'U'}</span>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-foreground leading-none">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.role === 'admin' ? 'Administrador' : 'Cliente'}</p>
                </div>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
                    <LogOut className="w-4.5 h-4.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>Cerrar sesión</p></TooltipContent>
              </Tooltip>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-4 lg:p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}