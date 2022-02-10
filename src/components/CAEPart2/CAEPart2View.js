import React, { Fragment, useState, useContext } from 'react';
//Context
import { CAEPart2Context } from 'context/CAEPart2Context';
//3rd party modules
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
//custom modules
import LinearProgress from '@material-ui/core/LinearProgress';
import Part2QuestionRow from 'components/TestCommon/Part2QuestionRow';
import TestToolBar from 'components/TestCommon/TestToolBar';
import ExamPicture from 'components/FCEPart2/ExamPicture';
import useLoadTestIntoComponent from 'hooks/useLoadTestIntoComponent';
import Timer from 'components/common/Timer';
import ToolBarButtonsView from 'components/TestCommon/ToolBarButtonsView';

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
            <div className='part2-main-row'>
              <Part2QuestionRow
                longTurnQuestions={[context.questionOne, context.questionTwo]}
                shortTurnQuestion={context.shortTurnQuestion}
                setTime={setTime}
              />
              <div className='CAE-part2-image-row'>
                <div className='part2-image-container-left'>
                  <ExamPicture image={context.imageOneUrl} setImage={context.setImageOneUrl} />
                </div>
                <div className='part2-image-container-centre'>
                  <ExamPicture image={context.imageTwoUrl} setImage={context.setImageTwoUrl} />
                </div>
                <div className='part2-image-container-right'>
                  <ExamPicture image={context.imageThreeUrl} setImage={context.setImageThreeUrl} />
                </div>
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
