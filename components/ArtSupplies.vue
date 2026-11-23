<script setup>
// Lápices de colores decorativos (SVG)
const cols = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899']
const top = i => 10 + ((i * 37) % 5) * 8
</script>
<template>
  <svg class="pen" viewBox="0 0 380 110" aria-hidden="true">
    <g v-for="(c, i) in cols" :key="c" :transform="`translate(${8 + i * 46} ${top(i)})`">
      <polygon points="0,26 24,26 12,0" fill="#f1d9b5" />
      <polygon points="8,12 16,12 12,0" :fill="c" />
      <rect y="26" width="24" :height="84 - top(i)" :fill="c" rx="2" />
      <rect y="26" width="24" height="5" fill="#0f172a" opacity=".25" />
    </g>
  </svg>
</template>
