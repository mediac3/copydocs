import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { randomUUID } from 'crypto'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
const MAX_SIZE = 5 * 1024 * 1024 // 5 MB

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

    const bytes = await file.arrayBuffer()
    const ext = file.name.split('.').pop() || 'png'
    const filename = `${randomUUID()}.${ext}`
    const filepath = join(process.cwd(), 'public', 'uploads', filename)

    await writeFile(filepath, Buffer.from(bytes))

    return NextResponse.json({ url: `/uploads/${filename}` })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Error al subir archivo' }, { status: 500 })
  }
}
