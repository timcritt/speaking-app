import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

const Folders = ({ folders, testId, children }) => {
  if (folders) {
    return (
      <div className='my-folders-container'>
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
