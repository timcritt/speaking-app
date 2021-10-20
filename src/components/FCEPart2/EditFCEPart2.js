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

        <div className='side-bar-left-tags hg-sidebar '>
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
        <main className='holy-grail-content centre-vertically'>
          <div className='part2-main-row fade-in'>
            <div className='part2-edit-question-row'>
              <div className='part2-edit-question-container'>
                <label className='part2-question-input-label' htmlFor='long-turn'>
                  Long turn
                </label>
                <input
                  label='long-turn'
                  className='input question-input'
                  value={context.questionOne}
                  placeholder='enter long turn question'
                  onChange={context.handleEditQuestionOne}
                />
              </div>
              <div className='part2-edit-question-container'>
                <label className='part2-question-input-label' htmlFor='short-turn'>
                  Short turn
                </label>
                <input
                  label='short-turn'
                  className='input question-input '
                  value={context.shortTurnQuestion}
                  placeholder='enter short turn question'
                  onChange={context.handleEditShortTurnQuestion}
                />
              </div>
            </div>
            <div className='part2-image-row'>
              <div className='part2-image-container-left'>
                <ExamPicture image={context.imageOneUrl} setImage={context.handleEditImageOneUrl}>
                  {context.imageOneUrl ? (
                    <ImageDeleteBtn
                      setImageUrl={context.handleEditImageOneUrl}
                      setImageRef={context.handleEditImageOneRef}
                    />
                  ) : (
                    <SimpleModal
                      modalButtonText={'upload'}
                      setImageUrl={context.handleEditImageOneUrl}
                    />
                  )}
                </ExamPicture>
              </div>

              <div>
                <div className='part2-image-container-right'>
                  <ExamPicture image={context.imageTwoUrl} setImage={context.handleEditImageTwoUrl}>
                    {context.imageTwoUrl ? (
                      <ImageDeleteBtn
                        setImageUrl={context.handleEditImageTwoUrl}
                        setImageRef={context.handleEditImageTwoRef}
                      />
                    ) : (
                      <SimpleModal
                        modalButtonText={'upload'}
                        setImageUrl={context.handleEditImageTwoUrl}
                      />
                    )}
                  </ExamPicture>
                </div>
              </div>
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
