export type Theme = 'dark' | 'light'

const surfaces: Record<Theme, string> = {
  dark: '#17171a',
  light: '#f4f1ea',
}

export function useTheme() {
  const theme = useState<Theme>('theme', () => 'light')

  function paint(next: Theme) {
    document.documentElement.dataset.theme = next
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', surfaces[next])
    theme.value = next
  }

  function sync() {
    paint(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
  }

  function apply(next: Theme) {
    paint(next)
    try {
      localStorage.setItem('theme', next)
    }
    catch {}
  }

  function toggle(event?: MouseEvent) {
    const next: Theme = theme.value === 'dark' ? 'light' : 'dark'
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduce) return apply(next)

    const x = event?.clientX || window.innerWidth / 2
    const y = event?.clientY || 0
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

    document.startViewTransition(() => apply(next)).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 750, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' },
      )
    })
  }

  return { theme, sync, toggle }
}
