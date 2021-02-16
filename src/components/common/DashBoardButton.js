import React from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const DashBoardButton = ({ linkTo, label }) => {
  var history = useHistory();
  let pathname = useLocation().pathname;

  const handleChangeChecked = () => {
    return pathname === linkTo;
  };

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
        checked={handleChangeChecked()}
        onChange={() => handleChangeChecked()}
      />
      <span className='dashboard-radio-label'>{label}</span>
    </span>
  );
};

export default DashBoardButton;
