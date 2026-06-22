import { useRef, useState } from 'react'
import {
  Building2,
  Database,
  Code2,
  Server,
  FileKey2,
  Flame,
  LockKeyhole,
  RotateCcw,
  Bot,
  ShieldCheck,
  FileSearch,
  ClipboardList,
  Landmark,
  FileText,
  Boxes,
  ExternalLink,
  AlertTriangle,
  Target,
  CheckCircle2,
  Eye,
  Wrench,
  BookOpen,
  ShieldAlert,
} from 'lucide-react'
import { FaGithub } from 'react-icons/fa'

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
    icono: Building2,
    markdown: resumenMd,
    enfoque: 'Presentar el alcance, objetivo y contexto de la auditoría aplicada al portal de clientes.',
    impacto: 'Permite entender por qué el portal de Inmobiliaria Terranova requiere evaluación de seguridad.',
    activos: ['Portal de clientes', 'Contratos', 'Datos financieros'],
    acciones: [
      'Definir alcance autorizado de la auditoría.',
      'Identificar datos críticos del negocio.',
      'Relacionar el análisis técnico con el contexto inmobiliario.',
    ],
  },
  {
    id: 'sqli',
    numero: '02',
    titulo: 'Inyección SQL',
    subtitulo: 'Riesgo sobre base de datos',
    tipo: 'hallazgo',
    nivel: 'Crítico',
    icono: Database,
    markdown: sqliMd,
    evidencia: '/img_gugjav/sqli_gugjav.png',
    enfoque: 'Analizar cómo una entrada manipulada podría alterar consultas a la base de datos.',
    impacto: 'Puede exponer o modificar contratos, datos financieros, credenciales y registros de clientes.',
    activos: ['Base de datos', 'Contratos', 'Datos financieros', 'Credenciales'],
    acciones: [
      'Implementar consultas parametrizadas.',
      'Validar entradas desde el servidor.',
      'Aplicar mínimo privilegio en la cuenta de base de datos.',
      'Ocultar errores técnicos al usuario final.',
    ],
  },
  {
    id: 'xss',
    numero: '03',
    titulo: 'XSS reflejado',
    subtitulo: 'Riesgo sobre sesión y navegador',
    tipo: 'hallazgo',
    nivel: 'Alto',
    icono: Code2,
    markdown: xssMd,
    evidencia: '/img_gugjav/xss_gugjav.png',
    enfoque: 'Evaluar ejecución de código en el navegador mediante datos reflejados por la aplicación.',
    impacto: 'Puede afectar sesiones, confianza del cliente y visualización segura de información del portal.',
    activos: ['Sesión de usuario', 'Interfaz del portal', 'Confianza institucional'],
    acciones: [
      'Aplicar codificación de salida contextual.',
      'Validar campos reflejados.',
      'Configurar Content Security Policy.',
      'Proteger cookies con HttpOnly, Secure y SameSite.',
    ],
  },
  {
    id: 'comandos',
    numero: '04',
    titulo: 'Inyección de comandos',
    subtitulo: 'Riesgo sobre servidor',
    tipo: 'hallazgo',
    nivel: 'Crítico',
    icono: Server,
    markdown: comandosMd,
    evidencia: '/img_gugjav/comandos_gugjav.png',
    enfoque: 'Analizar el riesgo de ejecutar instrucciones no autorizadas en el servidor.',
    impacto: 'Puede comprometer infraestructura, archivos internos, configuraciones y continuidad operacional.',
    activos: ['Servidor web', 'Sistema operativo', 'Archivos internos', 'Disponibilidad'],
    acciones: [
      'Eliminar ejecución directa de comandos con entradas de usuario.',
      'Usar APIs seguras en lugar de shell.',
      'Aplicar listas blancas estrictas.',
      'Revisar permisos y hardening del servidor.',
    ],
  },
  {
    id: 'activos',
    numero: '05',
    titulo: 'Activos de información',
    subtitulo: 'Contratos, datos y sistemas',
    tipo: 'gestion',
    nivel: 'Alto',
    icono: FileKey2,
    markdown: activosMd,
    enfoque: 'Identificar qué activos deben protegerse y qué tan críticos son para la operación.',
    impacto: 'Ordena la auditoría desde el valor real de los datos y sistemas del negocio inmobiliario.',
    activos: ['Contratos digitales', 'Datos financieros', 'Portal', 'Respaldos', 'Logs'],
    acciones: [
      'Clasificar activos por confidencialidad, integridad y disponibilidad.',
      'Priorizar contratos y datos financieros.',
      'Relacionar cada activo con los hallazgos técnicos.',
    ],
  },
  {
    id: 'matriz',
    numero: '06',
    titulo: 'Matriz de riesgo',
    subtitulo: 'Probabilidad e impacto',
    tipo: 'gestion',
    nivel: 'Crítico',
    icono: Flame,
    markdown: matrizMd,
    enfoque: 'Priorizar los hallazgos según probabilidad, impacto y efecto sobre el negocio.',
    impacto: 'Permite decidir qué se corrige primero y justificar la prioridad de remediación.',
    activos: ['Base de datos', 'Servidor', 'Portal', 'Sesiones'],
    acciones: [
      'Priorizar Inyección de comandos e Inyección SQL.',
      'Tratar XSS reflejado como riesgo alto.',
      'Definir riesgo residual esperado.',
      'Usar la matriz como criterio de decisión.',
    ],
  },
  {
    id: 'controles',
    numero: '07',
    titulo: 'Controles',
    subtitulo: 'Defensa por capas',
    tipo: 'gestion',
    nivel: 'Prioritario',
    icono: LockKeyhole,
    markdown: controlesMd,
    enfoque: 'Transformar los hallazgos en medidas concretas de prevención, detección y respuesta.',
    impacto: 'Reduce la probabilidad de explotación y fortalece la seguridad del portal.',
    activos: ['Aplicación', 'Base de datos', 'Servidor', 'Usuarios'],
    acciones: [
      'Aplicar controles preventivos por vulnerabilidad.',
      'Agregar monitoreo de eventos anómalos.',
      'Fortalecer desarrollo seguro.',
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
    icono: RotateCcw,
    markdown: recuperacionMd,
    enfoque: 'Definir cómo contener, erradicar y recuperar el portal después de un incidente.',
    impacto: 'Mejora la continuidad operacional y evita restauraciones inseguras.',
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
    icono: Bot,
    markdown: promptsMd,
    enfoque: 'Demostrar uso responsable de IA como apoyo técnico y no como reemplazo del análisis.',
    impacto: 'Evidencia criterio del estudiante, iteración, revisión y toma de decisiones.',
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
            <Boxes size={30} />
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
          <ShieldCheck size={54} />

          <span>Panel ejecutivo</span>

          <strong>Auditoría revisable</strong>

          <p>
            Primero se muestran conclusiones, evidencias y acciones. El
            desarrollo completo queda disponible solo cuando se necesita.
          </p>
        </aside>
      </section>

      <section className="audit-dashboard">
        <article>
          <ShieldAlert size={32} />
          <span>Hallazgos críticos</span>
          <strong>{hallazgosCriticos}</strong>
          <p>SQL Injection e Inyección de comandos requieren prioridad alta.</p>
        </article>

        <article>
          <Target size={32} />
          <span>Activo principal</span>
          <strong>Portal de clientes</strong>
          <p>Concentra contratos, datos financieros y acceso de usuarios.</p>
        </article>

        <article>
          <CheckCircle2 size={32} />
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
          <Landmark size={28} />
          <span>Empresa auditada</span>
          <strong>Inmobiliaria Terranova</strong>
        </article>

        <article>
          <FileText size={28} />
          <span>Sistema evaluado</span>
          <strong>Portal de clientes</strong>
        </article>

        <article>
          <LockKeyhole size={28} />
          <span>Datos críticos</span>
          <strong>Contratos y datos financieros</strong>
        </article>

        <article>
          <ShieldCheck size={28} />
          <span>Ambiente</span>
          <strong>DVWA controlado</strong>
        </article>
      </section>

      <section className="mc-summary-row">
        <article>
          <FileSearch size={30} />
          <span>Enfoque</span>
          <strong>Evaluación de vulnerabilidades</strong>
        </article>

        <article>
          <ClipboardList size={30} />
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
            <Eye size={18} />
            Resumen ejecutivo
          </button>

          <button
            type="button"
            className={vistaActiva === 'evidencia' ? 'active' : ''}
            onClick={() => setVistaActiva('evidencia')}
          >
            <AlertTriangle size={18} />
            Evidencia / impacto
          </button>

          <button
            type="button"
            className={vistaActiva === 'acciones' ? 'active' : ''}
            onClick={() => setVistaActiva('acciones')}
          >
            <Wrench size={18} />
            Acciones sugeridas
          </button>

          <button
            type="button"
            className={vistaActiva === 'completo' ? 'active' : ''}
            onClick={() => setVistaActiva('completo')}
          >
            <BookOpen size={18} />
            Desarrollo completo
          </button>
        </div>

        {vistaActiva === 'resumen' && (
          <section className="audit-executive-panel">
            <article className="audit-main-card">
              <span>Qué se revisa</span>
              <h3>{seccionActiva.enfoque}</h3>
              <p>{seccionActiva.impacto}</p>
            </article>

            <article className="audit-assets-card">
              <span>Activos relacionados</span>

              <div>
                {seccionActiva.activos.map((activo) => (
                  <strong key={activo}>{activo}</strong>
                ))}
              </div>
            </article>
          </section>
        )}

        {vistaActiva === 'evidencia' && (
          <section className="audit-evidence-panel">
            <article>
              <span>Impacto para la empresa</span>
              <h3>{seccionActiva.impacto}</h3>
              <p>
                Esta vista resume el valor del hallazgo sin obligar a leer todo
                el desarrollo técnico. Para revisar el análisis completo, usa la
                pestaña “Desarrollo completo”.
              </p>
            </article>

            {seccionActiva.evidencia ? (
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
            ) : (
              <article className="audit-no-evidence">
              </article>
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

      <footer className="mc-footer">
        <div className="mc-footer-content">
          <div className="mc-footer-blocks">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="mc-footer-text">
            <span>Repositorio del proyecto</span>

            <h3>Auditoría Web — Inmobiliaria Terranova</h3>

            <p>
              Acceso al repositorio utilizado para respaldar el desarrollo del
              informe, los archivos Markdown y la aplicación React.
            </p>
          </div>

          <a
            className="mc-footer-link"
            href="https://github.com/blesstyv/auditoria_gugjav"
            target="_blank"
            rel="noreferrer"
            aria-label="Abrir repositorio de GitHub"
          >
            <FaGithub size={24} />
            <strong>Abrir GitHub</strong>
            <ExternalLink size={18} />
          </a>
        </div>
      </footer>
    </main>
  )
}

export default App