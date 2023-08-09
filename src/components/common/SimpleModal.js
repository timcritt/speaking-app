import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import EasyCrop from '../EasyCrop/EasyCrop';

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



export default function SimpleModal({ modalButtonText, setImageUrl, modalButton }) {
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

  


  const ClickToOpenModal = () => {
    
    //can overide default button used to open the modal by passing element as props
    if (modalButton) {
      return React.cloneElement(modalButton, {onClick: handleOpen});
    }
    
    return (
      <button className='btn upload-btn' onClick={handleOpen}>
        upload
      </button>
    )
  
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <EasyCrop setImageUrl={setImageUrl} handleOpen={handleOpen}> </EasyCrop>
    </div>
  );

  return (
    <Fragment>
      <ClickToOpenModal/>
      <Modal
        open={open}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        onClose={handleClose}
      >
        {body}
      </Modal>
    </Fragment>
  );
}
