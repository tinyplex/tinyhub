import {small} from 'tinywidgets/media';
import {style} from '@vanilla-extract/css';

export const logo = style({
  width: '2rem',
  height: '2rem',
});

export const button = style({
  ...small({
    display: 'none',
  }),
});
