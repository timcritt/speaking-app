import React, { useState, useEffect, useContext } from 'react';
import Timer from './Timer';
import { Link } from 'react-router-dom';
import useGetTest from '../hooks/useGetTest';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import FullscreenOutlinedIcon from '@material-ui/icons/FullscreenOutlined';
import FullscreenExitOutlinedIcon from '@material-ui/icons/FullscreenExitOutlined';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { firebaseAuth } from '../context/AuthProvider';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import Modal from './Modal';
import AddToMyFolders from './AddToMyFolders';
import CreatorInfo from './CreatorInfo';
import { Fragment } from 'react';
import LineTo from 'react-lineto';
import { TextareaAutosize } from '@material-ui/core';
import debounce from 'lodash.debounce';

const EditPart3 = (props) => {
  const [question, setQuestion] = useState('');
  const [topLeft, setTopLeft] = useState('');
  const [topRight, setTopRight] = useState('');
  const [bottomLeft, setBottomLeft] = useState('');
  const [bottomCentre, setBottomCentre] = useState('');
  const [bottomRight, setBottomRight] = useState('');

  const [docRef, setDocRef] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [AddToFolderModalOpen, setAddToFolderModalOpen] = useState(false);
  const { userId } = useContext(firebaseAuth);
  const handleFullScreen = useFullScreenHandle();
  const optionPlaceholder = 'option';

  const [lineState, setLineState] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  window.onpopstate = (e) => {
    console.log('popstate');

    setTimeout(function () {
      setLineState({
        height: window.innerHeight + 1,
        width: window.innerWidth + 1,
      });
    }, 200);
  };
  const handleResize = () => {
    setLineState({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  };

  React.useEffect(() => {
    window.addEventListener(
      'resize',
      debounce(() => {
        handleResize();
      }, 200)
    );
    window.addEventListener('fullscreenchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('fullscreenchange', handleResize);
    };
  });
  var test = useGetTest('Part3', props.match.params.id);
  useEffect(() => {
    if (test) {
      setDocRef(test.id);
      setQuestion(test.question);
      setAuthorId(test.creatorId);
      setTopLeft(test.topLeft);
      setTopRight(test.topRight);
      setBottomRight(test.bottomRight);
      setBottomLeft(test.bottomLeft);
      setBottomCentre(test.bottomCentre);
    }
  });

  const handleQuestionChange = (e) => {
    setQuestion(e.target.currentValue);
    setTimeout(function () {
      handleResize();
    }, 100);
  };

  const handleTopLeftChange = (e) => {
    setTopLeft(e.target.currentValue);
    setTimeout(function () {
      handleResize();
    }, 100);
  };

  const handleTopRightChange = (e) => {
    setTopRight(e.target.currentValue);
    setTimeout(function () {
      handleResize();
    }, 100);
  };
  const handleBottomLeftChange = (e) => {
    setBottomLeft(e.target.currentValue);
    setTimeout(function () {
      handleResize();
    }, 100);
  };

  const handleBottomCentreChange = (e) => {
    setBottomCentre(e.target.currentValue);
    setTimeout(function () {
      handleResize();
    }, 100);
  };
  const handleBottomRightChange = (e) => {
    setBottomRight(e.target.currentValue);
    setTimeout(function () {
      handleResize();
    }, 100);
  };

  if (test) {
    return (
      <Fragment>
        {AddToFolderModalOpen && (
          <Modal
            className='open-add-folder-modal-btn'
            heading='Add test to folder'
          >
            <AddToMyFolders testId={docRef} />
          </Modal>
        )}
        <FullScreen handle={handleFullScreen}>
          <main className='holy-grail-content fade-in'>
            <div className='part2-main-row'>
              <div className='part3-grid-container'>
                <TextareaAutosize
                  className='part3-option-top-left part3-option-input part3-input '
                  placeholder={optionPlaceholder}
                  defaultValue={topLeft}
                  onChange={handleTopLeftChange}
                  rowsMin='1'
                  rowsMax='4'
                />
                <TextareaAutosize
                  className='part3-question-input part3-input'
                  placeholder='enter question'
                  value={question}
                  onChange={handleQuestionChange}
                  rowsMin='1'
                  rowsMax='4'
                />
                <TextareaAutosize
                  className='part3-option-top-right part3-input part3-option-input'
                  placeholder={optionPlaceholder}
                  value={topRight}
                  onChange={handleTopRightChange}
                  rowsMin='1'
                  rowsMax='4'
                />
                <TextareaAutosize
                  className='part3-option-bottom-left part3-input
                part3-option-input'
                  placeholder={optionPlaceholder}
                  value={bottomLeft}
                  onChange={handleBottomLeftChange}
                  rowsMin='1'
                  rowsMax='4'
                />

                <TextareaAutosize
                  className='part3-option-bottom-centre part3-input part3-option-input'
                  placeholder={optionPlaceholder}
                  value={bottomCentre}
                  onChange={handleBottomCentreChange}
                  rowsMin='1'
                  rowsMax='4'
                />

                <TextareaAutosize
                  className='part3-option-bottom-right part3-input part3-option-input '
                  placeholder={optionPlaceholder}
                  value={bottomRight}
                  onChange={handleBottomRightChange}
                  rowsMin='1'
                  rowsMax='4'
                />
                <div style={{ animation: `fadeIn 1s` }}>
                  <LineTo
                    borderColor={'#dbdbdb'}
                    className={'fade-in lineContainerHidden'}
                    zIndex={0}
                    within={'part3-grid-container'}
                    inner={lineState}
                    from='part3-option-top-left'
                    to='part3-question-input'
                  />
                  <LineTo
                    borderColor={'#dbdbdb'}
                    within={'part3-grid-container'}
                    inner={lineState}
                    from='part3-option-top-right'
                    to='part3-question-input'
                  />
                  <LineTo
                    borderColor={'#dbdbdb'}
                    within={'part3-grid-container'}
                    inner={lineState}
                    from='part3-option-bottom-left'
                    to='part3-question-input'
                  />
                  <LineTo
                    borderColor={'#dbdbdb'}
                    within={'part3-grid-container'}
                    inner={lineState}
                    from='part3-option-bottom-centre'
                    to='part3-question-input'
                  />
                  <LineTo
                    borderColor={'#dbdbdb'}
                    within={'part3-grid-container'}
                    inner={lineState}
                    from='part3-option-bottom-right'
                    to='part3-question-input'
                  />
                </div>
              </div>
              <div className='tool-bar-row'>
                {authorId && <CreatorInfo authorId={authorId} />}
                <Timer />
                <div className='tool-btn-container'>
                  {authorId == userId && (
                    <Link
                      to={{
                        pathname: `/EditFCEPart2/${docRef}`,
                      }}
                    >
                      <button className='tool-bar-btn hide-on-fullscreen'>
                        <EditOutlinedIcon />
                      </button>
                    </Link>
                  )}
                  <button className='tool-bar-btn hide-on-fullscreen'>
                    <ShareOutlinedIcon />
                  </button>
                  <button className='tool-bar-btn hide-on-fullscreen'>
                    <PlaylistAddOutlinedIcon />
                  </button>
                  <button
                    className='tool-bar-btn open-fullscreen-btn hide-on-fullscreen'
                    onClick={() => handleFullScreen.enter()}
                  >
                    <FullscreenOutlinedIcon />
                  </button>
                  <button
                    className='tool-bar-btn close-fullscreen-btn show-on-fullscreen'
                    onClick={() => handleFullScreen.exit()}
                  >
                    <FullscreenExitOutlinedIcon
                      fontSize='large'
                      style={{ color: 'black' }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </main>
        </FullScreen>
      </Fragment>
    );
  } else return null;
};

export default EditPart3;
