<script setup>
// <LearnTabs :items="[{ id, t, p:[...], pts:[[etiqueta, texto]], tip }]"> con un slot por id para el esquema
const props = defineProps({ items: { type: Array, required: true }, label: { type: String, default: 'Temas' } })
const cur = ref(0)
const it = computed(() => props.items[cur.value])
const key = e => {
  const n = props.items.length
  if (e.key === 'ArrowRight') cur.value = (cur.value + 1) % n
  else if (e.key === 'ArrowLeft') cur.value = (cur.value + n - 1) % n
  else return
  e.preventDefault(); nextTick(() => document.getElementById('lt-' + props.items[cur.value].id)?.focus())
}
</script>
<template>
  <section class="learn">
    <div class="tabs" role="tablist" :aria-label="label" @keydown="key">
      <button v-for="(x, i) in items" :id="'lt-' + x.id" :key="x.id" role="tab" :aria-selected="cur === i" :tabindex="cur === i ? 0 : -1" :class="{ on: cur === i }" @click="cur = i"><b>{{ i + 1 }}</b> {{ x.t }}</button>
    </div>
    <div class="lbody" role="tabpanel" :aria-labelledby="'lt-' + it.id">
      <div>
        <h3>{{ it.t }}</h3>
        <p v-for="q in it.p" :key="q">{{ q }}</p>
        <ul v-if="it.pts" class="pts"><li v-for="x in it.pts" :key="x[0]"><b>{{ x[0] }}</b> {{ x[1] }}</li></ul>
        <p v-if="it.tip" class="tip"><b>Dato clave:</b> {{ it.tip }}</p>
      </div>
      <div class="lvis"><slot :name="it.id" /></div>
    </div>
  </section>
</template>
