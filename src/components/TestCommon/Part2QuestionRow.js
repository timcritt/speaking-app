import React, { useState, useEffect } from 'react';
import { uniqueId } from 'lodash';

//CSS module
import styles from './Part2QuestionRow.module.css';

const Part2QuestionRow = ({ longTurnQuestions, shortTurnQuestion, setTime }) => {
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
      setQuestionClass(styles.flipped_vertically);
    }
  }, [setTime, shortTurnVisible]);

  return (
    <div className={styles.container} onClick={handleViewShortTurnClick}>
      <div className={styles.flip_card_container}>
        <div className={`${styles.flip_card_inner} ${questionClass}`}>
          <div className={`${styles.flip_card_front} ${styles.flip_card_face}`}>
            <div className={styles.question_text_container}>
              <ul>
                {longTurnQuestions.map((question) => {
                  return (
                    <li key={uniqueId()} className={styles.question_text}>
                      {question}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className={`${styles.flip_card_back_vertical} + ${styles.flip_card_face}`}>
            <div className={styles.question_text_container}>
              <ul className={styles.question_text}>
                <span>short turn: </span>
                {shortTurnQuestion ? shortTurnQuestion : dataNotLoadedErrorMessage}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Part2QuestionRow;
