<template>
  <div
    v-if="!done"
    class="fixed inset-0 z-60 hidden overflow-hidden bg-[#05060a] transition-[opacity,scale] duration-900 ease-[cubic-bezier(0.7,0,0.3,1)] in-data-[intro=leave]:block in-data-[intro=play]:block print:hidden"
    :class="stage === 'leave' ? 'pointer-events-none scale-[1.18] opacity-0' : ''"
  >
    <canvas ref="canvas" class="absolute inset-0 h-full w-full" aria-hidden="true" />

    <div class="absolute inset-0 grid place-items-center px-6 text-center" :aria-hidden="stage === 'warp'">
      <div>
        <p
          class="m-0 font-mono text-[0.68rem] tracking-[0.42em] text-[#bcd2ff]/70 uppercase transition duration-700 ease-out"
          :class="stage === 'warp' ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'"
        >
          Now arriving
        </p>
        <p
          class="mt-4 mb-0 font-display text-[clamp(2.6rem,9vw,6rem)] leading-none font-[450] text-[#f7f5f1] transition-all duration-1400 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
          :class="stage === 'warp' ? 'scale-[0.94] tracking-[0.35em] opacity-0 blur-md' : 'scale-100 tracking-[-0.03em] opacity-100 blur-0'"
        >
          Abiodun Arigbede
        </p>
        <span
          class="mx-auto mt-6 block h-px bg-linear-to-r from-transparent via-[#8fb2ff] to-transparent transition-[width,opacity] delay-300 duration-1200 ease-out"
          :class="stage === 'warp' ? 'w-0 opacity-0' : 'w-48 opacity-100'"
          aria-hidden="true"
        />
        <p
          class="mt-4 mb-0 font-mono text-[0.78rem] tracking-[0.3em] text-white/60 transition delay-500 duration-700 ease-out"
          :class="stage === 'warp' ? 'opacity-0' : 'opacity-100'"
        >
          Frontend Engineer
        </p>
      </div>
    </div>

    <button
      type="button"
      class="absolute bottom-[max(2rem,env(safe-area-inset-bottom))] left-1/2 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-3 border-0 bg-transparent p-2 font-mono text-[0.66rem] tracking-[0.32em] text-white/55 uppercase transition delay-1000 duration-1000 ease-out hover:text-white"
      :class="stage === 'warp' ? 'pointer-events-none translate-y-3 opacity-0' : 'translate-y-0 opacity-100'"
      :tabindex="stage === 'warp' ? -1 : 0"
      @click.stop="enter"
    >
      Scroll to enter
      <span class="relative block h-9 w-px overflow-hidden bg-white/15" aria-hidden="true">
        <span class="absolute inset-x-0 top-0 h-1/2 animate-descend bg-linear-to-b from-transparent to-[#bcd2ff]" />
      </span>
    </button>

    <button
      type="button"
      class="absolute right-5 bottom-5 cursor-pointer rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-[0.66rem] tracking-[0.2em] text-white/60 uppercase backdrop-blur transition duration-200 hover:border-white/40 hover:text-white"
      :class="stage === 'warp' ? 'opacity-100' : 'pointer-events-none opacity-0'"
      :tabindex="stage === 'warp' ? 0 : -1"
      @click.stop="enter"
    >
      Skip intro
    </button>
  </div>
</template>

<script setup lang="ts">
type Star = {
  x: number
  y: number
  z: number
  pz: number
}

type Stage = 'warp' | 'arrive' | 'leave'

const ARRIVE = 2.15
const EXIT_MS = 900
const ENTER_KEYS = new Set(['ArrowDown', 'PageDown', 'End', ' ', 'Enter'])

const canvas = ref<HTMLCanvasElement | null>(null)
const stage = ref<Stage>('warp')
const done = ref(false)
let enter = () => {}
let stop = () => {}
let release = () => {}

function ease(value: number) {
  return value * value * value
}

function speedAt(t: number) {
  if (t < 0.45) return 0.06
  if (t < 1.75) return 0.06 + ease((t - 0.45) / 1.3) * 2.7
  if (t < 2.1) return 2.76
  if (t < 2.9) return 0.05 + (1 - Math.sqrt((t - 2.1) / 0.8)) * 2.7
  return 0.05
}

