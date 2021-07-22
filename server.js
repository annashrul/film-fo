// // server.js
// const { createServer } = require('http')
// const { parse } = require('url')
// const next = require('next')

// const dev = process.env.NODE_ENV !== 'production'
// const app = next({ dev })
// const handle = app.getRequestHandler()

// app.prepare().then(() => {
//   createServer((req, res) => {
//     // Be sure to pass `true` as the second argument to `url.parse`.
//     // This tells it to parse the query portion of the URL.
//     const parsedUrl = parse(req.url, true)
//     const { pathname, query } = parsedUrl

//     if (pathname === '/a') {
//       app.render(req, res, '/a', query)
//     } else if (pathname === '/b') {
//       app.render(req, res, '/b', query)
//     } else {
//       handle(req, res, parsedUrl)
//     }
//   }).listen(3000, (err) => {
//     if (err) throw err
//     console.log('> Ready on http://localhost:3000')
//   })
// })

// const cacheableResponse = require('cacheable-response');
// const express = require('express');
// const next = require('next');

// const port = parseInt(process.env.PORT, 10) || 3000;
// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });

// const handle = app.getRequestHandler();

// const ssrCache = cacheableResponse({
//   ttl: 1000 * 60 * 60, // 1hour
//   get: async ({ req, res }) => {
//     const data = await app.renderToHTML(req, res, req.path, {
//       ...req.query,
//       ...req.params,
//     });

//     // Add here custom logic for when you do not want to cache the page, for
//     // example when the page returns a 404 status code:
//     if (res.statusCode === 404) {
//       res.end(data);
//       return;
//     }

//     return { data };
//   },
//   send: ({ data, res }) => res.send(data),
// });

// app.prepare().then(() => {
//   const server = express();

//   server.get('/', (req, res) => {
//     ssrCache({ req, res });
//   });
//   server.get('/backoffice/auth', (req, res) => {
//     return ssrCache({ req, res });
//   });
//   server.get('/backoffice/question', (req, res) => {
//     return ssrCache({ req, res });
//   });

//   server.get('/:project/:tenant', (req, res) => {
//     console.log('###############REQUEST#################', req);
//     console.log('###############RESPONSE#################', res);
//     return ssrCache({ req, res });
//   });
//   server.get('/:project/:tenant/index', (req, res) => {
//     return ssrCache({ req, res });
//   });
//   server.get('/:project/:tenant/quiz', (req, res) => {
//     return ssrCache({ req, res });
//   });
//   server.get('/:project/:tenant/film', (req, res) => {
//     return ssrCache({ req, res });
//   });

//   server.get('*', (req, res) => handle(req, res));

//   server.listen(port, (err) => {
//     if (err) throw err;
//     console.log(`> Ready euy on http://localhost:${port}`);
//   });
// });

// const next = require('next');
// const Koa = require('koa');
// const router = require('koa-route');
// const LRUCache = require('lru-cache');

// const port = parseInt(process.env.PORT, 10) || 3000;
// const dev = process.env.NODE_ENV !== 'production';
// const test = process.env.NODE_TEST === 'test';
// const app = next({ dev });
// const handle = app.getRequestHandler();

// // This is where we cache our rendered HTML pages
// const ssrCache = new LRUCache({
//   max: 100,
//   maxAge: 1000 * 60 * 60, // 1hour
// });

// function getCacheKey(ctx) {
//   return ctx.url;
// }

// function renderAndCache(ctx, pagePath, noCache, queryParams = null) {
//   if (dev || test) ssrCache.reset();
//   if (noCache === 'noCache') {
//     return app
//       .renderToHTML(ctx.req, ctx.res, pagePath, queryParams)
//       .then((html) => {
//         // Let's cache this page
//         console.info('no cache');
//         ctx.body = html;
//       })
//       .catch((err) => {
//         console.info('ERRR', err);
//         return app.renderError(err, ctx.req, ctx.res, pagePath, queryParams);
//       });
//   }

//   const key = getCacheKey(ctx.req);

//   // If we have a page in the cache, let's serve it
//   if (ssrCache.has(key)) {
//     console.info(`CACHE HIT: ${key}`);
//     ctx.body = ssrCache.get(key);
//     return Promise.resolve();
//   }

