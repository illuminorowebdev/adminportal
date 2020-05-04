import React from 'react';
import { makeStyles, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    backgroundColor: theme.palette.app.waiting,
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <CircularProgress size={30} />
    </div>
  );
};
