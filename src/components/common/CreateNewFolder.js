import React, { useState, Fragment } from 'react';
import CreateNewFolderOutlinedIcon from '@material-ui/icons/CreateNewFolderOutlined';
import EditFolderModal from 'components/CreatorContent/EditFolderModal';

//place anywhere in the project and a button will display. Click to create new folder.
const CreateNewFolder = ({ label }) => {
  const [folderModalOpen, setFolderModalOpen] = useState(false);

  return (
    <div
      className='filter-bar-item filter-bar-item-clickable'
      onClick={() => setFolderModalOpen(true)}
    >
      <span className={'icon-container'}>
        <CreateNewFolderOutlinedIcon
          className='open-add-folder-modal-btn '
          onClick={() => setFolderModalOpen(true)}
        />
      </span>
      {label}

      {folderModalOpen && (
        <EditFolderModal
          modalOpen={folderModalOpen}
          setModalOpen={setFolderModalOpen}
          onClick={(e) => e.stopPropagation()}
        ></EditFolderModal>
      )}
    </div>
  );
};

export default CreateNewFolder;
