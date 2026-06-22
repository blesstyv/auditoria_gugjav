# 05. Activos de información y riesgos por industria

## Inmobiliaria Terranova — Portal de clientes

## 1. Objetivo

El objetivo de este documento es identificar y clasificar los activos de información más relevantes de Inmobiliaria Terranova, considerando el funcionamiento de su portal de clientes y el tipo de datos que administra.

Este análisis permite relacionar las vulnerabilidades evaluadas en la auditoría con los activos reales del negocio, para determinar qué información podría verse afectada, cuál sería el impacto y qué riesgos deben priorizarse en la matriz de riesgo.

## 2. Contexto de negocio

Inmobiliaria Terranova opera en el rubro inmobiliario y utiliza un portal de clientes como canal digital para consultar, gestionar y dar seguimiento a información contractual, financiera y administrativa.

El portal custodia información especialmente relevante para la relación entre la empresa y sus clientes, principalmente:

* Contratos.
* Datos financieros de clientes.
* Información personal.
* Estados de pago.
* Documentos asociados a operaciones inmobiliarias.
* Credenciales de acceso.
* Registros de actividad del portal.

En una empresa inmobiliaria, estos datos tienen valor legal, económico y reputacional. Por esta razón, cualquier vulnerabilidad que afecte el portal debe analizarse no solo como una falla técnica, sino como un riesgo directo para la continuidad del negocio, la confianza de los clientes y la protección de información sensible.

## 3. Criterios utilizados para clasificar activos

### 3.1 Confidencialidad

Evalúa si el activo contiene información que solo debe ser accesible para personas autorizadas.

Ejemplo: contratos, datos financieros, credenciales o antecedentes personales de clientes.

### 3.2 Integridad

Evalúa si el activo requiere mantenerse exacto, completo y sin modificaciones no autorizadas.

Ejemplo: estados de pago, montos pactados, documentos contractuales o registros de operaciones inmobiliarias.

### 3.3 Disponibilidad

Evalúa si el activo debe estar accesible para que el portal o el negocio funcionen correctamente.

Ejemplo: portal de clientes, base de datos, servidor web o servicios de autenticación.

### 3.4 Criticidad para el negocio

Evalúa qué tan importante es el activo para la operación, continuidad, confianza del cliente y cumplimiento de compromisos comerciales o legales.

## 4. Escala de criticidad utilizada

Para clasificar los activos se utilizará la siguiente escala:

| Nivel   | Descripción                                                                                                                                                 |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Baja    | El activo tiene valor limitado y su afectación no compromete procesos críticos.                                                                             |
| Media   | El activo apoya procesos relevantes, pero su afectación puede ser contenida sin impacto mayor.                                                              |
| Alta    | El activo es importante para la operación o para la relación con clientes. Su afectación puede generar impacto relevante.                                   |
| Crítica | El activo es esencial para el negocio. Su exposición, alteración o indisponibilidad puede generar daño legal, económico, operacional o reputacional severo. |


## 5. Inventario de activos de información

