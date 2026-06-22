# 06. Matriz de riesgo de la auditoría

## Inmobiliaria Terranova — Portal de clientes

## 1. Propósito de la matriz

La matriz de riesgo tiene como propósito consolidar los hallazgos identificados durante la auditoría de seguridad web realizada al portal de clientes de Inmobiliaria Terranova.

Este documento no busca ordenar los hallazgos según su nivel de riesgo para el negocio. Para ello, se consideran tres elementos principales:

* La severidad técnica del hallazgo.
* La probabilidad de explotación.
* El impacto sobre los activos críticos de Inmobiliaria Terranova.

El objetivo final es priorizar las acciones de remediación, identificando qué vulnerabilidades deben corregirse primero y qué tratamiento de riesgo corresponde aplicar.

## 2. Contexto de riesgo para Inmobiliaria Terranova

Inmobiliaria Terranova administra un portal de clientes que custodia información crítica para el rubro inmobiliario, principalmente contratos y datos financieros de clientes.

En este contexto, una vulnerabilidad web puede generar impactos relevantes sobre:

* Confidencialidad de contratos.
* Protección de datos financieros.
* Integridad de estados de pago.
* Disponibilidad del portal de clientes.
* Continuidad de procesos comerciales.
* Confianza de clientes actuales y futuros.
* Reputación de la empresa.
* Capacidad de respuesta ante incidentes.

Por esta razón, los hallazgos no se evalúan únicamente desde una perspectiva técnica. También se analizan según el efecto que podrían provocar sobre el negocio inmobiliario.

## 3. Hallazgos considerados en la matriz

La matriz se construye considerando los tres hallazgos técnicos evaluados en el laboratorio DVWA:

| ID | Hallazgo              | Tipo de vulnerabilidad                   | Archivo asociado        |
| -- | --------------------- | ---------------------------------------- | ----------------------- |
| H1 | Inyección SQL         | Vulnerabilidad de acceso a base de datos | `02_sqli_gugjav.md`     |
| H2 | XSS reflejado         | Vulnerabilidad del lado cliente          | `03_xss_gugjav.md`      |
| H3 | Inyección de comandos | Vulnerabilidad con impacto en servidor   | `04_comandos_gugjav.md` |

Estos hallazgos se relacionan directamente con los activos críticos identificados en `05_activos_gugjav.md`.

## 4. Metodología de evaluación

Para construir la matriz se utiliza el criterio:

```text
Riesgo = Probabilidad × Impacto
```

La probabilidad representa qué tan factible es que una amenaza explote una vulnerabilidad. El impacto representa el daño potencial sobre los activos, operaciones, clientes y reputación de Inmobiliaria Terranova.

También se considera el puntaje CVSS v3.1 definido en cada hallazgo, pero el nivel final de riesgo se ajusta al contexto del negocio inmobiliario. Esto es importante porque un mismo hallazgo técnico puede tener distinto impacto según la industria, el tipo de datos y la criticidad del sistema afectado.

## 5. Escala de impacto

El impacto se evalúa en una escala de 1 a 5.

| Valor | Nivel    | Criterio                                                                                          |
| ----: | -------- | ------------------------------------------------------------------------------------------------- |
|     1 | Muy bajo | Afecta información no crítica o sin impacto relevante para el negocio.                            |
|     2 | Bajo     | Afecta información limitada o funcionalidades secundarias.                                        |
|     3 | Medio    | Puede afectar procesos internos o datos de importancia moderada.                                  |
|     4 | Alto     | Puede comprometer datos personales, sesiones, documentos o procesos relevantes del portal.        |
|     5 | Crítico  | Puede comprometer contratos, datos financieros, base de datos, servidor o continuidad del portal. |

## 6. Criterio de clasificación del riesgo

El nivel de riesgo se obtiene multiplicando probabilidad por impacto.

```text
Riesgo = Probabilidad × Impacto
```

La escala utilizada es la siguiente:

| Resultado | Nivel de riesgo | Interpretación                                             |
| --------: | --------------- | ---------------------------------------------------------- |
|     1 a 4 | Bajo            | Puede ser tratado en ciclos normales de mejora.            |
|     5 a 9 | Medio           | Requiere planificación de corrección y seguimiento.        |
|   10 a 15 | Alto            | Requiere corrección prioritaria.                           |
|   16 a 25 | Crítico         | Requiere atención inmediata y plan de remediación urgente. |


## 7. Tabla consolidada de riesgos

| ID | Hallazgo              | Activos afectados                                                         | CVSS estimado | Probabilidad | Impacto | Resultado | Nivel de riesgo |
| -- | --------------------- | ------------------------------------------------------------------------- | ------------: | -----------: | ------: | --------: | --------------- |
| H1 | Inyección SQL         | Base de datos, contratos, datos financieros, credenciales                 |      8.3 Alto |            4 |       5 |        20 | Crítico         |
| H2 | XSS reflejado         | Sesión del usuario, portal, datos visibles, confianza institucional       |     6.1 Medio |            3 |       4 |        12 | Alto            |
| H3 | Inyección de comandos | Servidor web, sistema operativo, archivos internos, portal, base de datos |      8.8 Alto |            4 |       5 |        20 | Crítico         |


