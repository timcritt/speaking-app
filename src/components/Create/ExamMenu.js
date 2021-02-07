import React from 'react';
import { Link } from 'react-router-dom';

const ExamMenu = ({ examTitle }) => {
  return (
    <Link to={`/${examTitle}Part2`}>
      <div className='click-exam'>{examTitle}</div>
    </Link>
  );
};

export default ExamMenu;
