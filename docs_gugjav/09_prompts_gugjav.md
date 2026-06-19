# 09. Bitácora de prompts y uso crítico de inteligencia artificial

## Inmobiliaria Terranova — Portal de clientes

## Prompt 1: Análisis inicial de la evaluación

### Prompt utilizado

Actúa como especialista en fundamentos de seguridad de la información y auditoría web. Necesito analizar las instrucciones de la evaluación para organizar un proyecto en React y archivos Markdown. La empresa que trabajaré será "Inmobiliaria Terranova", del rubro inmobiliario, y el portal custodia contratos y datos financieros de clientes. No quiero una respuesta genérica; necesito que identifiques qué archivos debo crear, qué debe contener cada uno y cómo se relaciona cada parte con la rúbrica de evaluación.

### Respuesta esperada

Se esperaba que la IA ordenara la evaluación en partes concretas, indicando la estructura del proyecto, los archivos Markdown necesarios, las imágenes requeridas, las secciones de React y los criterios principales para cumplir la rúbrica.

### Uso dado a la respuesta

La respuesta fue utilizada para definir la estructura del proyecto `auditoria_gugjav`, la carpeta `docs_gugjav`, la carpeta `img_gugjav` y los archivos principales del informe.

### Ajuste realizado

Se ajustó el contexto para tratar a Inmobiliaria Terranova como empresa auditada y no como ejemplo genérico. También se decidió que el análisis debía enfocarse en contratos y datos financieros, porque son los datos críticos del portal.

## Prompt 2: Presentación de la empresa auditada

### Prompt utilizado

Estoy trabajando el archivo `01_resumen_gugjav.md`. Necesito presentar formalmente a Inmobiliaria Terranova como empresa auditada, sin tratarla como una empresa ficticia dentro del informe. El portal de clientes custodia contratos y datos financieros. Ayúdame a redactar un resumen ejecutivo completo, con objetivo, alcance, datos críticos, ambiente controlado, marco ético y relación con la auditoría web. Debe quedar como una presentación seria de auditoría, no como una descripción simple de empresa.

### Respuesta esperada

Se esperaba una redacción formal para presentar la empresa, el sistema evaluado, los datos custodiados, el objetivo de la auditoría, el alcance autorizado y la importancia de la seguridad para el rubro inmobiliario.

### Uso dado a la respuesta

La información fue utilizada para construir el archivo `01_resumen_gugjav.md`, sirviendo como base del informe.

## Prompt 3: Profundización del hallazgo de Inyección SQL

### Prompt utilizado

Estoy trabajando el archivo `02_sqli_gugjav.md`. Ya tengo evidencia en DVWA del ataque de Inyección SQL con el payload `' OR '1'='1`. Necesito que me ayudes a construir el análisis del hallazgo, pero no quiero solo una definición. Quiero profundizar en la causa raíz, cómo funciona, qué activos afecta, cómo impactaría en el portal de Inmobiliaria Terranova y cómo se relaciona con contratos, datos financieros y base de datos. Además, necesito incluir CVSS, probabilidad, impacto, prevención y mitigación.

### Respuesta esperada

Se esperaba un análisis técnico y de negocio de la Inyección SQL, incorporando evidencia, explicación del payload, activos afectados, impacto en confidencialidad, integridad y disponibilidad, puntaje CVSS y controles de prevención.

### Uso dado a la respuesta

La respuesta fue usada para desarrollar el archivo `02_sqli_gugjav.md`.

### Ajuste realizado

Se verificó que el análisis no se limitara a explicar el ataque, sino que conectara la vulnerabilidad con el riesgo real para el portal de clientes de Inmobiliaria Terranova.

## Prompt 4: Validación de evidencia para SQL Injection

### Prompt utilizado

Tengo una captura de DVWA para SQL Injection. En la imagen se ve el módulo SQL Injection, el nivel de seguridad Low y varios registros devueltos después de usar el payload. Necesito que revises si esta evidencia sirve para mi archivo `sqli_gugjav.png`, considerando que la evaluación pide payload y resultado visible. Además, dime qué debería verse en la captura para que sea válida y cómo debo interpretarla en el informe de Inmobiliaria Terranova.

### Respuesta esperada

Se esperaba una revisión de la evidencia, indicando si la captura servía, qué elementos debía mostrar y cómo conectarla con el riesgo de exposición de contratos y datos financieros.

### Uso dado a la respuesta

