import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# ── Fonts ──
pdfmetrics.registerFont(TTFont('DejaVu', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuBd', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSerif', '/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSerifBd', '/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf'))

PRIMARY = HexColor('#C9A94E')
DARK = HexColor('#0A1628')
DARK2 = HexColor('#1a1a2e')
GRAY = HexColor('#666666')
LIGHT_BG = HexColor('#F8F9FA')
WHITE = HexColor('#FFFFFF')
BORDER_C = HexColor('#DDDDDD')
GREEN = HexColor('#28A745')

OUT = '/home/z/my-project/download/CopyDocs_Guia_Instalacion.pdf'
os.makedirs(os.path.dirname(OUT), exist_ok=True)

doc = SimpleDocTemplate(
    OUT, pagesize=A4,
    leftMargin=2.2*cm, rightMargin=2.2*cm,
    topMargin=2.5*cm, bottomMargin=2.5*cm,
    title='CopyDocs - Guia de Instalacion y Despliegue',
    author='CopyDocs',
    subject='Guia de despliegue en produccion con Docker y xcloud.host'
)

W = A4[0] - 2.2*cm - 2.2*cm

# ── Styles ──
s = getSampleStyleSheet()
s.add(ParagraphStyle('CoverTitle', fontName='DejaVuBd', fontSize=28, textColor=WHITE, alignment=TA_CENTER, spaceAfter=6, leading=34))
s.add(ParagraphStyle('CoverSub', fontName='DejaVu', fontSize=13, textColor=HexColor('#CCCCCC'), alignment=TA_CENTER, spaceAfter=4, leading=18))
s.add(ParagraphStyle('CoverVer', fontName='DejaVu', fontSize=10, textColor=HexColor('#999999'), alignment=TA_CENTER, spaceAfter=2))
s.add(ParagraphStyle('H1', fontName='DejaVuBd', fontSize=18, textColor=DARK, spaceBefore=18, spaceAfter=10, leading=24))
s.add(ParagraphStyle('H2', fontName='DejaVuBd', fontSize=13, textColor=PRIMARY, spaceBefore=14, spaceAfter=6, leading=18))
s.add(ParagraphStyle('Body', fontName='DejaVu', fontSize=9.5, textColor=DARK, alignment=TA_JUSTIFY, spaceAfter=6, leading=14))
s.add(ParagraphStyle('Code', fontName='DejaVu', fontSize=8.5, textColor=HexColor('#333333'), backColor=LIGHT_BG, borderPadding=(6, 8, 6, 8), spaceAfter=4, leading=13, leftIndent=10))
s.add(ParagraphStyle('Bullet', fontName='DejaVu', fontSize=9.5, textColor=DARK, leftIndent=18, bulletIndent=6, spaceAfter=3, leading=14))
s.add(ParagraphStyle('Note', fontName='DejaVu', fontSize=8.5, textColor=HexColor('#555555'), backColor=HexColor('#FFF8E1'), borderPadding=(8, 10, 8, 10), spaceAfter=6, leading=13, leftIndent=6))
s.add(ParagraphStyle('Footer', fontName='DejaVu', fontSize=7.5, textColor=GRAY, alignment=TA_CENTER))

story = []

# ── Cover Page ──
story.append(Spacer(1, 4*cm))
story.append(Paragraph('CopyDocs', s['CoverTitle']))
story.append(Paragraph('Generacion Inteligente de Documentos Legales', s['CoverSub']))
story.append(Spacer(1, 0.5*cm))
story.append(HRFlowable(width='60%', thickness=2, color=PRIMARY, spaceAfter=12))
story.append(Paragraph('Guia de Instalacion y Despliegue en Produccion', s['CoverSub']))
story.append(Paragraph('Docker + GitHub + xcloud.host', s['CoverSub']))
story.append(Spacer(1, 2*cm))
story.append(Paragraph('Version 1.0 - Agosto 2025', s['CoverVer']))
story.append(PageBreak())

# ── Helpers ──
def h1(t): story.append(Paragraph(t, s['H1']))
def h2(t): story.append(Paragraph(t, s['H2']))
def p(t): story.append(Paragraph(t, s['Body']))
def code(t): story.append(Paragraph(t.replace('<', '&lt;').replace('>', '&gt;'), s['Code']))
def bullet(t): story.append(Paragraph(f'\u2022 {t}', s['Bullet']))
def note(t): story.append(Paragraph(f'<b>Nota:</b> {t}', s['Note']))
def gap(h=0.3): story.append(Spacer(1, h*cm))

