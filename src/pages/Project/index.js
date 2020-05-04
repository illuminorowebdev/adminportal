import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  FormGroup,
  FormHelperText,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Page, FileDropzone } from 'components';
import useRouter from 'utils/useRouter';
import validate from 'validate.js';
import { setLoading } from 'redux/actions/app';
import { NotificationManager } from 'react-notifications';
import * as API from 'services/api';

const useStyles = makeStyles((theme) => ({
  container: {},
  field: {
    marginBottom: theme.spacing(1.5),
  },
  status: {
    margin: `${theme.spacing(1.5)}px 0`,
  },
  asset: {
    display: 'block',
  },
}));

const schema = {
  title: {
    presence: { allowEmpty: false, message: 'is required' },
    length: (value) => {
      if (value) {
        if (value.length < 3) return { minimum: 3 };
      }
      return false;
    },
  },
  description: {
    presence: { allowEmpty: false, message: 'is required' },
    length: (value) => {
      if (value) {
        if (value.length < 10) return { minimum: 10 };
      }
      return false;
    },
  },
};

const Project = () => {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      title: '',
      description: '',
      thumbnail: null,
      video: null,
      source: null,
      changed: false,
    },
    touched: {},
    errors: {},
  });
  const [isCreate, setIsCreate] = useState(true);
  const [projectId, setProjectId] = useState('');

  const [status, setStatus] = useState('');

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const { id } = router.match.params;
    if (id) {
      // update
      setIsCreate(false);
      setProjectId(id);
      // load project info
      dispatch(setLoading(true));
      API.getProject(id)
        .then(({ id, userId, ...projectData }) => {
          dispatch(setLoading(false));
          setFormState((prevFormState) => ({
            ...prevFormState,
            values: { ...projectData, changed: false },
          }));
        })
        .catch((err) => {
          dispatch(setLoading(false));
          NotificationManager.warning(err.message);
          router.history.push('/projects');
        });
    } else {
      // create
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const keys = ['thumbnail', 'video', 'source'];
    const payload = [];

    keys.forEach((key) => {
      const fileValue = formState.values[key];
      if (fileValue !== null && typeof fileValue !== 'string') {
        payload.push({
          name: fileValue.name,
          type: fileValue.type,
          public: key !== 'source',
        });
      }
    });

    const projectPayload = {
      title: formState.values.title,
      description: formState.values.description,
    };

    try {
      dispatch(setLoading(true));

      // get aws s3 presigned urls for uploading files
      setStatus('Getting Presigned Urls');
      const presignedUrls = await API.createProjectPresignedUrls({
        data: payload,
      });
      // upload files
      for (let index = 0; index < keys.length; index += 1) {
        const key = keys[index];
        const fileValue = formState.values[key];
        if (fileValue !== null && typeof fileValue !== 'string') {
          // upload
          projectPayload[key] = presignedUrls[index].fields.key;
          setStatus(`Uploading ${fileValue.name} ...`);
          await API.uploadFileToS3(presignedUrls[index], fileValue);
        }
      }
      //

      // create or update project
      if (isCreate) {
        // create
        setStatus('Creating Project ...');
        await API.createProject(projectPayload);
        setStatus('');
        dispatch(setLoading(false));
        NotificationManager.success('Project is created successfully!');
        router.history.push('/projects');
      } else {
        // update
        setStatus('Updating Project ...');
        await API.updateProduct(projectId, projectPayload);
        setStatus('');
        dispatch(setLoading(false));
        NotificationManager.success('Project is updated successfully!');
        router.history.push('/projects');
      }
    } catch (error) {
      NotificationManager.warning(error.message);
      dispatch(setLoading(false));
      setStatus('');
    }
  };

  const fieldChange = (event) => {
    event.persist();
    setFormState((prevFormState) => ({
      ...prevFormState,
      values: {
        ...prevFormState.values,
        [event.target.name]: event.target.value,
        changed: true,
      },
      touched: {
        ...prevFormState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const fileChange = (key) => (file) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      values: {
        ...prevFormState.values,
        [key]: file,
        changed: true,
      },
      touched: {
        ...prevFormState.touched,
        [key]: true,
      },
    }));
  };

  const downloadSource = (key) => {
    dispatch(setLoading(true));
    API.createPublicSignedUrls({
      data: [key],
    })
      .then((res) => {
        dispatch(setLoading(false));
        window.open(res[0]);
      })
      .catch((err) => {
        NotificationManager.warning(err.message);
        dispatch(setLoading(false));
      });
  };

  const hasError = (field) =>
    !!(formState.touched[field] && formState.errors[field]);

  useEffect(() => {
    let errors = validate(formState.values, schema);

    if (formState.values.thumbnail === null) {
      errors = { ...errors, thumbnail: ['Please select thumbnail of video'] };
    }
    if (formState.values.video === null) {
      errors = { ...errors, video: ['Please select video'] };
    }
    if (formState.values.source === null) {
      errors = {
        ...errors,
        source: ['Please compress your source code and select zip file'],
      };
    }

    setFormState((prevFormState) => ({
      ...prevFormState,
      isValid: !errors,
      errors: errors || {},
    }));
  }, [formState.values]);

  return (
    <Page
      className={classes.container}
      title={`${isCreate ? 'New' : 'Update'} Project`}
    >
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              name="title"
              value={formState.values.title}
              onChange={fieldChange}
              fullWidth
              label="Title"
              className={classes.field}
              error={hasError('title')}
              helperText={hasError('title') ? formState.errors.title : null}
            />
            <TextField
              variant="outlined"
              name="description"
              value={formState.values.description}
              onChange={fieldChange}
              fullWidth
              label="Description"
              className={classes.field}
              error={hasError('description')}
              helperText={
                hasError('description') ? formState.errors.description : null
              }
              multiline
              rows={5}
            />
            <FormControl
              fullWidth
              className={classes.field}
              error={hasError('thumbnail')}
            >
              <FormLabel component="legend">Video Thumbnail</FormLabel>
              <FormGroup className={classes.asset}>
                <FileDropzone
                  acceptRule="image/*"
                  file={formState.values.thumbnail}
                  setFile={fileChange('thumbnail')}
                />
              </FormGroup>
              {hasError('thumbnail') && (
                <FormHelperText>{formState.errors.thumbnail[0]}</FormHelperText>
              )}
            </FormControl>
            <FormControl
              fullWidth
              className={classes.field}
              error={hasError('video')}
            >
              <FormLabel component="legend">Video (*.mp4 only)</FormLabel>
              <FormGroup className={classes.asset}>
                <FileDropzone
                  acceptRule="video/mp4"
                  file={formState.values.video}
                  setFile={fileChange('video')}
                />
              </FormGroup>
              {hasError('video') && (
                <FormHelperText>{formState.errors.video[0]}</FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              className={classes.field}
              error={hasError('source')}
            >
              <FormLabel component="legend">
                Source Code (*.rar, *.zip only)
              </FormLabel>
              <FormGroup className={classes.asset}>
                <FileDropzone
                  acceptRule=".zip,.rar"
                  file={formState.values.source}
                  setFile={fileChange('source')}
                  downloadSource={downloadSource}
                />
              </FormGroup>
              {hasError('source') && (
                <FormHelperText>{formState.errors.source[0]}</FormHelperText>
              )}
            </FormControl>

            {status !== '' && (
              <Typography className={classes.status}>{status}</Typography>
            )}

            <Button
              fullWidth
              variant="contained"
              type="submit"
              size="large"
              disabled={
                isCreate
                  ? !formState.isValid
                  : !formState.isValid || !formState.values.changed
              }
            >
              {isCreate ? 'Create' : 'Update'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Page>
  );
};

export default Project;
