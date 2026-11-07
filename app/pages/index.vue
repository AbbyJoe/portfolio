<template>
  <div>
    <a class="absolute -top-16 left-4 z-20 rounded-sm bg-ink px-3 py-1.5 text-sm text-paper focus:top-4" href="#content">Skip to content</a>
    <main id="content" tabindex="-1" class="mx-auto w-full max-w-160 px-5 pt-8 pb-24 outline-none transition-[opacity,scale,filter] duration-1300 ease-[cubic-bezier(0.2,0.7,0.2,1)] in-data-[intro=play]:scale-[0.9] in-data-[intro=play]:opacity-0 in-data-[intro=play]:blur-sm sm:px-6 sm:pt-12 sm:pb-28">
      <header data-reveal>
        <HeaderTelemetry />
        <h1 class="mt-10 mb-0 font-display text-[1.75rem] leading-[1.08] font-[450] tracking-[-0.03em] text-balance text-heading min-[380px]:text-[2.05rem] sm:mt-14 sm:text-[2.5rem]">
          Abiodun Arigbede
        </h1>
      </header>

      <div class="mt-6">
        <!-- <p data-reveal class="m-0 font-serif text-[1.05rem] leading-[1.45] font-[450] tracking-[-0.02em] text-pretty text-ink italic sm:text-[1.25rem] sm:leading-[1.35] lg:text-[1.35rem]">
          Naturally curious about how things work, I enjoy building things, and have a habit of asking one question that leads to five more. Most days, you'll find me somewhere between writing code, figuring out a problem, or exploring an idea that caught my attention.
        </p> -->
        <div data-reveal class="mt-4 font-serif text-[0.9375rem] leading-[1.65] font-[430] text-pretty text-ink sm:text-base sm:leading-[1.6]">
          <p class="m-0">
            I'm a Frontend/Product Engineer and technical leader at 
            <a href="https://www.midddleman.com/" class="group/mark ml-[0.28em] inline-flex translate-y-[0.06em] rounded-sm" target="_blank" rel="noopener noreferrer"><img src="/images/midddleman-logo.png" alt="" class="size-[1.05em] rounded-[3px] object-contain transition duration-200 group-hover/mark:scale-110"><span class="sr-only">Midddleman (opens in a new tab)</span></a> Midddleman,
            where we’re making it easier for African businesses to import seamlessly from China. We’re building technology to make the whole process feel a lot less complicated.
          </p>
          <p class="m-0 mt-3">
            Before Midddleman, I spent years building financial software at <a href="https://advansio.com" class="group/mark inline-flex translate-y-[0.06em] rounded-sm" target="_blank" rel="noopener noreferrer"><img src="/images/advansio-logo.png" alt="" class="h-[1.15em] w-auto object-contain transition duration-200 group-hover/mark:scale-110"><span class="sr-only">Advansio (opens in a new tab)</span></a>, 
             from internet banking solutions that help people make payments and manage their everyday transactions, to agency banking platforms that help businesses serve customers, process payments, and bring financial services closer to their communities.
          </p>
          <p class="m-0 mt-3">
            I’m particularly curious about what happens beneath the surface, how backend services communicate, how distributed systems handle data and scale, and how architectural decisions shape the way software performs, grows and stays reliable. I enjoy understanding the bigger picture, not just building what users see.
          </p>
        </div>
        <!-- <div data-reveal>
          <a
            href="/resume.pdf"
            class="group/resume mt-5 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-sans text-[0.78rem] tracking-[0.02em] text-ink no-underline transition duration-200 hover:-translate-y-0.5 hover:border-accent/45 hover:bg-accent/10"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg class="size-3.5 text-glint transition duration-200 group-hover/resume:text-ink" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 3.5h7.2L19 8.2V20.5H7V3.5Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
              <path d="M14 3.5V8.5h5.2M9.5 12.8h5M9.5 16.2h3.4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            Resume
            <span class="sr-only">(PDF, opens in a new tab)</span>
          </a>
        </div> -->
      </div>

      <TechnologyList />
      <ProjectList />

      <section data-reveal class="mt-12" aria-labelledby="notes-heading">
        <h2 id="notes-heading" class="m-0 font-display text-[1.2rem] font-[450] tracking-[-0.03em] text-heading sm:text-[1.35rem]">A few reads</h2>
        <ol class="mt-4 list-none border-t border-line p-0">
          <li v-for="(read, index) in reads" :key="read.title" class="grid grid-cols-[1.6rem_minmax(0,1fr)] items-start gap-x-3 gap-y-2 border-b border-line py-3.5 last:border-b-0 sm:flex sm:items-baseline sm:py-[0.85rem]">
            <span class="pt-1 font-sans text-[0.72rem] font-[560] tracking-[0.04em] text-glint sm:w-[1.6rem] sm:shrink-0 sm:pt-0">{{ readNumber(index) }}</span>
            <span class="font-serif text-[0.98rem] leading-snug font-[450] text-pretty sm:min-w-0 sm:flex-1 sm:text-[1.05rem]">{{ read.title }}</span>
            <span v-if="!read.href" class="col-start-2 w-fit rounded-full border border-line px-2 py-0.5 font-sans text-[0.66rem] tracking-[0.06em] text-muted uppercase sm:col-auto sm:shrink-0">Coming soon</span>
            <a
              v-else
              :href="read.href"
              class="group/read col-start-2 inline-flex w-fit items-center gap-1 font-sans text-[0.75rem] tracking-[0.04em] text-glint no-underline transition duration-200 hover:text-heading sm:col-auto sm:shrink-0"
              :target="external(read.href) ? '_blank' : undefined"
              :rel="external(read.href) ? 'noopener noreferrer' : undefined"
            >
              Read
              <span class="sr-only">: {{ read.title }}</span>
              <svg class="size-3.5 transition duration-200 group-hover/read:translate-x-0.5" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span v-if="external(read.href)" class="sr-only">(opens in a new tab)</span>
            </a>
          </li>
        </ol>
      </section>

      <SocialLinks />

      <section data-reveal class="mt-12" aria-labelledby="loves-heading">
        <h2 id="loves-heading" class="m-0 font-display text-[1.2rem] font-[450] tracking-[-0.03em] text-heading sm:text-[1.35rem]">What I love</h2>
        <p class="mt-4 font-serif text-[0.9375rem] leading-relaxed font-[450] text-pretty sm:text-[1.05rem]">
          When I’m not building, I enjoy getting outside, exploring nature 🌲, taking long walks, and finding quiet places to unwind ⛰️. I also enjoy playing the piano 🎹, traveling ✈️, and lately, picking up videography and cinematography, learning to tell stories through a camera. My favourite trips are the ones that end somewhere peaceful, surrounded by nature, where I can slow down and take it all in.
        </p>
      </section>

      <footer data-reveal class="mt-16 border-t border-line pt-6">
        <!-- <p class="m-0 font-serif text-base text-muted italic">Still getting carried away.</p> -->
        <div class="mt-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 font-sans text-[0.78rem] tracking-[0.02em] text-muted">
          <p class="m-0 inline-flex items-center gap-1.5">
            <svg class="size-3 text-[#e5484d]" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.2 3 4 6.9 4c2.2 0 3.7 1.2 5.1 3 1.4-1.8 2.9-3 5.1-3 3.9 0 6 4.2 4.5 7.7C19.5 16.4 12 21 12 21Z" fill="currentColor" />
            </svg>
            Abiodun Arigbede
          </p>
          <p class="m-0">&copy; {{ year }}</p>
        </div>
      </footer>
    </main>

    <AskAssistant />
  </div>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()

