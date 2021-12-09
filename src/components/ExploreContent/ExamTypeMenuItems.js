import React, { Fragment } from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import DropDownOption from 'components/CreatorContent/DropDownOption';

function ExamTypeMenuItems({
  itemFour,
  itemFive,
  testType,
  exam,
  handleChangeTestType,
  handleChangeExam,
}) {
  return (
    <Fragment>
      {/*select Exam*/}

      <div
        className='filter-bar-item filter-bar-item-clickable'
        onClick={() => {
          itemFour.setIsComponentVisible(true);
        }}
      >
        <div>{exam ? exam : 'exam'}</div>
        <ArrowDropDownIcon />

        {itemFour.isComponentVisible && (
          <div ref={itemFour.ref} className='dropdown-small-visible'>
            <DropDownOption label={'FCE'} handleClickOption={(e) => handleChangeExam(e, 'FCE')} />
            <DropDownOption label={'CAE'} handleClickOption={(e) => handleChangeExam(e, 'CAE')} />
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
            <DropDownOption
              label={'Part 2'}
              handleClickOption={(e) => handleChangeTestType(e, 'Part2')}
            />
            <DropDownOption
              label={'Part 3'}
              handleClickOption={(e) => handleChangeTestType(e, 'Part3')}
            />
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default ExamTypeMenuItems;
