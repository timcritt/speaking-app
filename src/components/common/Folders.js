import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

const Folders = ({ folders, testId, children }) => {
  console.log(testId);
  if (folders) {
    return (
      <div className=''>
        <div className='folders-container'>
          {folders &&
            folders.map((folder) => {
              return React.cloneElement(children, {
                key: folder.id,
                folder: folder,
                testId: testId,
              });
            })}
        </div>
      </div>
    );
  } else {
    return <LinearProgress />;
  }
};

export default Folders;
