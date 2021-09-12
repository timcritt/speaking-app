import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import CreatorInfo from 'components/common/CreatorInfo';
import { Fragment } from 'react';
import deleteTest from 'APIHandlers/deleteTest';
import { TextareaAutosize } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import SideBarTags from 'components/common/SideBarTags';
import PublishPart3WarningModal from 'components/Part3Common/PublishPart3WarningModal';
import Part3Lines from 'components/Part3Common/Part3Lines';
import LinearProgress from '@material-ui/core/LinearProgress';
import debounce from 'auxFunctions/debounce';
import { useHistory } from 'react-router-dom';

const EditPart3 = ({ context, testType, ...props }) => {
  const handleFullScreen = useFullScreenHandle();
  const optionPlaceholder = 'option';

  const [lineClass, setLineClass] = useState('');
  const [windowDimensions, setWindowDimensions] = useState({
    height: null,
    width: null,
  });
  var history = useHistory();

  const hideLines = () => {
    setLineClass('line-hidden');
  };
  const showLines = () => {
    setLineClass('');
  };

  const handleResize = useCallback(() => {
    setWindowDimensions({
      height: window.innerHeight,
      width: window.innerWidth,
    });
    showLines();
    console.log('lines redrawn');
  }, []);

  const debouncedHandleResize = debounce(handleResize, 200);

  const handleDeleteTest = async () => {
    await deleteTest(context.docRef, testType);
    context.clearState();
    history.push(`/Edit${testType}/new`);
  };

  useEffect(() => {
    //sends the id of the current test to be displayed to the FCEPart2 context
    if (props.match.params.id !== 'new') {
      context.setDocRef(props.match.params.id);
    } else {
      context.clearState();
      //handleResize();
    }
    if (context.hasFetched) {
      handleResize();
    }
  }, [props.match.params.id]);

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
  }, [debouncedHandleResize, handleResize]);

  function handleSetDocRef(docRef) {
    context.setDocRef(docRef);
  }

  const handleQuestionChange = (e) => {
    context.setQuestionOne(e.currentTarget.value);
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
        <FullScreen handle={handleFullScreen}>
          <main className='holy-grail-content fade-in'>
            <div className='part2-main-row'>
              <div className='part3-grid-container'>
                <TextareaAutosize
                  className='part3-option-top-left part3-option-input part3-input '
                  placeholder={optionPlaceholder}
                  value={context.topLeft}
                  onChange={handleTopLeftChange}
                  rowsMin='1'
                />
                <TextareaAutosize
                  className='part3-question-centre part3-input'
                  placeholder='enter question'
                  value={context.questionOne}
                  onChange={handleQuestionChange}
                  rowsMin='1'
                />
                <TextareaAutosize
                  className='part3-option-top-right part3-input part3-option-input'
                  placeholder={optionPlaceholder}
                  value={context.topRight}
                  onChange={handleTopRightChange}
                  rowsMin='1'
                />
                <TextareaAutosize
                  className='part3-option-bottom-left part3-input part3-option-input'
                  placeholder={optionPlaceholder}
                  value={context.bottomLeft}
                  onChange={handleBottomLeftChange}
                  rowsMin='1'
                />
                <TextareaAutosize
                  className='part3-option-bottom-centre part3-input part3-option-input'
                  placeholder={optionPlaceholder}
                  value={context.bottomCentre}
                  onChange={handleBottomCentreChange}
                  rowsMin='1'
                />
                <TextareaAutosize
                  className='part3-option-bottom-right part3-input part3-option-input '
                  placeholder={optionPlaceholder}
                  value={context.bottomRight}
                  onChange={handleBottomRightChange}
                  rowsMin='1'
                />
                <Part3Lines windowDimensions={windowDimensions} lineClass={lineClass} />
              </div>
              <div className='part2-edit-question-container part3-questionTwo-container'>
                <label className='part2-question-input-label' htmlFor='question-2'>
                  Question 2
                </label>
                <input
                  label='question-2'
                  className='input question-input'
                  defaultValue={context.shortTurnQuestion}
                  placeholder='enter second question'
                  onChange={(e) => context.setShortTurnQuestion(e.currentTarget.value)}
                />
              </div>
              <div className='tool-bar-row'>
                {context.creatorId && <CreatorInfo creatorId={context.creatorId} />}
                <div className='tool-btn-container'>
                  <PublishPart3WarningModal
                    bottomCentre={context.bottomCentre}
                    bottomLeft={context.bottomLeft}
                    bottomRight={context.bottomRight}
                    creatorId={context.creatorId}
                    questionOne={context.questionOne}
                    shortTurnQuestion={context.shortTurnQuestion}
                    topLeft={context.topLeft}
                    topRight={context.topRight}
                    tags={context.testTags}
                    changesSaved={context.changesSaved}
                    setChangesSaved={context.setChangesSaved}
                    docRef={context.docRef}
                    setDocRef={handleSetDocRef}
                    testType={testType}
                  />
                  {context.docRef && (
                    <Link
                      to={{
                        pathname: `/${testType}/${context.docRef}`,
                      }}
                    >
                      <button className='tool-bar-btn'>
                        <VisibilityOutlinedIcon />
                      </button>
                    </Link>
                  )}
                  <button className='tool-bar-btn' onClick={handleDeleteTest}>
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
