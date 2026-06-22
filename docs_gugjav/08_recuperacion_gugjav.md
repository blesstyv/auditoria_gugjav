# 08. Plan de recuperación y respuesta ante incidentes

## Inmobiliaria Terranova — Portal de clientes

## 1. Propósito del documento

El propósito de este documento es definir un plan de respuesta, recuperación y continuidad operacional para el portal de clientes de Inmobiliaria Terranova, considerando los riesgos identificados durante la auditoría de seguridad web.

Este plan se enfoca en la recuperación frente a incidentes asociados a:

* Inyección SQL.
* XSS reflejado.
* Inyección de comandos.
* Exposición de contratos.
* Compromiso de datos financieros de clientes.
* Afectación del servidor web.
* Indisponibilidad del portal.

El objetivo no es solo restaurar el servicio, sino recuperar la operación de forma segura, preservar evidencia, proteger a los clientes y evitar que el incidente vuelva a ocurrir.

## 2. Alcance del plan

Este plan aplica al portal de clientes de Inmobiliaria Terranova y a los activos asociados a su operación.

### Incluye

* Portal web de clientes.
* Base de datos del portal.
* Contratos digitales.
* Datos financieros de clientes.
* Credenciales de usuarios.
* Servidor web.
* Registros de actividad.
* Copias de respaldo.
* Procedimientos de notificación y escalamiento.

### No incluye

* Sistemas externos no relacionados con el portal.
* Infraestructura de terceros que no esté bajo control de la empresa.
* Ataques fuera del alcance de la auditoría.
* Procesos comerciales manuales no vinculados al portal digital.

## 3. Principios del plan de recuperación

El plan se basa en los siguientes principios:

| Principio                 | Aplicación en Inmobiliaria Terranova                                           |
| ------------------------- | ------------------------------------------------------------------------------ |
| Contención temprana       | Evitar que el incidente siga afectando el portal o los datos.                  |
| Preservación de evidencia | Conservar registros, capturas, logs y datos técnicos para investigación.       |
| Recuperación segura       | Restaurar el servicio solo cuando exista evidencia de corrección y validación. |
| Protección del cliente    | Priorizar la confidencialidad de contratos y datos financieros.                |
| Comunicación responsable  | Informar internamente y, si corresponde, a clientes o autoridades.             |
| Mejora continua           | Documentar lecciones aprendidas y fortalecer controles.                        |

## 4. Roles y responsabilidades

| Rol o área                            | Responsabilidad principal                                                                    |
| ------------------------------------- | -------------------------------------------------------------------------------------------- |
| Equipo de seguridad de la información | Coordinar la respuesta, evaluar impacto, definir contención y validar recuperación.          |
| Equipo de desarrollo                  | Corregir vulnerabilidades en el código del portal.                                           |
| Equipo de infraestructura             | Aislar servidores, revisar configuraciones, restaurar servicios y validar integridad.        |
| Administración del portal             | Revisar cuentas, permisos, accesos y actividad de usuarios.                                  |
| Soporte TI                            | Recibir reportes, registrar incidentes y apoyar a usuarios afectados.                        |
| Área legal o cumplimiento             | Evaluar obligaciones frente a exposición de datos personales, contratos o datos financieros. |
| Gerencia o dirección                  | Aprobar decisiones críticas, recursos, comunicación y continuidad operacional.               |

## 5. Fases del proceso de respuesta

El proceso de respuesta ante incidentes se organiza en seis fases.

| Fase                    | Objetivo                                                                                 |
| ----------------------- | ---------------------------------------------------------------------------------------- |
| 1. Preparación          | Tener procedimientos, responsables, respaldos y herramientas listas antes del incidente. |
| 2. Detección y análisis | Identificar señales de incidente, confirmar alcance e impacto.                           |
| 3. Contención           | Limitar el daño y evitar que el incidente se propague.                                   |
| 4. Erradicación         | Eliminar la causa raíz, cerrar vulnerabilidades y remover accesos no autorizados.        |
| 5. Recuperación         | Restaurar el servicio de forma segura y validar funcionamiento.                          |
| 6. Lecciones aprendidas | Documentar el incidente y mejorar controles para evitar repetición.                      |

## 6. Fase 1: Preparación

La preparación corresponde a todas las acciones que Inmobiliaria Terranova debe tener listas antes de que ocurra un incidente.

### Acciones necesarias

