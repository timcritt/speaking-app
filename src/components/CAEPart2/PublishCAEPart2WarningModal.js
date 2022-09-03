import React, { useState, useEffect, Fragment, useContext } from 'react';
import Modal from '../common/Modal';
import PublishIcon from '@material-ui/icons/Publish';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { timestamp } from 'firebase/firebaseIndex';
import updateCAEPart2 from 'APIHandlers/updateCAEPart2';
import addCAEPart2 from 'APIHandlers/addCAEPart2';
import { firebaseAuth } from 'context/AuthProvider';
import { uploadCAEPart2Images } from 'APIHandlers/uploadFCEPart2Images';
import { CAEPart2Context } from 'context/CAEPart2Context';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useHistory } from 'react-router-dom';

const PublishMessage = ({ uploadComplete }) => {
  return uploadComplete ? <h3>Published!</h3> : <LinearProgress />;
};

export default function PublishWarningModal() {
  const [open, setOpen] = useState(false);
  const { userId } = useContext(firebaseAuth);
  const context = useContext(CAEPart2Context);

  const [allInputsCompleted, setAllInputsCompleted] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  var history = useHistory();

  useEffect(() => {
    if (
      context.testTags.length > 0 &&
      context.imageOneUrl &&
      context.imageTwoUrl &&
      context.imageThreeUrl &&
      context.questionOne &&
      context.questionTwo &&
      context.shortTurnQuestion
    ) {
      setAllInputsCompleted(true);
    } else {
      setAllInputsCompleted(false);
    }
  }, [
    context.imageOneUrl,
    context.imageTwoUrl,
    context.imageThreeUrl,
    context.questionOne,
    context.questionTwo,
    context.testTags,
    context.shortTurnQuestion,
  ]);

  const handleOpen = () => {
    setOpen(true);
    setUploadComplete(false);
    const createdAt = timestamp();
    if (allInputsCompleted) {
      if (context.docRef) {
        //var test = getTest(FCEPart2, docRef).then(
        uploadCAEPart2Images(
          context.imageOneUrl,
          context.imageTwoUrl,
          context.imageThreeUrl,
          context.imageOneRef,
          context.imageTwoRef,
          context.imageThreeRef
        ).then((data) => {
          updateCAEPart2(
            data.imageOneData.url,
            data.imageTwoData.url,
            data.imageThreeData.url,
            context.questionOne,
            context.questionTwo,
            context.shortTurnQuestion,
            context.testTags,
            context.docRef,
            createdAt,
            data.imageOneData.reference,
            data.imageTwoData.reference,
            data.imageThreeData.reference
          ).then(
            context.setImageOneUrl(data.imageOneData.url),
            context.setImageTwoUrl(data.imageTwoData.url),
            context.setImageThreeUrl(data.imageThreeData.url),
            context.setImageOneRef(data.imageOneData.reference),
            context.setImageTwoRef(data.imageTwoData.reference),
            context.setImageThreeRef(data.imageThreeData.reference),
            setUploadComplete(true),
            context.setUnsavedChanges(false)

            //setChangesSaved(true)
          );
        });
      } else {
        setOpen(true);
        //if local test has no docId, it's because it's new and doesn't exist on the firestore.
        uploadCAEPart2Images(context.imageOneUrl, context.imageTwoUrl, context.imageThreeUrl).then(
          (data) => {
            addCAEPart2(
              data.imageOneData.url,
              data.imageTwoData.url,
              data.imageThreeData.url,
              context.questionOne,
              context.questionTwo,
              context.shortTurnQuestion,
              createdAt,
              context.testTags,
              data.imageOneData.reference,
              data.imageTwoData.reference,
              data.imageThreeData.reference,
              userId
            ).then((response) => {
              context.setDocRef(response.id);
              setUploadComplete(true);
              context.setUnsavedChanges(false);
              history.push(`/EditCAEPart2/${response.id}`);
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
        {(!context.imageOneUrl || !context.imageTwoUrl) && <li>select two images</li>}
        {!context.questionOne && !context.questionTwo && <li>enter a question</li>}
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
