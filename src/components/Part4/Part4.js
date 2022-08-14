import React, { Fragment } from 'react';

//custom components
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import TestToolBar from 'components/TestCommon/TestToolBar';
import ToolBarButtonsView from 'components/TestCommon/ToolBarButtonsView';
import Timer from 'components/common/Timer';
import GrabSlider from 'components/common/GrabSlider/GrabSlider';

//Custom Hooks
import useLoadTestIntoComponent from 'hooks/useLoadTestIntoComponent';

//styles
import styles from './Part4.module.css';

const Part4 = (props) => {
  const handleFullScreen = useFullScreenHandle();

  useLoadTestIntoComponent(
    props.setDocRef,
    props.clearState,
    props.fetchTest,
    props.unsavedChanges,
    props.setUnsavedChanges,
    props.match.params.id
  );

  return (
    <Fragment>
      <FullScreen handle={handleFullScreen}>
        <main className='holy-grail-content fade-in'>
          <div className={styles.part4_container}>
            <div className={styles.content_container}>
              <span className={styles.title}>FCE Part 4</span>

              <div className={styles.question_container}>
                <span>{props.questionOne}</span>
                <span>{props.questionTwo}</span>
                <span>{props.questionThree}</span>
                <span>{props.questionFour}</span>
                {props.questionFive && <span>{props.questionFive}</span>}
                {props.questionSix && <span>{props.questionSix}</span>}
              </div>

              {props.hasFetched && <GrabSlider testTags={props.testTags} />}
            </div>
            <div className={styles.tool_bar_container}>
              <TestToolBar
                creatorId={props.creatorId ? props.creatorId : '1'}
                timer={<Timer time={props.time} />}
                buttons={
                  <ToolBarButtonsView
                    userId={props.creatorId}
                    creatorId={props.creatorId}
                    testType={'FCEPart4'}
                    docRef={props.docRef}
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
};

export default Part4;
