import React, { Fragment, useState, useContext } from 'react';
//Context
import { CAEPart2Context } from 'context/CAEPart2Context';
//3rd party modules
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
//custom modules
import LinearProgress from '@material-ui/core/LinearProgress';
import Part2QuestionRow from 'components/TestCommon/Part2QuestionRow';
import TestToolBar from 'components/TestCommon/TestToolBar';
import useLoadTestIntoComponent from 'hooks/useLoadTestIntoComponent';
import Timer from 'components/common/Timer';
import ToolBarButtonsView from 'components/TestCommon/ToolBarButtonsView';

//CSS Modules
import styles from './CAEPart2View.module.css';

const CAEPart2View = (props) => {
  const context = useContext(CAEPart2Context);
  const handleFullScreen = useFullScreenHandle();
  const [time, setTime] = useState(6000);

  useLoadTestIntoComponent(
    context.setDocRef,
    context.clearState,
    context.fetchTest,
    context.unsavedChanges,
    context.setUnsavedChanges,
    props.match.params.id
  );

  if (context.hasFetched) {
    return (
      <Fragment>
        <FullScreen handle={handleFullScreen}>
          <main className='holy-grail-content fade-in'>
            <div className={styles.container}>
              <div className={styles.question_row}>
                <Part2QuestionRow
                  longTurnQuestions={[context.questionOne, context.questionTwo]}
                  shortTurnQuestion={context.shortTurnQuestion}
                  setTime={setTime}
                />
              </div>
              <div className={styles.left_image_container}>
                <img src={context.imageOneUrl} />
              </div>
              <div className={styles.centre_image_container}>
                <img src={context.imageTwoUrl} />
              </div>
              <div className={styles.right_image_container}>
                <img src={context.imageThreeUrl} />
              </div>
              <TestToolBar
                creatorId={context.creatorId}
                timer={<Timer time={time} />}
                buttons={
                  <ToolBarButtonsView
                    testType={'CAEPart2'}
                    handleFullScreen={handleFullScreen}
                    docRef={context.docRef}
                  />
                }
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

export default CAEPart2View;
