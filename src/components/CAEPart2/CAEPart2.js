import React, { useState, useEffect, useContext } from 'react';
import ExamPicture from 'components/FCEPart2/ExamPicture';
import Timer from 'components/common/Timer';
import { Link } from 'react-router-dom';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FullscreenOutlinedIcon from '@material-ui/icons/FullscreenOutlined';
import FullscreenExitOutlinedIcon from '@material-ui/icons/FullscreenExitOutlined';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { firebaseAuth } from 'context/AuthProvider';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import Modal from 'components/common/Modal';
import AddToMyFolders from 'components/common/AddToMyFolders';
import CreatorInfo from 'components/common/CreatorInfo';
import { Fragment } from 'react';
import ShareButton from 'components/common/ShareButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import { CAEPart2Context } from 'context/CAEPart2Context';

const CAEPart2 = (props) => {
  const context = useContext(CAEPart2Context);
  const [AddToFolderModalOpen, setAddToFolderModalOpen] = useState(false);
  const { userId } = useContext(firebaseAuth);
  const handleFullScreen = useFullScreenHandle();
  const [shortTurnVisible, setShortTurnVisible] = useState(false);
  const [time, setTime] = useState(6000);
  const [questionClass, setQuestionClass] = useState('');
  const dataNotLoadedErrorMessage = 'ERROR: missing data';
  useEffect(() => {
    //sends the id of the current test to be displayed to the CAEPart2 context
    context.setDocRef(props.match.params.id);
  }, []);

  useEffect(() => {
    if (!shortTurnVisible) {
      setTime(6000);
      setQuestionClass('');
    } else {
      setTime(2000);
      setQuestionClass('flipped-vertically');
    }
  }, [shortTurnVisible]);

  const openAddToFolderModal = () => {
    setAddToFolderModalOpen(true);
  };
  const closeAddToFolderModal = () => {
    setAddToFolderModalOpen(false);
  };
  const handleViewShortTurnClick = () => {
    setShortTurnVisible((prevState) => !prevState);
  };

  if (true) {
    return (
      <Fragment>
        {AddToFolderModalOpen && (
          <Modal
            className='open-add-folder-modal-btn'
            heading='Add test to folder'
            setModalOpen={closeAddToFolderModal}
          >
            <AddToMyFolders testId={context.docRef} />
          </Modal>
        )}
        <FullScreen handle={handleFullScreen}>
          <main className='holy-grail-content fade-in'>
            <div className='part2-main-row'>
              <div className='part2-edit-question-row'>
                <div className='flip-card-CAE-part2'>
                  <div
                    className={`flip-card-inner-CAE-part2  ${questionClass}`}
                  >
                    <div className='flip-card-front-CAE-part2'>
                      <div className='part2-question-questions-and-button-container'>
                        <div className='part2-question-flex-column'>
                          <div className='part2-edit-question-container'>
                            <ul>
                              <li className='part2-question-text'>
                                {context.questionOne}
                              </li>
                              <li className='part2-question-text'>
                                {context.questionTwo}
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className='tool-bar-toggleTurn-container'></div>
                        <button
                          className={
                            'short-turn-button CAE-part2-short-turn-button '
                          }
                          onClick={handleViewShortTurnClick}
                        >
                          show short turn
                        </button>
                      </div>
                    </div>
                    <div className='flip-card-back-vertical'>
                      <div className='part2-question-questions-and-button-container'>
                        <div className='part2-question-flex-column'>
                          <div className='part2-edit-question-container'>
                            <ul>
                              <li className='part2-question-text'>
                                {context.shortTurnQuestion
                                  ? context.shortTurnQuestion
                                  : dataNotLoadedErrorMessage}
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className='tool-bar-toggleTurn-container'>
                          <button
                            className={
                              'short-turn-button CAE-part2-short-turn-button '
                            }
                            onClick={handleViewShortTurnClick}
                          >
                            show long turn
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='CAE-part2-image-row'>
                <div className='part2-image-container-left'>
                  <ExamPicture
                    image={context.imageOneUrl}
                    setImage={context.setImageOneUrl}
                  />
                </div>

                <div className='part2-image-container-centre'>
                  <ExamPicture
                    image={context.imageTwoUrl}
                    setImage={context.setImageTwoUrl}
                  />
                </div>
                <div className='part2-image-container-right'>
                  <ExamPicture
                    image={context.imageThreeUrl}
                    setImage={context.setImageThreeUrl}
                  />
                </div>
              </div>

              <div className='tool-bar-row'>
                {context.authorId && (
                  <CreatorInfo authorId={context.authorId} />
                )}
                <Timer time={time} />

                <div className='tool-btn-container'>
                  {context.authorId === userId && (
                    <Link
                      to={{
                        pathname: `/EditCAEPart2/${context.docRef}`,
                      }}
                    >
                      <button className='tool-bar-btn hide-on-fullscreen'>
                        <EditOutlinedIcon />
                      </button>
                    </Link>
                  )}
                  <ShareButton
                    className='tool-bar-btn hide-on-fullscreen'
                    sharedItemType={'FCE Part 2'}
                  />
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
  } else {
    return (
      <div className={'full-width'}>
        <LinearProgress />
      </div>
    );
  }
};

export default CAEPart2;
