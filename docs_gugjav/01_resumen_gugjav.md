# 01. Resumen ejecutivo de la auditoría

## Inmobiliaria Terranova — Portal de clientes

## 1. Identificación general

**Empresa auditada:** Inmobiliaria Terranova
**Rubro:** Inmobiliaria
**Sistema evaluado:** Portal de clientes
**Tipo de evaluación:** Auditoría de seguridad web en ambiente controlado
**Asignatura:** TI3034 — Fundamentos de Seguridad de la Información
**Unidad:** Unidad 3 — Evaluación de Vulnerabilidades y Matriz de Riesgo
**Estudiante:** Javier Guglielmini
**Sufijo del proyecto:** gugjav
**Carpeta del informe:** docs_gugjav


## 2. Contexto de la empresa

Inmobiliaria Terranova es una empresa ficticia perteneciente al rubro inmobiliario. Su actividad principal se relaciona con la gestión de propiedades, atención de clientes, administración de contratos y seguimiento de procesos asociados a compra, venta, arriendo o financiamiento inmobiliario.

Dentro de su operación digital, la empresa cuenta con un portal de clientes que permite centralizar información relevante para sus usuarios. Este portal es considerado un sistema crítico, debido a que puede almacenar, consultar o gestionar información contractual, financiera y personal de los clientes.

En el contexto de esta auditoría, el portal de clientes representa el principal sistema evaluado, ya que concentra activos de información sensibles para el negocio inmobiliario.


## 3. Portal de clientes auditado

El portal de clientes de Inmobiliaria Terranova se considera una plataforma web utilizada para que los clientes puedan interactuar con la empresa y consultar información relacionada con sus procesos inmobiliarios.

Entre sus posibles funcionalidades se consideran:

* Acceso de clientes mediante usuario y contraseña.
* Consulta de contratos de arriendo, compraventa o reserva.
* Visualización de antecedentes financieros asociados a pagos, cuotas o financiamiento.
* Revisión de documentos vinculados a propiedades.
* Seguimiento de solicitudes comerciales o administrativas.
* Comunicación entre clientes y la inmobiliaria.
* Gestión de información personal asociada al proceso inmobiliario.

Desde la perspectiva de seguridad de la información, este portal requiere altos niveles de protección, ya que una vulnerabilidad web podría afectar directamente la confidencialidad, integridad y disponibilidad de los datos administrados por la empresa.


## 4. Datos que custodia Inmobiliaria Terranova

La empresa custodia información relevante para sus clientes y para la continuidad de su operación. Los datos más importantes identificados para esta auditoría son los siguientes:

### 4.1 Contratos

Corresponden a documentos asociados a operaciones inmobiliarias, tales como:

* Contratos de compraventa.
* Contratos de arriendo.
* Contratos de reserva.
* Anexos o modificaciones contractuales.
* Documentos de respaldo de acuerdos entre cliente e inmobiliaria.

Estos documentos son críticos porque contienen obligaciones legales, condiciones económicas, datos de las partes involucradas y antecedentes del inmueble.

### 4.2 Datos financieros de clientes

Incluyen información vinculada a la situación económica o capacidad de pago de los clientes, por ejemplo:

* Montos de pago.
* Cuotas pactadas.
* Estados de pago.
* Información asociada a financiamiento.
* Antecedentes de transacciones.
* Datos relacionados con reserva, pie o pagos documentados.

Estos datos tienen alta sensibilidad para el negocio, ya que una exposición no autorizada podría generar daño económico, reputacional y legal.

### 4.3 Datos personales

El portal también puede tratar datos personales necesarios para identificar y gestionar la relación con los clientes, tales como:

* Nombre completo.
* RUT o identificador personal.
* Teléfono.
* Correo electrónico.
* Dirección.
* Información de contacto.
* Documentación entregada por el cliente durante el proceso inmobiliario.

La protección de estos datos es relevante porque permite resguardar la privacidad de los clientes y mantener la confianza en la empresa.

### 4.4 Credenciales de acceso

El portal puede almacenar o procesar credenciales de autenticación, tales como:

* Nombre de usuario.
* Contraseña.
* Tokens de sesión.
* Roles o perfiles de acceso.

La exposición de credenciales podría permitir accesos no autorizados al portal y comprometer información contractual o financiera.

### 4.5 Información interna del sistema

También se consideran activos técnicos del portal, tales como:

* Base de datos.
* Servidor web.
* Código de la aplicación.
* Registros de acceso.
* Configuraciones del sistema.
* Archivos internos.
* Estructura de directorios o servicios asociados.

Estos activos son importantes porque una vulnerabilidad técnica podría permitir que un atacante afecte la operación completa del portal.


## 5. Importancia de la seguridad para la empresa

La seguridad del portal de clientes es fundamental para Inmobiliaria Terranova, porque la información que administra tiene valor legal, financiero y comercial.

Una falla de seguridad podría generar consecuencias como:

