import { getRequestUrl } from './getRequestUrl';

function makeExpressApp(port) {
  return {
    settings: {
      port,
    },
  };
}

function makeRequest(overrides) {
  return {
    protocol: 'https',
    hostname: 'www.test.com',
    url: '/path.html',
    app: makeExpressApp(443),
    ...overrides,
  };
}

describe('getRequestUrl', () => {
  const testCases = [
    [makeRequest(), 'https://www.test.com/path.html'],
    [
      makeRequest({ app: makeExpressApp(8443) }),
      'https://www.test.com:8443/path.html',
    ],
    [
      makeRequest({ hostname: 'www.test.com:678', app: makeExpressApp(345) }),
      'https://www.test.com:345/path.html',
    ],
    [
      makeRequest({ username: 'john', password: 'secret' }),
      'https://john:secret@www.test.com/path.html',
    ],
    [
      makeRequest({
        url: '?order_id=123&shoe[color]=white&shoe[size]=40',
      }),
      'https://www.test.com/?order_id=123&shoe[color]=white&shoe[size]=40',
    ],
  ];

  test.each(testCases)(
    'formats the given request as expected',
    (request, expectedResult) => {
      const requestUrl = getRequestUrl(request);

      expect(requestUrl.href).toBe(expectedResult);
    }
  );
});
