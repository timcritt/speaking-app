import React, { Fragment, useState, useEffect } from 'react';
import EditFolderModal from 'components/CreatorContent/EditFolderModal';
import FilterInput from './FilterInput';
import CreateNewFolderOutlinedIcon from '@material-ui/icons/CreateNewFolderOutlined';
import Folders from './Folders';
import InputSort from './InputSort';

const FoldersPresentation = ({ folders, testId, addFolder, children }) => {
  const [filterTerm, setFilterTerm] = useState();
  const [results, setResults] = useState();
  const [sortType, setSortType] = useState('Most Recent');
  const [folderModalOpen, setFolderModalOpen] = useState(false);
  const handleSetFilterTerm = (e) => {
    setFilterTerm(e.currentTarget.value);
  };

  const handleChangeSort = (e) => {
    console.log(e.currentTarget.value);
    setSortType(e.currentTarget.value);
  };

  useEffect(() => {
    var filteredFolders = JSON.parse(JSON.stringify(folders));

    if (filterTerm) {
      filteredFolders = filteredFolders.filter((folder) =>
        folder.title.toUpperCase().includes(filterTerm.toUpperCase())
      );
    }

    if (sortType === 'Title') {
      filteredFolders = filteredFolders.sort((a, b) => {
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
    setResults(filteredFolders);
  }, [folders, filterTerm, sortType]);
  console.log(folders);
  return (
    <Fragment>
      <div className='filter-input-container'>
        <InputSort
          handleChange={handleChangeSort}
          selectValue={sortType}
          values={['Most Recent', 'Title']}
        />

        {addFolder && (
          <CreateNewFolderOutlinedIcon
            className='open-add-folder-modal-btn'
            onClick={() => setFolderModalOpen(true)}
          />
        )}
        <FilterInput
          placeholder={'filter by folder name'}
          handleSetFilterTerm={handleSetFilterTerm}
        />

        {folderModalOpen && (
          <EditFolderModal
            modalOpen={folderModalOpen}
            setModalOpen={setFolderModalOpen}
          ></EditFolderModal>
        )}
      </div>
      {results && (
        <Folders
          folders={results}
          testId={testId}
          children={children}
        ></Folders>
      )}
    </Fragment>
  );
};

export default FoldersPresentation;
