import React, { useState, useEffect } from 'react';

const Part2QuestionRow = ({
  longTurnQuestions,
  shortTurnQuestion,
  setTime,
}) => {
  const [shortTurnVisible, setShortTurnVisible] = useState(false);
  const handleViewShortTurnClick = () => {
    setShortTurnVisible((prevState) => !prevState);
  };
  const [questionClass, setQuestionClass] = useState('');
  const dataNotLoadedErrorMessage = 'ERROR: missing data';

  useEffect(() => {
    if (!shortTurnVisible) {
      setTime(6000);
      setQuestionClass('');
    } else {
      setTime(2000);
      setQuestionClass('flipped-vertically');
    }
  }, [shortTurnVisible]);

  return (
    <div className='part2-edit-question-row'>
      <div className='flip-card-CAE-part2'>
        <div className={`flip-card-inner-CAE-part2  ${questionClass}`}>
          <div className='flip-card-front-CAE-part2'>
            <div className='part2-question-questions-and-button-container'>
              <div className='part2-question-flex-column'>
                <div className='part2-edit-question-container'>
                  <ul>
                    {longTurnQuestions.map((question) => {
                      return (
                        <li className='part2-question-text'>{question}</li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className='tool-bar-toggleTurn-container'>
                <button
                  className={'short-turn-button CAE-part2-short-turn-button '}
                  onClick={handleViewShortTurnClick}
                >
                  show short turn
                </button>
              </div>
            </div>
          </div>
          <div className='flip-card-back-vertical'>
            <div className='part2-question-questions-and-button-container'>
              <div className='part2-question-flex-column'>
                <div className='part2-edit-question-container'>
                  <ul>
                    <li className='part2-question-text'>
                      {shortTurnQuestion
                        ? shortTurnQuestion
                        : dataNotLoadedErrorMessage}
                    </li>
                  </ul>
                </div>
              </div>
              <div className='tool-bar-toggleTurn-container'>
                <button
                  className={'short-turn-button CAE-part2-short-turn-button '}
                  onClick={handleViewShortTurnClick}
                >
                  show long turn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Part2QuestionRow;
