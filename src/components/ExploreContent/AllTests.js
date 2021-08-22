import React, { Fragment, useState, useEffect } from 'react';
import Tests from './Tests';
import SideBarTags from '../common/SideBarTags';
import getFilteredTests from '../../APIHandlers/getFilteredTests';
import LinearProgress from '@material-ui/core/LinearProgress';
import FilterListIcon from '@material-ui/icons/FilterList';
import CancelIcon from '@material-ui/icons/Cancel';
import useComponentVisible from 'hooks/useComponentVisible';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FilterInput from 'components/common/FilterInput';

const AllTests = ({ creatorId }) => {
  //state
  const [sortBy, setSortBy] = useState(null);
  const [tagFilterTerm, setTagFilterTerm] = useState(null);
  const [questionFilterTerm, setQuestionFilterTerm] = useState('');
  const [results, setResults] = useState(null);
  const [testType, setTestType] = useState('Part2');
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [exam, setExam] = useState('FCE');

  const itemOne = useComponentVisible(false);
  const itemTwo = useComponentVisible(false);
  const itemThree = useComponentVisible(false);
  const itemFour = useComponentVisible(false);
  const itemFive = useComponentVisible(false);

  const Option = ({ label, handleClickOption }) => {
    return (
      <div className='dropdown-option' onClick={(e) => handleClickOption(e, label)}>
        {label}
      </div>
    );
  };
  const handleSetQuestionFilterTerm = (e) => {
    setQuestionFilterTerm(e.currentTarget.value);
  };
  const handleSetRecent = (e, label) => {
    e.stopPropagation();
    setSortBy(label);
    itemTwo.setIsComponentVisible(false);
  };

  const handleSetOld = (e, label) => {
    e.stopPropagation();
    setSortBy(label);
    itemTwo.setIsComponentVisible(false);
  };

  const handleSetTags = (tag, selected) => {
    if (!selected) {
      //adds tag to the state
      setTagFilterTerm(tag);
    } else {
      //removes the tag from the state
      setTagFilterTerm('');
    }
  };

  const handleResetFilters = () => {
    setSortBy(null);
    setTagFilterTerm(null);
    setQuestionFilterTerm('');
    itemThree.setIsComponentVisible(false);
  };

  useEffect(() => {
    handleSearchClick();
  }, [sortBy, tagFilterTerm, questionFilterTerm, testType, exam]);

  const handleChangeTestType = (e, testType) => {
    itemFive.setIsComponentVisible(false);
    e.stopPropagation();
    setTestType(testType);
  };

  const handleChangeExam = (e, exam) => {
    itemFour.setIsComponentVisible(false);
    e.stopPropagation();
    setExam(exam);
  };

  const handleSearchClick = async () => {
    setHasFetched(false);
    setSearchButtonClicked(true);

    await getFilteredTests(creatorId, questionFilterTerm, exam + testType).then((data) => {
      var filteredDocs = JSON.parse(JSON.stringify(data));

      //filter by topic tag
      if (tagFilterTerm) {
        filteredDocs = filteredDocs.filter((doc) => doc.tags.includes(tagFilterTerm));
      }

      //sort alphabetically by question

      setResults(filteredDocs);
      setHasFetched(true);
    });
  };

  return (
    <Fragment>
      <div className='search-terms-container'>
        <div className='filter-bar'>
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
            {tagFilterTerm ? tagFilterTerm : 'topic'}
            <ArrowDropDownIcon />
          </div>

          {/*sort by date created*/}
          <div
            className={`filter-bar-item filter-bar-item-clickable ${
              sortBy ? 'filter-selected' : ''
            }`}
            onClick={() => {
              itemTwo.setIsComponentVisible(true);
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

          {/*filter by question*/}
          <div
            className={`filter-bar-item filter-bar-item-clickable ${
              questionFilterTerm !== '' ? 'filter-selected' : ''
            }`}
            onClick={() => {
              if (questionFilterTerm.length === 0)
                itemThree.setIsComponentVisible((prevState) => !prevState);
            }}
          >
            <div className='icon-container'>
              <SearchIcon />
            </div>
            question
            {itemThree.isComponentVisible && (
              <FilterInput
                placeholder={'filter by folder name'}
                handleSetFilterTerm={handleSetQuestionFilterTerm}
                value={questionFilterTerm}
              />
            )}
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

          {/*select Exam*/}

          <div
            className='filter-bar-item filter-bar-item-clickable'
            onClick={() => {
              itemFour.setIsComponentVisible(true);
              console.log('button clicked');
            }}
          >
            <div>{exam ? exam : 'exam'}</div>
            <ArrowDropDownIcon />

            {itemFour.isComponentVisible && (
              <div ref={itemFour.ref} className='dropdown-small-visible'>
                <Option label={'FCE'} handleClickOption={(e) => handleChangeExam(e, 'FCE')} />
                <Option label={'CAE'} handleClickOption={(e) => handleChangeExam(e, 'CAE')} />
              </div>
            )}
          </div>

          {/**select part**/}
          <div
            className='filter-bar-item filter-bar-item-clickable'
            onClick={() => {
              itemFive.setIsComponentVisible(true);
              console.log('button clicked');
            }}
          >
            <div>{testType ? testType : 'part'}</div>
            <ArrowDropDownIcon />

            {itemFive.isComponentVisible && (
              <div ref={itemFive.ref} className='dropdown-small-visible'>
                <Option
                  label={'Part 2'}
                  handleClickOption={(e) => handleChangeTestType(e, 'Part2')}
                />
                <Option
                  label={'Part 3'}
                  handleClickOption={(e) => handleChangeTestType(e, 'Part3')}
                />
              </div>
            )}
          </div>
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

      {!hasFetched && searchButtonClicked && <LinearProgress />}
      {hasFetched && (
        <Tests
          testType={exam + testType}
          userId={creatorId}
          filterTerm={questionFilterTerm}
          results={results}
          setResults={setResults}
          tagSearchTerm={tagFilterTerm}
        />
      )}
    </Fragment>
  );
};

export default AllTests;
