import React, { useState, createContext, useEffect } from 'react';
import getTest from 'APIHandlers/getTest';
import { CAEPart3 } from 'APIHandlers/firebaseConsts';

export const CAEPart3Context = createContext();

export const CAEPart3ContextProvider = ({ children }) => {
  const [question, setQuestion] = useState('');
  const [questionTwo, setQuestionTwo] = useState('');
  const [topLeft, setTopLeft] = useState('');
  const [topRight, setTopRight] = useState('');
  const [bottomLeft, setBottomLeft] = useState('');
  const [bottomCentre, setBottomCentre] = useState('');
  const [bottomRight, setBottomRight] = useState('');
  const [testTags, setTestTags] = useState([]);
  const [docRef, setDocRef] = useState(null);
  const [creatorId, setCreatorId] = useState('');
  const [changesSaved, setChangesSaved] = useState(false);
  const optionPlaceholder = 'option';
  const [hasFetched, setHasFetched] = useState(false);

  const clearState = () => {
    setQuestion('');
    setQuestionTwo('');
    setTopLeft('');
    setTopRight('');
    setBottomLeft('');
    setBottomRight('');
    setBottomCentre('');
    setHasFetched(true);
    setTestTags([]);
    setDocRef(null);
    setCreatorId(null);
  };

  function handleSetTags(tag, selected) {
    if (!selected) {
      //adds tag to the state
      setTestTags((prevTags) => {
        return [...prevTags, tag];
      });
    } else {
      //removes the tag from the state
      setTestTags((prevTags) => {
        return [...prevTags.filter((currentTag) => currentTag !== tag)];
      });
    }
    //setChangesSaved(false);
  }

  // docRef is grabbed from the params of the component displaying the context.
  // UseEffect only runs if the component is supposed to display a different test to the previous one displayed.
  useEffect(() => {
    setHasFetched(false);
    if (docRef) {
      getTest('CAEPart3', docRef).then((data) => {
        if (data) {
          setDocRef(data.id);
          setQuestion(data.question);
          setQuestionTwo(data.questionTwo);
          setTopLeft(data.topLeft);
          setTopRight(data.topRight);
          setBottomCentre(data.bottomCentre);
          setBottomLeft(data.bottomLeft);
          setBottomRight(data.bottomRight);
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
    <CAEPart3Context.Provider
      value={{
        question,
        setQuestion,
        questionTwo,
        setQuestionTwo,
        topLeft,
        setTopLeft,
        topRight,
        setTopRight,
        bottomLeft,
        setBottomLeft,
        bottomCentre,
        setBottomCentre,
        bottomRight,
        setBottomRight,
        testTags,
        setTestTags,
        docRef,
        setDocRef,
        creatorId,
        setCreatorId,
        changesSaved,
        setChangesSaved,
        optionPlaceholder,
        hasFetched,
        setHasFetched,
        handleSetTags,
        clearState,
      }}
    >
      {children}
    </CAEPart3Context.Provider>
  );
};
