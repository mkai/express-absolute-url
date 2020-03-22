# express-absolute-url

Get the absolute URL of your site from an [Express](https://expressjs.com)
request, including protocol, hostname and port.

[![NPM Version][npm-image]][npm-url]
[![Build][github-actions-image]][github-actions-url]
[![Coverage][codecov-image]][codecov-url]

While relative URLs are great, there are cases when you just need to know your
site's full URL. These cases might include:

- Rendering the HTML `rel="canonical"` meta tag
- Including links to your site in email or push notifications
- Showing the right URL when users share your content on social media.

Turns out this is
[surprisingly tricky](https://stackoverflow.com/questions/10183291/how-to-get-the-full-url-in-express)
to do right with Express, so this package aims to make it easier:

```javascript
import { getAbsoluteUrl } from 'express-absolute-url';

> getAbsoluteUrl(req).toString();
https://www.mysite.com/hello/?q=world
```

Note that a [WHATWG `URL`](https://nodejs.org/api/url.html#url_the_whatwg_url_api)
object is returned which can be further manipulated or just converted to a
string.

## Determining the port

By default, this package will try to determine the port automatically from
the incoming _Host_ header (or _X-Forwarded-Host_ header, if you
[trust](http://expressjs.com/en/guide/behind-proxies.html) that).

If the port could not be determined automatically, then the standard port for
the respective protocol will be used. However, you can still specify the port
manually using the `port` option as follows:

```javascript
import { getAbsoluteUrl } from 'express-absolute-url';

> getAbsoluteUrl(req, { port: 8443 }).toString();
https://www.mysite.com:8443/hello/?q=world
```

## Installation

```shell
$ npm install express-absolute-url
```

## Tests

To run the test suite, first install the dependencies, then run `npm test`:

```shell
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
