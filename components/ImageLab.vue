<script setup>
// Laboratorio de imagen: tono, saturación, brillo, temperatura y valor
const imgs = [['gris', 'Gris'], ['dormido', 'Dormilón'], ['bostezo', 'Bostezo']]
const base = { h: 0, sat: 100, br: 100, t: 0, g: false }
const s = reactive({ img: 'gris', ...base })
const f = computed(() => `hue-rotate(${s.h}deg) saturate(${s.sat}%) brightness(${s.br}%) grayscale(${s.g ? 1 : 0})`)
const reset = () => Object.assign(s, base)
</script>
<template>
  <section class="card">
    <h3>Laboratorio de imagen</h3>
    <p class="mut">Cambia el color de la foto. Activa la escala de grises para estudiar el <b>valor</b> (qué tan claro u oscuro es cada zona) sin que el color te distraiga.</p>
    <div class="row"><button v-for="i in imgs" :key="i[0]" class="opt" style="width:auto" :class="{ on: s.img === i[0] }" @click="s.img = i[0]">{{ i[1] }}</button></div>
    <div class="lab">
      <img :src="`/img/panzon-${s.img}.webp`" :alt="panAlt[s.img]" :style="{ filter: f }">
      <div class="ov" :style="{ background: s.t > 0 ? '#f97316' : '#3b82f6', opacity: Math.abs(s.t) / 200 }" />
    </div>
    <label>Tono {{ s.h }}°<input v-model.number="s.h" type="range" min="0" max="360"></label>
    <label>Saturación {{ s.sat }}%<input v-model.number="s.sat" type="range" min="0" max="200"></label>
    <label>Brillo {{ s.br }}%<input v-model.number="s.br" type="range" min="50" max="150"></label>
    <label>Temperatura: {{ s.t < 0 ? 'fría' : s.t > 0 ? 'cálida' : 'neutra' }}<input v-model.number="s.t" type="range" min="-100" max="100"></label>
    <div class="row">
      <button class="opt" style="width:auto" :class="{ on: s.g }" :aria-pressed="s.g" @click="s.g = !s.g">Escala de grises</button>
      <button class="opt" style="width:auto" @click="reset">Restablecer</button>
    </div>
  </section>
</template>