onMounted(() => {
  const root = document.documentElement
  const el = canvas.value
  const context = el?.getContext('2d')
  if (root.dataset.intro !== 'play' || !el || !context) {
    if (root.dataset.intro === 'play') root.dataset.intro = 'done'
    done.value = true
    return
  }

  let frame = 0
  let start = 0
  let last = 0
  let width = 0
  let height = 0
  let stars: Star[] = []

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2)
    width = window.innerWidth
    height = window.innerHeight
    el!.width = Math.floor(width * ratio)
    el!.height = Math.floor(height * ratio)
    context!.setTransform(ratio, 0, 0, ratio, 0, 0)
  }

  function spawn(z = Math.random()): Star {
    const x = (Math.random() * 2 - 1)
    const y = (Math.random() * 2 - 1)
    return { x, y, z, pz: z }
  }

  function draw(t: number, dt: number) {
    const cx = width / 2
    const cy = height / 2
    const spread = Math.max(width, height) * 0.42
    const speed = speedAt(t)
    const warp = Math.min(1, speed / 2.7)

    context!.fillStyle = `rgba(5, 6, 10, ${0.55 - warp * 0.25})`
    context!.fillRect(0, 0, width, height)

    if (warp > 0.05) {
      const tunnel = context!.createRadialGradient(cx, cy, 0, cx, cy, spread * 1.3)
      tunnel.addColorStop(0, `rgba(120, 160, 255, ${warp * 0.16})`)
      tunnel.addColorStop(1, 'rgba(120, 160, 255, 0)')
      context!.fillStyle = tunnel
      context!.fillRect(0, 0, width, height)
    }

    for (const star of stars) {
      star.pz = star.z
      star.z -= speed * dt
      if (star.z <= 0.02) {
        Object.assign(star, spawn(1))
        continue
      }

      const sx = cx + (star.x / star.z) * spread
      const sy = cy + (star.y / star.z) * spread
      const px = cx + (star.x / star.pz) * spread
      const py = cy + (star.y / star.pz) * spread
      if (sx < -50 || sx > width + 50 || sy < -50 || sy > height + 50) {
        Object.assign(star, spawn(1))
        continue
      }

      const near = 1 - star.z
      const alpha = Math.min(1, near * 1.3 + 0.1)
      context!.strokeStyle = `rgba(${210 - warp * 40}, ${225 - warp * 15}, 255, ${alpha})`
      context!.lineWidth = 0.4 + near * 2.2
      context!.lineCap = 'round'
      context!.beginPath()
      context!.moveTo(px, py)
      context!.lineTo(sx + 0.01, sy)
      context!.stroke()
    }

    const flash = Math.max(0, 1 - Math.abs(t - 2.05) / 0.32)
    if (flash > 0) {
      const bloom = context!.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.75)
      bloom.addColorStop(0, `rgba(255, 255, 255, ${flash * 0.95})`)
      bloom.addColorStop(0.35, `rgba(170, 200, 255, ${flash * 0.55})`)
      bloom.addColorStop(1, 'rgba(120, 160, 255, 0)')
      context!.fillStyle = bloom
      context!.fillRect(0, 0, width, height)
    }
  }

  let settling = false
  let quiet = 0

  function pinTop() {
    if (window.scrollY !== 0) window.scrollTo(0, 0)
  }

  release = () => {
    window.clearTimeout(quiet)
    window.removeEventListener('wheel', onWheel)
    window.removeEventListener('scroll', pinTop)
    window.removeEventListener('touchstart', onTouchStart)
    window.removeEventListener('touchmove', onTouchMove)
    pinTop()
    root.dataset.intro = 'done'
    done.value = true
  }

  function hold() {
    window.clearTimeout(quiet)
    quiet = window.setTimeout(release, 450)
  }

  function finish() {
    if (settling) return
    settling = true
    pinTop()
    stop()
    hold()
  }

  function tick(time: number) {
    if (!start) start = time
    const t = (time - start) / 1000
    const dt = last ? Math.min((time - last) / 1000, 0.05) : 0.016
    last = time

    draw(t, dt)
    if (t >= ARRIVE && stage.value === 'warp') stage.value = 'arrive'
    frame = window.requestAnimationFrame(tick)
  }

  enter = () => {
    if (stage.value === 'leave') return
    stage.value = 'leave'
    root.dataset.intro = 'leave'
    window.scrollTo(0, 0)
    window.setTimeout(finish, EXIT_MS)
  }

  function onWheel(event: WheelEvent) {
    event.preventDefault()
    if (settling) return hold()
    if (event.deltaY > 0) enter()
  }

  let touchY = 0
  function onTouchStart(event: TouchEvent) {
    touchY = event.touches[0]?.clientY ?? 0
  }

  function onTouchMove(event: TouchEvent) {
    event.preventDefault()
    if (settling) return hold()
    const y = event.touches[0]?.clientY ?? touchY
    if (touchY - y > 24) enter()
  }

  function onKey(event: KeyboardEvent) {
    if (!ENTER_KEYS.has(event.key) || event.target instanceof HTMLButtonElement) return
    event.preventDefault()
    enter()
  }

  resize()
  stars = Array.from({ length: Math.min(900, Math.round((width * height) / 1800)) }, () => spawn())
  context.fillStyle = '#05060a'
  context.fillRect(0, 0, width, height)

  window.addEventListener('resize', resize)
  window.addEventListener('keydown', onKey)
  window.addEventListener('scroll', pinTop)
  window.addEventListener('wheel', onWheel, { passive: false })
  window.addEventListener('touchstart', onTouchStart, { passive: true })
  window.addEventListener('touchmove', onTouchMove, { passive: false })
  frame = window.requestAnimationFrame(tick)

  stop = () => {
    window.cancelAnimationFrame(frame)
    window.removeEventListener('resize', resize)
    window.removeEventListener('keydown', onKey)
  }
})

onUnmounted(() => {
  stop()
  release()
})
</script>
