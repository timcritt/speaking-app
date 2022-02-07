import React, { Fragment, useState, useContext } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
//context
import { firebaseAuth } from 'context/AuthProvider';
import { FCEPart2Context } from 'context/FCEPart2Context';
//3rd party components
import LinearProgress from '@material-ui/core/LinearProgress';
//custom components
import ExamPicture from 'components/FCEPart2/ExamPicture';
import TestToolBar from 'components/TestCommon/TestToolBar';
import Part2QuestionRow from 'components/TestCommon/Part2QuestionRow';
import ToolBarButtonsFCEPart2 from '../TestCommon/ToolBarButtonsView';
import Timer from 'components/common/Timer';
//constants
import { FCEPart2 } from 'APIHandlers/firebaseConsts';
//custom hooks
import useLoadTestIntoComponent from 'hooks/useLoadTestIntoComponent';

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
            <div className='part2-main-row'>
              <Part2QuestionRow
                longTurnQuestions={[context.questionOne]}
                shortTurnQuestion={context.shortTurnQuestion}
                setTime={setTime}
              />
              <div className='part2-image-row'>
                <div className='part2-image-container-left'>
                  <ExamPicture image={context.imageOneUrl} setImage={context.setImageOneUrl} />
                </div>
                <div className='part2-image-container-right'>
                  <ExamPicture image={context.imageTwoUrl} setImage={context.setImageTwoUrl} />
                </div>
              </div>
              <TestToolBar
                creatorId={context.creatorId}
                timer={<Timer time={time} />}
                buttons={buttons}
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

export default FCEPart2View;
