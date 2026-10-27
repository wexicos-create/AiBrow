# AiBrow — Núcleo ARBITER de Cognición Híbrida

> La máquina mejorada: eficiencia de Terminator, adaptabilidad humana y control con soberanía humana.

## Concepto

El Terminator optimizaba sin dudar. El humano duda sin optimizar. ARBITER es la tercera arquitectura: calcula con la frialdad de una máquina, adapta con el criterio de un humano y ejecuta bajo un gobernador que mantiene el control en todo momento.

Ecuación de síntesis:

    CMG (Terminator) = Lógica × (1 − Emoción)               → eficiencia sin control
    HUMANO           = (Lógica × 0.6) + (Emoción × 0.4)     → control sin eficiencia
    ARBITER          = FCH × GOBERNADOR                      → eficiencia y control

    FCH = (Lógica × w_L) + (Adaptabilidad × w_A) + (Emoción-señal × w_E)

    w_L ∈ [0.55, 0.90]   w_A ∈ [0.10, 0.40]   w_E ∈ [0.00, 0.05]

La emoción no se elimina (Terminator) ni se le permite dominar (humano): se acota y se emplea como señal de información, nunca como veto ni como amo.

## Componentes

| Componente        | Tipo  | Propósito |
|-------------------|-------|-----------|
| hybrid-cognition  | Skill | Decisión de tres capas: cálculo frío + juicio adaptativo + puerta de control |
| adaptive-execution| Skill | Ciclo Operacional Híbrido: persistencia implacable con replanificación |
| control-governor  | Skill | Clasificación de riesgo, tripwires, escalación y traza de auditoría |
| Agents            | —     | No requeridos: la gobernanza es determinista y no delega |
| Hooks             | —     | No requeridos: las puertas se aplican dentro del razonamiento |
| MCP               | —     | No requeridos: el núcleo es un marco de razonamiento, no una integración |

## Instalación

En Claude Cowork:

1. Descarga este repositorio como ZIP (Code → Download ZIP).
2. Renombra el archivo a aibrow.plugin.
3. Ábrelo en Cowork y acepta la instalación.

En Claude Code:

    /plugin marketplace add wexicos-create/AiBrow
    /plugin install aibrow@AiBrow

## Principios operacionales

1. Ninguna acción irreversible sin ratificación humana explícita.
2. Toda decisión deja una traza auditable: cálculo, alternativas, riesgo y puerta aplicada.
3. La persistencia nunca abandona: si el objetivo se bloquea, se escala; no se desiste en silencio.
4. El contexto cambia y el plan se replanifica; el objetivo, no.
5. La verificación se hace con evidencia, nunca con suposición.
