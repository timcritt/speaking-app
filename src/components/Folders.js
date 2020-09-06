import React from 'react';
import FolderSummary from './FolderSummary';

const Folders = ({ folders, FolderList, testId }) => {
  return (
    <div className='my-folders-container'>
      <div className='folders-container'>
        {folders &&
          folders.map((folder) => {
            return (
              <FolderList
                key={folder.id}
                folder={folder}
                testArrays={folder.testArrays}
                testId={testId}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Folders;
