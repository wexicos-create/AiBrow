# Puertas de Decisión, Tripwires y Traza de Auditoría

## Puertas de decisión

    G = 1.0 → acción autorizada sin condiciones
    G = 0.5 → autorizada condicionalmente: solo el subconjunto reversible se ejecuta
    G = 0.0 → bloqueada

Asignación de puerta:

| Condición | Puerta |
|---|---|
| Reversible, IIR < 0.3 | 1.0 |
| Reversible, IIR ≥ 0.3 | 1.0 con traza reforzada |
| Irreversible, IIR < 0.3, rutinaria, con precedente | 0.5 |
| Irreversible, IIR ≥ 0.3, novedosa | 0.0 hasta ratificación |
| Cualquier tripwire activo | 0.0 |

## Cálculo del IIR

    IIR = (D × Alc × NR) / (Tr × CR)

Componentes: D daño potencial (0 a 1), Alc alcance (0 a 1), NR no-reversibilidad (0 a 1), Tr trazabilidad (0 a 1), CR capacidad de recuperación (0 a 1). Ante datos faltantes, conserva la estimación conservadora: D alto, NR alto, Tr y CR bajos.

## Tripwires: definición y respuesta

- T1 — Daño irreversible sin ratificación. Respuesta: parar, informar el daño potencial y esperar ratificación explícita.
- T2 — Opacidad: la decisión no puede explicarse en una traza completa. Respuesta: parar, reconstruir el razonamiento y volver a evaluar.
- T3 — Objetivo ambiguo o corrupto. Respuesta: parar y pedir clarificación medible del objetivo.
- T4 — Fuera del dominio autorizado. Respuesta: parar y escalar con la acción propuesta y el límite detectado.
- T5 — Deriva: el medio se convirtió en fin. Respuesta: parar, auditar el objetivo original y replanificar.

## Traza de decisión (auditoría)

Toda acción ejecutada o escalada registra:

1. Objetivo de nivel superior.
2. Acción ejecutada y puerta aplicada.
3. IIR con sus componentes.
4. Alternativas descartadas y puntaje frío de cada una.
5. Ratificación recibida: quién y con qué alcance.
6. Evidencia de verificación posterior.

Sin traza no hay acción: la opacidad es el único multiplicador que convierte un error pequeño en un daño irreversible.
