import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import EasyCrop from '../EasyCrop/EasyCrop';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ImageContext from '../../context/ImageContext';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    display: 'inline-block',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ProfilePickerModal({ modalOpen }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <EasyCrop aspect={1}></EasyCrop>
    </div>
  );

  return (
    <div>
      <span className='btn change-profile-picker-btn' onClick={handleOpen}>
        change profile picture
      </span>
      <Modal
        open={open}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        onClose={handleClose}
      >
        {body}
      </Modal>
    </div>
  );
}
