import React, { Fragment, Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { makeStyles, LinearProgress } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { loggedInSelector } from 'redux/selectors/auth';
import { appLoadingSelector } from 'redux/selectors/app';
import { GlobalLoader } from 'components';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
    width: '100vw',
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    '&::after': {
      background: 'url(/images/background.jpg)',
      backgroundSize: 'contain',
      opacity: 0.3,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      position: 'absolute',
      zIndex: -1,
      content: `''`,
    },
  },
}));

const AuthLayout = (props) => {
  const { route } = props;

  const classes = useStyles();

  const isLoggedIn = useSelector(loggedInSelector);
  const isLoading = useSelector(appLoadingSelector);

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <main className={classes.container}>
        <Suspense fallback={<LinearProgress />}>
          {renderRoutes(route.routes)}
        </Suspense>
        {isLoading && <GlobalLoader />}
      </main>
    </Fragment>
  );
};

AuthLayout.propTypes = {
  route: PropTypes.object,
};

export default AuthLayout;
