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
    icono: Building2,
    markdown: resumenMd,
  },
  {
    id: 'sqli',
    numero: '02',
    titulo: 'Inyección SQL',
    subtitulo: 'Riesgo sobre base de datos',
    icono: Database,
    markdown: sqliMd,
  },
  {
    id: 'xss',
    numero: '03',
    titulo: 'XSS reflejado',
    subtitulo: 'Riesgo sobre sesión y navegador',
    icono: Code2,
    markdown: xssMd,
  },
  {
    id: 'comandos',
    numero: '04',
    titulo: 'Inyección de comandos',
    subtitulo: 'Riesgo sobre servidor',
    icono: Server,
    markdown: comandosMd,
  },
  {
    id: 'activos',
    numero: '05',
    titulo: 'Activos de información',
    subtitulo: 'Contratos, datos y sistemas',
    icono: FileKey2,
    markdown: activosMd,
  },
  {
    id: 'matriz',
    numero: '06',
    titulo: 'Matriz de riesgo',
    subtitulo: 'Probabilidad e impacto',
    icono: Flame,
    markdown: matrizMd,
  },
  {
    id: 'controles',
    numero: '07',
    titulo: 'Controles',
    subtitulo: 'Defensa por capas',
    icono: LockKeyhole,
    markdown: controlesMd,
  },
  {
    id: 'recuperacion',
    numero: '08',
    titulo: 'Recuperación',
    subtitulo: 'Respuesta ante incidentes',
    icono: RotateCcw,
    markdown: recuperacionMd,
  },
  {
    id: 'prompts',
    numero: '09',
    titulo: 'Bitácora IA',
    subtitulo: 'Uso crítico de IA como agente',
    icono: Bot,
    markdown: promptsMd,
  },
]

function App() {
  const [seccionActiva, setSeccionActiva] = useState(secciones[0])
  const documentRef = useRef(null)

  const IconoActivo = seccionActiva.icono

  function cambiarSeccion(seccion) {
    setSeccionActiva(seccion)

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
            identificar vulnerabilidades, analizar evidencia, priorizar riesgos y
            proponer controles de seguridad para proteger contratos y datos
            financieros.
          </p>

          <div className="mc-hero-actions">
            <button type="button" onClick={() => cambiarSeccion(secciones[0])}>
              Ver informe
            </button>

            <button type="button" onClick={() => cambiarSeccion(secciones[5])}>
              Ver matriz de riesgo
            </button>
          </div>
        </div>

        <aside className="mc-hero-panel">
          <ShieldCheck size={54} />

          <span>Documento técnico</span>

          <strong>Auditoría formal</strong>

          <p>
            Desarrollo académico, ético y defensivo en ambiente controlado DVWA.
          </p>
        </aside>
      </section>

      <section className="mc-index-section">
        <div className="mc-index-heading">
          <span>Índice de la auditoría</span>

          <h2>Puntos tratados en el informe</h2>

          <p>
            Selecciona un capítulo para revisar el análisis correspondiente de la
            auditoría realizada al portal de clientes de Inmobiliaria Terranova.
          </p>
        </div>

        <div className="mc-index-grid">
          {secciones.map((seccion) => {
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
          <FileKey2 size={28} />
          <span>Datos críticos</span>
          <strong>Contratos y datos financieros</strong>
        </article>

        <article>
          <ShieldCheck size={28} />
          <span>Ambiente</span>
          <strong>DVWA controlado</strong>
        </article>
      </section>

      <section className="mc-chapter-grid">
        {secciones.map((seccion) => {
          const Icono = seccion.icono

          return (
            <button
              key={seccion.id}
              type="button"
              className={
                seccionActiva.id === seccion.id
                  ? 'mc-chapter-card active'
                  : 'mc-chapter-card'
              }
              onClick={() => cambiarSeccion(seccion)}
            >
              <span className="mc-card-number">{seccion.numero}</span>

              <div className="mc-card-icon">
                <Icono size={30} />
              </div>

              <div>
                <h4>{seccion.titulo}</h4>
                <p>{seccion.subtitulo}</p>
              </div>
            </button>
          )
        })}
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
      </section>

      <section key={seccionActiva.id} className="mc-document">
        <MarkdownView markdown={seccionActiva.markdown} />
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