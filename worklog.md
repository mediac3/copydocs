# LexDoc Worklog

---
Task ID: 1
Agent: Main Agent
Task: 6 actualizaciones frontend para LexDoc

Work Log:
- Removed demo/admin credentials section from LoginPage.tsx
- Added 'Documento Borrador' diagonal watermark overlay to WizardPage preview panel
- Disabled right-click (contextmenu) and copy events on preview for visitor users
- Modified Prisma schema to make userId optional on UserDocument, added visitorPhone/visitorName fields
- Created /api/documents/visitor POST endpoint for visitor document saving
- Created /api/documents/visitor-list GET endpoint for admin to fetch visitor documents
- Updated /api/documents/export to support admin export via x-admin-export header
- Modified WizardPage sendWhatsApp to save visitor document before opening WhatsApp
- Added VisitorDocument interface and visitor documents table to AdminPage solicitudes tab with PDF/DOCX download buttons
- Created warm theme (.warm CSS class) with cream/amber palette as default
- Updated ThemeProvider default from 'dark' to 'warm'
- Updated AppLayout theme toggle to cycle warm → dark → light
- Added comprehensive CSS overrides in globals.css for hardcoded navy/gold classes under .warm
- Changed default store state: isVisitor=true, showLogin=false, focusMode=false
- Updated page.tsx to show catalog first for visitors, login on showLogin flag
- Updated CatalogPage visitor header with theme toggle + 'Iniciar sesion' button using CSS variables
- Updated LoginPage to use CSS variables, accept onBack prop, and show back button
- Added showLoginPage/hideLoginPage actions to Zustand store

Stage Summary:
- All 6 updates implemented and build verified successfully
- New API endpoints: /api/documents/visitor, /api/documents/visitor-list
- DB schema updated with visitorPhone, visitorName fields on UserDocument
- Warm theme (cream/amber) is now the default, dark theme accessible via theme toggle
- Visitors land on catalog first with login button in header
- Admin can see and download visitor documents from Solicitudes section
