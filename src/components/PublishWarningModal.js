import React, { useState, useEffect, Fragment, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import PublishIcon from '@material-ui/icons/Publish';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { timestamp } from '../firebase/firebaseIndex';
import updateTest from '../APIHandlers/updateTest';
import addTest from '../APIHandlers/addTest';
import { firebaseAuth } from '../context/AuthProvider';

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
  imageOneUrl,
  imageTwoUrl,
  tags,
  question,
  docRef,
  setDocRef,
  imageOneRef,
  imageTwoRef,
}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = useState(false);
  const [complete, setComplete] = useState(false);
  const { userId } = useContext(firebaseAuth);

  useEffect(() => {
    if (tags.length > 0 && imageOneUrl && imageTwoUrl && question) {
      setComplete(true);
    } else {
      setComplete(false);
    }
  }, [imageOneUrl, imageTwoUrl, tags, question]);

  const handleOpen = () => {
    const createdAt = timestamp();
    if (complete) {
      if (docRef) {
        updateTest(
          imageOneUrl,
          imageTwoUrl,
          question,
          tags,
          docRef,
          createdAt,
          imageOneRef,
          imageTwoRef
        ).then(() => setOpen(true));
      } else {
        //if local test has no docId, it's because it's new and doesn't exist on the firestore.
        addTest(
          imageOneUrl,
          imageTwoUrl,
          question,
          createdAt,
          tags,
          imageOneRef,
          imageTwoRef,
          userId
        ).then((docRef) => {
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
        {(!imageOneUrl || !imageTwoUrl) && <li>select two images</li>}
        {!question && <li>enter a question</li>}
        {tags.length === 0 && <li>select at least one tag</li>}
      </ul>
      <div className='center'>
        <button onClick={handleClose}>ok</button>
      </div>
    </div>
  );

  return (
    <Fragment>
      <button className='tool-bar-btn' onClick={handleOpen}>
        {docRef ? <SaveOutlinedIcon /> : <PublishIcon />}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body}
      </Modal>
    </Fragment>
  );
}
