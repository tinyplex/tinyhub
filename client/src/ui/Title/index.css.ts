import {small} from 'tinywidgets/utils';
import {style} from '@vanilla-extract/css';

export const logo = style({
  width: '2rem',
  height: '2rem',
  transition: 'transform 1s',
  transform: 'rotate(0deg)',
});

export const spinning = style({
  transition: 'transform 3s',
  transform: 'rotate(360deg)',
});

export const button = style({
  ...small({
    display: 'none',
  }),
});
