import React, { useState, useEffect, Fragment } from 'react';
import { projectFirestore } from '../firebase/firebaseIndex';
import useFirestore from '../hooks/useFirestore';
import SideBarTags from './SideBarTags';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Tests = () => {
  const { docs } = useFirestore('FCE Part 2');
  const [tagSearchTerm, setTagSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  function handleSetTags(tag, selected) {
    if (!selected) {
      //adds tag to the state
      setTagSearchTerm(tag);
    } else {
      //removes the tag from the state
      setTagSearchTerm('');
    }
  }

  useEffect(() => {
    const filteredDocs = docs.filter((doc) => doc.tags.includes(tagSearchTerm));
    setSearchResults(filteredDocs);
  }, [docs, tagSearchTerm]);

  return (
    <content>
      <SideBarTags
        tags={tagSearchTerm}
        handleSetTags={handleSetTags}
      ></SideBarTags>
      <div className='all-tests-container'>
        {searchResults.length > 0 ? (
          searchResults.map((doc) => (
            <Link
              className='test-preview-link fade-in'
              to={`/FCEPart2/${doc.id}`}
              key={uuidv4()}
            >
              <div className='test-preview-container'>
                <div className='test-preview-question-container dont-break-out'>
                  <p>{doc.question}</p>
                </div>
                <div className='img-wrap' key={doc.id}>
                  <img className='thumbnail' src={doc.imageOne}></img>
                  <img className='thumbnail' src={doc.imageTwo}></img>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div>
            <span>
              no results! <br /> (select a tag)
            </span>
          </div>
        )}
      </div>
    </content>
  );
};

export default Tests;
