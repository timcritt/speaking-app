import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const DashBoardButton = ({ linkTo, label }) => {
  console.log(linkTo, 'rendering');

  var history = useHistory();
  let pathname = useLocation().pathname;

  const handleChangeChecked = useCallback(() => {
    if (pathname === linkTo) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [pathname, linkTo]);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    handleChangeChecked();
  }, [handleChangeChecked]);

  return (
    <span className='dashboard-button-container' onClick={() => history.push(linkTo)}>
      <input
        className='dashboard-radio-btn'
        type='radio'
        checked={checked}
        onChange={() => handleChangeChecked()}
      />
      <span className='dashboard-radio-label'>{label}</span>
    </span>
  );
};

export default DashBoardButton;
