import React, { useState, useEffect, Fragment, useContext } from 'react';
import Modal from 'components/common/Modal';
import PublishIcon from '@material-ui/icons/Publish';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import updatePart3 from 'APIHandlers/updatePart3';
import addPart3 from 'APIHandlers/addPart3';
import { firebaseAuth } from 'context/AuthProvider';
import { useHistory } from 'react-router-dom';

export default function PublishWarningModal({
  bottomCentre,
  bottomLeft,
  bottomRight,
  creatorId,
  questionOne,
  shortTurnQuestion,
  topLeft,
  topRight,
  tags,
  changesSaved,
  docRef,
  setDocRef,
  testType,
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
      questionOne &&
      shortTurnQuestion &&
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
    questionOne,
    topLeft,
    topRight,
    userId,
    shortTurnQuestion,
  ]);

  const handleOpen = async () => {
    setOpen(true);
    //const createdAt = timestamp();
    if (complete) {
      if (docRef) {
        //update fce part 3

        updatePart3(
          bottomCentre,
          bottomLeft,
          bottomRight,
          questionOne,
          shortTurnQuestion,
          topLeft,
          topRight,
          docRef,
          tags,
          testType
        );
      } else {
        //upload new Part 3 - only reached if all fields are complete and docRef doesn't exist - i.e., the test has just been created

        addPart3(
          bottomCentre,
          bottomLeft,
          bottomRight,
          userId,
          questionOne,
          shortTurnQuestion,
          topLeft,
          topRight,
          tags,
          testType
        ).then((response) => {
          setDocRef(response.id);
          history.push(`/Edit${testType}/${response.id}`);
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
          <h3>Oops! You forgot to complete all the fields and add at least one tag!</h3>
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
      <button className='tool-bar-btn' onClick={handleOpen} disabled={changesSaved}>
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
