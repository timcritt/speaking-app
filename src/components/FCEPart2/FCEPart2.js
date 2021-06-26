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
import LinearProgress from '@material-ui/core/LinearProgress';
import { FCEPart2Context } from 'context/FCEPart2Context';

const FCEPart2 = (props) => {
  const context = useContext(FCEPart2Context);
  const [AddToFolderModalOpen, setAddToFolderModalOpen] = useState(false);
  const { userId } = useContext(firebaseAuth);
  const handleFullScreen = useFullScreenHandle();
  const [shortTurnVisible, setShortTurnVisible] = useState(false);
  const [time, setTime] = useState(6000);

  useEffect(() => {
    //sends the id of the current test to be displayed to the FCEPart2 context
    context.setDocRef(props.match.params.id);
  }, []);

  useEffect(() => {
    if (shortTurnVisible) {
      setTime(2000);
    } else {
      setTime(6000);
    }
  }, [shortTurnVisible]);

  const openAddToFolderModal = () => {
    setAddToFolderModalOpen(true);
  };
  const closeAddToFolderModal = () => {
    setAddToFolderModalOpen(false);
  };
  const handleViewShortTurnClick = () => {
    setShortTurnVisible((prevState) => !prevState);
  };

  if (context.hasFetched) {
    return (
      <Fragment>
        {AddToFolderModalOpen && (
          <Modal
            className='open-add-folder-modal-btn'
            heading='Add test to folder'
            setModalOpen={closeAddToFolderModal}
          >
            <AddToMyFolders testId={context.docRef} />
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
                      value={context.question}
                      readOnly={true}
                      placeholder='ERROR: data not loaded'
                    />
                  ) : (
                    <input
                      label='short-turn'
                      className='input question-input short-turn-question-input'
                      value={`Short turn: ${context.shortTurnQuestion}`}
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
                  <ExamPicture
                    image={context.imageOneUrl}
                    setImage={context.setImageOneUrl}
                  />
                </div>
                <div className='part2-image-container-right'>
                  <ExamPicture
                    image={context.imageTwoUrl}
                    setImage={context.setImageTwoUrl}
                  />
                </div>
              </div>
              <div className='tool-bar-row'>
                {context.authorId && (
                  <CreatorInfo authorId={context.authorId} />
                )}
                <Timer time={time} />
                <div className='tool-btn-container'>
                  {context.authorId === userId && (
                    <Link
                      to={{
                        pathname: `/EditFCEPart2/${context.docRef}`,
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
