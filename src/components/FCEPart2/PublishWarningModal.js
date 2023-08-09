import React, { useState, useEffect, Fragment, useContext, useRef } from 'react';
import Modal from '../common/Modal';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { timestamp } from 'firebase/firebaseIndex';
import updateTest from 'APIHandlers/updateTest';
import addTest from 'APIHandlers/addTest';
import { firebaseAuth } from 'context/AuthProvider';
import { uploadFCEPart2Images } from 'APIHandlers/uploadFCEPart2Images';
import { FCEPart2Context } from 'context/FCEPart2Context';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useHistory } from 'react-router-dom';

//CSS modules
import styles from './PublishWarningModal.module.css';

const PublishWarningModal = ({setInputStatus}) => {
  const [open, setOpen] = useState(false);
  const { userId } = useContext(firebaseAuth);
  const context = useContext(FCEPart2Context);
  
  const [uploadComplete, setUploadComplete] = useState(false);
  const [allInputsCompleted, setAllInputsCompleted] = useState(false);

  var history = useHistory();

  const validateInputs = () => {
    
    if (!context.questionOne) {
      setInputStatus((prevState) => {
        return {
          ...prevState,
          questionOneFailedValidation: true
        }

      })
    }
    if(!context.shortTurnQuestion) {
      setInputStatus((prevState) => {
        return {
          ...prevState,
          shortTurnQuestionFailedValidation: true
        }

      })
    }
    if(!context.imageOneUrl) {
      setInputStatus((prevState) => {
        return {
          ...prevState,
          imageOneFailedValidation: true
        }

      })
    }
    if(!context.imageTwoUrl) {
      setInputStatus((prevState) => {
        return {
          ...prevState,
          imageTwoFailedValidation: true
        }

      })
    }
    if(!context.testTags.length > 0) {
      setInputStatus((prevState) => {
        return {
          ...prevState,
          topicTagsFailedValidation: true
        }

      })
    }

    if (
      context.testTags.length > 0 &&
      context.imageOneUrl &&
      context.imageTwoUrl &&
      context.questionOne

    ) {
      setAllInputsCompleted(true);
      return true;
    } else {
      setAllInputsCompleted(false);
      return false
    }
  }


  const handleOpen = async (e) => {
    //prevent default form action
    e.preventDefault();

    //must rely on value of inputsValid rather than allInputsCompleted due to closure around the state value
    const inputsValid = validateInputs();

    setOpen(true);
    
    //must rely on value of inputsValid rather than allInputsCompleted due to closure around the state value
    if (inputsValid) {
      setUploadComplete(false);
      const createdAt = timestamp();
      
      //update existing test
      if (context.docRef) {
        //updates only if images are new
        uploadFCEPart2Images(
          context.imageOneUrl,
          context.imageTwoUrl,
          context.imageOneRef,
          context.imageTwoRef,
          context.imageOneThumbUrl,
          context.imageOneThumbRef,
          context.imageTwoThumbUrl,
          context.imageTwoThumbRef
        ).then((data) => {
          updateTest(
            data.imageOneData.url,
            data.imageTwoData.url,
            context.questionOne,
            context.shortTurnQuestion,
            context.testTags,
            context.docRef,
            createdAt,
            data.imageOneData.reference,
            data.imageTwoData.reference,
            data.imageOneThumbData.url,
            data.imageOneThumbData.reference,
            data.imageTwoThumbData.url,
            data.imageTwoThumbData.reference
          ).then(
            context.setImageOneUrl(data.imageOneData.url),
            context.setImageTwoUrl(data.imageTwoData.url),
            context.setImageOneRef(data.imageOneData.reference),
            context.setImageTwoRef(data.imageTwoData.reference),
            setUploadComplete(true),
            context.setUnsavedChanges(false),
            setOpen(false)
            //setChangesSaved(true)
          );
        });
      } else {
        setOpen(true);
        //create new test
        //if local test has no docId, it's because it's new and doesn't exist on the firestore.
        //also creates thumbnails
        	
        uploadFCEPart2Images(context.imageOneUrl, context.imageTwoUrl).then((data) => {
          
          addTest(
            data.imageOneData.url,
            data.imageTwoData.url,
            context.questionOne,
            context.shortTurnQuestion,
            context.testTags,
            data.imageOneData.reference,
            data.imageTwoData.reference,
            userId,
            data.imageOneThumbData.reference,
            data.imageOneThumbData.url,
            data.imageTwoThumbData.reference,
            data.imageTwoThumbData.url
          ).then((response) => {
            context.setDocRef(response.id);
            setUploadComplete(true);
            context.setUnsavedChanges(false);
            history.push(`/EditFCEPart2/${response.id}`);
          });
        });
      }
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setUploadComplete(false);
  };


  return (
    <Fragment>
      <button className={styles.save_button} onClick={handleOpen}>
        save <SaveOutlinedIcon />
      </button>
      {open && (
        <Modal
          modalOpen={open}
          setModalOpen={handleClose}
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
          heading={'Saving'}
        >
          <div>
      <div>
        {allInputsCompleted ? (
          uploadComplete ? <h3>Published!</h3> : <LinearProgress />
        ) : (
          <h3>Oops! You forgot to:</h3>
        )}
      </div>
      <ul>
        {(!context.imageOneUrl || !context.imageTwoUrl) && <li>select two images</li>}
        {!context.questionOne && <li>enter a question</li>}
        {context.testTags.length === 0 && <li>select at least one tag</li>}
      </ul>
      <div className='center'>
        <button onClick={handleClose}>ok</button>
      </div>
    </div>
        </Modal>
      )}
    </Fragment>
  );
}

export default PublishWarningModal;