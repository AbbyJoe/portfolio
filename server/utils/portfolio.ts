export async function readPortfolio() {
  const text = await useStorage('assets:portfolio').getItem<string>('PORTFOLIO.md')
  return (text || '').replaceAll('<portfolio', '')
}
