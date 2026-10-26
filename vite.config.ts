import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { getPageMeta, SITE_URL, staticRoutes, type PageMeta } from './src/router/meta.ts'

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const withPageMeta = (html: string, meta: PageMeta, url: string) => {
  const setContent = (source: string, key: string, value: string) =>
    source.replace(new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*`), (_, start) => start + escapeHtml(value))

  let result = html
    .replace(/<title>[^<]*<\/title>/, () => `<title>${escapeHtml(meta.title)}</title>`)
    .replace(/(<link rel="canonical" href=")[^"]*/, (_, start) => start + url)

  const values: Record<string, string> = {
    description: meta.description,
    robots: meta.indexable ? 'index, follow' : 'noindex, follow',
    'og:title': meta.title,
    'og:description': meta.description,
    'og:url': url,
    'twitter:title': meta.title,
    'twitter:description': meta.description,
  }
  for (const [key, value] of Object.entries(values)) result = setContent(result, key, value)
  return result
}

// GitHub Pages only knows about files, so client-side routes otherwise come back as HTTP 404.
// Writing a real page per route (with its own metadata) makes them load with 200 and preview correctly.
const staticRoutePages = (): Plugin => {
  let outDir = 'dist'

  return {
    name: 'static-route-pages',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      const shell = await readFile(resolve(outDir, 'index.html'), 'utf8')
      const write = async (file: string, contents: string) => {
        const target = resolve(outDir, file)
        await mkdir(dirname(target), { recursive: true })
        await writeFile(target, contents)
      }

      for (const route of staticRoutes) {
        const html = withPageMeta(shell, getPageMeta(route.name, 'course' in route ? route.course : undefined), `${SITE_URL}${route.path}`)
        if (route.path === '/') {
          await write('index.html', html)
          continue
        }
        // Pages serves /learn/vue from learn/vue.html; the index.html copy covers the trailing-slash form.
        await write(`${route.path.slice(1)}.html`, html)
        await write(`${route.path.slice(1)}/index.html`, html)
      }

      await write('404.html', withPageMeta(shell, getPageMeta('not-found'), `${SITE_URL}/`))
      await write(
        'sitemap.xml',
        [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...staticRoutes.map((route) => `  <url><loc>${SITE_URL}${route.path}</loc></url>`),
          '</urlset>',
          '',
        ].join('\n'),
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    staticRoutePages(),
  ],
})
