import React, { useState, useEffect, Fragment } from 'react';
import ExamImageContainer from './ExamImageContainer';
import ImageContext from '../context/ImageContext';
import SideBarTags from './SideBarTags';
import PublishWarningModal from './PublishWarningModal';
import { Link } from 'react-router-dom';
import useGetTest from '../hooks/useGetTest';
import deleteTest from '../APIHandlers/deleteTest';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

const EditFCEPart2 = (props) => {
  const [question, setQuestion] = useState();
  const [imageOne, setImageOne] = useState();
  const [imageTwo, setImageTwo] = useState();
  const [testTags, setTags] = useState([]);
  const [docRef, setDocRef] = useState('');

  //custom hook
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
  const handleDeleteTest = async () => {
    await deleteTest(docRef, imageOne, imageTwo);
    clearState();
  };

  function handleSetDocRef(docRef) {
    setDocRef(docRef);
  }

  const clearState = () => {
    setQuestion('');
    setImageOne(null);
    setImageTwo(null);
    setTags([]);
    setDocRef(null);
  };
  useEffect(() => {
    if (test) {
      setDocRef(test.id);
      setImageOne(test.imageOne);
      setImageTwo(test.imageTwo);
      setQuestion(test.question);
      setTags(test.tags);
    } else {
      clearState();
    }
  }, [test]);

  return (
    <Fragment>
      <div className='holy-grail-body'>
        <SideBarTags tags={testTags} handleSetTags={handleSetTags} />
        <main className='holy-grail-content'>
          <div className='part2-main-row fade-in'>
            <div className='question-row'>
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
                </ImageContext.Provider>
              </div>
              <div>
                <ImageContext.Provider value={handleSetImageTwo}>
                  <ExamImageContainer
                    image={imageTwo}
                    handleSetImage={handleSetImageTwo}
                  />
                </ImageContext.Provider>
              </div>
            </div>
            <div className='tool-bar-row'>
              <div className='tool-btn-container'>
                <PublishWarningModal
                  imageOne={imageOne}
                  imageTwo={imageTwo}
                  question={question}
                  tags={testTags}
                  docRef={docRef}
                  setDocRef={handleSetDocRef}
                />
                {docRef && (
                  <Link
                    to={{
                      pathname: `/FCEPart2/${docRef}`,
                    }}
                  >
                    <button className='tool-bar-btn'>
                      <VisibilityOutlinedIcon />
                    </button>
                  </Link>
                )}
                <button className='tool-bar-btn'>
                  <ShareOutlinedIcon />
                </button>
                <button className='tool-bar-btn' onClick={handleDeleteTest}>
                  <DeleteForeverOutlinedIcon />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Fragment>
  );
};

export default EditFCEPart2;
