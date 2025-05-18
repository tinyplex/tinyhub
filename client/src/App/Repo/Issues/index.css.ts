import {style} from '@vanilla-extract/css';
import {dimensions, screens} from 'tinywidgets/css';

export const issueList = style({
  overflowX: 'scroll',
  height: 'calc(100dvh - 12rem)',
  margin: '0 -1rem',
  '@media': {
    [`screen and (max-width: ${screens.large}px)`]: {
      height: 'calc(30dvh - 6rem)',
    },
  },
});

export const issue = style({
  paddingLeft: dimensions.padding,
  overflow: 'scroll',
  height: 'calc(100dvh - 12rem)',
  '@media': {
    [`screen and (max-width: ${screens.large}px)`]: {
      height: 'calc(70dvh - 7rem)',
    },
  },
});