## 8. Matriz probabilidad por impacto

La siguiente matriz permite ubicar los hallazgos según su probabilidad e impacto.

| Probabilidad / Impacto | 1 Muy bajo | 2 Bajo | 3 Medio | 4 Alto  | 5 Crítico |
| ---------------------- | ---------- | ------ | ------- | ------- | --------- |
| 5 Muy alta             | Medio      | Alto   | Alto    | Crítico | Crítico   |
| 4 Alta                 | Bajo       | Medio  | Alto    | Crítico | Crítico   |
| 3 Media                | Bajo       | Medio  | Medio   | Alto    | Alto      |
| 2 Baja                 | Bajo       | Bajo   | Medio   | Medio   | Alto      |
| 1 Muy baja             | Bajo       | Bajo   | Bajo    | Medio   | Medio     |

Ubicación de hallazgos:

| Hallazgo                 | Probabilidad | Impacto | Ubicación en matriz |
| ------------------------ | -----------: | ------: | ------------------- |
| H1 Inyección SQL         |            4 |       5 | Crítico             |
| H2 XSS reflejado         |            3 |       4 | Alto                |
| H3 Inyección de comandos |            4 |       5 | Crítico             |


## 9. Mapa de calor de riesgos

El mapa de calor permite visualizar la concentración de riesgo de los hallazgos evaluados.

| Nivel   | Hallazgos ubicados                         | Interpretación                                                                                     |
| ------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| Crítico | H1 Inyección SQL, H3 Inyección de comandos | Deben ser tratados de forma inmediata, debido a su impacto sobre datos críticos e infraestructura. |
| Alto    | H2 XSS reflejado                           | Debe corregirse con prioridad alta, especialmente si afecta secciones visibles para clientes.      |
| Medio   | No se registran hallazgos en este nivel    | No aplica para los hallazgos evaluados.                                                            |
| Bajo    | No se registran hallazgos en este nivel    | No aplica para los hallazgos evaluados.                                                            |

La matriz muestra que dos de los tres hallazgos se ubican en nivel crítico. Esto indica que el portal de clientes requiere acciones de remediación prioritarias antes de considerar el sistema como aceptable desde el punto de vista de seguridad.


## 10. Priorización de remediación

| Prioridad | Hallazgo              | Nivel de riesgo | Acción recomendada                                                                                                              |
| --------: | --------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------- |
|         1 | Inyección de comandos | Crítico         | Contención inmediata, revisión del servidor, eliminación de ejecución insegura de comandos y endurecimiento de infraestructura. |
|         2 | Inyección SQL         | Crítico         | Implementación urgente de consultas parametrizadas, validación de entradas y revisión de permisos de base de datos.             |
|         3 | XSS reflejado         | Alto            | Codificación de salida contextual, validación de entradas, protección de sesiones y aplicación de Content Security Policy.      |

Aunque Inyección SQL e Inyección de comandos tienen el mismo resultado de riesgo, se prioriza primero la Inyección de comandos porque puede comprometer directamente el servidor, afectar la disponibilidad del portal y facilitar acceso a archivos internos o configuraciones sensibles.


## 11. Justificación del riesgo por hallazgo

### H1. Inyección SQL

La Inyección SQL se clasifica como riesgo crítico porque afecta directamente la base de datos del portal. En el contexto de Inmobiliaria Terranova, la base de datos puede contener contratos, datos financieros, credenciales y datos personales de clientes.

La probabilidad se clasifica como alta porque este tipo de vulnerabilidad puede explotarse mediante entradas manipuladas si existen formularios, filtros o parámetros vulnerables.

El impacto se clasifica como crítico porque la explotación podría permitir exposición o alteración de información esencial para el negocio inmobiliario.

Resultado:

```text
Probabilidad 4 × Impacto 5 = 20
Nivel de riesgo: Crítico
```

### H2. XSS reflejado

El XSS reflejado se clasifica como riesgo alto. Técnicamente requiere interacción de una víctima, por ejemplo mediante un enlace o una solicitud manipulada, por lo que su probabilidad se considera media.

El impacto se considera alto porque puede afectar la sesión del usuario, manipular información visible en el portal, inducir acciones engañosas y disminuir la confianza del cliente en la plataforma.

Aunque su severidad técnica es menor que la Inyección SQL o la Inyección de comandos, en un portal que muestra contratos y estados financieros puede tener consecuencias relevantes sobre la confianza institucional.

Resultado:

```text
Probabilidad 3 × Impacto 4 = 12
Nivel de riesgo: Alto
```

### H3. Inyección de comandos

La Inyección de comandos se clasifica como riesgo crítico porque puede permitir ejecución de comandos en el sistema operativo del servidor.

La probabilidad se clasifica como alta si la funcionalidad vulnerable está disponible dentro del portal y no existen controles de validación adecuados.

El impacto se clasifica como crítico porque podría afectar el servidor web, archivos internos, configuraciones, credenciales, disponibilidad del portal y eventualmente la base de datos.

Resultado:

