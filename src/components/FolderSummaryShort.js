import React, { useState, useEffect } from 'react';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import updateFolderTests from '../APIHandlers/updateFolderTests';

const FolderSummaryShort = ({ folder, testId }) => {
  const [isInFolder, setIsInFolder] = useState(false);

  useEffect(() => {
    if (folder.tests.includes(testId)) {
      setIsInFolder(true);
    } else {
      setIsInFolder(false);
    }
  }, [folder, testId, isInFolder]);

  const handleChange = () => {
    var newTestArray;

    if (!isInFolder) {
      newTestArray = [...folder.tests, testId];
      console.log(newTestArray);
    } else {
      newTestArray = folder.tests.filter((test) => test !== testId);
    }
    updateFolderTests(folder.id, newTestArray);
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
