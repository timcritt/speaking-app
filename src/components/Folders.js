import React from 'react';

const Folders = ({ folders, testId, children }) => {
  return (
    <div className='my-folders-container'>
      <div className='folders-container'>
        {folders &&
          folders.map((folder) => {
            return React.cloneElement(children, {
              key: folder.id,
              folder: folder,
              testArrays: folder.testArrays,
              testId: testId,
            });
          })}
      </div>
    </div>
  );
};

export default Folders;
