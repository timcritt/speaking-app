import React, { useState, useEffect, Fragment } from 'react';
import ImageContext from '../context/ImageContext';
import SideBarTags from './SideBarTags';
import PublishWarningModal from './PublishWarningModal';
import { Link } from 'react-router-dom';
import useGetTest from '../hooks/useGetTest';
import deleteTest from '../APIHandlers/deleteTest';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import ExamPicture from './ExamPicture';
import ImageDeleteBtn from './ImageDeleteBtn';
import SimpleModal from './SimpleModal';

const EditFCEPart2 = (props) => {
  const [question, setQuestion] = useState('');
  const [imageOneUrl, setImageOneUrl] = useState();
  const [imageTwoUrl, setImageTwoUrl] = useState();
  const [imageOneRef, setImageOneRef] = useState();
  const [imageTwoRef, setImageTwoRef] = useState();
  const [testTags, setTags] = useState([]);
  const [docRef, setDocRef] = useState(null);
  const [authorId, setAuthorId] = useState(null);
  const [changesSaved, setChangesSaved] = useState(false);

  //custom hook
  var test = useGetTest(props.match.params.id);

  const handleQuestionChange = (e) => {
    setQuestion(e.currentTarget.value);
  };

  function handleSetImageOne(imageUrl, ref) {
    setImageOneUrl(imageUrl);
    setImageOneRef(ref);
    //setChangesSaved(false);
  }
  function handleSetImageTwo(imageUrl, ref) {
    setImageTwoUrl(imageUrl);
    setImageTwoRef(ref);
    //setChangesSaved(false);
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
    //setChangesSaved(false);
  }
  const handleDeleteTest = async () => {
    await deleteTest(docRef, imageOneUrl, imageTwoUrl);
    clearState();
  };

  function handleSetDocRef(docRef) {
    setDocRef(docRef);
  }

  const clearState = () => {
    setQuestion('');
    setImageOneUrl(null);
    setImageTwoUrl(null);
    setTags([]);
    setDocRef(null);
    setImageOneRef(null);
    setImageTwoRef(null);
    setAuthorId(null);
  };
  useEffect(() => {
    if (test) {
      setDocRef(test.id);
      setImageOneUrl(test.imageOneUrl);
      setImageTwoUrl(test.imageTwoUrl);
      setQuestion(test.question);
      setTags(test.tags);
      setImageOneRef(test.imageOneRef);
      setImageTwoRef(test.imageTwoRef);
      setAuthorId(test.userId);
    } else {
      clearState();
    }
  }, [test]);

  return (
    <Fragment>
      <div className='holy-grail-body'>
        <div className='side-bar-left-tags hg-sidebar '>
          <SideBarTags
            tags={testTags}
            handleSetTags={handleSetTags}
            title={'Topic Tags'}
          >
            <p className='advice-text tag-advice'>
              Adding the correct tags will help others find your test
            </p>
          </SideBarTags>
        </div>
        <main className='holy-grail-content'>
          <div className='part2-main-row fade-in'>
            <div className='question-row'>
              <textarea
                label='Long turn question'
                className='question-input'
                maxLength='100'
                defaultValue={question}
                placeholder='enter long turn question'
                onChange={(e) => handleQuestionChange(e)}
                rows='1'
              />
            </div>
            <div className='part2-image-row'>
              <div>
                <ImageContext.Provider value={handleSetImageOne}>
                  <ExamPicture image={imageOneUrl}>
                    {imageOneUrl ? (
                      <ImageDeleteBtn handleClick={handleSetImageOne} />
                    ) : (
                      <SimpleModal modalButtonText={'upload'} />
                    )}
                  </ExamPicture>
                </ImageContext.Provider>
              </div>
              <div>
                <ImageContext.Provider value={handleSetImageTwo}>
                  <ExamPicture image={imageTwoUrl}>
                    {imageTwoUrl ? (
                      <ImageDeleteBtn handleClick={handleSetImageTwo} />
                    ) : (
                      <SimpleModal modalButtonText={'upload'} />
                    )}
                  </ExamPicture>
                </ImageContext.Provider>
              </div>
            </div>
            <div className='tool-bar-row'>
              <div className='tool-btn-container'>
                <PublishWarningModal
                  imageOneUrl={imageOneUrl}
                  imageTwoUrl={imageTwoUrl}
                  question={question}
                  tags={testTags}
                  docRef={docRef}
                  setDocRef={handleSetDocRef}
                  imageOneRef={imageOneRef}
                  imageTwoRef={imageTwoRef}
                  setImageOneUrl={setImageOneUrl}
                  setImageTwoUrl={setImageTwoUrl}
                  setImageOneRef={setImageOneRef}
                  setImageTwoRef={setImageTwoRef}
                  changesSaved={changesSaved}
                  setChangesSaved={setChangesSaved}
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
