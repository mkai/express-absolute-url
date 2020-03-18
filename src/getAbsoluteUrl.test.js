import { getAbsoluteUrl } from './getAbsoluteUrl';

const testApp = ({ trustProxy = false } = {}) => ({
  get(setting) {
    if (setting === 'trust proxy fn') {
      return () => trustProxy;
    }
  },
});

const testHeaderFunc = headers => headerName => headers[headerName];

const testRequest = overrides => ({
  protocol: 'https',
  host: 'host.com',
  hostname: 'host.com',
  url: '/path.html',
  header: testHeaderFunc({ Host: 'host.com' }),
  connection: {
    remoteAddress: 'remote.com',
  },
  app: testApp(),
  ...overrides,
});

describe('getAbsoluteUrl', () => {
  it('returns the expected URL for a plain request', () => {
    const request = testRequest();
    const url = getAbsoluteUrl(request);

    expect(url.toString()).toBe('https://host.com/path.html');
  });

  it('treats the path as case-sensitive', () => {
    const request = testRequest({ url: '/Path.html' });
    const url = getAbsoluteUrl(request);

    expect(url.toString()).toBe('https://host.com/Path.html');
  });

  const authTestCases = [
    {
      username: 'user',
      expectedUrl: 'https://user@host.com/path.html',
    },
    {
      username: 'user',
      password: 'pass',
      expectedUrl: 'https://user:pass@host.com/path.html',
    },
    {
      password: 'pass',
      expectedUrl: 'https://host.com/path.html',
    },
  ];

  test.each(authTestCases)(
    'picks up basic auth credentials as expected',
    ({ username, password, expectedUrl }) => {
      const request = testRequest({ username, password });
      const url = getAbsoluteUrl(request);

      expect(url.toString()).toBe(expectedUrl);
    }
  );

  it('preserves any query parameters', () => {
    const request = testRequest({ url: '/path.html?offset=10&limit=10' });
    const url = getAbsoluteUrl(request);

    expect(url.toString()).toBe(
      'https://host.com/path.html?offset=10&limit=10'
    );
  });

  it('uses the port from the host property, if available', () => {
    const request = testRequest({ host: 'host.com:123' });
    const url = getAbsoluteUrl(request);

    expect(url.toString()).toBe('https://host.com:123/path.html');
  });

  it('uses the port from the host header if available', () => {
    const request = testRequest({
      host: 'host.com',
      header: testHeaderFunc({ Host: 'host.com:456' }),
    });
    const url = getAbsoluteUrl(request);

    expect(url.toString()).toBe('https://host.com:456/path.html');
  });

  it('ignores the port from the X-Forwarded-Host header if not trusted', () => {
    const request = testRequest({
      host: 'host.com',
      header: testHeaderFunc({
        Host: 'host.com',
        'X-Forwarded-Host': 'forwarded.com:777',
      }),
    });
    const url = getAbsoluteUrl(request);

    expect(url.toString()).toBe('https://host.com/path.html');
  });

  const forwardedHostTestCases = [
    'forwarded.com:777',
    'forwarded.com:777, forwarded2.com:888',
  ];

  test.each(forwardedHostTestCases)(
    'uses the port from the X-Forwarded-Host header if trusted',
    forwardedHostHeader => {
      const request = testRequest({
        host: 'forwarded.com',
        hostname: 'forwarded.com',
        header: testHeaderFunc({
          Host: 'host.com',
          'X-Forwarded-Host': forwardedHostHeader,
        }),
        app: testApp({ trustProxy: true }),
      });
      const url = getAbsoluteUrl(request);

      expect(url.toString()).toBe('https://forwarded.com:777/path.html');
    }
  );

  it('uses a manually specified port if given', () => {
    const request = testRequest();
    const url = getAbsoluteUrl(request, { port: 789 });

    expect(url.toString()).toBe('https://host.com:789/path.html');
  });

  it('gives precedence to a manually specified port', () => {
    const request = testRequest({
      host: 'host.com:123',
      header: testHeaderFunc({ Host: 'host.com:456' }),
    });
    const url = getAbsoluteUrl(request, { port: 789 });

    expect(url.toString()).toBe('https://host.com:789/path.html');
  });
});
