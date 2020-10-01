import React, { useState, useEffect, Fragment, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from './Modal';
import PublishIcon from '@material-ui/icons/Publish';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { timestamp } from '../firebase/firebaseIndex';
import updateTest from '../APIHandlers/updateTest';
import addTest from '../APIHandlers/addTest';
import { firebaseAuth } from '../context/AuthProvider';
import { uploadFCEPart2Images } from '../APIHandlers/uploadImage';

export default function PublishWarningModal({
  imageOneUrl,
  imageTwoUrl,
  tags,
  question,
  docRef,
  setDocRef,
  imageOneRef,
  imageTwoRef,
  setImageOneUrl,
  setImageTwoUrl,
  setImageOneRef,
  setImageTwoRef,
  changesSaved,
  setChangesSaved,
}) {
  const [open, setOpen] = useState(false);
  const [complete, setComplete] = useState(false);
  const { userId } = useContext(firebaseAuth);
  const { progress } = useState(0);

  // var history = useHistory();

  useEffect(() => {
    if (tags.length > 0 && imageOneUrl && imageTwoUrl && question) {
      setComplete(true);
    } else {
      setComplete(false);
    }
  }, [imageOneUrl, imageTwoUrl, tags, question]);

  const handleOpen = () => {
    setOpen(true);
    const createdAt = timestamp();
    if (complete) {
      if (docRef) {
        //var test = getTest(FCEPart2, docRef).then(console.log);
        uploadFCEPart2Images(
          imageOneUrl,
          imageTwoUrl,
          imageOneRef,
          imageTwoRef
        ).then((data) => {
          updateTest(
            data.imageOneData.url,
            data.imageTwoData.url,
            question,
            tags,
            docRef,
            createdAt,
            data.imageOneData.reference,
            data.imageTwoData.reference
          ).then(
            () => setImageOneUrl(data.imageOneData.url),
            setImageTwoUrl(data.imageTwoData.url),
            setImageOneRef(data.imageOneData.reference),
            setImageTwoRef(data.imageTwoData.reference)
            //setChangesSaved(true)
          );
        });
      } else {
        setOpen(true);
        //if local test has no docId, it's because it's new and doesn't exist on the firestore.
        uploadFCEPart2Images(imageOneUrl, imageTwoUrl).then((data) => {
          addTest(
            data.imageOneData.url,
            data.imageTwoData.url,
            question,
            createdAt,
            tags,
            data.imageOneData.reference,
            data.imageTwoData.reference,
            userId
          ).then((docRef) => {
            setDocRef(docRef); //setChangesSaved(true); //history.push(`/FCEPart2/${docRef.id}`);
          });
        });
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