* Exposición de contratos privados.
* Filtración de datos financieros de clientes.
* Acceso no autorizado a documentos.
* Manipulación de registros o estados de pago.
* Pérdida de disponibilidad del portal.
* Daño reputacional para la inmobiliaria.
* Pérdida de confianza de clientes actuales y futuros.
* Posibles responsabilidades asociadas al tratamiento de datos personales.

Por esta razón, una vulnerabilidad web no debe analizarse solo como un problema técnico. En este caso, debe entenderse como un riesgo de negocio que puede afectar la continuidad operacional, la relación con los clientes y la confianza en los procesos inmobiliarios digitales.


## 6. Objetivo general de la auditoría

Evaluar vulnerabilidades de seguridad web en un ambiente controlado, simulando el análisis del portal de clientes de Inmobiliaria Terranova, con el propósito de identificar riesgos técnicos y de negocio, medir su gravedad, priorizar los hallazgos y proponer medidas de prevención, mitigación y recuperación.


## 7. Objetivos específicos

Los objetivos específicos de esta auditoría son:

1. Identificar vulnerabilidades web relevantes mediante pruebas controladas en DVWA.
2. Ejecutar y documentar tres pruebas de seguridad: Inyección SQL, XSS reflejado e Inyección de comandos.
3. Registrar evidencia de cada ataque mediante capturas de pantalla.
4. Explicar técnicamente por qué funciona cada vulnerabilidad.
5. Evaluar la gravedad de los hallazgos utilizando CVSS.
6. Analizar el impacto de cada vulnerabilidad según el rubro inmobiliario.
7. Identificar los activos de información más relevantes para Inmobiliaria Terranova.
8. Construir una matriz de riesgo basada en probabilidad e impacto.
9. Proponer políticas de prevención y controles de mitigación.
10. Definir medidas de recuperación ante incidentes y continuidad operacional.
11. Presentar el informe mediante una aplicación web React desplegada en Vercel.

## 8. Alcance de la auditoría

La auditoría se realiza exclusivamente en un ambiente controlado y autorizado, utilizando la aplicación deliberadamente vulnerable DVWA.

El análisis se enfoca en tres vulnerabilidades web:

* Inyección SQL.
* Cross-Site Scripting reflejado.
* Inyección de comandos.

La explotación técnica se realiza sobre DVWA, pero el análisis de impacto, riesgo y controles se contextualiza en la empresa ficticia Inmobiliaria Terranova y su portal de clientes.

### 8.1 Incluye

Esta auditoría incluye:

* Pruebas controladas sobre DVWA.
* Evidencia visual de los ataques.
* Análisis técnico de cada vulnerabilidad.
* Evaluación de gravedad mediante CVSS.
* Identificación de activos de información.
* Matriz de riesgo.
* Recomendaciones de prevención.
* Controles de mitigación.
* Plan de recuperación post incidente.
* Bitácora de uso de inteligencia artificial.

### 8.2 No incluye

Esta auditoría no incluye:

* Ataques a sistemas reales.
* Pruebas sobre portales externos.
* Acceso a datos reales de clientes.
* Explotación fuera del laboratorio autorizado.
* Obtención o uso de información confidencial real.
* Acciones que afecten infraestructura de terceros.



## 9. Ambiente controlado de pruebas

Para el desarrollo de la evaluación se utiliza DVWA, una aplicación web diseñada para practicar conceptos de seguridad en un entorno controlado.

DVWA permite simular vulnerabilidades de forma segura y documentar evidencias sin afectar sistemas reales. En esta auditoría, la explotación se realiza únicamente con fines académicos y defensivos.

Las pruebas se realizan con el nivel de seguridad configurado en Low, según las instrucciones de la evaluación, para poder observar el funcionamiento básico de las vulnerabilidades y comprender su impacto.



## 10. Marco ético de la auditoría

Esta auditoría se desarrolla bajo un marco ético y académico. Las técnicas utilizadas tienen como finalidad comprender vulnerabilidades, medir riesgos y proponer controles defensivos.

Las pruebas de seguridad solo deben ejecutarse en sistemas propios, autorizados o en ambientes especialmente preparados para aprendizaje, como DVWA.

Atacar sistemas reales o ajenos sin autorización puede constituir una conducta ilegal y contraria a la ética profesional. Por ello, todas las pruebas de este informe se limitan estrictamente al ambiente controlado definido para la evaluación.



## 11. Vulnerabilidades consideradas

La auditoría contempla tres vulnerabilidades principales.

### 11.1 Inyección SQL

La Inyección SQL ocurre cuando una aplicación permite que datos ingresados por el usuario sean interpretados como parte de una consulta SQL. En el contexto de Inmobiliaria Terranova, esta vulnerabilidad podría comprometer la base de datos del portal de clientes y exponer contratos, datos financieros o credenciales.

### 11.2 XSS reflejado

