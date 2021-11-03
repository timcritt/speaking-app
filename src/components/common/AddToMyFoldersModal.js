import React from 'react';
import useFirestore from '../../hooks/useFirestore';
import Modal from 'components/common/Modal';
import { folders } from '../../APIHandlers/firebaseConsts';
import Folders from 'components/common/Folders';
import FolderSummaryShort from './FolderSummaryShort';
import CreateNewFolder from 'components/common/CreateNewFolder';

function AddToMyFoldersModal({ userId, closeAddToFolderModal, testId }) {
  const { docs } = useFirestore(folders, userId);
  return (
    <Modal
      className='open-add-folder-modal-btn'
      heading='Add test to folder'
      setModalOpen={closeAddToFolderModal}
    >
      <div className='search-terms-container'>
        <div className='filter-bar'>
          <CreateNewFolder label={'NEW FOLDER'} />
        </div>
      </div>
      <Folders folders={docs} testId={testId}>
        <FolderSummaryShort userId={userId} />
      </Folders>
    </Modal>
  );
}

export default AddToMyFoldersModal;
