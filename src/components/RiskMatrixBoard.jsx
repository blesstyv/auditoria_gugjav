import { Fragment, useMemo, useState } from 'react'

const metricValues = {
  AV: {
    N: 0.85,
    A: 0.62,
    L: 0.55,
    P: 0.2,
  },
  AC: {
    L: 0.77,
    H: 0.44,
  },
  UI: {
    N: 0.85,
    R: 0.62,
  },
  CIA: {
    H: 0.56,
    L: 0.22,
    N: 0,
  },
}

const privilegeValues = {
  U: {
    N: 0.85,
    L: 0.62,
    H: 0.27,
  },
  C: {
    N: 0.85,
    L: 0.68,
    H: 0.5,
  },
}

const metricLabels = {
  AV: {
    N: 'Red',
    A: 'Red adyacente',
    L: 'Local',
    P: 'Físico',
  },
  AC: {
    L: 'Baja',
    H: 'Alta',
  },
  PR: {
    N: 'Ninguno',
    L: 'Bajo',
    H: 'Alto',
  },
  UI: {
    N: 'No requiere',
    R: 'Requiere',
  },
  S: {
    U: 'Sin cambio',
    C: 'Con cambio',
  },
  C: {
    H: 'Alta',
    L: 'Baja',
    N: 'Nula',
  },
  I: {
    H: 'Alta',
    L: 'Baja',
    N: 'Nula',
  },
  A: {
    H: 'Alta',
    L: 'Baja',
    N: 'Nula',
  },
}

const baseRisks = [
  {
    id: 'H3',
    finding: 'Inyección de comandos',
    asset: 'Servidor web, sistema operativo y continuidad operacional',
    probability: 4,
    impact: 5,
    priority: 1,
    businessReason:
      'Tiene prioridad máxima porque puede comprometer el servidor web, ejecutar instrucciones no autorizadas, afectar archivos internos y generar indisponibilidad del portal de clientes.',
    treatment:
      'Eliminar ejecución directa de comandos, utilizar APIs seguras, aplicar listas blancas estrictas, validar entradas y revisar permisos del servicio web.',
    metrics: {
      AV: 'N',
      AC: 'L',
      PR: 'L',
      UI: 'N',
      S: 'U',
      C: 'H',
      I: 'H',
      A: 'H',
    },
  },
  {
    id: 'H1',
    finding: 'Inyección SQL',
    asset: 'Base de datos, contratos y datos financieros',
    probability: 4,
    impact: 5,
    priority: 2,
    businessReason:
      'Se considera crítica porque puede afectar directamente la base de datos que almacena contratos, información financiera, registros de clientes y posibles credenciales.',
    treatment:
      'Aplicar consultas parametrizadas, validación del lado servidor, mínimo privilegio en la base de datos y manejo seguro de errores.',
    metrics: {
      AV: 'N',
      AC: 'L',
      PR: 'L',
      UI: 'N',
      S: 'U',
      C: 'H',
      I: 'H',
      A: 'L',
    },
  },
  {
    id: 'H2',
    finding: 'XSS reflejado',
    asset: 'Sesión de usuario, navegador e interfaz del portal',
    probability: 3,
    impact: 4,
    priority: 3,
    businessReason:
      'Se clasifica como riesgo alto porque puede afectar la sesión del usuario, la confianza en el portal y la seguridad de interacción del cliente con la plataforma.',
    treatment:
      'Aplicar codificación de salida, sanitización de entradas, Content Security Policy y protección de cookies con HttpOnly, Secure y SameSite.',
    metrics: {
      AV: 'N',
      AC: 'L',
      PR: 'N',
      UI: 'R',
      S: 'C',
      C: 'L',
      I: 'L',
      A: 'N',
    },
  },
]

function roundUp1Decimal(value) {
  const intValue = Math.round(value * 100000)

  if (intValue % 10000 === 0) {
    return intValue / 100000
  }

  return (Math.floor(intValue / 10000) + 1) / 10
}

