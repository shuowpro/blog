import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import rehypeWrap from 'rehype-wrap'

import icon from 'astro-icon'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.suwako.dev',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    icon(),
  ],
  markdown: {
    rehypePlugins: [
      [
        rehypeWrap,
        {
          selector: 'table',
          wrapper: 'div.table-overflow-container',
        },
      ],
    ],
    shikiConfig: {
      theme: 'tokyo-night',
    },
  },
})
