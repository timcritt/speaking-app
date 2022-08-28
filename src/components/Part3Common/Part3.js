import React, { useState, useEffect, useContext, useCallback, Fragment, useRef } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { firebaseAuth } from 'context/AuthProvider';
import LinearProgress from '@material-ui/core/LinearProgress';
import Part3Lines from 'components/Part3Common/Part3Lines';
// import debounce from 'auxFunctions/debounce';
import throttle from 'lodash/throttle';
import TestToolBar from 'components/TestCommon/TestToolBar';
import ToolBarButtonsView from 'components/TestCommon/ToolBarButtonsView';
import Timer from 'components/common/Timer';

import Part2QuestionRow from 'components/TestCommon/Part2QuestionRow';

import styles from './Part3.module.css';

//hooks
// import useToggleShortTurn from 'hooks/useToggleShortTurn';

const Part3 = (props) => {
  const { userId } = useContext(firebaseAuth);
  const handleFullScreen = useFullScreenHandle();
  const context = useContext(props.part3Context);
  const [lineClass, setLineClass] = useState('');
  const [questionClass, setQuestionClass] = useState('');
  const [questionTwoVisible, setQuestionTwoVisible] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    height: null,
    width: null,
  });

  const longTime = '12000';
  const shortTime = '6000';

  const [time, setTime] = useState(longTime);

  const hideLines = () => {
    setLineClass('line-hidden');
  };
  const showLines = () => {
    setLineClass('');
  };

  const timeout = useRef();

  const handleDebounce = () => {
    //Clear the previous timeout.
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      handleResize();
    }, 600);
  };

  const handleResize = useCallback(() => {
    setWindowDimensions({
      height: window.innerHeight,
      width: window.innerWidth,
    });
    showLines();
    console.log('lines redrawn');
  }, []);

  useEffect(() => {
    //instantly hides the lines on window resize to prevent ugly jumping of lines between positions.
    window.addEventListener('resize', hideLines);
    //listens for window resize and redraws the lines between text areas after a set time. Sets lines to visible when done.
    window.addEventListener('resize', handleDebounce);
    window.addEventListener('fullscreenchange', handleResize);
    //cleanup function - removes listeners on unmount
    return () => {
      window.removeEventListener('resize', hideLines);
      window.removeEventListener('resize', handleDebounce);
      window.removeEventListener('fullscreenchange', handleResize);
    };
  }, [handleResize]);

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
  }, [context, context.hasFetched, handleResize, props.match.params.id]);

  if (context.hasFetched) {
    return (
      <Fragment>
        <FullScreen handle={handleFullScreen}>
          <main className='holy-grail-content fade-in'>
            <div className={styles.container}>
              <div className={`${styles.grid_container} part3-grid-container`}>
                <div className={`${styles.top_left}`}>
                  <div className={styles.option_container}>{context.topLeft}</div>
                </div>

                <div className={`${styles.centre} part3-question-container part3-question-centre`}>
                  <Part2QuestionRow
                    longTurnQuestions={[context.questionOne]}
                    shortTurnQuestion={context.shortTurnQuestion}
                    setTime={setTime}
                    longTime={longTime}
                    shortTime={shortTime}
                  />
                </div>
                <div className={styles.top_right}>
                  <div className={styles.option_container}>{context.topRight}</div>
                </div>
                <div className={styles.bottom_left}>
                  <div className={styles.option_container}>{context.bottomLeft}</div>
                </div>
                <div className={styles.bottom_centre}>
                  <div className={styles.option_container}>{context.bottomCentre}</div>
                </div>
                <div className={styles.bottom_right}>
                  <div className={styles.option_container}>{context.bottomRight}</div>
                </div>
                <Part3Lines
                  windowDimensions={windowDimensions}
                  lineClass={lineClass}
                  top_left={styles.top_left}
                  top_right={styles.top_right}
                  bottom_left={styles.bottom_left}
                  bottom_right={styles.bottom_right}
                  bottom_centre={styles.bottom_centre}
                  centre={styles.centre}
                />
              </div>
              <div className={styles.tool_bar_container}>
                <TestToolBar
                  creatorId={context.creatorId}
                  timer={<Timer time={time} />}
                  buttons={
                    <ToolBarButtonsView
                      userId={userId}
                      creatorId={context.creatorId}
                      testType={props.testType}
                      docRef={context.docRef}
                      handleFullScreen={handleFullScreen}
                    />
                  }
                />
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
