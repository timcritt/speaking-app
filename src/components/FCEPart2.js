import React, { useState, useEffect } from 'react';
import ExamImageContainer2 from './ExamImageContainer2';
import football from '../img/football.jpg';
import Timer from './Timer';
import { Link } from 'react-router-dom';
import useGetTest from '../hooks/useGetTest';

const FCEPart2 = (props) => {
  const [question, setQuestion] = useState();
  const [imageOne, setImageOne] = useState();
  const [imageTwo, setImageTwo] = useState();
  const [docRef, setDocRef] = useState('');

  //call database
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
    <main className='holy-grail-content'>
      <div className='part2-main-row'>
        <div className='question-container'>
          <h1 className='part2-question-text'>{question}</h1>
        </div>
        <div className='part2-image-row'>
          <ExamImageContainer2 image={imageOne} />
          <ExamImageContainer2 image={imageTwo} />
        </div>
        <div className='timer-row'>
          <Timer />
        </div>
        <div className='tool-bar-container'>
          <div>
            <a>add to folder</a>
            <Link to={`/EditFCEPart2/${docRef}`}>edit/customise</Link> | share |
            info | ---{' '}
          </div>
        </div>
      </div>
    </main>
  );
};

export default FCEPart2;
