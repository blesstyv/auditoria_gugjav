import { useRef, useState } from 'react'

import {
  FaBuilding,
  FaDatabase,
  FaCode,
  FaServer,
  FaFolderOpen,
  FaFire,
  FaLock,
  FaSyncAlt,
  FaRobot,
  FaShieldAlt,
  FaSearch,
  FaClipboardList,
  FaUniversity,
  FaFileAlt,
  FaCubes,
  FaExclamationTriangle,
  FaBullseye,
  FaCheckCircle,
  FaEye,
  FaTools,
  FaBookOpen,
  FaGithub,
} from 'react-icons/fa'

import MarkdownView from './components/MarkdownView'

import resumenMd from '../docs_gugjav/01_resumen_gugjav.md?raw'
import sqliMd from '../docs_gugjav/02_sqli_gugjav.md?raw'
import xssMd from '../docs_gugjav/03_xss_gugjav.md?raw'
import comandosMd from '../docs_gugjav/04_comandos_gugjav.md?raw'
import activosMd from '../docs_gugjav/05_activos_gugjav.md?raw'
import matrizMd from '../docs_gugjav/06_matriz_gugjav.md?raw'
import controlesMd from '../docs_gugjav/07_controles_gugjav.md?raw'
import recuperacionMd from '../docs_gugjav/08_recuperacion_gugjav.md?raw'
import promptsMd from '../docs_gugjav/09_prompts_gugjav.md?raw'

import './App.css'

