import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'frame-saver',
      configureServer(server) {
        server.middlewares.use('/api/save-frame', (req, res) => {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              try {
                const { filename, base64 } = JSON.parse(body);
                const buffer = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                const targetPath = path.resolve(process.cwd(), 'public/images/categories', filename);
                fs.writeFileSync(targetPath, buffer);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ ok: true, saved: targetPath }));
              } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
              }
            });
          } else {
            res.writeHead(404);
            res.end();
          }
        });
      }
    }
  ],
})

