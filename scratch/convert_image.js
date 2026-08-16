import fs from 'fs';
import { spawn } from 'child_process';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

const server = http.createServer((req, res) => {
  if (req.url === '/hero-robot.png') {
    const data = fs.readFileSync(path.join(publicDir, 'hero-robot.png'));
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.end(data);
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <body>
        <img id="img" src="/hero-robot.png" />
        <script>
          window.onload = () => {
            const img = document.getElementById('img');
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const webpData = canvas.toDataURL('image/webp', 0.82);
            fetch('/save', { method: 'POST', body: webpData }).then(() => {
              window.close();
            });
          };
        </script>
      </body>
      </html>
    `);
  }
});

server.on('request', (req, res) => {
  if (req.method === 'POST' && req.url === '/save') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      const base64Data = body.replace(/^data:image\/webp;base64,/, '');
      fs.writeFileSync(path.join(publicDir, 'hero-robot.webp'), Buffer.from(base64Data, 'base64'));
      console.log('Saved hero-robot.webp successfully! Size:', fs.statSync(path.join(publicDir, 'hero-robot.webp')).size, 'bytes');
      res.writeHead(200);
      res.end('ok');
      setTimeout(() => {
        server.close();
        process.exit(0);
      }, 500);
    });
  }
});

server.listen(8765, () => {
  console.log('Server running on 8765. Launching headless Chrome...');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    'http://localhost:8765/'
  ]);
  chrome.on('exit', (code) => {
    console.log('Chrome exited with code', code);
  });
});
