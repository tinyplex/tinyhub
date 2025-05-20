# How TinyHub Works

TinyHub is a local-first GitHub client. It runs at [tinyhub.org](https://tinyhub.org) and can be used by running the code in this repository. This document provides a high level description of how the app functions, with emphasis on the client portion of the project.

## Overview

The application is split into a small proxy server and a browser-based client. The server lives under `server/` and handles OAuth redirects. It exchanges the GitHub authorization code for an access token and passes that back to the client. All other interactions are performed directly from the client to GitHub using the token stored in the browser.

The client is found in `client/` and is written in TypeScript with React. State management and persistence are provided by [TinyBase](https://tinybase.org). Tasks for asynchronous fetching are coordinated with [TinyTick](https://github.com/tinyplex/tinytick). The build is produced by Vite and published to the `docs/` directory, which is served as the static site.

## Client Architecture

The entry point of the client is `src/index.tsx`. It simply renders the `App` component into the page. The React component tree lives under `src/App/` and is organised into small feature oriented folders. For example, `Repo` contains the repository view and `SideNav` contains the navigation components.

Application data is held in several TinyBase stores located in `src/stores/`:

- **UserStore** – information about the logged in user such as name and avatar.
- **ReposStore** – the list of repositories the user can browse. This combines starred repositories, owned repositories and repositories from the user's organisations. Data is indexed so the side navigation can be grouped and sorted.
- **RepoStore** – detailed information for the currently viewed repository.
- **IssuesStore** – issues for a single repository. Only one instance of this store is active at a time.
- **ViewStore** – the UI state, including which repository and issue are currently displayed. It persists to the URL hash so the page can be bookmarked or refreshed.
- **SettingsStore** – user interface preferences such as sort order.

Each store uses TinyBase persisters to save its content to `localStorage`. This allows the app to remain functional between sessions and when offline. The stores schedule tasks through TinyTick to fetch data from GitHub via Octokit. Long running or multi page requests (for example fetching all of a user's repositories) are split into tasks that can retry and back off when needed.

## Data Flow

When the user logs in, the access token is stored in `localStorage`. The stores detect the presence of the token and schedule fetch tasks. Repository metadata, issue lists and user details are retrieved from the GitHub API and written into the corresponding stores. Components subscribe to store values with hooks provided by TinyBase, ensuring the UI updates automatically as data arrives.

Because every store persists to `localStorage`, the application can load previously fetched data instantly on startup. TinyTick tasks run in the background to refresh the stores, marking stale rows and replacing them with updated values when the network is available.

## Notable Aspects

- **Local-first state** – Everything fetched from GitHub is written to local stores and persisted. The interface continues to work even if you go offline after the initial fetch.
- **Task based fetching** – All network requests are run as TinyTick tasks. This centralises error handling and lets the app stagger or retry requests.
- **URL driven navigation** – `ViewStore` keeps the currently selected repository and issue mirrored in the URL hash. Opening a repository creates a bookmarkable link without needing a full routing library.
- **Tiny and self contained** – Aside from OAuth, the client communicates directly with GitHub. There is no backend database or server logic beyond the authentication helper.

## Conclusion

TinyHub aims to demonstrate how a GitHub client can work entirely from the browser while persisting data locally. The codebase is intentionally small and focuses on clarity over features. Exploring the components in `client/src/App` and the stores in `client/src/stores` is the best way to understand the full flow from data fetching to rendering.
