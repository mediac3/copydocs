import { db } from '@/lib/db';
import { hash } from 'bcryptjs';

const TEMPLATES = [
  {
    name: 'Contrato de Arrendamiento de Vivienda Urbana',
    description: 'Contrato de arrendamiento para vivienda urbana conforme a la Ley 820 de 2003. Incluye cláusulas sobre canon, depósito, obligaciones del arrendatario y arrendador, y subarrendamiento.',
    category: 'Contratos',
    legalArea: 'Civil',
    audience: 'particulares',
    price: 0,
    estimatedQuestions: 18,
    estimatedMinutes: 10,
    rating: 4.7,
    ratingCount: 234,
    baseContent: `CONTRATO DE ARRENDAMIENTO DE VIVIENDA URBANA

Entre los suscritos, a saber:

ARRENDADOR: {{nombre_arrendador}}, mayor de edad, identificado(a) con {{tipo_doc_arrendador}} No. {{num_doc_arrendador}} de {{ciudad_doc_arrendador}}, domiciliado(a) en {{direccion_arrendador}}, {{ciudad_arrendador}}.

ARRENDATARIO: {{nombre_arrendatario}}, mayor de edad, identificado(a) con {{tipo_doc_arrendatario}} No. {{num_doc_arrendatario}} de {{ciudad_doc_arrendatario}}, domiciliado(a) en {{direccion_arrendatario}}, {{ciudad_arrendatario}}.

Las partes han convenido en celebrar el presente contrato de arrendamiento, el cual se rige por las siguientes cláusulas:

PRIMERA. OBJETO: El arrendador entrega en arrendamiento al arrendatario el inmueble ubicado en {{direccion_inmueble}}, {{ciudad_inmueble}}, identificado con matrícula inmobiliaria No. {{matricula_inmobiliaria}}.

SEGUNDA. CANON: El canon de arrendamiento será de {{valor_canon}} pesos colombianos (\${{valor_canon_numero}}) mensuales, los cuales deberán ser pagados dentro de los primeros cinco (5) días de cada mes.

TERCERA. DEPÓSITO: El arrendatario constituye un depósito en dinero equivalente a {{valor_deposito}} pesos colombianos, el cual será devuelto al terminarse el contrato, descontando los saldos que adeude.

CUARTA. DURACIÓN: El contrato tendrá una duración de {{duracion_contrato}} meses, contados a partir del {{fecha_inicio}} hasta el {{fecha_fin}}.

QUINTA. DESTINO: El inmueble se destinará exclusivamente a vivienda urbana.

SEXTA. {{clausula_fiador}}

SÉPTIMA. PROHIBICIONES: El arrendatario no podrá subarrendar ni ceder el contrato sin autorización escrita del arrendador.

OCTAVA. TERMINACIÓN ANTICIPADA: Cualquiera de las partes podrá dar por terminado el contrato con un preaviso de {{preaviso}} meses.

En señal de aceptación, las partes firman el presente contrato en la ciudad de {{ciudad_firma}}, a los {{dia_firma}} días del mes de {{mes_firma}} de {{anio_firma}}.

___________________________
ARRENDADOR

___________________________
ARRENDATARIO

{{firma_fiador}}`,
    wizardConfig: JSON.stringify({
      steps: [
        {
          title: 'Datos del Arrendador',
          fields: [
            { key: 'nombre_arrendador', label: 'Nombre completo del arrendador', type: 'text', tooltip: 'Persona o entidad que es propietaria del inmueble y lo entrega en arrendamiento.' },
            { key: 'tipo_doc_arrendador', label: 'Tipo de documento', type: 'select', options: ['Cédula de Ciudadanía', 'NIT', 'Cédula de Extranjería', 'Pasaporte'] },
            { key: 'num_doc_arrendador', label: 'Número de documento', type: 'text' },
            { key: 'ciudad_doc_arrendador', label: 'Ciudad de expedición del documento', type: 'text' },
            { key: 'direccion_arrendador', label: 'Dirección de domicilio', type: 'text' },
            { key: 'ciudad_arrendador', label: 'Ciudad de domicilio', type: 'text' }
          ]
        },
        {
          title: 'Datos del Arrendatario',
          fields: [
            { key: 'nombre_arrendatario', label: 'Nombre completo del arrendatario', type: 'text', tooltip: 'Persona que toma el inmueble en arrendamiento.' },
            { key: 'tipo_doc_arrendatario', label: 'Tipo de documento', type: 'select', options: ['Cédula de Ciudadanía', 'NIT', 'Cédula de Extranjería', 'Pasaporte'] },
            { key: 'num_doc_arrendatario', label: 'Número de documento', type: 'text' },
            { key: 'ciudad_doc_arrendatario', label: 'Ciudad de expedición del documento', type: 'text' },
            { key: 'direccion_arrendatario', label: 'Dirección de domicilio', type: 'text' },
            { key: 'ciudad_arrendatario', label: 'Ciudad de domicilio', type: 'text' }
          ]
        },
        {
          title: 'Datos del Inmueble',
          fields: [
            { key: 'direccion_inmueble', label: 'Dirección del inmueble', type: 'text' },
            { key: 'ciudad_inmueble', label: 'Ciudad del inmueble', type: 'text' },
            { key: 'matricula_inmobiliaria', label: 'Matrícula inmobiliaria', type: 'text', tooltip: 'Número de matrícula inmobiliaria del predio, disponible en el certificado de tradición y libertad.' }
          ]
        },
        {
          title: 'Condiciones del Contrato',
          fields: [
            { key: 'valor_canon', label: 'Valor del canon mensual (en letras)', type: 'text' },
            { key: 'valor_canon_numero', label: 'Valor del canon mensual (en números)', type: 'number' },
            { key: 'valor_deposito', label: 'Valor del depósito (en letras)', type: 'text' },
            { key: 'duracion_contrato', label: 'Duración del contrato (meses)', type: 'number' },
            { key: 'fecha_inicio', label: 'Fecha de inicio', type: 'date' },
            { key: 'fecha_fin', label: 'Fecha de finalización', type: 'date' },
            { key: 'preaviso', label: 'Meses de preaviso para terminación anticipada', type: 'number' }
          ]
        },
        {
          title: 'Fiador (Opcional)',
          fields: [
            { key: 'tiene_fiador', label: '¿Hay fiador?', type: 'boolean', tooltip: 'El fiador responde solidariamente por las obligaciones del arrendatario.' },
            { key: 'nombre_fiador', label: 'Nombre del fiador', type: 'text', condition: { field: 'tiene_fiador', value: true } },
            { key: 'tipo_doc_fiador', label: 'Tipo de documento del fiador', type: 'select', options: ['Cédula de Ciudadanía', 'NIT'], condition: { field: 'tiene_fiador', value: true } },
            { key: 'num_doc_fiador', label: 'Número de documento del fiador', type: 'text', condition: { field: 'tiene_fiador', value: true } },
            { key: 'direccion_fiador', label: 'Dirección del fiador', type: 'text', condition: { field: 'tiene_fiador', value: true } }
          ]
        },
        {
          title: 'Firma',
          fields: [
            { key: 'ciudad_firma', label: 'Ciudad de firma', type: 'text' },
            { key: 'dia_firma', label: 'Día de firma', type: 'number' },
            { key: 'mes_firma', label: 'Mes de firma', type: 'text' },
            { key: 'anio_firma', label: 'Año de firma', type: 'number' }
          ]
        }
      ]
    })
  },
  {
    name: 'Acta de Constitución de S.A.S.',
    description: 'Acta de constitución de Sociedad por Acciones Simplificada conforme a la Ley 1258 de 2008. Incluye estatutos sociales, objeto social, capital y estructura de la sociedad.',
    category: 'Actas',
    legalArea: 'Mercantil',
    audience: 'profesionales',
    price: 25000,
    estimatedQuestions: 25,
    estimatedMinutes: 15,
    rating: 4.9,
    ratingCount: 189,
    baseContent: `ACTA DE CONSTITUCIÓN DE SOCIEDAD POR ACCIONES SIMPLIFICADA

Reunidos en la ciudad de {{ciudad}}, a los {{dia}} días del mes de {{mes}} de {{anio}}, los señores:

{{lista_socios}}

Quienes actúan en calidad de constituyentes, con el fin de constituir una Sociedad por Acciones Simplificada (S.A.S.), de conformidad con la Ley 1258 de 2008 y el Código de Comercio.

Bajo las siguientes estipulaciones:

PRIMERA. DENOMINACIÓN SOCIAL: La sociedad se denominará "{{razon_social}} S.A.S."

SEGUNDA. DOMICILIO: El domicilio principal de la sociedad será la ciudad de {{ciudad_domicilio}}.

TERCERA. OBJETO SOCIAL: {{objeto_social}}

CUARTA. CAPITAL: El capital autorizado de la sociedad será de {{capital_social}} pesos colombianos, dividido en {{numero_acciones}} acciones de valor nominal de {{valor_nominal_accion}} pesos cada una.

QUINTA. DURACIÓN: La sociedad tendrá una duración de {{duracion}} años contados a partir de la fecha de inscripción en el Registro Mercantil.

SEXTA. ADMINISTRACIÓN: La sociedad será administrada por {{tipo_administracion}}.

SÉPTIMA. REPRESENTACIÓN LEGAL: El representante legal será {{representante_legal}}.

En constancia de lo anterior, los constituyentes firman el presente documento.

___________________________
{{firmas}}`,
    wizardConfig: JSON.stringify({
      steps: [
        {
          title: 'Datos Generales',
          fields: [
            { key: 'ciudad', label: 'Ciudad de constitución', type: 'text' },
            { key: 'dia', label: 'Día', type: 'number' },
            { key: 'mes', label: 'Mes', type: 'text' },
            { key: 'anio', label: 'Año', type: 'number' },
            { key: 'razon_social', label: 'Razón social', type: 'text', tooltip: 'Nombre que identificará a la sociedad. No debe coincidir con sociedades ya existentes.' }
          ]
        },
        {
          title: 'Socios',
          fields: [
            { key: 'lista_socios', label: 'Lista de socios (nombre, documento, aportes)', type: 'textarea', tooltip: 'Incluya nombre completo, tipo y número de documento, y el monto de su aporte para cada socio.' }
          ]
        },
        {
          title: 'Datos de la Sociedad',
          fields: [
            { key: 'ciudad_domicilio', label: 'Ciudad de domicilio', type: 'text' },
            { key: 'objeto_social', label: 'Objeto social', type: 'textarea', tooltip: 'Descripción de las actividades comerciales que realizará la sociedad.' },
            { key: 'capital_social', label: 'Capital social (en letras)', type: 'text' },
            { key: 'numero_acciones', label: 'Número total de acciones', type: 'number' },
            { key: 'valor_nominal_accion', label: 'Valor nominal por acción (en números)', type: 'number' },
            { key: 'duracion', label: 'Duración en años', type: 'number' }
          ]
        },
        {
          title: 'Administración',
          fields: [
            { key: 'tipo_administracion', label: 'Tipo de administración', type: 'select', options: ['Unipersonal (Un solo representante legal)', 'Junta Directiva', 'Consejo de Administración'] },
            { key: 'representante_legal', label: 'Nombre del representante legal', type: 'text' },
            { key: 'firmas', label: 'Nombres completos para firmas', type: 'textarea' }
          ]
        }
      ]
    })
  },
  {
    name: 'Derecho de Petición',
    description: 'Derecho de petición conforme al Artículo 23 de la Constitución Política y el Código de Procedimiento Administrativo y de lo Contencioso Administrativo (Ley 1437 de 2011).',
    category: 'Derechos de Petición',
    legalArea: 'Constitucional',
    audience: 'particulares',
    price: 0,
    estimatedQuestions: 12,
    estimatedMinutes: 5,
    rating: 4.5,
    ratingCount: 312,
    baseContent: `DERECHO DE PETICIÓN

{{ciudad}}, {{dia}} de {{mes}} de {{anio}}

Señor(a)
{{destinatario_cargo}}
{{destinatario_entidad}}
{{ciudad_entidad}}

Referencia: Derecho de petición de {{tipo_peticion}}

Respetado(a) señor(a) {{destinatario_nombre}}:

Yo, {{nombre_peticionario}}, identificado(a) con {{tipo_doc_peticionario}} No. {{num_doc_peticionario}} de {{ciudad_doc_peticionario}}, actuando en nombre propio{{representacion}}, me dirijo a usted respetuosamente para presentar el siguiente derecho de petición:

{{hechos}}

FUNDAMENTOS DE DERECHO

El presente derecho de petición se fundamenta en:
1. Artículo 23 de la Constitución Política de Colombia.
2. Artículos 14 y siguientes de la Ley 1437 de 2011 (Código de Procedimiento Administrativo y de lo Contencioso Administrativo).
3. {{otros_fundamentos}}

PETICIÓN

Con base en los hechos y fundamentos expuestos, respetuosamente solicito:

{{peticion_concreta}}

ANEXOS

{{anexos}}

Del señor(a)
{{destinatario_nombre}}
{{destinatario_cargo}}
{{destinatario_entidad}}

Atentamente,

___________________________
{{nombre_peticionario}}
{{tipo_doc_peticionario}} No. {{num_doc_peticionario}}
{{direccion_peticionario}}
{{telefono_peticionario}}
{{correo_peticionario}}`,
    wizardConfig: JSON.stringify({
      steps: [
        {
          title: 'Datos del Peticionario',
          fields: [
            { key: 'nombre_peticionario', label: 'Nombre completo', type: 'text' },
            { key: 'tipo_doc_peticionario', label: 'Tipo de documento', type: 'select', options: ['Cédula de Ciudadanía', 'Cédula de Extranjería', 'Pasaporte', 'NIT'] },
            { key: 'num_doc_peticionario', label: 'Número de documento', type: 'text' },
            { key: 'ciudad_doc_peticionario', label: 'Ciudad de expedición', type: 'text' },
            { key: 'direccion_peticionario', label: 'Dirección', type: 'text' },
            { key: 'telefono_peticionario', label: 'Teléfono', type: 'text' },
            { key: 'correo_peticionario', label: 'Correo electrónico', type: 'text' }
          ]
        },
        {
          title: 'Datos del Destinatario',
          fields: [
            { key: 'destinatario_nombre', label: 'Nombre del destinatario', type: 'text' },
            { key: 'destinatario_cargo', label: 'Cargo del destinatario', type: 'text' },
            { key: 'destinatario_entidad', label: 'Entidad', type: 'text' },
            { key: 'ciudad_entidad', label: 'Ciudad de la entidad', type: 'text' }
          ]
        },
        {
          title: 'Contenido de la Petición',
          fields: [
            { key: 'tipo_peticion', label: 'Tipo de petición', type: 'select', options: ['Información', 'Documentos', 'Copia', 'Consulta', 'Queja', 'Reclamo', 'Sugerencia'] },
            { key: 'representacion', label: '¿Actúa como representante de alguien?', type: 'boolean', tooltip: 'Marque sí si actúa en representación de un tercero.' },
            { key: 'datos_representado', label: 'Datos del representado', type: 'textarea', condition: { field: 'representacion', value: true } },
            { key: 'hechos', label: 'Hechos relevantes', type: 'textarea', tooltip: 'Describa los hechos que motivan la petición de forma clara y cronológica.' },
            { key: 'otros_fundamentos', label: 'Otros fundamentos normativos', type: 'textarea' },
            { key: 'peticion_concreta', label: 'Petición concreta', type: 'textarea', tooltip: 'Describa de forma clara lo que solicita.' },
            { key: 'anexos', label: 'Anexos (listar documentos adjuntos)', type: 'textarea' }
          ]
        },
        {
          title: 'Fecha y Lugar',
          fields: [
            { key: 'ciudad', label: 'Ciudad', type: 'text' },
            { key: 'dia', label: 'Día', type: 'number' },
            { key: 'mes', label: 'Mes', type: 'text' },
            { key: 'anio', label: 'Año', type: 'number' }
          ]
        }
      ]
    })
  },
  {
    name: 'Contrato de Prestación de Servicios',
    description: 'Contrato de prestación de servicios profesionales conforme al Código de Comercio y la Ley 1561 de 2012. Ideal para servicios profesionales, de consultoría y técnicos.',
    category: 'Contratos',
    legalArea: 'Mercantil',
    audience: 'profesionales',
    price: 15000,
    estimatedQuestions: 20,
    estimatedMinutes: 12,
    rating: 4.8,
    ratingCount: 456,
    baseContent: `CONTRATO DE PRESTACIÓN DE SERVICIOS

Entre los suscritos:

CONTRATANTE: {{nombre_contratante}}, identificado(a) con {{tipo_doc_contratante}} No. {{num_doc_contratante}}.

CONTRATISTA: {{nombre_contratista}}, identificado(a) con {{tipo_doc_contratista}} No. {{num_doc_contratista}}, matrícula profesional No. {{matricula_profesional}}.

Las partes han convenido en celebrar el presente contrato de prestación de servicios, que se regirá por las siguientes cláusulas:

PRIMERA. OBJETO: El contratista se obliga a prestar sus servicios profesionales para {{objeto_servicio}}.

SEGUNDA. OBLIGACIONES DEL CONTRATISTA: {{obligaciones_contratista}}

TERCERA. OBLIGACIONES DEL CONTRATANTE: {{obligaciones_contratante}}

CUARTA. HONORARIOS: El contratante pagará al contratista la suma de {{valor_honorarios}} pesos colombianos, pagaderos de la siguiente forma: {{forma_pago}}.

QUINTA. PLAZO: El contrato tendrá una duración de {{plazo}} contados a partir del {{fecha_inicio}} hasta el {{fecha_fin}}.

SEXTA. CONFIDENCIALIDAD: El contratista se obliga a mantener reserva sobre la información a la que tenga acceso.

SÉPTIMA. PROPIEDAD INTELECTUAL: {{propiedad_intelectual}}

En señal de aceptación, firman en {{ciudad_firma}} a los {{dia_firma}} días del mes de {{mes_firma}} de {{anio_firma}}.

___________________________
CONTRATANTE

___________________________
CONTRATISTA`,
    wizardConfig: JSON.stringify({
      steps: [
        {
          title: 'Datos del Contratante',
          fields: [
            { key: 'nombre_contratante', label: 'Nombre del contratante', type: 'text' },
            { key: 'tipo_doc_contratante', label: 'Tipo de documento', type: 'select', options: ['Cédula de Ciudadanía', 'NIT', 'Cédula de Extranjería'] },
            { key: 'num_doc_contratante', label: 'Número de documento', type: 'text' }
          ]
        },
        {
          title: 'Datos del Contratista',
          fields: [
            { key: 'nombre_contratista', label: 'Nombre del contratista', type: 'text' },
            { key: 'tipo_doc_contratista', label: 'Tipo de documento', type: 'select', options: ['Cédula de Ciudadanía', 'NIT', 'Cédula de Extranjería'] },
            { key: 'num_doc_contratista', label: 'Número de documento', type: 'text' },
            { key: 'matricula_profesional', label: 'Matrícula profesional (si aplica)', type: 'text' }
          ]
        },
        {
          title: 'Condiciones del Servicio',
          fields: [
            { key: 'objeto_servicio', label: 'Descripción del servicio a prestar', type: 'textarea', tooltip: 'Describa de forma detallada las actividades que realizará el contratista.' },
            { key: 'obligaciones_contratista', label: 'Obligaciones específicas del contratista', type: 'textarea' },
            { key: 'obligaciones_contratante', label: 'Obligaciones del contratante', type: 'textarea' },
            { key: 'valor_honorarios', label: 'Valor de los honorarios (en letras)', type: 'text' },
            { key: 'forma_pago', label: 'Forma de pago', type: 'textarea', tooltip: 'Describa las fechas y condiciones de pago.' },
            { key: 'plazo', label: 'Plazo de ejecución', type: 'text' },
            { key: 'fecha_inicio', label: 'Fecha de inicio', type: 'date' },
            { key: 'fecha_fin', label: 'Fecha de finalización', type: 'date' },
            { key: 'propiedad_intelectual', label: 'Condiciones de propiedad intelectual', type: 'textarea' }
          ]
        },
        {
          title: 'Firma',
          fields: [
            { key: 'ciudad_firma', label: 'Ciudad de firma', type: 'text' },
            { key: 'dia_firma', label: 'Día de firma', type: 'number' },
            { key: 'mes_firma', label: 'Mes de firma', type: 'text' },
            { key: 'anio_firma', label: 'Año de firma', type: 'number' }
          ]
        }
      ]
    })
  },
  {
    name: 'Contrato de Compraventa de Inmueble',
    description: 'Contrato de compraventa de bien inmueble conforme al Código Civil Colombiano. Incluye cláusulas sobre precio, forma de pago, entregas y garantías.',
    category: 'Contratos',
    legalArea: 'Civil',
    audience: 'particulares',
    price: 20000,
    estimatedQuestions: 22,
    estimatedMinutes: 14,
    rating: 4.6,
    ratingCount: 178,
    baseContent: `CONTRATO DE COMPRAVENTA DE BIEN INMUEBLE

Entre los suscritos:

VENDEDOR: {{nombre_vendedor}}, mayor de edad, identificado(a) con {{tipo_doc_vendedor}} No. {{num_doc_vendedor}} de {{ciudad_doc_vendedor}}.

COMPRADOR: {{nombre_comprador}}, mayor de edad, identificado(a) con {{tipo_doc_comprador}} No. {{num_doc_comprador}} de {{ciudad_doc_comprador}}.

Las partes han convenido en celebrar el presente contrato de compraventa, bajo las siguientes estipulaciones:

PRIMERA. OBJETO: El vendedor vende al comprador el inmueble ubicado en {{direccion_inmueble}}, {{ciudad_inmueble}}, matrícula inmobiliaria No. {{matricula_inmobiliaria}}.

SEGUNDA. PRECIO: El precio de la venta es de {{precio_venta}} pesos colombianos.

TERCERA. FORMA DE PAGO: {{forma_pago}}

CUARTA. ESTADO DEL INMUEBLE: El inmueble se entrega en el estado en que se encuentra, conocido por el comprador.

QUINTA. GASTOS E IMPUESTOS: Los gastos de escrituración e impuestos serán pagados por {{pago_gastos}}.

En señal de aceptación, firman en {{ciudad_firma}}.

___________________________
VENDEDOR

___________________________
COMPRADOR`,
    wizardConfig: JSON.stringify({
      steps: [
        { title: 'Datos del Vendedor', fields: [
          { key: 'nombre_vendedor', label: 'Nombre completo del vendedor', type: 'text' },
          { key: 'tipo_doc_vendedor', label: 'Tipo de documento', type: 'select', options: ['Cédula de Ciudadanía', 'NIT', 'Cédula de Extranjería'] },
          { key: 'num_doc_vendedor', label: 'Número de documento', type: 'text' },
          { key: 'ciudad_doc_vendedor', label: 'Ciudad de expedición', type: 'text' }
        ]},
        { title: 'Datos del Comprador', fields: [
          { key: 'nombre_comprador', label: 'Nombre completo del comprador', type: 'text' },
          { key: 'tipo_doc_comprador', label: 'Tipo de documento', type: 'select', options: ['Cédula de Ciudadanía', 'NIT', 'Cédula de Extranjería'] },
          { key: 'num_doc_comprador', label: 'Número de documento', type: 'text' },
          { key: 'ciudad_doc_comprador', label: 'Ciudad de expedición', type: 'text' }
        ]},
        { title: 'Datos del Inmueble y Precio', fields: [
          { key: 'direccion_inmueble', label: 'Dirección del inmueble', type: 'text' },
          { key: 'ciudad_inmueble', label: 'Ciudad del inmueble', type: 'text' },
          { key: 'matricula_inmobiliaria', label: 'Matrícula inmobiliaria', type: 'text' },
          { key: 'precio_venta', label: 'Precio de venta (en letras)', type: 'text' },
          { key: 'forma_pago', label: 'Forma de pago', type: 'textarea' },
          { key: 'pago_gastos', label: '¿Quién paga gastos e impuestos?', type: 'select', options: ['El comprador', 'El vendedor', 'Mitad y mitad'] }
        ]},
        { title: 'Firma', fields: [
          { key: 'ciudad_firma', label: 'Ciudad de firma', type: 'text' }
        ]}
      ]
    })
  },
  {
    name: 'Contrato de Préstamo de Dinero',
    description: 'Contrato de mutuo o préstamo de dinero entre particulares. Incluye cláusulas de interés, plazos de pago y garantías conforme al Código Civil.',
    category: 'Contratos',
    legalArea: 'Civil',
    audience: 'particulares',
    price: 0,
    estimatedQuestions: 14,
    estimatedMinutes: 7,
    rating: 4.4,
    ratingCount: 267,
    baseContent: `CONTRATO DE PRÉSTAMO DE DINERO (MUTUO)

Entre los suscritos:

PRESTAMISTA: {{nombre_prestamista}}, identificado(a) con {{tipo_doc_prestamista}} No. {{num_doc_prestamista}}.

DEUDOR: {{nombre_deudor}}, identificado(a) con {{tipo_doc_deudor}} No. {{num_doc_deudor}}.

CLÁUSULAS:

PRIMERA. EL PRÉSTAMO: El prestamista entrega al deudor la suma de {{valor_prestamo}} pesos colombianos.

SEGUNDA. INTERÉS: {{condicion_interes}}

TERCERA. PLAZO: El préstamo deberá ser pagado en un plazo máximo de {{plazo_pago}}.

CUARTA. FORMA DE PAGO: {{forma_pago}}

QUINTA. GARANTÍA: {{garantia}}

En constancia, firman en {{ciudad_firma}}.

___________________________
PRESTAMISTA

___________________________
DEUDOR`,
    wizardConfig: JSON.stringify({
      steps: [
        { title: 'Datos del Prestamista', fields: [
          { key: 'nombre_prestamista', label: 'Nombre completo', type: 'text' },
          { key: 'tipo_doc_prestamista', label: 'Tipo de documento', type: 'select', options: ['Cédula de Ciudadanía', 'NIT'] },
          { key: 'num_doc_prestamista', label: 'Número de documento', type: 'text' }
        ]},
        { title: 'Datos del Deudor', fields: [
          { key: 'nombre_deudor', label: 'Nombre completo', type: 'text' },
          { key: 'tipo_doc_deudor', label: 'Tipo de documento', type: 'select', options: ['Cédula de Ciudadanía', 'NIT'] },
          { key: 'num_doc_deudor', label: 'Número de documento', type: 'text' }
        ]},
        { title: 'Condiciones del Préstamo', fields: [
          { key: 'valor_prestamo', label: 'Monto del préstamo (en letras)', type: 'text' },
          { key: 'condicion_interes', label: 'Condiciones de interés', type: 'textarea', tooltip: 'Indique si el préstamo devenga intereses, la tasa y si está exento de usura.' },
          { key: 'plazo_pago', label: 'Plazo para el pago', type: 'text' },
          { key: 'forma_pago', label: 'Forma de pago', type: 'textarea' },
          { key: 'garantia', label: 'Garantía (si aplica)', type: 'textarea' }
        ]},
        { title: 'Firma', fields: [
          { key: 'ciudad_firma', label: 'Ciudad de firma', type: 'text' }
        ]}
      ]
    })
  },
  {
    name: 'Promesa de Compraventa de Inmueble',
    description: 'Contrato de promesa de compraventa de bien inmueble. Establece las condiciones bajo las cuales las partes se comprometen a celebrar la compraventa definitiva.',
    category: 'Contratos',
    legalArea: 'Civil',
    audience: 'particulares',
    price: 15000,
    estimatedQuestions: 20,
    estimatedMinutes: 12,
    rating: 4.5,
    ratingCount: 145,
    baseContent: `PROMESA DE COMPRAVENTA DE BIEN INMUEBLE

Entre los suscritos:

PROMITENTE VENDEDOR: {{nombre_vendedor}}, identificado(a) con {{tipo_doc_vendedor}} No. {{num_doc_vendedor}}.

PROMITENTE COMPRADOR: {{nombre_comprador}}, identificado(a) con {{tipo_doc_comprador}} No. {{num_doc_comprador}}.

CLÁUSULAS:

PRIMERA. OBJETO: Las partes se comprometen a celebrar un contrato de compraventa sobre el inmueble ubicado en {{direccion_inmueble}}, matrícula inmobiliaria No. {{matricula_inmobiliaria}}.

SEGUNDA. PRECIO: El precio pactado es de {{precio_venta}} pesos colombianos.

TERCERA. PLAZO: La firma de la escritura pública se realizará dentro de los {{plazo}} días hábiles siguientes.

CUARTA. CLÁUSULA PENAL: En caso de incumplimiento, el incumplido pagará una penalidad equivalente al {{penalidad}} del precio.

En señal de aceptación, firman en {{ciudad_firma}}.

___________________________
PROMITENTE VENDEDOR

___________________________
PROMITENTE COMPRADOR`,
    wizardConfig: JSON.stringify({
      steps: [
        { title: 'Datos del Promitente Vendedor', fields: [
          { key: 'nombre_vendedor', label: 'Nombre completo', type: 'text' },
          { key: 'tipo_doc_vendedor', label: 'Tipo de documento', type: 'select', options: ['Cédula de Ciudadanía', 'NIT'] },
          { key: 'num_doc_vendedor', label: 'Número de documento', type: 'text' }
        ]},
        { title: 'Datos del Promitente Comprador', fields: [
          { key: 'nombre_comprador', label: 'Nombre completo', type: 'text' },
          { key: 'tipo_doc_comprador', label: 'Tipo de documento', type: 'select', options: ['Cédula de Ciudadanía', 'NIT'] },
          { key: 'num_doc_comprador', label: 'Número de documento', type: 'text' }
        ]},
        { title: 'Datos del Inmueble', fields: [
          { key: 'direccion_inmueble', label: 'Dirección', type: 'text' },
          { key: 'matricula_inmobiliaria', label: 'Matrícula inmobiliaria', type: 'text' },
          { key: 'precio_venta', label: 'Precio pactado', type: 'text' },
          { key: 'plazo', label: 'Plazo en días hábiles para firma de escritura', type: 'number' },
          { key: 'penalidad', label: 'Porcentaje de penalidad por incumplimiento', type: 'text' }
        ]},
        { title: 'Firma', fields: [
          { key: 'ciudad_firma', label: 'Ciudad de firma', type: 'text' }
        ]}
      ]
    })
  },
  {
    name: 'Reglamento Interno de Trabajo',
    description: 'Reglamento interno de trabajo conforme al Código Sustantivo del Trabajo y la Ley 1429 de 2010. Obligatorio para empresas con más de 5 empleados.',
    category: 'Contratos',
    legalArea: 'Laboral',
    audience: 'profesionales',
    price: 30000,
    estimatedQuestions: 28,
    estimatedMinutes: 20,
    rating: 4.8,
    ratingCount: 98,
    baseContent: `REGLAMENTO INTERNO DE TRABAJO

{{razon_social}}

NIT: {{nit_empresa}}

CAPÍTULO I - DISPOSICIONES GENERALES

Artículo 1. El presente reglamento regula las condiciones de trabajo del personal de {{razon_social}}, conforme al Código Sustantivo del Trabajo.

Artículo 2. ÁMBITO DE APLICACIÓN: Este reglamento aplica a todos los trabajadores de la empresa.

CAPÍTULO II - CONDICIONES DE ADMISIÓN

Artículo 3. REQUISITOS: {{requisitos_admision}}

CAPÍTULO III - JORNADA DE TRABAJO

Artículo 4. La jornada de trabajo será de {{horario_trabajo}}.

CAPÍTULO IV - SALARIOS Y PRESTACIONES

Artículo 5. El sistema de remuneración será: {{sistema_salarios}}

CAPÍTULO V - VACACIONES Y LICENCIAS

Artículo 6. VACACIONES: Conforme al artículo 186 del C.S.T., los trabajadores tendrán derecho a 15 días hábiles de vacaciones por cada año de servicio.

CAPÍTULO VI - DISCIPLINA Y SANCIONES

Artículo 7. SANCIONES: {{sanciones}}

Dado en {{ciudad}}, a los {{dia}} de {{mes}} de {{anio}}.

___________________________
Representante Legal
{{razon_social}}`,
    wizardConfig: JSON.stringify({
      steps: [
        { title: 'Datos de la Empresa', fields: [
          { key: 'razon_social', label: 'Razón social', type: 'text' },
          { key: 'nit_empresa', label: 'NIT', type: 'text' },
          { key: 'ciudad', label: 'Ciudad', type: 'text' }
        ]},
        { title: 'Condiciones Laborales', fields: [
          { key: 'requisitos_admision', label: 'Requisitos de admisión', type: 'textarea' },
          { key: 'horario_trabajo', label: 'Horario de trabajo', type: 'textarea' },
          { key: 'sistema_salarios', label: 'Sistema de salarios', type: 'textarea' },
          { key: 'sanciones', label: 'Régimen disciplinario', type: 'textarea' }
        ]},
        { title: 'Fecha', fields: [
          { key: 'dia', label: 'Día', type: 'number' },
          { key: 'mes', label: 'Mes', type: 'text' },
          { key: 'anio', label: 'Año', type: 'number' }
        ]}
      ]
    })
  },
  {
    name: 'Contrato de Arrendamiento de Local Comercial',
    description: 'Contrato de arrendamiento para local comercial conforme a la Ley 820 de 2003. Incluye cláusulas sobre canon, uso comercial, mejoras y renovación.',
    category: 'Contratos',
    legalArea: 'Mercantil',
    audience: 'profesionales',
    price: 20000,
    estimatedQuestions: 20,
    estimatedMinutes: 12,
    rating: 4.6,
    ratingCount: 134,
    baseContent: `CONTRATO DE ARRENDAMIENTO DE LOCAL COMERCIAL

Entre los suscritos:

ARRENDADOR: {{nombre_arrendador}}, identificado(a) con {{tipo_doc_arrendador}} No. {{num_doc_arrendador}}.

ARRENDATARIO: {{nombre_arrendatario}}, identificado(a) con {{tipo_doc_arrendatario}} No. {{num_doc_arrendatario}}.

CLÁUSULAS:

PRIMERA. El arrendador entrega en arrendamiento el local comercial ubicado en {{direccion_inmueble}}, {{ciudad_inmueble}}.

SEGUNDA. CANON: El canon mensual será de {{valor_canon}} COP.

TERCERA. USO: El local se destinará a actividades comerciales de: {{uso_comercial}}.

CUARTA. DURACIÓN: {{duracion_contrato}} meses desde {{fecha_inicio}}.

QUINTA. MEJORAS: {{condiciones_mejoras}}

En señal de aceptación, firman en {{ciudad_firma}}.

___________________________
ARRENDADOR

___________________________
ARRENDATARIO`,
    wizardConfig: JSON.stringify({
      steps: [
        { title: 'Datos del Arrendador', fields: [
          { key: 'nombre_arrendador', label: 'Nombre completo', type: 'text' },
          { key: 'tipo_doc_arrendador', label: 'Tipo de documento', type: 'select', options: ['Cédula de Ciudadanía', 'NIT'] },
          { key: 'num_doc_arrendador', label: 'Número de documento', type: 'text' }
        ]},
        { title: 'Datos del Arrendatario', fields: [
          { key: 'nombre_arrendatario', label: 'Nombre completo', type: 'text' },
          { key: 'tipo_doc_arrendatario', label: 'Tipo de documento', type: 'select', options: ['Cédula de Ciudadanía', 'NIT'] },
          { key: 'num_doc_arrendatario', label: 'Número de documento', type: 'text' }
        ]},
        { title: 'Datos del Local y Condiciones', fields: [
          { key: 'direccion_inmueble', label: 'Dirección del local', type: 'text' },
          { key: 'ciudad_inmueble', label: 'Ciudad', type: 'text' },
          { key: 'valor_canon', label: 'Canon mensual (COP)', type: 'text' },
          { key: 'uso_comercial', label: 'Uso comercial', type: 'text' },
          { key: 'duracion_contrato', label: 'Duración (meses)', type: 'number' },
          { key: 'fecha_inicio', label: 'Fecha de inicio', type: 'date' },
          { key: 'condiciones_mejoras', label: 'Condiciones sobre mejoras', type: 'textarea' }
        ]},
        { title: 'Firma', fields: [
          { key: 'ciudad_firma', label: 'Ciudad de firma', type: 'text' }
        ]}
      ]
    })
  },
  {
    name: 'Cesión de Contrato de Arrendamiento',
    description: 'Contrato de cesión de derechos y obligaciones de un contrato de arrendamiento. Requiere consentimiento del arrendador conforme al Código Civil.',
    category: 'Contratos',
    legalArea: 'Civil',
    audience: 'particulares',
    price: 10000,
    estimatedQuestions: 15,
    estimatedMinutes: 8,
    rating: 4.3,
    ratingCount: 89,
    baseContent: `CONTRATO DE CESIÓN DE ARRENDAMIENTO

Entre los suscritos:

CEDENTE (Arrendatario original): {{nombre_cedente}}, identificado(a) con {{tipo_doc_cedente}} No. {{num_doc_cedente}}.

CESIONARIO (Nuevo arrendatario): {{nombre_cesionario}}, identificado(a) con {{tipo_doc_cesionario}} No. {{num_doc_cesionario}}.

ARRENDADOR: {{nombre_arrendador}}, identificado(a) con {{tipo_doc_arrendador}} No. {{num_doc_arrendador}}, quien acepta la cesión.

CLÁUSULAS:

PRIMERA. OBJETO: El cedente cede al cesionario todos sus derechos y obligaciones derivados del contrato de arrendamiento sobre el inmueble ubicado en {{direccion_inmueble}}.

SEGUNDA. ACEPTACIÓN: El arrendador acepta la cesión y reconoce al cesionario como nuevo arrendatario.

TERCERA. EFECTOS: A partir de la fecha de este documento, el cesionario asume todas las obligaciones del cedente.

En señal de aceptación, firman en {{ciudad_firma}}.

___________________________
CEDENTE

___________________________
CESIONARIO

___________________________
ARRENDADOR`,
    wizardConfig: JSON.stringify({
      steps: [
        { title: 'Datos del Cedente', fields: [
          { key: 'nombre_cedente', label: 'Nombre completo', type: 'text' },
          { key: 'tipo_doc_cedente', label: 'Tipo de documento', type: 'select', options: ['Cédula de Ciudadanía', 'NIT'] },
          { key: 'num_doc_cedente', label: 'Número de documento', type: 'text' }
        ]},
        { title: 'Datos del Cesionario', fields: [
          { key: 'nombre_cesionario', label: 'Nombre completo', type: 'text' },
          { key: 'tipo_doc_cesionario', label: 'Tipo de documento', type: 'select', options: ['Cédula de Ciudadanía', 'NIT'] },
          { key: 'num_doc_cesionario', label: 'Número de documento', type: 'text' }
        ]},
        { title: 'Datos del Arrendador e Inmueble', fields: [
          { key: 'nombre_arrendador', label: 'Nombre del arrendador', type: 'text' },
          { key: 'tipo_doc_arrendador', label: 'Tipo de documento', type: 'select', options: ['Cédula de Ciudadanía', 'NIT'] },
          { key: 'num_doc_arrendador', label: 'Número de documento', type: 'text' },
          { key: 'direccion_inmueble', label: 'Dirección del inmueble', type: 'text' }
        ]},
        { title: 'Firma', fields: [
          { key: 'ciudad_firma', label: 'Ciudad de firma', type: 'text' }
        ]}
      ]
    })
  }
];

