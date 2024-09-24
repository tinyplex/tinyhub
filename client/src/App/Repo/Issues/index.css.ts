import {screens} from 'tinywidgets/css';
import {style} from '@vanilla-extract/css';

export const issueList = style({
  overflowX: 'scroll',
  height: 'calc(100dvh - 10rem)',
  '@media': {
    [`screen and (max-width: ${screens.large}px)`]: {
      height: 'calc(30dvh - 5rem)',
    },
  },
});

export const issue = style({
  paddingLeft: '1rem',
  overflow: 'scroll',
  height: 'calc(100dvh - 10rem)',
  '@media': {
    [`screen and (max-width: ${screens.large}px)`]: {
      height: 'calc(70dvh - 6rem)',
    },
  },
});
