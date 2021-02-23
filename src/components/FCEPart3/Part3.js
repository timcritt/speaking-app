import React, { useState, useEffect, useContext, Fragment } from 'react';
import Timer from 'components/common/Timer';
import { Link } from 'react-router-dom';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FullscreenOutlinedIcon from '@material-ui/icons/FullscreenOutlined';
import FullscreenExitOutlinedIcon from '@material-ui/icons/FullscreenExitOutlined';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { firebaseAuth } from 'context/AuthProvider';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import LinearProgress from '@material-ui/core/LinearProgress';
import Modal from 'components/common/Modal';
import AddToMyFolders from 'components/common/AddToMyFolders';
import CreatorInfo from 'components/common/CreatorInfo';
import ShareButton from 'components/common/ShareButton';
import Part3Lines from 'components/FCEPart3/Part3Lines';
import { FCEPart3Context } from 'context/FCEPart3Context';
import debounce from 'auxFunctions/debounce';

const Part3 = (props) => {
  const [AddToFolderModalOpen, setAddToFolderModalOpen] = useState(false);
  const { userId } = useContext(firebaseAuth);
  const handleFullScreen = useFullScreenHandle();
  const context = useContext(FCEPart3Context);
  const [lineClass, setLineClass] = useState('');
  const [questionTwoVisible, setQuestionTwoVisible] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    height: null,
    width: null,
  });
  const [time, setTime] = useState(1200);

  const handleViewShortTurnClick = () => {
    hideLines();
    setQuestionTwoVisible((prevState) => !prevState);

    if (!questionTwoVisible) {
      setTime(2000);
    } else {
      setTime(6000);
    }
    debouncedHandleResize();
  };

  const openAddToFolderModal = () => {
    setAddToFolderModalOpen(true);
  };
  const closeAddToFolderModal = () => {
    setAddToFolderModalOpen(false);
  };

  const hideLines = () => {
    setLineClass('line-hidden');
  };
  const showLines = () => {
    setLineClass('');
  };

  const handleResize = () => {
    setWindowDimensions({
      height: window.innerHeight,
      width: window.innerWidth,
    });
    showLines();
    console.log('lines redrawn');
  };

  const debouncedHandleResize = debounce(handleResize, 200);

  useEffect(() => {
    //instantly hides the lines on window resize to prevent ugly jumping of lines between positions.
    window.addEventListener('resize', hideLines);
    //listens for window resize and redraws the lines between text areas after a set time. Sets lines to visible when done.
    window.addEventListener('resize', debouncedHandleResize);
    window.addEventListener('fullscreenchange', handleResize);

    //cleanup function - removes listeners on unmount
    return () => {
      window.removeEventListener('resize', hideLines);
      window.removeEventListener('resize', debouncedHandleResize);
      window.removeEventListener('fullscreenchange', handleResize);
    };
  }, []);

  useEffect(() => {
    //sends the id of the current test to be displayed to the FCEPart2 context
    if (props.match.params.id !== 'new') {
      context.setDocRef(props.match.params.id);
    } else {
      //clears context state of previously viewed Test. displays blank test to be created by user.
      // context.clearState();
      handleResize();
    }
    if (context.hasFetched) {
      handleResize();
    }
  }, [context.hasFetched]);

  if (context.hasFetched) {
    return (
      <Fragment>
        {AddToFolderModalOpen && (
          <Modal
            className='open-add-folder-modal-btn'
            modalOpen={AddToFolderModalOpen}
            heading='Add test to folder'
            setModalOpen={closeAddToFolderModal}
          >
            <AddToMyFolders testId={context.docRef} />
          </Modal>
        )}
        <FullScreen handle={handleFullScreen}>
          <main className='holy-grail-content fade-in'>
            <div className='part2-main-row'>
              <button
                className={'short-turn-button '}
                onClick={handleViewShortTurnClick}
              >
                show question 2
              </button>
              <div className='part3-grid-container'>
                <div className='part3-option-top-left part3-input'>
                  {context.topLeft}
                </div>
                <div className='part3-question-centre part3-input'>
                  {questionTwoVisible ? (
                    <span>{context.questionTwo}</span>
                  ) : (
                    <span>{context.question}</span>
                  )}
                </div>
                <div className='part3-option-top-right part3-input part3-option-input'>
                  <span>{context.topRight}</span>
                </div>
                <div className='part3-option-bottom-left part3-input part3-option-input'>
                  {context.bottomLeft}
                </div>
                <div className='part3-option-bottom-centre part3-input part3-option-input'>
                  {context.bottomCentre}
                </div>
                <div className='part3-option-bottom-right part3-input part3-option-input'>
                  {context.bottomRight}
                </div>
                <Part3Lines
                  windowDimensions={windowDimensions}
                  lineClass={lineClass}
                />
              </div>
              <div className='tool-bar-row'>
                <CreatorInfo authorId={context.authorId} />
                <Timer time={12000} />
                <div className='tool-btn-container'>
                  {context.authorId === userId && (
                    <Link
                      to={{
                        pathname: `/EditFCEPart3/${context.docRef}`,
                      }}
                    >
                      <button className='tool-bar-btn hide-on-fullscreen'>
                        <EditOutlinedIcon />
                      </button>
                    </Link>
                  )}
                  <ShareButton
                    className='tool-bar-btn hide-on-fullscreen'
                    sharedItemType={'Part 3'}
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

export default Part3;
