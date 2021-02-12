import React, { useState, useEffect, Fragment, useContext } from 'react';
import Modal from 'components/common/Modal';
import PublishIcon from '@material-ui/icons/Publish';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { timestamp } from 'firebase/firebaseIndex';
import updateFCEPart3 from 'APIHandlers/updateFCEPart3';
import addFCEPart3 from 'APIHandlers/addFCEPart3';
import { firebaseAuth } from 'context/AuthProvider';
import { useHistory } from 'react-router-dom';

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
  setDocRef,
}) {
  const [open, setOpen] = useState(false);
  const [complete, setComplete] = useState(false);
  const { userId } = useContext(firebaseAuth);
  const history = useHistory();

  // var history = useHistory();

  useEffect(() => {
    if (
      tags.length > 0 &&
      bottomCentre &&
      bottomLeft &&
      bottomRight &&
      question &&
      topLeft &&
      topRight &&
      userId
    ) {
      setComplete(true);
    } else {
      setComplete(false);
    }
  }, [
    tags.length,
    bottomCentre,
    bottomLeft,
    bottomRight,
    question,
    topLeft,
    topRight,
    userId,
  ]);

  const handleOpen = () => {
    setOpen(true);
    //const createdAt = timestamp();
    if (complete) {
      if (docRef) {
        //update fce part 3
        console.log('updating existing part 3');
        updateFCEPart3(
          bottomCentre,
          bottomLeft,
          bottomRight,
          question,
          questionTwo,
          topLeft,
          topRight,
          docRef,
          tags
        );
      } else {
        //upload new Part 3 - only reached if all fields are complete and docRef doesn't exist - i.e., the test has just been created
        console.log('updloading new part 3');
        addFCEPart3(
          bottomCentre,
          bottomLeft,
          bottomRight,
          userId,
          question,
          questionTwo,
          topLeft,
          topRight,
          tags
        ).then((data) => {
          setDocRef(data.id);
          // history.push(`/FCEPart3/${docRef.id}`);
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
