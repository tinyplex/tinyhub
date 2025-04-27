import {style} from '@vanilla-extract/css';
import {colors} from 'tinywidgets/css';

export const footer = style({
  fontSize: '0.8em',
  color: colors.foregroundDim,
  borderRight: colors.border,
  height: '25px',
  marginRight: '0.5rem',
  lineHeight: '25px',
  paddingRight: '0.5rem',
  textAlign: 'right',
});
