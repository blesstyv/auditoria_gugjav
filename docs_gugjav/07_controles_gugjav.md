# 07. Controles de seguridad propuestos

## Inmobiliaria Terranova — Portal de clientes

## 1. Propósito Principal

El propósito de este documento es proponer controles de seguridad para reducir los riesgos identificados durante la auditoría del portal de clientes de Inmobiliaria Terranova.

Los controles se diseñan considerando los hallazgos técnicos evaluados en la auditoría:

* Inyección SQL.
* XSS reflejado.
* Inyección de comandos.

La finalidad es definir medidas concretas de prevención, mitigación, detección y respuesta, alineadas con el contexto de negocio de Inmobiliaria Terranova.

El portal de clientes custodia contratos y datos financieros, por lo que los controles deben proteger la confidencialidad, integridad y disponibilidad de la información.

## 2. Enfoque general de control

La estrategia de seguridad propuesta se basa en un modelo de defensa por capas. Esto significa que no se debe depender de un único control, sino combinar medidas técnicas, operacionales y organizacionales.

El enfoque considera cinco líneas de acción:

1. Prevenir vulnerabilidades desde el desarrollo.
2. Proteger los activos críticos del portal.
3. Detectar intentos de explotación.
4. Responder de forma ordenada ante incidentes.
5. Recuperar la operación si ocurre una afectación.

Este enfoque permite que Inmobiliaria Terranova no solo corrija las vulnerabilidades detectadas, sino que también fortalezca su proceso de gestión de seguridad a largo plazo.


## 3. Principios de seguridad aplicables

Los controles propuestos se basan en los siguientes principios:

| Principio                              | Aplicación en el portal                                                                             |
| -------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Permisos Mínimos                    | Cada usuario, servicio o cuenta técnica debe tener solo los permisos necesarios.                    |
| Validación de entradas                 | Todo dato ingresado por usuarios debe ser revisado antes de ser procesado.                          |
| Separación entre datos e instrucciones | Los datos del usuario no deben mezclarse con consultas SQL, scripts o comandos del sistema.         |
| Codificación segura de salida          | La información mostrada en pantalla debe codificarse para evitar ejecución de código no autorizado. |
| Defensa en profundidad                 | Se deben aplicar varios controles complementarios, no una única barrera.                            |
| Monitoreo continuo                     | Los eventos relevantes deben registrarse y revisarse para detectar actividad inusual.               |
| Recuperación planificada               | La empresa debe contar con respaldos, procedimientos y responsables ante incidentes.                |

## 4. Relación entre hallazgos y controles principales

| Hallazgo              | Riesgo principal                                                                  | Control principal                                                        |
| --------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Inyección SQL         | Exposición o alteración de contratos, datos financieros y credenciales.           | Consultas parametrizadas y validación de entradas.                       |
| XSS reflejado         | Ejecución de código en el navegador y manipulación de la experiencia del cliente. | Codificación de salida contextual y Content Security Policy.             |
| Inyección de comandos | Ejecución de comandos en el servidor y compromiso de infraestructura.             | Eliminar llamadas directas al sistema operativo con entradas de usuario. |

# 5. Controles para prevenir Inyección SQL

## 5.1 Control principal

El control principal es implementar consultas parametrizadas en todas las operaciones que interactúan con la base de datos.

Las consultas parametrizadas separan la instrucción SQL de los datos ingresados por el usuario. Esto impide que una entrada manipulada sea interpretada como parte de la consulta.

## 5.2 Controles técnicos específicos

| Control                            | Descripción                                                                     | Prioridad  |
| ---------------------------------- | ------------------------------------------------------------------------------- | ---------- |
| Consultas parametrizadas           | Todas las consultas deben separar código SQL y datos del usuario.               | Crítica    |
| Validación del lado servidor       | Cada campo debe validar tipo, longitud y formato esperado.                      | Alta       |
| Mínimo privilegio en base de datos | La cuenta de la aplicación no debe tener permisos administrativos innecesarios. | Crítica    |
| Manejo seguro de errores           | No mostrar errores SQL, nombres de tablas ni estructura interna al usuario.     | Alta       |
| Revisión de consultas dinámicas    | Evitar concatenación directa de datos del usuario.                              | Crítica    |
| Monitoreo de consultas anómalas    | Registrar patrones sospechosos o consultas que devuelvan volúmenes inusuales.   | Media-alta |

