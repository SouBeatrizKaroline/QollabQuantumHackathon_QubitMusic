# QubitMusic — bandas sonoras adaptadas con computación cuántica y clásica

Proyecto para **Quantum Impact**: ayudar a docentes, pequeños creadores y desarrolladores independientes a crear pistas instrumentales con duración y energía específicas. Sin grabaciones de terceros, micrófono ni APIs de pago.

Ejecuta `npm start` y abre http://127.0.0.1:4173. Elige Español, ajusta tu idea, genera una pista, escucha y exporta WAV o JSON. El navegador usa una simulación QAOA identificada; en Qollab, el proyecto usa Qiskit y el backend seleccionado en la plataforma.

Seis cúbits eligen frases suaves o enérgicas. El código clásico ajusta el circuito, evalúa resultados medidos y sintetiza audio. La interfaz compara con el óptimo clásico exacto. A esta escala, la solución clásica cuesta menos; no afirmamos ventaja cuántica ni beneficios demostrados en usuarios.

Para el hackathon aún hay que ejecutar y publicar en Qollab, verificar el simulador gratuito de IonQ, publicar un vídeo de 2–3 minutos y presentar el proyecto mediante el equipo registrado. Instrucciones: [Qollab](QOLLAB.md). Documentación principal en [inglés](../README.md). Licencia MIT.
