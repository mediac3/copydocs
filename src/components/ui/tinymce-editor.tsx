'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Table } from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import { TextStyle } from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import { useCallback, useRef, useState } from 'react'
import type { Editor } from '@tiptap/react'

/* -------------------------------------------------------------------------- */
/*  Reusable Rich Text Editor (Tiptap — 100% free, no license needed)         */
/*  Supports: tables, links, images (via upload handler), AI features,        */
/*  and adapts to dark/light theme.                                           */
/* -------------------------------------------------------------------------- */

interface TinyMCEEditorProps {
  value: string
  onValueChange: (value: string) => void
  height?: number
  placeholder?: string
  darkMode?: boolean
  extraPlugins?: string
  extraToolbar?: string
  aiFeatures?: boolean
  imagesUploadUrl?: string
}

/* ---- Icon helpers ---- */
function Icn({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <span title={title} className="inline-flex items-center justify-center w-7 h-7 rounded hover:bg-foreground/10 cursor-pointer text-foreground/60 hover:text-foreground transition-colors">
      {children}
    </span>
  )
}

/* ---- Toolbar Button ---- */
function TBtn({
  active,
  onClick,
  title,
  children,
  disabled,
}: {
  active?: boolean
  disabled?: boolean
  onClick: () => void
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`inline-flex items-center justify-center w-7 h-7 rounded transition-colors text-xs ${
        disabled
          ? 'text-foreground/20 cursor-not-allowed'
          : active
            ? 'bg-primary/20 text-primary cursor-pointer'
            : 'text-foreground/60 hover:text-foreground hover:bg-foreground/10 cursor-pointer'
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

/* ---- Separator ---- */
function Sep() {
  return <span className="inline-block w-px h-5 bg-foreground/15 mx-1" />
}

/* ---- SVG Icons ---- */
const Icons = {
  bold: <b className="text-sm leading-none">B</b>,
  italic: <i className="text-sm leading-not-italic">I</i>,
  underline: <u className="text-sm leading-none">U</u>,
  strike: <s className="text-sm leading-none">S</s>,
  h1: <span className="text-[11px] font-bold leading-none">H1</span>,
  h2: <span className="text-[11px] font-bold leading-none">H2</span>,
  h3: <span className="text-[11px] font-bold leading-none">H3</span>,
  p: <span className="text-[11px] font-bold leading-none">P</span>,
  ul: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><circle cx="4" cy="6" r="1" fill="currentColor" /><circle cx="4" cy="12" r="1" fill="currentColor" /><circle cx="4" cy="18" r="1" fill="currentColor" /></svg>
  ),
  ol: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><line x1="10" y1="6" x2="21" y2="6" /><line x1="10" y1="12" x2="21" y2="12" /><line x1="10" y1="18" x2="21" y2="18" /><text x="3" y="8" fontSize="7" fill="currentColor" stroke="none">1</text><text x="3" y="14" fontSize="7" fill="currentColor" stroke="none">2</text><text x="3" y="20" fontSize="7" fill="currentColor" stroke="none">3</text></svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
  ),
  image: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
  ),
  table: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" /><line x1="9" y1="3" x2="9" y2="21" /></svg>
  ),
  alignLeft: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="15" y2="12" /><line x1="3" y1="18" x2="18" y2="18" /></svg>
  ),
  alignCenter: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="6" y1="12" x2="18" y2="12" /><line x1="4" y1="18" x2="20" y2="18" /></svg>
  ),
  alignRight: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="9" y1="12" x2="21" y2="12" /><line x1="6" y1="18" x2="21" y2="18" /></svg>
  ),
  alignJustify: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
  ),
  undo: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7v6h6" /><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" /></svg>
  ),
  redo: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 7v6h-6" /><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" /></svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4z" /><circle cx="12" cy="15" r="2" /><line x1="12" y1="17" x2="12" y2="19" /></svg>
  ),
  addRow: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="12" y1="3" x2="12" y2="21" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="12" y1="12" x2="12" y2="3" strokeDasharray="2 2" /><line x1="12" y1="12" x2="21" y2="12" strokeDasharray="2 2" /></svg>
  ),
  delRow: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="8" y1="15" x2="16" y2="15" /></svg>
  ),
  addCol: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="12" y1="3" x2="12" y2="21" /><line x1="15" y1="8" x2="15" y2="16" /></svg>
  ),
  delCol: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="12" y1="3" x2="12" y2="21" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
  ),
  delTable: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="7" y1="7" x2="17" y2="17" /><line x1="17" y1="7" x2="7" y2="17" /></svg>
  ),
  highlight: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
  ),
}

/* ---- Link input popover ---- */
function LinkPopover({
  editor,
  onClose,
  darkMode,
}: {
  editor: Editor
  onClose: () => void
  darkMode: boolean
}) {
  const [url, setUrl] = useState(editor.getAttributes('link').href || 'https://')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSave = () => {
    if (url.trim()) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url.trim() }).run()
    } else {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
    }
    onClose()
  }

  const handleRemove = () => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run()
    onClose()
  }

  return (
    <div className={`absolute top-full left-0 mt-1 z-50 flex items-center gap-1.5 rounded-lg border px-3 py-2 shadow-lg ${
      darkMode ? 'bg-[#1a1a2e] border-white/10' : 'bg-white border-border'
    }`}>
      <input
        ref={inputRef}
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') onClose() }}
        placeholder="https://..."
        autoFocus
        className={`w-48 text-xs outline-none bg-transparent ${darkMode ? 'text-white placeholder:text-white/30' : 'text-foreground placeholder:text-foreground/30'}`}
      />
      <button onClick={handleSave} className={`text-xs font-medium px-2 py-1 rounded ${darkMode ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'}`}>OK</button>
      <button onClick={handleRemove} className={`text-xs px-1.5 py-1 rounded ${darkMode ? 'text-red-400 hover:bg-red-400/10' : 'text-red-500 hover:bg-red-500/10'}`}>X</button>
    </div>
  )
}

/* ---- AI Prompt popover ---- */
function AIPopover({
  onSend,
  onClose,
  darkMode,
}: {
  onSend: (prompt: string) => void
  onClose: () => void
  darkMode: boolean
}) {
  const [prompt, setPrompt] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    if (!prompt.trim()) return
    onSend(prompt.trim())
    onClose()
  }

  return (
    <div className={`absolute top-full right-0 mt-1 z-50 w-72 rounded-lg border shadow-lg p-3 ${
      darkMode ? 'bg-[#1a1a2e] border-white/10' : 'bg-white border-border'
    }`}>
      <p className={`text-xs font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-foreground/70'}`}>Asistente IA — escribe que necesitas generar</p>
      <textarea
        ref={textareaRef}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
        placeholder="Ej: Redacta una clausula de confidencialidad..."
        rows={3}
        className={`w-full text-xs rounded-md border px-2 py-1.5 outline-none resize-none ${
          darkMode
            ? 'bg-white/5 border-white/10 text-white placeholder:text-white/30'
            : 'bg-muted border-border text-foreground placeholder:text-foreground/30'
        }`}
      />
      <div className="flex justify-end mt-2 gap-1.5">
        <button onClick={onClose} className={`text-xs px-2.5 py-1 rounded ${darkMode ? 'text-white/50 hover:text-white' : 'text-foreground/50 hover:text-foreground'}`}>Cancelar</button>
        <button onClick={handleSend} className="text-xs px-3 py-1 rounded bg-primary text-primary-foreground font-medium">Generar</button>
      </div>
    </div>
  )
}

