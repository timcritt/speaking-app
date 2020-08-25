import React, { useState, useEffect, Fragment } from 'react';
import { projectFirestore } from '../firebase/firebaseIndex';
import useFirestore from '../hooks/useFirestore';
import SideBarTags from './SideBarTags';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Tests = () => {
  const { docs } = useFirestore('FCE Part 2');
  const [tagSearchTerm, setTagSearchTerm] = useState('');
  function handleSetTags(tag, selected) {
    if (!selected) {
      //adds tag to the state
      setTagSearchTerm(tag);
    } else {
      //removes the tag from the state
      setTagSearchTerm('');
    }
  }
  return (
    <content>
      <SideBarTags
        tags={tagSearchTerm}
        handleSetTags={handleSetTags}
      ></SideBarTags>
      <div className='all-tests-container'>
        {docs &&
          docs
            .filter((doc) => doc.tags.includes(tagSearchTerm))
            .map((doc) => (
              <Link
                className='test-preview-link'
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
            ))}
      </div>
    </content>
  );
};

export default Tests;
