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
  FaGithub,
} from 'react-icons/fa'

import MarkdownView from './components/MarkdownView'
import RiskMatrixBoard from './components/RiskMatrixBoard'

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
  },
  {
    id: 'matriz',
    numero: '06',
    titulo: 'Matriz de riesgo',
    subtitulo: 'Mapa de calor, CVSS y priorización',
    tipo: 'gestion',
    nivel: 'Crítico',
    icono: FaFire,
    markdown: matrizMd,
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

    setTimeout(() => {
      documentRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 80)
  }

  function renderContenidoCapitulo() {
    if (seccionActiva.numero === '06') {
      return (
        <>
          <RiskMatrixBoard />
          <MarkdownView
            key={seccionActiva.id}
            markdown={seccionActiva.markdown}
          />
        </>
      )
    }

    return (
      <MarkdownView
        key={seccionActiva.id}
        markdown={seccionActiva.markdown}
      />
    )
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
            Informe de consultoría con hallazgos técnicos, evidencia, matriz de
            riesgo, controles y plan de recuperación.
          </p>
        </aside>
      </section>

      <section className="audit-dashboard">
        <article>
          <FaExclamationTriangle size={32} />
          <span>Hallazgos críticos</span>
          <strong>{hallazgosCriticos}</strong>
          <p>
            SQL Injection e Inyección de comandos requieren corrección
            prioritaria.
          </p>
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
          <span>Índice de auditoría</span>

          <h2>Puntos tratados en el informe</h2>

          <p>
            Selecciona un capítulo para visualizar directamente el contenido
            correspondiente. La matriz interactiva se muestra únicamente en el
            capítulo 06.
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
          <FaShieldAlt size={28} />
          <span>Datos críticos</span>
          <strong>Contratos y datos financieros</strong>
        </article>

        <article>
          <FaLock size={28} />
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

            <section className="audit-workbench audit-workbench-full">
        <section key={seccionActiva.id} className="mc-document principal-document">
          <div className="principal-document-header">
            <span>Información principal del capítulo</span>
            <h2>{seccionActiva.titulo}</h2>
            <p>{seccionActiva.subtitulo}</p>
          </div>

          {renderContenidoCapitulo()}
        </section>
      </section>

      <footer className="audit-footer">
        <div className="audit-footer-content">
          <div className="audit-footer-info">
            <strong>Auditoría Web — Inmobiliaria Terranova</strong>
            <p>
              © {new Date().getFullYear()} Todos los derechos reservados.
              Creado por Javier Guglielmini.
            </p>
          </div>

          <a
            className="audit-footer-github"
            href="https://github.com/blesstyv"
            target="_blank"
            rel="noreferrer"
            aria-label="Abrir repositorio de GitHub"
            title="Ver repositorio en GitHub"
          >
            <FaGithub size={26} />
          </a>
        </div>
      </footer>
    </main>
  )
}

export default App