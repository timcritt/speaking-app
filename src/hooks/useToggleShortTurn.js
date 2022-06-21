import { useEffect } from 'react';

const useToggleShortTurn = (
  shortTurnVisible,
  shortTurnTime,
  longTermTime,
  setTime,
  setQuestionClass,
  questionClass
) => {
  useEffect(() => {
    if (!shortTurnVisible) {
      setTime(shortTurnTime);
      setQuestionClass('');
    } else {
      setTime(longTermTime);
      setQuestionClass(questionClass);
    }
  }, [setTime, shortTurnVisible]);
};

export default useToggleShortTurn;
