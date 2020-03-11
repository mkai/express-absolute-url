import { getRequestUrl } from './getRequestUrl';

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

describe('getRequestUrl', () => {
  const testCases = [
    // prettier-ignore
    {
      request: testRequest(),
      expectedUrl: 'https://host.com/path.html',
    },
    {
      request: testRequest({ app: testApp(8443) }),
      expectedUrl: 'https://host.com:8443/path.html',
    },
    {
      request: testRequest({ hostname: 'host.com:678', app: testApp(345) }),
      expectedUrl: 'https://host.com:345/path.html',
    },
    {
      request: testRequest({ username: 'user', password: 'pass' }),
      expectedUrl: 'https://user:pass@host.com/path.html',
    },
    {
      request: testRequest({ url: '/path.html?offset=10&limit=10' }),
      expectedUrl: 'https://host.com/path.html?offset=10&limit=10',
    },
  ];

  test.each(testCases)(
    'returns the expected URL for a given request',
    ({ request, expectedUrl }) => {
      const requestUrl = getRequestUrl(request);

      expect(requestUrl.href).toBe(expectedUrl);
    }
  );
});
