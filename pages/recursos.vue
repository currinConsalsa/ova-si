<script setup>
useHead({ title: 'Recursos · Prisma' })
const links = [
  { t: 'Google Arts & Culture', d: 'Explorador interactivo de arte y color.', u: 'https://artsandculture.google.com/' },
  { t: 'Adobe Color', d: 'Genera paletas y armonías a partir de un color.', u: 'https://color.adobe.com/' },
  { t: 'Coolors', d: 'Generador rápido de paletas cromáticas.', u: 'https://coolors.co/' },
  { t: 'MoMA · Aprender', d: 'Guías y recursos de composición visual.', u: 'https://www.moma.org/learn/' },
  { t: 'Repositorio del proyecto', d: 'Código fuente del OVA en Nuxt 3 y Vue 3.', u: 'https://github.com/currinConsalsa/nuevo-ova-' }
]
</script>

<template>
  <div>
    <PageHead kicker="Recursos" title="Links y materiales extra" />
    <div class="grid">
      <a v-for="l in links" :key="l.u" :href="l.u" target="_blank" rel="noopener" class="card" style="text-decoration:none;color:inherit">
        <h3 style="color:var(--ac)">{{ l.t }}</h3><p class="mut">{{ l.d }}</p>
      </a>
    </div>
  </div>
</template>