El XSS reflejado ocurre cuando una aplicación devuelve contenido ingresado por el usuario sin aplicar controles adecuados, permitiendo la ejecución de código en el navegador de la víctima. En el portal de una inmobiliaria, esto podría afectar la confianza del cliente, la sesión del usuario o la integridad visual de la plataforma.

### 11.3 Inyección de comandos

La Inyección de comandos ocurre cuando una aplicación permite que una entrada del usuario sea enviada al sistema operativo del servidor. Esta vulnerabilidad puede afectar gravemente la disponibilidad, integridad y seguridad del servidor donde opera el portal.


## 12. Activos preliminares de información

Antes de desarrollar el análisis detallado de activos en el archivo correspondiente, se identifican de forma preliminar los siguientes activos críticos:

| Activo                             | Importancia para Inmobiliaria Terranova                                     |
| ---------------------------------- | --------------------------------------------------------------------------- |
| Base de datos de clientes          | Contiene información personal, financiera y contractual.                    |
| Contratos digitales                | Respaldan operaciones de compra, venta, arriendo o reserva.                 |
| Datos financieros                  | Permiten gestionar pagos, cuotas, financiamiento y obligaciones económicas. |
| Credenciales de usuarios           | Protegen el acceso al portal de clientes.                                   |
| Portal web                         | Es el canal digital de interacción con clientes.                            |
| Servidor web                       | Soporta la disponibilidad de la plataforma.                                 |
| Registros de actividad             | Permiten monitorear accesos, errores e incidentes.                          |
| Documentos asociados a propiedades | Respaldan procesos administrativos y comerciales.                           |


## 13. Riesgos preliminares del negocio

En una empresa inmobiliaria, los riesgos de seguridad web deben evaluarse según el daño que podrían causar sobre los activos del negocio.

Algunos riesgos preliminares son:

* Acceso no autorizado a contratos de clientes.
* Exposición de datos financieros.
* Robo o reutilización de credenciales.
* Modificación de registros de pago o estados contractuales.
* Pérdida de disponibilidad del portal.
* Daño reputacional.
* Pérdida de confianza de clientes.
* Posibles consecuencias legales por exposición de datos personales.
* Interrupción de procesos de venta, arriendo o atención al cliente.


## 14. Criterio de análisis de riesgo

El análisis de riesgo se realizará considerando la relación entre probabilidad e impacto.

La fórmula base utilizada será:

```text
Riesgo = Probabilidad × Impacto
```

La probabilidad se relaciona con qué tan factible es que una vulnerabilidad sea explotada. El impacto se relaciona con el daño que la explotación puede causar sobre los activos de Inmobiliaria Terranova.

Esta relación permitirá priorizar los hallazgos y decidir qué vulnerabilidades deben corregirse primero.


## 15. Criterios preliminares de impacto

Para esta auditoría se consideran los siguientes criterios de impacto:

### Impacto bajo

La vulnerabilidad afecta información limitada, no crítica o sin consecuencias relevantes para la operación inmobiliaria.

### Impacto medio

La vulnerabilidad afecta información interna o procesos secundarios, pero no compromete directamente contratos, datos financieros o continuidad del portal.

### Impacto alto

La vulnerabilidad puede comprometer datos personales, credenciales, documentos relevantes o procesos importantes del portal de clientes.

### Impacto crítico

La vulnerabilidad puede exponer contratos, datos financieros, base de datos completa, afectar el servidor o interrumpir la operación del portal de clientes.

---


### 16.2 Aplicación React

La aplicación React presenta el contenido del informe de forma navegable. Cada sección del sitio corresponde a un componente que resume y visualiza el contenido del informe, incluyendo capturas de ataques, análisis de riesgo y matriz visual.

---

## 17. Criterio de calidad esperado

Para que la auditoría tenga valor, no basta con demostrar que un ataque funciona en DVWA. Cada hallazgo debe conectarse con el negocio de Inmobiliaria Terranova.

Por ello, cada vulnerabilidad debe analizarse considerando:

* Qué activo se ve afectado.
* Qué amenaza podría explotarla.
* Qué impacto tendría para la empresa.
* Qué tan probable es su explotación.
* Qué nivel de riesgo representa.
* Qué controles permiten prevenirla.
* Qué medidas permiten mitigar el daño.
* Qué acciones deben ejecutarse después de un incidente.

---

## 18. Resumen final

Esta auditoría evalúa vulnerabilidades web en un ambiente controlado, tomando como contexto de negocio a Inmobiliaria Terranova y su portal de clientes.

La empresa custodia información crítica, como contratos, datos financieros, datos personales y credenciales de acceso. Debido a esto, vulnerabilidades como Inyección SQL, XSS reflejado e Inyección de comandos pueden representar riesgos significativos para la confidencialidad, integridad y disponibilidad de la información.

El trabajo permitirá transformar hallazgos técnicos en riesgos de negocio, priorizarlos mediante una matriz de riesgo y proponer medidas concretas de prevención, mitigación y recuperación.

El enfoque de esta auditoría es estrictamente académico, ético y defensivo.
