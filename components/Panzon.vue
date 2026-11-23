<script setup>
defineProps({ name: { type: String, default: 'gris' }, size: { type: Number, default: 120 }, bob: Boolean, framed: Boolean, cap: String })
</script>
<template>
  <figure v-if="framed" class="polo" :class="{ bob }" :style="{ width: size + 'px' }">
    <img :src="`/img/panzon-${name}.webp`" :alt="panAlt[name]" loading="lazy">
    <figcaption v-if="cap">{{ cap }}</figcaption>
  </figure>
  <img v-else :src="`/img/panzon-${name}.webp`" :alt="panAlt[name]" :width="size" :height="size" class="pan" :class="{ bob }" loading="lazy">
</template>
