'use client'

import { Editor as TinyEditor } from '@tinymce/tinymce-react'
import type { Editor } from 'tinymce'

/* -------------------------------------------------------------------------- */
/*  Reusable TinyMCE Editor component                                         */
/*  Supports: tables, links, images (via upload handler), AI features,        */
/*  and adapts to dark/light theme.                                           */
/* -------------------------------------------------------------------------- */

interface TinyMCEEditorProps {
  value: string
  onValueChange: (value: string) => void
  height?: number
  placeholder?: string
  darkMode?: boolean
  /**
   * Additional plugins beyond the defaults.
   * Defaults: 'lists link image table code wordcount'
   */
  extraPlugins?: string
  /**
   * Additional toolbar buttons beyond the defaults.
   * Defaults: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image table | align lineheight | numlist bullist | outdent indent | removeformat code'
   */
  extraToolbar?: string
  /**
   * If true, shows AI toolbar buttons (aiassistant)
   */
  aiFeatures?: boolean
  /**
   * API endpoint for image upload. If not provided, images use base64.
   */
  imagesUploadUrl?: string
}

const DARK_CONTENT_CSS = `
  body {
    background: #1a1a2e !important;
    color: #e0e0e0 !important;
  }
  .mce-content-body {
    color: #e0e0e0 !important;
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }
  td, th {
    border: 1px solid rgba(255,255,255,0.15);
    padding: 6px 10px;
  }
  th {
    background: rgba(255,255,255,0.05);
    font-weight: 600;
  }
  a {
    color: #60a5fa;
  }
`

export default function TinyMCEEditor({
  value,
  onValueChange,
  height = 300,
  placeholder,
  darkMode = false,
  extraPlugins = '',
  extraToolbar = '',
  aiFeatures = false,
  imagesUploadUrl,
}: TinyMCEEditorProps) {
  const plugins = [
    'lists', 'link', 'image', 'table', 'code', 'wordcount',
    ...(aiFeatures ? ['ai'] : []),
    ...extraPlugins.split(' ').filter(Boolean),
  ].join(' ')

  const toolbar = [
    'undo redo',
    '|',
    'blocks fontfamily fontsize',
    '|',
    'bold italic underline strikethrough',
    '|',
    'link image table',
    '|',
    'align lineheight',
    '|',
    'numlist bullist',
    '|',
    'outdent indent',
    '|',
    'removeformat code',
    ...(aiFeatures ? ['|', 'aiassistant'] : []),
    ...extraToolbar.split(' ').filter(Boolean),
  ].join(' ')

  const handleEditorChange = (content: string, _editor: Editor) => {
    onValueChange(content)
  }

  return (
    <TinyEditor
      tinymceScriptSrc="/tinymce/tinymce.min.js"
      value={value}
      onEditorChange={handleEditorChange}
      initialValue={value}
      init={{
        height,
        menubar: true,
        plugins,
        toolbar,
        placeholder: placeholder || '',
        branding: false,
        promotion: false,
        statusbar: true,
        skin: darkMode ? 'oxide-dark' : 'oxide',
        content_css: darkMode ? 'dark' : 'default',
        content_style: darkMode ? DARK_CONTENT_CSS : '',
        /* ---- Image upload ---- */
        images_upload_handler: imagesUploadUrl
          ? async (blobInfo, progress) => {
              const formData = new FormData()
              formData.append('file', blobInfo.blob(), blobInfo.filename())
              try {
                const res = await fetch(imagesUploadUrl, {
                  method: 'POST',
                  body: formData,
                })
                if (!res.ok) throw new Error('Upload failed')
                const data = await res.json()
                progress(100)
                return data.url || data.location
              } catch (err) {
                console.error('TinyMCE image upload error:', err)
                return ''
              }
            }
          : undefined,
        /* ---- AI features ---- */
        ...(aiFeatures
          ? {
              ai_request: (request: { send: (data: string) => void }, _respond: (response: string) => void) => {
                // Send to our backend AI endpoint
                fetch('/api/assistant/tinymce-ai', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ prompt: request.send.toString() }),
                })
                  .then((r) => r.json())
                  .then((data) => {
                    if (data.response) _respond(data.response)
                  })
                  .catch(() => _respond('Error al generar contenido con IA.'))
              },
            }
          : {}),
        /* ---- Table defaults ---- */
        table_default_attributes: {
          border: '1',
        },
        table_default_styles: {
          'border-collapse': 'collapse',
          width: '100%',
        },
      }}
    />
  )
}