La respuesta fue utilizada para confirmar la validez de la captura `sqli_gugjav.png` y mejorar la calidad de la evidencia antes de integrarla al informe.

### Ajuste realizado

Se actualizó la imagen para que el payload y los resultados fueran visibles de forma más clara.

## Prompt 5: Análisis del hallazgo XSS reflejado

### Prompt utilizado

Estoy trabajando el archivo `03_xss_gugjav.md` y ya tengo la captura `xss_gugjav.png` del módulo XSS Reflected en DVWA. Necesito que me ayudes a redactar el análisis como hallazgo de auditoría. Quiero que se explique el flujo vulnerable, la diferencia entre XSS reflejado y otros tipos de XSS, el impacto sobre la sesión del cliente, la confianza en el portal y la información visible, sin repetir exactamente la estructura del archivo de SQL Injection.

### Respuesta esperada

Se esperaba un análisis diferenciado, enfocado en navegador, sesión, interacción del usuario, suplantación visual, confianza del cliente y controles como codificación de salida y Content Security Policy.

### Uso dado a la respuesta

La respuesta fue utilizada para desarrollar el archivo `03_xss_gugjav.md`.

### Ajuste realizado 

Se cuidó que el riesgo de XSS no se presentara como idéntico al de SQL Injection, ya que afecta principalmente la interacción del usuario y no directamente la base de datos.


## Prompt 6: Análisis del hallazgo de Inyección de comandos

### Prompt utilizado

Estoy trabajando el archivo `04_comandos_gugjav.md`. Ya realicé la prueba en DVWA Command Injection usando el payload `127.0.0.1; cat /etc/passwd`. Necesito que el análisis se enfoque en infraestructura y servidor, no solamente en explicar el comando. Quiero que se analice el impacto sobre el servidor web, archivos internos, disponibilidad del portal, credenciales y continuidad operacional de Inmobiliaria Terranova.

### Respuesta esperada

Se esperaba un análisis técnico sobre ejecución de comandos, explicación del payload, impacto sobre sistema operativo, servidor, archivos internos, disponibilidad y medidas de contención o mitigación.

### Uso dado a la respuesta

La respuesta fue utilizada para desarrollar el archivo `04_comandos_gugjav.md`.

### Ajuste realizado

Se priorizó el enfoque de riesgo crítico porque esta vulnerabilidad puede comprometer directamente la infraestructura del portal.



## Prompt 7: Identificación de activos críticos

### Prompt utilizado

Estoy trabajando el archivo `05_activos_gugjav.md`. Necesito identificar los activos de información de Inmobiliaria Terranova según el portal de clientes. La empresa custodia contratos y datos financieros, por lo que necesito clasificar activos como base de datos, contratos digitales, credenciales, portal, servidor, respaldos y registros de actividad. Ayúdame a organizarlos por criticidad, confidencialidad, integridad y disponibilidad, relacionándolos con los ataques ya evaluados.

### Respuesta esperada

Se esperaba un inventario de activos, clasificación CIA, priorización de activos críticos y relación entre cada activo y las vulnerabilidades evaluadas.

### Uso dado a la respuesta

La respuesta fue utilizada para construir el archivo `05_activos_gugjav.md`.

### Ajuste realizado

Se ajustó la redacción para que el archivo no pareciera otro hallazgo técnico, sino una sección de gestión de activos y riesgos.

## Prompt 8: Construcción de la matriz de riesgo

### Prompt utilizado

Estoy trabajando el archivo `06_matriz_gugjav.md`. Ya tengo analizados los hallazgos de SQL Injection, XSS reflejado e Inyección de comandos, además de los activos críticos de Inmobiliaria Terranova. Necesito construir una matriz formal de riesgo usando probabilidad por impacto, incorporando CVSS como apoyo técnico, pero ajustando el riesgo al negocio inmobiliario. No quiero que repitas la explicación de los ataques; quiero que priorices, justifiques y recomiendes tratamiento del riesgo.

### Respuesta esperada

Se esperaba una matriz consolidada con probabilidad, impacto, nivel de riesgo, priorización, tratamiento recomendado y riesgo residual.

### Uso dado a la respuesta

La respuesta fue utilizada para construir el archivo `06_matriz_gugjav.md`.

### Ajuste realizado

Se revisó que la matriz no fuera solo una tabla, sino una herramienta de decisión para priorizar remediaciones en el portal de clientes.

## Prompt 9: Controles de seguridad por capas

### Prompt utilizado

