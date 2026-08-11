---
Task ID: 2
Agent: Super Z (main)
Task: Fix PDF tables, publication images, editor dark mode

Work Log:
- Rewrote export/route.ts with full HTML parser (parseHTMLContent) that converts HTML tables into structured ParsedTable objects
- PDF generation now renders tables as actual PDF tables with: cell background colors (from style), border colors, colspan/rowspan, word wrap within cells, alignment per cell
- DOCX generation also renders tables properly with cell shading, borders, and column spans
- Added hexToRgb color parser supporting #RRGGBB, #RGB, and rgb() formats
- Fixed PublicationsPanel SafeHtml: replaced `prose` class with `not-prose` to prevent Tailwind prose from hiding/breaking Tiptap images wrapped in <figure> tags, added explicit img styling for Tiptap figures
- Added comprehensive dark mode CSS for Tiptap editor in globals.css (`.tiptap-editor-dark` class) covering: text colors, heading colors, strong/em colors, links, blockquotes, lists, table cells, placeholders, selected cells, resize handles
- Updated Tiptap editor component: removed conflicting inline styles, added `tiptap-editor-dark` class, improved toolbar background contrast in dark mode
- Changed style prop to use Math.max(height - 42, 100) to avoid Turbopack parsing issue

Stage Summary:
- Tables from Tiptap editor now render as proper tables in PDF and DOCX with cell colors and borders
- Publication images should display correctly (removed prose interference)
- Editor dark mode has dedicated CSS for full readability
- Build passes cleanly
