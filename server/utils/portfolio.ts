import { readFile, stat } from 'node:fs/promises'
import { resolve } from 'node:path'

let cached = { mtimeMs: 0, text: '' }

export async function readPortfolio() {
  const path = resolve(process.cwd(), 'PORTFOLIO.md')
  const info = await stat(path)
  if (info.mtimeMs !== cached.mtimeMs || !cached.text) {
    cached = { mtimeMs: info.mtimeMs, text: await readFile(path, 'utf8') }
  }
  return cached.text.replaceAll('<portfolio', '')
}
