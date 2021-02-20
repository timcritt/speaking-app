import React, { useState, useEffect } from 'react';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import StopOutlinedIcon from '@material-ui/icons/StopOutlined';
import RotateLeftOutlinedIcon from '@material-ui/icons/RotateLeftOutlined';

const Timer = ({ time }) => {
  const [currentTime, setCurrentTime] = useState();
  const [ticking, setTicking] = useState(false);
  const [timerId, setTimerId] = useState(0);
  const [buttonClass, setButtonClass] = useState('btn-start');

  //monitors changes to default total time passed in as prop
  useEffect(() => {
    setCurrentTime(time);
  }, [time]);

  useEffect(() => {
    if (ticking && currentTime > 0) {
      setTimerId(
        setTimeout(() => {
          setCurrentTime(currentTime - 1);
        }, 10)
      );
    }
  }, [currentTime, ticking]);

  useEffect(() => {
    if (ticking) {
      setButtonClass('btn-stop');
    } else {
      setButtonClass('btn-start');
    }
  }, [ticking]);

  return (
    <div className='timer-container '>
      <div>{currentTime > 0 ? parseInt(currentTime / 100) : 'time up!'}</div>
      <div className='part2-button-container'>
        <button
          className={`timer-btn ${buttonClass}`}
          onClick={() => setTicking((prevTicking) => !prevTicking)}
          disabled={currentTime === 0}
        >
          {ticking ? <StopOutlinedIcon /> : <PlayArrowOutlinedIcon />}
        </button>
        <button
          className='timer-btn btn-reset'
          onClick={() => {
            clearTimeout(timerId);
            setTicking(false);
            setCurrentTime(time);
          }}
        >
          <RotateLeftOutlinedIcon />
        </button>
      </div>
    </div>
  );
};

export default Timer;
