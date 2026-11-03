<template>
  <div class="flex items-center justify-between gap-4 font-mono text-[0.66rem] tracking-[0.18em] text-muted uppercase">
    <a href="https://abiodun.space" class="group/orbit inline-flex items-center gap-2.5 text-inherit no-underline transition duration-200 hover:text-heading">
      <span class="relative grid size-5 place-items-center" aria-hidden="true">
        <span class="absolute inset-0 rounded-full border border-white/20 transition duration-300 group-hover/orbit:border-[#8fb2ff]/60 light:border-black/20 light:group-hover/orbit:border-accent/50" />
        <span class="size-1.5 rounded-full bg-heading shadow-[0_0_8px_rgba(143,178,255,0.8)] light:shadow-none" />
        <span class="absolute inset-0 animate-[spin_6s_linear_infinite] group-hover/orbit:animate-[spin_1.6s_linear_infinite]">
          <span class="absolute -top-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-[#8fb2ff] light:bg-accent" />
        </span>
      </span>
      <span class="normal-case tracking-[0.08em]">abiodun.space</span>
    </a>

    <div class="flex items-center gap-4">
      <!-- <p class="m-0 inline-flex items-center gap-2.5">
        <span class="relative flex size-1.5" aria-hidden="true">
          <span class="absolute inset-0 animate-ping rounded-full bg-[#8fb2ff]/60 light:bg-accent/40" />
          <span class="relative size-1.5 rounded-full bg-[#8fb2ff] light:bg-accent" />
        </span>
        <span>Lagos</span>
        <time class="text-ink tabular-nums" :aria-label="time ? `${time} in Lagos, Nigeria` : undefined">{{ time || '--:--' }}</time>
        <span class="hidden text-white/30 sm:inline light:text-black/35">WAT</span>
      </p>

      <span class="h-3 w-px bg-white/15 light:bg-black/15" aria-hidden="true" /> -->

      <button
        type="button"
        class="group/theme grid size-7 cursor-pointer place-items-center rounded-full border border-white/12 bg-white/4 p-0 text-muted transition duration-200 hover:border-white/30 hover:text-heading light:border-black/12 light:bg-black/3 light:hover:border-black/30"
        :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="toggle"
      >
        <svg class="size-3.5 transition duration-500 group-hover/theme:-rotate-12 light:hidden" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
        </svg>
        <svg class="hidden size-3.5 transition duration-500 group-hover/theme:rotate-45 light:block" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8" />
          <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { theme, sync, toggle } = useTheme()
const time = ref('')

const formatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Africa/Lagos',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

let timer = 0

onMounted(() => {
  sync()
  const tick = () => {
    time.value = formatter.format(new Date())
  }
  tick()
  timer = window.setInterval(tick, 10_000)
})

onUnmounted(() => window.clearInterval(timer))
</script>
