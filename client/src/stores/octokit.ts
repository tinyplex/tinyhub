import {Octokit} from 'octokit';

const PER_PAGE = 5;

const LINK_REGEX = /<([^>]+)>/;

export type HeadersWithLink = {link?: string};

export const octokit = new Octokit({auth: localStorage.getItem('token')});

export const hasToken = () => localStorage.getItem('token') != null;

export const getNextPage = (response: {
  headers: HeadersWithLink;
}): string | undefined => {
  const linkHeader = response.headers?.link;
  if (linkHeader) {
    const nextLink = linkHeader
      .split(',')
      .find((link) => link.endsWith('rel="next"'));
    if (nextLink) {
      const [, url] = nextLink.match(LINK_REGEX) ?? [];
      if (url) {
        const nextPage = new URL(url).searchParams.get('page');
        if (nextPage) {
          return nextPage;
        }
      }
    }
  }
};

export const getPageOptions = (pageString?: string) => {
  const page = parseInt(pageString ?? '');
  return {
    per_page: PER_PAGE,
    ...(isNaN(page) ? {} : {page}),
  };
};
