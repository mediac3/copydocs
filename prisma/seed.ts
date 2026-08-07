import { db } from '../src/lib/db';
import { hash } from 'bcryptjs';

async function main() {
  console.log('Seeding database...');

  // 1. Users
  const adminPass = await hash('1038796568', 10);
  const demoPass = await hash('demo', 10);

  const admin = await db.user.upsert({
    where: { username: '1038796568' },
    update: {},
    create: {
      username: '1038796568',
      passwordHash: adminPass,
      name: 'Administrador',
      email: 'admin@lexdoc.co',
      phone: '3001234567',
      role: 'admin',
      status: 'active',
      subscriptionPlan: 'Premium',
      subscriptionEnd: new Date('2027-12-31'),
    },
  });

  const demo = await db.user.upsert({
    where: { username: 'demo' },
    update: {},
    create: {
      username: 'demo',
      passwordHash: demoPass,
      name: 'Cliente Demo',
      email: 'demo@lexdoc.co',
      phone: '3109876543',
      role: 'client',
      status: 'active',
      subscriptionPlan: 'Básico',
      subscriptionEnd: new Date('2027-06-30'),
    },
  });

  // 2. Subscription Plans
  const plans = [
    { name: 'Básico', price: 14900, currency: 'COP', interval: 'monthly', features: JSON.stringify(['5 documentos/mes', 'Plantillas básicas', 'Soporte por email', 'Descarga PDF']), maxDocuments: 5, isActive: true },
    { name: 'Profesional', price: 34900, currency: 'COP', interval: 'monthly', features: JSON.stringify(['25 documentos/mes', 'Todas las plantillas', 'Soporte prioritario', 'PDF y DOCX', 'Cláusulas personalizadas']), maxDocuments: 25, isActive: true },
    { name: 'Premium', price: 59900, currency: 'COP', interval: 'monthly', features: JSON.stringify(['Documentos ilimitados', 'Todas las plantillas', 'Soporte dedicado', 'PDF y DOCX', 'Biblioteca de cláusulas', 'Facturación electrónica DIAN', 'API access']), maxDocuments: 999, isActive: true },
  ];

  for (const p of plans) {
    await db.subscriptionPlan.upsert({
      where: { id: `plan-${p.name.toLowerCase()}` },
      update: {},
      create: { id: `plan-${p.name.toLowerCase()}`, ...p },
    });
  }

  // 3. Clauses
  const clausesData = [
    { id: 'cl-1', title: 'Cláusula de Confidencialidad', content: 'Las partes acuerdan mantener en estricta confidencialidad toda la información intercambiada en el marco de este contrato, incluyendo但不限于 información comercial, financiera, técnica y operativa. Esta obligación persistirá por un período de cinco (5) años contados a partir de la terminación del contrato. El incumplimiento de esta cláusula dará lugar a indemnización de perjuicios conforme al artículo 1613 del Código Civil Colombiano.', legalArea: 'General', category: 'Confidencialidad', isDefault: true },
    { id: 'cl-2', title: 'Cláusula de Jurisdicción', content: 'Para cualquier controversia que surja con ocasión de la celebración, ejecución o terminación del presente contrato, las partes se someten a la jurisdicción de los Jueces Civiles del Circuito de Bogotá D.C., renunciando expresamente a cualquier otro fuero o competencia que pudiere corresponderles por razón de domicilio presente o futuro. En caso de controversia, las partes intentarán primero una solución amigable conforme al artículo 15 de la Ley 1561 de 2012.', legalArea: 'General', category: 'Jurisdicción', isDefault: true },
    { id: 'cl-3', title: 'Cláusula de Fuerza Mayor', content: 'Ninguna de las partes será responsable por el incumplimiento de sus obligaciones cuando dicho incumplimiento sea causado por fuerza mayor o caso fortuito, conforme a lo dispuesto en los artículos 584 y siguientes del Código Civil Colombiano. Se entiende por fuerza mayor los eventos de naturaleza imprevista o inevitable que no puedan ser controlados por la parte afectada, incluyendo但不限于 desastres naturales, pandemias, conflictos armados, huelgas generales y disposiciones gubernamentales que impidan la ejecución del contrato.', legalArea: 'General', category: 'Fuerza Mayor', isDefault: true },
    { id: 'cl-4', title: 'Cláusula de Indemnidad', content: 'El contratista se compromete a mantener indemne al contratante contra cualquier reclamación, demanda, acción legal, pérdida, daño, costo y gasto (incluyendo honorarios razonables de abogados) que surja de o esté relacionado con el incumplimiento del contratista de sus obligaciones bajo este contrato, violación de derechos de terceros, o cualquier acto negligente o doloso del contratista en la ejecución del contrato.', legalArea: 'Contratos', category: 'Indemnidad', isDefault: false },
    { id: 'cl-5', title: 'Cláusula de No Competencia', content: 'Durante la vigencia del contrato y por un período de doce (12) meses contados a partir de su terminación, el contratista se obliga a no participar directa o indirectamente, en calidad de socio, accionista, empleado, consultor o en cualquier otra capacidad, en actividades empresariales que compitan directamente con el objeto del presente contrato dentro del territorio nacional colombiano. El incumplimiento de esta cláusula generará a favor del contratante el pago de una penalidad equivalente a seis (6) meses del valor del contrato.', legalArea: 'Laboral', category: 'No Competencia', isDefault: false },
    { id: 'cl-6', title: 'Cláusula de Propiedad Intelectual', content: 'Todas las creaciones, invenciones, diseños, obras, software y cualquier otro resultado tangible o intangible desarrollado en ejecución del presente contrato serán propiedad exclusiva del contratante, conforme a lo dispuesto en la Ley 23 de 1982, la Decisión Andina 351 de 1993 y el Código de Comercio Colombiano. El contratista cede expresamente y en forma gratuita todos los derechos de autor, derechos de propiedad industrial y cualquier otro derecho de propiedad intelectual sobre los trabajos realizados.', legalArea: 'Propiedad Intelectual', category: 'Propiedad', isDefault: false },
  ];

  for (const c of clausesData) {
    await db.clause.upsert({ where: { id: c.id }, update: {}, create: c });
  }

  // 4. Document Templates
  const templates = [
    {
      id: 'tpl-contrato-arrendamiento',
      name: 'Contrato de Arrendamiento',
      description: 'Contrato de arrendamiento de inmueble urbano conforme al Código Civil Colombiano. Incluye cláusulas sobre canon, duración, depósito, mantenimiento y terminación anticipada.',
      category: 'Contratos',
      subcategory: 'Inmobiliario',
      legalArea: 'Civil',
      audience: 'particulares',
      status: 'published',
      price: 0,
      estimatedQuestions: 15,
      estimatedMinutes: 8,
      rating: 4.8,
      ratingCount: 234,
      baseContent: `CONTRATO DE ARRENDAMIENTO

Entre los suscritos, a saber:

{{nombre_arrendador}}, mayor de edad, identificado(a) con {{tipo_documento_arrendador}} número {{numero_documento_arrendador}} de {{ciudad_expedicion_arrendador}}, quien en adelante se denominará EL ARRENDADOR, por una parte; y

{{nombre_arrendatario}}, mayor de edad, identificado(a) con {{tipo_documento_arrendatario}} número {{numero_documento_arrendatario}} de {{ciudad_expedicion_arrendatario}}, quien en adelante se denominará EL ARRENDATARIO, por la otra parte.

Las partes han convenido en celebrar el presente CONTRATO DE ARRENDAMIENTO, el cual se regirá por las siguientes cláusulas:

PRIMERA: OBJETO. EL ARRENDADOR entrega en arrendamiento a EL ARRENDATARIO el inmueble ubicado en {{direccion_inmueble}}, {{ciudad_inmueble}}, identificado con matrícula inmobiliaria número {{matricula_inmobiliaria}}.

SEGUNDA: CANON. EL ARRENDATARIO se obliga a pagar a EL ARRENDADOR un canon mensual de {{valor_canon}} pesos colombianos ($\{{valor_canon}} COP), pagaderos por anticipados dentro de los primeros cinco (5) días de cada mes.

TERCERA: DURACIÓN. El presente contrato tendrá una duración de {{duracion_contrato}} meses, contados a partir del {{fecha_inicio}} hasta el {{fecha_fin}}. Conforme al artículo 1984 del Código Civil, transcurrido este período, el contrato continuará por periodos iguales si ninguna de las partes lo da por terminado con preaviso mínimo de un (1) mes.

CUARTA: DEPÓSITO. EL ARRENDATARIO constituye a favor de EL ARRENDADOR un depósito en dinero equivalente a {{valor_deposito}} pesos colombianos, el cual será devuelto al finalizar el contrato, deduciendo cualquier daño o obligación pendiente.

QUINTA: DESTINO. El inmueble se destinará exclusivamente a {{destino_inmueble}}. EL ARRENDATARIO no podrá subarrendar ni ceder el contrato sin autorización escrita de EL ARRENDADOR (Art. 1986 C.C.).

SEXTA: MANTENIMIENTO. Conforme al artículo 2014 del Código Civil, EL ARRENDADOR está obligado a mantener el inmueble en buen estado. Las reparaciones menores causadas por el uso normal estarán a cargo de EL ARRENDATARIO.

SÉPTIMA: TERMINACIÓN ANTICIPADA. Cualquiera de las partes podrá dar por terminado el contrato en cualquier tiempo, dando preaviso escrito de al menos treinta (30) días. En caso de terminación anticipada por EL ARRENDATARIO, deberá pagar el canon correspondiente al mes de preaviso.

OCTAVA: ANEXOS. {{incluye_garantia === 'si' ? 'Se adjeta carta de garantía firmada por un tercero.' : 'Sin garantía adicional.'}}

Para constancia, las partes firman el presente contrato en la ciudad de {{ciudad_firma}}, a los {{dia_firma}} días del mes de {{mes_firma}} de {{anio_firma}}.

__________________________                    __________________________
EL ARRENDADOR                                EL ARRENDATARIO
{{nombre_arrendador}}                         {{nombre_arrendatario}}
C.C. {{numero_documento_arrendador}}         C.C. {{numero_documento_arrendatario}}`,
      wizardConfig: JSON.stringify({
        steps: [
          {
            title: 'Datos del Arrendador',
            fields: [
              { id: 'nombre_arrendador', label: 'Nombre completo', type: 'text', required: true, placeholder: 'Ej: Juan Pérez García' },
              { id: 'tipo_documento_arrendador', label: 'Tipo de documento', type: 'select', required: true, options: ['Cédula de Ciudadanía', 'Cédula de Extranjería', 'Pasaporte', 'NIT'] },
              { id: 'numero_documento_arrendador', label: 'Número de documento', type: 'text', required: true, placeholder: 'Ej: 1.234.567.890' },
              { id: 'ciudad_expedicion_arrendador', label: 'Ciudad de expedición', type: 'text', required: true, placeholder: 'Ej: Bogotá D.C.' },
            ],
          },
          {
            title: 'Datos del Arrendatario',
            fields: [
              { id: 'nombre_arrendatario', label: 'Nombre completo', type: 'text', required: true, placeholder: 'Ej: María López Rodríguez' },
              { id: 'tipo_documento_arrendatario', label: 'Tipo de documento', type: 'select', required: true, options: ['Cédula de Ciudadanía', 'Cédula de Extranjería', 'Pasaporte', 'NIT'] },
              { id: 'numero_documento_arrendatario', label: 'Número de documento', type: 'text', required: true, placeholder: 'Ej: 98.765.432.1' },
              { id: 'ciudad_expedicion_arrendatario', label: 'Ciudad de expedición', type: 'text', required: true, placeholder: 'Ej: Medellín' },
            ],
          },
          {
            title: 'Datos del Inmueble',
            fields: [
              { id: 'direccion_inmueble', label: 'Dirección del inmueble', type: 'text', required: true, placeholder: 'Ej: Calle 72 #10-34 Apt 501' },
              { id: 'ciudad_inmueble', label: 'Ciudad', type: 'text', required: true, placeholder: 'Ej: Bogotá D.C.' },
              { id: 'matricula_inmobiliaria', label: 'Matrícula inmobiliaria', type: 'text', required: false, placeholder: 'Ej: 001-123456' },
              { id: 'destino_inmueble', label: 'Destino del inmueble', type: 'select', required: true, options: ['Vivienda', 'Oficina', 'Comercio', 'Consultorio profesional', 'Bodega'] },
            ],
          },
          {
            title: 'Condiciones Financieras',
            fields: [
              { id: 'valor_canon', label: 'Valor del canon mensual (COP)', type: 'number', required: true, placeholder: 'Ej: 1500000' },
              { id: 'valor_deposito', label: 'Valor del depósito (COP)', type: 'number', required: true, placeholder: 'Ej: 3000000' },
              { id: 'duracion_contrato', label: 'Duración del contrato (meses)', type: 'number', required: true, placeholder: 'Ej: 12' },
            ],
          },
          {
            title: 'Fechas y Firma',
            fields: [
              { id: 'fecha_inicio', label: 'Fecha de inicio', type: 'date', required: true },
              { id: 'fecha_fin', label: 'Fecha de finalización', type: 'date', required: true },
              { id: 'ciudad_firma', label: 'Ciudad de firma', type: 'text', required: true, placeholder: 'Ej: Bogotá D.C.' },
              { id: 'dia_firma', label: 'Día de firma', type: 'number', required: true, placeholder: '7' },
              { id: 'mes_firma', label: 'Mes de firma', type: 'text', required: true, placeholder: 'Ej: agosto' },
              { id: 'anio_firma', label: 'Año de firma', type: 'number', required: true, placeholder: '2026' },
              { id: 'incluye_garantia', label: '¿Incluye garantía de un tercero?', type: 'select', required: true, options: ['si', 'no'] },
            ],
          },
        ],
      }),
    },
    {
      id: 'tpl-contrato-compraventa',
      name: 'Contrato de Compraventa',
      description: 'Contrato de compraventa de bien inmueble o mueble, con estipulaciones sobre precio, forma de pago, entrega y garantías conforme al Código Civil y Código de Comercio.',
      category: 'Contratos',
      subcategory: 'Comercial',
      legalArea: 'Civil',
      audience: 'particulares',
      status: 'published',
      price: 14900,
      estimatedQuestions: 18,
      estimatedMinutes: 10,
      rating: 4.7,
      ratingCount: 189,
      baseContent: `CONTRATO DE COMPRAVENTA

Entre los suscritos:

EL VENDEDOR: {{nombre_vendedor}}, identificado con {{tipo_doc_vendedor}} No. {{num_doc_vendedor}} de {{ciudad_doc_vendedor}}.

EL COMPRADOR: {{nombre_comprador}}, identificado con {{tipo_doc_comprador}} No. {{num_doc_comprador}} de {{ciudad_doc_comprador}}.

ARTÍCULO PRIMERO: El vendedor vende y el comprador compra el siguiente bien: {{descripcion_bien}}, por un precio de {{valor_venta}} COP ({{valor_letras}} pesos colombianos).

ARTÍCULO SEGUNDO: FORMA DE PAGO. {{forma_pago}}.

ARTÍCULO TERCERO: GARANTÍAS. El vendedor garantiza que el bien se encuentra libre de gravámenes, limitaciones y embargos. Se responsabiliza conforme al artículo 1858 del Código Civil por los vicios ocultos que afecten el bien.

En {{ciudad_firma}}, a los {{dia}} días del mes de {{mes}} de {{anio}}.

_________________________        _________________________
EL VENDEDOR                  EL COMPRADOR`,
      wizardConfig: JSON.stringify({
        steps: [
          {
            title: 'Datos del Vendedor',
            fields: [
              { id: 'nombre_vendedor', label: 'Nombre completo del vendedor', type: 'text', required: true, placeholder: 'Nombre del vendedor' },
              { id: 'tipo_doc_vendedor', label: 'Tipo de documento', type: 'select', required: true, options: ['Cédula de Ciudadanía', 'Cédula de Extranjería', 'NIT', 'Pasaporte'] },
              { id: 'num_doc_vendedor', label: 'Número de documento', type: 'text', required: true },
              { id: 'ciudad_doc_vendedor', label: 'Ciudad de expedición', type: 'text', required: true },
            ],
          },
          {
            title: 'Datos del Comprador',
            fields: [
              { id: 'nombre_comprador', label: 'Nombre completo del comprador', type: 'text', required: true, placeholder: 'Nombre del comprador' },
              { id: 'tipo_doc_comprador', label: 'Tipo de documento', type: 'select', required: true, options: ['Cédula de Ciudadanía', 'Cédula de Extranjería', 'NIT', 'Pasaporte'] },
              { id: 'num_doc_comprador', label: 'Número de documento', type: 'text', required: true },
              { id: 'ciudad_doc_comprador', label: 'Ciudad de expedición', type: 'text', required: true },
            ],
          },
          {
            title: 'Datos del Bien y Precio',
            fields: [
              { id: 'descripcion_bien', label: 'Descripción detallada del bien', type: 'textarea', required: true, placeholder: 'Describa el bien objeto de la compraventa' },
              { id: 'valor_venta', label: 'Valor de venta (COP)', type: 'number', required: true },
              { id: 'valor_letras', label: 'Valor en letras', type: 'text', required: true, placeholder: 'Ej: ciento cincuenta mil pesos' },
              { id: 'forma_pago', label: 'Forma de pago', type: 'textarea', required: true, placeholder: 'Describa cómo se realizará el pago' },
            ],
          },
          {
            title: 'Firma',
            fields: [
              { id: 'ciudad_firma', label: 'Ciudad de firma', type: 'text', required: true },
              { id: 'dia', label: 'Día', type: 'number', required: true },
              { id: 'mes', label: 'Mes', type: 'text', required: true },
              { id: 'anio', label: 'Año', type: 'number', required: true },
            ],
          },
        ],
      }),
    },
    {
      id: 'tpl-poder-especial',
      name: 'Poder Especial',
      description: 'Poder especial para representación judicial o extrajudicial, conforme al Código General del Proceso y el Código de Procedimiento Civil.',
      category: 'Poderes',
      subcategory: 'Judicial',
      legalArea: 'Procesal',
      audience: 'particulares',
      status: 'published',
      price: 0,
      estimatedQuestions: 10,
      estimatedMinutes: 5,
      rating: 4.9,
      ratingCount: 312,
      baseContent: `PODER ESPECIAL

Yo, {{nombre_poderdante}}, mayor de edad, identificado(a) con {{tipo_doc_poderdante}} número {{num_doc_poderdante}} de {{ciudad_doc_poderdante}}, en pleno uso de mis facultades mentales, confiero PODER ESPECIAL amplio y suficiente a {{nombre_apoderado}}, identificado(a) con {{tipo_doc_apoderado}} número {{num_doc_apoderado}} de {{ciudad_doc_apoderado}}, para que en mi nombre y representación actúe en los siguientes asuntos:

{{tipo_poder === 'judicial' ? 'Para representarme en todos los procesos judiciosos que se tramiten o deban tramitarse ante los Juzgados Civiles del Circuito de {{ciudad_juzgado}}, ante la Superintendencia de Sociedades, y en general ante cualquier autoridad judicial o administrativa. Podrá presentar demandas, contestarlas, interponer recursos, aportar pruebas, solicitarPractice pruebas, asistir a audiencias, conciliaciones y en general realizar todos los actos procesales necesarios.' : 'Para representarme en actos extrajudiciales ante Notarías, Cámaras de Comercio, entidades bancarias, registradurías, y cualquier persona natural o jurídica. Podrá firmar contratos, recibir dineros, otorgar recibos de pago y realizar cualquier acto de administración que sea necesario para el cumplimiento del encargo.'}}

El presente poder se otorga conforme a las disposiciones del Código General del Proceso (Ley 1564 de 2012) y podrá ser revocado en cualquier momento mediante comunicación escrita.

Otorgado en {{ciudad_firma_pe}}, a los {{dia_pe}} días del mes de {{mes_pe}} de {{anio_pe}}.

_________________________
EL PODERDANTE
{{nombre_poderdante}}`,
      wizardConfig: JSON.stringify({
        steps: [
          {
            title: 'Datos del Poderdante',
            fields: [
              { id: 'nombre_poderdante', label: 'Nombre completo del poderdante', type: 'text', required: true },
              { id: 'tipo_doc_poderdante', label: 'Tipo de documento', type: 'select', required: true, options: ['Cédula de Ciudadanía', 'Cédula de Extranjería', 'Pasaporte'] },
              { id: 'num_doc_poderdante', label: 'Número de documento', type: 'text', required: true },
              { id: 'ciudad_doc_poderdante', label: 'Ciudad de expedición', type: 'text', required: true },
            ],
          },
          {
            title: 'Datos del Apoderado',
            fields: [
              { id: 'nombre_apoderado', label: 'Nombre completo del apoderado', type: 'text', required: true },
              { id: 'tipo_doc_apoderado', label: 'Tipo de documento', type: 'select', required: true, options: ['Cédula de Ciudadanía', 'Tarjeta Profesional', 'Cédula de Extranjería'] },
              { id: 'num_doc_apoderado', label: 'Número de documento/tarjeta profesional', type: 'text', required: true },
              { id: 'ciudad_doc_apoderado', label: 'Ciudad de expedición', type: 'text', required: true },
            ],
          },
          {
            title: 'Tipo de Poder',
            fields: [
              { id: 'tipo_poder', label: 'Tipo de poder', type: 'select', required: true, options: ['judicial', 'extrajudicial'] },
              { id: 'ciudad_juzgado', label: 'Ciudad del juzgado (si es judicial)', type: 'text', required: false, showWhen: { field: 'tipo_poder', value: 'judicial' } },
            ],
          },
          {
            title: 'Firma',
            fields: [
              { id: 'ciudad_firma_pe', label: 'Ciudad de firma', type: 'text', required: true },
              { id: 'dia_pe', label: 'Día', type: 'number', required: true },
              { id: 'mes_pe', label: 'Mes', type: 'text', required: true },
              { id: 'anio_pe', label: 'Año', type: 'number', required: true },
            ],
          },
        ],
      }),
    },
    {
      id: 'tpl-derecho-peticion',
      name: 'Derecho de Petición',
      description: 'Derecho de petición de información o documentos conforme al artículo 23 de la Constitución Política y la Ley 1755 de 2015. Incluye términos de respuesta conforme al Código de Procedimiento Administrativo.',
      category: 'Peticios',
      subcategory: 'Administrativo',
      legalArea: 'Administrativo',
      audience: 'particulares',
      status: 'published',
      price: 0,
      estimatedQuestions: 8,
      estimatedMinutes: 4,
      rating: 4.6,
      ratingCount: 421,
      baseContent: `DERECHO DE PETICIÓN

{{ciudad_firma_dp}}, {{dia_dp}} de {{mes_dp}} de {{anio_dp}}

Señores
{{entidad_destinataria}}
{{ciudad_entidad}}

Ref: Derecho de Petición {{tipo_peticion === 'informacion' ? 'de Información' : tipo_peticion === 'documentos' ? 'de Documentos' : 'General'}}

{{nombre_peticionario}}, identificado(a) con {{tipo_doc_peticionario}} número {{num_doc_peticionario}} de {{ciudad_doc_peticionario}}, actuando en calidad de {{calidad_peticionario}}, respetuosamente me dirijo a ustedes para presentar el siguiente:

PETICIÓN

Con fundamento en el artículo 23 de la Constitución Política de Colombia, en concordancia con los artículos 14 a 24 de la Ley 1755 de 2015 (Código de Procedimiento Administrativo y de lo Contencioso Administrativo), vine a solicitar respetuosamente lo siguiente:

{{contenido_peticion}}

{{tipo_peticion === 'informacion' ? 'La anterior petición de información deberá ser resuelta dentro de los diez (10) días hábiles siguientes a su recibo, conforme al artículo 15 de la Ley 1755 de 2015.' : tipo_peticion === 'documentos' ? 'La anterior petición de documentos deberá ser resuelta dentro de los quince (15) días hábiles siguientes a su recibo, conforme al artículo 25 de la Ley 1755 de 2015.' : 'La anterior petición deberá ser resuelta dentro de los quince (15) días hábiles siguientes a su recibo.'}}

De no obtener respuesta en el término señalado, me reservo el derecho de acudir ante la Jurisdicción de lo Contencioso Administrativo para hacer efectivo el derecho fundamental de petición.

Atentamente,

_________________________
{{nombre_peticionario}}
C.C. {{num_doc_peticionario}}
{{direccion_peticionario}}
Tel: {{telefono_peticionario}}
Email: {{email_peticionario}}`,
      wizardConfig: JSON.stringify({
        steps: [
          {
            title: 'Datos del Peticionario',
            fields: [
              { id: 'nombre_peticionario', label: 'Nombre completo', type: 'text', required: true },
              { id: 'tipo_doc_peticionario', label: 'Tipo de documento', type: 'select', required: true, options: ['Cédula de Ciudadanía', 'Cédula de Extranjería', 'NIT', 'Pasaporte'] },
              { id: 'num_doc_peticionario', label: 'Número de documento', type: 'text', required: true },
              { id: 'ciudad_doc_peticionario', label: 'Ciudad de expedición', type: 'text', required: true },
              { id: 'calidad_peticionario', label: 'Calidad en que actúa', type: 'text', required: true, placeholder: 'Ej: ciudadano, estudiante, profesional, representante legal' },
              { id: 'direccion_peticionario', label: 'Dirección de notificación', type: 'text', required: true },
              { id: 'telefono_peticionario', label: 'Teléfono', type: 'text', required: true },
              { id: 'email_peticionario', label: 'Correo electrónico', type: 'text', required: true },
            ],
          },
          {
            title: 'Datos de la Entidad',
            fields: [
              { id: 'entidad_destinataria', label: 'Entidad destinataria', type: 'text', required: true, placeholder: 'Ej: Ministerio de Educación Nacional' },
              { id: 'ciudad_entidad', label: 'Ciudad de la entidad', type: 'text', required: true },
            ],
          },
          {
            title: 'Contenido de la Petición',
            fields: [
              { id: 'tipo_peticion', label: 'Tipo de petición', type: 'select', required: true, options: ['informacion', 'documentos', 'general'] },
              { id: 'contenido_peticion', label: 'Contenido de la petición', type: 'textarea', required: true, placeholder: 'Describa detallamente lo que solicita' },
            ],
          },
          {
            title: 'Fecha y Lugar',
            fields: [
              { id: 'ciudad_firma_dp', label: 'Ciudad', type: 'text', required: true },
              { id: 'dia_dp', label: 'Día', type: 'number', required: true },
              { id: 'mes_dp', label: 'Mes', type: 'text', required: true },
              { id: 'anio_dp', label: 'Año', type: 'number', required: true },
            ],
          },
        ],
      }),
    },
    {
      id: 'tpl-acta-constitucion',
      name: 'Acta de Constitución de Empresa',
      description: 'Acta de constitución de sociedad comercial SAS (Sociedad por Acciones Simplificada) conforme a la Ley 1258 de 2008 y el Código de Comercio.',
      category: 'Societario',
      subcategory: 'Constitución',
      legalArea: 'Comercial',
      audience: 'empresas',
      status: 'published',
      price: 24900,
      estimatedQuestions: 20,
      estimatedMinutes: 12,
      rating: 4.9,
      ratingCount: 156,
      baseContent: `ACTA DE CONSTITUCIÓN - SOCIEDAD POR ACCIONES SIMPLIFICADA (SAS)

En la ciudad de {{ciudad_constitucion}}, a los {{dia_const}} días del mes de {{mes_const}} de {{anio_const}}, se reunieron los siguientes socios fundadores:

{{lista_socios}}

Quienes, en uso de su libre voluntad y con plena capacidad jurídica, deciden constituir una Sociedad por Acciones Simplificada (SAS), conforme a la Ley 1258 de 2008 y las disposiciones del Código de Comercio, bajo las siguientes estipulaciones:

ARTÍCULO PRIMERO: DENOMINACIÓN SOCIAL. La sociedad se denominará "{{nombre_empresa}} SAS", y se regirá por las disposiciones de la Ley 1258 de 2008, el Código de Comercio y los presentes estatutos.

ARTÍCULO SEGUNDO: DOMICILIO. El domicilio principal de la sociedad será la ciudad de {{ciudad_empresa}}. Podrá establecer sucursales y agencias en cualquier lugar del territorio nacional o del exterior.

ARTÍCULO TERCERO: OBJETO SOCIAL. {{objeto_social}}

ARTÍCULO CUARTO: CAPITAL. El capital autorizado de la sociedad será de {{capital_social}} COP ({{capital_letras}} pesos colombianos), dividido en acciones de valor nominal de {{valor_accion}} COP cada una. El capital será suscrito y pagado así: {{distribucion_capital}}.

ARTÍCULO QUINTO: DURACIÓN. La sociedad tendrá una duración de {{duracion_empresa}} años contados a partir de la fecha de inscripción en la Cámara de Comercio.

ARTÍCULO SEXTO: ADMINISTRACIÓN. La administración de la sociedad estará a cargo de {{tipo_administracion}}. {{detalles_administracion}}

Las facultades del representante legal serán amplias para administrar y disponer de los bienes de la sociedad, conforme al artículo 202 del Código de Comercio.

En constancia de lo anterior, los socios fundadores firman el presente acta.

{{firmas_socios}}`,
      wizardConfig: JSON.stringify({
        steps: [
          {
            title: 'Datos de la Empresa',
            fields: [
              { id: 'nombre_empresa', label: 'Nombre de la empresa', type: 'text', required: true, placeholder: 'Ej: Soluciones Tecnológicas SAS' },
              { id: 'ciudad_empresa', label: 'Ciudad principal', type: 'text', required: true },
              { id: 'objeto_social', label: 'Objeto social', type: 'textarea', required: true, placeholder: 'Describa las actividades principales de la empresa' },
              { id: 'duracion_empresa', label: 'Duración (años)', type: 'number', required: true, placeholder: '99' },
            ],
          },
          {
            title: 'Capital Social',
            fields: [
              { id: 'capital_social', label: 'Capital total (COP)', type: 'number', required: true },
              { id: 'capital_letras', label: 'Capital en letras', type: 'text', required: true },
              { id: 'valor_accion', label: 'Valor nominal por acción (COP)', type: 'number', required: true },
              { id: 'distribucion_capital', label: 'Distribución del capital entre socios', type: 'textarea', required: true, placeholder: 'Ej: Socio A: 60% - Socio B: 40%' },
            ],
          },
          {
            title: 'Administración',
            fields: [
              { id: 'tipo_administracion', label: 'Tipo de administración', type: 'select', required: true, options: ['Un representante legal', 'Junta directiva', 'Consejo de administración'] },
              { id: 'detalles_administracion', label: 'Detalles adicionales de administración', type: 'textarea', required: false },
            ],
          },
          {
            title: 'Socios y Firma',
            fields: [
              { id: 'lista_socios', label: 'Lista de socios (nombre, documento, aportes)', type: 'textarea', required: true, placeholder: '1. Juan Pérez - C.C. 1234 - Aporte: $10.000.000' },
              { id: 'ciudad_constitucion', label: 'Ciudad de constitución', type: 'text', required: true },
              { id: 'dia_const', label: 'Día', type: 'number', required: true },
              { id: 'mes_const', label: 'Mes', type: 'text', required: true },
              { id: 'anio_const', label: 'Año', type: 'number', required: true },
              { id: 'firmas_socios', label: 'Nombres para firmas', type: 'textarea', required: true, placeholder: 'Nombre completo de cada socio para las firmas' },
            ],
          },
        ],
      }),
    },
    {
      id: 'tpl-demanda-restitucion',
      name: 'Demanda de Restitución de Inmueble',
      description: 'Demanda de restitución de inmueble arrendado por incumplimiento del arrendatario, conforme al Código General del Proceso (Ley 1564 de 2012).',
      category: 'Demands',
      subcategory: 'Civil',
      legalArea: 'Procesal',
      audience: 'abogados',
      status: 'published',
      price: 34900,
      estimatedQuestions: 22,
      estimatedMinutes: 15,
      rating: 4.5,
      ratingCount: 87,
      baseContent: `DEMANDA DE RESTITUCIÓN DE INMUEBLE

Señor(a)
JUEZ CIVIL DEL CIRCUITO DE {{ciudad_juzgado_restitucion}}

{{nombre_demandante}}, identificado(a) con {{tipo_doc_demandante}} No. {{num_doc_demandante}}, actuando en nombre propio, respetuosamente me dirijo a su despacho para interponer la siguiente:

DEMANDA DE RESTITUCIÓN DE INMUEBLE POR INCUMPLIMIENTO DEL CONTRATO DE ARRENDAMIENTO

contra

{{nombre_demandado}}, identificado(a) con {{tipo_doc_demandado}} No. {{num_doc_demandado}}

I. HECHOS

1. Mediante contrato de arrendamiento celebrado el {{fecha_contrato_arrendamiento}}, el demandante entregó en arrendamiento al demandado el inmueble ubicado en {{direccion_inmueble_restitucion}}, {{ciudad_inmueble_restitucion}}.

2. El canon mensual pactado fue de {{canon_restitucion}} COP, pagadero por anticipados dentro de los primeros cinco (5) días de cada mes.

3. El demandado ha incurrido en incumplimiento del contrato por las siguientes razones: {{motivos_incumplimiento}}.

II. FUNDAMENTOS DE DERECHO

Artículos 1984 y siguientes del Código Civil; artículos 373 y siguientes del Código General del Proceso (Ley 1564 de 2012); artículo 437 del CPC.

III. PRETENSIONES

1. Que se declare el incumplimiento del contrato de arrendamiento por parte del demandado.
2. Que se ordene la restitución del inmueble ubicado en {{direccion_inmueble_restitucion}}.
3. Que se condene al demandado al pago de los cánones adeudados y los perjuicios causados.

IV. ANEXOS

{{lista_anexos}}

Del señor Juez, atentamente,

_________________________
{{nombre_demandante}}
C.C. {{num_doc_demandante}}
T.P. No. {{tarjeta_profesional}}`,
      wizardConfig: JSON.stringify({
        steps: [
          { title: 'Datos del Juzgado', fields: [{ id: 'ciudad_juzgado_restitucion', label: 'Ciudad del juzgado', type: 'text', required: true }] },
          { title: 'Datos del Demandante', fields: [
            { id: 'nombre_demandante', label: 'Nombre completo', type: 'text', required: true },
            { id: 'tipo_doc_demandante', label: 'Tipo de documento', type: 'select', required: true, options: ['Cédula de Ciudadanía', 'Cédula de Extranjería'] },
            { id: 'num_doc_demandante', label: 'Número de documento', type: 'text', required: true },
            { id: 'tarjeta_profesional', label: 'Tarjeta profesional', type: 'text', required: true },
          ]},
          { title: 'Datos del Demandado', fields: [
            { id: 'nombre_demandado', label: 'Nombre completo', type: 'text', required: true },
            { id: 'tipo_doc_demandado', label: 'Tipo de documento', type: 'select', required: true, options: ['Cédula de Ciudadanía', 'NIT'] },
            { id: 'num_doc_demandado', label: 'Número de documento', type: 'text', required: true },
          ]},
          { title: 'Datos del Contrato', fields: [
            { id: 'fecha_contrato_arrendamiento', label: 'Fecha del contrato de arrendamiento', type: 'date', required: true },
            { id: 'direccion_inmueble_restitucion', label: 'Dirección del inmueble', type: 'text', required: true },
            { id: 'ciudad_inmueble_restitucion', label: 'Ciudad', type: 'text', required: true },
            { id: 'canon_restitucion', label: 'Canon mensual (COP)', type: 'number', required: true },
            { id: 'motivos_incumplimiento', label: 'Motivos de incumplimiento', type: 'textarea', required: true },
            { id: 'lista_anexos', label: 'Lista de anexos', type: 'textarea', required: true },
          ]},
        ],
      }),
    },
    {
      id: 'tpl-contrato-prestacion-servicios',
      name: 'Contrato de Prestación de Servicios',
      description: 'Contrato de prestación de servicios profesionales entre empresas o particulares, conforme al Código de Comercio y la legislación laboral colombiana.',
      category: 'Contratos',
      subcategory: 'Servicios',
      legalArea: 'Comercial',
      audience: 'empresas',
      status: 'published',
      price: 14900,
      estimatedQuestions: 16,
      estimatedMinutes: 9,
      rating: 4.7,
      ratingCount: 203,
      baseContent: `CONTRATO DE PRESTACIÓN DE SERVICIOS PROFESIONALES

Entre los suscritos, a saber:

LA CONTRATANTE: {{nombre_contratante}}, identificada con NIT {{nit_contratante}}, representada legalmente por {{rep_legal_contratante}}.

EL CONTRATISTA: {{nombre_contratista}}, identificado(a) con {{tipo_doc_contratista}} número {{num_doc_contratista}}.

Las partes han convenido en celebrar el presente CONTRATO DE PRESTACIÓN DE SERVICIOS PROFESIONALES, que se regirá por las siguientes cláusulas:

CLÁUSULA PRIMERA: OBJETO. EL CONTRATISTA se obliga a prestar sus servicios profesionales para {{objeto_servicio}}, de conformidad con las especificaciones y condiciones acordadas en el anexo técnico que hace parte integral del presente contrato.

CLÁUSULA SEGUNDA: VALOR. Por la prestación del servicio, LA CONTRATANTE pagará a EL CONTRATISTA la suma de {{valor_servicio}} COP ({{valor_servicio_letras}}), pagaderos así: {{forma_pago_servicio}}.

CLÁUSULA TERCERA: PLAZO. El contrato tendrá una vigencia desde el {{fecha_inicio_servicio}} hasta el {{fecha_fin_servicio}}.

CLÁUSULA CUARTA: INDEPENDENCIA. La relación entre las partes es de carácter independiente. EL CONTRATISTA actúa como profesional autónomo y no existe vínculo laboral alguno conforme al artículo 34 del Código Sustantivo del Trabajo. No hay subordinación, horario fijo ni dependencia económica que configure relación laboral.

CLÁUSULA QUINTA: CONFIDENCIALIDAD. EL CONTRATISTA se obliga a guardar estricta confidencialidad sobre toda la información a la que tenga acceso en razón del presente contrato.

CLÁUSULA SEXTA: PROPIEDAD INTELECTUAL. Todos los resultados, entregables y obras producidos en ejecución del contrato serán propiedad de LA CONTRATANTE.

En {{ciudad_firma_ps}}, a los {{dia_ps}} de {{mes_ps}} de {{anio_ps}}.

_________________________        _________________________
LA CONTRATANTE                EL CONTRATISTA
{{rep_legal_contratante}}       {{nombre_contratista}}`,
      wizardConfig: JSON.stringify({
        steps: [
          { title: 'Datos del Contratante', fields: [
            { id: 'nombre_contratante', label: 'Razón social', type: 'text', required: true },
            { id: 'nit_contratante', label: 'NIT', type: 'text', required: true },
            { id: 'rep_legal_contratante', label: 'Representante legal', type: 'text', required: true },
          ]},
          { title: 'Datos del Contratista', fields: [
            { id: 'nombre_contratista', label: 'Nombre completo', type: 'text', required: true },
            { id: 'tipo_doc_contratista', label: 'Tipo de documento', type: 'select', required: true, options: ['Cédula de Ciudadanía', 'Cédula de Extranjería', 'Pasaporte'] },
            { id: 'num_doc_contratista', label: 'Número de documento', type: 'text', required: true },
          ]},
          { title: 'Condiciones del Servicio', fields: [
            { id: 'objeto_servicio', label: 'Descripción del servicio', type: 'textarea', required: true },
            { id: 'valor_servicio', label: 'Valor total (COP)', type: 'number', required: true },
            { id: 'valor_servicio_letras', label: 'Valor en letras', type: 'text', required: true },
            { id: 'forma_pago_servicio', label: 'Forma de pago', type: 'textarea', required: true },
            { id: 'fecha_inicio_servicio', label: 'Fecha de inicio', type: 'date', required: true },
            { id: 'fecha_fin_servicio', label: 'Fecha de finalización', type: 'date', required: true },
          ]},
          { title: 'Firma', fields: [
            { id: 'ciudad_firma_ps', label: 'Ciudad', type: 'text', required: true },
            { id: 'dia_ps', label: 'Día', type: 'number', required: true },
            { id: 'mes_ps', label: 'Mes', type: 'text', required: true },
            { id: 'anio_ps', label: 'Año', type: 'number', required: true },
          ]},
        ],
      }),
    },
    {
      id: 'tpl-contrato-trabajo',
      name: 'Contrato Individual de Trabajo',
      description: 'Contrato individual de trabajo a término fijo conforme al Código Sustantivo del Trabajo y la Ley 1429 de 2010.',
      category: 'Laboral',
      subcategory: 'Contratación',
      legalArea: 'Laboral',
      audience: 'empresas',
      status: 'published',
      price: 0,
      estimatedQuestions: 18,
      estimatedMinutes: 10,
      rating: 4.8,
      ratingCount: 278,
      baseContent: `CONTRATO INDIVIDUAL DE TRABAJO A TÉRMINO FIJO

Entre los suscritos, a saber:

EL EMPLEADOR: {{nombre_empleador}}, identificado con NIT {{nit_empleador}}, representado por {{rep_legal_empleador}}.

EL TRABAJADOR: {{nombre_trabajador}}, identificado con C.C. {{num_doc_trabajador}} de {{ciudad_doc_trabajador}}.

CLÁUSULA PRIMERA: EL EMPLEADOR contrata los servicios de EL TRABAJADOR para desempeñar el cargo de {{cargo_trabajador}}, conforme a las siguientes condiciones:

CLÁUSULA SEGUNDA: SALARIO. EL EMPLEADOR pagará a EL TRABAJADOR un salario mensual de {{salario_trabajador}} COP, pagaderos quincenalmente o mensualmente en las fechas convenidas.

CLÁUSULA TERCERA: JORNADA. La jornada de trabajo será de {{jornada_laboral}}, conforme al artículo 157 del Código Sustantivo del Trabajo.

CLÁUSULA CUARTA: DURACIÓN. El contrato se celebra a término fijo de {{duracion_contrato_trabajo}} meses, contados a partir del {{fecha_inicio_trabajo}} hasta el {{fecha_fin_trabajo}}. De conformidad con el artículo 46 del CST, antes del vencimiento del término estipulado, las partes deberán pronunciarse sobre su prórroga.

CLÁUSULA QUINTA: PRUEBAS. Si se agreed una periodo de prueba, este será de {{periodo_prueba}} días conforme al artículo 76 del CST.

CLÁUSULA SEXTA: PRESTACIONES SOCIALES. EL EMPLEADOR reconocerá a EL TRABAJADOR todas las prestaciones sociales establecidas en la legislación laboral colombiana: auxilio de cesantía (Ley 1429 de 2010), intereses sobre cesantía, prima de servicios, vacaciones (15 días hábiles), aporte a seguridad social integral (salud, pensión, riesgos laborales) y aportes parafiscales (Sena, ICBF, Cajas de Compensación).

CLÁUSULA SÉPTIMA: CONFIDENCIALIDAD. EL TRABAJADOR se obliga a guardar reserva y confidencialidad sobre la información a la que tenga acceso.

En {{ciudad_firma_ct}}, a los {{dia_ct}} de {{mes_ct}} de {{anio_ct}}.

_________________________        _________________________
EL EMPLEADOR                EL TRABAJADOR
{{rep_legal_empleador}}       {{nombre_trabajador}}`,
      wizardConfig: JSON.stringify({
        steps: [
          { title: 'Datos del Empleador', fields: [
            { id: 'nombre_empleador', label: 'Razón social', type: 'text', required: true },
            { id: 'nit_empleador', label: 'NIT', type: 'text', required: true },
            { id: 'rep_legal_empleador', label: 'Representante legal', type: 'text', required: true },
          ]},
          { title: 'Datos del Trabajador', fields: [
            { id: 'nombre_trabajador', label: 'Nombre completo', type: 'text', required: true },
            { id: 'num_doc_trabajador', label: 'Cédula de Ciudadanía', type: 'text', required: true },
            { id: 'ciudad_doc_trabajador', label: 'Ciudad de expedición', type: 'text', required: true },
          ]},
          { title: 'Condiciones Laborales', fields: [
            { id: 'cargo_trabajador', label: 'Cargo', type: 'text', required: true },
            { id: 'salario_trabajador', label: 'Salario mensual (COP)', type: 'number', required: true },
            { id: 'jornada_laboral', label: 'Jornada de trabajo', type: 'select', required: true, options: ['8 horas diarias / 48 horas semanales', '6 horas diarias / 36 horas semanales', 'Otra (especificar)'] },
            { id: 'duracion_contrato_trabajo', label: 'Duración (meses)', type: 'number', required: true },
            { id: 'fecha_inicio_trabajo', label: 'Fecha de inicio', type: 'date', required: true },
            { id: 'fecha_fin_trabajo', label: 'Fecha de finalización', type: 'date', required: true },
            { id: 'periodo_prueba', label: 'Período de prueba (días, 0 si no aplica)', type: 'number', required: true },
          ]},
          { title: 'Firma', fields: [
            { id: 'ciudad_firma_ct', label: 'Ciudad', type: 'text', required: true },
            { id: 'dia_ct', label: 'Día', type: 'number', required: true },
            { id: 'mes_ct', label: 'Mes', type: 'text', required: true },
            { id: 'anio_ct', label: 'Año', type: 'number', required: true },
          ]},
        ],
      }),
    },
  ];

  for (const t of templates) {
    await db.documentTemplate.upsert({ where: { id: t.id }, update: {}, create: t });
  }

  // 5. Template-clause relations
  const clauseRelations = [
    { templateId: 'tpl-contrato-arrendamiento', clauseId: 'cl-1', sectionName: 'General', order: 1 },
    { templateId: 'tpl-contrato-arrendamiento', clauseId: 'cl-2', sectionName: 'General', order: 2 },
    { templateId: 'tpl-contrato-arrendamiento', clauseId: 'cl-3', sectionName: 'General', order: 3 },
    { templateId: 'tpl-contrato-compraventa', clauseId: 'cl-1', sectionName: 'General', order: 1 },
    { templateId: 'tpl-contrato-compraventa', clauseId: 'cl-2', sectionName: 'General', order: 2 },
    { templateId: 'tpl-contrato-prestacion-servicios', clauseId: 'cl-1', sectionName: 'Confidencialidad', order: 1 },
    { templateId: 'tpl-contrato-prestacion-servicios', clauseId: 'cl-6', sectionName: 'Propiedad Intelectual', order: 2 },
    { templateId: 'tpl-contrato-prestacion-servicios', clauseId: 'cl-2', sectionName: 'Jurisdicción', order: 3 },
  ];

  for (const r of clauseRelations) {
    await db.templateClause.upsert({
      where: { id: `tc-${r.templateId}-${r.clauseId}` },
      update: {},
      create: { id: `tc-${r.templateId}-${r.clauseId}`, ...r },
    });
  }

  // 6. Normativity
  const normativity = [
    { templateId: 'tpl-contrato-arrendamiento', lawName: 'Código Civil Colombiano', lawReference: 'Ley 57 de 1887', articleNumber: 'Arts. 1984-2014', description: 'Normas sobre arrendamiento de bienes inmuebles' },
    { templateId: 'tpl-contrato-arrendamiento', lawName: 'Ley 820 de 2003', lawReference: 'Ley 820 de 2003', articleNumber: 'Art. 1-10', description: 'Régimen de arrendamiento de vivienda urbana' },
    { templateId: 'tpl-contrato-compraventa', lawName: 'Código Civil Colombiano', lawReference: 'Ley 57 de 1887', articleNumber: 'Arts. 1858-1889', description: 'Obligaciones del vendedor por vicios ocultos' },
    { templateId: 'tpl-contrato-compraventa', lawName: 'Código de Comercio', lawReference: 'Ley 410 de 1971', articleNumber: 'Arts. 860-924', description: 'Normas sobre compraventa mercantil' },
    { templateId: 'tpl-poder-especial', lawName: 'Código General del Proceso', lawReference: 'Ley 1564 de 2012', articleNumber: 'Arts. 55-72', description: 'Apoderados judiciales y poderes' },
    { templateId: 'tpl-derecho-peticion', lawName: 'Constitución Política', lawReference: 'Constitución de 1991', articleNumber: 'Art. 23', description: 'Derecho fundamental de petición' },
    { templateId: 'tpl-derecho-peticion', lawName: 'Código Procedimiento Administrativo', lawReference: 'Ley 1755 de 2015', articleNumber: 'Arts. 14-25', description: 'Procedimiento para derechos de petición' },
    { templateId: 'tpl-acta-constitucion', lawName: 'Ley 1258 de 2008', lawReference: 'Ley 1258 de 2008', articleNumber: 'Arts. 1-45', description: 'Sociedades por Acciones Simplificada - SAS' },
    { templateId: 'tpl-acta-constitucion', lawName: 'Código de Comercio', lawReference: 'Ley 410 de 1971', articleNumber: 'Arts. 174-393', description: 'Constitución y registro de sociedades comerciales' },
    { templateId: 'tpl-demanda-restitucion', lawName: 'Código General del Proceso', lawReference: 'Ley 1564 de 2012', articleNumber: 'Arts. 373-396', description: 'Proceso de restitución de inmueble arrendado' },
    { templateId: 'tpl-contrato-trabajo', lawName: 'Código Sustantivo del Trabajo', lawReference: 'Decreto 2663 de 1950', articleNumber: 'Arts. 22-158', description: 'Contrato individual de trabajo' },
    { templateId: 'tpl-contrato-trabajo', lawName: 'Ley 1429 de 2010', lawReference: 'Ley 1429 de 2010', articleNumber: 'Art. 1', description: 'Simplificación de cesantías' },
  ];

  for (const n of normativity) {
    await db.templateNormativity.upsert({
      where: { id: `tn-${n.templateId}-${n.articleNumber.replace(/[^a-zA-Z0-9]/g, '')}` },
      update: {},
      create: { id: `tn-${n.templateId}-${n.articleNumber.replace(/[^a-zA-Z0-9]/g, '')}`, ...n },
    });
  }

  // 7. Sample documents for demo user
  const sampleDocs = [
    { userId: demo.id, templateId: 'tpl-contrato-arrendamiento', title: 'Contrato Arrendamiento Apt 502', status: 'completed', answers: JSON.stringify({ nombre_arrendador: 'Carlos Mendoza', tipo_documento_arrendador: 'Cédula de Ciudadanía', numero_documento_arrendador: '79.123.456', ciudad_expedicion_arrendador: 'Bogotá D.C.', nombre_arrendatario: 'María López', tipo_documento_arrendatario: 'Cédula de Ciudadanía', numero_documento_arrendatario: '52.987.654', ciudad_expedicion_arrendatario: 'Bogotá D.C.', direccion_inmueble: 'Calle 100 #15-20 Apt 502', ciudad_inmueble: 'Bogotá D.C.', matricula_inmobiliaria: '001-456789', destino_inmueble: 'Vivienda', valor_canon: '1800000', valor_deposito: '3600000', duracion_contrato: '12', fecha_inicio: '2026-01-15', fecha_fin: '2027-01-14', ciudad_firma: 'Bogotá D.C.', dia_firma: '15', mes_firma: 'enero', anio_firma: '2026', incluye_garantia: 'no' }), generatedContent: 'CONTRATO DE ARRENDAMIENTO generado - Apt 502' },
    { userId: demo.id, templateId: 'tpl-derecho-peticion', title: 'Petición a Alcaldía de Medellín', status: 'draft', answers: JSON.stringify({ nombre_peticionario: 'María López', tipo_doc_peticionario: 'Cédula de Ciudadanía', num_doc_peticionario: '52.987.654', calidad_peticionario: 'ciudadana', ciudad_doc_peticionario: 'Medellín', entidad_destinataria: 'Alcaldía de Medellín', ciudad_entidad: 'Medellín', tipo_peticion: 'informacion', contenido_peticion: 'Solicito información sobre el estado del proyecto de construcción del parque del barrio Laureles.' }), generatedContent: null },
    { userId: demo.id, templateId: 'tpl-poder-especial', title: 'Poder Especial Judicial', status: 'completed', answers: JSON.stringify({ nombre_poderdante: 'Roberto Díaz', tipo_doc_poderdante: 'Cédula de Ciudadanía', num_doc_poderdante: '83.456.789', ciudad_doc_poderdante: 'Cali', nombre_apoderado: 'Dra. Ana Martínez', tipo_doc_apoderado: 'Tarjeta Profesional', num_doc_apoderado: 'T.P. 125.678', ciudad_doc_apoderado: 'Cali', tipo_poder: 'judicial', ciudad_juzgado: 'Cali', ciudad_firma_pe: 'Cali', dia_pe: '1', mes_pe: 'agosto', anio_firma: '2026' }), generatedContent: 'PODER ESPECIAL generado' },
  ];

  for (const d of sampleDocs) {
    await db.userDocument.upsert({
      where: { id: `doc-${d.templateId}-${d.userId}` },
      update: {},
      create: { id: `doc-${d.templateId}-${d.userId}`, ...d },
    });
  }

  // 8. Sample contacts for demo user
  const sampleContacts = [
    { userId: demo.id, name: 'Carlos Mendoza', contactType: 'natural', documentType: 'Cédula de Ciudadanía', documentNumber: '79.123.456', address: 'Cra 7 #72-41', city: 'Bogotá D.C.', phone: '3001112233', email: 'carlos@email.com' },
    { userId: demo.id, name: 'Dra. Ana Martínez', contactType: 'natural', documentType: 'Tarjeta Profesional', documentNumber: 'T.P. 125.678', city: 'Cali', phone: '3104445566', email: 'ana.martinez@abogada.co' },
    { userId: demo.id, name: 'Tech Solutions SAS', contactType: 'juridica', documentType: 'NIT', documentNumber: '901.234.567-8', address: 'Av. El Poblado #30-5', city: 'Medellín', phone: '6043217890', email: 'info@techsolutions.co', companyName: 'Tech Solutions SAS' },
  ];

  for (const c of sampleContacts) {
    await db.contact.upsert({
      where: { id: `contact-${demo.id}-${c.documentNumber.replace(/[^a-zA-Z0-9]/g, '')}` },
      update: {},
      create: { id: `contact-${demo.id}-${c.documentNumber.replace(/[^a-zA-Z0-9]/g, '')}`, ...c },
    });
  }

  // 9. Sample payments for demo user
  const samplePayments = [
    { userId: demo.id, amount: 14900, currency: 'COP', paymentMethod: 'Tarjeta de crédito', paymentGateway: 'ePayco', transactionRef: 'EP-2026-001234', status: 'approved', planName: 'Básico' },
    { userId: demo.id, amount: 14900, currency: 'COP', paymentMethod: 'Tarjeta de crédito', paymentGateway: 'ePayco', transactionRef: 'EP-2026-002345', status: 'approved', planName: 'Básico' },
  ];

  for (const p of samplePayments) {
    await db.payment.upsert({
      where: { id: `pay-${p.transactionRef}` },
      update: {},
      create: { id: `pay-${p.transactionRef}`, ...p },
    });
  }

  console.log('Database seeded successfully!');
  console.log('Users: admin (1038796568/1038796568), demo (demo/demo)');
}

main()
  .then(async () => { await db.$disconnect(); })
  .catch(async (e) => { console.error(e); await db.$disconnect(); process.exit(1); });