/* ========================================================================= */
/*  Main Editor Component                                                     */
/* ========================================================================= */

export default function TinyMCEEditor({
  value,
  onValueChange,
  height = 300,
  placeholder,
  darkMode = false,
  aiFeatures = false,
  imagesUploadUrl,
}: TinyMCEEditorProps) {
  const [showLink, setShowLink] = useState(false)
  const [showAI, setShowAI] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'underline' } }),
      Image.configure({ inline: false, allowBase64: true }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: placeholder || '' }),
      TextStyle,
      Highlight.configure({ multicolor: false }),
    ],
    content: value,
    onUpdate: ({ editor: ed }) => {
      onValueChange(ed.getHTML())
    },
    editorProps: {
      attributes: {
        class: darkMode
          ? 'prose prose-sm max-w-none focus:outline-none min-h-full [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-white/15 [&_td]:px-2 [&_td]:py-1 [&_th]:border [&_th]:border-white/15 [&_th]:bg-white/5 [&_th]:px-2 [&_th]:py-1 [&_th]:text-left [&_th]:font-semibold [&_a]:text-blue-400 [&_a]:underline [&_img]:max-w-full [&_img]:rounded [&_blockquote]:border-l-2 [&_blockquote]:border-white/20 [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-white/60'
          : 'prose prose-sm max-w-none focus:outline-none min-h-full [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_td]:px-2 [&_td]:py-1 [&_th]:border [&_th]:border-border [&_th]:bg-muted/50 [&_th]:px-2 [&_th]:py-1 [&_th]:text-left [&_th]:font-semibold [&_a]:text-primary [&_a]:underline [&_img]:max-w-full [&_img]:rounded',
      },
    },
  })

  /* Keep editor in sync if external value changes (e.g. form reset) */
  const prevValueRef = useRef(value)
  if (value !== prevValueRef.current && editor && editor.getHTML() !== value) {
    prevValueRef.current = value
    // We use setTimeout to avoid updating during render
    setTimeout(() => editor.commands.setContent(value), 0)
  }

  /* ---- Image upload handler ---- */
  const handleImageUpload = useCallback(async (file: File) => {
    if (!editor) return
    if (imagesUploadUrl) {
      try {
        const formData = new FormData()
        formData.append('file', file)
        const res = await fetch(imagesUploadUrl, { method: 'POST', body: formData })
        const data = await res.json()
        if (data.url) {
          editor.chain().focus().setImage({ src: data.url }).run()
        }
      } catch (err) {
        console.error('Image upload error:', err)
      }
    } else {
      /* Base64 fallback */
      const reader = new FileReader()
      reader.onload = () => {
        const dataUrl = reader.result as string
        editor.chain().focus().setImage({ src: dataUrl }).run()
      }
      reader.readAsDataURL(file)
    }
  }, [editor, imagesUploadUrl])

  /* ---- AI handler ---- */
  const handleAIGenerate = useCallback(async (prompt: string) => {
    if (!editor) return
    setAiLoading(true)
    try {
      const res = await fetch('/api/assistant/tinymce-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
      const data = await res.json()
      if (data.response) {
        editor.chain().focus().insertContent(data.response).run()
      }
    } catch (err) {
      console.error('AI error:', err)
    } finally {
      setAiLoading(false)
    }
  }, [editor])

  if (!editor) return null

  const isInTable = editor.isActive('table')

  return (
    <div className={`relative flex flex-col ${darkMode ? 'bg-[#1a1a2e]' : 'bg-background'}`} style={{ minHeight: height }}>
      {/* ---- Toolbar ---- */}
      <div className={`flex flex-wrap items-center gap-0.5 border-b px-1.5 py-1 ${darkMode ? 'border-white/10' : 'border-border'}`}>
        {/* Undo / Redo */}
        <TBtn title="Deshacer" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>{Icons.undo}</TBtn>
        <TBtn title="Rehacer" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>{Icons.redo}</TBtn>
        <Sep />

        {/* Headings */}
        <TBtn title="Parrafo" active={editor.isActive('paragraph')} onClick={() => editor.chain().focus().setParagraph().run()}>{Icons.p}</TBtn>
        <TBtn title="Titulo 1" active={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>{Icons.h1}</TBtn>
        <TBtn title="Titulo 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>{Icons.h2}</TBtn>
        <TBtn title="Titulo 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>{Icons.h3}</TBtn>
        <Sep />

        {/* Text formatting */}
        <TBtn title="Negrita" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>{Icons.bold}</TBtn>
        <TBtn title="Cursiva" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>{Icons.italic}</TBtn>
        <TBtn title="Subrayado" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}>{Icons.underline}</TBtn>
        <TBtn title="Tachado" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}>{Icons.strike}</TBtn>
        <TBtn title="Resaltado" active={editor.isActive('highlight')} onClick={() => editor.chain().focus().toggleHighlight().run()}>{Icons.highlight}</TBtn>
        <Sep />

        {/* Lists */}
        <TBtn title="Lista" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>{Icons.ul}</TBtn>
        <TBtn title="Lista numerada" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>{Icons.ol}</TBtn>
        <Sep />

        {/* Align */}
        <TBtn title="Alinear izquierda" active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()}>{Icons.alignLeft}</TBtn>
        <TBtn title="Centrar" active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()}>{Icons.alignCenter}</TBtn>
        <TBtn title="Alinear derecha" active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()}>{Icons.alignRight}</TBtn>
        <TBtn title="Justificar" active={editor.isActive({ textAlign: 'justify' })} onClick={() => editor.chain().focus().setTextAlign('justify').run()}>{Icons.alignJustify}</TBtn>
        <Sep />

        {/* Link */}
        <div className="relative">
          <TBtn title="Enlace" active={editor.isActive('link')} onClick={() => setShowLink(!showLink)}>{Icons.link}</TBtn>
          {showLink && <LinkPopover editor={editor} onClose={() => setShowLink(false)} darkMode={darkMode} />}
        </div>

        {/* Image */}
        <TBtn
          title="Imagen"
          onClick={() => fileInputRef.current?.click()}
        >{Icons.image}</TBtn>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleImageUpload(file)
            e.target.value = ''
          }}
        />

        {/* Table */}
        <TBtn title="Insertar tabla" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>{Icons.table}</TBtn>

        {/* Table operations (only inside table) */}
        {isInTable && (
          <>
            <Sep />
            <TBtn title="Agregar fila" onClick={() => editor.chain().focus().addRowAfter().run()}>{Icons.addRow}</TBtn>
            <TBtn title="Eliminar fila" onClick={() => editor.chain().focus().deleteRow().run()}>{Icons.delRow}</TBtn>
            <TBtn title="Agregar columna" onClick={() => editor.chain().focus().addColumnAfter().run()}>{Icons.addCol}</TBtn>
            <TBtn title="Eliminar columna" onClick={() => editor.chain().focus().deleteColumn().run()}>{Icons.delCol}</TBtn>
            <TBtn title="Eliminar tabla" onClick={() => editor.chain().focus().deleteTable().run()}>{Icons.delTable}</TBtn>
          </>
        )}

        <Sep />

        {/* Blockquote */}
        <TBtn
          title="Cita"
          active={editor.isActive('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" /></svg>
        </TBtn>

        {/* Horizontal rule */}
        <TBtn title="Linea horizontal" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /></svg>
        </TBtn>

        {/* AI */}
        {aiFeatures && (
          <>
            <Sep />
            <div className="relative">
              <TBtn
                title="Asistente IA"
                active={aiLoading}
                onClick={() => setShowAI(!showAI)}
              >
                {aiLoading ? (
                  <span className="inline-block w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : (
                  Icons.ai
                )}
              </TBtn>
              {showAI && <AIPopover onSend={handleAIGenerate} onClose={() => setShowAI(false)} darkMode={darkMode} />}
            </div>
          </>
        )}
      </div>

      {/* ---- Editor Area ---- */}
      <div
        className={`flex-1 overflow-y-auto px-4 py-3 ${darkMode ? 'text-white/90' : 'text-foreground'}`}
        style={{ minHeight: height - 42 }}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
