# 02. Análisis de vulnerabilidad: Inyección SQL

## Inmobiliaria Terranova — Portal de clientes

## 1. Resumen ejecutivo del hallazgo

Se evaluó la vulnerabilidad de **Inyección SQL** en un ambiente controlado. La prueba permitió demostrar cómo una entrada manipulada puede alterar la lógica de una consulta SQL cuando una aplicación no separa correctamente los datos ingresados por el usuario de las instrucciones enviadas a la base de datos.

En el contexto de Inmobiliaria Terranova, este hallazgo representa un riesgo crítico porque el portal de clientes administra información confidencial para el negocio inmobiliario, especialmente contratos y datos financieros de clientes. Si una vulnerabilidad de este tipo existiera en el portal productivo, un atacante podría acceder a información confidencial, visualizar registros no autorizados, comprometer credenciales o afectar la integridad de datos vinculados a procesos de compra, venta, arriendo o financiamiento.

## 2. ¿Qué es una Inyección SQL?

La Inyección SQL es una vulnerabilidad de aplicación web que ocurre cuando una aplicación construye consultas a la base de datos usando datos ingresados por el usuario sin aplicar controles adecuados.

En una aplicación segura, lo que escribe el usuario debe ser tratado únicamente como dato. El problema aparece cuando esa entrada se incorpora directamente dentro de una instrucción SQL y puede modificar su estructura o comportamiento.

## 3. Causa raíz de la vulnerabilidad

La causa raíz de la Inyección SQL es la mezcla insegura entre:

```text
Datos ingresados por el usuario + instrucciones SQL de la aplicación
```

Esto suele ocurrir cuando el código de la aplicación concatena texto del usuario directamente dentro de una consulta SQL.

Por ejemplo, una aplicación vulnerable podría tomar un valor ingresado en un formulario y unirlo directamente a una consulta como si fuera parte confiable de la instrucción. Si no existe validación, parametrización ni separación entre dato e instrucción, la base de datos puede interpretar parte de la entrada como lógica SQL.

### Causas frecuentes

* Falta de validación de entradas.
* Concatenación directa de datos del usuario en consultas SQL.
* Ausencia de consultas parametrizadas.
* Uso de cuentas de base de datos con permisos excesivos.
* Mensajes de error técnicos visibles para el usuario.
* Falta de revisión de código seguro.
* Falta de pruebas de seguridad en formularios, filtros, buscadores o parámetros de URL.
* Ausencia de controles de monitoreo sobre consultas anómalas.



## 4. Puntos de entrada donde puede aparecer

En un portal de clientes inmobiliario, la Inyección SQL podría aparecer en distintos puntos de entrada, especialmente en aquellos que reciben datos desde el usuario y consultan una base de datos.

Algunos puntos de riesgo son:

| Punto de entrada        | Ejemplo en el portal                 | Riesgo asociado                                    |
| -- |  | -- |
| Inicio de sesión        | Usuario y contraseña                 | Acceso no autorizado a cuentas de clientes.        |
| Buscador de contratos   | Búsqueda por número de contrato      | Exposición de contratos no autorizados.            |
| Consulta de pagos       | Filtro por cliente, cuota o estado   | Visualización o manipulación de datos financieros. |
| Parámetros de URL       | Identificador de cliente o documento | Acceso a registros de otros clientes.              |
| Formularios de contacto | Datos enviados por clientes          | Manipulación de consultas internas.                |
| Panel administrativo    | Filtros de búsqueda interna          | Exposición masiva de datos de clientes.            |



## 5. Evidencia del ataque en ambiente controlado

La prueba se realizó en DVWA, específicamente en el módulo **SQL Injection**, con el nivel de seguridad configurado en **Low**.

### Ejecución utilizada

```sql
' OR '1'='1
```

Esta ejecución utiliza una condición lógica que siempre resulta verdadera. En una aplicación vulnerable, esto puede alterar el filtro normal de una consulta y provocar que la base de datos devuelva más registros de los que debería.

### Captura de evidencia


![Evidencia de Inyección SQL en DVWA](/img_gugjav/sqli_gugjav.png)

### Resultado observado

El resultado de la prueba demuestra que la entrada manipulada logra alterar la consulta SQL ejecutada por la aplicación vulnerable. En lugar de devolver únicamente el registro esperado, la aplicación expone múltiples registros de la base de datos.

En un portal real de Inmobiliaria Terranova, un comportamiento equivalente podría significar la exposición no autorizada de información asociada a clientes, contratos, pagos, antecedentes financieros o credenciales.

### Principio de seguridad vulnerado

El principio vulnerado es:

```text
Nunca confiar automáticamente en los datos ingresados por el usuario.
```

Toda entrada debe ser validada, controlada y separada de las instrucciones que ejecuta el sistema.

## 6. Tipos de impacto en Inmobiliaria Terranova

La Inyección SQL puede afectar directamente la triada de la seguridad de la información: confidencialidad, integridad y disponibilidad.

### 6.1 Confidencialidad

La confidencialidad se ve afectada cuando un usuario no autorizado logra visualizar información privada o reservada.