const CLAUSES = [
  {
    title: 'Cláusula de No Competencia',
    content: 'El contratista se obliga a no prestar servicios similares, directa o indirectamente, a empresas competidores durante la vigencia del contrato y hasta {{meses_no_competencia}} meses después de su terminación.',
    legalArea: 'Mercantil',
    category: 'Confidencialidad',
    isDefault: false
  },
  {
    title: 'Cláusula de Confidencialidad',
    content: 'Las partes se comprometen a mantener estricta confidencialidad sobre toda la información intercambiada durante la ejecución del contrato, incluyendo datos comerciales, técnicos, financieros y estratégicos. Esta obligación persistirá por {{anos_confidencialidad}} años después de la terminación del contrato.',
    legalArea: 'General',
    category: 'Confidencialidad',
    isDefault: true
  },
  {
    title: 'Cláusula de Fuerza Mayor',
    content: 'Ninguna de las partes será responsable por el incumplimiento de sus obligaciones cuando este se deba a causas de fuerza mayor o caso fortuito, conforme al artículo 1.594 del Código Civil Colombiano.',
    legalArea: 'General',
    category: 'General',
    isDefault: true
  },
  {
    title: 'Cláusula de Solución de Controversias',
    content: 'Cualquier controversia derivada del presente contrato será resuelta en primer lugar mediante trámite de conciliación extrajudicial. Si no hubiere acuerdo, las partes se someten a la jurisdicción de los tribunales de {{ciudad_jurisdiccion}}.',
    legalArea: 'General',
    category: 'Resolución de Conflictos',
    isDefault: true
  },
  {
    title: 'Cláusula de Terminación Anticipada',
    content: 'Cualquiera de las partes podrá dar por terminado el presente contrato mediante notificación escrita con al menos {{dias_preaviso}} días de anticipación, sin necesidad de justificación alguna.',
    legalArea: 'General',
    category: 'Terminación',
    isDefault: false
  },
  {
    title: 'Cláusula de Indemnidad',
    content: 'El contratista se obliga a mantener indemne al contratante frente a cualquier reclamación, demanda o acción legal derivada del incumplimiento del contratista de sus obligaciones legales o contractuales.',
    legalArea: 'Mercantil',
    category: 'Protección',
    isDefault: false
  }
];

