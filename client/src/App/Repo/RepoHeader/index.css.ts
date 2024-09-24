import {dimensions} from 'tinywidgets/css';
import {style} from '@vanilla-extract/css';

export const summary = style({
  display: 'flex',
  gap: dimensions.padding,
  alignSelf: 'baseline',
});

export const image = style({
  placeSelf: 'center',
  maxWidth: '6rem',
  borderRadius: '50%',
  alignSelf: 'start',
});

export const tags = style({
  display: 'flex',
  gap: dimensions.padding,
});
