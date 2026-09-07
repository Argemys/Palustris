const CACHE_NAME = 'zh-app-v5';
const ASSETS = ['./', './index.html', './manifest.json', './icon.svg', './icon-180.png', './icon-192.png', './icon-512.png'];
const REFERENTIELS = ['./corine_biotopes.json', './catalogue_flore_alslor_floragis_zh.json', './catalogue_flore_champagne_ardenne.json'];

// Fichiers "app shell" : toujours vérifiés en ligne en priorité, pour que les mises à jour
// se voient dès le prochain chargement (sans avoir besoin de la navigation privée).
// Les autres fichiers (icônes, référentiels volumineux) restent cache-first pour l'usage hors connexion.
const NETWORK_FIRST_RE = /(^\.?\/?$|\/index\.html$|\/sw\.js$|\/manifest\.json$)/;

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll(ASSETS).then(() =>
        // Mise en cache des référentiels au mieux : si un fichier est absent du dépôt,
        // ça ne doit pas empêcher le reste de l'appli d'être mis en cache hors connexion.
        Promise.all(REFERENTIELS.map(url =>
          cache.add(url).catch(() => {})
        ))
      )
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

function isAppShell(req){
  return req.mode === 'navigate' || NETWORK_FIRST_RE.test(new URL(req.url).pathname);
}

function networkFirst(req){
  return fetch(req).then(res => {
    const copy = res.clone();
    caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
    return res;
  }).catch(() => caches.match(req));
}

function cacheFirst(req){
  return caches.match(req).then(cached => cached ||
    fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
      return res;
    })
  );
}

self.addEventListener('fetch', evt => {
  if (evt.request.method !== 'GET') return;
  evt.respondWith(isAppShell(evt.request) ? networkFirst(evt.request) : cacheFirst(evt.request));
});
