<template>
  <NuxtRouteAnnouncer />
  <ParticleField />
  <SpaceIntro />
  <div class="relative z-10">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: {
    class: 'data-[intro=play]:overflow-hidden data-[intro=leave]:overflow-hidden',
  },
  script: [
    {
      innerHTML: 'try{var t=localStorage.getItem("theme");document.documentElement.dataset.theme=t==="dark"?"dark":"light"}catch(e){}',
    },
    {
      innerHTML: 'try{var r=matchMedia("(prefers-reduced-motion: reduce)").matches;document.documentElement.dataset.intro=r?"done":"play";if(!r)history.scrollRestoration="manual"}catch(e){}',
    },
  ],
})
</script>
