import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Paper,
  TextField,
  Button,
  IconButton,
  Typography,
  Divider,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Page } from 'components';
import ToolBar from './ToolBar';
import useRouter from 'utils/useRouter';

const useStyles = makeStyles((theme) => ({
  container: {},
}));

const Projects = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const router = useRouter();

  const onNew = () => {
    router.history.push('/projects/create');
  };

  return (
    <Page className={classes.container} title="Projects">
      <ToolBar onNew={onNew} />
      <Divider />
    </Page>
  );
};

export default Projects;
