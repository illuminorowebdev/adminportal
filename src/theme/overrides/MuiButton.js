import palette from 'theme/palette';

export default {
  contained: {
    boxShadow:
      '0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20)',
    fill: '#000',
    backgroundColor: palette.app.primary,
    color: '#FFF',
    minWidth: 105,
    '&:hover': {
      color: '#FFFFFF',
      backgroundColor: palette.app.secondary,
      fill: '#FFFFFF',
    },
    '&$disabled': {
      fill: 'rgba(0, 0, 0, 0.26)',
    },
  },
  outlined: {
    color: palette.app.primary,
    borderColor: palette.app.primary,
  },
};
