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

const FCEPart2 = (props) => {
  const [question, setQuestion] = useState();
  const [imageOneUrl, setImageOne] = useState();
  const [imageTwoUrl, setImageTwo] = useState();
  const [docRef, setDocRef] = useState(null);
  const [authorId, setAuthorId] = useState(null);

  //the curent user's id
  const { userId } = useContext(firebaseAuth);
  console.log(userId);
  const handleFullScreen = useFullScreenHandle();

  //call database

  var test = useGetTest(props.match.params.id);

  useEffect(() => {
    if (test) {
      setDocRef(test.id);
      setImageOne(test.imageOneUrl);
      setImageTwo(test.imageTwoUrl);
      setQuestion(test.question);
      setAuthorId(test.userId);
    }
  }, [test]);
  console.log(authorId);
  console.log(userId);
  return (
    <FullScreen handle={handleFullScreen}>
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
