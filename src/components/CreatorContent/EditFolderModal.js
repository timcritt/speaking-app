import React, { useState, useContext, useEffect } from 'react';
import Modal from '../common/Modal';
import updateFolder from '../../APIHandlers/updateFolder';
import addFolder from '../../APIHandlers/addFolder';
import { timestamp } from '../../firebase/firebaseIndex';
import { firebaseAuth } from '../../context/AuthProvider';

//if folder is passed down, component functions as an editor. Else, component functions to create new folder
const EditFolderModal = ({ modalOpen, folder, setModalOpen }) => {
  const [localTitle, setLocalTitle] = useState(folder ? folder.title : '');
  const [localDescription, setLocalDescription] = useState(
    folder ? folder.description : ''
  );

  const [hasBeenEdited, setHasBeenEdited] = useState(false);
  const { userId } = useContext(firebaseAuth);

  useEffect(() => {
    //disable the "save changes" button unless a change has been made when in editing mode
    if (folder) {
      if (
        localTitle !== folder.title ||
        localDescription !== folder.description
      ) {
        setHasBeenEdited(true);
      } else {
        setHasBeenEdited(false);
      }
      //enable the 'create button' once the user has entered a value when in create mode. Disable it if title is empty
    } else if (localTitle) {
      setHasBeenEdited(true);
    } else {
      setHasBeenEdited(false);
    }
  }, [folder, localDescription, localTitle]);

  const handleClick = async () => {
    const newTimeStamp = timestamp();

    if (folder) {
      await updateFolder(folder.id, localTitle, localDescription);
      setModalOpen(false);
    } else {
      await addFolder(localTitle, localDescription, [], newTimeStamp, userId);
      setLocalTitle('');
      setLocalDescription('');
      setModalOpen(false);
    }
  };

  return (
    <Modal
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      heading={folder ? 'Edit folder' : 'Create folder'}
    >
      <div className='create-folder-form-container'>
        <input
          className='create-folder-input'
          placeholder='title'
          onChange={(e) => setLocalTitle(e.currentTarget.value)}
          defaultValue={localTitle}
        ></input>
        <input
          className='create-folder-input'
          placeholder='description'
          onChange={(e) => setLocalDescription(e.currentTarget.value)}
          defaultValue={localDescription}
        ></input>
        <button
          className='modal-big-btn'
          disabled={!hasBeenEdited}
          onClick={handleClick}
        >
          {folder ? 'Save changes' : 'Create'}
        </button>
      </div>
    </Modal>
  );
};

export default EditFolderModal;
