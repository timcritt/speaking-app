import React, { useState } from 'react';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import { folders } from '../../APIHandlers/firebaseConsts';
import deleteRecordFirestore from '../../APIHandlers/deleteRecordFirestore';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { useHistory } from 'react-router-dom';
import EditFolderModal from '../CreatorContent/EditFolderModal';
import CreatorInfo from './CreatorInfo';

const FolderSummary = ({ folder }) => {
  const history = useHistory();
  const [folderModalOpen, setFolderModalOpen] = useState(false);

  return (
    <div className='folder-container'>
      <div className='folder-info-container'>
        <FolderOutlinedIcon
          className='folder-summary-icon'
          onClick={() => history.push(`/folder/${folder.id}`)}
        />
        <div className='folder-icon-title-container'>
          <span className='folder-title'>{folder.title}</span>
          <span>{`(${folder.tests.length} tests)`}</span>
        </div>
      </div>
      <CreatorInfo creatorId={folder.userId} />
      <div className='folder-summary-toolbar'>
        <DeleteForeverOutlinedIcon
          className='delete-folder-btn'
          onClick={() => deleteRecordFirestore(folder.id, folders)}
        />
        <EditOutlinedIcon onClick={() => setFolderModalOpen(true)} />
      </div>
      {folderModalOpen && (
        <EditFolderModal
          folder={folder}
          setModalOpen={setFolderModalOpen}
          modalOpen={folderModalOpen}
        />
      )}
    </div>
  );
};

export default FolderSummary;
