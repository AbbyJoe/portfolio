export default defineNuxtPlugin(() => {
  const root = document.documentElement
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (root.dataset.intro !== 'play') return

  root.dataset.motion = 'on'

  let observer: IntersectionObserver | undefined

  function arm() {
    if (observer) return
    observer = new IntersectionObserver((entries) => {
      const hits = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

      hits.forEach((entry, index) => {
        const el = entry.target as HTMLElement
        el.style.transitionDelay = `${Math.min(index, 5) * 80}ms`
        el.classList.add('is-in')
        observer?.unobserve(el)
      })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.2 })

    document.querySelectorAll('[data-reveal]').forEach(el => observer?.observe(el))
  }

  const watch = new MutationObserver(() => {
    if (root.dataset.intro === 'play') return
    watch.disconnect()
    arm()
  })
  watch.observe(root, { attributes: true, attributeFilter: ['data-intro'] })
})