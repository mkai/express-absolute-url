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

export function getRequestUrl(request, { path = request.url } = {}) {
  const baseUrl = getBaseUrl(request);
  const requestUrl = new URL(path, baseUrl);

  return requestUrl.href;
}