function buildVector(metrics) {
  return `CVSS:3.1/AV:${metrics.AV}/AC:${metrics.AC}/PR:${metrics.PR}/UI:${metrics.UI}/S:${metrics.S}/C:${metrics.C}/I:${metrics.I}/A:${metrics.A}`
}

function calculateCvss(metrics) {
  const av = metricValues.AV[metrics.AV]
  const ac = metricValues.AC[metrics.AC]
  const pr = privilegeValues[metrics.S][metrics.PR]
  const ui = metricValues.UI[metrics.UI]

  const c = metricValues.CIA[metrics.C]
  const i = metricValues.CIA[metrics.I]
  const a = metricValues.CIA[metrics.A]

  const iss = 1 - (1 - c) * (1 - i) * (1 - a)

  const impact =
    metrics.S === 'U'
      ? 6.42 * iss
      : 7.52 * (iss - 0.029) - 3.25 * Math.pow(iss - 0.02, 15)

  const exploitability = 8.22 * av * ac * pr * ui

  const baseScore =
    impact <= 0
      ? 0
      : metrics.S === 'U'
        ? roundUp1Decimal(Math.min(impact + exploitability, 10))
        : roundUp1Decimal(Math.min(1.08 * (impact + exploitability), 10))

  return {
    iss,
    impact,
    exploitability,
    baseScore,
  }
}

function getCvssSeverity(score) {
  if (score === 0) return 'Ninguna'
  if (score <= 3.9) return 'Baja'
  if (score <= 6.9) return 'Media'
  if (score <= 8.9) return 'Alta'
  return 'Crítica'
}

function getRiskScore(probability, impact) {
  return probability * impact
}

function getRiskLevel(score) {
  if (score >= 16) return 'Crítico'
  if (score >= 10) return 'Alto'
  if (score >= 5) return 'Medio'
  return 'Bajo'
}

function getRiskClass(score) {
  if (score >= 16) return 'risk-critical'
  if (score >= 10) return 'risk-high'
  if (score >= 5) return 'risk-medium'
  return 'risk-low'
}