//   // If not let's render the page into HTML
//   return app
//     .renderToHTML(ctx.req, ctx.res, pagePath, queryParams)
//     .then((html) => {
//       // Let's cache this page
//       console.info(`CACHE MISS: ${key}`);
//       ssrCache.set(key, html);
//       ctx.body = html;
//     })
//     .catch((err) => {
//       console.info('ERRR', err);
//       return app.renderError(err, ctx.req, ctx.res, pagePath, queryParams);
//     });
// }
// app.prepare().then(() => {
//   const server = new Koa();

//   server.use(router.get('/:project/:tenant', (ctx) => renderAndCache(ctx, '/:project/:tenant')));
//   server.use(router.get('/:project/:tenant/film', (ctx) => renderAndCache(ctx, '/:project/:tenant/film')));
//   server.use(router.get('/:project/:tenant/quiz', (ctx) => renderAndCache(ctx, '/:project/:tenant/quiz')));
//   server.use(router.get('/backoffice/auth', (ctx) => renderAndCache(ctx, '/backoffice/auth')));
//   server.use(router.get('/backoffice/question', (ctx) => renderAndCache(ctx, '/backoffice/question')));
//   server.use(router.get('/backoffice/project', (ctx) => renderAndCache(ctx, '/backoffice/project')));
//   server.use(router.get('/backoffice/category', (ctx) => renderAndCache(ctx, '/backoffice/category')));
//   server.use(router.get('/backoffice/tenant', (ctx) => renderAndCache(ctx, '/backoffice/tenant')));

//   server.use(async (ctx) => {
//     await handle(ctx.req, ctx.res);
//     ctx.respond = false;
//   });

//   server.use(async (ctx, next) => {
//     ctx.res.statusCode = 200;
//     await next();
//   });

//   server.listen(port, (err) => {
//     if (err) throw err;
//     console.info(`> Ready on http://localhost:${port}`);
//   });
// });

const express = require('express');
const next = require('next');

const isDevEnvironment = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev: isDevEnvironment, dir: './src' });

const defaultRequestHandler = nextApp.getRequestHandler();

const Keyv = require('keyv');
const { resolve: urlResolve } = require('url');
const normalizeUrl = require('normalize-url');
const cacheableResponse = require('cacheable-response');

const cacheStore = new Keyv({ namespace: 'ssr-cache' });

const _getSSRCacheKey = (req) => {
  const url = urlResolve('http://localhost', req.url);
  const { origin } = new URL(url);
  const baseKey = normalizeUrl(url, {
    removeQueryParameters: ['embed', 'filter', 'force', 'proxy', 'ref', /^utm_\w+/i],
  });
  return baseKey.replace(origin, '').replace('/?', '');
};

const cacheManager = cacheableResponse({
  ttl: 1000 * 60 * 60, // 1hour
  get: async ({ req, res, pagePath, queryParams }) => {
    try {
      return { data: await nextApp.renderToHTML(req, res, pagePath, queryParams) };
    } catch (e) {
      return { data: 'error: ' + e };
    }
  },
  send: ({ data, res }) => {
    res.send(data);
  },
  cache: cacheStore,
  getKey: _getSSRCacheKey,
  compress: true,
});

function clearCompleteCache(res, req) {
  cacheStore.clear();
  res.status(200);
  res.send({
    path: req.hostname + req.baseUrl,
    purged: true,
    clearedCompleteCache: true,
  });
  res.end();
}

function clearCacheForRequestUrl(req, res) {
  let key = _getSSRCacheKey(req);
  console.log(key);
  cacheStore.delete(key);
  res.status(200);
  res.send({
    path: req.hostname + req.baseUrl + req.path,
    key: key,
    purged: true,
    clearedCompleteCache: false,
  });
  res.end();
}

nextApp
  .prepare()
  .then(() => {
    const server = express();

    server.get('/_next/*', (req, res) => {
      defaultRequestHandler(req, res);
    });

    server.get('*', (req, res) => {
      if (req.query.noCache) {
        // isDevEnvironment ||
        res.setHeader('X-Cache-Status', 'DISABLED');
        defaultRequestHandler(req, res);
      } else {
        cacheManager({ req, res, pagePath: req.path });
      }
    });

    server.purge('*', (req, res) => {
      if (req.query.clearCache) {
        clearCompleteCache(res, req);
      } else {
        clearCacheForRequestUrl(req, res);
      }
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
