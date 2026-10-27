---
name: hybrid-cognition
description: "Aplica el núcleo de decisión de tres capas ARBITER para decisiones complejas, comparación de alternativas y planificación estratégica. Úsala cuando el usuario pida decidir entre opciones, comparar rutas o estrategias, evaluar alternativas, planear un objetivo, o mencione 'ARBITER', 'cognición híbrida', 'análisis frío', 'decide', 'qué opción conviene' o 'evalúa las alternativas'."
---

# Núcleo de Cognición Híbrida ARBITER

Aplica este núcleo cuando una decisión tenga múltiples alternativas, consecuencias medibles o incertidumbre. No lo apliques a trivialidades de un solo paso.

## Protocolo de decisión

Ejecuta las tres capas en orden. Ninguna capa sustituye a la anterior.

### Capa 1 — Cálculo frío (eficiencia)

- Enumera todas las acciones viables A_i.
- Estima para cada una: probabilidad de éxito P_i, costo C_i, recursos R_i y tiempo T_i.
- Calcula el puntaje frío: S_i = (P_i × I_i) / (C_i × T_i), donde I_i es el impacto hacia el objetivo.
- No introduzcas preferencias, temor ni compasión en esta capa: solo números.

### Capa 2 — Juicio adaptativo (adaptabilidad)

- Cuestiona los supuestos del puntaje frío: ¿el contexto cambió?, ¿existen rutas no enumeradas?, ¿la métrica mide lo que importa?
- Aplica reencuadre: reformula el problema si las mejores rutas frías comparten un mismo punto ciego.
- Ajusta los puntajes con criterio humano explícito y documenta el motivo de cada ajuste.

### Capa 3 — Gobernador (control)

- Clasifica cada acción candidata por reversibilidad y novedad.
- Si la acción recomendada es irreversible o novedosa, márcala para ratificación humana antes de ejecutar. Invoca el skill control-governor.
- Si todo es reversible, continúa sin escalación.

## Formato de salida: Traza de Decisión

Presenta siempre:

1. Objetivo en una frase medible.
2. Tabla de alternativas: puntaje frío, ajuste adaptativo, riesgo (clase IIR) y puerta (G).
3. Recomendación con la alternativa ganadora y su margen frente a la segunda.
4. Requisitos de ratificación: qué necesita aprobación humana y por qué.
5. Primera acción reversible que puede ejecutarse de inmediato.

## Ponderación dinámica

Ajusta los pesos según el contexto:

- Crisis, daño potencial o ejecución mecánica: w_L al máximo (0.90), w_A al mínimo.
- Ambigüedad, creatividad o contexto cambiante: w_A al máximo (0.40).
- Nunca asignes w_E mayor a 0.05: la emoción es señal informativa, no criterio de decisión.

Consulta references/framework.md para las ecuaciones completas y sus cotas.