## 5.4 Política recomendada

Inmobiliaria Terranova debe establecer una política de desarrollo seguro que prohíba construir consultas SQL mediante concatenación directa de entradas del usuario.

Toda funcionalidad del portal que consulte contratos, pagos, clientes o documentos debe utilizar consultas parametrizadas y validación del lado servidor.

## 5.5 Evidencia esperada de implementación

Para comprobar que el control fue aplicado, se deben generar las siguientes evidencias:

* Fragmentos de código donde se observe el uso de consultas parametrizadas.
* Registro de revisión de formularios, filtros y parámetros de URL.
* Pruebas donde los payloads de SQL Injection ya no alteren la consulta.
* Validación de permisos de la cuenta de conexión a base de datos.
* Capturas o registros de pruebas de regresión.


# 6. Controles para prevenir XSS reflejado

## 6.1 Riesgo que se busca controlar

El XSS reflejado puede permitir que una entrada del usuario sea devuelta por el portal y ejecutada en el navegador. En el portal de clientes, esto podría afectar la sesión del usuario, manipular información visible, suplantar mensajes o disminuir la confianza en la plataforma.

## 6.2 Control principal

El control principal es aplicar codificación de salida contextual en todo contenido generado a partir de datos ingresados por usuarios.

Esto significa que la aplicación debe mostrar los datos como texto seguro, no como código ejecutable.

## 6.3 Controles técnicos específicos

| Control                           | Descripción                                                                            | Prioridad |
| --------------------------------- | -------------------------------------------------------------------------------------- | --------- |
| Codificación de salida contextual | Codificar datos antes de mostrarlos en HTML, atributos, JavaScript, CSS o URL.         | Crítica   |
| Validación de entradas            | Validar tipo, longitud y caracteres permitidos.                                        | Alta      |
| Content Security Policy           | Limitar fuentes permitidas para scripts, estilos y recursos cargados por el navegador. | Alta      |
| Cookies seguras                   | Usar HttpOnly, Secure y SameSite para reducir exposición de sesión.                    | Alta      |
| Evitar inserción insegura de HTML | No usar mecanismos que inserten HTML sin control.                                      | Crítica   |
| Sanitización cuando corresponda   | Si se permite HTML controlado, debe sanitizarse con reglas estrictas.                  | Alta      |
| Pruebas específicas de XSS        | Probar formularios, buscadores, mensajes y parámetros reflejados.                      | Alta      |

## 6.4 Política recomendada

Todo dato proveniente de usuarios debe considerarse no confiable. Ninguna entrada debe mostrarse en el portal sin codificación o sanitización adecuada.

Los módulos de búsqueda de contratos, contacto, mensajes de error, filtros y resultados dinámicos deben ser revisados especialmente, porque son puntos frecuentes donde una aplicación refleja datos en pantalla.

## 6.5 Evidencia esperada de implementación

Para comprobar que el control fue aplicado, se deben generar las siguientes evidencias:

* Pruebas donde el payload de XSS se muestre como texto y no se ejecute.
* Configuración de Content Security Policy.
* Revisión de cookies de sesión.
* Registro de validaciones aplicadas a formularios.
* Revisión de componentes frontend que renderizan datos dinámicos.

# 7. Controles para prevenir Inyección de comandos

## 7.1 Riesgo que se busca controlar

La Inyección de comandos puede permitir que una entrada del usuario sea interpretada por el sistema operativo del servidor. En Inmobiliaria Terranova, esto puede comprometer la infraestructura que soporta el portal, exponer archivos internos, afectar la disponibilidad y poner en riesgo contratos o datos financieros.

## 7.2 Control principal

El control principal es eliminar la ejecución directa de comandos del sistema operativo utilizando entradas de usuario.

Si el portal necesita realizar una operación interna, debe utilizar APIs seguras o funciones del lenguaje, evitando pasar datos externos a la shell del sistema.

## 7.3 Controles técnicos específicos

