import React, { useState, createContext, useEffect } from 'react';
import getTest from 'APIHandlers/getTest';

export const CAEPart2Context = createContext();

export const CAEPart2ContextProvider = ({ children }) => {
  const [questionOne, setQuestionOne] = useState('');
  const [questionTwo, setQuestionTwo] = useState('');
  const [shortTurnQuestion, setShortTurnQuestion] = useState('');
  const [imageOneUrl, setImageOneUrl] = useState(null);
  const [imageTwoUrl, setImageTwoUrl] = useState(null);
  const [imageThreeUrl, setImageThreeUrl] = useState(null);
  const [imageOneRef, setImageOneRef] = useState(null);
  const [imageTwoRef, setImageTwoRef] = useState(null);
  const [imageThreeRef, setImageThreeRef] = useState(null);
  const [testTags, setTestTags] = useState([]);
  const [docRef, setDocRef] = useState(null);
  const [authorId, setAuthorId] = useState(null);
  const [shortTurnVisible, setShortTurnVisible] = useState(false);
  const [time, setTime] = useState(6000);
  const [hasFetched, setHasFetched] = useState(false);

  const clearState = () => {
    setQuestionOne('');
    setQuestionTwo('');
    setShortTurnQuestion('');
    setImageOneUrl(null);
    setImageTwoUrl(null);
    setImageThreeUrl(null);
    setImageOneRef(null);
    setImageTwoRef(null);
    setImageThreeRef(null);
    setTestTags([]);
    setDocRef(null);
    setAuthorId(null);
    setShortTurnVisible(false);
  };

  // docRef is updated from the params from within the component displaying the context.
  // UseEffect only runs if the component requires a different test to the previous one displayed.
  useEffect(() => {
    setHasFetched(false);
    if (docRef) {
      getTest('CAEPart2', docRef).then((data) => {
        if (data) {
          setImageOneUrl(data.imageOneUrl);
          setImageTwoUrl(data.imageTwoUrl);
          setImageThreeUrl(data.imageThreeUrl);
          setImageOneRef(data.imageOneRef);
          setImageTwoRef(data.imageTwoRef);
          setImageThreeRef(data.imageThreeRef);
          setQuestionOne(data.questionOne);
          setQuestionTwo(data.questionTwo);
          setShortTurnQuestion(data.shortTurnQuestion);
          setAuthorId(data.userId);
          setTestTags(data.tags);
          setHasFetched(true);
        }
      });
    } else {
      setHasFetched(true);
    }
  }, [docRef]);

  return (
    <CAEPart2Context.Provider
      value={{
        questionOne,
        setQuestionOne,
        questionTwo,
        setQuestionTwo,
        shortTurnQuestion,
        setShortTurnQuestion,
        imageOneUrl,
        setImageOneUrl,
        imageTwoUrl,
        setImageTwoUrl,
        imageThreeUrl,
        setImageThreeUrl,
        imageOneRef,
        setImageOneRef,
        imageTwoRef,
        setImageTwoRef,
        imageThreeRef,
        setImageThreeRef,
        testTags,
        setTestTags,
        docRef,
        setDocRef,
        authorId,
        setAuthorId,
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
    </CAEPart2Context.Provider>
  );
};
