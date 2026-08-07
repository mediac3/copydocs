# LexDoc - Generación Inteligente de Documentos Legales Colombianos

Aplicación web para la creación guiada de documentos legales colombianos con base en la legislación vigente (Código Civil, Código de Comercio, Ley 1561 de 2012, Ley 527 de 1999, Ley 1448 de 2011, Ley 1755 de 2015, entre otras).

## Características Principales

- **Wizard paso a paso** con preview en tiempo real del documento
- **18+ plantillas legales** colombianas (contratos, actas, poderes, demandas, derechos de petición, estatutos)
- **Motor de plantillas dinámico** con variables `{{variable}}` y lógica condicional
- **Descarga en PDF y DOCX**
- **Biblioteca de cláusulas** reutilizables
- **Gestión de contactos** (personas naturales y jurídicas)
- **Roles** (Cliente / Administrador) con permisos diferenciados
- **Integración con pasarelas de pago** colombianas (ePayco, PayU, Wompi)
- **Modo oscuro/claro** automático según preferencia del sistema
- **Modo enfoque** (oculta chrome al hacer clic en el logo)
- **Diseño responsive** con sidebar colapsable
- **Animaciones** (odómetro en estadísticas, toasts, transiciones)

## Tech Stack

| Tecnología | Uso |
|---|---|
| Next.js 16 (App Router) | Framework principal |
| TypeScript 5 | Lenguaje |
| Tailwind CSS 4 | Estilos |
| shadcn/ui | Componentes UI |
| Prisma ORM (SQLite) | Base de datos |
| Zustand | Estado del cliente |
| Recharts | Gráficas |
| Framer Motion | Animaciones |
| Sonner | Notificaciones toast |
| next-themes | Tema oscuro/claro |
| bcryptjs | Hash de contraseñas |

## Inicio Rápido

### Prerrequisitos

- **Node.js** >= 18 o **Bun** >= 1.0
- **Git**

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/lexdoc.git
cd lexdoc

# Instalar dependencias
bun install
# o: npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con la URL de tu base de datos SQLite

# Sincronizar base de datos
bun run db:push

# (Opcional) Generar cliente Prisma
bun run db:generate

# Sembrar datos de demostración
bun run db:seed

# Iniciar servidor de desarrollo
bun run dev
```

La aplicación estará disponible en `http://localhost:3000`.

### Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL=file:./db/custom.db
```

### Usuarios Precargados

| Rol | Usuario | Contraseña |
|---|---|---|
| **Administrador** | `1038796568` | `1038796568` |
| **Cliente Demo** | `demo` | `demo` |

### Datos de Demostración

El script de seed incluye:
- 2 usuarios (admin + demo)
- 3 planes de suscripción (Básico $14.900, Profesional $34.900, Premium $59.900 COP)
- 6 cláusulas legales predefinidas
- 8 plantillas de documentos con wizard completo
- 3 documentos de ejemplo para el usuario demo
- 3 contactos de ejemplo
- 2 pagos de ejemplo
- 12 referencias normativas (leyes colombianas)

## Despliegue en xcloud.host

### Opción 1: Despliegue Automático (Recomendado)

1. **Subir a GitHub**
```bash
git init
git add .
git commit -m "Initial commit - LexDoc"
git remote add origin https://github.com/TU_USUARIO/lexdoc.git
git push -u origin main
```

2. **En xcloud.host:**
   - Crear nuevo proyecto → Conectar repositorio GitHub
   - Seleccionar rama `main`
   - **Build Command:** `bun run build`
   - **Start Command:** `bun run start`
   - **Port:** `3000`

3. **Variables de entorno en xcloud.host:**
   - `DATABASE_URL` = `file:./db/custom.db`

4. **Post-deploy (ejecutar una vez):**
   ```bash
   # SSH al servidor o usar consola de xcloud.host
   bun run db:push
   bun run db:seed
   ```

### Opción 2: Despliegue Manual vía SSH

```bash
# SSH al servidor de xcloud.host
ssh usuario@tu-servidor-xcloud

# Clonar el repositorio
git clone https://github.com/TU_USUARIO/lexdoc.git
cd lexdoc

# Instalar dependencias
bun install

# Configurar base de datos
bun run db:push
bun run db:seed

# Construir para producción
bun run build

# Iniciar el servidor
bun run start
```

### Configurar como Servicio Systemd (Producción)

```bash
# Crear archivo de servicio
sudo tee /etc/systemd/system/lexdoc.service > /dev/null << 'EOF'
[Unit]
Description=LexDoc - Generación de Documentos Legales
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/ruta/a/lexdoc
ExecStart=/usr/bin/bun run start
Restart=on-failure
RestartSec=5
Environment=NODE_ENV=production
Environment=DATABASE_URL=file:./db/custom.db

