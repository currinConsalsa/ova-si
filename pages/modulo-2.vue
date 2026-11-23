<script setup>
useHead({ title: 'Módulo 2 · Prisma' })
const items = [
  { id: 'peso', t: 'Peso visual', p: ['El peso visual es la fuerza con la que un elemento atrae la mirada. No depende de los kilos: depende de cómo se ve.'], pts: [['Tamaño', 'lo grande pesa más que lo pequeño.'], ['Saturación', 'el color vivo pesa más que el apagado.'], ['Contraste', 'lo claro sobre oscuro (o al revés) destaca.']], tip: 'Un punto pequeño pero muy rojo puede pesar tanto como una forma grande y gris.' },
  { id: 'equi', t: 'Equilibrio', p: ['Equilibrar es repartir el peso visual para que la imagen no «caiga» hacia un lado. Hay tres formas clásicas de lograrlo.'], pts: [['Simétrico', 'mismo peso a ambos lados: formal y estable.'], ['Asimétrico', 'pesos distintos que se compensan: dinámico.'], ['Radial', 'los elementos giran alrededor de un centro.']], tip: 'Una forma grande cerca del eje equilibra a una pequeña lejos, como en un balancín.' },
  { id: 'terc', t: 'Ley de los tercios', p: ['Divide el encuadre con dos líneas verticales y dos horizontales. Obtienes nueve zonas y cuatro cruces llamados puntos de oro.', 'Colocar el elemento principal en un punto de oro hace la imagen más viva que ponerlo justo en el centro.'], tip: 'Pon el horizonte sobre una línea de tercio, no a la mitad.' },
  { id: 'ritmo', t: 'Ritmo y dirección', p: ['El ritmo nace al repetir formas, colores o tamaños con pequeñas variaciones. El ojo sigue esa repetición como si fuera música.', 'Las líneas, las miradas y los bordes también dirigen la vista: úsalos para llevarla hacia tu punto principal.'], tip: 'Repetir sin variar aburre; variar sin repetir confunde.' }
]
</script>

<template>
  <div>
    <PageHead kicker="Contenido · Módulo 2" title="Principios de composición artística" />
    <p>Componer es decidir dónde va cada cosa en el encuadre. Revisa los cuatro principios y luego pon en práctica la misión de composición.</p>
    <LearnTabs :items="items" label="Temas del módulo 2">
      <template #peso><div class="three"><Diagram kind="weight" /></div></template>
      <template #equi><div class="three"><Diagram kind="balance" /></div></template>
      <template #terc><Diagram kind="thirds" /></template>
      <template #ritmo><Diagram kind="rhythm" /></template>
    </LearnTabs>
    <h2>Misión de composición</h2>
    <InteractiveCanvas />
  </div>
</template>
