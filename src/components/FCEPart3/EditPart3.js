import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useGetTest from '../../hooks/useGetTest';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import Modal from '../common/Modal';
import AddToMyFolders from '../common/AddToMyFolders';
import CreatorInfo from '../common/CreatorInfo';
import { Fragment } from 'react';
import LineTo from 'react-lineto';
import { TextareaAutosize } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import SideBarTags from '../common/SideBarTags';
//mport PublishPart3WarningModal from './PublishPart3WarningModal';

const EditPart3 = (props) => {
  const [question, setQuestion] = useState('');
  const [topLeft, setTopLeft] = useState('');
  const [topRight, setTopRight] = useState('');
  const [bottomLeft, setBottomLeft] = useState('');
  const [bottomCentre, setBottomCentre] = useState('');
  const [bottomRight, setBottomRight] = useState('');
  const [lineClass, setLineClass] = useState('');
  const [testTags, setTags] = useState([]);
  const [docRef, setDocRef] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [AddToFolderModalOpen, setAddToFolderModalOpen] = useState(false);
  const handleFullScreen = useFullScreenHandle();
  const optionPlaceholder = 'option';

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
  var test = useGetTest('Part3', props.match.params.id);

  useEffect(() => {
    if (test) {
      setDocRef(test.id);
      setQuestion(test.question);
      setTopLeft(test.topLeft);
      setTopRight(test.topRight);
      setBottomCentre(test.bottomCentre);
      setBottomLeft(test.bottomLeft);
      setBottomRight(test.bottomRight);
      setAuthorId(test.userId);
      //draws the lines in the correct positions after test load
      handleResize();
    }
  }, [test]);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.currentValue);
    setTimeout(function () {
      handleResize();
    }, 100);
  };

  const handleTopLeftChange = (e) => {
    setTopLeft(e.target.currentValue);
    setTimeout(function () {
      handleResize();
    }, 100);
  };

  const handleTopRightChange = (e) => {
    setTopRight(e.target.currentValue);
    setTimeout(function () {
      handleResize();
    }, 100);
  };
  const handleBottomLeftChange = (e) => {
    setBottomLeft(e.target.currentValue);
    setTimeout(function () {
      handleResize();
    }, 100);
  };

  const handleBottomCentreChange = (e) => {
    setBottomCentre(e.target.currentValue);
    setTimeout(function () {
      handleResize();
    }, 100);
  };
  const handleBottomRightChange = (e) => {
    setBottomRight(e.target.currentValue);
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

  return (
    <Fragment>
      <div className='side-bar-left-tags hg-sidebar '>
        <SideBarTags
          tags={testTags}
          handleSetTags={handleSetTags}
          title={'Topic Tags'}
        >
          <p className='advice-text tag-advice'>
            Adding the correct tags will help others find your test
          </p>
        </SideBarTags>
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
                className='part3-question-input part3-input'
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
              <div
                className={`fade-in line-container`}
                inner={windowDimensions}
              >
                <LineTo
                  className={`line ${lineClass}`}
                  borderColor={'#dbdbdb'}
                  zIndex={0}
                  within={'part3-grid-container'}
                  from='part3-option-top-left'
                  to='part3-question-input'
                  innerState={windowDimensions}
                />
                <LineTo
                  className={`line ${lineClass}`}
                  borderColor={'#dbdbdb'}
                  within={'part3-grid-container'}
                  from='part3-option-top-right'
                  to='part3-question-input'
                  innerState={windowDimensions}
                />
                <LineTo
                  className={`line ${lineClass}`}
                  borderColor={'#dbdbdb'}
                  within={'part3-grid-container'}
                  from='part3-option-bottom-left'
                  to='part3-question-input'
                  innerState={windowDimensions}
                />
                <LineTo
                  className={`line ${lineClass}`}
                  borderColor={'#dbdbdb'}
                  within={'part3-grid-container'}
                  from='part3-option-bottom-centre'
                  to='part3-question-input'
                  innerState={windowDimensions}
                />
                <LineTo
                  className={`line ${lineClass}`}
                  borderColor={'#dbdbdb'}
                  within={'part3-grid-container'}
                  from='part3-option-bottom-right'
                  to='part3-question-input'
                  innerState={windowDimensions}
                />
              </div>
            </div>
            <div className='tool-bar-row'>
              {authorId && <CreatorInfo authorId={authorId} />}

              <div className='tool-btn-container'>
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
};

export default EditPart3;