* Mantener inventario actualizado de activos críticos.
* Definir responsables de respuesta ante incidentes.
* Mantener copias de respaldo de base de datos, documentos y configuración.
* Probar periódicamente la restauración de respaldos.
* Establecer canales internos de comunicación ante incidentes.
* Definir criterios para clasificar la gravedad de un evento.
* Mantener procedimientos de escalamiento.
* Registrar configuraciones críticas del servidor.
* Mantener control de versiones del código del portal.
* Capacitar al equipo técnico en respuesta ante incidentes.

### Evidencia esperada

* Documento de roles y contactos.
* Registro de respaldos.
* Pruebas de restauración.
* Inventario de activos.
* Procedimientos de escalamiento.
* Bitácora de simulacros o pruebas.

## 7. Fase 2: Detección y análisis

La detección y análisis permiten confirmar si existe un incidente real y determinar su alcance.

### Señales de alerta

| Señal                                   | Posible incidente asociado                      |
| --------------------------------------- | ----------------------------------------------- |
| Consultas inusuales a la base de datos  | Inyección SQL.                                  |
| Errores repetidos del servidor          | Intentos de explotación o comandos malformados. |
| Parámetros con scripts o etiquetas HTML | XSS reflejado.                                  |
| Ejecución de procesos inesperados       | Inyección de comandos.                          |
| Accesos desde ubicaciones anómalas      | Compromiso de credenciales.                     |
| Descarga masiva de documentos           | Exposición de contratos o datos financieros.    |
| Cambios inesperados en archivos         | Compromiso del servidor.                        |

### Acciones de análisis

* Revisar logs de acceso.
* Revisar logs de errores.
* Identificar usuario, IP, fecha y hora del evento.
* Determinar qué módulo fue afectado.
* Confirmar si hubo acceso a contratos o datos financieros.
* Revisar si se ejecutaron comandos no autorizados.
* Verificar si hubo modificación o eliminación de información.
* Clasificar la gravedad del incidente.

## 8. Fase 3: Contención

La contención busca detener el avance del incidente y limitar el daño.

### Contención inmediata

| Incidente                  | Acción de contención                                             |
| -------------------------- | ---------------------------------------------------------------- |
| Inyección SQL              | Deshabilitar temporalmente el formulario o parámetro vulnerable. |
| XSS reflejado              | Bloquear la URL, parámetro o campo vulnerable.                   |
| Inyección de comandos      | Aislar la funcionalidad afectada y revisar el servidor.          |
| Compromiso de credenciales | Forzar cambio de contraseña e invalidar sesiones activas.        |
| Exposición de contratos    | Restringir acceso al módulo documental hasta confirmar alcance.  |
| Afectación del servidor    | Aislar el servidor de red si existe sospecha de compromiso.      |

### Criterio de contención

La contención no debe destruir evidencia. Antes de eliminar archivos, reiniciar servicios o modificar configuraciones, se deben respaldar logs, capturas, registros y datos técnicos relevantes.

## 9. Fase 4: Erradicación

La erradicación consiste en eliminar la causa raíz del incidente.

### Acciones generales

* Corregir el código vulnerable.
* Eliminar consultas SQL concatenadas.
* Implementar consultas parametrizadas.
* Aplicar codificación de salida contextual.
* Eliminar llamadas inseguras al sistema operativo.
* Revisar permisos de cuentas técnicas.
* Cambiar credenciales comprometidas.
* Revisar cuentas administrativas.
* Eliminar archivos maliciosos si existieran.
* Actualizar configuraciones inseguras.
* Aplicar parches pendientes.

### Validación de erradicación

Antes de recuperar el servicio, se debe comprobar que:

* El payload de SQL Injection ya no altera consultas.
* El payload de XSS se muestra como texto y no se ejecuta.
* El payload de Command Injection ya no ejecuta comandos.
* No existen archivos no autorizados en el servidor.
* Las credenciales comprometidas fueron cambiadas.
* Los permisos fueron reducidos al mínimo necesario.

## 10. Fase 5: Recuperación

La recuperación consiste en restaurar el portal de clientes de forma segura y controlada.

### Acciones de recuperación

1. Restaurar servicios afectados.
2. Verificar integridad de la base de datos.
3. Validar integridad de contratos digitales.
4. Revisar estados de pago y registros financieros.
5. Restaurar información desde respaldos confiables si corresponde.
6. Validar que los respaldos no contengan la vulnerabilidad o alteraciones.
7. Ejecutar pruebas funcionales del portal.
8. Ejecutar pruebas de seguridad posteriores a la corrección.
9. Monitorear actividad durante el retorno a operación.
10. Confirmar que los clientes puedan acceder de forma segura.