En Inmobiliaria Terranova, esto podría incluir:

* Contratos de compraventa.
* Contratos de arriendo.
* Contratos de reserva.
* Datos financieros de clientes.
* Estados de pago.
* Información de cuotas o financiamiento.
* Datos personales.
* Correos electrónicos y teléfonos.
* Credenciales o identificadores de usuarios.

Este es el impacto más relevante del hallazgo, porque el portal custodia información sensible para clientes y para la operación inmobiliaria.

### 6.2 Integridad

La integridad se ve afectada cuando los datos pueden ser modificados, alterados o eliminados sin autorización.

En el contexto de la empresa, una explotación más avanzada podría afectar:

* Estados de pago.
* Registros contractuales.
* Antecedentes financieros.
* Información de clientes.
* Datos asociados a propiedades.
* Historial de operaciones inmobiliarias.

La alteración de estos datos puede provocar errores administrativos, conflictos con clientes, problemas legales o pérdida de validez de registros internos.

### 6.3 Disponibilidad

La disponibilidad se ve afectada cuando el sistema o la información dejan de estar accesibles para usuarios autorizados.

En una explotación grave, una Inyección SQL podría contribuir a:

* Bloqueo del portal de clientes.
* Eliminación o daño de registros.
* Interrupción de consultas de contratos.
* Indisponibilidad de información de pago.
* Detención de procesos administrativos o comerciales.



## 7. Activos afectados

Los principales activos afectados por este hallazgo son:

| Activo                    | Descripción                                                 | Nivel de criticidad |
| - | -- | - |
| Base de datos de clientes | Contiene registros personales, financieros y contractuales. | Crítico             |
| Contratos digitales       | Documentos que respaldan operaciones inmobiliarias.         | Crítico             |
| Datos financieros         | Información asociada a pagos, cuotas y financiamiento.      | Crítico             |
| Credenciales de usuarios  | Permiten acceso al portal de clientes.                      | Alto                |
| Portal de clientes        | Canal digital de consulta y gestión.                        | Alto                |
| Registros de actividad    | Evidencia necesaria para investigación de incidentes.       | Medio               |
| Confianza institucional   | Percepción de seguridad y seriedad de la empresa.           | Alto                |



## 8. Amenaza asociada

La amenaza asociada corresponde a un actor que intenta manipular entradas del portal para obtener acceso no autorizado a información almacenada en la base de datos.

Posibles actores de amenaza:

* Usuario externo sin autorización.
* Cliente con cuenta válida que intenta acceder a información de otros clientes.
* Atacante que explora formularios públicos. 
* Actor malicioso que busca datos financieros o contratos.
* Usuario interno con permisos limitados que intenta escalar acceso a registros.



## 9. Evaluación de gravedad mediante CVSS v3.1

Para estimar la gravedad del hallazgo se utiliza CVSS v3.1. La evaluación se realiza considerando el contexto del portal de clientes de Inmobiliaria Terranova, donde la base de datos puede contener contratos y datos financieros.

### Vector CVSS propuesto

```text
CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:L
```

### Puntaje base estimado

```text
8.3 — Alto
```

### Justificación del vector

| Métrica | Valor     | Justificación                                                                                                                                       |
| - |  |  |
| AV:N    | Network   | La vulnerabilidad se explota desde una aplicación web accesible por red.                                                                            |
| AC:L    | Low       | La explotación no requiere condiciones complejas si el campo vulnerable está disponible.                                                            |
| PR:L    | Low       | Se considera que el atacante podría requerir una cuenta básica del portal o acceso a una funcionalidad habilitada.                                  |
| UI:N    | None      | No requiere interacción de otra víctima para ejecutarse.                                                                                            |
| S:U     | Unchanged | El impacto se mantiene dentro del mismo ámbito de seguridad de la aplicación y su base de datos.                                                    |
| C:H     | High      | Puede exponer contratos, datos financieros y registros de clientes.                                                                                 |
| I:H     | High      | Podría permitir alteración de registros si la consulta o permisos lo permiten.                                                                      |
| A:L     | Low       | Puede afectar parcialmente la disponibilidad si se manipulan consultas o datos, aunque el impacto principal es sobre confidencialidad e integridad. |

### Severidad asignada

La severidad se clasifica como **Alta**, debido a que la vulnerabilidad puede comprometer información crítica para el negocio inmobiliario y afectar directamente datos de clientes.

## 10. Nivel de riesgo para Inmobiliaria Terranova

El riesgo se estima considerando:

```text
Riesgo = Probabilidad × Impacto
```

### Probabilidad

**Alta.**
La probabilidad se considera alta porque la vulnerabilidad se encuentra en una aplicación web y puede explotarse mediante una entrada manipulada si no existen controles adecuados.

### Impacto

**Crítico.**
El impacto se considera crítico porque el portal custodia contratos y datos financieros de clientes. La exposición, modificación o eliminación de esta información puede generar consecuencias legales, económicas, operacionales y reputacionales.

## 11. Política de prevención propuesta

