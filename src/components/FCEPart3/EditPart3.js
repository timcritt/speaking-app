import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import getTest from 'APIHandlers/getTest';
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

const EditPart3 = (props) => {
  const [question, setQuestion] = useState('');
  const [topLeft, setTopLeft] = useState('');
  const [topRight, setTopRight] = useState('');
  const [bottomLeft, setBottomLeft] = useState('');
  const [bottomCentre, setBottomCentre] = useState('');
  const [bottomRight, setBottomRight] = useState('');
  const [lineClass, setLineClass] = useState('');
  const [testTags, setTags] = useState([]);
  const [docRef, setDocRef] = useState(null);
  const [authorId, setAuthorId] = useState('');
  const [AddToFolderModalOpen, setAddToFolderModalOpen] = useState(false);
  const [changesSaved, setChangesSaved] = useState(false);
  const handleFullScreen = useFullScreenHandle();
  const optionPlaceholder = 'option';
  const [hasFetched, setHasFetched] = useState(false);

  const [windowDimensions, setWindowDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  function debounce(fn, ms) {
    let timer;
    return (_) => {
      clearTimeout(timer);
      timer = setTimeout((_) => {
        timer = null;
        fn.apply(this, arguments);
      }, ms);
    };
  }

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
    };
  }, []);
  //var test = useGetTest('Part3', props.match.params.id);
  function handleSetDocRef(docRef) {
    setDocRef(docRef);
  }
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
        setTags(data.tags);
        //draws the lines in the correct positions after test load
        setHasFetched(true);
        handleResize();
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleQuestionChange = (e) => {
    setQuestion(e.currentTarget.value);
    setTimeout(function () {
      handleResize();
    }, 100);

    console.log(question);
  };

  const handleTopLeftChange = (e) => {
    setTopLeft(e.currentTarget.value);
    setTimeout(function () {
      handleResize();
    }, 100);
  };

  const handleTopRightChange = (e) => {
    setTopRight(e.currentTarget.value);
    setTimeout(function () {
      handleResize();
    }, 100);
  };
  const handleBottomLeftChange = (e) => {
    setBottomLeft(e.currentTarget.value);
    setTimeout(function () {
      handleResize();
    }, 100);
  };

  const handleBottomCentreChange = (e) => {
    setBottomCentre(e.currentTarget.value);
    setTimeout(function () {
      handleResize();
    }, 100);
  };
  const handleBottomRightChange = (e) => {
    setBottomRight(e.currentTarget.value);
    setTimeout(function () {
      handleResize();
    }, 100);
  };
  function handleSetTags(tag, selected) {
    if (!selected) {
      //adds tag to the state
      setTags((prevTags) => {
        return [...prevTags, tag];
      });
    } else {
      //removes the tag from the state
      setTags((prevTags) => {
        return [...prevTags.filter((currentTag) => currentTag !== tag)];
      });
    }
    //setChangesSaved(false);
  }

  if (hasFetched) {
    return (
      <Fragment>
        <div className='side-bar-left-tags hg-sidebar '>
          {testTags && (
            <SideBarTags
              tags={testTags}
              handleSetTags={handleSetTags}
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
            <AddToMyFolders testId={docRef} />
          </Modal>
        )}
        <FullScreen handle={handleFullScreen}>
          <main className='holy-grail-content fade-in'>
            <div className='part2-main-row'>
              <div className='part3-grid-container'>
                <TextareaAutosize
                  className='part3-option-top-left part3-option-input part3-input '
                  placeholder={optionPlaceholder}
                  defaultValue={topLeft}
                  onChange={handleTopLeftChange}
                  rowsMin='1'
                />
                <TextareaAutosize
                  className='part3-question-centre part3-input'
                  placeholder='enter question'
                  defaultValue={question}
                  onChange={handleQuestionChange}
                  rowsMin='1'
                />
                <TextareaAutosize
                  className='part3-option-top-right part3-input part3-option-input'
                  placeholder={optionPlaceholder}
                  defaultValue={topRight}
                  onChange={handleTopRightChange}
                  rowsMin='1'
                />
                <TextareaAutosize
                  className='part3-option-bottom-left part3-input part3-option-input'
                  placeholder={optionPlaceholder}
                  defaultValue={bottomLeft}
                  onChange={handleBottomLeftChange}
                  rowsMin='1'
                />

                <TextareaAutosize
                  className='part3-option-bottom-centre part3-input part3-option-input'
                  placeholder={optionPlaceholder}
                  defaultValue={bottomCentre}
                  onChange={handleBottomCentreChange}
                  rowsMin='1'
                />

                <TextareaAutosize
                  className='part3-option-bottom-right part3-input part3-option-input '
                  placeholder={optionPlaceholder}
                  defaultValue={bottomRight}
                  onChange={handleBottomRightChange}
                  rowsMin='1'
                />

                <Part3Lines
                  windowDimensions={windowDimensions}
                  lineClass={lineClass}
                />
              </div>
              <div className='tool-bar-row'>
                {authorId && <CreatorInfo authorId={authorId} />}

                <div className='tool-btn-container'>
                  <PublishPart3WarningModal
                    bottomCentre={bottomCentre}
                    bottomLeft={bottomLeft}
                    bottomRight={bottomRight}
                    creatorId={authorId}
                    question={question}
                    questionTwo={'question two placeholder'}
                    topLeft={topLeft}
                    topRight={topRight}
                    tags={testTags}
                    changesSaved={changesSaved}
                    setChangesSaved={setChangesSaved}
                    docRef={docRef}
                    setDocRef={handleSetDocRef}
                  />
                  {docRef && (
                    <Link
                      to={{
                        pathname: `/FCEPart3/${docRef}`,
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