| ID  | Activo                             | Descripción                                                                                      | Datos asociados                                              | Criticidad |
| --- | ---------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ | ---------- |
| A1  | Base de datos de clientes          | Repositorio central del portal donde se almacenan datos personales, financieros y contractuales. | Clientes, contratos, pagos, credenciales, documentos.        | Crítica    |
| A2  | Contratos digitales                | Documentos que respaldan operaciones de compraventa, arriendo, reserva o acuerdos comerciales.   | Contratos, anexos, condiciones comerciales, datos de partes. | Crítica    |
| A3  | Datos financieros de clientes      | Información asociada a pagos, cuotas, reservas, financiamiento o antecedentes económicos.        | Montos, estados de pago, cuotas, transacciones.              | Crítica    |
| A4  | Datos personales de clientes       | Información de identificación y contacto utilizada para la gestión inmobiliaria.                 | Nombre, RUT, correo, teléfono, dirección, documentos.        | Alta       |
| A5  | Credenciales de acceso             | Datos utilizados para autenticar clientes, administradores o personal interno.                   | Usuarios, contraseñas, sesiones, roles.                      | Crítica    |
| A6  | Portal de clientes                 | Aplicación web usada por clientes para consultar información y realizar gestiones.               | Información visible, formularios, estados, documentos.       | Alta       |
| A7  | Servidor web                       | Infraestructura donde se ejecuta el portal.                                                      | Aplicación, archivos, servicios, configuraciones.            | Crítica    |
| A8  | Código fuente de la aplicación     | Lógica del portal, validaciones, consultas, componentes y reglas del sistema.                    | Funciones, consultas, control de acceso.                     | Alta       |
| A9  | Registros de actividad             | Logs de acceso, errores, eventos y acciones realizadas en el portal.                             | IP, fecha, usuario, acción, errores.                         | Alta       |
| A10 | Documentos asociados a propiedades | Archivos vinculados a propiedades, procesos comerciales y respaldos administrativos.             | Documentación de inmuebles, respaldos, certificados.         | Alta       |
| A11 | Servicios de autenticación         | Mecanismo que controla el ingreso de usuarios al portal.                                         | Login, sesiones, roles, permisos.                            | Crítica    |
| A12 | Copias de respaldo                 | Respaldos de base de datos, documentos y configuración del sistema.                              | Backups de datos, archivos y configuraciones.                | Crítica    |


## 6. Clasificación de activos según confidencialidad, integridad y disponibilidad

| Activo                        | Confidencialidad | Integridad | Disponibilidad | Justificación                                                                         |
| ----------------------------- | ---------------: | ---------: | -------------: | ------------------------------------------------------------------------------------- |
| Base de datos de clientes     |             Alta |       Alta |           Alta | Contiene datos personales, financieros, contratos y registros necesarios para operar. |
| Contratos digitales           |             Alta |       Alta |          Media | Deben mantenerse privados y sin alteraciones no autorizadas.                          |
| Datos financieros de clientes |             Alta |       Alta |          Media | Su exposición o modificación puede provocar daño económico y pérdida de confianza.    |
| Datos personales              |             Alta |      Media |          Media | Deben protegerse frente a accesos no autorizados.                                     |
| Credenciales de acceso        |             Alta |       Alta |           Alta | Permiten proteger o comprometer el acceso al portal.                                  |
| Portal de clientes            |            Media |       Alta |           Alta | Es el canal digital de consulta y gestión para clientes.                              |
| Servidor web                  |             Alta |       Alta |           Alta | Soporta la operación técnica del portal.                                              |
| Código fuente                 |             Alta |       Alta |          Media | Puede revelar lógica interna o consultas inseguras.                                   |
| Registros de actividad        |            Media |       Alta |          Media | Son necesarios para investigar incidentes y detectar anomalías.                       |
| Documentos de propiedades     |             Alta |       Alta |          Media | Respaldan procesos comerciales y administrativos.                                     |
| Servicios de autenticación    |             Alta |       Alta |           Alta | Controlan el acceso a la información.                                                 |
| Copias de respaldo            |             Alta |       Alta |           Alta | Permiten recuperar la operación después de un incidente.                              |


## 7. Activos críticos priorizados

A partir del inventario anterior, se identifican como activos críticos principales:

### 7.1 Base de datos de clientes

Es el activo más sensible del portal, porque concentra información personal, financiera y contractual. Una vulnerabilidad como Inyección SQL podría exponer registros de clientes, contratos y antecedentes financieros.

### 7.2 Contratos digitales

Los contratos tienen valor legal y comercial. Su exposición, pérdida o modificación puede generar conflictos con clientes, problemas administrativos y daño reputacional.

### 7.3 Datos financieros de clientes

Los datos financieros son críticos porque permiten gestionar pagos, cuotas, reservas o financiamiento. Su exposición puede afectar la privacidad y confianza del cliente.

### 7.4 Credenciales de acceso

Las credenciales permiten acceder al portal. Si se comprometen, pueden facilitar accesos no autorizados a información contractual o financiera.

### 7.5 Servidor web

