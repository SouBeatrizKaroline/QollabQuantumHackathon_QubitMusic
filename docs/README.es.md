# QubitMusic — Español

**Crea bandas sonoras instrumentales cortas con computación cuántica y clásica. Ajusta, genera, escucha, compara y exporta.**

[English — documentación técnica completa](../README.md) · [Português do Brasil](README.pt-BR.md) · [Português de Portugal](README.pt-PT.md)

## Problema y propuesta

Docentes, pequeños creadores y desarrolladores independientes necesitan música que encaje en clases, vídeos y juegos. Buscar una grabación, comprobar sus condiciones de uso y ajustar su duración requiere trabajo.

QubitMusic explora una alternativa: generar fragmentos instrumentales según la duración y energía deseadas. La propuesta de **Quantum Impact** es hacer este proceso más accesible. El beneficio todavía debe medirse con usuarios.

El prototipo no genera voces, letras, canciones completas ni audio a partir de texto libre. No se afirma ninguna ventaja cuántica.

## Funciones

| Control | Opciones |
| --- | --- |
| Duración | 8–60 segundos |
| Energía | 0–100% |
| Timbre | Warm, glass y pulse, con etiquetas traducidas en la interfaz |
| Tonalidad | C, D, F y A |
| Variación | Semilla para las notas y botón de remix |
| Resultado | Visualización de notas y seis secciones |
| Exportación | WAV mono de 22.050 Hz/16 bits y JSON |
| Comparación | Arreglo clásico exacto, coste y diferencia respecto al óptimo |
| Idiomas | Inglés, portugués de Brasil, portugués de Portugal y español |

## Ejecutar localmente

Requiere Node.js 20 o posterior y un navegador con Web Audio. No hay dependencias npm ni claves de API.

```sh
git clone https://github.com/SouBeatrizKaroline/QollabQuantumHackathon_QubitMusic.git
cd QollabQuantumHackathon_QubitMusic
npm start
```

Abre **http://127.0.0.1:4173**, selecciona **Español**, elige una propuesta y ajusta los controles. Genera, reproduce y exporta. Cambiar los controles no vuelve a generar automáticamente la pista.

Ejemplos: clase de 24 segundos con 25% de energía; vídeo de 30 segundos con 55%; juego de 16 segundos con 85%. La paleta cambia el timbre y la semilla cambia las notas.

No hay guardado automático. Exporta antes de cerrar. El volumen de reproducción no modifica el WAV. La comparación clásica sustituye la pista activa: exporta primero la versión medida para conservar ambas. La interfaz actual no importa el JSON exportado.

## Papel de la computación cuántica

Seis qubits representan seis decisiones entre secciones suaves y enérgicas: 64 arreglos posibles. Una función de coste combina ajuste a la energía, suavidad de las transiciones, presupuesto de energía y preferencia por extremos suaves.

El código clásico ajusta 120 pares de parámetros de un circuito QAOA de una capa. El circuito produce 256 mediciones y se selecciona el arreglo de menor coste realmente observado. Después, código clásico compone notas pentatónicas, bajo y pads y sintetiza el audio.

El óptimo clásico procede de evaluar los 64 estados. La diferencia mostrada es el coste seleccionado menos el óptimo. Cero significa coste óptimo, no ventaja cuántica. En esta escala, la enumeración clásica es más barata. La función de coste es una aproximación de diseño, no una medida validada de calidad musical.

## Qollab y Vercel

**Navegador/Vercel:** simulación ideal en JavaScript, identificada en la interfaz. No ejecuta Qiskit ni accede a un backend remoto.

**Qollab:** Python/Qiskit utiliza el backend proporcionado por la plataforma. Ejecuta `npm run package:qollab` y sube el contenido de `artifacts/qollab/`, conservando las carpetas. Elige **Upload your own files**, deja vacía la plantilla opcional y utiliza el formato JS/Qiskit. Prueba primero el simulador integrado y después el simulador IonQ gratuito.

Cada ejecución en Qollab permite un intento de generación, aunque falle. Usa **Stop → Run** antes de generar de nuevo. La semilla controla las notas, no la repetibilidad de las mediciones remotas. Consulta la [guía de Qollab](QOLLAB.md).

Para Vercel, ejecuta `npm run build`. Importa el repositorio con **Other**, raíz `./`, comando `npm run build` y salida `dist`. No se necesitan variables de entorno. La dirección prevista es [qubitmusic.vercel.app](https://qubitmusic.vercel.app/), cuyo despliegue y dominio todavía no se han verificado. El QR del pitch depende de esa dirección exacta. Consulta la [guía de Vercel](VERCEL.md).

## Pruebas y estado

```sh
npm test
npm run build
python -m pip install -r requirements.txt
python -m unittest discover -s tests -p 'test_*.py'
```

Python/Qiskit solo es necesario para las pruebas Python, que también utilizan Node.js. Se verificaron localmente seis pruebas JavaScript, cuatro pruebas Python, los idiomas, la reproducción y la exportación WAV. Consulta el [registro de validación](VALIDATION.md).

La ejecución/publicación en Qollab, el simulador IonQ remoto, el despliegue público y el envío al hackathon siguen pendientes de verificación. El pitch en inglés con subtítulos en portugués de Portugal se preparó por separado; su publicación no se ha verificado.

## Resolución de problemas

- Página incompleta: usa `npm start`; el HTML de la raíz está destinado a Qollab.
- Sin sonido: genera primero, pulsa reproducir y comprueba el volumen del sistema.
- Nueva generación bloqueada en Qollab: usa Stop → Run.
- Falta Qiskit: instala los requisitos en el entorno Python usado para las pruebas.
- Vercel incompleto: comprueba la carpeta de salida `dist`.

## Impacto, colaboración y licencia

Para medir el impacto, compara con una versión clásica y con búsqueda/edición convencional: tiempo hasta aceptar una pista, tareas completadas y valoraciones de oyentes. No hay estudio realizado, garantía de originalidad jurídica de las melodías ni resultados en hardware.

La implementación inicial se creó el 11 de octubre de 2026 con asistencia de IA. Para participar, sigue los [requisitos oficiales](https://qollab.xyz/programs/hackathon/how-it-works), publica el proyecto Qiskit en Qollab bajo MIT y envía el vídeo público mediante el equipo registrado.

Las contribuciones deben mantener los cuatro idiomas y la equivalencia de probabilidades JavaScript/Qiskit. Consulta la [arquitectura](ARCHITECTURE.md) y el [texto de presentación](PROJECT_PAGE.md).

Licencia [MIT](../LICENSE). No se incluyen grabaciones ni muestras de terceros. El proyecto no impone restricciones adicionales al audio exportado. MIDI, importación de proyectos y arreglos más ricos son propuestas futuras, todavía no implementadas.
