import React, { Fragment } from 'react';

//custom componets
//import FilterInput from 'components/common/FilterInput';
import SideBarTags from '../common/SideBarTags';
import DropDownOption from 'components/CreatorContent/DropDownOption';

//icons
import FilterListIcon from '@material-ui/icons/FilterList';
import CancelIcon from '@material-ui/icons/Cancel';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
//import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const FilterMenuDesktop = ({
  children,
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
  return (
    <Fragment>
      <div
        className='filter-bar-item filter-bar-item-clickable see-filters-mobile-btn'
        onClick={toggleFilterMenuVisible}
      >
        <FilterListIcon />
        <div>FILTERS</div>
      </div>
      <div className='exam-type-menu-bar-mobile'>{children}</div>

      <div className='filter-bar'>
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
          }}
        >
          <div>{sortBy ? `sort by: ${sortBy}` : 'sort by'}</div>
          <ArrowDropDownIcon />

          {itemTwo.isComponentVisible && (
            <div ref={itemTwo.ref} className='dropdown-small-visible'>
              <DropDownOption label={'newest'} handleClickOption={handleSetRecent} />
              <DropDownOption label={'oldest'} handleClickOption={handleSetOld} />
            </div>
          )}
        </div>

        {/*filter by question: Firebase doesn't currently allow partial hits when searching by string value*/}
        {/*<div
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
        </div>*/}

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
        {children}
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
    </Fragment>
  );
};

export default FilterMenuDesktop;
