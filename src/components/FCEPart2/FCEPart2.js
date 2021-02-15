import React, { useState, useEffect, useContext } from 'react';
import ExamPicture from 'components/FCEPart2/ExamPicture';
import Timer from 'components/common/Timer';
import { Link } from 'react-router-dom';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FullscreenOutlinedIcon from '@material-ui/icons/FullscreenOutlined';
import FullscreenExitOutlinedIcon from '@material-ui/icons/FullscreenExitOutlined';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { firebaseAuth } from 'context/AuthProvider';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import Modal from 'components/common/Modal';
import AddToMyFolders from 'components/common/AddToMyFolders';
import CreatorInfo from 'components/common/CreatorInfo';
import { Fragment } from 'react';
import ShareButton from 'components/common/ShareButton';
import getTest from 'APIHandlers/getTest';
import LinearProgress from '@material-ui/core/LinearProgress';

const FCEPart2 = (props) => {
  const [question, setQuestion] = useState(null);
  const [shortTurnQuestion, setShortTurnQuestion] = useState(null);
  const [imageOneUrl, setImageOne] = useState(null);
  const [imageTwoUrl, setImageTwo] = useState(null);
  const [docRef, setDocRef] = useState(null);
  const [authorId, setAuthorId] = useState(null);
  const [AddToFolderModalOpen, setAddToFolderModalOpen] = useState(false);
  const { userId } = useContext(firebaseAuth);
  const handleFullScreen = useFullScreenHandle();
  const [hasFetched, setHasFetched] = useState(false);
  const [shortTurnVisible, setShortTurnVisible] = useState(false);

  useEffect(() => {
    var isMounted = true;
    getTest('FCEPart2', props.match.params.id).then((data) => {
      if (isMounted && data) {
        setDocRef(data.id);
        setImageOne(data.imageOneUrl);
        setImageTwo(data.imageTwoUrl);
        setQuestion(data.question);
        setShortTurnQuestion(data.shortTurnQuestion);
        setAuthorId(data.userId);
        setHasFetched(true);
      } else {
        setHasFetched(true);
      }
    });
    //prevents setting of state if fetch requests completes after component has unmounted
    return () => {
      isMounted = false;
    };
  }, []);

  const openAddToFolderModal = () => {
    setAddToFolderModalOpen(true);
  };
  const closeAddToFolderModal = () => {
    setAddToFolderModalOpen(false);
  };
  const handleViewShortTurnClick = () => {
    setShortTurnVisible(!shortTurnVisible);
  };

  if (hasFetched) {
    return (
      <Fragment>
        {AddToFolderModalOpen && (
          <Modal
            className='open-add-folder-modal-btn'
            heading='Add test to folder'
            setModalOpen={closeAddToFolderModal}
          >
            <AddToMyFolders testId={docRef} />
          </Modal>
        )}
        <FullScreen handle={handleFullScreen}>
          <main className='holy-grail-content fade-in'>
            <div className='part2-main-row'>
              <div className='part2-edit-question-row'>
                <div className='part2-edit-question-container'>
                  {!shortTurnVisible ? (
                    <input
                      label='long-turn'
                      className='input question-input '
                      value={question}
                      readOnly={true}
                      placeholder='ERROR: data not loaded'
                    />
                  ) : (
                    <input
                      label='short-turn'
                      className='input question-input short-turn-question-input'
                      value={`Short turn: ${shortTurnQuestion}`}
                      readOnly={true}
                      placeholder='ERROR: data not loaded'
                    />
                  )}
                  <button
                    className={'short-turn-button '}
                    onClick={handleViewShortTurnClick}
                  >
                    {shortTurnVisible ? 'show long turn' : 'show short turn'}
                  </button>
                </div>
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
                  {authorId === userId && (
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
                  <ShareButton
                    className='tool-bar-btn hide-on-fullscreen'
                    sharedItemType={'FCE Part 2'}
                  />
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
                      style={{ color: 'black' }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </main>
        </FullScreen>
      </Fragment>
    );
  } else {
    return (
      <div className={'full-width'}>
        <LinearProgress />
      </div>
    );
  }
};

export default FCEPart2;
