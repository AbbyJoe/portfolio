<template>
  <canvas ref="canvas" class="pointer-events-none fixed inset-0 z-0 h-full w-full print:hidden" aria-hidden="true" />
</template>

<script setup lang="ts">
type Star = {
  x: number
  y: number
  z: number
  size: number
  base: number
  twinkle: number
  phase: number
  tint: string
  ink: string
}

type Meteor = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  length: number
}

const tints = ['255, 255, 255', '255, 255, 255', '255, 255, 255', '202, 220, 255', '176, 200, 255', '255, 236, 214']
const inks = ['21, 35, 73', '21, 35, 73', '40, 42, 54', '58, 79, 158', '120, 92, 60']

const canvas = ref<HTMLCanvasElement | null>(null)
let stop = () => {}

onMounted(() => {
  const target = canvas.value
  const surface = target?.getContext('2d')
  if (!target || !surface) return
  const el: HTMLCanvasElement = target
  const context: CanvasRenderingContext2D = surface

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
  let frame = 0
  let last = 0
  let stars: Star[] = []
  let meteors: Meteor[] = []
  let nextMeteor = 4000 + Math.random() * 6000
  let scroll = window.scrollY
  let time = 0
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
  const root = document.documentElement
  let light = root.dataset.theme === 'light'

  function population() {
    const area = window.innerWidth * window.innerHeight
    return Math.min(700, Math.max(220, Math.round(area / 2600)))
  }

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2)
    el.width = Math.floor(window.innerWidth * ratio)
    el.height = Math.floor(window.innerHeight * ratio)
    context.setTransform(ratio, 0, 0, ratio, 0, 0)
  }

  function seed() {
    const next: Star[] = []
    for (let index = 0; index < population(); index++) {
      const z = Math.random() ** 2.2
      next.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        z,
        size: 0.35 + z * 1.45,
        base: 0.25 + z * 0.6 + Math.random() * 0.15,
        twinkle: 0.4 + Math.random() * 1.6,
        phase: Math.random() * Math.PI * 2,
        tint: tints[Math.floor(Math.random() * tints.length)] ?? tints[0]!,
        ink: inks[Math.floor(Math.random() * inks.length)] ?? inks[0]!,
      })
    }
    stars = next
  }

  function launchMeteor(width: number, height: number) {
    const angle = Math.PI * (0.16 + Math.random() * 0.1)
    const speed = 0.9 + Math.random() * 0.6
    meteors.push({
      x: width * (0.1 + Math.random() * 0.8),
      y: -20 + Math.random() * height * 0.3,
      vx: Math.cos(angle) * speed * (Math.random() < 0.5 ? -1 : 1),
      vy: Math.sin(angle) * speed,
      life: 1,
      length: 90 + Math.random() * 90,
    })
  }

  function draw(time: number, delta: number) {
    const width = window.innerWidth
    const height = window.innerHeight
    const seconds = time / 1000
    context.clearRect(0, 0, width, height)

    pointer.x += (pointer.tx - pointer.x) * 0.04
    pointer.y += (pointer.ty - pointer.y) * 0.04
    const scrolled = window.scrollY - scroll
    scroll = window.scrollY

    for (const star of stars) {
      const depth = 0.15 + star.z
      star.x -= delta * 0.004 * depth
      star.y -= scrolled * depth * 0.18
      if (star.x < -4) star.x += width + 8
      if (star.y < -4) star.y += height + 8
      if (star.y > height + 4) star.y -= height + 8

      const x = star.x + pointer.x * depth * 18
      const y = star.y + pointer.y * depth * 18
      const flicker = 0.72 + Math.sin(seconds * star.twinkle + star.phase) * 0.28
      const alpha = star.base * flicker * (light ? 0.5 : 1)
      const tint = light ? star.ink : star.tint

      if (star.size > 1.35 && !light) {
        const glow = context.createRadialGradient(x, y, 0, x, y, star.size * 5)
        glow.addColorStop(0, `rgba(${tint}, ${alpha * 0.35})`)
        glow.addColorStop(1, `rgba(${tint}, 0)`)
        context.fillStyle = glow
        context.fillRect(x - star.size * 5, y - star.size * 5, star.size * 10, star.size * 10)
      }

      context.fillStyle = `rgba(${tint}, ${alpha})`
      context.beginPath()
      context.arc(x, y, star.size, 0, Math.PI * 2)
      context.fill()
    }

    nextMeteor -= delta
    if (nextMeteor <= 0) {
      launchMeteor(width, height)
      nextMeteor = 6000 + Math.random() * 9000
    }

    meteors = meteors.filter(meteor => meteor.life > 0)
    for (const meteor of meteors) {
      meteor.x += meteor.vx * delta
      meteor.y += meteor.vy * delta
      meteor.life -= delta / 1100

      const speed = Math.hypot(meteor.vx, meteor.vy)
      const tailX = meteor.x - (meteor.vx / speed) * meteor.length
      const tailY = meteor.y - (meteor.vy / speed) * meteor.length
      const trail = context.createLinearGradient(meteor.x, meteor.y, tailX, tailY)
      const streak = light ? '21, 35, 73' : '235, 242, 255'
      trail.addColorStop(0, `rgba(${streak}, ${Math.max(0, meteor.life) * (light ? 0.55 : 0.9)})`)
      trail.addColorStop(1, `rgba(${streak}, 0)`)
      context.strokeStyle = trail
      context.lineWidth = 1.2
      context.lineCap = 'round'
      context.beginPath()
      context.moveTo(meteor.x, meteor.y)
      context.lineTo(tailX, tailY)
      context.stroke()
    }
  }

  function tick(now: number) {
    const delta = last ? Math.min(now - last, 50) : 16
    last = now
    time = now
    if (document.visibilityState === 'visible') draw(now, delta)
    frame = window.requestAnimationFrame(tick)
  }

  function onResize() {
    resize()
    seed()
    if (reduce.matches) draw(0, 0)
  }

  function onPointer(event: PointerEvent) {
    pointer.tx = event.clientX / window.innerWidth - 0.5
    pointer.ty = event.clientY / window.innerHeight - 0.5
  }

  function onLeave() {
    pointer.tx = 0
    pointer.ty = 0
  }

  resize()
  seed()
  draw(0, 0)

  const observer = new MutationObserver(() => {
    light = root.dataset.theme === 'light'
    draw(time, 0)
  })

  window.addEventListener('resize', onResize)
  observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
  if (!reduce.matches) {
    window.addEventListener('pointermove', onPointer)
    document.addEventListener('pointerleave', onLeave)
    frame = window.requestAnimationFrame(tick)
  }

  stop = () => {
    window.cancelAnimationFrame(frame)
    observer.disconnect()
    window.removeEventListener('resize', onResize)
    window.removeEventListener('pointermove', onPointer)
    document.removeEventListener('pointerleave', onLeave)
  }
})

onUnmounted(() => stop())
</script>