# ── 1. REQUISITOS ──
h1('1. Requisitos Previos')
p('Antes de iniciar el proceso de despliegue, asegurese de contar con las siguientes herramientas y cuentas configuradas en su equipo de desarrollo:')
gap()
bullet('<b>Git</b> instalado (version 2.40 o superior) para gestionar el repositorio y sincronizar con GitHub.')
bullet('<b>GitHub</b>: una cuenta activa con acceso a crear repositorios privados o publicos.')
bullet('<b>Docker</b> instalado (version 24 o superior) para construir y probar la imagen localmente.')
bullet('<b>Docker Compose</b> (incluido con Docker Desktop o instalable por separado en Linux).')
bullet('<b>Cuenta en xcloud.host</b>: servicio de alojamiento colombiano que soporta despliegue desde repositorios GitHub con Docker.')
bullet('<b>Node.js 20+</b> y <b>Bun</b> (opcional, solo para desarrollo local).')
gap()
note('xcloud.host permite conectar un repositorio GitHub y desplegar automaticamente usando un Dockerfile. No necesita servidor propio ni configuracion SSH compleja.')

# ── 2. ESTRUCTURA DEL PROYECTO ──
h1('2. Estructura del Proyecto')
p('El repositorio de CopyDocs tiene la siguiente estructura de archivos relevantes para el despliegue:')
gap()
code('CopyDocs/
  Dockerfile              # Imagen Docker multi-stage para produccion
  docker-compose.yml      # Compose local con volumenes persistentes
  .env.example           # Plantilla de variables de entorno
  .gitignore             # Archivos excluidos de Git
  .dockerignore           # Archivos excluidos del contexto Docker
  prisma/
    schema.prisma        # Esquema de base de datos SQLite
    seed.ts             # Datos iniciales (usuario admin + demo)
  package.json           # Dependencias y scripts de Node.js
  next.config.ts         # Configuracion de Next.js (standalone)')
gap()
p('La aplicacion usa <b>Next.js 16</b> con <b>output: standalone</b>, lo que genera un servidor Node.js independiente optimizado para contenedores Docker. La base de datos es <b>SQLite</b>, ligera y sin configuracion adicional. Los archivos subidos por usuarios se almacenan en el directorio <b>uploads/</b>.')

# ── 3. CONFIGURACION DE VARIABLES ──
h1('3. Configuracion de Variables de Entorno')
p('Las variables de entorno controlan el comportamiento de la aplicacion en produccion. Copie el archivo plantilla y ajuste los valores:')
gap()
code('# Copiar la plantilla:
cp .env.example .env

# Editar .env con sus valores reales:
DATABASE_URL=file:./db/custom.db
ADMIN_SECRET=su-clave-secreta-aqui
FONT_REGULAR=/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf
FONT_BOLD=/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf')
gap()
h2('3.1 Variables disponibles')
table_data = [
    ['Variable', 'Requerida', 'Descripcion'],
    ['DATABASE_URL', 'Si', 'Ruta al archivo SQLite. En Docker usar file:/app/db/custom.db'],
    ['ADMIN_SECRET', 'Si', 'Clave secreta para endpoints de administracion (header x-admin-export)'],
    ['FONT_REGULAR', 'No', 'Ruta a fuente TTF para PDFs. Defecto: DejaVu Serif'],
    ['FONT_BOLD', 'No', 'Ruta a fuente TTF bold para PDFs. Defecto: DejaVu Serif Bold'],
]
t = Table(table_data, colWidths=[3*cm, 1.8*cm, W - 4.8*cm])
t.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), DARK),
    ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
    ('FONTNAME', (0, 0), (-1, 0), 'DejaVuBd'),
    ('FONTSIZE', (0, 0), (-1, 0), 8.5),
    ('BOTTOMPADDING', (0, 0), (-1, 0), 8),
    ('TOPPADDING', (0, 0), (-1, 0), 8),
    ('BACKGROUND', (0, 1), (-1, -1), LIGHT_BG),
    ('FONTNAME', (0, 1), (-1, -1), 'DejaVu'),
    ('FONTSIZE', (0, 1), (-1, -1), 8),
    ('GRID', (0, 0), (-1, -1), 0.5, BORDER_C),
    ('TOPPADDING', (0, 1), (-1, -1), 6),
    ('BOTTOMPADDING', (0, 1), (-1, -1), 6),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
]))
story.append(t)
gap()
note('En xcloud.host, las variables de entorno se configuran en el panel de la aplicacion, no en el archivo .env. El archivo .env.example es solo una referencia para el desarrollador.')

