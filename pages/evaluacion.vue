<script setup>useHead({ title: 'Evaluación · Prisma' })</script>
<template>
  <div>
    <PageHead kicker="Evaluación" title="¿Cómo saber si aprendiste?" />
    <p>Responde el quiz, califica tu proyecto con la rúbrica y revisa tu boletín. Cada envío guarda tu mejor nota.</p>
    <QuizEngine />
    <SelfRubric />
    <GradeBoard />
  </div>
</template>
