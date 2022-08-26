import React, { useState, useLayoutEffect, useCallback } from 'react';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import addTestToFolder from 'APIHandlers/addTestToFolder';
import checkIfTestInFolder from 'APIHandlers/checkIfTestInFolder';
import deleteTestFromFolder from 'APIHandlers/deleteTestFromFolder';

import { throttle } from 'lodash';

const FolderSummaryShort = ({ folder, testId, userId }) => {
  const [isInFolder, setIsInFolder] = useState(false);
  const [checkBoxDisabled, setCheckBoxDisabled] = useState(false);

  useLayoutEffect(() => {
    var isMounted = true;
    const asyncFunction = async () => {
      const result = await checkIfTestInFolder(folder.id, testId);

      if (result & isMounted) {
        setIsInFolder(true);
      } else {
        setIsInFolder(false);
      }
    };
    if (isMounted) {
      asyncFunction();
    }

    return () => (isMounted = false);
  }, [folder.id, testId]);

  const throttledAddTestsToFolder = useCallback(() => {
    throttle(addTestToFolder(folder.id, testId, userId), 1000, { leading: true, trailing: false });
    setIsInFolder(() => true);
    setCheckBoxDisabled(false);
  }, [folder.id, testId, userId, setIsInFolder]);

  const handleChange = useCallback(() => {
    (async () => {
      console.log('isInFoler', isInFolder);
      //disable checkbox to prevent rapid, repeated api calls that could lead to the test count of the folder being innacurate.
      setCheckBoxDisabled(true);
      if (!isInFolder) {
        try {
          console.log('about to fire throttled function');
          throttledAddTestsToFolder();
          setIsInFolder(() => true);
        } catch {
          setIsInFolder(false);
          setCheckBoxDisabled(false);
        }
      } else {
        try {
          await deleteTestFromFolder(folder.id, testId);
          setIsInFolder(false);
          setCheckBoxDisabled(false);
        } catch {
          setIsInFolder(true);
          setCheckBoxDisabled(false);
        }
      }
    })();
  }, [folder.id, isInFolder, testId, throttledAddTestsToFolder]);

  //const throttledHandleChange = throttle(handleChange, 5000, { leading: true, trailing: false });

  return (
    <div className='folder-container' onClick={handleChange}>
      <div className='folder-info-container'>
        <div className='folder-icon-title-container'>
          <span>
            <input
              type='checkbox'
              id='vehicle1'
              name='vehicle1'
              value='Bike'
              checked={isInFolder}
              disabled={checkBoxDisabled}
              onChange={(e) => e.preventDefault()}
            />
          </span>
          <FolderOutlinedIcon />
          <span className='folder-title'>{folder.title}</span>
        </div>
      </div>
      <div className='folder-summary-toolbar'>
        <span>{folder.testCount}</span>
      </div>
    </div>
  );
};

export default FolderSummaryShort;
