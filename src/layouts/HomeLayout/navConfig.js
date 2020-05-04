/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';

export default [
  {
    subheader: 'Dashboard',
    items: [
      {
        title: 'Projects',
        href: '/projects',
        icon: DashboardIcon,
      },
      {
        title: 'Settings',
        href: '/settings',
        icon: SettingsIcon,
      },
    ],
  },
];
