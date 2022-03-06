import React, { Fragment, useState, useContext } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
//context
import { firebaseAuth } from 'context/AuthProvider';
import { FCEPart2Context } from 'context/FCEPart2Context';
//3rd party components
import LinearProgress from '@material-ui/core/LinearProgress';
//custom components
import TestToolBar from 'components/TestCommon/TestToolBar';
import Part2QuestionRow from 'components/TestCommon/Part2QuestionRow';
import ToolBarButtonsFCEPart2 from '../TestCommon/ToolBarButtonsView';
import Timer from 'components/common/Timer';
//constants
import { FCEPart2 } from 'APIHandlers/firebaseConsts';
//custom hooks
import useLoadTestIntoComponent from 'hooks/useLoadTestIntoComponent';

//CSS Modules
import styles from './FCEPart2View.module.css';

const FCEPart2View = (props) => {
  const context = useContext(FCEPart2Context);
  const { userId } = useContext(firebaseAuth);
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

  const buttons = (
    <ToolBarButtonsFCEPart2
      userId={userId}
      creatorId={context.creatorId}
      testType={FCEPart2}
      docRef={context.docRef}
      handleFullScreen={handleFullScreen}
    />
  );

  if (context.hasFetched) {
    return (
      <Fragment>
        <FullScreen handle={handleFullScreen}>
          <main className='holy-grail-content fade-in'>
            <div className={styles.container}>
              <div className={styles.question_row}>
                <Part2QuestionRow
                  longTurnQuestions={[context.questionOne]}
                  shortTurnQuestion={context.shortTurnQuestion}
                  setTime={setTime}
                />
              </div>

              <div className={styles.left_image_container}>
                <img src={context.imageOneUrl} />
              </div>
              <div className={styles.right_image_container}>
                <img src={context.imageTwoUrl} />
              </div>
              <div className={styles.tool_bar_container}>
                <TestToolBar
                  creatorId={context.creatorId}
                  timer={<Timer time={time} />}
                  buttons={buttons}
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

export default FCEPart2View;
