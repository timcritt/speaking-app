import React, { useState, useEffect, useContext } from 'react';
import ExamPicture from './ExamPicture';
import Timer from './Timer';
import { Link } from 'react-router-dom';
import useGetTest from '../hooks/useGetTest';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import FullscreenOutlinedIcon from '@material-ui/icons/FullscreenOutlined';
import FullscreenExitOutlinedIcon from '@material-ui/icons/FullscreenExitOutlined';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { firebaseAuth } from '../context/AuthProvider';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import Modal from './Modal';
import AddToMyFolders from './AddToMyFolders';
import getUserDetails from '../APIHandlers/getUserDetails';
import CreatorInfo from './CreatorInfo';
import { Fragment } from 'react';

const FCEPart2 = (props) => {
  const [question, setQuestion] = useState(null);
  const [imageOneUrl, setImageOne] = useState(null);
  const [imageTwoUrl, setImageTwo] = useState(null);
  const [docRef, setDocRef] = useState(null);
  const [authorId, setAuthorId] = useState(null);
  const [AddToFolderModalOpen, setAddToFolderModalOpen] = useState(false);
  const { userId } = useContext(firebaseAuth);
  const handleFullScreen = useFullScreenHandle();

  var test = useGetTest(props.match.params.id);

  useEffect(() => {
    if (test) {
      setDocRef(test.id);
      setImageOne(test.imageOneUrl);
      setImageTwo(test.imageTwoUrl);
      setQuestion(test.question);
      setAuthorId(test.userId);
    }
  }, [test, authorId]);

  const openAddToFolderModal = () => {
    setAddToFolderModalOpen(true);
  };
  const closeAddToFolderModal = () => {
    setAddToFolderModalOpen(false);
  };

  return (
    <Fragment>
      {AddToFolderModalOpen && (
        <Modal
          className='open-add-folder-modal-btn'
          modalOpen={AddToFolderModalOpen}
          heading='Add test to folder'
          setModalOpen={closeAddToFolderModal}
        >
          <AddToMyFolders testId={docRef} />
        </Modal>
      )}
      <FullScreen handle={handleFullScreen}>
        <main className='holy-grail-content fade-in'>
          <div className='part2-main-row'>
            <div className='question-row'>
              <span className='input question-input'>{question}</span>
            </div>
            <div className='part2-image-row'>
              <div className='part2-image-container-left'>
                <ExamPicture image={imageOneUrl} />
              </div>
              <div className='part2-image-container-right'>
                <ExamPicture image={imageTwoUrl} />
              </div>
            </div>
            <div className='tool-bar-row'>
              {authorId && <CreatorInfo authorId={authorId} />}
              <Timer />
              <div className='tool-btn-container'>
                {authorId == userId && (
                  <Link
                    to={{
                      pathname: `/EditFCEPart2/${docRef}`,
                    }}
                  >
                    <button className='tool-bar-btn hide-on-fullscreen'>
                      <EditOutlinedIcon />
                    </button>
                  </Link>
                )}
                <button className='tool-bar-btn hide-on-fullscreen'>
                  <ShareOutlinedIcon />
                </button>
                <button
                  className='tool-bar-btn hide-on-fullscreen'
                  onClick={() => openAddToFolderModal(true)}
                >
                  <PlaylistAddOutlinedIcon />
                </button>
                <button
                  className='tool-bar-btn open-fullscreen-btn hide-on-fullscreen'
                  onClick={() => handleFullScreen.enter()}
                >
                  <FullscreenOutlinedIcon />
                </button>
                <button
                  className='tool-bar-btn close-fullscreen-btn show-on-fullscreen'
                  onClick={() => handleFullScreen.exit()}
                >
                  <FullscreenExitOutlinedIcon
                    fontSize='large'
                    style={{ color: '#BFBFBF' }}
                  />
                </button>
              </div>
            </div>
          </div>
        </main>
      </FullScreen>
    </Fragment>
  );
};

export default FCEPart2;
