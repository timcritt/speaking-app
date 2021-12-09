import React, { useState, useEffect, useContext, useCallback, Fragment } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { firebaseAuth } from 'context/AuthProvider';
import LinearProgress from '@material-ui/core/LinearProgress';
import Part3Lines from 'components/Part3Common/Part3Lines';
import debounce from 'auxFunctions/debounce';
import TestToolBarView from 'components/TestCommon/TestToolBarView';

const Part3 = (props) => {
  const { userId } = useContext(firebaseAuth);
  const handleFullScreen = useFullScreenHandle();
  const context = useContext(props.context);
  const [lineClass, setLineClass] = useState('');
  const [questionClass, setQuestionClass] = useState('');
  const [questionTwoVisible, setQuestionTwoVisible] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    height: null,
    width: null,
  });

  const [time, setTime] = useState(12000);
  const handleViewShortTurnClick = () => {
    hideLines();
    setQuestionTwoVisible((prevState) => !prevState);
  };
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
  }, [setWindowDimensions]);

  const debouncedHandleResize = debounce(handleResize, 250);

  useEffect(() => {
    //instantly hides the lines on window resize to prevent ugly jumping of lines between positions.
    window.addEventListener('resize', hideLines);
    //listens for window resize and redraws the lines between text areas after a set time. Sets lines to visible when done.
    window.addEventListener('resize', debouncedHandleResize);
    window.addEventListener('fullscreenchange', debouncedHandleResize);
    //cleanup function - removes listeners on unmount
    return () => {
      window.removeEventListener('resize', hideLines);
      window.removeEventListener('resize', debouncedHandleResize);
      window.removeEventListener('fullscreenchange', handleResize);
    };
  }, [debouncedHandleResize, handleResize]);

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

  useEffect(() => {
    if (!questionTwoVisible) {
      setTime(12000);
      setQuestionClass('');
    } else {
      setTime(6000);
      setQuestionClass('flipped-vertically');
    }
    debouncedHandleResize();
  }, [questionTwoVisible]);

  if (context.hasFetched) {
    return (
      <Fragment>
        <FullScreen handle={handleFullScreen}>
          <main className='holy-grail-content fade-in'>
            <div className='part2-main-row'>
              <button className={'short-turn-button '} onClick={handleViewShortTurnClick}>
                show question 2
              </button>
              <div className='part3-grid-container'>
                <div className='part3-option-top-left part3-input'>{context.topLeft}</div>

                <div className='part3-question-container flip-card'>
                  <div className={`flip-card-inner part3-question-centre ${questionClass}`}>
                    <div className='flip-card-front'>
                      <span className='part3-question-text'>{context.questionOne}</span>
                    </div>
                    <div className='flip-card-back'>
                      <span className='part3-question-text'>{context.shortTurnQuestion}</span>
                    </div>
                  </div>
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
                <Part3Lines windowDimensions={windowDimensions} lineClass={lineClass} />
              </div>
              <TestToolBarView
                creatorId={context.creatorId}
                userId={userId}
                docRef={context.docRef}
                time={time}
                handleFullScreen={handleFullScreen}
                testType={props.testType}
              />
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
