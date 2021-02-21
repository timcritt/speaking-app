import React, { useState, createContext, useEffect } from 'react';
import getTest from 'APIHandlers/getTest';

export const FCEPart3Context = createContext();

export const FCEPart3ContextProvider = ({ children }) => {
  const [question, setQuestion] = useState('');
  const [topLeft, setTopLeft] = useState('');
  const [topRight, setTopRight] = useState('');
  const [bottomLeft, setBottomLeft] = useState('');
  const [bottomCentre, setBottomCentre] = useState('');
  const [bottomRight, setBottomRight] = useState('');
  const [testTags, setTestTags] = useState([]);
  const [docRef, setDocRef] = useState(null);
  const [authorId, setAuthorId] = useState('');
  const [changesSaved, setChangesSaved] = useState(false);
  const optionPlaceholder = 'option';
  const [hasFetched, setHasFetched] = useState(false);

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
  // UseEffect only runs if the component requires a different test to the previous one displayed.
  useEffect(() => {
    setHasFetched(false);
    if (docRef) {
      getTest('Part3', docRef).then((data) => {
        if (data) {
          setDocRef(data.id);
          setQuestion(data.question);
          setTopLeft(data.topLeft);
          setTopRight(data.topRight);
          setBottomCentre(data.bottomCentre);
          setBottomLeft(data.bottomLeft);
          setBottomRight(data.bottomRight);
          setAuthorId(data.creatorId);
          setTestTags(data.tags);
          setHasFetched(true);
        } else {
          //creat new test
          setHasFetched(true);
        }
      });
    }
  }, [docRef]);

  return (
    <FCEPart3Context.Provider
      value={{
        question,
        setQuestion,
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
        authorId,
        setAuthorId,
        changesSaved,
        setChangesSaved,
        optionPlaceholder,
        hasFetched,
        setHasFetched,
        handleSetTags,
      }}
    >
      {children}
    </FCEPart3Context.Provider>
  );
};
