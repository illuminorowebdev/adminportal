import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Paper,
  TextField,
  IconButton,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Card,
  CardContent,
  InputAdornment,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Page, SubLoader, RemoveModal } from 'components';
import ToolBar from './ToolBar';
import useRouter from 'utils/useRouter';
import * as API from 'services/api';
import { NotificationManager } from 'react-notifications';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CreateIcon from '@material-ui/icons/Create';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  container: {},
  content: {
    position: 'relative',
    minHeight: 200,
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
  search: {
    minWidth: 400,
  },
  searchWrapper: {
    textAlign: 'right',
    marginBottom: theme.spacing(1),
  },
}));

const PER_PAGE = 10;

const Projects = () => {
  const classes = useStyles();
  const [data, setData] = useState({
    loading: true,
    projects: [],
    size: 0,
    word: '',
    currentPage: 1,
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
    loadProjects();
  }, []);

  useEffect(() => {
    loadProjects();
  }, [data.word, data.currentPage]);

  const loadProjects = () => {
    const params = {
      page: data.currentPage,
      perPage: PER_PAGE,
      word: data.word ? data.word : undefined,
    };
    API.listProjects(params)
      .then((res) => {
        setData((prevData) => ({
          ...prevData,
          loading: false,
          projects: res.projects,
          size: res.size,
        }));
      })
      .catch((err) => {
        setData((prevData) => ({
          ...prevData,
          loading: false,
          projects: [],
        }));
        NotificationManager.warning(err.message);
      });
  };

  const handleChangeWord = (event) => {
    event.persist();
    setData((prevData) => ({
      ...prevData,
      word: event.target.value,
      currentPage: 1,
    }));
  };

  const resetWord = () => {
    setData((prevData) => ({
      ...prevData,
      word: '',
      currentPage: 1,
    }));
  };

  const handleChangePage = (event, page) => {
    setData((prevData) => ({
      ...prevData,
      currentPage: page,
    }));
  };

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
      {modal.visible && (
        <RemoveModal
          visible={modal.visible}
          description="Do you really want to remove this project?"
          loading={modal.loading}
          onClose={toggleModal}
          onConfirm={deleteProject}
        />
      )}
      <Card>
        <CardContent className={classes.content}>
          <div className={classes.searchWrapper}>
            <TextField
              className={classes.search}
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton disabled={!data.word} onClick={resetWord}>
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={data.word}
              onChange={handleChangeWord}
            />
          </div>
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
                    <TableCell>
                      {new Date(project.createdAt).toLocaleDateString()}
                    </TableCell>
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
          <TablePagination
            rowsPerPage={PER_PAGE}
            component="div"
            rowsPerPageOptions={[10]}
            page={data.currentPage - 1}
            onChangePage={handleChangePage}
            count={Math.ceil(data.size / PER_PAGE)}
          />
          {data.loading && <SubLoader />}
        </CardContent>
      </Card>
    </Page>
  );
};

export default Projects;
