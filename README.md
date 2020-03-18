# express-absolute-url

Get the absolute URL of your site from an [Express](https://expressjs.com)
request, including protocol, hostname and port.

[![NPM Version][npm-image]][npm-url]
[![Build][github-actions-image]][github-actions-url]

```js
import { getAbsoluteUrl } from 'express-absolute-url';

> getAbsoluteUrl(req).toString()
https://www.example.com/hello/?q=world
```

By default, this package will try to determine the port automatically from
the incoming Host header (or X-Forwarded-Host header, if you
[trust](http://expressjs.com/en/guide/behind-proxies.html) that).

```js
import { getAbsoluteUrl } from 'express-absolute-url';

> getAbsoluteUrl(req).toString()
http://localhost:3000/hello/?q=world
```

If the port could not be determined automatically, then the standard port for
the respective protocol will be used.

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

MIT

[npm-image]: https://img.shields.io/npm/v/express-absolute-url.svg
[npm-url]: https://npmjs.org/package/express-absolute-url
[github-actions-image]: https://github.com/mkai/express-absolute-url/workflows/Test/badge.svg?branch=master&event=push
[github-actions-url]: https://github.com/mkai/express-absolute-url/actions?query=branch%3Amaster+event%3Apush
