const http = require('node:http');
const { readFile } = require('node:fs/promises');
const { extname, join, normalize } = require('node:path');

const port = Number(process.env.PORT || 4173);
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml' };

http.createServer(async (request, response) => {
  const pathname = request.url === '/' ? '/index.html' : new URL(request.url, 'http://localhost').pathname;
  try {
    const relativePath = normalize(decodeURIComponent(pathname)).replace(/^[/\\]+/, '');
    if (relativePath.startsWith('..')) throw new Error('Invalid path');
    const file = await readFile(join(__dirname, relativePath));
    response.writeHead(200, { 'Content-Type':types[extname(pathname)] || 'application/octet-stream' });
    response.end(file);
  } catch {
    response.writeHead(404, { 'Content-Type':'text/plain; charset=utf-8' });
    response.end('Page not found');
  }
}).listen(port, () => console.log(`Letter Land is ready: http://localhost:${port}`));