const secciones = [
  {
    id: 'resumen',
    numero: '01',
    titulo: 'Resumen ejecutivo',
    subtitulo: 'Contexto general de la auditoría',
    tipo: 'gestion',
    nivel: 'Base',
    icono: FaBuilding,
    markdown: resumenMd,
    enfoque:
      'Presenta el objetivo, alcance y contexto general de la auditoría aplicada al portal de clientes de Inmobiliaria Terranova.',
    lectura:
      'Este apartado funciona como entrada ejecutiva del informe. Explica por qué se evalúa el portal, qué sistema se revisa, qué datos son críticos y bajo qué condiciones se realiza la auditoría. Permite comprender que el análisis no se limita a pruebas técnicas, sino a la protección de información sensible del negocio inmobiliario.',
    impacto:
      'Permite orientar la auditoría hacia la protección de contratos, datos financieros, credenciales y confianza de los clientes.',
    decision:
      'Usar este capítulo para presentar formalmente el trabajo antes de revisar vulnerabilidades específicas.',
    activos: ['Portal de clientes', 'Contratos', 'Datos financieros'],
    acciones: [
      'Definir el sistema evaluado.',
      'Establecer el alcance de la auditoría.',
      'Identificar los datos críticos del portal.',
      'Relacionar la auditoría con el riesgo del negocio inmobiliario.',
    ],
  },
  {
    id: 'sqli',
    numero: '02',
    titulo: 'Inyección SQL',
    subtitulo: 'Riesgo sobre base de datos',
    tipo: 'hallazgo',
    nivel: 'Crítico',
    icono: FaDatabase,
    markdown: sqliMd,
    evidencia: '/img_gugjav/sqli_gugjav.png',
    cvss: {
      version: 'CVSS v3.1',
      puntaje: '8.1',
      severidad: 'Alto',
      vector: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:L',
      lectura:
        'El vector considera explotación por red, baja complejidad, privilegios bajos, sin interacción del usuario y alto impacto sobre confidencialidad e integridad.',
    },
    enfoque:
      'Analiza cómo una entrada manipulada puede alterar consultas SQL y exponer información almacenada en la base de datos.',
    lectura:
      'Este hallazgo es uno de los más relevantes porque apunta directamente al núcleo de información del portal. En una inmobiliaria, la base de datos puede contener contratos, estados de pago, datos financieros, credenciales y registros personales de clientes.',
    impacto:
      'Puede permitir exposición, modificación o extracción de contratos, datos financieros, credenciales y registros de clientes.',
    decision:
      'Debe corregirse con prioridad crítica mediante consultas parametrizadas, validación de entradas y mínimo privilegio.',
    activos: ['Base de datos', 'Contratos', 'Datos financieros', 'Credenciales'],
    acciones: [
      'Implementar consultas parametrizadas.',
      'Eliminar concatenación directa de datos en consultas SQL.',
      'Validar entradas desde el servidor.',
      'Reducir privilegios de la cuenta conectada a la base de datos.',
      'Evitar mostrar errores técnicos al usuario final.',
    ],
  },
  {
    id: 'xss',
    numero: '03',
    titulo: 'XSS reflejado',
    subtitulo: 'Riesgo sobre sesión y navegador',
    tipo: 'hallazgo',
    nivel: 'Alto',
    icono: FaCode,
    markdown: xssMd,
    evidencia: '/img_gugjav/xss_gugjav.png',
    cvss: {
      version: 'CVSS v3.1',
      puntaje: '6.1',
      severidad: 'Medio',
      vector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N',
      lectura:
        'El vector considera explotación por red, baja complejidad, sin privilegios, pero requiere interacción del usuario. El alcance cambia porque afecta el navegador de la víctima.',
    },
    enfoque:
      'Evalúa el riesgo de ejecutar código en el navegador cuando la aplicación refleja entradas del usuario sin tratamiento seguro.',
    lectura:
      'Este apartado se centra en la relación entre el portal y sus usuarios. Aunque XSS no afecta directamente la base de datos como SQL Injection, puede comprometer la sesión del cliente, alterar mensajes visibles, generar engaños y afectar la confianza en el portal.',
    impacto:
      'Puede afectar sesiones, confianza del cliente, integridad visual del portal y seguridad de la interacción del usuario.',
    decision:
      'Debe tratarse con prioridad alta mediante codificación de salida, validación de entradas, protección de cookies y Content Security Policy.',
    activos: ['Sesión de usuario', 'Interfaz del portal', 'Confianza institucional'],
    acciones: [
      'Aplicar codificación de salida contextual.',
      'Validar campos reflejados en pantalla.',
      'Configurar Content Security Policy.',
      'Proteger cookies con HttpOnly, Secure y SameSite.',
      'Evitar insertar HTML dinámico sin sanitización.',
    ],
  },
  {
    id: 'comandos',
    numero: '04',
    titulo: 'Inyección de comandos',
    subtitulo: 'Riesgo sobre servidor',
    tipo: 'hallazgo',
    nivel: 'Crítico',
    icono: FaServer,
    markdown: comandosMd,
    evidencia: '/img_gugjav/comandos_gugjav.png',
    cvss: {
      version: 'CVSS v3.1',
      puntaje: '8.8',
      severidad: 'Alto',
      vector: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H',
      lectura:
        'El vector refleja explotación por red, baja complejidad, privilegios bajos, sin interacción del usuario y alto impacto sobre confidencialidad, integridad y disponibilidad.',
    },
    enfoque:
      'Analiza el riesgo de que entradas del usuario sean interpretadas como comandos del sistema operativo.',
    lectura:
      'Este hallazgo se enfoca en la infraestructura que sostiene el portal. A diferencia de XSS, que ocurre en el navegador, la Inyección de comandos puede afectar directamente el servidor, sus archivos, configuraciones, credenciales y disponibilidad.',
    impacto:
      'Puede comprometer servidor web, archivos internos, configuraciones, credenciales, disponibilidad del portal y continuidad operacional.',
    decision:
      'Debe corregirse de forma prioritaria, eliminando ejecución directa de comandos y reemplazando esas funciones por APIs seguras.',
    activos: ['Servidor web', 'Sistema operativo', 'Archivos internos', 'Disponibilidad'],
    acciones: [
      'Eliminar ejecución directa de comandos con entradas de usuario.',
      'Usar APIs seguras en lugar de shell del sistema.',
      'Aplicar listas blancas estrictas.',
      'Revisar permisos del servicio web.',
      'Aplicar hardening del servidor.',
    ],
  },
  {
    id: 'activos',
    numero: '05',
    titulo: 'Activos de información',
    subtitulo: 'Contratos, datos y sistemas',
    tipo: 'gestion',
    nivel: 'Alto',
    icono: FaFolderOpen,
    markdown: activosMd,
    enfoque:
      'Identifica los activos de información que deben protegerse dentro del portal de clientes.',
    lectura:
      'Este capítulo permite entender qué elementos tienen valor para la empresa. Los contratos y datos financieros requieren mayor protección que otros elementos secundarios. La sección relaciona cada vulnerabilidad con un activo concreto.',
    impacto:
      'Permite priorizar la protección de contratos, datos financieros, credenciales, respaldos, registros de actividad y servicios críticos.',
    decision:
      'Usar esta sección como base para justificar la matriz de riesgo y la priorización de controles.',
    activos: ['Contratos digitales', 'Datos financieros', 'Portal', 'Respaldos', 'Logs'],
    acciones: [
      'Clasificar activos según confidencialidad, integridad y disponibilidad.',
      'Priorizar contratos y datos financieros.',
      'Relacionar activos con vulnerabilidades detectadas.',
      'Definir requerimientos mínimos de protección.',
    ],
  },
  {
    id: 'matriz',
    numero: '06',
    titulo: 'Matriz de riesgo',
    subtitulo: 'Probabilidad e impacto',
    tipo: 'gestion',
    nivel: 'Crítico',
    icono: FaFire,
    markdown: matrizMd,
    enfoque:
      'Consolida los hallazgos y los ordena según probabilidad, impacto y prioridad de tratamiento.',
    lectura:
      'La matriz transforma los hallazgos técnicos en decisiones de gestión. Su función es responder qué vulnerabilidad debe corregirse primero, por qué se considera más urgente y qué efecto tendría sobre los activos críticos.',
    impacto:
      'Permite priorizar acciones de remediación y justificar técnicamente las decisiones de seguridad.',
    decision:
      'Usar la matriz como criterio central para definir el orden de corrección y el tratamiento del riesgo.',
    activos: ['Base de datos', 'Servidor', 'Portal', 'Sesiones'],
    acciones: [
      'Priorizar Inyección de comandos e Inyección SQL.',
      'Tratar XSS reflejado como riesgo alto.',
      'Definir riesgo residual esperado.',
      'Usar probabilidad e impacto como criterio de decisión.',
    ],
  },
  {
    id: 'controles',
    numero: '07',
    titulo: 'Controles',
    subtitulo: 'Defensa por capas',
    tipo: 'gestion',
    nivel: 'Prioritario',
    icono: FaLock,
    markdown: controlesMd,
    enfoque:
      'Propone controles preventivos, detectivos y de respuesta para reducir los riesgos identificados.',
    lectura:
      'Este apartado convierte el diagnóstico en acciones concretas. La auditoría no queda solo en indicar fallas, sino que propone medidas técnicas y organizacionales para proteger el portal.',
    impacto:
      'Reduce la probabilidad de explotación y mejora la capacidad de detección y respuesta ante incidentes.',
    decision:
      'Implementar controles por capas y documentar evidencia de cumplimiento.',
    activos: ['Aplicación', 'Base de datos', 'Servidor', 'Usuarios'],
    acciones: [
      'Aplicar controles preventivos por vulnerabilidad.',
      'Agregar monitoreo de eventos anómalos.',
      'Fortalecer prácticas de desarrollo seguro.',
      'Documentar evidencias de implementación.',
    ],
  },
  {
    id: 'recuperacion',
    numero: '08',
    titulo: 'Recuperación',
    subtitulo: 'Respuesta ante incidentes',
    tipo: 'gestion',
    nivel: 'Prioritario',
    icono: FaSyncAlt,
    markdown: recuperacionMd,
    enfoque:
      'Define cómo actuar después de un incidente para contener, erradicar y recuperar el portal de forma segura.',
    lectura:
      'Este capítulo establece qué hacer si un incidente ocurre: preservar evidencia, contener el punto vulnerable, revisar accesos, validar respaldos y restaurar operación de forma controlada.',
    impacto:
      'Mejora la continuidad operacional, protege evidencia y reduce el riesgo de restaurar sistemas comprometidos.',
    decision:
      'Aplicar fases de respuesta: preparación, detección, contención, erradicación, recuperación y lecciones aprendidas.',
    activos: ['Respaldos', 'Servidor', 'Base de datos', 'Contratos'],
    acciones: [
      'Preservar evidencia antes de modificar sistemas.',
      'Contener el punto vulnerable.',
      'Validar integridad antes de volver a producción.',
      'Registrar lecciones aprendidas.',
    ],
  },
  {
    id: 'prompts',
    numero: '09',
    titulo: 'Bitácora IA',
    subtitulo: 'Uso crítico de IA como agente',
    tipo: 'cierre',
    nivel: 'Evidencia',
    icono: FaRobot,
    markdown: promptsMd,
    enfoque:
      'Evidencia cómo se utilizó inteligencia artificial como apoyo técnico y metodológico durante el desarrollo.',
    lectura:
      'Este apartado demuestra que la IA no fue utilizada para reemplazar el análisis del estudiante, sino como agente de apoyo. Los prompts muestran contexto, decisiones técnicas, revisión de rúbrica, ajustes de estructura y validación del contenido.',
    impacto:
      'Permite demostrar criterio, iteración, revisión y uso responsable de herramientas de IA.',
    decision:
      'Usar la bitácora como evidencia del proceso de construcción del informe.',
    activos: ['Proceso de trabajo', 'Criterio técnico', 'Documentación'],
    acciones: [
      'Mostrar prompts contextualizados.',
      'Explicar respuesta esperada.',
      'Indicar ajustes realizados por el estudiante.',
      'Diferenciar uso de IA como agente y no como chatbot genérico.',
    ],
  },
]

