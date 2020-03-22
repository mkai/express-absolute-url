# express-absolute-url

Get the absolute URL of your site from an [Express](https://expressjs.com)
request, including protocol, hostname and port.

[![NPM Version][npm-image]][npm-url]
[![Build][github-actions-image]][github-actions-url]
[![Coverage][codecov-image]][codecov-url]

```js
import { getAbsoluteUrl } from 'express-absolute-url';

> getAbsoluteUrl(req).toString()
https://www.example.com/hello/?q=world
```

By default, this package will try to determine the port automatically from
the incoming _Host_ header (or _X-Forwarded-Host_ header, if you
[trust](http://expressjs.com/en/guide/behind-proxies.html) that).

If the port could not be determined automatically, then the standard port for
the respective protocol will be used. However, you can still specify the port
manually using the `port` option as follows:

```js
import { getAbsoluteUrl } from 'express-absolute-url';

> getAbsoluteUrl(req, { port: 8443 }).toString()
http://localhost:8443/hello/?q=world
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

MIT

[npm-image]: https://img.shields.io/npm/v/express-absolute-url.svg
[npm-url]: https://npmjs.org/package/express-absolute-url
[github-actions-image]: https://github.com/mkai/express-absolute-url/workflows/Test/badge.svg?branch=master&event=push
[github-actions-url]: https://github.com/mkai/express-absolute-url/actions?query=branch%3Amaster+event%3Apush
[codecov-image]: https://codecov.io/gh/mkai/express-absolute-url/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/mkai/express-absolute-url
