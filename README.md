# TinyHub

This is a local-first GitHub app, built in public.

<img width="1582" alt="image" src="https://github.com/user-attachments/assets/0f5cc3d0-58fc-491a-abe7-1593b143e3a2">

Follow the build:

- [Twitter](https://twitter.com/jamespearce/status/1789727909730455890)
- [Threads](https://www.threads.net/@jamesgpearce/post/C64P4g-v-3J)

## Try it out

There is an installation of TinyHub up at
[https://tinyhub.org](https://tinyhub.org). Enjoy!

## Running the client locally

Go into the directory:

```bash
cd client
```

Install dependencies:

```bash
bun install
```

Run in development mode:

```bash
bun run dev
```

## The server

The server is simply a proxy to assist in the GitHub OAuth flow and is already
deployed on `api.tinyhub.org`. If you want to run your own server instance (for
some reason) you will need to:

- Create a GtHub OAuth app
- Add its CLIENT_ID and CLIENT_SECRET as environment variables
- Change the server address at the top of the `client/auth.html` and
  `server/index.ts` files to match wherever you deploy it.

The `api.tinyhub.org` server is hosted on fly.io and so if you choose to use
that, you can reuse the docker and fly configurations in the server directory.
Just remember to update them to match your machines and required configuration.
Server deployment is then just `fly launch` (once) and then `fly deploy` (on
subsequent updates).

## Limitations

The app is a proof-of-concept for a local-first GitHub app. This means that
currently:

- The data is read-only
- It doesn't deal with complicated edge cases like repos changing ownership
- It doesn't paginate the GitHub API, so records max out at 100
- It doesn't work without logging in

## How it works

The app is in TypeScript, using React (for the UI) and TinyBase (for the state
and data store). The CSS is hand-crafted, so don't expect anything amazing on
the aesthetics unless you put up a welcome pull-request to improve it!

There are several TinyBase stores involved in the app. A store called
`UserStore` is populated with metadata about:

- Up to 100 repos starred by the user.
- Up to 100 repos owned by the user.
- Up to 100 repos for each of up to 100 orgs that the user is in.

There is a row per user, with fields like name, license, star count, description
etc - enough to populate the left hand navigation and the header at the top of
the repo page. This store is persisted to `localStorage`.

An instance of a store called `IssuesStore` exists for each repo, but only one
is paged into memory at a time, for the repo you are viewing. (They are all also
persisted to `localStorage`). For each issue, there is a title, and an HTML
body.

A store called `UiStore` is used to capture state about which repo and issue is
being viewed, the dark mode setting, and so on. `UserStore` stores the name and
avatar of the current logged in user. Those are also persisted to
`localStorage`.

Currently the data fetching from GitHub is pretty dumb - although stores are
persisted to `localStorage` (so things do work if you go offline mid-session), it
fetches new data every time a store is loaded. A polling/back-off mechanism
would be better.

As for the UI, the React components for each part of the app should be fairly
simple and self-explanatory.

Enjoy!
