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

const Part3 = (props) => {
  const [question, setQuestion] = useState(null);
  const [imageOneUrl, setImageOne] = useState(null);
  const [imageTwoUrl, setImageTwo] = useState(null);
  const [docRef, setDocRef] = useState(null);
  const [authorId, setAuthorId] = useState(null);
  const [AddToFolderModalOpen, setAddToFolderModalOpen] = useState(false);
  const { userId } = useContext(firebaseAuth);
  const handleFullScreen = useFullScreenHandle();

  var test = useGetTest(props.match.params.id);
  const [lineState, setLineState] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  window.onpopstate = (e) => {
    setLineState({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  };
  React.useEffect(() => {
    function handleResize() {
      setLineState({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('fullscreenchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('fullscreenchange', handleResize);
    };
  });

  useEffect(() => {
    if (test) {
      setDocRef(test.id);
      setImageOne(test.imageOneUrl);
      setImageTwo(test.imageTwoUrl);
      setQuestion(test.question);
      setAuthorId(test.userId);
    }
  }, [test, authorId]);

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
              <div className='part3-option-top-left part3-option'>
                recycling
              </div>
              <div className='part3-question-centre'>
                <span>How can these ideas help prevent climate change?</span>
              </div>
              <div className='part3-option-top-right part3-option'>
                renewable energy
              </div>
              <div className='part3-option-bottom-left part3-option'>
                reusing things
              </div>
              <div className='part3-option-bottom-centre part3-option'>
                public transport
              </div>
              <div className='part3-option-bottom-right part3-option'>
                politicians
              </div>
              <div>
                <LineTo
                  borderColor={'#dbdbdb'}
                  zIndex={0}
                  within={'part3-grid-container'}
                  innerState={lineState}
                  from='part3-option-top-left'
                  to='part3-question-centre'
                />
                <LineTo
                  borderColor={'#dbdbdb'}
                  within={'part3-grid-container'}
                  innerState={lineState}
                  from='part3-option-top-right'
                  to='part3-question-centre'
                />
                <LineTo
                  borderColor={'#dbdbdb'}
                  within={'part3-grid-container'}
                  innerState={lineState}
                  from='part3-option-bottom-left'
                  to='part3-question-centre'
                />
                <LineTo
                  borderColor={'#dbdbdb'}
                  within={'part3-grid-container'}
                  innerState={lineState}
                  from='part3-option-bottom-centre'
                  to='part3-question-centre'
                />
                <LineTo
                  borderColor={'#dbdbdb'}
                  within={'part3-grid-container'}
                  innerState={lineState}
                  from='part3-option-bottom-right'
                  to='part3-question-centre'
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
};

export default Part3;