El servidor sostiene el funcionamiento del portal. Una Inyección de comandos puede comprometer este activo, afectando confidencialidad, integridad y disponibilidad.

### 7.6 Copias de respaldo

Las copias de respaldo permiten recuperar la operación si ocurre alteración, eliminación o indisponibilidad de datos. Son esenciales para la recuperación ante incidentes.


## 8. Relación entre vulnerabilidades y activos afectados

| Vulnerabilidad        | Activos afectados                                                                            | Impacto principal                                                                        |
| --------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Inyección SQL         | Base de datos, contratos, datos financieros, credenciales, datos personales.                 | Exposición o alteración de información crítica.                                          |
| XSS reflejado         | Portal de clientes, sesión del usuario, datos visibles en pantalla, confianza institucional. | Manipulación del navegador, suplantación visual o exposición indirecta de información.   |
| Inyección de comandos | Servidor web, sistema operativo, archivos internos, portal, base de datos, respaldos.        | Compromiso del servidor, lectura de archivos, afectación de disponibilidad e integridad. |


## 9. Riesgos por industria inmobiliaria

El rubro inmobiliario presenta riesgos particulares porque sus procesos dependen de documentación formal, antecedentes financieros y confianza entre cliente y empresa.

### 9.1 Riesgo de exposición de contratos

Si un atacante accede a contratos digitales, podría conocer condiciones comerciales, datos de las partes, montos, fechas, cláusulas o antecedentes del inmueble.

**Impacto para la empresa:** alto a crítico.
**Consecuencia posible:** pérdida de confidencialidad, conflictos legales, reclamos de clientes y daño reputacional.

### 9.2 Riesgo de exposición de datos financieros

Si se exponen datos financieros, podrían divulgarse montos pagados, cuotas, antecedentes económicos o información asociada al proceso de compra, arriendo o reserva.

**Impacto para la empresa:** crítico.
**Consecuencia posible:** afectación de privacidad, perjuicio económico, pérdida de confianza y aumento de reclamos.

### 9.3 Riesgo de manipulación de estados de pago

Si un atacante modifica estados de pago, cuotas o registros financieros, la empresa podría tomar decisiones administrativas erróneas.

**Impacto para la empresa:** crítico.
**Consecuencia posible:** errores de cobranza, conflictos comerciales, pérdida económica y dificultad para validar información.

### 9.4 Riesgo de compromiso de credenciales

Si se obtienen credenciales de clientes o administradores, un atacante podría ingresar al portal y consultar o modificar información.

**Impacto para la empresa:** alto a crítico.
**Consecuencia posible:** acceso no autorizado, escalamiento de privilegios y exposición de información sensible.

### 9.5 Riesgo de indisponibilidad del portal

Si el portal deja de estar disponible, los clientes no podrían consultar contratos, estados de pago o documentación.

**Impacto para la empresa:** alto.
**Consecuencia posible:** interrupción de atención digital, aumento de consultas manuales, retrasos operativos y pérdida de confianza.

### 9.6 Riesgo de manipulación visual del portal

Un ataque como XSS podría alterar mensajes, formularios o información mostrada al usuario.

**Impacto para la empresa:** medio a alto.
**Consecuencia posible:** engaño al cliente, suplantación de información, pérdida de confianza y posible captura de datos ingresados.

### 9.7 Riesgo de compromiso del servidor

Si un atacante ejecuta comandos en el servidor, podría acceder a archivos internos, credenciales, configuraciones o afectar la operación.

**Impacto para la empresa:** crítico.
**Consecuencia posible:** caída del portal, acceso a información interna, alteración de archivos y necesidad de restauración completa.


## 10. Mapa preliminar de riesgos por activo

