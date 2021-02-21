import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import Modal from 'components/common/Modal';
import AddToMyFolders from 'components/common/AddToMyFolders';
import CreatorInfo from 'components/common/CreatorInfo';
import { Fragment } from 'react';
import { TextareaAutosize } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import SideBarTags from 'components/common/SideBarTags';
import PublishPart3WarningModal from 'components/FCEPart3/PublishPart3WarningModal';
import Part3Lines from 'components/FCEPart3/Part3Lines';
import LinearProgress from '@material-ui/core/LinearProgress';
import debounce from 'auxFunctions/debounce';
import { FCEPart3Context } from 'context/FCEPart3Context';

const EditPart3 = (props) => {
  const [AddToFolderModalOpen, setAddToFolderModalOpen] = useState(false);
  const handleFullScreen = useFullScreenHandle();
  const optionPlaceholder = 'option';
  const context = useContext(FCEPart3Context);
  const [mountLines, setMountLines] = useState(true);
  const [lineClass, setLineClass] = useState('');
  const [windowDimensions, setWindowDimensions] = useState({
    height: null,
    width: null,
  });

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
    setMountLines(true);
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

  useEffect(() => {
    //instantly hides the lines on window resize to prevent jumping lines.
    window.addEventListener('resize', hideLines);
    //listens for window resize and redraws the lines between text areas after a set time. Sets lines to visible when done.
    window.addEventListener('resize', debouncedHandleResize);
    window.addEventListener('fullscreenchange', handleResize);

    //cleanup function - removes listeners on unmount
    return () => {
      window.removeEventListener('resize', hideLines);
      window.removeEventListener('resize', debouncedHandleResize);
      window.removeEventListener('fullscreenchange', handleResize);
      setMountLines(false);
    };
  }, []);

  function handleSetDocRef(docRef) {
    context.setDocRef(docRef);
  }

  const handleQuestionChange = (e) => {
    context.setQuestion(e.currentTarget.value);
    setTimeout(function () {
      handleResize();
    }, 100);
  };
  const handleTopLeftChange = (e) => {
    context.setTopLeft(e.currentTarget.value);
    setTimeout(function () {
      handleResize();
    }, 100);
  };
  const handleTopRightChange = (e) => {
    context.setTopRight(e.currentTarget.value);
    setTimeout(function () {
      handleResize();
    }, 100);
  };
  const handleBottomLeftChange = (e) => {
    context.setBottomLeft(e.currentTarget.value);
    setTimeout(function () {
      handleResize();
    }, 100);
  };
  const handleBottomCentreChange = (e) => {
    context.setBottomCentre(e.currentTarget.value);
    setTimeout(function () {
      handleResize();
    }, 100);
  };
  const handleBottomRightChange = (e) => {
    context.setBottomRight(e.currentTarget.value);
    setTimeout(function () {
      handleResize();
    }, 100);
  };

  if (context.hasFetched) {
    return (
      <Fragment>
        <div className='side-bar-left-tags hg-sidebar '>
          {context.testTags && (
            <SideBarTags
              tags={context.testTags}
              handleSetTags={context.handleSetTags}
              title={'Topic Tags'}
            >
              <p className='advice-text tag-advice'>
                Adding the correct tags will help others find your test
              </p>
            </SideBarTags>
          )}
        </div>
        {AddToFolderModalOpen && (
          <Modal
            className='open-add-folder-modal-btn'
            heading='Add test to folder'
          >
            <AddToMyFolders testId={context.docRef} />
          </Modal>
        )}
        <FullScreen handle={handleFullScreen} key={2351}>
          <main className='holy-grail-content fade-in'>
            <div className='part2-main-row'>
              <div className='part3-grid-container' key={1235}>
                <TextareaAutosize
                  className='part3-option-top-left part3-option-input part3-input '
                  placeholder={optionPlaceholder}
                  defaultValue={context.topLeft}
                  onChange={handleTopLeftChange}
                  rowsMin='1'
                />
                <TextareaAutosize
                  className='part3-question-centre part3-input'
                  placeholder='enter question'
                  value={context.question}
                  onChange={handleQuestionChange}
                  rowsMin='1'
                />
                <TextareaAutosize
                  className='part3-option-top-right part3-input part3-option-input'
                  placeholder={optionPlaceholder}
                  defaultValue={context.topRight}
                  onChange={handleTopRightChange}
                  rowsMin='1'
                />
                <TextareaAutosize
                  className='part3-option-bottom-left part3-input part3-option-input'
                  placeholder={optionPlaceholder}
                  defaultValue={context.bottomLeft}
                  onChange={handleBottomLeftChange}
                  rowsMin='1'
                />
                <TextareaAutosize
                  className='part3-option-bottom-centre part3-input part3-option-input'
                  placeholder={optionPlaceholder}
                  defaultValue={context.bottomCentre}
                  onChange={handleBottomCentreChange}
                  rowsMin='1'
                />
                <TextareaAutosize
                  className='part3-option-bottom-right part3-input part3-option-input '
                  placeholder={optionPlaceholder}
                  defaultValue={context.bottomRight}
                  onChange={handleBottomRightChange}
                  rowsMin='1'
                />

                <Part3Lines
                  windowDimensions={windowDimensions}
                  lineClass={lineClass}
                  key={12344}
                />
              </div>
              <div className='tool-bar-row'>
                {context.authorId && (
                  <CreatorInfo authorId={context.authorId} />
                )}
                <div className='tool-btn-container'>
                  <PublishPart3WarningModal
                    bottomCentre={context.bottomCentre}
                    bottomLeft={context.bottomLeft}
                    bottomRight={context.bottomRight}
                    creatorId={context.authorId}
                    question={context.question}
                    questionTwo={'question two placeholder'}
                    topLeft={context.topLeft}
                    topRight={context.topRight}
                    tags={context.testTags}
                    changesSaved={context.changesSaved}
                    setChangesSaved={context.setChangesSaved}
                    docRef={context.docRef}
                    setDocRef={handleSetDocRef}
                  />
                  {context.docRef && (
                    <Link
                      to={{
                        pathname: `/FCEPart3/${context.docRef}`,
                      }}
                    >
                      <button className='tool-bar-btn'>
                        <VisibilityOutlinedIcon />
                      </button>
                    </Link>
                  )}
                  <button className='tool-bar-btn'>
                    <DeleteForeverOutlinedIcon />
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

export default EditPart3;