### Política: Desarrollo seguro y prevención de Inyección SQL

Inmobiliaria Terranova debe implementar una política de desarrollo seguro que prohíba la construcción de consultas SQL mediante concatenación directa de datos ingresados por el usuario.

La política debe establecer que toda interacción con la base de datos debe realizarse mediante mecanismos seguros, como consultas parametrizadas, validación de entradas y control de permisos.

### Lineamientos de prevención

1. Todas las consultas a la base de datos deben usar consultas parametrizadas o prepared statements.
2. Se prohíbe concatenar directamente datos ingresados por el usuario dentro de instrucciones SQL.
3. Las entradas de formularios, buscadores y parámetros de URL deben ser validadas en servidor.
4. Cada campo debe aceptar únicamente el tipo de dato esperado.
5. La aplicación debe aplicar listas blancas cuando existan valores predefinidos.
6. Los errores técnicos de base de datos no deben mostrarse al usuario final.
7. Las cuentas de conexión a base de datos deben operar bajo el principio de mínimo privilegio.
8. Todo cambio en código que interactúe con base de datos debe pasar por revisión de seguridad.
9. Se deben registrar intentos fallidos, consultas anómalas y patrones sospechosos.
10. El equipo técnico debe recibir capacitación periódica en seguridad de aplicaciones web.



## 12. Control de mitigación propuesto

### Control principal

```text
Implementar consultas parametrizadas en todas las operaciones de base de datos.
```

Las consultas parametrizadas separan la instrucción SQL de los datos ingresados por el usuario. Esto impide que una entrada maliciosa modifique la lógica de la consulta.

### Controles complementarios

| Control                  | Objetivo                                                           |
|  |  |
| Validación de entradas   | Aceptar únicamente datos esperados según tipo, formato y longitud. |
| Mínimo privilegio        | Limitar el daño si una consulta es manipulada.                     |
| Manejo seguro de errores | Evitar revelar nombres de tablas, estructura interna o consultas.  |
| Registro de eventos      | Detectar intentos de explotación o patrones anómalos.              |
| WAF                      | Filtrar intentos conocidos de inyección en la capa web.            |
| Revisión de código       | Detectar consultas inseguras antes de producción.                  |
| Pruebas de seguridad     | Verificar formularios, filtros, login y parámetros de URL.         |
| Segmentación de datos    | Limitar el acceso entre módulos según rol o necesidad.             |



## 13. Ejemplo de corrección segura

La forma insegura de construir una consulta ocurre cuando se concatena directamente la entrada del usuario:

```text
consulta = "SELECT * FROM clientes WHERE id = " + entrada_usuario
```

La forma segura consiste en usar consultas parametrizadas:

```text
SELECT * FROM clientes WHERE id = ?
```

En este enfoque, el valor ingresado por el usuario se entrega como parámetro y no como parte de la instrucción SQL. Así, aunque el usuario escriba caracteres especiales, la base de datos los interpreta como datos y no como código.


## 14. Detección y monitoreo

Además de corregir el código, Inmobiliaria Terranova debe implementar mecanismos de detección y monitoreo.

### Eventos que deben registrarse

* Errores repetidos de base de datos.
* Entradas con caracteres anómalos.
* Intentos de acceso a registros no autorizados.
* Consultas que devuelven volúmenes inusuales de información.
* Fallos reiterados en formularios de búsqueda o login.
* Accesos desde ubicaciones o patrones inusuales.
* Respuestas del sistema con errores 500 asociados a consultas.


## 15. Actos a seguir posterior a la inyección

Se recomienda aplicar el siguiente plan de remediación:

1. Identificar todos los puntos del portal que ejecutan consultas SQL.
2. Revisar formularios, filtros, buscadores, login y parámetros de URL.
3. Reemplazar consultas concatenadas por consultas parametrizadas.
4. Validar entradas en el lado servidor.
5. Reducir permisos de la cuenta de conexión a base de datos.
6. Ocultar mensajes de error técnicos al usuario final.
7. Implementar registros y alertas para intentos sospechosos.
8. Realizar pruebas de regresión para confirmar que el portal sigue funcionando correctamente.
9. Ejecutar nuevas pruebas de seguridad para verificar que la vulnerabilidad fue corregida.
10. Documentar el cambio y actualizar procedimientos de desarrollo seguro.

### Acciones recomendadas

1. Contener el incidente, bloqueando temporalmente el punto vulnerable.
2. Preservar evidencia, incluyendo logs, consultas, horarios y direcciones IP.
3. Determinar qué registros fueron consultados, modificados o eliminados.
4. Revisar si se expusieron contratos o datos financieros de clientes.
5. Cambiar credenciales potencialmente comprometidas.
6. Restaurar información desde respaldos confiables si hubo alteración o eliminación.
7. Corregir la vulnerabilidad mediante consultas parametrizadas.
8. Notificar internamente a responsables de seguridad, operaciones y área legal.
9. Notificar a clientes o autoridades si corresponde por exposición de datos personales.
10. Documentar lecciones aprendidas y reforzar controles preventivos.

