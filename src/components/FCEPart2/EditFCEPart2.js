import React, { useState, useEffect, Fragment } from 'react';
import ImageContext from 'context/ImageContext';
import SideBarTags from 'components/common/SideBarTags';
import PublishWarningModal from 'components/FCEPart2/PublishWarningModal';
import { Link } from 'react-router-dom';
import useGetTest from 'hooks/useGetTest';
import deleteTest from 'APIHandlers/deleteTest';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import ExamPicture from 'components/FCEPart2/ExamPicture';
import ImageDeleteBtn from 'components/FCEPart2/ImageDeleteBtn';
import SimpleModal from 'components/common/SimpleModal';
import { FCEPart2 } from 'APIHandlers/firebaseConsts';
import getTest from 'APIHandlers/getTest';
import LinearProgress from '@material-ui/core/LinearProgress';

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
  const [hasFetched, setHasFetched] = useState(false);

  //custom hook
  var test = useGetTest(FCEPart2, props.match.params.id);
  const handleQuestionChange = (e) => {
    setQuestion(e.currentTarget.value);
  };

  function handleSetImageOne(imageUrl, ref) {
    setImageOneUrl(imageUrl);
    setImageOneRef(ref);
    //setChangesSaved(false);
  }
  function handleSetImageTwo(imageUrl, ref) {
    console.log('iamgeUrl:', imageUrl);
    console.log('ref:', ref);
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
    var isMounted = true;
    getTest('FCEPart2', props.match.params.id).then((data) => {
      if (isMounted && data) {
        setDocRef(data.id);
        setImageOneUrl(data.imageOneUrl);
        setImageTwoUrl(data.imageTwoUrl);
        setQuestion(data.question);
        setTags(data.tags);
        setImageOneRef(data.imageOneRef);
        setImageTwoRef(data.imageTwoRef);
        setAuthorId(data.userId);
        setHasFetched(true);
      } else {
        setHasFetched(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (hasFetched) {
    return (
      <Fragment>
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

        <main className='holy-grail-content centre-vertically'>
          <div className='part2-main-row fade-in'>
            <div className='question-row'>
              <input
                label='Long turn question'
                className='input question-input '
                defaultValue={question}
                placeholder='enter long turn question'
                onChange={(e) => handleQuestionChange(e)}
              />
            </div>
            <div className='part2-image-row'>
              <ImageContext.Provider value={handleSetImageOne}>
                <div className='part2-image-container-left'>
                  <ExamPicture image={imageOneUrl}>
                    {imageOneUrl ? (
                      <ImageDeleteBtn handleClick={handleSetImageOne} />
                    ) : (
                      <SimpleModal modalButtonText={'upload'} />
                    )}
                  </ExamPicture>
                </div>
              </ImageContext.Provider>

              <div>
                <ImageContext.Provider value={handleSetImageTwo}>
                  <div className='part2-image-container-right'>
                    <ExamPicture image={imageTwoUrl}>
                      {imageTwoUrl ? (
                        <ImageDeleteBtn handleClick={handleSetImageTwo} />
                      ) : (
                        <SimpleModal modalButtonText={'upload'} />
                      )}
                    </ExamPicture>
                  </div>
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
      </Fragment>
    );
  } else {
    return (
      <div className={'full-width'}>
        <LinearProgress />
      </div>
    );
  }
};

export default EditFCEPart2;
