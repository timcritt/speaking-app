import React, { useState, createContext, useEffect } from 'react';
import getTest from 'APIHandlers/getTest';

export const FCEPart2Context = createContext();

export const FCEPart2ContextProvider = ({ children }) => {
  const [questionOne, setQuestionOne] = useState('');
  const [shortTurnQuestion, setShortTurnQuestion] = useState('');
  const [imageOneUrl, setImageOneUrl] = useState(null);
  const [imageTwoUrl, setImageTwoUrl] = useState(null);
  const [imageOneRef, setImageOneRef] = useState(null);
  const [imageTwoRef, setImageTwoRef] = useState(null);
  const [testTags, setTestTags] = useState([]);
  const [docRef, setDocRef] = useState(null);
  const [creatorId, setCreatorId] = useState(null);
  const [shortTurnVisible, setShortTurnVisible] = useState(false);
  const [time, setTime] = useState(6000);
  const [hasFetched, setHasFetched] = useState(false);

  const clearState = () => {
    setQuestionOne('');
    setShortTurnQuestion('');
    setImageOneUrl(null);
    setImageTwoUrl(null);
    setImageOneRef(null);
    setImageTwoRef(null);
    setTestTags([]);
    setDocRef(null);
    setCreatorId(null);
    setShortTurnVisible(false);
  };

  // docRef is updated from the params from within the component displaying the context.
  // UseEffect only runs if the component requires a different test to the previous one displayed.
  useEffect(() => {
    setHasFetched(false);
    if (docRef) {
      getTest('FCEPart2', docRef).then((data) => {
        if (data) {
          setImageOneUrl(data.imageOneUrl);
          setImageTwoUrl(data.imageTwoUrl);
          setImageOneRef(data.imageOneRef);
          setImageTwoRef(data.imageTwoRef);
          setQuestionOne(data.questionOne);
          setShortTurnQuestion(data.shortTurnQuestion);
          setCreatorId(data.creatorId);
          setTestTags(data.tags);
          setHasFetched(true);
        }
      });
    } else {
      setHasFetched(true);
    }
  }, [docRef]);

  return (
    <FCEPart2Context.Provider
      value={{
        questionOne,
        setQuestionOne,
        shortTurnQuestion,
        setShortTurnQuestion,
        imageOneUrl,
        setImageOneUrl,
        imageTwoUrl,
        setImageTwoUrl,
        imageOneRef,
        setImageOneRef,
        imageTwoRef,
        setImageTwoRef,
        testTags,
        setTestTags,
        docRef,
        setDocRef,
        creatorId,
        setCreatorId,
        shortTurnVisible,
        setShortTurnVisible,
        time,
        setTime,
        hasFetched,
        setHasFetched,
        clearState,
      }}
    >
      {children}
    </FCEPart2Context.Provider>
  );
};