| Activo                    | Amenaza principal                    | Vulnerabilidad asociada               | Riesgo preliminar |
| ------------------------- | ------------------------------------ | ------------------------------------- | ----------------- |
| Base de datos de clientes | Atacante externo o usuario malicioso | Inyección SQL                         | Crítico           |
| Contratos digitales       | Acceso no autorizado                 | Inyección SQL / Inyección de comandos | Crítico           |
| Datos financieros         | Exposición o manipulación            | Inyección SQL                         | Crítico           |
| Credenciales              | Robo o reutilización                 | Inyección SQL / XSS                   | Alto              |
| Portal de clientes        | Manipulación de contenido            | XSS reflejado                         | Alto              |
| Servidor web              | Ejecución de comandos                | Inyección de comandos                 | Crítico           |
| Logs de actividad         | Eliminación o alteración             | Inyección de comandos                 | Alto              |
| Copias de respaldo        | Acceso o eliminación no autorizada   | Inyección de comandos                 | Crítico           |
| Código fuente             | Exposición de lógica interna         | Inyección de comandos                 | Alto              |
| Documentos de propiedades | Acceso no autorizado                 | Inyección SQL / Comandos              | Alto              |

## 11. Priorización inicial de activos

| Prioridad | Activo                        | Motivo                                                                  |
| --------- | ----------------------------- | ----------------------------------------------------------------------- |
| 1         | Base de datos de clientes     | Contiene la mayor concentración de información sensible.                |
| 2         | Contratos digitales           | Tienen valor legal y comercial para clientes y empresa.                 |
| 3         | Datos financieros de clientes | Su exposición o modificación puede generar daño económico.              |
| 4         | Servidor web                  | Sostiene la operación del portal y puede ser comprometido por comandos. |
| 5         | Credenciales de acceso        | Permiten acceso a información protegida.                                |
| 6         | Copias de respaldo            | Son esenciales para recuperación ante incidentes.                       |
| 7         | Portal de clientes            | Canal principal de consulta y gestión digital.                          |
| 8         | Registros de actividad        | Permiten investigar incidentes y detectar acciones sospechosas.         |

## 12. Clasificación de información

Para proteger adecuadamente los activos, se propone clasificar la información del portal en cuatro niveles:

| Nivel        | Descripción                                                           | Ejemplos                                                                  |
| ------------ | --------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Pública      | Información disponible sin restricciones.                             | Información comercial general, datos públicos de contacto.                |
| Interna      | Información usada por personal de la empresa.                         | Procedimientos, registros administrativos, reportes internos.             |
| Confidencial | Información que solo debe estar disponible para usuarios autorizados. | Contratos, datos personales, estados de pago.                             |
| Restringida  | Información crítica cuya exposición puede generar daño severo.        | Datos financieros, credenciales, respaldos, configuraciones del servidor. |


## 13. Requerimientos de protección por tipo de activo

| Tipo de activo    | Requerimiento de protección                                                                                |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| Contratos         | Control de acceso estricto, trazabilidad, integridad documental y almacenamiento seguro.                   |
| Datos financieros | Cifrado, mínimo privilegio, monitoreo, validación de accesos y protección contra consultas no autorizadas. |
| Credenciales      | Hash seguro, políticas de contraseña, MFA si corresponde y protección de sesiones.                         |
| Base de datos     | Consultas parametrizadas, control de permisos, respaldos y monitoreo de consultas anómalas.                |
| Portal web        | Validación de entradas, codificación de salida, hardening y pruebas de seguridad.                          |
| Servidor web      | Mínimo privilegio, parches, monitoreo, segmentación y restricción de comandos.                             |
| Logs              | Protección contra alteración, retención adecuada y revisión periódica.                                     |
| Respaldos         | Cifrado, pruebas de restauración, control de acceso y copias aisladas.                                     |


## 14. Relación con los tres ataques evaluados

### 14.1 Inyección SQL

La Inyección SQL afecta principalmente la base de datos, contratos, datos financieros y credenciales. Es especialmente crítica para Inmobiliaria Terranova porque puede exponer o alterar información esencial del negocio.

### 14.2 XSS reflejado

El XSS reflejado afecta principalmente la interacción entre el cliente y el portal. Puede manipular la experiencia del usuario, afectar sesiones o inducir acciones engañosas.

### 14.3 Inyección de comandos

La Inyección de comandos afecta directamente el servidor web y puede comprometer archivos internos, configuraciones, credenciales y disponibilidad del portal.


