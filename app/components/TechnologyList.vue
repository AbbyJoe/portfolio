<template>
  <section data-reveal class="mt-12 border-t border-line pt-8 sm:mt-14" aria-labelledby="technologies-heading">
    <h2 id="technologies-heading" class="m-0 font-display text-[1.35rem] font-[450] tracking-[-0.03em] text-heading">Technologies</h2>

    <div class="mt-1.5">
      <div v-for="group in groups" :key="group.label" class="grid gap-[0.7rem] border-b border-line py-[1.05rem] sm:grid-cols-[9.5rem_1fr] sm:items-baseline sm:gap-x-6 sm:gap-y-4">
        <h3 class="m-0 font-serif text-[1.02rem] font-[450] tracking-[-0.02em] text-heading">{{ group.label }}</h3>
        <ul class="m-0 flex list-none flex-wrap gap-x-[1.15rem] gap-y-[0.45rem] p-0">
          <li v-for="item in group.items" :key="item" class="inline-flex items-center gap-[0.42rem] text-[0.84rem] tracking-[-0.01em] text-ink">
            <MarkIcon :mark="technologyMark(item, false)" class="size-[0.95rem] text-ink" />
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>

    <p v-if="floor.length" class="mt-[0.95rem] font-serif text-[0.95rem] leading-snug text-muted italic">
      {{ floor.join(', ') }}. Still the floor. They just don't need a logo.
    </p>
  </section>
</template>

<script setup lang="ts">
import { technologyMark } from '~/utils/icons'

const groups = [
  {
    label: 'On the screen',
    items: ['Vue.js', 'Nuxt.js', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript'],
  },
  {
    label: 'After the button',
    items: ['C#', 'ASP.NET Core', 'Node.js', 'REST APIs'],
  },
  {
    label: 'Underneath',
    items: ['PostgreSQL', 'SQL Server', 'Docker', 'AWS', 'GCP'],
  },
]

const floor = ['HTML', 'CSS']
</script>
