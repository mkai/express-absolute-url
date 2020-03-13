# express-absolute-url

Get the absolute URL of an [Express](https://expressjs.com) request,
including protocol, hostname and port.

[![NPM Version][npm-image]][npm-url]
[![Build][github-actions-image]][github-actions-url]

```js
import { getAbsoluteUrl } from 'express-absolute-url';

> getAbsoluteUrl(req)
http://localhost:3000/hello/
```

You might want to set the port manually, e. g. when your app is deployed behind
a reverse proxy:

```js
import { getAbsoluteUrl } from 'express-absolute-url';

> getAbsoluteUrl(req, { port: 443 })
https://www.example.com/hello/
```

## Installation

```bash
$ npm install express-absolute-url
```

## Tests

To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ npm install
$ npm test
```

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/express-absolute-url.svg
[npm-url]: https://npmjs.org/package/express-absolute-url
[github-actions-image]: https://github.com/mkai/express-absolute-url/workflows/Test/badge.svg?branch=master&event=push
[github-actions-url]: https://github.com/mkai/express-absolute-url/actions?query=branch%3Amaster+event%3Apush
