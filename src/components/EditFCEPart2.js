import React, { useState, useEffect, Fragment } from 'react';
import ExamImageContainer from './ExamImageContainer';
import ImageContext from '../context/ImageContext';
import SideBarTags from './SideBarTags';
import PublishWarningModal from './PublishWarningModal';
import { Link } from 'react-router-dom';
import useGetTest from '../hooks/useGetTest';

const EditFCEPart2 = (props) => {
  const [question, setQuestion] = useState();
  const [imageOne, setImageOne] = useState();
  const [imageTwo, setImageTwo] = useState();
  const [testTags, setTags] = useState([]);
  const [docRef, setDocRef] = useState('');

  var test = useGetTest(props.match.params.id);

  function handleSetImageOne(image) {
    setImageOne(image);
  }
  function handleSetImageTwo(image) {
    setImageTwo(image);
  }
  function handleSetTags(tag, selected) {
    if (!selected) {
      //adds tag to the state
      setTags((prevTags) => {
        return [...prevTags, tag];
      });
    } else {
      //removes the tag from the state
      setTags((prevTags) => {
        return [...prevTags.filter((currentTag) => currentTag !== tag)];
      });
    }
  }
  function handleSetDocRef(docRef) {
    setDocRef(docRef);
  }

  useEffect(() => {
    if (test) {
      setDocRef(test.id);
      setImageOne(test.imageOne);
      setImageTwo(test.imageTwo);
      setQuestion(test.question);
      setTags(test.tags);
    } else {
      setDocRef(null);
      setImageOne(null);
      setImageTwo(null);
      setQuestion(null);
      setTags([]);
    }
  }, [test]);

  return (
    <Fragment>
      <SideBarTags tags={testTags} handleSetTags={handleSetTags} />
      <main className='holy-grail-content'>
        <div className='part2-main-row'>
          <div className='question-container'>
            <textarea
              label='Long turn question'
              className='question-input'
              maxLength='100'
              defaultValue={question}
              placeholder='enter long turn question'
              onChange={(e) => setQuestion(e.target.value)}
              rows='1'
            />
          </div>
          <div className='part2-image-row'>
            <div>
              <ImageContext.Provider value={handleSetImageOne}>
                <ExamImageContainer
                  image={imageOne}
                  handleSetImage={handleSetImageOne}
                />
                <div className='exam-image-container'></div>
              </ImageContext.Provider>
            </div>
            <div>
              <ImageContext.Provider value={handleSetImageTwo}>
                <ExamImageContainer
                  image={imageTwo}
                  handleSetImage={handleSetImageTwo}
                />
                <div className='exam-image-container'></div>
              </ImageContext.Provider>
            </div>
          </div>
          <p className='advice-text'>
            Each image should include at least one person
          </p>
          <div className='timer-row'>
            <PublishWarningModal
              imageOne={imageOne}
              imageTwo={imageTwo}
              question={question}
              tags={testTags}
              docRef={docRef}
              setDocRef={handleSetDocRef}
            ></PublishWarningModal>
          </div>
          <div className='tool-bar-container'>
            <div>
              <a>add to folder</a> |
              {docRef && (
                <Link
                  to={{
                    pathname: `/FCEPart2/${docRef}`,
                    doc: {
                      imageOne,
                      imageTwo,
                      question,
                      tags: testTags,
                      docRef,
                    },
                  }}
                >
                  preview
                </Link>
              )}
              | share | info | ---{' '}
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default EditFCEPart2;
