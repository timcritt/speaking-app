import React, { Fragment, useState, useEffect } from 'react';
import FilterInput from './FilterInput';
import Folders from './Folders';
import FilterListIcon from '@material-ui/icons/FilterList';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import useComponentVisible from 'hooks/useComponentVisible';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import SearchIcon from '@material-ui/icons/Search';
import CreateNewFolder from 'components/common/CreateNewFolder';

import CloseIcon from '@material-ui/icons/Close';

const FoldersPresentation = ({ folders, testId, addFolder, children }) => {
  const [filterTerm, setFilterTerm] = useState('');
  const [results, setResults] = useState();
  const [sortBy, setSortBy] = useState(null);

  const itemOne = useComponentVisible(false);
  const itemTwo = useComponentVisible(false);
  const itemThree = useComponentVisible(false);

  const [filterMenuVisible, setFilterMenuVisible] = useState(false);

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
      <div className='dropdown-option' onClick={(e) => handleClickOption(e, label)}>
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

  const toggleFilterMenuVisible = () => {
    setFilterMenuVisible((prevState) => !prevState);
  };

  const handleSortRadioChange = (e) => {
    setSortBy(e.currentTarget.value);
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
      <div className={`filter-menu ${filterMenuVisible ? 'isVisible' : 'isHidden'}`}>
        {/* overlay filter menu for small screens - hidden by default and opens on click*/}
        <div className='close-nav-mobile-btn' onClick={toggleFilterMenuVisible}>
          <CloseIcon fontSize='large' />
        </div>
        <h1>FILTERS</h1>

        {/*sort by date created*/}

        <div className='filter-mobile-row'>
          <p>Sorty by</p>
          <div>
            <input
              type='radio'
              id='newest'
              name='sortBy'
              value='newest'
              checked={sortBy === 'newest'}
              onChange={handleSortRadioChange}
            />
            <label htmlFor='newest'>newest</label>
          </div>
          <div>
            <input
              type='radio'
              id='oldest'
              name='sortyBy'
              value='oldest'
              checked={sortBy === 'oldest'}
              onChange={handleSortRadioChange}
            />
            <label htmlFor='oldest'>oldest</label>
          </div>
        </div>

        {/*filter by question*/}

        <div className='filter-mobile-row'>
          <p>Search folder name</p>
          <input id='question' type='text' value={filterTerm} onChange={handleSetFilterTerm} />
        </div>

        {/* buttons */}
        <div className='filter-mobile-button-row'>
          <button className='btn get-started-btn' onClick={handleResetFilters}>
            <span className='icon-container'></span>
            reset filters
          </button>
          <button className='btn get-started-btn' onClick={toggleFilterMenuVisible}>
            apply filters
          </button>
        </div>
      </div>
      <div className='search-terms-container'>
        <div
          className='filter-bar-item filter-bar-item-clickable see-filters-mobile-btn'
          onClick={toggleFilterMenuVisible}
        >
          <FilterListIcon />
          <div>FILTERS</div>
        </div>
        <div className='see-filters-mobile-btn'>
          <CreateNewFolder label={'ADD NEW FOLDER'} />
        </div>
        <div className='filter-bar'>
          <div className='filter-bar-item'>
            <FilterListIcon />
          </div>

          <div
            className={`filter-bar-item filter-bar-item-clickable ${
              sortBy ? 'filter-selected' : ''
            }`}
            onClick={() => {
              itemTwo.setIsComponentVisible((prevState) => !prevState);
            }}
          >
            <div stlyle={sortBy ? 'background-color: white' : ''}>
              {sortBy ? sortBy : 'sort by'}
            </div>
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
            className={`filter-bar-item filter-bar-item-clickable ${
              filterTerm !== '' ? 'filter-selected' : ''
            }`}
            onClick={() => {
              itemOne.setIsComponentVisible((prevState) => !prevState);
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
          {(sortBy || filterTerm || itemOne.isComponentVisible) && (
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