const reads: { title: string, href?: string }[] = [
  {
    title: 'Beyond the Marketplace: Engineering the Infrastructure for Cross-Border Trade.',
  },
  {
    title: 'I like the moment a system actually makes sense. Not the diagram. The click.',
    href: 'https://medium.com/@arigbedeabiodun/i-like-the-moment-a-system-actually-makes-sense-not-the-diagram-the-click-f35d7bab6314?sharedUserId=arigbedeabiodun',
  },
]

function readNumber(index: number) {
  return String(index + 1).padStart(2, '0')
}

function external(href: string) {
  return href.startsWith('http://') || href.startsWith('https://')
}

const title = 'Abiodun Arigbede · Senior Frontend/Product Engineer'
const description = 'Naturally curious about how things work. I\'m Abiodun Arigbede, a Senior Frontend/Product Engineer and technical leader at Midddleman.'
const url = 'https://abiodun.space/'

useSeoMeta({
  title,
  description,
  author: 'Abiodun Arigbede',
  robots: 'index, follow',
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogUrl: url,
  ogSiteName: 'Abiodun Arigbede',
  ogLocale: 'en',
  twitterCard: 'summary',
  twitterTitle: title,
  twitterDescription: description,
  twitterSite: '@abbyjoe__',
})

useHead({
  link: [{ rel: 'canonical', href: url }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Abiodun Arigbede',
      url,
      jobTitle: 'Senior Frontend/Product Engineer',
      worksFor: {
        '@type': 'Organization',
        name: 'Midddleman',
        url: 'https://www.midddleman.com/',
      },
      email: 'mailto:arigbedeabiodun@gmail.com',
      sameAs: [
        'https://github.com/AbbyJoe',
        'https://www.linkedin.com/in/abiodun-arigbede',
        'https://x.com/abbyjoe__',
      ],
      description,
    }),
  }],
})
</script>
