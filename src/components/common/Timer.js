import React, { useState, useEffect } from 'react';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import StopOutlinedIcon from '@material-ui/icons/StopOutlined';
import RotateLeftOutlinedIcon from '@material-ui/icons/RotateLeftOutlined';

//CSS Modules
import styles from './Timer.module.css';

const Timer = ({ time }) => {
  const [currentTime, setCurrentTime] = useState();
  const [ticking, setTicking] = useState(false);
  const [timerId, setTimerId] = useState(0);
  const [buttonClass, setButtonClass] = useState(styles.start);

  //monitors changes to default total time passed in as prop
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setTicking(false);
      clearTimeout(timerId);
      setCurrentTime(time);
    }
    return () => {
      unmounted = true;
      clearTimeout(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  useEffect(() => {
    let unmounted = false;

    if (!unmounted && ticking && currentTime > 0) {
      setTimerId(
        setTimeout(() => {
          setCurrentTime((currentTime) => currentTime - 100);
        }, 1000)
      );
    }

    return () => {
      unmounted = true;
      clearTimeout(timerId);
    };
  }, [currentTime, ticking]);

  useEffect(() => {
    let unmounted = false;

    if (!unmounted && ticking) {
      setButtonClass(styles.stop);
    } else {
      setButtonClass(styles.start);
    }
    return () => {
      unmounted = true;
      clearTimeout(timerId);
    };
  }, [ticking, timerId]);

  return (
    <div className={styles.container}>
      <div className={styles.button_container}>
        <button
          className={`${styles.btn} ${buttonClass}`}
          onClick={() => setTicking((prevTicking) => !prevTicking)}
          disabled={currentTime === 0}
        >
          {ticking ? <StopOutlinedIcon /> : <PlayArrowOutlinedIcon />}
        </button>
        <button
          className={`${styles.btn} ${styles.reset}`}
          onClick={() => {
            clearTimeout(timerId);
            setTicking(false);
            setCurrentTime(time);
          }}
        >
          <RotateLeftOutlinedIcon />
        </button>
        <div className={styles.time_display}>
          {currentTime > 0 ? (
            <span>
              {String(Math.trunc(Number(currentTime / 100) / 60)).padStart(2, '0')}:
              {String(Math.trunc(Number(currentTime / 100) % 60)).padStart(2, '0')}
            </span>
          ) : (
            'time up'
          )}
        </div>
      </div>
    </div>
  );
};

export default Timer;
