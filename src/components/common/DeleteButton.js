import React, { Fragment, useState } from 'react';
import Modal from './Modal';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//API handlers
import deleteRecordFirestore from 'APIHandlers/deleteRecordFirestore';

//CSS Modules
import styles from './DeleteButton.module.css'

function DeleteButton({
  itemId,
  deleteItemType,
  iconColour,
  firestoreCollection,
  handleDelete = null,
}) {
  const [DeleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const handleCloseModal = (e) => {
    //prevent form submission if inside form element
    e.preventDefault()
    setDeleteModalIsOpen(false);
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteModalIsOpen(true);
  };

  const handleDeleteItemConfirm = async (e) => {
    
    //uses the delete function passed as a prop if present
    if (handleDelete) {
      handleDelete();
    } else {
      //uses the default delete record function
      await deleteRecordFirestore(itemId, firestoreCollection);
    }
    setDeleteModalIsOpen(false);
  };

  return (
    <Fragment>
      {DeleteModalIsOpen && (
        <Modal
          className='open-add-folder-modal-btn'
          modalOpen={DeleteModalIsOpen}
          heading={`delete ${deleteItemType}`}
          setModalOpen={handleCloseModal}
        >
          <span className='modal-warning-text'>
            {`Are you sure you want to delete this ${deleteItemType}? This action cannot be undone!`}{' '}
          </span>
          <div className='modal-button-container'>
            <button className='get-started-btn' onClick={handleDeleteItemConfirm}>
              confirm
            </button>
            <button className='get-started-btn' onClick={handleCloseModal}>
              cancel
            </button>
          </div>
        </Modal>
      )}

      <button className={styles.delete_button} onClick={handleOpenModal}>
        delete <HighlightOffIcon style={{ color: `${iconColour}` }} />
      </button>
    </Fragment>
  );
}

export default DeleteButton;
