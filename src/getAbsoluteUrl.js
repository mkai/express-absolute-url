import { format as urlFormat } from 'url';

function getAuthString(username, password) {
  if (username) {
    return [username, password].filter(Boolean).join(':');
  }
}

function firstItem(string, delimiter = ',') {
  if (!string.includes(delimiter)) {
    return string;
  }

  return string.substring(0, string.indexOf(','));
}

function getForwardedHost(req) {
  const forwardedHost = req.header('X-Forwarded-Host');
  const trustProxy = req.app.get('trust proxy fn');

  if (forwardedHost && trustProxy(req.connection.remoteAddress, 0)) {
    return firstItem(forwardedHost).trim();
  }
}

function getHostHeader(req) {
  // Since Express 4 incorrectly strips the port we have to imitate the native
  // behaviour (which considers X-Forwarded-Host) but leave the port in place.
  // https://github.com/expressjs/express/blob/b93ffd/lib/request.js#L427
  return getForwardedHost(req) || req.header('Host');
}

function formatBaseUrl(req, port) {
  const hostHeader = getHostHeader(req);
  const [parsedHost, parsedPort] = hostHeader.split(':');

  return urlFormat({
    protocol: req.protocol,
    auth: getAuthString(req.username, req.password),
    hostname: req.hostname,
    port: port ?? parsedPort,
  });
}

export function getAbsoluteUrl(req, { port } = {}) {
  const baseUrl = formatBaseUrl(req, port);
  const relativeUrl = req.url;

  return new URL(relativeUrl, baseUrl);
}
