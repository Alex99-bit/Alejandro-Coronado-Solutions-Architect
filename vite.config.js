import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const YOUTUBE_PROFILE = 'https://www.youtube.com/@alexcoronado3219'

/** Sustituir rutas absolutas en index.html cuando exista `VITE_SITE_URL` en .env (ej. https://alexcornado.com). */
function seoUrlsPlugin(mode) {
  return {
    name: 'inject-seo-absolute-urls',
    transformIndexHtml(html) {
      const env = loadEnv(mode, process.cwd(), '')
      const trimmed = env.VITE_SITE_URL?.trim()
      const origin = trimmed ? trimmed.replace(/\/$/, '') : ''
      const canonical = origin ? `${origin}/` : ''
      let out = html.replaceAll(
        '__PERSON_PAGE_URL__',
        canonical || YOUTUBE_PROFILE,
      )

      const blockRegex =
        /\n?\s*<!-- seo:absolute-url:start -->[\s\S]*?<!-- seo:absolute-url:end -->\s*/g

      if (!canonical) {
        out = out.replace(blockRegex, '\n')
      } else {
        out = out
          .replaceAll('__SITE_CANONICAL__', canonical)
          .replace(blockRegex, (block) =>
            block
              .replace('<!-- seo:absolute-url:start -->', '')
              .replace('<!-- seo:absolute-url:end -->', '')
              .trim(),
          )
      }
      return out
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), seoUrlsPlugin(mode)],
}))
