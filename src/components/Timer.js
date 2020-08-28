import React, { useState, useEffect } from 'react';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import StopOutlinedIcon from '@material-ui/icons/StopOutlined';
import RotateLeftOutlinedIcon from '@material-ui/icons/RotateLeftOutlined';

const Timer = () => {
  const [time, setTime] = useState(6000);
  const [ticking, setTicking] = useState(false);
  const [timerId, setTimerId] = useState(0);
  const [buttonClass, setButtonClass] = useState('btn-start');

  useEffect(() => {
    if (ticking && time > 0) {
      setTimerId(
        setTimeout(() => {
          setTime(time - 1);
        }, 10)
      );
    }
  }, [time, ticking]);

  useEffect(() => {
    if (ticking) {
      setButtonClass('btn-stop');
    } else {
      setButtonClass('btn-start');
    }
  }, [ticking]);

  return (
    <div className='timer-container '>
      <div>{time > 0 ? parseInt(time / 100) : 'time up!'}</div>
      <div className='part2-button-container'>
        <button
          className={`timer-btn ${buttonClass}`}
          onClick={() => setTicking((prevTicking) => !prevTicking)}
          disabled={time === 0}
        >
          {ticking ? <StopOutlinedIcon /> : <PlayArrowOutlinedIcon />}
        </button>
        <button
          className='timer-btn btn-reset'
          onClick={() => {
            clearTimeout(timerId);
            setTicking(false);
            setTime(6000);
          }}
        >
          <RotateLeftOutlinedIcon />
        </button>
      </div>
    </div>
  );
};

export default Timer;
