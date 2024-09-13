import {accentHue} from 'tinywidgets/css';
import {globalStyle} from '@vanilla-extract/css';

globalStyle('*', {
  fontFamily: 'main',
});

globalStyle('html', {
  fontFamily: 'main',
});

globalStyle('pre,code', {
  fontFamily: 'mono',
});

globalStyle('#app', {
  vars: {
    [accentHue]: '325',
  },
});

globalStyle('p', {
  margin: '1rem 0',
});

globalStyle('ul,ol', {
  margin: '1rem 0 1rem 2rem',
});
