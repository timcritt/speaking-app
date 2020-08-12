import React from 'react';
import ExamImageContainer from './ExamImageContainer';
import skateboarding from '../img/skateboarding.jpg';
import football from '../img/football.jpg';
import Timer from './Timer';

const FCEPart2 = () => {
  return (
    <main className='HolyGrail-content'>
      <div className='part2-main-row'>
        <div className='question-container'>
          <h1 className='part2-question-text'>
            What are the people enjoying about these activities?
          </h1>
        </div>
        <div className='part2-image-row'>
          <ExamImageContainer image={skateboarding} />
          <ExamImageContainer image={football} />
        </div>
        <div className='timer-row'>
          <Timer />
        </div>
      </div>
    </main>
  );
};

export default FCEPart2;
