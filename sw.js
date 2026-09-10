// Minimal PWA service worker. Version 2026-08-16-chart-touch-v2.
// Its only purpose is to satisfy install-criteria for browsers that require
// a registered service worker (with a fetch handler) before firing the
// `beforeinstallprompt` event. It intentionally does NOT cache anything —
// every request passes through to the network so trading data, auth, and
// realtime traffic behave exactly as they do without a service worker.

self.addEventListener("install", () => {
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys()
        .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
        .then(() => self.clients.claim()),
    );
});

// No-op fetch handler. Required by some browsers' install heuristics.
self.addEventListener("fetch", () => {
    // pass through — do not respondWith
});