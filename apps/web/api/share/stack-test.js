export default function handler(req, res) {
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Stack Share Test</title>
    <meta property="og:title" content="Stack Share Test" />
    <meta property="og:description" content="Stack share test endpoint" />
    <meta property="og:image" content="https://kolkrabbi.io/img/open-graph/open-graph-01.png" />
    <meta property="og:type" content="article" />
  </head>
  <body>
    <p>Stack share test endpoint.</p>
  </body>
</html>`

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.status(200).send(html)
}
