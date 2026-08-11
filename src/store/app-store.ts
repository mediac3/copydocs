import { create } from 'zustand';

export type Page = 'dashboard' | 'catalog' | 'wizard' | 'documents' | 'contacts' | 'admin' | 'admin-templates' | 'admin-clauses' | 'admin-users' | 'admin-requests' | 'admin-pricing' | 'admin-terminos' | 'admin-publications' | 'payments' | 'profile';

interface AppState {
  user: {
    id: string;
    username: string;
    name: string;
    email: string | null;
    phone: string | null;
    role: string;
    status: string;
    credits: number;
  } | null;
  token: string | null;
  currentPage: Page;
  focusMode: boolean;
  sidebarOpen: boolean;
  isVisitor: boolean;
  showLogin: boolean;
  wizardTemplateId: string | null;
  wizardDocumentId: string | null;

  setUser: (user: AppState['user'], token: string) => void;
  logout: () => void;
  setCurrentPage: (page: Page) => void;
  toggleFocusMode: () => void;
  setSidebarOpen: (open: boolean) => void;
  startWizard: (templateId: string, documentId?: string) => void;
  startVisitorWizard: (templateId: string) => void;
  exitVisitorMode: () => void;
  enterVisitorCatalog: () => void;
  showLoginPage: () => void;
  hideLoginPage: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  token: null,
  currentPage: 'catalog',
  focusMode: false,
  sidebarOpen: false,
  isVisitor: true,
  showLogin: false,
  wizardTemplateId: null,
  wizardDocumentId: null,

  setUser: (user, token) => set({ user, token, isVisitor: false, showLogin: false }),
  logout: () => set({ user: null, token: null, currentPage: 'catalog', isVisitor: true, focusMode: false, showLogin: false }),
  setCurrentPage: (page) => set({ currentPage: page, focusMode: page === 'wizard' }),
  toggleFocusMode: () => set((s) => ({ focusMode: !s.focusMode, sidebarOpen: !s.focusMode })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  startWizard: (templateId, documentId) => set({ currentPage: 'wizard', wizardTemplateId: templateId, wizardDocumentId: documentId || null }),
  startVisitorWizard: (templateId) => set({ isVisitor: true, currentPage: 'wizard', wizardTemplateId: templateId, wizardDocumentId: null, focusMode: true, sidebarOpen: false, showLogin: false }),
  exitVisitorMode: () => set({ isVisitor: false, currentPage: 'catalog', wizardTemplateId: null, wizardDocumentId: null }),
  enterVisitorCatalog: () => set({ isVisitor: true, currentPage: 'catalog', focusMode: false, sidebarOpen: false, showLogin: false }),
  showLoginPage: () => set({ showLogin: true }),
  hideLoginPage: () => set({ showLogin: false }),
}));
