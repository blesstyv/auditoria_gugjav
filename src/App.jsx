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
  ShieldCheck,
  FileSearch,
  ClipboardList,
  CheckCircle2,
  FileText,
  Landmark,
} from 'lucide-react'

import Resumen from './components/Resumen'
import InyeccionSQL from './components/InyeccionSQL'
import XSS from './components/XSS'
import Comandos from './components/Comandos'
import Activos from './components/Activos'
import Matriz from './components/Matriz'
import Controles from './components/Controles'
import Recuperacion from './components/Recuperacion'
import Prompts from './components/Prompts'
import './App.css'

const secciones = [
  {
    id: 'resumen',
    numero: '01',
    titulo: 'Resumen ejecutivo',
    subtitulo: 'Presentación general de la auditoría',
    icono: Building2,
    componente: Resumen,
  },
  {
    id: 'sqli',
    numero: '02',
    titulo: 'Inyección SQL',
    subtitulo: 'Hallazgo sobre base de datos y registros críticos',
    icono: Database,
    componente: InyeccionSQL,
  },
  {
    id: 'xss',
    numero: '03',
    titulo: 'XSS reflejado',
    subtitulo: 'Hallazgo sobre sesión, navegador y confianza del cliente',
    icono: Code2,
    componente: XSS,
  },
  {
    id: 'comandos',
    numero: '04',
    titulo: 'Inyección de comandos',
    subtitulo: 'Hallazgo sobre servidor e infraestructura',
    icono: Server,
    componente: Comandos,
  },
  {
    id: 'activos',
    numero: '05',
    titulo: 'Activos de información',
    subtitulo: 'Inventario y criticidad de activos del portal',
    icono: FileKey2,
    componente: Activos,
  },
  {
    id: 'matriz',
    numero: '06',
    titulo: 'Matriz de riesgo',
    subtitulo: 'Probabilidad, impacto y priorización',
    icono: Flame,
    componente: Matriz,
  },
  {
    id: 'controles',
    numero: '07',
    titulo: 'Controles de seguridad',
    subtitulo: 'Prevención, mitigación y defensa por capas',
    icono: LockKeyhole,
    componente: Controles,
  },
  {
    id: 'recuperacion',
    numero: '08',
    titulo: 'Recuperación',
    subtitulo: 'Respuesta ante incidentes y continuidad operacional',
    icono: RotateCcw,
    componente: Recuperacion,
  },
  {
    id: 'prompts',
    numero: '09',
    titulo: 'Bitácora de IA',
    subtitulo: 'Uso crítico de inteligencia artificial como agente de apoyo',
    icono: Bot,
    componente: Prompts,
  },
]

function App() {
  const [seccionActiva, setSeccionActiva] = useState(secciones[0])

  const ComponenteActivo = seccionActiva.componente
  const IconoActivo = seccionActiva.icono

  function cambiarSeccion(seccion) {
    setSeccionActiva(seccion)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="audit-page">
      <aside className="audit-sidebar">
        <section className="audit-logo">
          <div className="audit-logo-icon">
            <ShieldAlert size={34} />
          </div>

          <div>
            <h1>Auditoría Web</h1>
            <p>Informe técnico de seguridad</p>
          </div>
        </section>

        <section className="audit-client-card">
          <span>Empresa auditada</span>
          <strong>Inmobiliaria Terranova</strong>
          <p>
            Evaluación de seguridad web aplicada al portal de clientes que
            custodia contratos y datos financieros.
          </p>
        </section>

        <section className="audit-scope-card">
          <span>Alcance del informe</span>

          <div className="scope-item">
            <FileText size={18} />
            <p>9 capítulos técnicos documentados.</p>
          </div>

          <div className="scope-item">
            <Landmark size={18} />
            <p>Enfoque en riesgo para el rubro inmobiliario.</p>
          </div>

          <div className="scope-item">
            <ShieldCheck size={18} />
            <p>Pruebas realizadas en ambiente controlado DVWA.</p>
          </div>
        </section>

        <nav className="audit-menu" aria-label="Navegación del informe">
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
                  <small>{seccion.subtitulo}</small>
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
              Terranova, orientada a identificar vulnerabilidades, analizar
              evidencia, medir severidad, priorizar riesgos y proponer controles
              de seguridad aplicables al negocio inmobiliario.
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

            <p>
              Informe desarrollado con enfoque académico, ético y defensivo.
            </p>
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
          <ComponenteActivo />
        </section>
      </section>
    </main>
  )
}

export default App