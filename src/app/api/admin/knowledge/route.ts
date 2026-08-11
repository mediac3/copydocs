import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'copyexpress-admin-export'

async function verifyAdmin(): Promise<boolean> {
  const h = await headers()
  return h.get('x-admin-export') === ADMIN_SECRET
}

// GET — list all knowledge entries
export async function GET() {
  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const entries = await db.knowledgeBase.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(entries)
  } catch (error) {
    console.error('Knowledge GET error:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

// POST — create new entry
export async function POST(request: Request) {
  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { title, content, category, active } = body

    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json({ error: 'Título y contenido son requeridos' }, { status: 400 })
    }

    const entry = await db.knowledgeBase.create({
      data: {
        title: title.trim(),
        content: content.trim(),
        category: category?.trim() || 'general',
        active: active !== false,
      },
    })

    return NextResponse.json(entry, { status: 201 })
  } catch (error) {
    console.error('Knowledge POST error:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

// PUT — update entry
export async function PUT(request: Request) {
  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { id, title, content, category, active } = body

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 })
    }

    const entry = await db.knowledgeBase.update({
      where: { id },
      data: {
        ...(title !== undefined ? { title: title.trim() } : {}),
        ...(content !== undefined ? { content: content.trim() } : {}),
        ...(category !== undefined ? { category: category.trim() } : {}),
        ...(active !== undefined ? { active } : {}),
      },
    })

    return NextResponse.json(entry)
  } catch (error) {
    console.error('Knowledge PUT error:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

// DELETE — delete entry
export async function DELETE(request: Request) {
  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 })
    }

    await db.knowledgeBase.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Knowledge DELETE error:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