```text
Probabilidad 4 × Impacto 5 = 20
Nivel de riesgo: Crítico
```


## 12. Tratamiento recomendado del riesgo

Para cada hallazgo se define un tratamiento de riesgo. Los tratamientos considerados son:

* Mitigar: reducir la probabilidad o impacto mediante controles.
* Evitar: eliminar la actividad o funcionalidad que genera el riesgo.
* Transferir: compartir el impacto mediante seguros, contratos o proveedores.
* Aceptar: asumir el riesgo de forma documentada.

| Hallazgo              | Nivel de riesgo | Tratamiento recomendado       | Justificación                                                                                   |
| --------------------- | --------------- | ----------------------------- | ----------------------------------------------------------------------------------------------- |
| Inyección SQL         | Crítico         | Mitigar                       | La funcionalidad del portal debe mantenerse, pero corregida mediante controles técnicos.        |
| XSS reflejado         | Alto            | Mitigar                       | La funcionalidad puede mantenerse si se aplica codificación de salida y protección de sesiones. |
| Inyección de comandos | Crítico         | Mitigar y evitar parcialmente | Se debe mitigar el riesgo y evitar la ejecución directa de comandos con entradas de usuario.    |

No se recomienda aceptar ninguno de los riesgos identificados, debido a que todos se relacionan con activos relevantes del portal. La transferencia puede considerarse como medida complementaria, pero no reemplaza la corrección técnica.


## 13. Relación con activos críticos

| Hallazgo              | Activo principal            | Impacto sobre el negocio                                                         |
| --------------------- | --------------------------- | -------------------------------------------------------------------------------- |
| Inyección SQL         | Base de datos de clientes   | Puede exponer contratos, datos financieros y credenciales.                       |
| XSS reflejado         | Portal y sesión del cliente | Puede manipular la experiencia del usuario y afectar la confianza institucional. |
| Inyección de comandos | Servidor web                | Puede comprometer infraestructura, archivos internos y continuidad operacional.  |

La relación entre hallazgo y activo permite demostrar que los riesgos no son teóricos. Cada vulnerabilidad puede afectar componentes reales del portal y generar consecuencias para la empresa.


## 14. Relación con confidencialidad, integridad y disponibilidad

| Hallazgo              | Confidencialidad | Integridad | Disponibilidad | Pilar más afectado                       |
| --------------------- | ---------------- | ---------- | -------------- | ---------------------------------------- |
| Inyección SQL         | Alta             | Alta       | Media          | Confidencialidad e integridad            |
| XSS reflejado         | Media            | Media      | Baja           | Integridad de la interacción del usuario |
| Inyección de comandos | Alta             | Alta       | Alta           | Disponibilidad e integridad del servidor |

Esta clasificación demuestra que los hallazgos no afectan de la misma manera a la organización. La Inyección SQL se concentra principalmente en la base de datos, el XSS reflejado afecta la interacción del cliente con el portal, y la Inyección de comandos compromete la infraestructura que sostiene el servicio.

## 15. Plan de acción priorizado

### Acción 1: Contener y corregir Inyección de comandos

Se recomienda revisar cualquier funcionalidad que ejecute procesos del sistema operativo. La aplicación no debe construir comandos usando entradas del usuario. Si la funcionalidad es necesaria, se debe reemplazar por APIs seguras, aplicar listas blancas estrictas y ejecutar procesos con permisos mínimos.

### Acción 2: Corregir Inyección SQL

Se recomienda reemplazar consultas inseguras por consultas parametrizadas, validar entradas del lado servidor, revisar formularios, buscadores, filtros y parámetros de URL, y reducir privilegios de la cuenta de conexión a la base de datos.

### Acción 3: Corregir XSS reflejado

Se recomienda aplicar codificación de salida contextual, validar entradas, reforzar cookies de sesión, aplicar Content Security Policy y revisar todos los puntos donde se refleje información ingresada por usuarios.

### Acción 4: Validar remediaciones

Después de aplicar correcciones, deben ejecutarse pruebas de seguridad para confirmar que los payloads ya no producen el resultado observado en el laboratorio.

### Acción 5: Actualizar documentación y controles

Toda corrección debe quedar documentada en procedimientos de desarrollo seguro, bitácoras de cambio, plan de monitoreo y políticas internas de seguridad.


## 16. Riesgo residual esperado

El riesgo residual es el nivel de riesgo que permanece después de aplicar controles.

| Hallazgo              | Riesgo inicial | Controles esperados                                                           | Riesgo residual estimado |
| --------------------- | -------------- | ----------------------------------------------------------------------------- | ------------------------ |
| Inyección SQL         | Crítico        | Consultas parametrizadas, validación, mínimo privilegio, monitoreo            | Medio                    |
| XSS reflejado         | Alto           | Codificación de salida, CSP, validación, cookies seguras                      | Bajo a medio             |
| Inyección de comandos | Crítico        | Eliminación de comandos inseguros, APIs seguras, mínimo privilegio, hardening | Medio                    |

El riesgo residual no desaparece por completo, pero puede reducirse a niveles aceptables si los controles son implementados, probados y monitoreados.

