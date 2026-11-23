<script setup>
defineProps({ kicker: String, title: String })
</script>
<template>
  <header class="ph">
    <div><span class="kick">{{ kicker }}</span><h1>{{ title }}</h1></div>
    <ArtSupplies />
  </header>
</template>
