import React from 'react';

//custom componets
import FilterInput from 'components/common/FilterInput';
import SideBarTags from '../common/SideBarTags';

//icons
import FilterListIcon from '@material-ui/icons/FilterList';
import CancelIcon from '@material-ui/icons/Cancel';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const FilterMenuDesktop = ({
  toggleFilterMenuVisible,
  tagFilterTerm,
  itemOne,
  itemTwo,
  sortBy,
  handleSetRecent,
  handleSetOld,
  questionFilterTerm,
  handleSetQuestionFilterTerm,
  handleResetFilters,
  handleSetTags,
}) => {
  const Option = ({ label, handleClickOption }) => {
    return (
      <div className='dropdown-option' onClick={(e) => handleClickOption(e, label)}>
        {label}
      </div>
    );
  };

  return (
    <div className='search-terms-container'>
      <div
        className='filter-bar-item filter-bar-item-clickable see-filters-mobile-btn'
        onClick={toggleFilterMenuVisible}
      >
        <FilterListIcon />
        <div>FILTERS</div>
      </div>
      <div className='filter-bar '>
        {/*unclickable filter icon*/}
        <div className='filter-bar-item'>
          <FilterListIcon />
        </div>

        {/*filter by topic*/}
        <div
          className={`filter-bar-item filter-bar-item-clickable ${
            tagFilterTerm ? 'filter-selected' : ''
          }`}
          onClick={(e) => {
            itemOne.setIsComponentVisible((prevState) => !prevState);
          }}
        >
          {tagFilterTerm ? `topic: ${tagFilterTerm}` : 'topic'}
          <ArrowDropDownIcon />
        </div>

        {/*sort by date created*/}
        <div
          className={`filter-bar-item filter-bar-item-clickable ${sortBy ? 'filter-selected' : ''}`}
          onClick={() => {
            itemTwo.setIsComponentVisible(true);
            console.log('button clicked');
          }}
        >
          <div>{sortBy ? `sort by: ${sortBy}` : 'sort by'}</div>
          <ArrowDropDownIcon />

          {itemTwo.isComponentVisible && (
            <div ref={itemTwo.ref} className='dropdown-small-visible'>
              <Option label={'newest'} handleClickOption={handleSetRecent} />
              <Option label={'oldest'} handleClickOption={handleSetOld} />
            </div>
          )}
        </div>

        {/*filter by question*/}
        <div
          className={`filter-bar-item filter-bar-item-clickable ${
            questionFilterTerm !== '' ? 'filter-selected' : ''
          }`}
        >
          <SearchIcon />

          <FilterInput
            placeholder={'search by question'}
            handleSetFilterTerm={handleSetQuestionFilterTerm}
            value={questionFilterTerm}
          />
        </div>

        {/* clear filters  */}
        {(sortBy || tagFilterTerm || (questionFilterTerm && questionFilterTerm.length > 0)) && (
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
      </div>

      {/*filter by tag drop down container*/}
      {itemOne.isComponentVisible && (
        <div ref={itemOne.ref} className='tags-drop-down-visible'>
          <SideBarTags tags={tagFilterTerm} handleSetTags={handleSetTags}></SideBarTags>
          <div
            className='close-dropdown-container-button'
            onClick={(e) => {
              itemOne.setIsComponentVisible((prevState) => !prevState);
            }}
          >
            <CancelIcon />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterMenuDesktop;
