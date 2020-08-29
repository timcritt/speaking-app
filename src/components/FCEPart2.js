import React, { useState, useEffect } from 'react';
import ExamImageContainer2 from './ExamImageContainer2';
import Timer from './Timer';
import { Link } from 'react-router-dom';
import useGetTest from '../hooks/useGetTest';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import FullscreenOutlinedIcon from '@material-ui/icons/FullscreenOutlined';
import FullscreenExitOutlinedIcon from '@material-ui/icons/FullscreenExitOutlined';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { Twitter } from 'react-social-sharing';
import queryString from 'query-string';

const FCEPart2 = (props) => {
  const [question, setQuestion] = useState();
  const [imageOne, setImageOne] = useState();
  const [imageTwo, setImageTwo] = useState();
  const [docRef, setDocRef] = useState('');

  const handleFullScreen = useFullScreenHandle();

  //call database
  const values = queryString.parse(props.location.search);
  var test = useGetTest(props.match.params.id);
  console.log(test);
  useEffect(() => {
    if (test) {
      setDocRef(test.id);
      setImageOne(test.imageOne);
      setImageTwo(test.imageTwo);
      setQuestion(test.question);
    }
  }, [test]);

  return (
    <FullScreen handle={handleFullScreen}>
      <div className='holy-grail-body'>
        <main className='holy-grail-content fade-in'>
          <div className='part2-main-row'>
            <div className='question-row'>
              <span className='question-input'>{question}</span>
            </div>
            <div className='part2-image-row'>
              <ExamImageContainer2 image={imageOne} />
              <ExamImageContainer2 image={imageTwo} />
            </div>

            <div className='tool-bar-row'>
              <Timer />
              <div className='tool-btn-container'>
                {docRef && (
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
