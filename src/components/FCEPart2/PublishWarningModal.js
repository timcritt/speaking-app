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
import LinearProgress from '@material-ui/core/LinearProgress';
import { useHistory } from 'react-router-dom';

const PublishMessage = ({ uploadComplete }) => {
  return uploadComplete ? <h3>Published!</h3> : <LinearProgress />;
};

export default function PublishWarningModal() {
  const [open, setOpen] = useState(false);
  const { userId } = useContext(firebaseAuth);
  const context = useContext(FCEPart2Context);
  const [allInputsCompleted, setAllInputsCompleted] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  var history = useHistory();

  useEffect(() => {
    if (
      context.testTags.length > 0 &&
      context.imageOneUrl &&
      context.imageTwoUrl &&
      context.question
    ) {
      setAllInputsCompleted(true);
    } else {
      setAllInputsCompleted(false);
    }
  }, [
    context.imageOneUrl,
    context.imageTwoUrl,
    context.testTags,
    context.question,
  ]);

  const handleOpen = () => {
    setOpen(true);
    setUploadComplete(false);
    const createdAt = timestamp();
    if (allInputsCompleted) {
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
            context.setImageTwoRef(data.imageTwoData.reference),
            setUploadComplete(true)

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
              context.setDocRef(response.id);
              history.push(`/EditFCEPart2/${response.id}`);
              setUploadComplete(true);
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
    setUploadComplete(false);
  };

  const body = (
    <div>
      <div>
        {allInputsCompleted ? (
          <PublishMessage uploadComplete={uploadComplete} />
        ) : (
          <h3>Oops! You forgot to:</h3>
        )}
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