### Criterio de retorno a operación

El portal solo debe volver a operación normal cuando se cumplan las siguientes condiciones:

* La vulnerabilidad fue corregida.
* La integridad de datos fue validada.
* Los accesos fueron revisados.
* No hay evidencia de persistencia maliciosa.
* Los respaldos restaurados son confiables.
* Los logs muestran operación estable.
* El equipo responsable autoriza el retorno.

## 11. Fase 6: Lecciones aprendidas

Después de controlar y recuperar el servicio, Inmobiliaria Terranova debe realizar una revisión posterior al incidente.

### Elementos a documentar

* Fecha y hora del incidente.
* Cómo fue detectado.
* Vulnerabilidad explotada.
* Activos afectados.
* Datos comprometidos o potencialmente comprometidos.
* Usuarios afectados.
* Tiempo de indisponibilidad.
* Acciones de contención aplicadas.
* Acciones de recuperación aplicadas.
* Controles que fallaron.
* Controles nuevos implementados.
* Recomendaciones de mejora.

### Resultado esperado

El objetivo de esta fase es mejorar la capacidad de prevención, detección, respuesta y recuperación de la empresa frente a futuros incidentes.

## 12. Escenario de recuperación: Inyección SQL

### Riesgo principal

La Inyección SQL puede afectar la base de datos del portal, comprometiendo contratos, datos financieros, credenciales y datos personales.

### Acciones específicas

1. Bloquear temporalmente el punto vulnerable.
2. Preservar logs de consultas y accesos.
3. Identificar registros consultados o modificados.
4. Revisar si hubo acceso a contratos o datos financieros.
5. Cambiar credenciales si existe sospecha de exposición.
6. Corregir consultas inseguras mediante parametrización.
7. Revisar permisos de la cuenta de base de datos.
8. Restaurar información desde respaldo si hubo alteración.
9. Validar integridad de contratos y estados financieros.
10. Ejecutar pruebas de seguridad antes de habilitar el módulo.

### Evidencia requerida

* Logs de base de datos.
* Logs de aplicación.
* Registro de usuarios afectados.
* Registro de tablas o documentos consultados.
* Evidencia de corrección del código.
* Evidencia de prueba posterior.

## 13. Escenario de recuperación: XSS reflejado

### Riesgo principal

El XSS reflejado puede afectar la sesión del usuario, la visualización del portal y la confianza del cliente.

### Acciones específicas

1. Bloquear URL, campo o parámetro vulnerable.
2. Preservar ejemplos de enlaces o solicitudes manipuladas.
3. Revisar si usuarios interactuaron con enlaces maliciosos.
4. Invalidar sesiones potencialmente afectadas.
5. Revisar cookies y configuración de sesión.
6. Aplicar codificación de salida contextual.
7. Implementar o reforzar Content Security Policy.
8. Revisar formularios, buscadores y mensajes reflejados.
9. Ejecutar pruebas para confirmar que el script ya no se ejecuta.
10. Comunicar recomendaciones a usuarios si corresponde.

### Evidencia requerida

* Capturas de payload.
* Logs de solicitudes.
* Registro de sesiones afectadas.
* Evidencia de corrección en frontend o backend.
* Evidencia de configuración de cabeceras de seguridad.

## 14. Escenario de recuperación: Inyección de comandos

### Riesgo principal

La Inyección de comandos puede comprometer el servidor web, ejecutar instrucciones no autorizadas, exponer archivos internos y afectar la disponibilidad del portal.

### Acciones específicas

1. Aislar la funcionalidad vulnerable.
2. Preservar logs del servidor y procesos ejecutados.
3. Identificar comandos ejecutados.
4. Revisar archivos modificados.
5. Revisar credenciales, variables de entorno y configuraciones.
6. Aislar el servidor si existe sospecha de compromiso.
7. Eliminar ejecución directa de comandos con entradas de usuario.
8. Reemplazar comandos por APIs seguras.
9. Aplicar mínimo privilegio a la cuenta del servicio.
10. Restaurar desde una imagen limpia si no se puede garantizar integridad.
11. Validar servicios antes de volver a producción.

### Evidencia requerida

* Logs del sistema.
* Lista de procesos ejecutados.
* Hashes o revisión de integridad de archivos.
* Registro de credenciales rotadas.
* Evidencia de hardening aplicado.
* Evidencia de prueba posterior.

## 15. Clasificación de severidad del incidente

