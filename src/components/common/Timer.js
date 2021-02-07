import React, { useState, useEffect } from 'react';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import StopOutlinedIcon from '@material-ui/icons/StopOutlined';
import RotateLeftOutlinedIcon from '@material-ui/icons/RotateLeftOutlined';

const Timer = ({ time = 6000 }) => {
  const [timeState, setTimeState] = useState(time);
  const [ticking, setTicking] = useState(false);
  const [timerId, setTimerId] = useState(0);
  const [buttonClass, setButtonClass] = useState('btn-start');

  useEffect(() => {
    if (ticking && timeState > 0) {
      setTimerId(
        setTimeout(() => {
          setTimeState(timeState - 1);
        }, 10)
      );
    }
  }, [timeState, ticking]);

  useEffect(() => {
    if (ticking) {
      setButtonClass('btn-stop');
    } else {
      setButtonClass('btn-start');
    }
  }, [ticking]);

  return (
    <div className='timer-container '>
      <div>{timeState > 0 ? parseInt(timeState / 100) : 'time up!'}</div>
      <div className='part2-button-container'>
        <button
          className={`timer-btn ${buttonClass}`}
          onClick={() => setTicking((prevTicking) => !prevTicking)}
          disabled={timeState === 0}
        >
          {ticking ? <StopOutlinedIcon /> : <PlayArrowOutlinedIcon />}
        </button>
        <button
          className='timer-btn btn-reset'
          onClick={() => {
            clearTimeout(timerId);
            setTicking(false);
            setTimeState(time);
          }}
        >
          <RotateLeftOutlinedIcon />
        </button>
      </div>
    </div>
  );
};

export default Timer;
