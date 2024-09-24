import {colors, dimensions} from 'tinywidgets/css';
import {globalStyle} from '@vanilla-extract/css';

globalStyle('pre', {
  padding: dimensions.padding,
  borderRadius: dimensions.radius,
  background: colors.background2,
  border: colors.border,
  lineHeight: '1.25rem',
  overflowX: 'auto',
});
