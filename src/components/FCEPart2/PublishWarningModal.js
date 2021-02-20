import React, { useState, useEffect, Fragment, useContext } from 'react';
import Modal from '../common/Modal';
import PublishIcon from '@material-ui/icons/Publish';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { timestamp } from 'firebase/firebaseIndex';
import updateTest from 'APIHandlers/updateTest';
import addTest from 'APIHandlers/addTest';
import { firebaseAuth } from 'context/AuthProvider';
import { uploadFCEPart2Images } from 'APIHandlers/uploadImage';
import { FCEPart2Context } from 'context/FCEPart2Context';

export default function PublishWarningModal() {
  const [open, setOpen] = useState(false);
  const [complete, setComplete] = useState(false);
  const { userId } = useContext(firebaseAuth);
  const context = useContext(FCEPart2Context);

  // var history = useHistory();

  useEffect(() => {
    if (
      context.testTags.length > 0 &&
      context.imageOneUrl &&
      context.imageTwoUrl &&
      context.question
    ) {
      setComplete(true);
    } else {
      setComplete(false);
    }
  }, [
    context.imageOneUrl,
    context.imageTwoUrl,
    context.testTags,
    context.question,
  ]);

  const handleOpen = () => {
    setOpen(true);
    const createdAt = timestamp();
    if (complete) {
      if (context.docRef) {
        //var test = getTest(FCEPart2, docRef).then(console.log);
        uploadFCEPart2Images(
          context.imageOneUrl,
          context.imageTwoUrl,
          context.imageOneRef,
          context.imageTwoRef
        ).then((data) => {
          updateTest(
            data.imageOneData.url,
            data.imageTwoData.url,
            context.question,
            context.shortTurnQuestion,
            context.testTags,
            context.docRef,
            createdAt,
            data.imageOneData.reference,
            data.imageTwoData.reference
          ).then(
            () => context.setImageOneUrl(data.imageOneData.url),
            context.setImageTwoUrl(data.imageTwoData.url),
            context.setImageOneRef(data.imageOneData.reference),
            context.setImageTwoRef(data.imageTwoData.reference)
            //setChangesSaved(true)
          );
        });
      } else {
        setOpen(true);
        //if local test has no docId, it's because it's new and doesn't exist on the firestore.
        uploadFCEPart2Images(context.imageOneUrl, context.imageTwoUrl).then(
          (data) => {
            addTest(
              data.imageOneData.url,
              data.imageTwoData.url,
              context.question,
              context.shortTurnQuestion,
              createdAt,
              context.testTags,
              data.imageOneData.reference,
              data.imageTwoData.reference,
              userId
            ).then((response) => {
              context.setDocRef(response.id); //setChangesSaved(true); //history.push(`/FCEPart2/${docRef.id}`);
            });
          }
        );
      }
    } else {
      setOpen(true);
      //setChangesSaved(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div>
      <div>
        {complete ? <h3>Published!</h3> : <h3>Oops! You forgot to:</h3>}
      </div>
      <ul>
        {(!context.imageOneUrl || !context.imageTwoUrl) && (
          <li>select two images</li>
        )}
        {!context.question && <li>enter a question</li>}
        {context.testTags.length === 0 && <li>select at least one tag</li>}
      </ul>
      <div className='center'>
        <button onClick={handleClose}>ok</button>
      </div>
    </div>
  );

  return (
    <Fragment>
      <button className='tool-bar-btn' onClick={handleOpen}>
        {context.docRef ? <SaveOutlinedIcon /> : <PublishIcon />}
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
