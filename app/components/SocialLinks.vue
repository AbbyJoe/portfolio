<template>
  <section data-reveal class="mt-12 border-t border-line pt-8 sm:mt-14" aria-labelledby="find-me-heading">
    <h2 id="find-me-heading" class="font-display text-[1.0625rem] font-[560] tracking-[-0.02em] text-heading">
      Find me on
    </h2>
    <ul class="mt-4 flex list-none flex-wrap gap-2.5 p-0">
      <li v-for="link in links" :key="link.label">
        <a
          v-if="link.href"
          class="grid size-10 place-items-center rounded-full border border-line text-inherit no-underline transition duration-200 hover:-translate-y-0.5 hover:border-accent/45 hover:bg-accent/10"
          :href="link.href"
          :target="external(link.href) ? '_blank' : undefined"
          :rel="external(link.href) ? 'noopener noreferrer me' : undefined"
          :aria-label="external(link.href) ? `${link.label} (opens in a new tab)` : link.label"
        >
          <MarkIcon :mark="socialMark(link.label)" class="size-[1.15rem] text-glint" />
        </a>
        <span v-else class="grid size-10 place-items-center rounded-full border border-line" :aria-label="link.label">
          <MarkIcon :mark="socialMark(link.label)" class="size-[1.15rem] text-glint" />
        </span>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { socialMark } from '~/utils/icons'

const links = [
  { label: 'GitHub', href: 'https://github.com/AbbyJoe' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abiodun-arigbede' },
  { label: 'X', href: 'https://x.com/abbyjoe__' },
  { label: 'Email', href: 'mailto:arigbedeabiodun@gmail.com' },
]

function external(href: string) {
  return href.startsWith('http://') || href.startsWith('https://')
}
</script>
