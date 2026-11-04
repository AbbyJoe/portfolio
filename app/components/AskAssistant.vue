<template>
  <div class="transition-opacity delay-700 duration-700 in-data-[intro=play]:pointer-events-none in-data-[intro=play]:opacity-0 print:hidden">
    <div
      aria-hidden="true"
      class="fixed inset-0 z-30 transition-opacity duration-500 ease-out"
      :class="mode === 'rest' ? 'pointer-events-none opacity-0' : mode === 'peek' ? 'pointer-events-none opacity-100' : 'opacity-100'"
    >
      <div class="absolute inset-0 bg-[#05060a]/55 backdrop-blur-[3px] light:bg-[#16140f]/30" />
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,6,10,0.55)_100%)] light:bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(22,20,15,0.34)_100%)]" />
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(143,178,255,0.2),transparent_42%)] light:bg-[radial-gradient(ellipse_at_50%_100%,rgba(21,35,73,0.18),transparent_48%)]" />
    </div>
    <section
      ref="card"
      class="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-0 right-0 z-40 mx-auto overflow-hidden border border-white/12 bg-[#0e0f15]/85 font-sans text-white shadow-[0_20px_60px_rgba(0,0,0,0.55),0_0_0_1px_rgba(143,178,255,0.06)] backdrop-blur-xl transition-[width,border-radius,transform] light:border-black/10 light:bg-white/80 light:text-[#16161a] light:shadow-[0_20px_50px_rgba(20,25,45,0.14),0_0_0_1px_rgba(21,35,73,0.05)] duration-300 ease-out sm:bottom-6"
      :class="{
        'w-[min(16.5rem,calc(100vw-2rem))] rounded-4xl hover:-translate-y-0.5': mode === 'rest',
        'w-[min(21rem,calc(100vw-2rem))] rounded-[1.4rem]': mode === 'peek',
        'w-[min(24rem,calc(100vw-2rem))] rounded-[1.4rem]': mode === 'chat',
      }"
      :role="mode === 'chat' ? 'dialog' : undefined"
      aria-labelledby="assistant-heading"
      @mouseenter="peek"
      @mouseleave="settle"
      @focusout="onFocusOut"
    >
      <span class="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_70%_at_0%_0%,rgba(143,178,255,0.16),transparent_60%)]" aria-hidden="true" />

      <div class="relative flex items-center gap-3 py-2.5 pr-3 pl-2.5">
        <button
          ref="opener"
          type="button"
          class="flex min-w-0 flex-1 cursor-pointer items-center gap-3 border-0 bg-transparent p-0 text-left text-inherit"
          :aria-expanded="mode !== 'rest'"
          aria-controls="assistant-body"
          @focus="peek"
          @click="openChat"
        >
          <AssistantPlanet class="size-10" />
          <span class="min-w-0">
            <span id="assistant-heading" class="block text-[0.92rem] font-medium tracking-[-0.01em]">Ask Abby</span>
            <span v-if="mode === 'chat'" class="mt-0.5 flex items-center gap-1.5 text-[0.74rem] text-white/55 light:text-black/55">
              <span class="size-1.5 rounded-full bg-[#8fb2ff] shadow-[0_0_6px_#8fb2ff]" aria-hidden="true" />
              In orbit · answers from this page
            </span>
            <span v-else class="mt-0.5 block truncate text-[0.76rem] text-white/55 light:text-black/55">Curious? Ask about his work</span>
          </span>
        </button>
        <button
          v-if="mode !== 'rest'"
          type="button"
          class="grid size-8 shrink-0 animate-pop cursor-pointer place-items-center rounded-full border border-white/15 bg-transparent text-white/70 transition duration-200 hover:border-white/40 hover:text-white light:border-black/15 light:text-black/60 light:hover:border-black/40 light:hover:text-black"
          aria-label="Close"
          @click="close"
        >
          <svg class="size-3" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
          </svg>
        </button>
      </div>

      <div
        id="assistant-body"
        class="relative grid transition-[grid-template-rows] duration-300 ease-out"
        :class="mode === 'rest' ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]'"
        :inert="mode === 'rest'"
      >
        <div class="min-h-0 overflow-hidden">
          <span class="mx-4 block h-px bg-linear-to-r from-transparent via-[#8fb2ff]/50 to-transparent" aria-hidden="true" />

          <div v-if="mode !== 'chat'" class="px-4 pt-4 pb-4">
            <p class="m-0 font-mono text-[0.68rem] tracking-[0.08em] text-white/45 uppercase light:text-black/45">7+ projects · 5+ years · instant replies</p>
            <p class="mt-2.5 mb-0 font-serif text-[1.05rem] leading-snug text-white/90 italic light:text-black/85">Ask what he builds, how he thinks, or which rabbit hole he's in.</p>
            <button
              type="button"
              class="group/start mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full border-0 bg-[#eef3ff] px-4 py-2 font-sans text-[0.84rem] font-medium text-[#121216] transition duration-200 hover:bg-white light:bg-accent light:text-white light:hover:bg-[#1f3266]"
              @click="openChat"
            >
              Start a conversation
              <svg class="size-3.5 transition duration-200 group-hover/start:translate-x-0.5" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>

          <div v-else class="flex h-[min(28rem,calc(100dvh-9rem))] flex-col">
            <div ref="thread" class="flex min-h-0 flex-1 flex-col gap-3.5 overflow-auto px-4 pt-4 pb-3" role="log" aria-live="polite" aria-relevant="additions">
              <template v-for="message in messages" :key="message.id">
                <p
                  v-if="message.role === 'assistant'"
                  class="m-0 animate-pop border-l border-[#8fb2ff]/40 pl-3 text-[0.9rem] leading-relaxed whitespace-pre-wrap text-white/88 light:border-accent/30 light:text-black/80"
                >{{ message.text }}</p>
                <p
                  v-else
                  class="m-0 max-w-[85%] animate-pop self-end rounded-2xl rounded-br-md border border-white/15 bg-white/5 px-3.5 py-2 text-[0.9rem] leading-normal whitespace-pre-wrap light:border-black/12 light:bg-black/4"
                >{{ message.text }}</p>
              </template>

              <div v-if="typing" class="flex items-center gap-1 border-l border-[#8fb2ff]/40 py-1.5 pl-3" role="status">
                <i class="size-[0.35rem] animate-bounce-dot rounded-full bg-[#bcd2ff] light:bg-accent/60" aria-hidden="true" />
                <i class="size-[0.35rem] animate-bounce-dot rounded-full bg-[#bcd2ff] [animation-delay:150ms] light:bg-accent/60" aria-hidden="true" />
                <i class="size-[0.35rem] animate-bounce-dot rounded-full bg-[#bcd2ff] [animation-delay:300ms] light:bg-accent/60" aria-hidden="true" />
                <span class="sr-only">Abby is typing</span>
              </div>

              <div v-if="showPrompts" class="mt-1 animate-pop">
                <p class="m-0 font-mono text-[0.66rem] tracking-[0.08em] text-white/40 uppercase light:text-black/45">Try asking</p>
                <ul class="m-0 mt-1.5 flex list-none flex-col p-0">
                  <li v-for="question in prompts" :key="question">
                    <button
                      type="button"
                      class="group/prompt flex w-full cursor-pointer items-center gap-2 border-0 border-b border-white/8 bg-transparent px-0 py-2 text-left font-sans text-[0.86rem] text-white/75 transition duration-200 hover:text-white light:border-black/8 light:text-black/70 light:hover:text-black"
                      @click="send(question)"
                    >
                      <span class="text-[#8fb2ff] transition duration-200 group-hover/prompt:translate-x-0.5 light:text-accent" aria-hidden="true">→</span>
                      {{ question }}
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <form class="px-3 pt-1 pb-2" aria-label="Ask a question" @submit.prevent="send(draft)">
              <div class="flex items-center gap-2 rounded-full border border-white/12 bg-white/5 py-1.5 pr-1.5 pl-4 transition duration-200 focus-within:border-[#8fb2ff]/60 light:border-black/12 light:bg-black/3 light:focus-within:border-accent/50">
                <label class="sr-only" for="assistant-question">Your question</label>
                <input
                  id="assistant-question"
                  ref="input"
                  v-model="draft"
                  type="text"
                  autocomplete="off"
                  enterkeyhint="send"
                  class="min-w-0 flex-1 border-0 bg-transparent font-sans text-[0.9rem] text-white outline-none placeholder:text-white/40 light:text-[#16161a] light:placeholder:text-black/40"
                  placeholder="Ask me something…"
                >
                <button
                  type="submit"
                  class="grid size-8 shrink-0 cursor-pointer place-items-center rounded-full border-0 transition duration-200 disabled:cursor-not-allowed"
                  :class="draft.trim() && !typing ? 'bg-[#8fb2ff] text-[#121216] hover:scale-105 light:bg-accent light:text-white' : 'bg-white/10 text-white/40 light:bg-black/6 light:text-black/35'"
                  :disabled="typing || !draft.trim()"
                  aria-label="Send"
                >
                  <svg class="size-3.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
              </div>
            </form>
            <p class="m-0 px-4 pb-3 text-center font-mono text-[0.62rem] tracking-[0.06em] text-white/35 uppercase light:text-black/40">Replies come only from this page</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
