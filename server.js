import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle analytics ping gracefully
app.all('/~api/analytics*', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
};

// Route handler for `/assets/:file` -> direct map to root
app.use('/assets', (req, res, next) => {
  const reqPath = decodeURIComponent(req.path).replace(/^\/+/, '');
  const candidate = path.join(__dirname, reqPath);
  if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
    const ext = path.extname(candidate).toLowerCase();
    if (MIME_TYPES[ext]) {
      res.setHeader('Content-Type', MIME_TYPES[ext]);
    }
    return res.sendFile(candidate);
  }
  next();
});

// Helper to serve HTML files with interactive options script injected
function sendHtmlFile(res, filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('interactive-options.js')) {
      content = content.replace('</body>', '<script src="/interactive-options.js"></script></body>');
    }
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(content);
  } catch (err) {
    res.status(500).send('Error loading page');
  }
}

// Serve interactive-options.js directly
app.get('/interactive-options.js', (req, res) => {
  const filePath = path.join(__dirname, 'interactive-options.js');
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    return res.sendFile(filePath);
  }
  res.status(404).end();
});

// Serve _serverFn endpoints from SSR files
app.all('/_serverFn/:fnId', (req, res) => {
  const fnId = (req.params.fnId || '').replace(/[^a-zA-Z0-9_-]/g, '');
  const candidate = path.join(__dirname, '_serverFn', `${fnId}.html`);
  if (fs.existsSync(candidate)) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.sendFile(candidate);
  }
  res.json({ result: null, error: null });
});

// Serve local Supabase endpoints from exported data
app.use(['/rest/v1', '/auth/v1', '/storage/v1'], (req, res, next) => {
  const subPath = req.baseUrl + req.path;
  const basePath = path.join(__dirname, 'skqfapqbqbrbuageiyea.supabase.co');
  const candidateJson = path.join(basePath, `${subPath}.json`);
  const candidateHtml = path.join(basePath, `${subPath}.html`);
  const candidateDirect = path.join(basePath, subPath);

  if (fs.existsSync(candidateJson)) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.sendFile(candidateJson);
  }
  if (fs.existsSync(candidateHtml)) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.sendFile(candidateHtml);
  }
  if (fs.existsSync(candidateDirect) && fs.statSync(candidateDirect).isFile()) {
    const ext = path.extname(candidateDirect).toLowerCase();
    if (MIME_TYPES[ext]) {
      res.setHeader('Content-Type', MIME_TYPES[ext]);
    }
    return res.sendFile(candidateDirect);
  }
  next();
});

// Handle form submissions on signin / signup gracefully
app.post(['/signin', '/signup', '/login', '/funded/signin', '/funded/signup'], (req, res) => {
  res.redirect('/trade');
});

// Static files handler for GitHub repository routes
app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return next();
  }

  const cleanPath = decodeURIComponent(req.path).replace(/^\/+/, '');

  if (!cleanPath) {
    return sendHtmlFile(res, path.join(__dirname, 'index.html'));
  }

  // Trade terminal route
  if (cleanPath === 'trade' || cleanPath === 'trading' || cleanPath === 'platform') {
    const tradeHtml = path.join(__dirname, 'trade.html');
    if (fs.existsSync(tradeHtml)) {
      return sendHtmlFile(res, tradeHtml);
    }
  }

  const directFile = path.join(__dirname, cleanPath);

  // 1. Direct existing file check (e.g. `signin`, `about`, `funded/pricing`, images, etc.)
  if (fs.existsSync(directFile) && fs.statSync(directFile).isFile()) {
    const ext = path.extname(directFile).toLowerCase();
    if (!ext || ext === '.html') {
      return sendHtmlFile(res, directFile);
    } else if (MIME_TYPES[ext]) {
      res.setHeader('Content-Type', MIME_TYPES[ext]);
    }
    return res.sendFile(directFile);
  }

  // 2. Direct existing file with .html extension
  const htmlFile = path.join(__dirname, `${cleanPath}.html`);
  if (fs.existsSync(htmlFile) && fs.statSync(htmlFile).isFile()) {
    return sendHtmlFile(res, htmlFile);
  }

  // 3. Nested index / directory check (e.g. `funded` -> `funded/pricing` or `funded/rules`)
  if (cleanPath === 'funded') {
    const fundedPricing = path.join(__dirname, 'funded', 'pricing');
    if (fs.existsSync(fundedPricing)) {
      return sendHtmlFile(res, fundedPricing);
    }
  }

  if (cleanPath === 'affiliate') {
    const affiliateSignup = path.join(__dirname, 'affiliate', 'signup');
    if (fs.existsSync(affiliateSignup)) {
      return sendHtmlFile(res, affiliateSignup);
    }
  }

  next();
});

// Fallback to index.html
app.use((req, res) => {
  sendHtmlFile(res, path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Okay Broker server running on http://${HOST}:${PORT}`);
});
