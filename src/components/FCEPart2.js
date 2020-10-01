import React, { useState, useEffect, useContext } from 'react';
import ExamPicture from './ExamPicture';
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
import getUserDetails from '../APIHandlers/getUserDetails';

const FCEPart2 = (props) => {
  const [question, setQuestion] = useState();
  const [imageOneUrl, setImageOne] = useState();
  const [imageTwoUrl, setImageTwo] = useState();
  const [docRef, setDocRef] = useState(null);
  const [authorId, setAuthorId] = useState(null);
  const [AddToFolderModalOpen, setAddToFolderModalOpen] = useState(false);
  const { userId } = useContext(firebaseAuth);
  const handleFullScreen = useFullScreenHandle();
  const [authorName, setAuthorName] = useState();

  var test = useGetTest(props.match.params.id);

  useEffect(() => {
    if (test) {
      setDocRef(test.id);
      setImageOne(test.imageOneUrl);
      setImageTwo(test.imageTwoUrl);
      setQuestion(test.question);
      setAuthorId(test.userId);
    }
    if (authorId) {
      (async () => {
        const creatorDetails = await getUserDetails(authorId);
        setAuthorName(creatorDetails.userName);
      })();
    }
  }, [test, authorId]);

  const openAddToFolderModal = () => {
    setAddToFolderModalOpen(true);
  };
  const closeAddToFolderModal = () => {
    setAddToFolderModalOpen(false);
  };

  return (
    <FullScreen handle={handleFullScreen}>
      {AddToFolderModalOpen && (
        <Modal
          className='open-add-folder-modal-btn'
          modalOpen={AddToFolderModalOpen}
          heading='Add test to folder'
          setModalOpen={closeAddToFolderModal}
        >
          <AddToMyFolders testId={docRef} />
        </Modal>
      )}
      <div className='holy-grail-body'>
        <main className='holy-grail-content fade-in'>
          <div className='part2-main-row'>
            <div className='question-row'>
              <span className='question-input'>{question}</span>
            </div>
            <div className='part2-image-row'>
              <ExamPicture image={imageOneUrl} />
              <ExamPicture image={imageTwoUrl} />
            </div>

            <div className='tool-bar-row'>
              {authorName && (
                <div className='test-creator-info'>
                  <span className='hide-on-fullscreen'>
                    created by:{' '}
                    {<Link to={`/userContent/${authorId}`}>{authorName}</Link>}
                  </span>
                </div>
              )}
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
                <button
                  className='tool-bar-btn hide-on-fullscreen'
                  onClick={() => openAddToFolderModal(true)}
                >
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
                    style={{ color: '#BFBFBF' }}
                  />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </FullScreen>
  );
};

export default FCEPart2;
