import React from 'react';
import ExamMenu from '../components/ExamMenu';

export const Home = () => {
  return (
    <main className='HolyGrail-content'>
      <ExamMenu examTitle='FCE' className='click-exam' />
      <ExamMenu examTitle='CAE' className='click-exam' />
      <ExamMenu examTitle='CPE' className='click-exam' />
    </main>
  );
};
