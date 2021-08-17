import React, { Fragment, useState, useEffect } from 'react';
import EditFolderModal from 'components/CreatorContent/EditFolderModal';
import FilterInput from './FilterInput';
import CreateNewFolderOutlinedIcon from '@material-ui/icons/CreateNewFolderOutlined';
import Folders from './Folders';
import FilterListIcon from '@material-ui/icons/FilterList';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import useComponentVisible from 'hooks/useComponentVisible';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import SearchIcon from '@material-ui/icons/Search';
import CreateNewFolder from 'components/common/CreateNewFolder';

const FoldersPresentation = ({ folders, testId, addFolder, children }) => {
  const [filterTerm, setFilterTerm] = useState();
  const [results, setResults] = useState();
  const [sortBy, setSortBy] = useState('ORDER BY');
  const [folderModalOpen, setFolderModalOpen] = useState(false);

  const itemOne = useComponentVisible(false);
  const itemTwo = useComponentVisible(false);
  const itemThree = useComponentVisible(false);

  const handleSetRecent = (e, label) => {
    setSortBy(label);
  };

  const handleSetOld = (e, label) => {
    setSortBy(label);
  };

  const handleSetFilterTerm = (e) => {
    setFilterTerm(e.currentTarget.value);
  };

  const Option = ({ label, handleClickOption }) => {
    return (
      <div
        className='dropdown-option'
        onClick={(e) => handleClickOption(e, label)}
      >
        {label}
      </div>
    );
  };

  const handleResetFilters = () => {
    setSortBy(null);
    setFilterTerm('');
    itemOne.setIsComponentVisible(false);
    itemThree.setIsComponentVisible(false);
  };

  useEffect(() => {
    var filteredFolders = JSON.parse(JSON.stringify(folders));

    if (filterTerm) {
      filteredFolders = filteredFolders.filter((folder) =>
        folder.title.toUpperCase().includes(filterTerm.toUpperCase())
      );
    }

    if (sortBy === 'oldest') {
      filteredFolders = filteredFolders.sort((a, b) => {
        var dateA = a.createdAt;
        var dateB = b.createdAt;

        if (dateA.seconds < dateB.seconds) {
          return -1;
        }
        if (dateA.seconds > dateB.seconds) {
          return 1;
        }
        return 0;
      });
    }
    setResults(filteredFolders);
  }, [folders, filterTerm, sortBy]);

  return (
    <Fragment>
      <div className='search-terms-container'>
        <div className='filter-bar'>
          <div className='filter-bar-item'>
            <FilterListIcon />
          </div>

          <div
            className='filter-bar-item filter-bar-item-clickable'
            onClick={() => {
              itemTwo.setIsComponentVisible((prevState) => !prevState);
              console.log('button clicked');
            }}
          >
            <div>{sortBy ? sortBy : 'sort by'}</div>
            <ArrowDropDownIcon />

            {itemTwo.isComponentVisible && (
              <div ref={itemTwo.ref} className='dropdown-small-visible'>
                <Option label={'newest'} handleClickOption={handleSetRecent} />
                <Option label={'oldest'} handleClickOption={handleSetOld} />
              </div>
            )}
          </div>

          {/*filter by folder title button*/}
          <div
            className='filter-bar-item filter-bar-item-clickable'
            onClick={() => {
              itemOne.setIsComponentVisible((prevState) => !prevState);
              console.log('button clicked');
            }}
          >
            <div className='icon-container'>
              <SearchIcon />
            </div>
            folder name
            {itemOne.isComponentVisible && (
              <FilterInput
                placeholder={'filter by folder name'}
                handleSetFilterTerm={handleSetFilterTerm}
                value={filterTerm}
              />
            )}
          </div>

          {/* clear filters  */}
          {(sortBy || filterTerm.length > 0 || itemOne.isComponentVisible) && (
            <div
              className='filter-bar-item filter-bar-item-clickable reset-filters-button-container'
              onClick={handleResetFilters}
            >
              <span className='icon-container'>
                <RotateLeftIcon />
              </span>
              reset filters
            </div>
          )}

          <CreateNewFolder label={'ADD NEW FOLDER'} />
        </div>
      </div>

      <Folders folders={results} testId={testId} children={children}></Folders>
    </Fragment>
  );
};

export default FoldersPresentation;
