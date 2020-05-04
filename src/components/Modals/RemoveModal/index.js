import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'classnames';

import {
  makeStyles,
  Divider,
  Button,
  Modal,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  colors,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { SubLoader } from 'components';

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    boxShadow: theme.shadows[20],
    width: 700,
    maxHeight: '100%',
    overflowY: 'auto',
    maxWidth: '100%',
  },
  field: {
    marginBottom: theme.spacing(1),
  },
  closeIcon: {
    position: 'absolute',
    right: theme.spacing(3),
    cursor: 'pointer',
    width: theme.spacing(3),
    height: theme.spacing(3),

    color: colors.blueGrey[900],

    '&:hover': {
      opacity: 0.5,
    },
  },
  actions: {
    flexDirection: 'row-reverse',
  },
  header: {
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    width: theme.spacing(2.1),
    height: theme.spacing(2.1),
    marginRight: theme.spacing(1),

    fill: 'white',
    '& path': {
      fill: 'white',
    },
  },
  iconRemove: {
    marginRight: 0,
    fill: colors.blueGrey[900],
    '& path': {
      fill: colors.blueGrey[900],
    },
  },
}));

const RemoveModal = ({ visible, onConfirm, onClose, description, loading }) => {
  const classes = useStyles();
  return (
    <Modal open={visible} onClose={onClose}>
      <Card className={classes.modal}>
        {loading && <SubLoader />}
        <CardHeader
          component={() => (
            <div className={classes.header}>
              <Typography variant="h5">Remove</Typography>
              <CancelIcon className={classes.closeIcon} onClick={onClose} />
            </div>
          )}
        />
        <Divider />
        <CardContent>
          <Typography>{description}</Typography>
        </CardContent>
        <Divider />
        <CardActions className={classes.actions}>
          <Button variant="contained" onClick={onConfirm}>
            Confirm
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
};

RemoveModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
};

export default RemoveModal;
