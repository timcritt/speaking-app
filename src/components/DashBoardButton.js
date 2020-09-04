import React from 'react';
import { useHistory } from 'react-router-dom';

const DashBoardButton = ({ linkTo, label, checked }) => {
  var history = useHistory();

  return (
    <span
      className='dashboard-button-container'
      onClick={() => history.push(linkTo)}
    >
      <input
        className='dashboard-radio-btn'
        type='radio'
        id='recent'
        name='dashboard-button'
        defaultChecked={checked}
      />
      <span className='dashboard-radio-label'>{label}</span>
    </span>
  );
};

export default DashBoardButton;
