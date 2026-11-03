import type { SimpleIcon } from 'simple-icons'
import {
  siCss,
  siDocker,
  siDotnet,
  siGithub,
  siGooglecloud,
  siHtml5,
  siJavascript,
  siNextdotjs,
  siNodedotjs,
  siNuxt,
  siPostgresql,
  siReact,
  siTailwindcss,
  siTypescript,
  siVuedotjs,
  siX,
} from 'simple-icons'

type DrawnKind = 'api' | 'mail' | 'covr' | 'onebuxx' | 'bodadmin' | 'midddleman' | 'csharp' | 'sqlserver' | 'aws' | 'linkedin'

export type Mark =
  | { kind: 'brand'; path: string; fill: string }
  | { kind: DrawnKind }
  | { kind: 'letter'; letter: string }

const technologies: Record<string, SimpleIcon | DrawnKind> = {
  'JavaScript': siJavascript,
  'TypeScript': siTypescript,
  'Vue.js': siVuedotjs,
  'Nuxt.js': siNuxt,
  'React': siReact,
  'Next.js': siNextdotjs,
  'HTML': siHtml5,
  'CSS': siCss,
  'Tailwind CSS': siTailwindcss,
  'C#': 'csharp',
  'ASP.NET Core': siDotnet,
  'Node.js': siNodedotjs,
  'REST APIs': 'api',
  'PostgreSQL': siPostgresql,
  'SQL Server': 'sqlserver',
  'Docker': siDocker,
  'AWS': 'aws',
  'GCP': siGooglecloud,
}

const socials: Record<string, SimpleIcon | 'mail'> = {
  GitHub: siGithub,
  X: siX,
  Email: 'mail',
}

const linkedinPath = 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'

function isDarkHex(hex: string) {
  const value = hex.toLowerCase()
  const channels = value.match(/../g)?.map(channel => Number.parseInt(channel, 16) / 255)
  if (!channels || channels.length !== 3) return true

  const linear = channels.map(channel => (
    channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  ))
  const [red, green, blue] = linear
  if (red === undefined || green === undefined || blue === undefined) return true

  return (0.2126 * red) + (0.7152 * green) + (0.0722 * blue) < 0.02
}

function brandMark(icon: SimpleIcon, colorful: boolean): Mark {
  return {
    kind: 'brand',
    path: icon.path,
    fill: colorful && !isDarkHex(icon.hex) ? `#${icon.hex}` : 'currentColor',
  }
}

export function technologyMark(name: string, colorful = true): Mark {
  const icon = technologies[name]
  if (!icon) return { kind: 'letter', letter: name.slice(0, 1).toUpperCase() }
  if (typeof icon === 'string') return { kind: icon }
  return brandMark(icon, colorful)
}

export function socialMark(label: string): Mark {
  if (label === 'LinkedIn') return { kind: 'brand', path: linkedinPath, fill: '#0A66C2' }
  const icon = socials[label]
  if (!icon) return { kind: 'letter', letter: label.slice(0, 1).toUpperCase() }
  if (typeof icon === 'string') return { kind: icon }
  return { kind: 'brand', path: icon.path, fill: 'currentColor' }
}

export function projectMark(name: string): Mark {
  const normalized = name.toLowerCase()
  if (normalized.includes('covr')) return { kind: 'covr' }
  if (normalized.includes('onebuxx')) return { kind: 'onebuxx' }
  if (normalized.includes('bodadmin')) return { kind: 'bodadmin' }
  if (normalized.includes('midddleman')) return { kind: 'midddleman' }
  return { kind: 'letter', letter: name.slice(0, 1).toUpperCase() }
}
