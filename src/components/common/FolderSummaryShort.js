import React, { useState, useLayoutEffect, useRef } from 'react';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import addTestToFolder from 'APIHandlers/addTestToFolder';
import checkIfTestInFolder from 'APIHandlers/checkIfTestInFolder';
import deleteTestFromFolder from 'APIHandlers/deleteTestFromFolder';
import { throttle } from 'lodash';

const FolderSummaryShort = ({ folder, testId, userId }) => {
  const [isInFolder, setIsInFolder] = useState(false);
  const [checkBoxDisabled, setCheckBoxDisabled] = useState(false);

  const tickBoxRef = useRef();

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

  const handleChange = async (e) => {
    //disable checkbox to prevent rapid, repeated api calls that could lead to the test count of the folder being innacurate.
    e.preventDefault();
    if (!isInFolder && !tickBoxRef.current.disabled) {
      tickBoxRef.current.disabled = true;
      try {
        await addTestToFolder(folder.id, testId, userId);
        setIsInFolder(() => true);
      } catch (error) {
        console.log(error);
        setIsInFolder(false);
      }

      setTimeout(() => {
        tickBoxRef.current.disabled = false;
      }, 1000);
    } else if (!tickBoxRef.current.disabled) {
      tickBoxRef.current.disabled = true;
      try {
        await deleteTestFromFolder(folder.id, testId);
        setIsInFolder(false);
      } catch (error) {
        console.log(error);
        setIsInFolder(true);
      }

      setTimeout(() => {
        tickBoxRef.current.disabled = false;
      }, 2000);
    }
    console.log(folder);
  };

  return (
    <div className='folder-container' onClick={handleChange}>
      <div className='folder-info-container'>
        <div className='folder-icon-title-container'>
          <span>
            <input
              ref={tickBoxRef}
              type='checkbox'
              id='tickBox'
              name='tickBox'
              value='none'
              checked={isInFolder}
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
