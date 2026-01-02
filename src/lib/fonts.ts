export const FONT_FAMILIES = {
  inter: {
    name: 'Inter',
    weights: [400, 500, 600, 700],
    url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  },
  roboto: {
    name: 'Roboto',
    weights: [400, 500, 700],
    url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap',
  },
  poppins: {
    name: 'Poppins',
    weights: [400, 500, 600, 700],
    url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap',
  },
  geist: {
    name: 'Geist',
    weights: [400, 500, 600, 700],
    url: 'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap',
  },
  dmSans: {
    name: 'DM Sans',
    weights: [400, 500, 600, 700],
    url: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap',
  },
  plusJakarta: {
    name: 'Plus Jakarta Sans',
    weights: [400, 500, 600, 700],
    url: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap',
  },
} as const

export type FontKey = keyof typeof FONT_FAMILIES

export function loadFont(fontKey: FontKey): void {
  const font = FONT_FAMILIES[fontKey]
  if (!font) return

  const existingLink = document.querySelector(`link[href="${font.url}"]`)
  if (existingLink) return

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = font.url
  document.head.appendChild(link)
}

export function loadFonts(fontKeys: FontKey[]): void {
  fontKeys.forEach(loadFont)
}

export function setBodyFont(fontKey: FontKey): void {
  loadFont(fontKey)
  const font = FONT_FAMILIES[fontKey]
  if (font) {
    document.body.style.fontFamily = `'${font.name}', sans-serif`
  }
}
