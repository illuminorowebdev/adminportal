import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Paper,
  TextField,
  Button,
  IconButton,
  Typography,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Page, SubLoader, RemoveModal } from 'components';
import ToolBar from './ToolBar';
import useRouter from 'utils/useRouter';
import * as API from 'services/api';
import { NotificationManager } from 'react-notifications';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CreateIcon from '@material-ui/icons/Create';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {},
  content: {
    position: 'relative',
    minHeight: 300,
  },
  description: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: 300,
    overflow: 'hidden',
  },
  actions: {
    padding: `0 ${theme.spacing(2)}px`,
    '& > * + *': {
      marginLeft: theme.spacing(0.5),
    },
  },
  removeIcon: {
    color: theme.palette.app.danger,
    cursor: 'pointer',
  },
  editIcon: {
    color: theme.palette.app.secondary,
    cursor: 'pointer',
  },
}));

const PER_PAGE = 30;

const Projects = () => {
  const classes = useStyles();
  const [data, setData] = useState({
    loading: true,
    projects: [],
  });
  const [modal, setModal] = useState({
    visible: false,
    id: null,
    loading: false,
  });

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // load
    const params = {
      page: 1,
      perPage: PER_PAGE,
    };
    API.listProjects(params)
      .then((res) => {
        setData({
          loading: false,
          projects: res,
        });
      })
      .catch((err) => {
        setData({
          loading: false,
          projects: [],
        });
        NotificationManager.warning(err.message);
      });
  }, []);

  const onNew = () => {
    router.history.push('/projects/create');
  };

  const editProject = (project) => {
    window.open(`/projects/${project.id}`, '_blank');
  };

  const deleteProject = () => {
    setModal((prevModal) => ({
      ...prevModal,
      loading: true,
    }));
    const projectId = modal.id;
    API.removeProduct(projectId)
      .then(() => {
        NotificationManager.success('Project is removed successfully');
        toggleModal();
        setData((prevData) => ({
          ...prevData,
          projects: prevData.projects.filter((e) => e.id !== projectId),
        }));
      })
      .catch((err) => {
        NotificationManager.warning(err.message);
      });
  };

  const onDelete = (project) => {
    setModal({
      visible: true,
      id: project.id,
      loading: false,
    });
  };

  const toggleModal = () => {
    setModal({
      visible: false,
    });
  };

  return (
    <Page className={classes.container} title="Projects">
      <ToolBar onNew={onNew} />
      <Divider />
      <div className={classes.content}>
        {modal.visible && (
          <RemoveModal
            visible={modal.visible}
            description="Do you really want to remove this project?"
            loading={modal.loading}
            onClose={toggleModal}
            onConfirm={deleteProject}
          />
        )}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.projects.map((project, index) => (
                <TableRow key={project.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{project.title}</TableCell>
                  <TableCell className={classes.description}>
                    {project.description}
                  </TableCell>
                  <TableCell>{project.createdAt}</TableCell>
                  <TableCell className={classes.actions}>
                    <IconButton onClick={() => onDelete(project)}>
                      <DeleteForeverIcon className={classes.removeIcon} />
                    </IconButton>
                    <IconButton onClick={() => editProject(project)}>
                      <CreateIcon className={classes.editIcon} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {data.loading && <SubLoader />}
      </div>
    </Page>
  );
};

export default Projects;