| Control                                       | Descripción                                                                | Prioridad                         |      |
| --------------------------------------------- | -------------------------------------------------------------------------- | --------------------------------- | ---- |
| Evitar llamadas directas al sistema operativo | Reemplazar comandos por APIs seguras o funciones internas.                 | Crítica                           |      |
| Listas blancas estrictas                      | Permitir solo valores válidos y esperados.                                 | Crítica                           |      |
| Bloqueo de operadores de comando              | Rechazar caracteres como `;`, `&&`, `                                      | `, backticks y otros separadores. | Alta |
| Mínimo privilegio del proceso                 | La aplicación debe ejecutarse con una cuenta sin permisos administrativos. | Crítica                           |      |
| Separación de funciones administrativas       | Las funciones sensibles no deben estar expuestas al portal público.        | Alta                              |      |
| Hardening del servidor                        | Reducir servicios innecesarios, permisos y rutas expuestas.                | Alta                              |      |
| Monitoreo de procesos                         | Registrar ejecución de procesos anómalos o inesperados.                    | Alta                              |      |

## 7.4 Política recomendada

Inmobiliaria Terranova debe prohibir el uso de entradas de usuario para construir comandos del sistema operativo.

Las funcionalidades técnicas, administrativas o de diagnóstico deben estar separadas del portal de clientes y protegidas por controles estrictos de autenticación, autorización y monitoreo.

## 7.5 Evidencia esperada de implementación

Para comprobar que el control fue aplicado, se deben generar las siguientes evidencias:

* Revisión de código donde se eliminen llamadas inseguras a comandos.
* Pruebas donde el payload de Command Injection no se ejecute.
* Validación de permisos de la cuenta del servicio web.
* Registro de hardening aplicado al servidor.
* Monitoreo de procesos y alertas de ejecución anómala.

# 8. Controles transversales para el portal

Además de los controles específicos por vulnerabilidad, se recomiendan controles transversales que fortalecen la seguridad general del portal.

## 8.1 Gestión de accesos

| Control                        | Objetivo                                                                     |
| ------------------------------ | ---------------------------------------------------------------------------- |
| Autenticación robusta          | Asegurar que solo usuarios autorizados ingresen al portal.                   |
| Control de roles               | Separar permisos de clientes, administradores y soporte.                     |
| Mínimo privilegio              | Evitar accesos innecesarios a contratos, datos financieros o administración. |
| Revisión periódica de usuarios | Eliminar cuentas inactivas o permisos obsoletos.                             |

## 8.2 Protección de datos

| Control                       | Objetivo                                                             |
| ----------------------------- | -------------------------------------------------------------------- |
| Cifrado en tránsito           | Proteger datos enviados entre navegador y servidor.                  |
| Cifrado en reposo             | Proteger respaldos, documentos y datos almacenados.                  |
| Clasificación de información  | Distinguir información pública, interna, confidencial y restringida. |
| Control de acceso a contratos | Asegurar que cada cliente acceda solo a sus propios documentos.      |

## 8.3 Monitoreo y registro

| Control                      | Objetivo                                                              |
| ---------------------------- | --------------------------------------------------------------------- |
| Logs de autenticación        | Registrar accesos, fallos y cambios de sesión.                        |
| Logs de errores              | Detectar fallas técnicas o intentos de explotación.                   |
| Alertas de actividad anómala | Identificar patrones sospechosos.                                     |
| Protección de logs           | Evitar que los registros sean modificados o eliminados por atacantes. |

## 8.4 Desarrollo seguro

| Control              | Objetivo                                                                    |
| -------------------- | --------------------------------------------------------------------------- |
| Revisión de código   | Detectar consultas inseguras, salidas no codificadas o comandos peligrosos. |
| Pruebas de seguridad | Ejecutar pruebas antes de liberar nuevas versiones.                         |
| Control de versiones | Mantener trazabilidad de cambios.                                           |
| Capacitación técnica | Fortalecer conocimientos del equipo de desarrollo y soporte.                |

# 9. Controles organizados según funciones de ciberseguridad

Los controles también pueden ordenarse según funciones de gestión de ciberseguridad.

