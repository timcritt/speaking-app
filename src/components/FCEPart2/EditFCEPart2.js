import React, { useContext, Fragment } from 'react';
import SideBarTags from 'components/common/SideBarTags';
import ExamPicture from 'components/FCEPart2/ExamPicture';
import ImageDeleteBtn from 'components/FCEPart2/ImageDeleteBtn';
import SimpleModal from 'components/common/SimpleModal';
import LinearProgress from '@material-ui/core/LinearProgress';
import { FCEPart2Context } from 'context/FCEPart2Context';
import FCEPart2TestToolBarEdit from 'components/TestCommon/FCEPart2TestToolBarEdit';
import { Prompt } from 'react-router-dom';
import useLoadTestIntoComponent from 'hooks/useLoadTestIntoComponent';

import styles from './EditFCEPart2.module.css';

const EditFCEPart2 = (props) => {
  const context = useContext(FCEPart2Context);

  useLoadTestIntoComponent(
    context.setDocRef,
    context.clearState,
    context.fetchTest,
    context.unsavedChanges,
    context.setUnsavedChanges,
    props.match.params.id
  );

  if (context.hasFetched) {
    return (
      <Fragment>
        <Prompt
          when={context.unsavedChanges}
          message='You have unsaved changes. Are you sure you want to leave? All changes will be lost. '
        />

        <main className='holy-grail-content centre-vertically'>
          <div className={styles.container}>
            <h1>FCE Part 2</h1>

            <div className={styles.question_row}>
              <label>long turn question</label>
              <input
                label='long-turn'
                className='input question-input'
                value={context.questionOne}
                placeholder='enter long turn question'
                onChange={context.handleEditQuestionOne}
              />
              <label>short turn question</label>
              <input
                label='short-turn'
                className='input question-input '
                value={context.shortTurnQuestion}
                placeholder='enter short turn question'
                onChange={context.handleEditShortTurnQuestion}
              />
            </div>

            <div className={styles.image_row}>
              <div>
                <div className={styles.image_container}>
                  <ExamPicture image={context.imageOneUrl} setImage={context.handleEditImageOneUrl}>
                    {context.imageOneUrl && (
                      <ImageDeleteBtn
                        setImageUrl={context.handleEditImageOneUrl}
                        setImageRef={context.handleEditImageOneRef}
                      />
                    )}
                  </ExamPicture>
                </div>
                <div className={styles.btn_container}>
                  <SimpleModal
                    modalButtonText={'upload'}
                    setImageUrl={context.handleEditImageOneUrl}
                  />
                  <button className='btn upload-btn'>browse</button>
                </div>
              </div>
              <div>
                <div className={styles.image_container}>
                  <ExamPicture image={context.imageTwoUrl} setImage={context.handleEditImageTwoUrl}>
                    {context.imageTwoUrl && (
                      <ImageDeleteBtn
                        setImageUrl={context.handleEditImageTwoUrl}
                        setImageRef={context.handleEditImageTwoRef}
                      />
                    )}
                  </ExamPicture>
                </div>
                <div className={styles.btn_container}>
                  <SimpleModal
                    modalButtonText={'upload'}
                    setImageUrl={context.handleEditImageTwoUrl}
                  />
                  <button className='btn upload-btn'>browse</button>
                </div>
              </div>
            </div>
            <div className={styles.tags_container}>
              <label>Topic tags</label>
              <SideBarTags
                tags={context.testTags}
                handleSetTags={context.handleSetTags}
                title={'Topic Tags'}
              >
                <p className='advice-text tag-advice'>
                  Adding the correct tags will help others find your test
                </p>
              </SideBarTags>
            </div>

            <FCEPart2TestToolBarEdit context={context} />
          </div>
        </main>
      </Fragment>
    );
  } else {
    return (
      <div className={'full-width'}>
        <LinearProgress />
      </div>
    );
  }
};

export default EditFCEPart2;
