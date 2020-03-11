import url from 'url';

function getAuthString(username, password) {
  return [username, password].filter(Boolean).join(':');
}

function getBaseUrlString({ protocol, username, password, hostname, app }) {
  // In Express 5, req.hostname might contain the port – remove it if needed.
  const [bareHostname] = hostname.split(':');

  return url.format({
    protocol,
    auth: getAuthString(username, password),
    hostname: bareHostname,
    port: app.settings.port,
  });
}

export function getRequestUrl(req) {
  const relativeUrl = req.url;
  const baseUrl = getBaseUrlString(req);

  return new URL(relativeUrl, baseUrl);
}