# ── 4. SUBIR A GITHUB ──
h1('4. Subir el Proyecto a GitHub')
h2('4.1 Inicializar repositorio local')
code('cd CopyDocs
git init
git add .
git commit -m "Release inicial de CopyDocs"')
gap()
h2('4.2 Crear repositorio en GitHub')
p('1. Ingrese a <b>github.com</b> y haga clic en <b>New repository</b>.')
p('2. Asigne un nombre (ej: <b>copydocs</b>), elija <b>Private</b> o <b>Public</b> segun su preferencia.')
p('3. <b>No</b> inicialice con README, .gitignore ni licencia (el proyecto ya los tiene).')
p('4. Haga clic en <b>Create repository</b>.')
gap()
h2('4.3 Conectar y subir')
code('git remote add origin https://github.com/USUARIO/copydocs.git
git branch -M main
git push -u origin main')
gap()
note('Reemplace USUARIO con su nombre de usuario de GitHub. Si usa autenticacion de dos factores, asegurese de generar un token personal (PAT) con permisos de repo y usarlo como contraseña.')

# ── 5. PRUEBA LOCAL CON DOCKER ──
h1('5. Prueba Local con Docker')
p('Antes de desplegar en produccion, pruebe la imagen Docker localmente para asegurar que todo funciona correctamente:')
gap()
code('# Construir la imagen (primera vez, tarda 3-5 minutos):
docker compose up --build')
gap()
p('Este comando construira la imagen Docker (descarga dependencias, compila Next.js, copia archivos estaticos) y luego iniciara el contenedor. En la primera ejecucion se creara la base de datos y se ejecutara el seed con los usuarios iniciales.')
gap()
h2('5.1 Verificar que funciona')
p('Abra su navegador en <b>http://localhost:3000</b>. Deberia ver la pagina de CopyDocs.')
gap()
bullet('Credenciales por defecto: <b>Usuario: 1038796568 / Clave: 1038796568</b> (rol: admin)')
bullet('Usuario demo: <b>demo / demo</b> (rol: client)')
gap()
h2('5.2 Detener y reiniciar')
code('# Detener:
docker compose down

# Reiniciar (sin reconstruir):
docker compose up -d

# Ver logs:
docker compose logs -f')
gap()
note('Los volumenes db-data y uploads-data persisten los datos entre reinicios del contenedor. Solo se pierden si ejecuta "docker compose down -v".')

# ── 6. DESPLIEGUE EN XCLOUD.HOST ──
h1('6. Despliegue en xcloud.host')
h2('6.1 Crear la aplicacion')
p('1. Ingrese a su cuenta en <b>xcloud.host</b>.')
p('2. Haga clic en <b>Crear nueva aplicacion</b> o <b>New App</b>.')
p('3. Seleccione <b>Docker</b> como tipo de despliegue.')
p('4. Conecte su repositorio de <b>GitHub</b> (autorice el acceso si es un repo privado).')
p('5. Seleccione la rama <b>main</b>.')
gap()
h2('6.2 Configurar el despliegue')
p('En el panel de configuracion de xcloud.host, ajuste los siguientes parametros:')
gap()
table_data2 = [
    ['Parametro', 'Valor Recomendado'],
    ['Image', 'Dockerfile (raiz del repo)'],
    ['Port / Expose', '3000'],
    ['DATABASE_URL', 'file:/app/db/custom.db'],
    ['ADMIN_SECRET', 'Su clave segura (cambiar la del .env.example)'],
    ['FONT_REGULAR', '/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf'],
    ['FONT_BOLD', '/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf'],
]
t2 = Table(table_data2, colWidths=[4.5*cm, W - 4.5*cm])
t2.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), DARK),
    ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
    ('FONTNAME', (0, 0), (-1, 0), 'DejaVuBd'),
    ('FONTSIZE', (0, 0), (-1, 0), 8.5),
    ('BOTTOMPADDING', (0, 0), (-1, 0), 8),
    ('TOPPADDING', (0, 0), (-1, 0), 8),
    ('BACKGROUND', (0, 1), (-1, -1), LIGHT_BG),
    ('FONTNAME', (0, 1), (-1, -1), 'DejaVu'),
    ('FONTSIZE', (0, 1), (-1, -1), 8),
    ('GRID', (0, 0), (-1, -1), 0.5, BORDER_C),
    ('TOPPADDING', (0, 1), (-1, -1), 6),
    ('BOTTOMPADDING', (0, 1), (-1, -1), 6),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
]))
story.append(t2)
gap()
h2('6.3 Volumenes persistentes (IMPORTANTE)')
p('Para que la base de datos y las imagenes subidas sobrevivan a reconstrucciones del contenedor, configure estos <b>volumenes</b> en xcloud.host:')
gap()
code('Volumen 1:
  Host Path: /var/data/copydocs/db
  Container Path: /app/db

Volumen 2:
  Host Path: /var/data/copydocs/uploads
  Container Path: /app/uploads')
gap()
note('Sin estos volumenes, cada vez que se reconstruya el contenedor se perderan los documentos generados, las publicaciones y las imagenes subidas. Configure estos volumenes ANTES del primer despliegue.')

h2('6.4 Desplegar')
p('Haga clic en <b>Deploy</b> o <b>Desplegar</b>. xcloud.host construira la imagen Docker usando el Dockerfile del repositorio y la iniciara. El proceso puede tardar entre 3 y 8 minutos la primera vez.')
gap()
p('Una vez desplegado, la aplicacion estara accesible en la URL que xcloud.host le asigne (ej: <b>https://copydocs.xcloud.host</b>).')

# ── 7. POST-DESPLIEGUE ──
h1('7. Post-Despliegue')
h2('7.1 Primeros pasos')
p('1. Acceda a la URL de su aplicacion.')
p('2. Ingrese con las credenciales del administrador (configuradas en el seed: 1038796568 / 1038796568).')
p('3. <b>Cambie la clave del administrador</b> inmediatamente por seguridad.')
p('4. Configure las plantillas de documentos en el panel de administracion.')
p('5. Cree entradas en la Base de Conocimiento para alimentar el Asistente de IA.')

h2('7.2 Configuracion de pasarelas de pago (opcional)')
p('Si planea integrar pagos, configure las variables de entorno adicionales en xcloud.host segun la pasarela elegida (ePayco, PayU, Wompi). Estas se agregan como variables de entorno en el panel de la aplicacion.')

h2('7.3 Copias de seguridad')
p('La base de datos SQLite se encuentra en el volumen persistente. Para respaldarla:')
code('# Acceder al contenedor:
docker exec -it copydocs-app-1 sh

# Copiar la base de datos:
cp /app/db/custom.db /app/db/custom-backup-$(date +%Y%m%d).db')
gap()
note('Alternativamente, si tiene acceso SSH al servidor de xcloud.host, puede copiar directamente desde la ruta del volumen host: /var/data/copydocs/db/')

# ── 8. SOLUCION DE PROBLEMAS ──
h1('8. Solucion de Problemas')
gap()
h2('Error: El contenedor no inicia')
bullet('Verifique los logs en el panel de xcloud.host.')
bullet('Asegurese de que las variables de entorno estan correctamente configuradas (especialmente DATABASE_URL).')
bullet('Si el error menciona "prisma", verifique que el schema.prisma y el node_modules esten copiados correctamente en la imagen.')
gap()
h2('Error: Base de datos no se crea')
bullet('Verifique que el volumen /app/db este montado correctamente.')
bullet('El contenedor necesita permisos de escritura en el directorio /app/db.')
bullet('Compruebe que DATABASE_URL apunte a /app/db/custom.db (ruta dentro del contenedor).')
gap()
h2('Error: Las fuentes no cargan (PDFs con texto ilegible)')
bullet('Asegurese de que las variables FONT_REGULAR y FONT_BOLD apunten a archivos .ttf validos.')
bullet('En Alpine (Docker), las fuentes DejaVu se instalan con: apk add font-dejavu')
bullet('Si las fuentes no existen, el sistema usara Helvetica como fallback (sin soporte completo para caracteres especiales en espanol).')
gap()
h2('Error: Las imagenes subidas no se muestran')
bullet('Las imagenes se almacenan en /app/uploads/ (dentro del contenedor).')
bullet('Se sirven dinamicamente via /api/uploads/nombre-archivo.')
bullet('Si falla la subida al servidor, las imagenes se insertan como base64 automaticamente.')
gap()
h2('Error: Perdida de datos al reconstruir')
bullet('Esto ocurre si los volumenes no estan configurados. Revise la seccion 6.3.')
bullet('Los volumenes de Docker son independientes de la imagen. Al reconstruir, la imagen se reemplaza pero los volumenes se mantienen.')

# ── Footer info ──
story.append(Spacer(1, 1*cm))
story.append(HRFlowable(width='100%', thickness=0.5, color=BORDER_C, spaceAfter=8))
story.append(Paragraph('CopyDocs - Guia de Instalacion y Despliegue v1.0', s['Footer']))
story.append(Paragraph('Generado por CopyDocs | Agosto 2025', s['Footer']))

# ── Build PDF ──
doc.build(story)
print(f'PDF generado: {OUT}')
print(f'Tamano: {os.path.getsize(OUT):,} bytes')