[Install]
WantedBy=multi-user.target
EOF

# Habilitar e iniciar
sudo systemctl daemon-reload
sudo systemctl enable lexdoc
sudo systemctl start lexdoc
```

## Estructura del Proyecto

```
lexdoc/
├── prisma/
│   ├── schema.prisma      # Esquema de base de datos
│   └── seed.ts            # Datos de demostración
├── src/
│   ├── app/
│   │   ├── layout.tsx     # Layout raíz (fuentes, tema, toaster)
│   │   ├── page.tsx       # Página principal (SPA router)
│   │   ├── globals.css    # Estilos globales + animaciones
│   │   └── api/           # API Routes
│   │       ├── auth/      # Login y verificación de usuario
│   │       ├── templates/ # CRUD de plantillas
│   │       ├── documents/ # CRUD de documentos
│   │       ├── contacts/  # CRUD de contactos
│   │       ├── payments/  # Pagos y suscripciones
│   │       ├── plans/     # Planes de suscripción
│   │       └── admin/     # Panel de administración
│   ├── components/
│   │   ├── ui/            # Componentes shadcn/ui
│   │   ├── pages/         # Páginas de la aplicación
│   │   └── AppLayout.tsx  # Layout con sidebar + header
│   ├── store/
│   │   └── app-store.ts   # Estado global (Zustand)
│   ├── lib/
│   │   ├── db.ts          # Cliente Prisma
│   │   └── utils.ts       # Utilidades (cn, formatters)
│   └── hooks/             # Custom hooks
├── db/                    # Base de datos SQLite
├── public/                # Archivos estáticos
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── .env.example
```

## Páginas de la Aplicación

### Cliente
| Página | Descripción |
|---|---|
| **Dashboard** | Estadísticas con animación odómetro, gráfica de barras apiladas, documentos recientes, acciones rápidas |
| **Catálogo** | 18+ plantillas con búsqueda predictiva, filtros (categoría, área legal, audiencia, precio), vista grid/lista |
| **Wizard** | Formulario paso a paso con preview split en tiempo real, autocompletado de contactos, revisión final |
| **Mis Documentos** | Tabs (todos/borrador/completados/archivados), búsqueda, duplicar, descargar PDF/DOCX, archivar |
| **Mis Datos** | Gestión de contactos (personas naturales y jurídicas), CRUD completo |
| **Pagos** | Planes de suscripción, historial de pagos, diálogo de pago con pasarelas colombianas |

### Administrador
| Página | Descripción |
|---|---|
| **Resumen** | Estadísticas generales, gráfica mensual, documentos recientes, top plantillas |
| **Plantillas** | Tabla de plantillas, cambio de estado (Borrador → En revisión → Publicado → Desactivado) |
| **Cláusulas** | Biblioteca de cláusulas reutilizables |
| **Usuarios** | Gestión de usuarios, activar/desactivar |
| **Solicitudes** | Solicitudes de documentos personalizados |
| **Precios** | Edición de planes de suscripción |

## Legislación Colombiana Incluida

- **Código Civil Colombiano** (Ley 57 de 1887) - Arrendamiento, compraventa
- **Código de Comercio** (Ley 410 de 1971) - Contratos mercantiles, sociedades
- **Código General del Proceso** (Ley 1564 de 2012) - Poderes, demandas
- **Código Sustantivo del Trabajo** (Decreto 2663 de 1950) - Contratos laborales
- **Ley 820 de 2003** - Arrendamiento de vivienda urbana
- **Ley 1258 de 2008** - Sociedades por Acciones Simplificada (SAS)
- **Ley 1429 de 2010** - Simplificación de cesantías
- **Ley 1755 de 2015** (CPACA) - Derechos de petición
- **Constitución Política de 1991** - Art. 23 (derecho de petición)

## Scripts Disponibles

```bash
bun run dev          # Servidor de desarrollo (puerto 3000)
bun run build        # Construir para producción
bun run start        # Iniciar servidor de producción
bun run lint         # Verificar calidad del código (ESLint)
bun run db:push     # Sincronizar esquema con la base de datos
bun run db:generate  # Generar cliente Prisma
bun run db:migrate   # Ejecutar migraciones
bun run db:reset     # Resetear base de datos
bun run db:seed      # Sembrar datos de demostración
```

## Licencia

Proyecto privado. Todos los derechos reservados.

---

**LexDoc** © 2026 - Generación inteligente de documentos legales colombianos.
