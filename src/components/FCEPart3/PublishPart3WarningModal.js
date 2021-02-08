import React, { useState, useEffect, Fragment, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from 'components/common/Modal';
import PublishIcon from '@material-ui/icons/Publish';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { timestamp } from 'firebase/firebaseIndex';
import updateFCEPart3 from 'APIHandlers/updateFCEPart3';
import addFCEPart3 from 'APIHandlers/addFCEPart3';
import { firebaseAuth } from 'context/AuthProvider';
import { uploadFCEPart2Images } from 'APIHandlers/uploadImage';

export default function PublishWarningModal({
  bottomCentre,
  bottomLeft,
  bottomRight,
  creatorId,
  question,
  questionTwo,
  topLeft,
  topRight,
  tags,
  changesSaved,
  docRef,
}) {
  const [open, setOpen] = useState(false);
  const [complete, setComplete] = useState(false);
  const { userId } = useContext(firebaseAuth);

  // var history = useHistory();

  useEffect(() => {
    if (
      tags.length > 0 &&
      bottomCentre &&
      bottomLeft &&
      bottomRight &&
      creatorId &&
      question &&
      topLeft &&
      topRight
    ) {
      setComplete(true);
    } else {
      setComplete(false);
    }
  }, [
    bottomCentre,
    bottomLeft,
    bottomRight,
    creatorId,
    question,
    topLeft,
    topRight,
    tags.length,
  ]);

  const handleOpen = () => {
    setOpen(true);
    //const createdAt = timestamp();
    if (complete) {
      if (docRef) {
        //update fce part 3
        console.log('updating existing part 3');
      }
    } else {
      setOpen(true);
      //upload new Part 3
      console.log('updloading new part 3');
      addFCEPart3(
        bottomCentre,
        bottomLeft,
        bottomRight,
        creatorId,
        question,
        questionTwo,
        topLeft,
        topRight
      );
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div>
      <div>
        {complete ? (
          <h3>Published!</h3>
        ) : (
          <h3>
            Oops! You forgot to complete all the fields and add at least one
            tag!
          </h3>
        )}
      </div>
      <ul></ul>
      <div className='center'>
        <button onClick={handleClose}>ok</button>
      </div>
    </div>
  );

  return (
    <Fragment>
      <button
        className='tool-bar-btn'
        onClick={handleOpen}
        disabled={changesSaved}
      >
        {docRef ? <SaveOutlinedIcon /> : <PublishIcon />}
      </button>
      {open && (
        <Modal
          modalOpen={open}
          setModalOpen={handleClose}
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
          heading={'Saving'}
        >
          {body}
        </Modal>
      )}
    </Fragment>
  );
}
