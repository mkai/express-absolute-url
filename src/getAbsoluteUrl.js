import { format as urlFormat } from 'url';

function getAuthString(username, password) {
  if (!username) {
    return '';
  }

  return [username, password].filter(Boolean).join(':');
}

function formatBaseUrl({ protocol, username, password, hostname, app }) {
  // In Express 5, req.hostname might contain the port – remove it if needed.
  const [bareHostname] = hostname.split(':');

  return urlFormat({
    protocol,
    auth: getAuthString(username, password),
    hostname: bareHostname,
    port: app.settings.port,
  });
}

export function getAbsoluteUrl(req) {
  const relativeUrl = req.url;
  const baseUrl = formatBaseUrl(req);

  return new URL(relativeUrl, baseUrl);
}
