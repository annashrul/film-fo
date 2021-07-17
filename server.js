// // server.js
// const { createServer } = require('http')
// const { parse } = require('url')
// const next = require('next')

// const dev = process.env.NODE_ENV !== 'production'
// const app = next({ dev })
// const handle = app.getRequestHandler()

// app.prepare().then(() => {
//   createServer((req, res) => {
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
// const NextRedisCache = require('next-redis-cache');

const cacheableResponse = require('cacheable-response');
const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handle = app.getRequestHandler();

const ssrCache = cacheableResponse({
  ttl: 1000 * 60 * 60, // 1hour
  get: async ({ req, res }) => {
    const data = await app.renderToHTML(req, res, req.path, {
      ...req.query,
      ...req.params,
    });

    // Add here custom logic for when you do not want to cache the page, for
    // example when the page returns a 404 status code:
    if (res.statusCode === 404) {
      res.end(data);
      return;
    }

    return { data };
  },
  send: ({ data, res }) => res.send(data),
});

app.prepare().then(() => {
  const server = express();

  server.get('/', (req, res) => ssrCache({ req, res }));

  server.get('/:project/:tenant', (req, res) => {
    return ssrCache({ req, res });
  });
  server.get('/:project/:tenant/index', (req, res) => {
    return ssrCache({ req, res });
  });
  server.get('/:project/:tenant/quiz', (req, res) => {
    return ssrCache({ req, res });
  });
  server.get('/:project/:tenant/film', (req, res) => {
    return ssrCache({ req, res });
  });

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(server);
    console.log(`> Ready euy on http://localhost:${port}`);
  });
});

// const express = require('express');
// const next = require('next');
// const NextRedisCache = require('next-redis-cache');

// const port = process.env.PORT || 3000;
// const development = process.env.NODE_ENV !== 'production';
// const app = next({ dev: development });
// const handler = app.getRequestHandler();

// /**
//  *  Initialization of Next Redis Cache instance
//  */
// const nextRedisCache = new NextRedisCache('*', app, {
//   includes: ['/'], // routes to include for caching
// });

// app
//   .prepare()
//   .then(() => {
//     const server = express();

//     server.get(
//       '*',
//       (request, response, nxt) => nextRedisCache.middleware(request, response, nxt),
//       (request, response) => handler(request, response),
//     );

//     /* starting server */
//     return server.listen(port, (error) => {
//       if (error) throw error;
//       console.log(`> Ready on http://localhost:${port}`);
//     });
//   })
//   .catch((error) => new Error("Server isn't responded", error));
