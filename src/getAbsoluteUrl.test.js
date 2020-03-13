import { getAbsoluteUrl } from './getAbsoluteUrl';

const testApp = port => ({
  settings: {
    port,
  },
});

const testRequest = overrides => ({
  protocol: 'https',
  hostname: 'host.com',
  url: '/path.html',
  app: testApp(443),
  ...overrides,
});

describe('getAbsoluteUrl', () => {
  it('returns the expected URL for a plain request', () => {
    const request = testRequest();

    expect(getAbsoluteUrl(request).href).toBe('https://host.com/path.html');
  });

  it('treats the path as case-sensitive', () => {
    const request = testRequest({ url: '/Path.html' });

    expect(getAbsoluteUrl(request).href).toBe('https://host.com/Path.html');
  });

  it('uses the port configured in the Express app', () => {
    const request = testRequest({ app: testApp(8443) });

    expect(getAbsoluteUrl(request).href).toBe(
      'https://host.com:8443/path.html'
    );
  });

  it('gives precedence to a manually specified port', () => {
    const request = testRequest({ app: testApp(8443) });

    expect(getAbsoluteUrl(request, { port: 8080 }).href).toBe(
      'https://host.com:8080/path.html'
    );
  });

  it('ignores the port given in the host header', () => {
    const request = testRequest({
      hostname: 'host.com:678',
      app: testApp(8443),
    });

    expect(getAbsoluteUrl(request).href).toBe(
      'https://host.com:8443/path.html'
    );
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

      expect(getAbsoluteUrl(request).href).toBe(expectedUrl);
    }
  );

  it('preserves any query parameters', () => {
    const request = testRequest({ url: '/path.html?offset=10&limit=10' });

    expect(getAbsoluteUrl(request).href).toBe(
      'https://host.com/path.html?offset=10&limit=10'
    );
  });
});
