import { getRequestUrl } from './getRequestUrl';

function makeExpressApp(port) {
  return {
    settings: {
      port,
    },
  };
}

describe('getRequestUrl', () => {
  const testCases = [
    [
      {
        protocol: 'https',
        hostname: 'www.tui.de:443',
        url: '/abcdef.html',
      },
      'https://www.tui.de/abcdef.html',
    ],
    [
      {
        protocol: 'https',
        hostname: 'www.tui.de',
        url: '/abcdef.html',
        app: makeExpressApp(443),
      },
      'https://www.tui.de/abcdef.html',
    ],
    [
      {
        protocol: 'https',
        hostname: 'www.tui.de:1234',
        url: '/abcdef.html',
      },
      'https://www.tui.de:1234/abcdef.html',
    ],
    [
      {
        protocol: 'https',
        username: 'john',
        password: 'secret',
        hostname: 'www.tui.de',
        url: '/abcdef.html',
        app: makeExpressApp(1234),
      },
      'https://john:secret@www.tui.de:1234/abcdef.html',
    ],
  ];

  test.each(testCases)(
    'formats the given request as expected',
    (request, expectedResult) => {
      expect(getRequestUrl(request)).toEqual(expectedResult);
    }
  );
});
