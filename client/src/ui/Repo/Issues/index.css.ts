import {large} from 'tinywidgets/media';
import {style} from '@vanilla-extract/css';
import {theme} from 'tinywidgets/css';

export const issues = style([
  {
    display: 'grid',
    gap: '1rem',
    height: 'calc(100vh - 8.5rem)',
    gridTemplateColumns: '1fr',
  },
  large({
    gridTemplateColumns: '1fr 1fr 1fr',
  }),
]);

export const issueList = style([
  {
    overflowX: 'hidden',
    height: 'calc(30vh - 5rem)',
  },
  large({
    height: '100%',
    gridColumn: '1 /2',
  }),
]);

export const issue = style([
  {
    paddingLeft: '1rem',
    borderLeft: `1px solid ${theme.border}`,
    overflow: 'auto',
    height: 'calc(70vh - 6.5rem)',
  },
  large({
    gridColumn: '2 / 4',
    height: '100%',
  }),
]);
