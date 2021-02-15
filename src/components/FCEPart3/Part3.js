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
import getTest from 'APIHandlers/getTest';
import debounce from 'auxFunctions/debounce';

const Part3 = (props) => {
  const [question, setQuestion] = useState('');
  const [topLeft, setTopLeft] = useState('');
  const [topRight, setTopRight] = useState('');
  const [bottomLeft, setBottomLeft] = useState('');
  const [bottomCentre, setBottomCentre] = useState('');
  const [bottomRight, setBottomRight] = useState('');
  const [docRef, setDocRef] = useState(null);
  const [authorId, setAuthorId] = useState(null);
  const [AddToFolderModalOpen, setAddToFolderModalOpen] = useState(false);
  const { userId } = useContext(firebaseAuth);
  const handleFullScreen = useFullScreenHandle();
  const [lineClass, setLineClass] = useState('');
  const [hasFetched, setHasFetched] = useState(false);

  const [windowDimensions, setWindowDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  //hide lines before redrawing
  const hideLines = () => {
    setLineClass('line-hidden');
  };
  const showLines = () => {
    setLineClass('');
  };

  //sets the state of the lines after window resize to force a rerender
  const handleResize = () => {
    setWindowDimensions({
      height: window.innerHeight,
      width: window.innerWidth,
    });
    showLines();
    console.log('lines redrawn');
  };
  const openAddToFolderModal = () => {
    setAddToFolderModalOpen(true);
  };
  const closeAddToFolderModal = () => {
    setAddToFolderModalOpen(false);
  };

  //applies a time delay between window resize and the rerender of lines
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
    var isMounted = true;
    getTest('Part3', props.match.params.id).then((data) => {
      if (isMounted) {
        setDocRef(data.id);
        setQuestion(data.question);
        setTopLeft(data.topLeft);
        setTopRight(data.topRight);
        setBottomCentre(data.bottomCentre);
        setBottomLeft(data.bottomLeft);
        setBottomRight(data.bottomRight);
        setAuthorId(data.creatorId);
        setHasFetched(true);
        //draws the lines in the correct positions after test load
        handleResize();
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  if (hasFetched) {
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
              <div className='part3-grid-container'>
                <div className='part3-option-top-left part3-input'>
                  {topLeft}
                </div>
                <div className='part3-question-centre part3-input'>
                  <span>{question}</span>
                </div>
                <div className='part3-option-top-right part3-input part3-option-input'>
                  <span>{topRight}</span>
                </div>
                <div className='part3-option-bottom-left part3-input part3-option-input'>
                  {bottomLeft}
                </div>
                <div className='part3-option-bottom-centre part3-input part3-option-input'>
                  {bottomCentre}
                </div>
                <div className='part3-option-bottom-right part3-input part3-option-input'>
                  {bottomRight}
                </div>
                <Part3Lines
                  windowDimensions={windowDimensions}
                  lineClass={lineClass}
                />
              </div>
              <div className='tool-bar-row'>
                <CreatorInfo authorId={authorId} />
                <Timer time={12000} />
                <div className='tool-btn-container'>
                  {authorId === userId && (
                    <Link
                      to={{
                        pathname: `/EditFCEPart3/${docRef}`,
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