const NORMATIVITY = [
  { lawName: 'Código Civil Colombiano', lawReference: 'Ley 57 de 1887' },
  { lawName: 'Código de Comercio', lawReference: 'Decreto 410 de 1971' },
  { lawName: 'Código Sustantivo del Trabajo', lawReference: 'Decreto 2351 de 1965' },
  { lawName: 'Ley de Sociedades por Acciones Simplificada', lawReference: 'Ley 1258 de 2008' },
  { lawName: 'Ley de Arrendamiento de Vivienda Urbana', lawReference: 'Ley 820 de 2003' },
  { lawName: 'Código de Procedimiento Administrativo', lawReference: 'Ley 1437 de 2011' },
  { lawName: 'Estatuto de la Contratación Estatal', lawReference: 'Ley 1150 de 2007' },
  { lawName: 'Ley de Firma Electrónica', lawReference: 'Ley 527 de 1999' },
  { lawName: 'Ley de Víctimas y Restitución de Tierras', lawReference: 'Ley 1448 de 2011' },
  { lawName: 'Constitución Política de Colombia', lawReference: 'Constitución de 1991' },
  { lawName: 'Ley de Formalización y Generación de Empleo', lawReference: 'Ley 1429 de 2010' },
  { lawName: 'Estatuto del Consumidor', lawReference: 'Ley 1480 de 2011' }
];

