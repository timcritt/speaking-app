import React, { useContext, useState, Fragment } from 'react';
import { firebaseAuth } from '../../context/AuthProvider';

import AddToMyFoldersModal from 'components/common/AddToMyFoldersModal';

import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';

//place component in the HTML where you want the button and icon to appear. The modal displays in an overlay when button is clicked.
//icon color can be changed by passing in a value as props
//class of icon can be changed by passing in a value as props

const AddToMyFolders = ({ testId, iconColor = 'black', iconClassName = '' }) => {
  const [AddToFolderModalOpen, setAddToFolderModalOpen] = useState(false);
  const { userId } = useContext(firebaseAuth);

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
          //to avoid excessive API subscriptions, the hook to start the subscriptions has been moved down a level to AddToMyFoldesrModal so it only starts when the user clicks
          //to add the test to the folder. Previously, the suscription was made at the current level, which meant a subscription was set up for EVERY test the user had
          //when viewing their content page.
          <AddToMyFoldersModal
            userId={userId}
            testId={testId}
            closeAddToFolderModal={closeAddToFolderModal}
          />
        )}
      </div>
    </Fragment>
  );
};

export default AddToMyFolders;
