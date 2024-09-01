import {style} from '@vanilla-extract/css';
import {theme} from 'tinywidgets/css';

export const logo = style({
  width: '2rem',
  height: '2rem',
});

export const info = style({
  top: '-0.5rem',
  left: '-0.75rem',
  position: 'relative',
  selectors: {
    '&::before': {
      display: 'inline-block',
      width: '.8rem',
      height: '.8rem',
      lineHeight: '0.8rem',
      textAlign: 'center',
      fontSize: '0.7rem',
      fontWeight: 'bold',
      borderRadius: '50%',
      backgroundColor: theme.foreground2,
      color: theme.background,
      content: '?',
    },
  },
});
