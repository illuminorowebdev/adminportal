import palette from 'theme/palette';

export default {
  root: {
    color: palette.app.primary,
  },
  colorPrimary: {
    color: palette.app.primary,
    '&$checked': {
      color: palette.app.primary,
    },
  },
};