function RiskMatrixBoard() {
  const risks = useMemo(() => {
    return baseRisks
      .map((risk) => {
        const cvss = calculateCvss(risk.metrics)
        const riskScore = getRiskScore(risk.probability, risk.impact)

        return {
          ...risk,
          vector: buildVector(risk.metrics),
          cvss,
          cvssSeverity: getCvssSeverity(cvss.baseScore),
          riskScore,
          riskLevel: getRiskLevel(riskScore),
          riskClass: getRiskClass(riskScore),
        }
      })
      .sort((a, b) => a.priority - b.priority)
  }, [])

  const [selectedRiskId, setSelectedRiskId] = useState(risks[0].id)

  const selectedRisk = risks.find((risk) => risk.id === selectedRiskId)
  const probabilities = [5, 4, 3, 2, 1]
  const impacts = [1, 2, 3, 4, 5]

  const criticalCount = risks.filter((risk) => risk.riskLevel === 'Crítico').length
  const maxCvss = Math.max(...risks.map((risk) => risk.cvss.baseScore))

  return (
    <section className="risk-board">
      <div className="risk-board-intro">
        <span>Matriz de riesgo completa</span>
        <h2>Mapa de calor, cálculo CVSS y prioridad de tratamiento</h2>
        <p>
          Esta matriz evalúa los hallazgos técnicos de la auditoría aplicada al
          portal de clientes de Inmobiliaria Terranova. Se calcula el puntaje
          CVSS v3.1 desde el vector técnico y se cruza con probabilidad e impacto
          para obtener el nivel de riesgo del negocio.
        </p>
      </div>

      <div className="risk-board-summary">
        <article>
          <span>Riesgos críticos</span>
          <strong>{criticalCount}</strong>
          <p>Inyección de comandos e Inyección SQL se ubican en nivel crítico.</p>
        </article>

        <article>
          <span>Mayor CVSS</span>
          <strong>{maxCvss}</strong>
          <p>La mayor severidad técnica corresponde a Inyección de comandos.</p>
        </article>

        <article>
          <span>Prioridad máxima</span>
          <strong>{risks[0].id}</strong>
          <p>{risks[0].finding}</p>
        </article>
      </div>

      <div className="heatmap-section">
        <div className="heatmap-heading">
          <span>Mapa de calor interactivo 5 × 5</span>
          <h3>Riesgo = Probabilidad × Impacto</h3>
          <p>
            Selecciona una celda con hallazgos para ver el detalle técnico. Los
            colores representan el nivel de riesgo: bajo, medio, alto y crítico.
          </p>
        </div>

        <div className="heatmap-wrap">
          <div className="heatmap-axis-y">Probabilidad</div>

          <div className="heatmap-grid">
            <div className="heatmap-empty"></div>

            {impacts.map((impact) => (
              <div key={`impact-${impact}`} className="heatmap-axis-label">
                I{impact}
              </div>
            ))}

            {probabilities.map((probability) => (
              <Fragment key={`row-${probability}`}>
                <div className="heatmap-axis-label">P{probability}</div>

                {impacts.map((impact) => {
                  const score = probability * impact
                  const cellRisks = risks.filter(
                    (risk) =>
                      risk.probability === probability && risk.impact === impact,
                  )

                  const isSelected = cellRisks.some(
                    (risk) => risk.id === selectedRiskId,
                  )

                  return (
                    <button
                      key={`${probability}-${impact}`}
                      type="button"
                      className={`heatmap-cell ${getRiskClass(score)} ${
                        isSelected ? 'selected' : ''
                      }`}
                      onClick={() => {
                        if (cellRisks.length > 0) {
                          setSelectedRiskId(cellRisks[0].id)
                        }
                      }}
                      title={
                        cellRisks.length > 0
                          ? cellRisks
                              .map((risk) => `${risk.id}: ${risk.finding}`)
                              .join(' | ')
                          : `Nivel de riesgo ${score}`
                      }
                    >
                      <strong>{score}</strong>
                    </button>
                  )
                })}
              </Fragment>
            ))}
          </div>
        </div>

        <div className="heatmap-axis-x">Impacto</div>

        <div className="heatmap-legend">
          <span className="risk-low">1–4 Bajo</span>
          <span className="risk-medium">5–9 Medio</span>
          <span className="risk-high">10–15 Alto</span>
          <span className="risk-critical">16–25 Crítico</span>
        </div>
      </div>

      <div className="selected-risk-panel">
        <div className="selected-risk-header">
          <span>Hallazgo seleccionado</span>
          <h3>
            {selectedRisk.id} — {selectedRisk.finding}
          </h3>
          <strong className={`risk-pill ${selectedRisk.riskClass}`}>
            {selectedRisk.riskLevel}
          </strong>
        </div>

        <div className="selected-risk-grid">
          <article>
            <span>Activo afectado</span>
            <p>{selectedRisk.asset}</p>
          </article>

          <article>
            <span>Probabilidad</span>
            <strong>{selectedRisk.probability}</strong>
          </article>

          <article>
            <span>Impacto</span>
            <strong>{selectedRisk.impact}</strong>
          </article>

          <article>
            <span>Resultado</span>
            <strong>{selectedRisk.riskScore}</strong>
          </article>

          <article>
            <span>CVSS</span>
            <strong>{selectedRisk.cvss.baseScore}</strong>
          </article>

          <article>
            <span>Severidad CVSS</span>
            <strong>{selectedRisk.cvssSeverity}</strong>
          </article>
        </div>

        <div className="selected-risk-reason">
          <span>Justificación de prioridad</span>
          <p>{selectedRisk.businessReason}</p>
        </div>
      </div>

      <div className="risk-table-box">
        <h3>Matriz priorizada de riesgos</h3>

        <div className="risk-table-scroll">
          <table className="risk-priority-table">
            <thead>
              <tr>
                <th>Prioridad</th>
                <th>ID</th>
                <th>Hallazgo</th>
                <th>Activo afectado</th>
                <th>P</th>
                <th>I</th>
                <th>P × I</th>
                <th>Nivel</th>
                <th>CVSS</th>
                <th>Severidad</th>
                <th>Tratamiento</th>
              </tr>
            </thead>

            <tbody>
              {risks.map((risk) => (
                <tr
                  key={risk.id}
                  className={risk.id === selectedRiskId ? 'selected-row' : ''}
                  onClick={() => setSelectedRiskId(risk.id)}
                >
                  <td>{risk.priority}</td>
                  <td>{risk.id}</td>
                  <td>{risk.finding}</td>
                  <td>{risk.asset}</td>
                  <td>{risk.probability}</td>
                  <td>{risk.impact}</td>
                  <td>{risk.riskScore}</td>
                  <td>
                    <span className={`risk-pill ${risk.riskClass}`}>
                      {risk.riskLevel}
                    </span>
                  </td>
                  <td>{risk.cvss.baseScore}</td>
                  <td>{risk.cvssSeverity}</td>
                  <td>{risk.treatment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="cvss-section">
        <div className="cvss-heading">
          <span>Cálculo CVSS v3.1</span>
          <h3>Detalle técnico de los vectores aplicados</h3>
          <p>
            Cada puntaje CVSS se calcula desde las métricas del vector. Estos
            valores respaldan técnicamente la severidad, mientras que la matriz
            Probabilidad × Impacto define la prioridad de negocio.
          </p>
        </div>

        {risks.map((risk) => (
          <article
            key={risk.id}
            className={`cvss-card ${
              risk.id === selectedRiskId ? 'selected' : ''
            }`}
            onClick={() => setSelectedRiskId(risk.id)}
          >
            <div className="cvss-card-title">
              <span>{risk.id}</span>
              <h4>{risk.finding}</h4>
              <strong>
                CVSS {risk.cvss.baseScore} — {risk.cvssSeverity}
              </strong>
            </div>

            <code>{risk.vector}</code>

            <div className="cvss-metrics-grid">
              <span>AV: {metricLabels.AV[risk.metrics.AV]}</span>
              <span>AC: {metricLabels.AC[risk.metrics.AC]}</span>
              <span>PR: {metricLabels.PR[risk.metrics.PR]}</span>
              <span>UI: {metricLabels.UI[risk.metrics.UI]}</span>
              <span>S: {metricLabels.S[risk.metrics.S]}</span>
              <span>C: {metricLabels.C[risk.metrics.C]}</span>
              <span>I: {metricLabels.I[risk.metrics.I]}</span>
              <span>A: {metricLabels.A[risk.metrics.A]}</span>
            </div>

            <div className="cvss-calculation-grid">
              <article>
                <span>ISS</span>
                <strong>{risk.cvss.iss.toFixed(6)}</strong>
                <p>1 − [(1 − C) × (1 − I) × (1 − A)]</p>
              </article>

              <article>
                <span>Impacto</span>
                <strong>{risk.cvss.impact.toFixed(4)}</strong>
                <p>
                  {risk.metrics.S === 'U'
                    ? '6.42 × ISS'
                    : '7.52 × (ISS − 0.029) − 3.25 × (ISS − 0.02)^15'}
                </p>
              </article>

              <article>
                <span>Explotabilidad</span>
                <strong>{risk.cvss.exploitability.toFixed(4)}</strong>
                <p>8.22 × AV × AC × PR × UI</p>
              </article>

              <article>
                <span>Base Score</span>
                <strong>{risk.cvss.baseScore}</strong>
                <p>
                  {risk.metrics.S === 'U'
                    ? 'Roundup mínimo(Impacto + Explotabilidad, 10)'
                    : 'Roundup mínimo(1.08 × [Impacto + Explotabilidad], 10)'}
                </p>
              </article>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default RiskMatrixBoard