import {serve} from 'bun';

const SERVER = 'https://api.tinyhub.org';

const CLIENT_ID = process.env.CLIENT_ID ?? '';
const CLIENT_SECRET = process.env.CLIENT_SECRET ?? '';

const redirect = (location: string) =>
  new Response('', {status: 302, headers: {location}});

serve({
  fetch: async (request: Request) => {
    const params = new URLSearchParams(new URL(request.url).searchParams);
    const error = params.get('error');
    const client = params.get('client');
    const step = params.get('step');
    const state = params.get('state');

    if (!error && client && step && state) {
      switch (step) {
        case '0': {
          return redirect(
            'https://github.com/login/oauth/authorize?' +
              new URLSearchParams({
                client_id: CLIENT_ID,
                state,
                redirect_uri:
                  SERVER +
                  '?' +
                  new URLSearchParams({step: '1', client}).toString(),
              }).toString(),
          );
        }
        case '1': {
          const code = params.get('code');
          if (code) {
            const {access_token: token} = (await (
              await fetch(
                'https://github.com/login/oauth/access_token/?' +
                  new URLSearchParams({
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    code,
                  }).toString(),
                {
                  method: 'POST',
                  headers: {
                    'user-agent': 'TinyHub',
                    accept: 'application/vnd.github+json',
                  },
                },
              )
            ).json()) as any;
            const clientUrl = new URL(client);
            clientUrl.searchParams.set('token', token);
            clientUrl.searchParams.set('state', state);
            return redirect(clientUrl.toString());
          }
        }
      }
    }
    return new Response(error ?? 'error', {status: 400});
  },
  port: 8000,
});
