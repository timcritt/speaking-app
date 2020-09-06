import React, { Fragment, useState, useContext, useEffect } from 'react';
import addFolder from '../APIHandlers/addFolder';
import { firebaseAuth } from '../context/AuthProvider';
import { timestamp } from '../firebase/firebaseIndex';
import useFirestore from '../hooks/useFirestore';
import { folders } from '../firebase/firebaseConsts';

import FilterInput from './FilterInput';
import Modal from './Modal';
import CreateNewFolderOutlinedIcon from '@material-ui/icons/CreateNewFolderOutlined';
import Folders from './Folders';

const MyFolders = ({ FolderList, testId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { userId } = useContext(firebaseAuth);
  const [filterTerm, setFilterTerm] = useState();
  const [searchResults, setSearchResults] = useState();
  const { docs } = useFirestore(folders, userId);
  const [folderModalOpen, setFolderModalOpen] = useState(false);
  const [sortType, setSortType] = useState('date');

  const handleAddFolder = async () => {
    const tests = [];
    const createdAt = timestamp();
    await addFolder(title, description, tests, createdAt, userId);
    setFolderModalOpen(false);
    setTitle('');
    setDescription('');
  };

  const handleSetFilterTerm = (e) => {
    setFilterTerm(e.currentTarget.value);
  };

  const handleSelect = (e) => {
    console.log(e.currentTarget.value);
    setSortType(e.currentTarget.value);
  };

  useEffect(() => {
    var filteredDocs = JSON.parse(JSON.stringify(docs));

    if (filterTerm) {
      filteredDocs = filteredDocs.filter((doc) =>
        doc.title.toUpperCase().includes(filterTerm.toUpperCase())
      );
    }

    if (sortType == 'title') {
      filteredDocs = filteredDocs.sort((a, b) => {
        var titleA = a.title.toUpperCase();
        var titleB = b.title.toUpperCase();

        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
        return 0;
      });
    }
    setSearchResults(filteredDocs);
  }, [docs, filterTerm, sortType]);

  return (
    <Fragment>
      <div className='filter-input-container'>
        <div>
          <label htmlFor='sortfolders'>Sort by </label>
          <select
            className='select-order-by'
            id='sortfolders'
            name='sort'
            vale={sortType}
            onChange={(e) => handleSelect(e)}
          >
            <option value='date'>Date</option>
            <option value='title'>Name</option>
          </select>
        </div>
        <CreateNewFolderOutlinedIcon
          className='open-add-folder-modal-btn'
          onClick={() => setFolderModalOpen(true)}
        />
        <FilterInput
          placeholder={'filter by folder name'}
          handleSetFilterTerm={handleSetFilterTerm}
        />
        {folderModalOpen && (
          <Modal closeModal={setFolderModalOpen} heading={'Add Folder'}>
            <div className='create-folder-form-container'>
              <input
                className='create-folder-input'
                placeholder='title'
                onChange={(e) => setTitle(e.currentTarget.value)}
                defaultValue={title}
              ></input>
              <input
                className='create-folder-input'
                placeholder='description'
                onChange={(e) => setDescription(e.currentTarget.value)}
              ></input>
              <button
                className='modal-big-btn'
                disabled={!title}
                onClick={handleAddFolder}
              >
                create
              </button>
            </div>
          </Modal>
        )}
      </div>
      {searchResults && (
        <Folders
          folders={searchResults}
          FolderList={FolderList}
          testId={testId}
        ></Folders>
      )}
    </Fragment>
  );
};

export default MyFolders;
