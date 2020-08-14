import React, { useState, useEffect, Fragment } from 'react';

const Timer = () => {
  const [time, setTime] = useState(600);
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
          className={`btn ${buttonClass}`}
          onClick={() => setTicking((prevTicking) => !prevTicking)}
          disabled={time === 0}
        >
          {ticking ? 'STOP' : 'START'}
        </button>
        <button
          className='btn btn-reset'
          onClick={() => {
            clearTimeout(timerId);
            setTicking(false);
            setTime(6000);
          }}
        >
          RESET
        </button>
      </div>
    </div>
  );
};

export default Timer;
