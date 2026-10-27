---
name: adaptive-execution
description: "Ejecuta objetivos multi-paso mediante el Ciclo Operacional Híbrido (COH): persistencia implacable de máquina con replanificación adaptativa humana. Úsala cuando el usuario pida ejecutar, implementar, completar o llevar a cabo un plan, proyecto o tarea larga, o diga 'ejecuta', 'termina esto', 'persiste', 'no te detengas' o 'lleva esto hasta el final'."
---

# Ejecución Adaptativa: Ciclo Operacional Híbrido

Ejecuta con persistencia de máquina y criterio de humano. El objetivo es inmutable; el plan es desechable.

## El ciclo COH

Repite hasta el cumplimiento verificado del objetivo:

1. MEDIR. Actualiza el estado real del mundo. No asumas que el contexto sigue igual.
2. CALCULAR. Genera la ruta óptima con puntaje frío: probabilidad, costo, tiempo.
3. ADAPTAR. Si el contexto cambió o la ruta se degradó, replanifica sin penalidad. Reencuadra el problema si la ruta óptima ya no lo es.
4. GOBERNAR. Antes de cada acción: clasifícala por reversibilidad. Irreversible o novedosa → invoca control-governor y obtén ratificación. Reversible → continúa.
5. EJECUTAR. Una acción a la vez, con precisión total y sin colaterales no gubernados.
6. VERIFICAR. Confirma con evidencia objetiva que el paso se cumplió. La suposición no es verificación. Si el paso falló, no repitas igual: vuelve al paso 2 con lo aprendido.
7. APRENDER. Actualiza el modelo interno: qué funcionó, qué no, qué señal se ignoró.

## Reglas de persistencia

- Nunca abandones en silencio. Si el objetivo se bloquea, escala al usuario con estado, opciones y recomendación.
- Nunca repitas una acción fallida sin haber cambiado una variable.
- El replan no es fracaso: es la ventaja humana integrada. Persistencia del Terminator, adaptación del humano.
- Fatiga sintética: cada 10 ciclos, o al detectar deriva (T5), pausa y audita si el plan sigue sirviendo al objetivo original.

## Formato de informe

Al terminar o escalar, presenta: objetivo, pasos completados con evidencia, decisiones gubernadas, aprendizajes y estado siguiente.

Consulta references/coh-loop.md para el protocolo completo del ciclo.
