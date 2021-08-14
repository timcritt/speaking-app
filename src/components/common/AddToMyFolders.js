import React, { useContext, useState, Fragment } from 'react';
import { firebaseAuth } from '../../context/AuthProvider';
import useFirestore from '../../hooks/useFirestore';
import { folders } from '../../APIHandlers/firebaseConsts';
import FoldersPresentation from 'components/common/FoldersPresentation';
import FolderSummaryShort from './FolderSummaryShort';
import Modal from 'components/common/Modal';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';

//place component in the HTML where you want the button and icon to appear. The modal displays in an overlay when button is clicked.
//icon color can be changed by passing in a value as props
//class of icon can be changed by passing in a value as props

const AddToMyFolders = ({
  testId,
  iconColor = 'black',
  iconClassName = '',
}) => {
  const [AddToFolderModalOpen, setAddToFolderModalOpen] = useState(false);
  const { userId } = useContext(firebaseAuth);
  const { docs } = useFirestore(folders, userId);

  const openAddToFolderModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAddToFolderModalOpen(true);
  };
  const closeAddToFolderModal = (e) => {
    setAddToFolderModalOpen(false);
  };

  return (
    <Fragment>
      <div>
        <button
          className='tool-bar-btn '
          style={{ color: `${iconColor}` }}
          onClickCapture={openAddToFolderModal}
        >
          <PlaylistAddOutlinedIcon className={iconClassName} />
        </button>
        {AddToFolderModalOpen && (
          <Modal
            className='open-add-folder-modal-btn'
            heading='Add test to folder'
            setModalOpen={closeAddToFolderModal}
          >
            <FoldersPresentation folders={docs} testId={testId}>
              <FolderSummaryShort userId={userId} />
            </FoldersPresentation>
          </Modal>
        )}
      </div>
    </Fragment>
  );
};

export default AddToMyFolders;
