import React, { useState, createContext, useEffect, useCallback } from 'react';
import getTest from 'APIHandlers/getTest';

export const Part4Context = createContext();

export const Part4ContextProvider = ({ children }) => {
  const [questionOne, setQuestionOne] = useState('');
  const [questionTwo, setQuestionTwo] = useState('');
  const [questionThree, setQuestionThree] = useState('');
  const [questionFour, setQuestionFour] = useState('');
  const [questionFive, setQuestionFive] = useState('');
  const [questionSix, setQuestionSix] = useState('');
  const [testTags, setTestTags] = useState([]);
  const [docRef, setDocRef] = useState(null);
  const [creatorId, setCreatorId] = useState(null);
  const [time, setTime] = useState(24000);
  const [hasFetched, setHasFetched] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const fetchTest = useCallback(() => {
    getTest('FCEPart4', docRef).then((data) => {
      if (data) {
        setQuestionOne(data.questionOne);
        setQuestionTwo(data.questionTwo);
        setQuestionThree(data.questionThree);
        setQuestionFour(data.questionFour);
        setQuestionFive(data.questionFive);
        setQuestionSix(data.questionSix);
        setCreatorId(data.creatorId);
        setTestTags(data.tags);
        setHasFetched(true);
      } else {
        setDocRef('new');
        setHasFetched(true);
      }
    });
  }, [docRef]);

  const clearState = () => {
    setQuestionOne('');
    setQuestionTwo('');
    setQuestionThree('');
    setQuestionFour('');
    setQuestionFive('');
    setQuestionSix('');
    setCreatorId(null);
    setTestTags([]);
    setDocRef(null);
  };

  const handleSetTags = (tag, selected) => {
    if (!selected) {
      //adds tag to the state
      setTestTags((prevTags) => {
        return [...prevTags, tag];
      });
      setUnsavedChanges(true);
    } else {
      //removes the tag from the state
      setTestTags((prevTags) => {
        return [...prevTags.filter((currentTag) => currentTag !== tag)];
      });
    }
  };

  const handleEditQuestionOne = (e) => {
    setQuestionOne(e.currentTarget.value);
    setUnsavedChanges(true);
  };
  const handleEditQuestionTwo = (e) => {
    setQuestionTwo(e.currentTarget.value);
    setUnsavedChanges(true);
  };
  const handleEditQuestionThree = (e) => {
    setQuestionThree(e.currentTarget.value);
    setUnsavedChanges(true);
  };
  const handleEditQuestionFour = (e) => {
    setQuestionFour(e.currentTarget.value);
    setUnsavedChanges(true);
  };
  const handleEditQuestionFive = (e) => {
    setQuestionFive(e.currentTarget.value);
    setUnsavedChanges(true);
  };
  const handleEditQuestionSix = (e) => {
    setQuestionSix(e.currentTarget.value);
    setUnsavedChanges(true);
  };

  useEffect(() => {
    setHasFetched(false);

    if (docRef) {
      fetchTest();
    } else {
      setHasFetched(true);
    }

    return () => {
      clearState();
    };
  }, [docRef, fetchTest]);

  return (
    <Part4Context.Provider
      value={{
        questionOne,
        setQuestionOne,
        questionTwo,
        setQuestionTwo,
        questionThree,
        setQuestionThree,
        questionFour,
        setQuestionFour,
        questionFive,
        setQuestionFive,
        questionSix,
        setQuestionSix,
        testTags,
        setTestTags,
        docRef,
        setDocRef,
        creatorId,
        setCreatorId,
        time,
        setTime,
        hasFetched,
        setHasFetched,
        unsavedChanges,
        setUnsavedChanges,
        handleEditQuestionOne,
        handleEditQuestionTwo,
        handleEditQuestionThree,
        handleEditQuestionFour,
        handleEditQuestionFive,
        handleEditQuestionSix,
        clearState,
        handleSetTags,
        fetchTest,
      }}
    >
      {children}
    </Part4Context.Provider>
  );
};
