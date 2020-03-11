import url from 'url';

function getAuthString(username, password) {
  return [username, password].filter(Boolean).join(':');
}

function getBaseUrl({ protocol, username, password, hostname, app }) {
  const [parsedHostname, parsedPort] = hostname.split(':');

  return url.format({
    protocol,
    auth: getAuthString(username, password),
    hostname: parsedHostname,
    port: parsedPort || app.settings.port,
  });
}

  const baseUrl = getBaseUrl(request);
export function getRequestUrl(req) {
  const path = req.url;

  return new URL(path, baseUrl);
}
