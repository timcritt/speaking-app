import React, { Fragment } from 'react';
import ExamMenu from '../components/ExamMenu';

export const Home = () => {
  return (
    <Fragment>
      <div className='holy-grail-body'>
        <section className='holy-grail-content home-content'>
          <ExamMenu examTitle='FCE' className='click-exam' />
          <ExamMenu examTitle='CAE' className='click-exam' />
          <ExamMenu examTitle='CPE' className='click-exam' />
        </section>
      </div>
    </Fragment>
  );
};
