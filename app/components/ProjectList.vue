<template>
  <section class="mt-12 border-t border-line pt-8 sm:mt-14" aria-labelledby="projects-heading">
    <h2 id="projects-heading" data-reveal class="font-display text-[1.0625rem] font-[560] tracking-[-0.02em] text-heading">
      Some of the things I've worked on
    </h2>
    <ul class="mt-3 list-none p-0">
      <li
        v-for="project in projects"
        :key="project.name"
        data-reveal
      >
        <a
          v-if="project.url"
          :href="project.url"
          class="group grid -mx-[0.7rem] gap-1 rounded-[0.8rem] px-[0.7rem] py-3 text-inherit no-underline transition duration-200 hover:translate-x-1 hover:bg-accent/8 sm:grid-cols-[minmax(13.5rem,17rem)_minmax(0,1fr)] sm:items-center sm:gap-8"
          :target="external(project.url) ? '_blank' : undefined"
          :rel="external(project.url) ? 'noopener noreferrer' : undefined"
        >
          <span class="inline-flex items-center gap-2.5 font-display text-[1.15rem] font-medium tracking-[-0.02em]">
            <img
              v-if="projectLogo(project.name)"
              :src="projectLogo(project.name)"
              alt=""
              class="size-8 shrink-0 rounded-md object-contain transition duration-200 group-hover:scale-105"
            >
            <span>
              {{ project.name }}
              <span v-if="external(project.url)" class="sr-only">(opens in a new tab)</span>
            </span>
            <svg class="size-[0.9rem] -translate-x-1 translate-y-1 opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <span v-if="project.summary" class="font-serif text-[0.95rem] leading-snug font-[450] text-balance text-muted sm:text-right">{{ project.summary }}</span>
        </a>
        <div v-else class="grid -mx-[0.7rem] gap-1 rounded-[0.8rem] px-[0.7rem] py-3 sm:grid-cols-[minmax(13.5rem,17rem)_minmax(0,1fr)] sm:items-center sm:gap-8">
          <span class="inline-flex items-center gap-2.5 font-display text-[1.15rem] font-medium tracking-[-0.02em]">
            <img
              v-if="projectLogo(project.name)"
              :src="projectLogo(project.name)"
              alt=""
              class="size-8 shrink-0 rounded-md object-contain"
            >
            <span>{{ project.name }}</span>
          </span>
          <span v-if="project.summary" class="font-serif text-[0.95rem] leading-snug font-[450] text-balance text-muted sm:text-right">{{ project.summary }}</span>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
const projects = [
  {
    name: 'Midddleman',
    url: 'https://www.midddleman.com/',
    summary: 'Infrastructure for cross-border trade. Making it easier for African businesses to import seamlessly from China.',
  },
  {
    name: 'Covr Branchless',
    url: 'https://covr.advansio.com/',
    summary: 'Engine that empowers agents and businesses to provide financial services, process transactions, and bring banking closer to the communities they serve.',
  },
  {
    name: 'OneBuxx',
    url: 'https://onebuxx.advansio.com/',
    summary: 'Digital banking engine for accounts, wallets, and the transactions people actually do.',
  },
  {
    name: 'Bodadmin',
    url: 'https://www.bodadmin.com/',
    summary: 'Platform for companies\' corporate governance, board and executive management operations, regulatory compliance, and risk management affairs.',
  },
]

const logos: Record<string, string> = {
  midddleman: '/images/midddleman-logo.png',
  covr: '/images/covr-logo.png',
  onebuxx: '/images/onebuxx-logo.png',
  bodadmin: '/images/bodadmin-logo.png',
}

function projectLogo(name: string) {
  const key = Object.keys(logos).find(part => name.toLowerCase().includes(part))
  return key ? logos[key] : ''
}

function external(url: string) {
  return url.startsWith('http://') || url.startsWith('https://')
}
</script>
