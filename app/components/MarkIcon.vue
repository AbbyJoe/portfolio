<template>
  <span class="inline-grid place-items-center leading-none">
    <svg v-if="mark.kind === 'brand'" class="size-full" viewBox="0 0 24 24" aria-hidden="true">
      <path :d="mark.path" :fill="mark.fill" />
    </svg>

    <svg v-else class="size-full" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        v-if="mark.kind === 'api'"
        d="M9.2 7.1c-1.85 1-2.85 2.35-2.85 4.9s1 3.9 2.85 4.9M14.8 7.1c1.85 1 2.85 2.35 2.85 4.9s-1 3.9-2.85 4.9"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linecap="round"
      />

      <template v-else-if="mark.kind === 'mail'">
        <rect x="3.25" y="5.25" width="17.5" height="13.5" rx="1.6" stroke="currentColor" stroke-width="1.6" />
        <path d="M4.4 7.2 12 12.35 19.6 7.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      </template>

      <template v-else-if="mark.kind === 'covr'">
        <circle cx="12" cy="12" r="7.25" stroke="currentColor" stroke-width="1.6" />
        <path d="M12 8.2v7.6M9.65 9.85c.5-.75 1.25-1.15 2.35-1.15 1.45 0 2.25.62 2.25 1.58S13.4 11.7 12 11.7s-2.25.5-2.25 1.5.9 1.55 2.25 1.55c1.1 0 1.9-.38 2.35-1.05" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" />
      </template>

      <template v-else-if="mark.kind === 'onebuxx'">
        <rect x="7.75" y="3.15" width="8.5" height="17.7" rx="1.7" stroke="currentColor" stroke-width="1.6" />
        <path d="M10.85 17.7h2.3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
      </template>

      <template v-else-if="mark.kind === 'bodadmin'">
        <rect x="6.2" y="4.7" width="11.6" height="15.1" rx="1.5" stroke="currentColor" stroke-width="1.6" />
        <path d="M9.15 4.7h5.7v1.35c0 .55-.4.95-.95.95h-3.8c-.55 0-.95-.4-.95-.95V4.7Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
        <path d="M9 11.35h6M9 14.35h4.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </template>

      <template v-else-if="mark.kind === 'midddleman'">
        <circle cx="5.6" cy="12" r="2.05" stroke="currentColor" stroke-width="1.6" />
        <circle cx="18.4" cy="12" r="2.05" stroke="currentColor" stroke-width="1.6" />
        <path d="M7.7 12h8.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
      </template>

      <template v-else-if="mark.kind === 'sqlserver'">
        <ellipse cx="12" cy="7.1" rx="6.4" ry="2.35" stroke="currentColor" stroke-width="1.5" />
        <path d="M5.6 7.1v9.7c0 1.3 2.85 2.35 6.4 2.35s6.4-1.05 6.4-2.35V7.1" stroke="currentColor" stroke-width="1.5" />
        <path d="M5.6 12c0 1.3 2.85 2.35 6.4 2.35s6.4-1.05 6.4-2.35" stroke="currentColor" stroke-width="1.5" />
      </template>

      <path
        v-else-if="mark.kind === 'aws'"
        d="M7.4 16.6h8.8a3.15 3.15 0 0 0 .35-6.28 4.15 4.15 0 0 0-7.95-.85 2.85 2.85 0 0 0-1.2 7.13Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linejoin="round"
      />

      <template v-else-if="mark.kind === 'csharp'">
        <rect x="2.4" y="3.2" width="19.2" height="17.6" rx="3.2" stroke="currentColor" stroke-width="1.5" />
        <text x="12" y="15.7" text-anchor="middle" fill="currentColor" font-size="8.2" font-weight="700" font-family="Inter Variable, Inter, sans-serif">C#</text>
      </template>

      <text
        v-else-if="mark.kind === 'linkedin'"
        x="12"
        y="16.2"
        text-anchor="middle"
        fill="currentColor"
        font-size="12"
        font-weight="650"
        font-family="Inter Variable, Inter, sans-serif"
      >in</text>

      <template v-else>
        <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.6" />
        <text x="12" y="16" text-anchor="middle" fill="currentColor" font-size="11" font-family="Inter Variable, Inter, sans-serif">
          {{ mark.letter }}
        </text>
      </template>
    </svg>
  </span>
</template>

<script setup lang="ts">
import type { Mark } from '~/utils/icons'

defineProps<{
  mark: Mark
}>()
</script>
