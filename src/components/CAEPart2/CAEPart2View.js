import React, { Fragment, useState, useEffect, useContext } from 'react';
//Context
import { firebaseAuth } from 'context/AuthProvider';
import { CAEPart2Context } from 'context/CAEPart2Context';
//3rd party modules
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
//custom modules
import LinearProgress from '@material-ui/core/LinearProgress';
import Part2QuestionRow from 'components/TestCommon/Part2QuestionRow';
import TestToolBarView from 'components/TestCommon/TestToolBarView';
import ExamPicture from 'components/FCEPart2/ExamPicture';

const CAEPart2View = (props) => {
  const context = useContext(CAEPart2Context);
  const { userId } = useContext(firebaseAuth);
  const handleFullScreen = useFullScreenHandle();
  const [time, setTime] = useState(6000);

  useEffect(() => {
    //sends the id of the current test to be displayed to the CAEPart2 context
    context.setDocRef(props.match.params.id);
  }, [context, props.match.params.id]);

  if (context.hasFetched) {
    console.log(context.creatorId);
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
              <TestToolBarView
                creatorId={context.creatorId}
                userId={userId}
                docRef={context.docRef}
                time={time}
                handleFullScreen={handleFullScreen}
                testType={'CAEPart2'}
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
