import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Link,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  colors,
} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import bytesToSize from 'utils/bytesToSize';
import BackupIcon from '@material-ui/icons/Backup';

const useStyles = makeStyles((theme) => ({
  root: { border: `1px dashed ${theme.palette.divider}` },
  dropZone: {
    border: `1px dashed ${theme.palette.divider}`,
    padding: theme.spacing(6),
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: colors.grey[50],
      opacity: 0.5,
      cursor: 'pointer',
    },
  },
  dragActive: {
    backgroundColor: colors.grey[50],
    opacity: 0.5,
  },
  info: {
    marginTop: theme.spacing(1),
  },
  list: {
    maxHeight: 320,
  },
  actions: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  icon: {
    marginRight: theme.spacing(5),
    color: theme.palette.app.primary,
    width: 40,
    height: 40,
  },
}));

function FileDropzone({ className, file, setFile, acceptRule, ...rest }) {
  const classes = useStyles();

  const handleDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const handleRemove = () => {
    setFile(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: acceptRule,
    multiple: false,
  });

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      {file === null && (
        <div
          className={clsx({
            [classes.dropZone]: true,
            [classes.dragActive]: isDragActive,
          })}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <div>
            <BackupIcon className={classes.icon} />
          </div>
          <div>
            <Typography gutterBottom variant="h3">
              Select file
            </Typography>
            <Typography
              className={classes.info}
              color="textSecondary"
              variant="body1"
            >
              Drop file here or click <Link underline="always">browse</Link>{' '}
              thorough your machine
            </Typography>
          </div>
        </div>
      )}
      {file !== null && (
        <>
          <ListItem>
            <ListItemIcon>
              <FileCopyIcon />
            </ListItemIcon>
            <ListItemText
              primary={file.name}
              primaryTypographyProps={{ variant: 'h5' }}
              secondary={bytesToSize(file.size)}
            />
          </ListItem>

          <div className={classes.actions}>
            <Button onClick={handleRemove} size="small">
              Remove
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

FileDropzone.propTypes = {
  className: PropTypes.string,
};

export default FileDropzone;
