import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Paper,
  TextField,
  Button,
  IconButton,
  Typography,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Logo } from 'components';
import { updateAuth, login } from 'redux/actions/auth';
import { authSelector } from 'redux/selectors/auth';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 500,
    textAlign: 'center',
    width: '50%',
    backgroundColor: theme.palette.background.default,
  },
  paper: {
    padding: theme.spacing(2.5),
    overflow: 'auto',
    backgroundColor: 'unset',
  },
  logo: {
    margin: `${theme.spacing(5)}px 0`,
  },
  field: {
    marginBottom: theme.spacing(2),
  },
  passwordContainer: {
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    right: 0,
  },
}));

const Login = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const dispatch = useDispatch();
  const { errorMessage } = useSelector(authSelector);

  useEffect(() => {
    dispatch(
      updateAuth({
        errorMessage: '',
      })
    );
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(login(formData));
  };

  const onFieldChange = (event) => {
    if (event.persist) {
      event.persist();
    }
    setFormData((formData) => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  };

  const toggleShowPassword = () => {
    setFormData((formData) => ({
      ...formData,
      showPassword: !formData.showPassword,
    }));
  };

  return (
    <div className={classes.container}>
      <Paper className={classes.paper} elevation={3} square>
        <Logo className={classes.logo} />
        <form onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            fullWidth
            label="Email"
            className={classes.field}
            name="email"
            value={formData.email}
            onChange={onFieldChange}
          />
          <div className={classes.passwordContainer}>
            <TextField
              variant="outlined"
              name="password"
              fullWidth
              label="Password"
              type={formData.showPassword ? 'text' : 'password'}
              className={classes.field}
              value={formData.password}
              onChange={onFieldChange}
            />
            <IconButton className={classes.icon} onClick={toggleShowPassword}>
              {formData.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>

          {errorMessage !== '' && (
            <Typography paragraph color="error">
              {errorMessage}
            </Typography>
          )}

          <Button variant="contained" fullWidth type="submit">
            Sign In
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
