import {accent, accentContrast} from '../../../tinywidgets/src/index.css';
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
    [accent]: 'rgb(113,19,120)',
    [accentContrast]: '#fff',
  },
});

globalStyle('p', {
  margin: '1rem 0',
});

globalStyle('ul,ol', {
  margin: '1rem 0 1rem 2rem',
});
