import React, { Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';

//custom components
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import TestToolBar from 'components/TestCommon/TestToolBar';
import SideBarTags from 'components/common/SideBarTags';
import PublishPart4Modal from './PublishPart4Modal';

//3rd party components
import { TextareaAutosize } from '@material-ui/core';

//API handlers
import deleteTest from 'APIHandlers/deleteTest';

//icons
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

//Custom Hooks
import useLoadTestIntoComponent from 'hooks/useLoadTestIntoComponent';

//styles
import styles from './Part4.module.css';

const EditPart4 = (props) => {
  const handleFullScreen = useFullScreenHandle();

  useLoadTestIntoComponent(
    props.setDocRef,
    props.clearState,
    props.fetchTest,
    props.unsavedChanges,
    props.setUnsavedChanges,
    props.match.params.id
  );

  var history = useHistory();

  const handleDeleteTest = async () => {
    await deleteTest(props.docRef, props.testType);
    props.clearState();
    history.push(`/Edit${props.testType}/new`);
  };

  console.log(props);

  const buttons = (
    <Fragment>
      <PublishPart4Modal
        questionOne={props.questionOne}
        questionTwo={props.questionTwo}
        questionThree={props.questionThree}
        questionFour={props.questionFour}
        questionFive={props.questionFive}
        questionSix={props.questionSix}
        tags={props.testTags}
        testType={props.testType}
        changesSaved={props.changesSaved}
        docRef={props.docRef}
        setDocRef={props.setDocRef}
      />
      {props.docRef && (
        <Link
          to={{
            pathname: `/${props.testType}/${props.docRef}`,
          }}
        >
          <button className='tool-bar-btn'>
            <VisibilityOutlinedIcon />
          </button>
        </Link>
      )}
      <button className='tool-bar-btn' onClick={handleDeleteTest}>
        <DeleteForeverOutlinedIcon />
      </button>
    </Fragment>
  );

  return (
    <Fragment>
      <div className='side-bar-left-tags hg-sidebar '>
        {props.testTags && (
          <SideBarTags
            tags={props.testTags}
            handleSetTags={props.handleSetTags}
            title={'Topic Tags'}
          >
            <p className='advice-text tag-advice'>
              Adding the correct tags will help others find your test
            </p>
          </SideBarTags>
        )}
      </div>
      <FullScreen handle={handleFullScreen}>
        <main className='holy-grail-content fade-in'>
          <div className={styles.part4_container}>
            <div className={styles.content_container}>
              <span className={styles.title}>FCE Part 4</span>

              <TextareaAutosize value={props.questionOne} onChange={props.handleEditQuestionOne} />

              <TextareaAutosize value={props.questionTwo} onChange={props.handleEditQuestionTwo} />

              <TextareaAutosize
                value={props.questionThree}
                onChange={props.handleEditQuestionThree}
              />

              <TextareaAutosize
                value={props.questionFour}
                onChange={props.handleEditQuestionFour}
              />

              <TextareaAutosize
                value={props.questionFive}
                onChange={props.handleEditQuestionFive}
              />

              <TextareaAutosize value={props.questionSix} onChange={props.handleEditQuestionSix} />
            </div>
            <div className={styles.tool_bar_container}>
              <TestToolBar creatorId={props.creatorId ? props.creatorId : '1'} buttons={buttons} />
            </div>
          </div>
        </main>
      </FullScreen>
    </Fragment>
  );
};

export default EditPart4;
