import {large} from 'tinywidgets/utils';
import {style} from '@vanilla-extract/css';

export const repoHeader = style([
  {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1rem',
  },
  large({
    gridTemplateColumns: '1fr 1fr 1fr',
  }),
]);

export const repoHeaderSummary = style(
  large({
    gridColumn: '1 / 3',
  }),
);
