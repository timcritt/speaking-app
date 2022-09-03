import React, { useState, useEffect, Fragment, useContext } from 'react';
import Modal from 'components/common/Modal';
import PublishIcon from '@material-ui/icons/Publish';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import updatePart4 from 'APIHandlers/updatePart4';
import { firebaseAuth } from 'context/AuthProvider';
import { useHistory } from 'react-router-dom';
import addPart4 from 'APIHandlers/addPart4';

export default function PublishPart4Modal({
  questionOne,
  questionTwo,
  questionThree,
  questionFour,
  questionFive,
  questionSix,
  tags,
  testType,
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
    if (tags.length > 0 && questionOne && questionTwo && questionThree && questionFour && userId) {
      setComplete(true);
    } else {
      setComplete(false);
    }
  }, [
    tags.length,
    questionOne,
    questionTwo,
    questionThree,
    questionFour,
    questionFive,
    questionSix,
    userId,
  ]);

  const handleOpen = async () => {
    setOpen(true);
    //const createdAt = timestamp();
    if (complete) {
      if (docRef) {
        //update fce part 3

        updatePart4(
          questionOne,
          questionTwo,
          questionThree,
          questionFour,
          questionFive,
          questionSix,
          docRef,
          tags,
          testType
        );
      } else {
        //upload new Part 4 - only reached if all fields are complete and docRef doesn't exist - i.e., the test has just been created

        addPart4(
          questionOne,
          questionTwo,
          questionThree,
          questionFour,
          questionFive,
          questionSix,
          tags,
          testType,
          userId
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
          <h3>Oops! You forgot to enter at least 4 questions and add at least one tag!</h3>
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
