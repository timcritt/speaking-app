import React, { Fragment, useState, useEffect, useContext } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
//context
import { firebaseAuth } from 'context/AuthProvider';
import { FCEPart2Context } from 'context/FCEPart2Context';
//3rd party components
import ExamPicture from 'components/FCEPart2/ExamPicture';
import TestToolBarView from 'components/TestCommon/TestToolBarView';
import Part2QuestionRow from 'components/TestCommon/Part2QuestionRow';
//custom components
import LinearProgress from '@material-ui/core/LinearProgress';
//constants
import { FCEPart2 } from 'APIHandlers/firebaseConsts';

const FCEPart2View = (props) => {
  const context = useContext(FCEPart2Context);
  const { userId } = useContext(firebaseAuth);
  const handleFullScreen = useFullScreenHandle();
  const [time, setTime] = useState(6000);

  useEffect(() => {
    //sends the id of the current test to be displayed to the FCEPart2 context
    context.setDocRef(props.match.params.id);
  }, []);

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
              <TestToolBarView
                creatorId={context.creatorId}
                userId={userId}
                docRef={context.docRef}
                time={time}
                handleFullScreen={handleFullScreen}
                testType={FCEPart2}
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
