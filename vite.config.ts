import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-404-github-pages',
      closeBundle() {
        const distDir = path.resolve(__dirname, 'dist')
        const notFoundHtml = path.resolve(distDir, '404.html')
        // SPA redirection script for GitHub Pages (https://github.com/rafgraph/spa-github-pages)
        const redirectScript = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>NETWORK EXPLAINED</title>
    <script type="text/javascript">
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
  </body>
</html>
`
        fs.writeFileSync(notFoundHtml, redirectScript, 'utf-8')
      }
    }
  ],
  base: '/network-explained_cnawt_TY/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animation: ['gsap', 'lenis'],
          three: ['three'],
          katex: ['katex'],
        }
      }
    }
  }
})
