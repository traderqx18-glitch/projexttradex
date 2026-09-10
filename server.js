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

// Handle form submissions on signin / signup gracefully
app.post(['/signin', '/signup', '/login', '/funded/signin', '/funded/signup'], (req, res) => {
  res.redirect('/funded/pricing');
});

// Static files handler for GitHub repository routes
app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return next();
  }

  const cleanPath = decodeURIComponent(req.path).replace(/^\/+/, '');

  if (!cleanPath) {
    return res.sendFile(path.join(__dirname, 'index.html'));
  }

  // If trade route is requested, redirect to funded pricing page from repo
  if (cleanPath === 'trade' || cleanPath === 'trading' || cleanPath === 'platform') {
    return res.redirect('/funded/pricing');
  }

  const directFile = path.join(__dirname, cleanPath);

  // 1. Direct existing file check (e.g. `signin`, `about`, `funded/pricing`, images, etc.)
  if (fs.existsSync(directFile) && fs.statSync(directFile).isFile()) {
    const ext = path.extname(directFile).toLowerCase();
    if (!ext || ext === '.html') {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
    } else if (MIME_TYPES[ext]) {
      res.setHeader('Content-Type', MIME_TYPES[ext]);
    }
    return res.sendFile(directFile);
  }

  // 2. Direct existing file with .html extension
  const htmlFile = path.join(__dirname, `${cleanPath}.html`);
  if (fs.existsSync(htmlFile) && fs.statSync(htmlFile).isFile()) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.sendFile(htmlFile);
  }

  // 3. Nested index / directory check (e.g. `funded` -> `funded/pricing` or `funded/rules`)
  if (cleanPath === 'funded') {
    const fundedPricing = path.join(__dirname, 'funded', 'pricing');
    if (fs.existsSync(fundedPricing)) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.sendFile(fundedPricing);
    }
  }

  if (cleanPath === 'affiliate') {
    const affiliateSignup = path.join(__dirname, 'affiliate', 'signup');
    if (fs.existsSync(affiliateSignup)) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.sendFile(affiliateSignup);
    }
  }

  next();
});

// Fallback to index.html
app.use((req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Okay Broker server running on http://${HOST}:${PORT}`);
});
