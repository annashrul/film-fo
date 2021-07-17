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
