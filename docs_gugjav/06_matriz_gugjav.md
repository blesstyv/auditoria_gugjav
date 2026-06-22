# 06. Matriz de riesgo

## Síntesis de evaluación

La matriz de riesgo del portal de clientes de Inmobiliaria Terranova se construye cruzando dos dimensiones: la severidad técnica calculada mediante CVSS v3.1 y el impacto de negocio determinado por la relación Probabilidad × Impacto.

Los tres hallazgos evaluados son:

- Inyección de comandos.
- Inyección SQL.
- XSS reflejado.

## Resultado general

| ID | Hallazgo | Probabilidad | Impacto | Resultado | Nivel | CVSS | Prioridad |
|---|---:|---:|---:|---:|---|---:|---:|
| Inyección de comandos | 4 | 5 | 20 | Crítico | 8.8 | 1 |
| Inyección SQL | 4 | 5 | 20 | Crítico | 8.3 | 2 |
| XSS reflejado | 3 | 4 | 12 | Alto | 6.1 | 3 |

## Interpretación ejecutiva

La prioridad más alta corresponde a Inyección de comandos, debido a que compromete directamente el servidor web, el sistema operativo y la continuidad operacional.

La segunda prioridad corresponde a Inyección SQL, porque afecta la base de datos donde podrían almacenarse contratos, datos financieros y registros de clientes.

El XSS reflejado se mantiene como riesgo alto, principalmente por su impacto sobre la sesión de usuario, la navegación segura y la confianza en el portal.

---

## Justificación metodológica de la matriz de riesgo

La matriz de riesgo fue construida con el propósito de transformar los hallazgos técnicos de la auditoría en una herramienta de priorización para la toma de decisiones. En este caso, no basta con identificar que existen vulnerabilidades en el portal de clientes de Inmobiliaria Terranova; también es necesario determinar cuáles representan mayor urgencia de tratamiento, qué activos se ven afectados y qué impacto podrían generar sobre la operación de la empresa.

Para lograrlo, se utilizaron dos criterios complementarios:

- **CVSS v3.1**, para calcular la severidad técnica de cada vulnerabilidad.
- **Probabilidad × Impacto**, para traducir esa severidad técnica al contexto del negocio inmobiliario.

De esta forma, la matriz no se basa solamente en una apreciación subjetiva, sino que combina una medición técnica estandarizada con una evaluación contextual aplicada al portal auditado.

## Justificación del uso de CVSS v3.1

Se utilizó CVSS v3.1 porque permite asignar un puntaje técnico a cada vulnerabilidad mediante una fórmula reconocida en seguridad informática. Este puntaje ayuda a comparar la severidad de vulnerabilidades diferentes bajo un mismo criterio.

En esta auditoría, CVSS fue útil porque las vulnerabilidades evaluadas tienen naturalezas distintas:

- Inyección SQL afecta principalmente la base de datos.
- XSS reflejado afecta principalmente la interacción del usuario con el navegador.
- Inyección de comandos afecta directamente el servidor y el sistema operativo.

Sin una métrica común, sería más difícil justificar técnicamente por qué una vulnerabilidad debe corregirse antes que otra.

El CVSS se usó como insumo técnico, pero no como único criterio de decisión. Esto es importante porque el puntaje CVSS mide la severidad de la vulnerabilidad, mientras que la matriz de riesgo incorpora además el impacto sobre el negocio, los activos críticos y la continuidad operacional de Inmobiliaria Terranova.

## Justificación del uso de Probabilidad × Impacto

La fórmula utilizada fue:

```text
Riesgo = Probabilidad × Impacto