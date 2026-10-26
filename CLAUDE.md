# Diario emocional de lectura

## Sobre mí y cómo trabajar conmigo

- Soy principiante: estoy aprendiendo a programar con este proyecto. Mi objetivo es **entender** lo que construimos, no solo tenerlo funcionando.
- Háblame en español y en lenguaje simple. Cuando aparezca un término técnico nuevo (por ejemplo "función", "commit" o "localStorage"), explícalo en una frase la primera vez.
- Antes de escribir código, cuéntame el plan en pocos pasos y espera mi "ok".
- Avanza **de a un paso pequeño**. Después de cada cambio, dime qué archivo tocaste, qué hace lo que agregaste y cómo puedo verlo funcionar.
- Cada tanto, hazme una pregunta corta para comprobar que entendí. Si no entendí, explícalo de otra manera, sin repetir lo mismo.
- Trabajo en sesiones cortas. Cada sesión debería terminar con algo visible que funcione.
- Si algo se puede hacer de varias formas, elige la más simple y dime brevemente por qué.

## Qué estamos construyendo

Una app web personal para registrar cómo me hace sentir cada capítulo de los libros que leo, inspirada en howsadisthischapter.com, pero con mis propias calificaciones.

Funcionalidades previstas, en orden:

1. Biblioteca: ver mis libros.
2. Agregar libros con estado: leyendo, terminado o abandonado.
3. Registro por capítulo: intensidad emocional (0 a 5), una o más emociones y una nota corta opcional.
4. Curva emocional de cada libro: un gráfico de la intensidad a lo largo de los capítulos.
5. Guardar los datos de forma permanente y poder abrir la app desde el celular.

Emociones disponibles: tristeza, tensión, risa, ternura, enojo, ansiedad, sorpresa, spicy, cringe.

## Decisiones técnicas

- Empezamos con HTML, CSS y JavaScript simples, sin frameworks, para que pueda entender cada línea. Si más adelante conviene sumar algo, lo hablamos antes.
- La app tiene que verse bien en el celular.
- Usamos git desde el inicio y hacemos un commit al final de cada paso que funcione, con un mensaje claro. Enséñame git sobre la marcha.

## Privacidad y portafolio

Este proyecto va a ser parte de mi portafolio, así que el código será público, pero mis datos no.

- Mis registros reales se guardan solo en mi dispositivo y **nunca** se suben al repositorio.
- La app trae un modo de ejemplo con libros y registros inventados, para que cualquiera pueda probarla.

## Bitácora de aprendizaje (en Obsidian)

Llevo la bitácora en mi bóveda de Obsidian, **fuera de este repositorio**, para que mis notas personales no se suban a GitHub.

Ruta de la carpeta del proyecto en la bóveda: `/Users/johasalasrod/Documents/Obsidian Vault/Reading Diary/`

Todas las notas de la bitácora (`Bitácora/`, `Conceptos/` y la nota principal `Diario lectura app.md`) van dentro de esa carpeta.

### Al final de cada sesión

1. Hazme estas preguntas, de a una:
    1. ¿Qué construimos hoy?
    2. ¿Qué aprendiste?
    3. ¿Qué te costó o te confundió?
    4. ¿Qué quedó pendiente?
2. Crea una nota en `Bitácora/` llamada `AAAA-MM-DD Sesión N.md`, usando mis respuestas con mis palabras (puedes ordenarlas, pero no reescribirlas). Usa este formato:

```markdown
---
fecha: AAAA-MM-DD
sesion: N
etapa: [número y nombre de la etapa]
tags: [bitacora, diario-lectura-app]
---
# Sesión N — [título corto]

## Qué construimos
## Qué aprendí
## Qué me costó
## Pendiente
## Conceptos nuevos
- [[nombre del concepto]]
## Commits
- [mensaje del commit]
```

3. Por cada concepto nuevo de la sesión (por ejemplo [[git]], [[HTML]] o [[localStorage]]):
    - Si todavía no existe, crea una nota en `Conceptos/` con: una explicación en 2 o 3 frases simples, un ejemplo de este proyecto donde se usa, y una sección vacía "En mis palabras" para que la complete yo.
    - Si ya existe, no la modifiques: solo enlázala.
4. Actualiza `Diario lectura app.md` (la nota principal del proyecto) agregando un enlace a la sesión nueva en la lista de sesiones.