interface ChatMessage {
  id: number
  role: 'assistant' | 'user'
  text: string
}

type Mode = 'rest' | 'peek' | 'chat'

const greeting = [
  'Hey, I\'m Abby. Ask me anything about Abiodun\'s work, the projects, or how he thinks.',
  'It\'s usually quicker than scrolling the whole page.',
]
const prompts = [
  'What is Abiodun building at Midddleman?',
  'What did he build at Advansio?',
  'What\'s his stack?',
  'What does he do when he\'s not building?',
]
const unavailable = 'I couldn\'t reach my notes just now. Try again in a moment.'

const mode = ref<Mode>('rest')
const typing = ref(false)
const draft = ref('')
const messages = ref<ChatMessage[]>([])
const card = ref<HTMLElement | null>(null)
const opener = ref<HTMLButtonElement | null>(null)
const input = ref<HTMLInputElement | null>(null)
const thread = ref<HTMLElement | null>(null)
let nextId = 1
let replyTimer = 0
let settleTimer = 0
let requestId = 0

const showPrompts = computed(() => !typing.value && messages.value.length > 0 && messages.value.every((message: { role: string }) => message.role === 'assistant'))

function peek() {
  window.clearTimeout(settleTimer)
  if (mode.value === 'rest') mode.value = 'peek'
}