| Nivel   | Descripción                                                        | Ejemplo en Inmobiliaria Terranova                                                    |
| ------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| Bajo    | Evento menor sin afectación de datos críticos.                     | Intento bloqueado sin impacto.                                                       |
| Medio   | Afecta un módulo limitado sin exposición confirmada.               | Error controlado en formulario.                                                      |
| Alto    | Puede afectar datos personales, sesiones o documentos.             | XSS explotado en sección visible para clientes.                                      |
| Crítico | Compromete contratos, datos financieros, servidor o base de datos. | SQLi con exposición de registros o Command Injection con acceso a archivos internos. |

## 16. Plan de comunicación

La comunicación debe ser clara, responsable y proporcional al impacto del incidente.

### Comunicación interna

Debe incluir:

* Descripción del incidente.
* Sistema afectado.
* Fecha y hora de detección.
* Activos involucrados.
* Medidas de contención.
* Riesgo preliminar.
* Responsables asignados.
* Próximos pasos.

### Comunicación a clientes

Debe considerarse si existe exposición o sospecha razonable de exposición de datos personales, contratos o datos financieros.

El mensaje debe ser claro, sin tecnicismos innecesarios, indicando:

* Qué ocurrió.
* Qué información pudo verse afectada.
* Qué medidas tomó la empresa.
* Qué debe hacer el cliente si corresponde.
* Canal de contacto para consultas.

### Comunicación a autoridades o terceros

Debe evaluarse según la naturaleza de los datos comprometidos, obligaciones legales, contratos aplicables y criterios internos de cumplimiento.

## 17. Respaldo y restauración

Los respaldos son esenciales para recuperar la operación después de un incidente.

### Requisitos mínimos

* Respaldos periódicos de la base de datos.
* Respaldos de contratos digitales.
* Respaldos de configuración del servidor.
* Respaldos del código fuente.
* Almacenamiento seguro y con control de acceso.
* Pruebas periódicas de restauración.
* Copias aisladas para evitar alteración por atacantes.
* Registro de fecha, responsable y resultado de cada restauración.

### Consideraciones críticas

No se debe restaurar automáticamente un respaldo sin verificar su integridad. Si el respaldo contiene la vulnerabilidad, archivos alterados o datos comprometidos, podría reintroducir el problema.

## 18. Criterios de recuperación segura

Antes de declarar el incidente como cerrado, se deben cumplir los siguientes criterios:

| Criterio                 | Estado esperado                             |
| ------------------------ | ------------------------------------------- |
| Vulnerabilidad corregida | Confirmada mediante prueba técnica.         |
| Datos críticos validados | Contratos y datos financieros revisados.    |
| Accesos revisados        | Cuentas y permisos verificados.             |
| Credenciales rotadas     | Aplicado si existe sospecha de exposición.  |
| Logs preservados         | Evidencia almacenada para investigación.    |
| Servicio estable         | Portal funcionando sin errores críticos.    |
| Monitoreo reforzado      | Alertas activas después de la recuperación. |
| Lecciones aprendidas     | Informe posterior documentado.              |

## 19. Indicadores de recuperación

| Indicador                             | Finalidad                                                  |
| ------------------------------------- | ---------------------------------------------------------- |
| Tiempo de detección                   | Medir cuánto tarda la empresa en identificar un incidente. |
| Tiempo de contención                  | Medir cuánto tarda en limitar el daño.                     |
| Tiempo de recuperación                | Medir cuánto tarda en restaurar operación segura.          |
| Cantidad de registros afectados       | Estimar alcance del incidente.                             |
| Cantidad de usuarios afectados        | Medir impacto sobre clientes.                              |
| Porcentaje de respaldos restaurables  | Validar capacidad real de recuperación.                    |
| Número de vulnerabilidades corregidas | Medir efectividad de remediación.                          |
| Incidentes repetidos                  | Identificar fallas de control o mejora insuficiente.       |

## 20. Plan de mejora posterior

Después de un incidente, Inmobiliaria Terranova debe fortalecer sus controles.

### Acciones de mejora

* Actualizar políticas de desarrollo seguro.
* Reforzar validación de entradas.
* Revisar configuración de sesiones.
* Mejorar monitoreo de logs.
* Aumentar frecuencia de pruebas de seguridad.
* Revisar permisos de base de datos y servidor.
* Capacitar al equipo técnico.
* Realizar simulacros de respuesta.
* Revisar contratos con proveedores tecnológicos.
* Actualizar la matriz de riesgo.

