<script setup>
useHead({ title: 'Módulo 1 · Prisma' })
const col = ref({ h: 200, s: 70, l: 50 })
const items = [
  { id: 'modelos', t: 'Luz y pigmento', p: ['Hay dos formas de mezclar color. En una pantalla mezclas luz: el modelo RGB (rojo, verde, azul) es aditivo, y al sumar todo se llega al blanco.', 'En el papel mezclas pigmentos: el modelo RYB (rojo, amarillo, azul) es sustractivo, porque cada pintura absorbe luz y el resultado se oscurece.'], pts: [['Primarios', 'rojo, amarillo y azul: no salen de otra mezcla.'], ['Secundarios', 'naranja, verde y violeta: mezcla de dos primarios.'], ['Terciarios', 'un primario con su secundario vecino.']], tip: 'Por eso la pantalla y la impresora no muestran exactamente el mismo color.' },
  { id: 'temp', t: 'Temperatura', p: ['Los colores cálidos (rojos, naranjas, amarillos) parecen acercarse y dan energía. Los fríos (azules, verdes, violetas) parecen alejarse y transmiten calma.', 'Un artista combina los dos: un acento cálido pequeño sobre un fondo frío llama la atención sin gritar.'], tip: 'El verde amarillento y el rojo violáceo son «templados»: se inclinan según su vecino.' },
  { id: 'arm', t: 'Armonías', p: ['Una armonía es un grupo de colores que funciona bien junto porque guardan una relación fija en el círculo. Prueba abajo: mueve el matiz y cambia el tipo.'], pts: [['Análogos', 'vecinos: suaves y naturales.'], ['Complementarios', 'opuestos: contraste máximo.'], ['Tríada', '120° entre sí: vivos y equilibrados.']], tip: 'Usa un color dominante (60 %), uno secundario (30 %) y un acento (10 %).' },
  { id: 'val', t: 'Valor y saturación', p: ['Además del matiz (el «nombre» del color) hay dos dimensiones más. El valor es qué tan claro u oscuro es. La saturación es qué tan puro o apagado se ve.', 'Añadir blanco crea un tinte, añadir gris crea un tono y añadir negro crea una sombra. Mueve el matiz para ver cómo cambian.'], tip: 'Una foto en blanco y negro solo muestra el valor: es el esqueleto de una buena imagen.' }
]
const hue = ref(200)
</script>

<template>
  <div>
    <PageHead kicker="Contenido · Módulo 1" title="La naturaleza del color" />
    <p>Empieza por la teoría: elige un tema, lee lo esencial y juega con el esquema. Después pasa a las herramientas y termina con el duelo de armonías.</p>
    <LearnTabs :items="items" label="Temas del módulo 1">
      <template #modelos><div class="two"><Diagram kind="rgb" /><Diagram kind="ryb" /></div></template>
      <template #temp><Diagram kind="temp" /></template>
      <template #arm><HarmonyLab /></template>
      <template #val><label class="mut" for="m1-h" style="display:block">Matiz: {{ hue }}°</label><input id="m1-h" v-model.number="hue" type="range" min="0" max="359"><Diagram kind="tints" :base="hue" /></template>
    </LearnTabs>
    <h2>Herramientas</h2>
    <ColorWheel />
    <ColorMixer v-model="col" />
    <h2>Pon a prueba lo aprendido</h2>
    <HarmonyGame />
  </div>
</template>