Estoy trabajando el archivo `07_controles_gugjav.md`. Necesito proponer controles de seguridad para Inmobiliaria Terranova, pero no quiero repetir nuevamente los ataques. Quiero organizar los controles por capas: prevención, detección, respuesta, gestión de accesos, protección de datos, desarrollo seguro y monitoreo. Debe quedar claro qué control responde a SQL Injection, XSS reflejado e Inyección de comandos, y qué evidencia se espera para comprobar que el control fue aplicado.

### Respuesta esperada

Se esperaba una propuesta formal de controles técnicos, organizacionales y operacionales, asociada a cada hallazgo y priorizada según riesgo.

### Uso dado a la respuesta

La respuesta fue utilizada para desarrollar el archivo `07_controles_gugjav.md`.

### Ajuste realizado

Se decidió que el archivo debía tener estructura distinta a los hallazgos anteriores y enfocarse en defensa por capas.

## Prompt 10: Plan de recuperación y respuesta ante incidentes

### Prompt utilizado

Estoy trabajando el archivo `08_recuperacion_gugjav.md`. Necesito un plan de recuperación y respuesta ante incidentes para el portal de clientes de Inmobiliaria Terranova. El plan debe considerar escenarios de SQL Injection, XSS reflejado e Inyección de comandos, pero enfocado en qué hacer después del incidente: detección, contención, preservación de evidencia, erradicación, recuperación, comunicación y lecciones aprendidas.

### Respuesta esperada

Se esperaba un plan estructurado de respuesta ante incidentes, con fases, roles, acciones específicas por escenario, respaldo, restauración y criterios de recuperación segura.

### Uso dado a la respuesta

La respuesta fue utilizada para construir el archivo `08_recuperacion_gugjav.md`.

### Ajuste realizado

Se ajustó el enfoque para que el archivo no repitiera controles preventivos, sino que explicara cómo recuperar la operación de forma segura después de un incidente.

## Prompt 11: Revisión de estructura para evitar repetición

### Prompt utilizado

Los archivos `01` al `05` tienen información completa, pero noto que algunos siguen una estructura parecida. Necesito que me ayudes a revisar cómo diferenciar la estructura de los próximos archivos para que el informe no se vea repetitivo. Mantén el cumplimiento de la rúbrica, pero propón enfoques distintos para matriz de riesgo, controles, recuperación y bitácora de IA.

### Respuesta esperada

Se esperaba una propuesta de estructura diferente para cada archivo, manteniendo la profundidad técnica y la relación con la rúbrica.

### Uso dado a la respuesta

La respuesta permitió cambiar el enfoque desde el archivo `06` en adelante, evitando que todos los documentos siguieran el mismo orden.

### Ajuste realizado

Se decidió que la matriz sería un documento de priorización, controles sería defensa por capas, recuperación sería respuesta a incidentes y prompts sería una bitácora crítica del uso de IA.

## Prompt 12: Integración de Markdown en React

### Prompt utilizado

Tengo los archivos Markdown de la auditoría dentro de `docs_gugjav`, pero necesito que se visualicen en mi página React como un informe formal para Inmobiliaria Terranova. Necesito que me indiques cómo crear componentes para leer cada archivo `.md`, conectarlos en `App.jsx` y mantener una navegación por capítulos. No quiero una página genérica; debe verse como auditoría formal.

### Respuesta esperada

Se esperaba orientación para crear componentes React, conectar cada archivo Markdown y diseñar una navegación por secciones.

### Uso dado a la respuesta

La respuesta se usó para crear componentes como `Resumen.jsx`, `InyeccionSQL.jsx`, `XSS.jsx`, `Comandos.jsx`, `Activos.jsx` y componentes posteriores.

### Ajuste realizado

Se decidió revisar más adelante la página completa desde cero, para asegurar que el diseño final se vea como auditoría formal y no solo como una página React común.

## Prompt 13: Mejora visual del informe web

### Prompt utilizado

Mi página ya muestra la información de la auditoría, pero visualmente quiero que tenga formato de informe formal para Inmobiliaria Terranova. Necesito mejorar el diseño con fondo blanco, contenedores morados acordes a la paleta del proyecto, fuente más atractiva, portada formal, ficha técnica, navegación por capítulos y animaciones sutiles. No quiero que parezca una página React genérica.

### Respuesta esperada

Se esperaba una propuesta de diseño CSS y estructura visual que reforzara el carácter formal del informe.

### Uso dado a la respuesta

