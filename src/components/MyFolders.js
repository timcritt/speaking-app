import React, { Fragment, useState, useContext } from 'react';
import addFolder from '../APIHandlers/addFolder';
import { firebaseAuth } from '../context/AuthProvider';
import { timestamp } from '../firebase/firebaseIndex';
import useFirestore from '../hooks/useFirestore';
import { folders } from '../firebase/firebaseConsts';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';

const MyFolders = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { userId } = useContext(firebaseAuth);

  const { docs } = useFirestore(folders, userId);

  const handleAddFolder = async () => {
    const tests = [];
    const createdAt = timestamp();
    await addFolder(title, description, tests, createdAt, userId);
  };

  return (
    <Fragment>
      <div className='my-folders-container'>
        <div className='create-folder-form-container'>
          <input
            placeholder='title'
            onChange={(e) => setTitle(e.currentTarget.value)}
            defaultValue={title}
          ></input>
          <input
            placeholder='description'
            onChange={(e) => setDescription(e.currentTarget.value)}
          ></input>
          <button onClick={handleAddFolder}>create</button>
        </div>
        <div className='folders-container'>
          {docs &&
            docs.map((folder) => {
              return (
                <div className='folder-container' key={folder.id}>
                  <div className='folder-info-container'>
                    <span>{`${folder.tests.length} tests`}</span>
                    <div className='folder-icon-title-container'>
                      <FolderOutlinedIcon />
                      <span className='folder-title'>{folder.title}</span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Fragment>
  );
};

export default MyFolders;
