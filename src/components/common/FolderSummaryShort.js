import React, { useState, useEffect } from 'react';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import addTestToFolder from 'APIHandlers/addTestToFolder';
import checkIfTestInFolder from 'APIHandlers/checkIfTestInFolder';
import deleteTestFromFolder from 'APIHandlers/deleteTestFromFolder';
import { junctionFolderTest } from 'APIHandlers/firebaseConsts';

const FolderSummaryShort = ({ folder, testId, userId }) => {
  const [isInFolder, setIsInFolder] = useState(false);

  useEffect(() => {
    var isMounted = true;
    const asyncFunction = async () => {
      const result = await checkIfTestInFolder(folder.id, testId);

      if (result) {
        setIsInFolder(true);
      } else {
        setIsInFolder(false);
      }
    };
    if (isMounted) {
      asyncFunction();
    }

    return () => (isMounted = false);
  }, []);

  const handleChange = async () => {
    console.log(folder.id, testId);
    if (!isInFolder) {
      await addTestToFolder(folder.id, testId, userId);
      setIsInFolder(true);
    } else {
      await deleteTestFromFolder(folder.id, testId);
      setIsInFolder(false);
    }
    console.log(folder);
  };

  return (
    <div className='folder-container'>
      <div className='folder-info-container'>
        <div className='folder-icon-title-container'>
          <FolderOutlinedIcon />
          <span className='folder-title'>{folder.title}</span>
          <span>{folder.testCount}</span>
        </div>
      </div>
      <div className='folder-summary-toolbar'>
        <span>
          <input
            type='checkbox'
            id='vehicle1'
            name='vehicle1'
            value='Bike'
            checked={isInFolder}
            onChange={() => handleChange()}
          />
        </span>
      </div>
    </div>
  );
};

export default FolderSummaryShort;
