import React, { Suspense, useState } from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';
import NavBar from './NavBar';
import TopBar from './TopBar';
import { loggedInSelector } from 'redux/selectors/auth';
import { useSelector, useDispatch } from 'react-redux';
import { refreshApp } from 'redux/actions/app';
import { GlobalLoader } from 'components';
import { appProfileSelector, appLoadingSelector } from 'redux/selectors/app';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    display: 'flex',
    '@media all and (-ms-high-contrast:none)': {
      height: 0, // IE11 fix
    },
  },
  content: {
    paddingTop: 64,
    flexGrow: 1,
    maxWidth: '100%',
    overflowX: 'hidden',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256,
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: 56,
    },
  },
}));

function HomeLayout({ route }) {
  const classes = useStyles();
  const [openNavBarMobile, setOpenNavBarMobile] = useState(false);

  const isLoggedIn = useSelector(loggedInSelector);
  const isLoading = useSelector(appLoadingSelector);
  const profile = useSelector(appProfileSelector);
  const dispatch = useDispatch();

  if (!isLoggedIn) {
    return <Redirect to="/auth/login" />;
  }

  if (profile === null) {
    dispatch(refreshApp());
    return <GlobalLoader />;
  }

  return (
    <>
      <TopBar onOpenNavBarMobile={() => setOpenNavBarMobile(true)} />
      <NavBar
        onMobileClose={() => setOpenNavBarMobile(false)}
        openMobile={openNavBarMobile}
      />
      <div className={classes.container}>
        <div className={classes.content}>
          <Suspense fallback={<LinearProgress />}>
            {renderRoutes(route.routes)}
          </Suspense>
        </div>
      </div>
      {isLoading && <GlobalLoader />}
    </>
  );
}

HomeLayout.propTypes = {
  route: PropTypes.object,
};

export default HomeLayout;
