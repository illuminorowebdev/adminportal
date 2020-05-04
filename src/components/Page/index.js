/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import clsx from 'classnames';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const {
  NODE_ENV,
  REACT_APP_GA_MEASUREMENT_ID: GA_MEASUREMENT_ID,
} = process.env;

function Page({ title, children, className, ...rest }) {
  const location = useLocation();
  const classes = useStyles();

  useEffect(() => {
    if (NODE_ENV !== 'production') {
      return;
    }

    if (window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname,
        page_name: title,
      });
    }

    // eslint-disable-next-line
  }, []);

  return (
    <div className={clsx(classes.container, className)} {...rest}>
      <Typography paragraph variant="h3">
        {title}
      </Typography>
      {children}
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default Page;