const filtros = [
  { id: 'todos', nombre: 'Todos' },
  { id: 'hallazgo', nombre: 'Hallazgos técnicos' },
  { id: 'gestion', nombre: 'Gestión del riesgo' },
  { id: 'cierre', nombre: 'Cierre y evidencia IA' },
]

function nivelClass(nivel) {
  const value = nivel.toLowerCase()

  if (value.includes('crítico')) return 'critical'
  if (value.includes('alto')) return 'high'
  if (value.includes('prioritario')) return 'priority'
  return 'base'
}

function App() {
  const [seccionActiva, setSeccionActiva] = useState(secciones[0])
  const [vistaActiva, setVistaActiva] = useState('resumen')
  const [filtroActivo, setFiltroActivo] = useState('todos')
  const documentRef = useRef(null)

  const IconoActivo = seccionActiva.icono

  const seccionesFiltradas =
    filtroActivo === 'todos'
      ? secciones
      : secciones.filter((seccion) => seccion.tipo === filtroActivo)

  const hallazgosCriticos = secciones.filter(
    (seccion) => seccion.nivel === 'Crítico',
  ).length

  function cambiarSeccion(seccion) {
    setSeccionActiva(seccion)
    setVistaActiva('resumen')

    setTimeout(() => {
      documentRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 80)
  }

  return (
    <main className="mc-audit-page">
      <header className="mc-topbar">
        <section className="mc-brand">
          <div className="mc-brand-block">
            <FaCubes size={30} />
          </div>

          <div>
            <h1>Terranova Audit</h1>
            <p>Auditoría de seguridad web</p>
          </div>
        </section>

        <nav className="mc-topnav" aria-label="Navegación rápida de capítulos">
          {secciones.map((seccion) => (
            <button
              key={seccion.id}
              type="button"
              className={
                seccionActiva.id === seccion.id
                  ? 'mc-topnav-item active'
                  : 'mc-topnav-item'
              }
              onClick={() => cambiarSeccion(seccion)}
              title={`${seccion.numero}. ${seccion.titulo}`}
            >
              {seccion.numero}
            </button>
          ))}
        </nav>

        <div className="mc-quick-actions">
          <a
            className="mc-mini-action"
            href="https://github.com/blesstyv/auditoria_gugjav"
            target="_blank"
            rel="noreferrer"
            title="Abrir repositorio en GitHub"
          >
            <FaGithub size={18} />
            <span>GitHub</span>
          </a>
        </div>
      </header>

      <section className="mc-hero">
        <div className="mc-hero-text">
          <span className="mc-label">Evaluación Sumativa N°3</span>

          <h2>Inmobiliaria Terranova</h2>

          <h3>Auditoría de seguridad web</h3>

          <p>
            Informe técnico aplicado al portal de clientes, orientado a
            identificar vulnerabilidades, priorizar riesgos y proponer controles
            de seguridad para proteger contratos y datos financieros.
          </p>

          <div className="mc-hero-actions">
            <button type="button" onClick={() => cambiarSeccion(secciones[1])}>
              Ver hallazgos críticos
            </button>

            <button type="button" onClick={() => cambiarSeccion(secciones[5])}>
              Ver matriz de riesgo
            </button>
          </div>
        </div>

        <aside className="mc-hero-panel">
          <FaShieldAlt size={54} />

          <span>Panel ejecutivo</span>

          <strong>Auditoría revisable</strong>

          <p>
            Primero se muestran conclusiones, impacto y acciones. El desarrollo
            completo queda disponible solo cuando se necesita.
          </p>
        </aside>
      </section>

      <section className="audit-dashboard">
        <article>
          <FaExclamationTriangle size={32} />
          <span>Hallazgos críticos</span>
          <strong>{hallazgosCriticos}</strong>
          <p>SQL Injection e Inyección de comandos requieren corrección prioritaria.</p>
        </article>

        <article>
          <FaBullseye size={32} />
          <span>Activo principal</span>
          <strong>Portal de clientes</strong>
          <p>Concentra contratos, datos financieros y acceso de usuarios.</p>
        </article>

        <article>
          <FaCheckCircle size={32} />
          <span>Resultado esperado</span>
          <strong>Reducir riesgo</strong>
          <p>Aplicar controles, recuperación y seguimiento documentado.</p>
        </article>
      </section>

      <section className="mc-index-section">
        <div className="mc-index-heading">
          <span>Índice interactivo</span>

          <h2>Selecciona qué revisar</h2>

          <p>
            La auditoría está organizada por capítulos. Puedes filtrar por
            hallazgos técnicos, gestión del riesgo o cierre del trabajo.
          </p>
        </div>

        <div className="audit-filter-row">
          {filtros.map((filtro) => (
            <button
              key={filtro.id}
              type="button"
              className={
                filtroActivo === filtro.id
                  ? 'audit-filter active'
                  : 'audit-filter'
              }
              onClick={() => setFiltroActivo(filtro.id)}
            >
              {filtro.nombre}
            </button>
          ))}
        </div>

        <div className="mc-index-grid compact">
          {seccionesFiltradas.map((seccion) => {
            const Icono = seccion.icono

            return (
              <button
                key={seccion.id}
                type="button"
                className={
                  seccionActiva.id === seccion.id
                    ? 'mc-index-card active'
                    : 'mc-index-card'
                }
                onClick={() => cambiarSeccion(seccion)}
              >
                <span className="mc-index-number">{seccion.numero}</span>

                <div className="mc-index-icon">
                  <Icono size={24} />
                </div>

                <div>
                  <h3>{seccion.titulo}</h3>
                  <p>{seccion.subtitulo}</p>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      <section className="mc-info-strip">
        <article>
          <FaUniversity size={28} />
          <span>Empresa auditada</span>
          <strong>Inmobiliaria Terranova</strong>
        </article>

        <article>
          <FaFileAlt size={28} />
          <span>Sistema evaluado</span>
          <strong>Portal de clientes</strong>
        </article>

        <article>
          <FaLock size={28} />
          <span>Datos críticos</span>
          <strong>Contratos y datos financieros</strong>
        </article>

        <article>
          <FaShieldAlt size={28} />
          <span>Ambiente</span>
          <strong>DVWA controlado</strong>
        </article>
      </section>

      <section className="mc-summary-row">
        <article>
          <FaSearch size={30} />
          <span>Enfoque</span>
          <strong>Evaluación de vulnerabilidades</strong>
        </article>

        <article>
          <FaClipboardList size={30} />
          <span>Metodología</span>
          <strong>Evidencia, CVSS, matriz y controles</strong>
        </article>

        <article>
          <IconoActivo size={30} />
          <span>Capítulo activo</span>
          <strong>{seccionActiva.titulo}</strong>
        </article>
      </section>

      <section className="mc-document-header" ref={documentRef}>
        <div className="mc-document-icon">
          <IconoActivo size={42} />
        </div>

        <div>
          <span>Capítulo {seccionActiva.numero}</span>
          <h3>{seccionActiva.titulo}</h3>
          <p>{seccionActiva.subtitulo}</p>
        </div>

        <strong className={`audit-risk-badge ${nivelClass(seccionActiva.nivel)}`}>
          {seccionActiva.nivel}
        </strong>
      </section>

      <section className="audit-workbench">
        <div className="audit-tabs">
          <button
            type="button"
            className={vistaActiva === 'resumen' ? 'active' : ''}
            onClick={() => setVistaActiva('resumen')}
          >
            <FaEye size={18} />
            Resumen ejecutivo
          </button>

          <button
            type="button"
            className={vistaActiva === 'evidencia' ? 'active' : ''}
            onClick={() => setVistaActiva('evidencia')}
          >
            <FaExclamationTriangle size={18} />
            Impacto y evidencia
          </button>

          <button
            type="button"
            className={vistaActiva === 'acciones' ? 'active' : ''}
            onClick={() => setVistaActiva('acciones')}
          >
            <FaTools size={18} />
            Acciones sugeridas
          </button>

          <button
            type="button"
            className={vistaActiva === 'completo' ? 'active' : ''}
            onClick={() => setVistaActiva('completo')}
          >
            <FaBookOpen size={18} />
            Desarrollo completo
          </button>
        </div>

        {vistaActiva === 'resumen' && (
          <section className="audit-executive-panel">
            <article className="audit-main-card">
              <span>Qué se revisa</span>
              <h3>{seccionActiva.enfoque}</h3>
              <p>{seccionActiva.lectura}</p>
            </article>

            <article className="audit-assets-card">
              <span>Activos relacionados</span>

              <div>
                {seccionActiva.activos.map((activo) => (
                  <strong key={activo}>{activo}</strong>
                ))}
              </div>
            </article>

            <article className="audit-decision-card">
              <span>Lectura de auditoría</span>
              <p>{seccionActiva.decision}</p>
            </article>
          </section>
        )}

        {vistaActiva === 'evidencia' && (
          <section
            className={
              seccionActiva.evidencia
                ? 'audit-evidence-panel'
                : 'audit-evidence-panel no-image'
            }
          >
            <article className="audit-impact-card">
              <span>Impacto para la empresa</span>
              <h3>{seccionActiva.impacto}</h3>
              <p>
                Esta vista resume la consecuencia principal del capítulo sin
                obligar a leer todo el desarrollo técnico.
              </p>
            </article>

            {seccionActiva.cvss && (
              <article className="audit-cvss-card">
                <span>{seccionActiva.cvss.version}</span>
                <h3>
                  {seccionActiva.cvss.puntaje} — {seccionActiva.cvss.severidad}
                </h3>
                <code>{seccionActiva.cvss.vector}</code>
                <p>{seccionActiva.cvss.lectura}</p>
              </article>
            )}

            {seccionActiva.evidencia && (
              <figure className="audit-evidence-preview">
                <img
                  src={seccionActiva.evidencia}
                  alt={`Evidencia de ${seccionActiva.titulo}`}
                />
                <figcaption>
                  Evidencia asociada al capítulo {seccionActiva.numero}:{' '}
                  {seccionActiva.titulo}
                </figcaption>
              </figure>
            )}
          </section>
        )}

        {vistaActiva === 'acciones' && (
          <section className="audit-actions-panel">
            {seccionActiva.acciones.map((accion, index) => (
              <article key={accion}>
                <span>{index + 1}</span>
                <p>{accion}</p>
              </article>
            ))}
          </section>
        )}

        {vistaActiva === 'completo' && (
          <section key={seccionActiva.id} className="mc-document">
            <MarkdownView markdown={seccionActiva.markdown} />
          </section>
        )}
      </section>
    </main>
  )
}

export default App