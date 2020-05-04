import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthLayout, HomeLayout } from 'layouts';

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/dashboard" />,
  },
  {
    path: '/auth',
    component: AuthLayout,
    routes: [
      {
        path: '/auth/login',
        exact: true,
        component: lazy(() => import('pages/Login')),
      },
      {
        component: () => <Redirect to="/auth/login" />,
      },
    ],
  },
  {
    path: '*',
    component: HomeLayout,
    routes: [
      {
        path: '/projects',
        exact: true,
        component: lazy(() => import('pages/Projects')),
      },
      {
        path: '/projects/create',
        exact: true,
        component: lazy(() => import('pages/Project')),
      },
      {
        path: '/projects/:id',
        exact: true,
        component: lazy(() => import('pages/Project')),
      },
      {
        path: '/settings',
        exact: true,
        component: lazy(() => import('pages/Settings')),
      },
      {
        component: () => <Redirect to="/projects" />,
      },
    ],
  },
];

export default routes;
