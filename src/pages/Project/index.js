import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Paper,
  TextField,
  Button,
  IconButton,
  Typography,
  Divider,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  FormGroup,
  FormHelperText,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Page, FileDropzone } from 'components';
import useRouter from 'utils/useRouter';
import validate from 'validate.js';

const useStyles = makeStyles((theme) => ({
  container: {},
  field: {
    marginBottom: theme.spacing(1.5),
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
      sourceCode: null,
    },
    touched: {},
    errors: {},
  });
  const [isCreate, setIsCreate] = useState(true);
  const [projectId, setProjectId] = useState('');

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const { id } = router.match.params;
    if (id) {
      // update
      setIsCreate(false);
      setProjectId(id);
      // load project info
    } else {
      // create
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const fieldChange = (event) => {
    event.persist();
    setFormState((prevFormState) => ({
      ...prevFormState,
      values: {
        ...prevFormState.values,
        [event.target.name]: event.target.value,
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
      },
      touched: {
        ...prevFormState.touched,
        [key]: true,
      },
    }));
  };

  const hasError = (field) =>
    !!(formState.touched[field] && formState.errors[field]);

  useEffect(() => {
    let errors = validate(formState.values, schema);

    if (formState.values.thumbnail === null) {
      errors.thumbnail = ['Please select thumbnail of video'];
    }
    if (formState.values.video === null) {
      errors.video = ['Please select video'];
    }
    if (formState.values.sourceCode === null) {
      errors.sourceCode = [
        'Please compress your source code and select zip file',
      ];
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
              value={formState.title}
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
              value={formState.description}
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
              <FormGroup>
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
              <FormGroup>
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
              error={hasError('sourceCode')}
            >
              <FormLabel component="legend">
                Source Code (*.rar, *.zip only)
              </FormLabel>
              <FormGroup>
                <FileDropzone
                  acceptRule=".zip,.rar"
                  file={formState.values.sourceCode}
                  setFile={fileChange('sourceCode')}
                />
              </FormGroup>
              {hasError('sourceCode') && (
                <FormHelperText>
                  {formState.errors.sourceCode[0]}
                </FormHelperText>
              )}
            </FormControl>

            <Button
              fullWidth
              variant="contained"
              type="submit"
              size="large"
              disabled={!formState.isValid}
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
