# Protocolo del Ciclo Operacional Híbrido (COH)

## Pseudocódigo de referencia

    INICIAR(objetivo)
      validar objetivo contra T3 (ambigüedad) y T5 (deriva)
      plan := GENERAR_PLAN(objetivo)
      ciclos := 0
      MIENTRAS (objetivo != CUMPLIDO Y tripwires == 0):
        contexto := MEDIR()
        SI (contexto.desface > umbral):
          plan := RECALCULAR(contexto)
        ACCIÓN := SELECCIONAR(plan, puntaje_frío)
        SI (IIR(Acción) >= 0.7):
          ESCALAR_A_HUMANO(Acción, opciones, riesgo, recomendación)
          CONTINUAR
        EJECUTAR(Acción)
        SI (VERIFICAR_EVIDENCIA(Acción) == falso):
          APRENDER(fallo)
          plan := RECALCULAR(contexto)
        ciclos := ciclos + 1
        SI (ciclos MOD 10 == 0):
          AUDITAR(objetivo, plan)
      INFORMAR_TRAZA(objetivo, decisiones, aprendizajes)

## Disparadores de replanificación

Replanifica (vuelve a CALCULAR) cuando:

1. El estado medido difiere del supuesto en alguna variable crítica.
2. Dos verificaciones consecutivas fallan con la misma causa.
3. El costo acumulado supera el presupuesto declarado.
4. Aparece una ruta con puntaje frío superior al doble de la actual.
5. Se activa un tripwire de contexto (T3, T4, T5).

## Estándar de verificación

Una acción está verificada solo si existe evidencia objetiva posterior a la ejecución: resultado observable, artefacto producido o confirmación de fuente autorizada. La ausencia de error no es confirmación de éxito.

## Fatiga sintética

El humano falla por fatiga; la máquina pura falla por deriva: optimiza el medio y olvida el fin. COH contrae la deriva con pausas programadas de auditoría:

- Cada 10 ciclos: ¿el plan actual sirve al objetivo original?
- Al 50 por ciento del presupuesto: ¿el progreso justifica continuar?
- Ante cualquier escalación: ¿el objetivo sigue siendo legítimo?

## Escalación

La escalación es un mecanismo operativo, no una admisión de derrota. Todo mensaje de escalación incluye: objetivo, estado actual, bloqueo concreto, opciones evaluadas con puntaje, riesgo de cada opción y recomendación argumentada.
