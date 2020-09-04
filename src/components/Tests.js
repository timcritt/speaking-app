import React, { useState, useEffect } from 'react';
import useFirestore from '../hooks/useFirestore';
import SideBarTags from './SideBarTags';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { FCEPart2 } from '../firebase/firebaseConsts';

const Tests = ({ userId, filterTerm = '' }) => {
  const { docs } = useFirestore(FCEPart2, userId);
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
    var filteredDocs = docs
      //filter by question
      .filter((doc) =>
        doc.question.toUpperCase().includes(filterTerm.toUpperCase())
      );

    //filter by topic
    if (tagSearchTerm) {
      filteredDocs = filteredDocs.filter((doc) =>
        doc.tags.includes(tagSearchTerm)
      );
    }

    setSearchResults(filteredDocs);
  }, [docs, tagSearchTerm, filterTerm]);

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
                  <span>{doc.question}</span>
                </div>
                <div className='img-wrap' key={doc.id}>
                  <img className='thumbnail' src={doc.imageOneUrl}></img>
                  <img className='thumbnail' src={doc.imageTwoUrl}></img>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div>
            <span>no results!</span>
          </div>
        )}
      </div>
    </content>
  );
};

export default Tests;
