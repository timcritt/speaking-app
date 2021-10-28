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
  const [creatorId, setCreatorId] = useState(null);
  const [shortTurnVisible, setShortTurnVisible] = useState(false);
  const [time, setTime] = useState(6000);
  const [hasFetched, setHasFetched] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const fetchTest = () => {
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
        setCreatorId(data.creatorId);
        setTestTags(data.tags);
        setHasFetched(true);
      } else {
        console.log('could not find test. It may not exist.');
        setDocRef('new');
      }
    });
  };

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
    setCreatorId(null);
    setShortTurnVisible(false);
    setUnsavedChanges(false);
  };

  const handleEditQuestionOne = (e) => {
    setQuestionOne(e.currentTarget.value);
    setUnsavedChanges(true);
  };
  const handleEditQuestionTwo = (e) => {
    setQuestionTwo(e.currentTarget.value);
    setUnsavedChanges(true);
  };
  const handleEditShortTurnQuestion = (e) => {
    setShortTurnQuestion(e.currentTarget.value);
    setUnsavedChanges(true);
  };
  const handleEditImageOneUrl = (imageOneUrl) => {
    setImageOneUrl(imageOneUrl);
    setUnsavedChanges(true);
  };
  const handleEditImageOneRef = (imageOneRef) => {
    setImageOneRef(imageOneRef);
    setUnsavedChanges(true);
  };
  const handleEditImageTwoUrl = (imageTwoUrl) => {
    setImageTwoUrl(imageTwoUrl);
    setUnsavedChanges(true);
  };
  const handleEditImageTwoRef = (imageTwoRef) => {
    setImageTwoRef(imageTwoRef);
    setUnsavedChanges(true);
  };
  const handleEditImageThreeUrl = (imageThreeUrl) => {
    setImageThreeUrl(imageThreeUrl);
    setUnsavedChanges(true);
  };
  const handleEditImageThreeRef = (imageThreeRef) => {
    setImageThreeRef(imageThreeRef);
    setUnsavedChanges(true);
  };

  const handleSetTags = (tag, selected) => {
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
    setUnsavedChanges(true);
  };

  // docRef is updated from the params from within the component displaying the context.
  // UseEffect only runs if the component requires a different test to the previous one displayed.
  useEffect(() => {
    setHasFetched(false);
    if (docRef) {
      fetchTest();
    } else {
      setHasFetched(true);
    }
    console.log(creatorId);
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
        creatorId,
        setCreatorId,
        shortTurnVisible,
        setShortTurnVisible,
        time,
        setTime,
        hasFetched,
        setHasFetched,
        clearState,
        unsavedChanges,
        setUnsavedChanges,
        fetchTest,
        handleSetTags,
        handleEditQuestionOne,
        handleEditQuestionTwo,
        handleEditShortTurnQuestion,
        handleEditImageOneUrl,
        handleEditImageOneRef,
        handleEditImageTwoUrl,
        handleEditImageTwoRef,
        handleEditImageThreeUrl,
        handleEditImageThreeRef,
      }}
    >
      {children}
    </CAEPart2Context.Provider>
  );
};
