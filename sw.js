// Network first, so updates show up right away; fall back to the last copy when offline
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open('zikr').then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
