import { useState } from 'react'
import {
  Building2,
  Database,
  ShieldAlert,
  Code2,
  Server,
  FileKey2,
  Flame,
  LockKeyhole,
  RotateCcw,
  Bot,
  Clock3,
  ShieldCheck,
  FileSearch,
  ClipboardList,
  CheckCircle2,
} from 'lucide-react'

import Resumen from './components/Resumen'
import InyeccionSQL from './components/InyeccionSQL'
import XSS from './components/XSS'
import Comandos from './components/Comandos'
import Activos from './components/Activos'
import './App.css'

const secciones = [
  {
    id: 'resumen',
    numero: '01',
    titulo: 'Resumen ejecutivo',
    subtitulo: 'Presentación de Inmobiliaria Terranova',
    estado: 'Completado',
    icono: Building2,
    componente: Resumen,
  },
  {
    id: 'sqli',
    numero: '02',
    titulo: 'Inyección SQL',
    subtitulo: 'Evidencia, CVSS, prevención y mitigación',
    estado: 'Completado',
    icono: Database,
    componente: InyeccionSQL,
  },
  {
    id: 'xss',
    numero: '03',
    titulo: 'XSS reflejado',
    subtitulo: 'Ejecución de código en navegador',
    estado: 'Completado',
    icono: Code2,
    componente: XSS,
  },
  {
    id: 'comandos',
    numero: '04',
    titulo: 'Inyección de comandos',
    subtitulo: 'Ejecución de comandos en servidor',
    estado: 'Completado',
    icono: Server,
    componente: Comandos,
  },
  {
    id: 'activos',
    numero: '05',
    titulo: 'Activos de información',
    subtitulo: 'Riesgos de la industria inmobiliaria',
    estado: 'Completado',
    icono: FileKey2,
    componente: Activos,
  },
  {
    id: 'matriz',
    numero: '06',
    titulo: 'Matriz de riesgo',
    subtitulo: 'Probabilidad por impacto',
    estado: 'Pendiente',
    icono: Flame,
    componente: null,
  },
  {
    id: 'controles',
    numero: '07',
    titulo: 'Controles de seguridad',
    subtitulo: 'Prevención y mitigación',
    estado: 'Pendiente',
    icono: LockKeyhole,
    componente: null,
  },
  {
    id: 'recuperacion',
    numero: '08',
    titulo: 'Recuperación',
    subtitulo: 'Plan post incidente',
    estado: 'Pendiente',
    icono: RotateCcw,
    componente: null,
  },
  {
    id: 'prompts',
    numero: '09',
    titulo: 'Bitácora IA',
    subtitulo: 'Uso crítico de inteligencia artificial',
    estado: 'Pendiente',
    icono: Bot,
    componente: null,
  },
]

function SeccionPendiente({ titulo, subtitulo }) {
  return (
    <section className="audit-pending">
      <Clock3 size={44} />
      <span>Sección pendiente</span>
      <h2>{titulo}</h2>
      <p>{subtitulo}</p>
      <p>
        Esta sección está contemplada dentro del informe formal de auditoría y se
        integrará cuando el archivo Markdown correspondiente sea completado.
      </p>
    </section>
  )
}

function App() {
  const [seccionActiva, setSeccionActiva] = useState(secciones[0])

  const ComponenteActivo = seccionActiva.componente
  const IconoActivo = seccionActiva.icono

  const total = secciones.length
  const completadas = secciones.filter((seccion) => seccion.estado === 'Completado').length
  const avance = Math.round((completadas / total) * 100)

  function cambiarSeccion(seccion) {
    setSeccionActiva(seccion)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="audit-page">
      <aside className="audit-sidebar">
        <div className="audit-logo">
          <ShieldAlert size={34} />

          <div>
            <h1>Auditoría Web</h1>
            <p>Informe técnico</p>
          </div>
        </div>

        <section className="audit-client-card">
          <span>Empresa auditada</span>
          <strong>Inmobiliaria Terranova</strong>
          <p>Portal de clientes con custodia de contratos y datos financieros.</p>
        </section>

        <section className="audit-progress">
          <div className="audit-progress-top">
            <span>Avance del informe</span>
            <strong>{avance}%</strong>
          </div>

          <div className="audit-progress-bar">
            <div style={{ width: `${avance}%` }} />
          </div>

          <p>
            {completadas} de {total} capítulos integrados.
          </p>
        </section>

        <nav className="audit-menu">
          {secciones.map((seccion) => {
            const Icono = seccion.icono

            return (
              <button
                key={seccion.id}
                type="button"
                className={
                  seccionActiva.id === seccion.id
                    ? 'audit-menu-item active'
                    : 'audit-menu-item'
                }
                onClick={() => cambiarSeccion(seccion)}
              >
                <span className="audit-menu-number">{seccion.numero}</span>
                <Icono size={19} />

                <div>
                  <strong>{seccion.titulo}</strong>
                  <small>{seccion.estado}</small>
                </div>
              </button>
            )
          })}
        </nav>
      </aside>

      <section className="audit-main">
        <header className="audit-cover">
          <div className="audit-cover-content">
            <span className="audit-label">Evaluación Sumativa N°3</span>

            <h2>Informe de auditoría de seguridad web</h2>

            <p>
              Evaluación técnica del portal de clientes de Inmobiliaria
              Terranova, orientada a la identificación de vulnerabilidades,
              análisis de evidencia, medición de severidad, activos críticos y
              riesgos asociados al negocio inmobiliario.
            </p>

            <div className="audit-cover-grid">
              <article>
                <span>Entidad auditada</span>
                <strong>Inmobiliaria Terranova</strong>
              </article>

              <article>
                <span>Sistema evaluado</span>
                <strong>Portal de clientes</strong>
              </article>

              <article>
                <span>Datos críticos</span>
                <strong>Contratos y datos financieros</strong>
              </article>

              <article>
                <span>Ambiente de prueba</span>
                <strong>DVWA controlado</strong>
              </article>
            </div>
          </div>

          <aside className="audit-cover-stamp">
            <ShieldCheck size={52} />
            <span>Documento técnico</span>
            <strong>Auditoría formal</strong>
            <p>Uso académico, ético y defensivo.</p>
          </aside>
        </header>

        <section className="audit-summary-row">
          <article>
            <FileSearch size={28} />
            <span>Enfoque</span>
            <strong>Evaluación de vulnerabilidades</strong>
          </article>

          <article>
            <ClipboardList size={28} />
            <span>Metodología</span>
            <strong>Evidencia, CVSS y matriz de riesgo</strong>
          </article>

          <article>
            <CheckCircle2 size={28} />
            <span>Capítulo activo</span>
            <strong>{seccionActiva.titulo}</strong>
          </article>
        </section>

        <section className="audit-chapter-heading">
          <div className="audit-chapter-icon">
            <IconoActivo size={42} />
          </div>

          <div>
            <span>Capítulo {seccionActiva.numero}</span>
            <h3>{seccionActiva.titulo}</h3>
            <p>{seccionActiva.subtitulo}</p>
          </div>
        </section>

        <section key={seccionActiva.id} className="audit-document">
          {ComponenteActivo ? (
            <ComponenteActivo />
          ) : (
            <SeccionPendiente
              titulo={seccionActiva.titulo}
              subtitulo={seccionActiva.subtitulo}
            />
          )}
        </section>
      </section>
    </main>
  )
}

export default App