| Función     | Aplicación en Inmobiliaria Terranova                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------ |
| Gobernar    | Definir políticas, responsables, criterios de riesgo y procedimientos de seguridad.                    |
| Identificar | Mantener inventario de activos, datos críticos y dependencias del portal.                              |
| Proteger    | Implementar consultas parametrizadas, codificación de salida, validación, mínimo privilegio y cifrado. |
| Detectar    | Monitorear eventos, errores, consultas anómalas, intentos de XSS y ejecución de procesos sospechosos.  |
| Responder   | Activar procedimientos ante incidentes, contener vulnerabilidades y preservar evidencia.               |
| Recuperar   | Restaurar servicios, validar integridad y aplicar mejoras posteriores al incidente.                    |

# 10. Matriz de controles por hallazgo

| Hallazgo              | Control preventivo                                          | Control de detección                                       | Control de respuesta                                                                           |
| --------------------- | ----------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Inyección SQL         | Consultas parametrizadas y validación de entradas.          | Monitoreo de consultas anómalas y errores SQL.             | Bloquear punto vulnerable, revisar base de datos y cambiar credenciales si corresponde.        |
| XSS reflejado         | Codificación de salida contextual y CSP.                    | Registro de payloads con etiquetas o scripts.              | Invalidar sesiones afectadas, corregir salida vulnerable e informar a usuarios si corresponde. |
| Inyección de comandos | Evitar llamadas a comandos del sistema y usar APIs seguras. | Monitoreo de procesos inesperados y operadores de comando. | Aislar servidor, preservar evidencia, revisar integridad y restaurar si corresponde.           |

# 11. Responsables sugeridos

| Área responsable            | Rol dentro del control                                                   |
| --------------------------- | ------------------------------------------------------------------------ |
| Desarrollo                  | Corregir código vulnerable y aplicar prácticas seguras.                  |
| Infraestructura             | Endurecer servidor, permisos, servicios y monitoreo técnico.             |
| Seguridad de la información | Definir políticas, validar controles y coordinar respuesta a incidentes. |
| Soporte TI                  | Registrar incidentes, apoyar usuarios y escalar eventos sospechosos.     |
| Administración del portal   | Controlar roles, accesos y permisos de usuarios.                         |
| Dirección o gerencia        | Aprobar recursos, prioridades y tratamiento de riesgos críticos.         |

# 12. Priorización de controles

| Prioridad | Control                                   | Motivo                                                             |
| --------: | ----------------------------------------- | ------------------------------------------------------------------ |
|         1 | Eliminar Inyección de comandos            | Riesgo crítico sobre servidor y disponibilidad del portal.         |
|         2 | Implementar consultas parametrizadas      | Riesgo crítico sobre base de datos, contratos y datos financieros. |
|         3 | Aplicar codificación de salida contextual | Riesgo alto sobre sesión, confianza y experiencia del cliente.     |
|         4 | Reducir privilegios de cuentas técnicas   | Disminuye impacto si ocurre una explotación.                       |
|         5 | Implementar monitoreo y alertas           | Permite detectar intentos de ataque oportunamente.                 |
|         6 | Asegurar respaldos y recuperación         | Permite restablecer operación ante incidente.                      |
|         7 | Formalizar política de desarrollo seguro  | Reduce repetición de vulnerabilidades en nuevas versiones.         |

# 13. Indicadores de cumplimiento

Para verificar que los controles se mantienen en el tiempo, se proponen los siguientes indicadores:

| Indicador                                    | Meta sugerida                                   |
| -------------------------------------------- | ----------------------------------------------- |
| Porcentaje de consultas parametrizadas       | 100% de consultas revisadas.                    |
| Formularios con validación del lado servidor | 100% de formularios críticos.                   |
| Puntos de salida con codificación contextual | 100% de vistas que reflejan datos del usuario.  |
| Cuentas técnicas con mínimo privilegio       | 100% de cuentas revisadas.                      |
| Eventos críticos registrados                 | 100% de eventos definidos en la política.       |
| Pruebas de seguridad antes de producción     | En cada liberación relevante.                   |
| Respaldos probados                           | Al menos una prueba periódica documentada.      |
| Hallazgos críticos corregidos                | Corrección inmediata según prioridad de riesgo. |
