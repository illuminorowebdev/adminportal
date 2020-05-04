import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Paper,
  TextField,
  Button,
  IconButton,
  Typography,
  Card,
  CardContent,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Page } from 'components';
import validate from 'validate.js';
import { setLoading } from 'redux/actions/app';
import * as API from 'services/api';
import { NotificationManager } from 'react-notifications';

const schema = {
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: (value) => {
      if (value) {
        if (value.length < 6) return { minimum: 6 };
      }
      return false;
    },
  },
  passwordConfirm: {
    presence: { allowEmpty: false, message: 'is required' },
    length: (value) => {
      if (value) {
        if (value.length < 6) return { minimum: 6 };
      }
      return false;
    },
  },
};

const useStyles = makeStyles((theme) => ({
  container: {},
  button: {
    marginTop: theme.spacing(2),
  },
  field: {
    marginBottom: theme.spacing(2),
  },
}));

const Settings = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  const handleChange = (event) => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setLoading(true));
    API.updateProfile({
      password: formState.values.password,
    })
      .then((res) => {
        dispatch(setLoading(false));
        NotificationManager.success('Password is updated successfully');
        setFormState({ isValid: false, values: {}, touched: {}, errors: {} });
      })
      .catch((err) => {
        dispatch(setLoading(false));
        NotificationManager.warning(err.message);
      });
  };

  const hasError = (field) =>
    !!(formState.touched[field] && formState.errors[field]);

  useEffect(() => {
    let errors = validate(formState.values, schema);
    if (formState.values.passwordConfirm || formState.values.password) {
      const s1 = String(formState.values.passwordConfirm);
      const s2 = String(formState.values.password);
      if (s1 !== s2) {
        errors.passwordConfirm = ['Please confirm new password correctly!'];
      }
    }
    setFormState((prevFormState) => ({
      ...prevFormState,
      isValid: !errors,
      errors: errors || {},
    }));
  }, [formState.values]);

  return (
    <Page className={classes.container} title="Settings">
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Typography paragraph>Change Password</Typography>
            <TextField
              label="New Password"
              fullWidth
              type="password"
              error={hasError('password')}
              helperText={
                hasError('password') ? formState.errors.password[0] : null
              }
              name="password"
              value={formState.values.password || ''}
              variant="outlined"
              onChange={handleChange}
              className={classes.field}
            />
            <TextField
              label="Confirm Password"
              fullWidth
              type="password"
              error={hasError('passwordConfirm')}
              helperText={
                hasError('passwordConfirm')
                  ? formState.errors.passwordConfirm[0]
                  : null
              }
              name="passwordConfirm"
              value={formState.values.passwordConfirm || ''}
              variant="outlined"
              onChange={handleChange}
              className={classes.field}
            />
            <Button
              type="submit"
              size="large"
              fullWidth
              variant="contained"
              disabled={!formState.isValid}
              className={classes.button}
            >
              Update
            </Button>
          </form>
        </CardContent>
      </Card>
    </Page>
  );
};

export default Settings;
