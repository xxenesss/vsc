const CACHE_NAME = 'v1';
const CACHE_ASSETS = [
    './index.html',
    './product1.html',
    './hoodiet.png'  // ваш файл изображения

];

// Установка Service Worker и кэширование ресурсов
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Caching files');
            return cache.addAll(CACHE_ASSETS);
        })
        .then(() => self.skipWaiting())
    );
});

// Активизация Service Worker и удаление старого кэша
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Запросы: использование кэша или загрузка ресурсов заново
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
