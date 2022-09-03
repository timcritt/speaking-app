import React, { useState, useLayoutEffect, useRef } from 'react';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import addTestToFolder from 'APIHandlers/addTestToFolder';
import checkIfTestInFolder from 'APIHandlers/checkIfTestInFolder';
import deleteTestFromFolder from 'APIHandlers/deleteTestFromFolder';

const FolderSummaryShort = ({ folder, testId, userId }) => {
  const [isInFolder, setIsInFolder] = useState(false);

  const tickBoxRef = useRef();

  useLayoutEffect(() => {
    var isMounted = true;

    if (isMounted) {
      (async () => {
        const result = await checkIfTestInFolder(folder.id, testId);
        if (result & isMounted) {
          setIsInFolder(true);
        } else {
          setIsInFolder(false);
        }
      })();
    }

    return () => (isMounted = false);
  }, [folder.id, testId]);

  const handleChange = async (e) => {
    e.preventDefault();
    if (!isInFolder && !tickBoxRef.current.disabled) {
      //disable checkbox to prevent rapid, repeated api calls that could lead to the test count of the folder being innacurate.
      tickBoxRef.current.disabled = true;
      try {
        await addTestToFolder(folder.id, testId, userId);
        setIsInFolder(() => true);
      } catch (error) {
        setIsInFolder(false);
      }

      tickBoxRef.current.disabled = false;
    } else if (!tickBoxRef.current.disabled) {
      tickBoxRef.current.disabled = true;
      try {
        await deleteTestFromFolder(folder.id, testId);
        setIsInFolder(false);
      } catch (error) {
        setIsInFolder(true);
      }

      tickBoxRef.current.disabled = false;
    }
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
