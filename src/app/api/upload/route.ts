import { NextResponse } from 'next/server'
import { writeFile, mkdir, access } from 'fs/promises'
import { join, extname } from 'path'
import { randomUUID } from 'crypto'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
const MAX_SIZE = 5 * 1024 * 1024 // 5 MB

function getUploadDir(): string {
  return join(process.cwd(), 'uploads')
}

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No se proporciono ningun archivo' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Tipo de archivo no permitido' }, { status: 400 })
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'El archivo excede el limite de 5 MB' }, { status: 400 })
    }

    const uploadDir = getUploadDir()

    // Ensure uploads directory exists
    await mkdir(uploadDir, { recursive: true })

    // Verify directory is writable
    await access(uploadDir, 2) // 2 = W_OK

    const bytes = Buffer.from(await file.arrayBuffer())
    const ext = (file.name && extname(file.name)) || '.png'
    const filename = `${randomUUID()}${ext}`
    const filepath = join(uploadDir, filename)

    await writeFile(filepath, bytes)

    return NextResponse.json({ url: `/api/uploads/${filename}` })
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('Upload error:', msg, error)
    return NextResponse.json({ error: `Error al subir: ${msg}` }, { status: 500 })
  }
}
