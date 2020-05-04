import React from 'react';
import clsx from 'classnames';
import PropTypes from 'prop-types';
import { makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'right',
    marginBottom: theme.spacing(1),
  },
}));

const ToolBar = ({ onNew, className }) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.container, className)}>
      <Button variant="contained" onClick={onNew}>
        New Project
      </Button>
    </div>
  );
};

ToolBar.propTypes = {
  onNew: PropTypes.func.isRequired,
  className: PropTypes.any,
};

export default ToolBar;