function settle() {
  if (mode.value !== 'peek') return
  window.clearTimeout(settleTimer)
  settleTimer = window.setTimeout(() => {
    if (mode.value === 'peek' && !card.value?.contains(document.activeElement)) mode.value = 'rest'
  }, 220)
}

function onFocusOut(event: FocusEvent) {
  const next = event.relatedTarget
  if (next instanceof Node && card.value?.contains(next)) return
  if (mode.value === 'peek' && !card.value?.matches(':hover')) mode.value = 'rest'
}

async function openChat() {
  window.clearTimeout(settleTimer)
  if (mode.value === 'chat') return
  mode.value = 'chat'
  await nextTick()
  input.value?.focus({ preventScroll: true })
  if (messages.value.length === 0) greet()
}

function close() {
  requestId += 1
  window.clearTimeout(replyTimer)
  typing.value = false
  mode.value = 'rest'
  opener.value?.blur()
}

watch(() => [messages.value.length, typing.value], async () => {
  await nextTick()
  thread.value?.scrollTo({ top: thread.value.scrollHeight, behavior: 'smooth' })
})

function greet() {
  typing.value = true
  replyTimer = window.setTimeout(() => {
    push('assistant', greeting[0]!)
    replyTimer = window.setTimeout(() => {
      typing.value = false
      push('assistant', greeting[1]!)
    }, 650)
  }, 600)
}

async function send(text: string) {
  const question = text.trim()
  if (!question || typing.value) return
  draft.value = ''
  push('user', question)
  const current = ++requestId
  typing.value = true
  try {
    const result = await $fetch<{ reply: string }>('/api/assistant', {
      method: 'POST',
      body: {
        messages: messages.value.map((message: { role: any; text: any }) => ({ role: message.role, content: message.text })),
      },
    })
    if (current !== requestId) return
    push('assistant', result.reply)
  }
  catch {
    if (current !== requestId) return
    push('assistant', unavailable)
  }
  finally {
    if (current === requestId) typing.value = false
  }
}

function push(role: ChatMessage['role'], text: string) {
  messages.value.push({ id: nextId++, role, text })
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && mode.value !== 'rest') close()
}

function onPointerDown(event: PointerEvent) {
  if (mode.value !== 'chat') return
  const target = event.target
  if (target instanceof Node && card.value?.contains(target)) return
  close()
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  document.addEventListener('pointerdown', onPointerDown)
})

onBeforeUnmount(() => {
  window.clearTimeout(replyTimer)
  window.clearTimeout(settleTimer)
  document.removeEventListener('keydown', onKeydown)
  document.removeEventListener('pointerdown', onPointerDown)
})
</script>
