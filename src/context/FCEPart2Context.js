import React, { useState, createContext, useEffect } from 'react';
import getTest from 'APIHandlers/getTest';

export const FCEPart2Context = createContext();

export const FCEPart2ContextProvider = ({ children }) => {
  const [question, setQuestion] = useState('');
  const [shortTurnQuestion, setShortTurnQuestion] = useState('');
  const [imageOneUrl, setImageOneUrl] = useState(null);
  const [imageTwoUrl, setImageTwoUrl] = useState(null);
  const [imageOneRef, setImageOneRef] = useState(null);
  const [imageTwoRef, setImageTwoRef] = useState(null);
  const [testTags, setTestTags] = useState([]);
  const [docRef, setDocRef] = useState(null);
  const [authorId, setAuthorId] = useState(null);
  const [shortTurnVisible, setShortTurnVisible] = useState(false);
  const [time, setTime] = useState(6000);
  const [hasFetched, setHasFetched] = useState(false);

  const clearState = () => {
    setQuestion('');
    setShortTurnQuestion('');
    setImageOneUrl(null);
    setImageTwoUrl(null);
    setImageOneRef(null);
    setImageTwoRef(null);
    setTestTags([]);
    setDocRef(null);
    setAuthorId(null);
    setShortTurnVisible(false);
  };

  // docRef is grabbed from the params of the component displaying the context.
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
          setQuestion(data.question);
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
    <FCEPart2Context.Provider
      value={{
        question,
        setQuestion,
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
    </FCEPart2Context.Provider>
  );
};