La respuesta se utilizó para mejorar la presentación visual de la aplicación React.

### Ajuste realizado

Se realizaron correcciones de color para evitar que el diseño se viera informal, especialmente ajustando tonos demasiado rosados y manteniendo una paleta morada más sobria.

## Prompt 14: Validación de coherencia final con la rúbrica

### Prompt utilizado

Necesito que revises mi auditoría completa como si fueras evaluador. Considera los archivos `01` al `09`, la empresa Inmobiliaria Terranova, el portal de clientes, los datos críticos, las evidencias de DVWA, el análisis CVSS, la matriz de riesgo, controles y recuperación. Indícame si el trabajo cumple la rúbrica, qué puntos están fuertes y qué debería mejorar antes de entregar.

### Respuesta esperada

Se espera una revisión objetiva del cumplimiento del trabajo, identificando fortalezas, brechas, coherencia entre archivos, calidad técnica, profundidad de análisis y recomendaciones finales.

### Uso esperado de la respuesta

Este prompt se utilizará antes de la entrega final para verificar que el informe sea consistente y completo.

### Ajuste previsto

La respuesta no se incorporará automáticamente. Se usará como lista de revisión para corregir errores, mejorar redacción y verificar que todos los archivos estén integrados correctamente.

# 4. Evidencia de uso crítico de IA

El uso de IA durante el trabajo fue crítico y guiado. No se utilizó para delegar completamente la evaluación, sino para apoyar etapas concretas del desarrollo.

El estudiante aportó:

* El caso de empresa: Inmobiliaria Terranova.
* El rubro: inmobiliaria.
* El sistema evaluado: portal de clientes.
* Los datos críticos: contratos y datos financieros.
* Las evidencias obtenidas en DVWA.
* La estructura del proyecto en React.
* Los nombres de archivos y sufijo `gugjav`.
* La revisión de imágenes y capturas.
* Las decisiones de diseño visual.
* La solicitud de fuentes confiables.
* La corrección de enfoque para evitar respuestas genéricas.
* La decisión de diferenciar la estructura de los archivos.

La IA apoyó en:

* Organización del informe.
* Redacción técnica.
* Relación entre vulnerabilidades y activos.
* Construcción de matriz de riesgo.
* Propuesta de controles.
* Plan de recuperación.
* Integración conceptual con React.
* Mejora de redacción y presentación.

# 5. Criterios aplicados para aceptar o modificar respuestas de IA

Las respuestas de IA fueron revisadas antes de incorporarse al trabajo. Se aplicaron los siguientes criterios:

| Criterio                | Aplicación                                                                                          |
--  |
| Pertinencia             | La respuesta debía relacionarse con Inmobiliaria Terranova y no con una empresa genérica.           |
| Profundidad técnica     | La respuesta debía explicar vulnerabilidad, impacto, controles y riesgo.                            |
| Relación con la rúbrica | La respuesta debía cubrir evidencia, CVSS, matriz, controles o recuperación según correspondiera.   |
| Coherencia con el caso  | La información debía considerar contratos y datos financieros.                                      |
| Lenguaje de informe     | El texto debía servir para un documento formal, no como explicación informal.                       |
| Fuentes confiables      | Se priorizaron referencias a OWASP, NIST, FIRST y material de clases.                               |
| No automatización total | La IA no debía resolver sin contexto; debía trabajar sobre información entregada. |

# 6. Reflexión final sobre el uso de IA

El uso de inteligencia artificial permitió mejorar la organización, profundidad y presentación del trabajo, pero el desarrollo no dependió únicamente de respuestas automáticas. La IA fue utilizada como un agente de apoyo para ordenar ideas, contrastar criterios y mejorar la calidad del informe.

El valor principal estuvo en formular prompts con contexto específico. En lugar de pedir “hacer una auditoría”, se trabajó por etapas: primero se definió la empresa y el alcance, luego se analizaron vulnerabilidades, después se identificaron activos, se construyó la matriz de riesgo, se propusieron controles y finalmente se definió un plan de recuperación.

Esto permitió que el resultado final fuera más coherente con el caso de Inmobiliaria Terranova y con los requerimientos de la evaluación.

La experiencia demuestra que la calidad del resultado depende directamente de la calidad del prompt. Mientras más claro fue el contexto entregado, más útil fue la respuesta generada. Por eso, la IA se utilizó como apoyo técnico y metodológico, manteniendo la responsabilidad del análisis, revisión y decisiones finales en el estudiante.