export async function seedDatabase() {
  console.log('Seeding database...');

  const adminPassword = await hash('1038796568', 12);
  const demoPassword = await hash('demo', 12);

  const admin = await db.user.upsert({
    where: { username: '1038796568' },
    update: {},
    create: {
      username: '1038796568',
      passwordHash: adminPassword,
      name: 'Administrador Jurídico',
      email: 'admin@lexdoc.co',
      phone: '+57 310 1234567',
      role: 'admin',
      status: 'active',
      credits: 999
    }
  });

  const demo = await db.user.upsert({
    where: { username: 'demo' },
    update: {},
    create: {
      username: 'demo',
      passwordHash: demoPassword,
      name: 'Usuario Demo',
      email: 'demo@lexdoc.co',
      phone: '+57 300 9876543',
      role: 'client',
      status: 'active',
      credits: 10
    }
  });

  for (const clause of CLAUSES) {
    await db.clause.upsert({
      where: { id: `clause-${clause.title.toLowerCase().replace(/\s+/g, '-')}` },
      update: {},
      create: { id: `clause-${clause.title.toLowerCase().replace(/\s+/g, '-')}`, ...clause }
    });
  }

  // Plans system replaced with credits - skip plan seeding

  for (const template of TEMPLATES) {
    const created = await db.documentTemplate.upsert({
      where: { id: `template-${template.name.toLowerCase().replace(/\s+/g, '-').substring(0, 50)}` },
      update: {},
      create: { id: `template-${template.name.toLowerCase().replace(/\s+/g, '-').substring(0, 50)}`, ...template }
    });

    const applicableNorms = NORMATIVITY.filter(n => {
      if (template.legalArea === 'Civil') return ['Código Civil Colombiano', 'Constitución Política de Colombia'].includes(n.lawName);
      if (template.legalArea === 'Mercantil') return ['Código de Comercio', 'Ley de Sociedades por Acciones Simplificada', 'Ley de Firma Electrónica'].includes(n.lawName);
      if (template.legalArea === 'Laboral') return ['Código Sustantivo del Trabajo', 'Ley de Formalización y Generación de Empleo'].includes(n.lawName);
      if (template.legalArea === 'Constitucional') return ['Constitución Política de Colombia', 'Código de Procedimiento Administrativo', 'Estatuto del Consumidor'].includes(n.lawName);
      return true;
    });

    for (const norm of applicableNorms) {
      await db.templateNormativity.create({
        data: { templateId: created.id, ...norm }
      });
    }
  }

  const defaultClauses = await db.clause.findMany({ where: { isDefault: true } });
  const allTemplates = await db.documentTemplate.findMany();
  
  for (const template of allTemplates) {
    for (const clause of defaultClauses.slice(0, 2)) {
      await db.templateClause.create({
        data: { templateId: template.id, clauseId: clause.id, sectionName: 'Disposiciones Generales', order: 0 }
      });
    }
  }

  console.log('Database seeded successfully!');
  console.log('Admin:', admin.username);
  console.log('Demo:', demo.username);
}

seedDatabase().catch(console.error);
