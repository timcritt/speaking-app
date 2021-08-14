import React, { useState, useEffect } from 'react';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import updateFolderTests from '../../APIHandlers/updateFolderTests';
import addTestToFolder from 'APIHandlers/addTestToFolder';

const FolderSummaryShort = ({ folder, testId, userId }) => {
  const [isInFolder, setIsInFolder] = useState(false);

  useEffect(() => {
    if (folder.tests.includes(testId)) {
      setIsInFolder(true);
    } else {
      setIsInFolder(false);
    }
  }, [folder, testId, isInFolder]);

  const handleChange = () => {
    console.log(folder.id, testId);
    if (!isInFolder) {
      addTestToFolder(folder.id, testId, userId);
    }
    console.log(folder);
  };

  return (
    <div className='folder-container'>
      <div className='folder-info-container'>
        <span>{`${folder.tests.length} tests`}</span>
        <div className='folder-icon-title-container'>
          <FolderOutlinedIcon />
          <span className='folder-title'>{folder.title}</span>
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
