import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';
import { projectFirestore, timestamp } from '../firebase/firebaseIndex';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '250px',
    background: '#f4f7fd',
    border: '2px solid #e7764e',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '15px',
    outline: 'none',
    textAlign: 'left',
    color: 'rgb(215 67 67)',
  },
  complete: {
    background: '#f4f7fd',
    borderColor: 'green',
    color: 'green',
  },
}));

export default function PublishWarningModal({
  imageOne,
  imageTwo,
  tags,
  question,
  docRef,
  setDocRef,
}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (tags.length > 0 && imageOne && imageTwo && question) {
      setComplete(true);
    } else {
      setComplete(false);
    }
  }, [imageOne, imageTwo, tags, question]);

  const handleOpen = () => {
    const createdAt = timestamp();
    if (complete) {
      //docId exists locally - therefore overwrite in firestore
      if (docRef) {
        var objectRef = projectFirestore.collection('FCE Part 2').doc(docRef);
        objectRef
          .update({ imageOne, imageTwo, question, createdAt, tags })
          .then(() => setOpen(true));
      } else {
        //if local test has no docId, it's because it's new and doesn't exist on the firestore.
        const collectionRef = projectFirestore.collection('FCE Part 2');
        collectionRef
          .add({ imageOne, imageTwo, question, createdAt, tags })
          .then((docRef) => {
            setDocRef(docRef.id);
            setOpen(true);
          });
      }
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className={`${classes.paper} ${complete && classes.complete}`}>
      <div>
        {complete ? <h3>Published!</h3> : <h3>Oops! You forgot to:</h3>}
      </div>
      <ul>
        {(!imageOne || !imageTwo) && <li>select two images</li>}
        {!question && <li>enter a question</li>}
        {tags.length === 0 && <li>select at least one tag</li>}
      </ul>
      <div className='center'>
        <button onClick={handleClose}>ok</button>
      </div>
    </div>
  );

  return (
    <div>
      <Button
        variant='contained'
        size='small'
        color='primary'
        onClick={handleOpen}
        startIcon={<PublishIcon />}
      >
        {docRef ? 'save changes' : 'Publish'}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body}
      </Modal>
    </div>
  );
}
