importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const {registerRoute} = workbox.routing;
const {StaleWhileRevalidate} = workbox.strategies;
const {CacheableResponsePlugin} = workbox.cacheableResponse;
const {ExpirationPlugin} = workbox.expiration;

/* cache js and css, use StaleWhileRevalidate strategy  */
registerRoute(
    ({request}) => request.destination === 'script' ||
    request.destination === 'style',
    new StaleWhileRevalidate({
      cacheName: 'notebook/cache/jsAndCss',
    }),
);

/* Cache pic for 180 days */
registerRoute(
    new RegExp('\.(jpg|gif|bmg|png|jpeg|gif)'),
    new StaleWhileRevalidate({
      cacheName: 'notebook/cache/image',
      plugins: [
        new ExpirationPlugin({
          maxAgeSeconds: 60 * 60 * 24 * 180,
          maxEntries: 30,
        }),
      ],
    }),
);

/* cache font for 1 year */
registerRoute(
    new RegExp('\.(woff|woff2|tff|ico)'),
    new StaleWhileRevalidate({
      cacheName: 'notebook/cache/fontAndIcon',
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
        new ExpirationPlugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ],
    }),
);
