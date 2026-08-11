---
Task ID: 1
Agent: Super Z (main)
Task: Fix publications panel toggle, update visitor title, integrate TinyMCE, add knowledge base

Work Log:
- Fixed PublicationsPanel.tsx toggle: replaced translate-x-0/-translate-x-full with overflow-hidden on parent container so inner w-72 content gets clipped when parent is w-0
- Changed CatalogPage.tsx visitor title from 'Genera tu Documento Legal' to 'CopyDocs' and subtitle from paragraph to '1. Selecciona  ·  2. Completa  ·  3. Envía'
- Installed @tinymce/tinymce-react + tinymce packages
- Copied TinyMCE assets (icons, models, plugins, skins, themes, JS) to public/tinymce/
- Created reusable TinyMCEEditor component (src/components/ui/tinymce-editor.tsx) with dark mode, AI features, image upload support
- Created /api/upload route for image file uploads (validates type/size, saves to public/uploads/)
- Created /api/assistant/tinymce-ai route for TinyMCE AI assistant integration (uses knowledge base context)
- Created /api/admin/knowledge route (full CRUD) for knowledge base management
- Added KnowledgeBase model to Prisma schema and ran db push
- Modified AdminPage.tsx:
  - Replaced Contenido Base Textarea with TinyMCE (aiFeatures enabled)
  - Replaced Publications content Textarea with TinyMCE (with image upload via /api/upload)
  - Replaced Publications imageUrl input with file upload object (drag/click to upload, preview, delete)
  - Added 'Base de Conocimiento' tab with full CRUD (table, create/edit dialog with TinyMCE, delete confirmation)
  - Added Brain and ImageIcon imports, TinyMCEEditor dynamic import
- Updated /api/assistant/route.ts to inject knowledge base entries into AI context
- Verified build succeeds with no new TypeScript errors

Stage Summary:
- All 5 tasks completed successfully
- Publications panel now toggles correctly (overflow-hidden fix)
- Visitor hero shows 'CopyDocs' + '1. Selecciona · 2. Completa · 3. Envía'
- Contenido Base uses TinyMCE with table insertion, links, and AI generative features
- Publications use TinyMCE for content + file upload for images
- Knowledge Base module created: Prisma model, admin API, admin UI tab, AI context integration