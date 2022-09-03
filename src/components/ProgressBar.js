import React, { useEffect, useContext } from 'react';
import useStorage from '../hooks/useStorage';
import ImageContext from '../context/ImageContext';

const ProgressBar = ({ file }) => {
  const { url, progress, storageRef } = useStorage(file);

  const setFile = useContext(ImageContext);

  //cannot call parent component setState from within child if child is rendering unless in useEffect.
  useEffect(() => {
    //sets the image url in EditPage to the location of the image on firebase

    setFile(url, storageRef);
  });

  return <div className='progress-bar' style={{ width: progress + '%' }}></div>;
};

export default ProgressBar;
