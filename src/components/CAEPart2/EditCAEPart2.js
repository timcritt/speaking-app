import React, { useContext, Fragment } from 'react';
import SideBarTags from 'components/common/SideBarTags';
import PublishCAEPart2WarningModal from 'components/CAEPart2/PublishCAEPart2WarningModal';
import { Link } from 'react-router-dom';
import deleteTest from 'APIHandlers/deleteTest';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import ExamPicture from 'components/FCEPart2/ExamPicture';
import ImageDeleteBtn from 'components/FCEPart2/ImageDeleteBtn';
import SimpleModal from 'components/common/SimpleModal';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useHistory } from 'react-router-dom';
import { CAEPart2Context } from 'context/CAEPart2Context';
import useLoadTestIntoComponent from 'hooks/useLoadTestIntoComponent';
import { Prompt } from 'react-router-dom';

const EditCAEPart2 = (props) => {
  const context = useContext(CAEPart2Context);
  var history = useHistory();

  const handleDeleteTest = async () => {
    await deleteTest(context.docRef, 'CAEPart2');
    context.clearState();
    history.push('/EditCAEPart2/new');
  };

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
                <label className='part2-question-input-label' htmlFor='question-one'>
                  Question 1
                </label>
                <input
                  label='question-one'
                  className='input question-input'
                  value={context.questionOne}
                  placeholder='enter question 1'
                  onChange={context.handleEditQuestionOne}
                />
              </div>
              <div className='part2-edit-question-container'>
                <label className='part2-question-input-label' htmlFor='question-two'>
                  Question 2
                </label>
                <input
                  label='question-two'
                  className='input question-input'
                  value={context.questionTwo}
                  placeholder='enter question 2'
                  onChange={context.handleEditQuestionTwo}
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
            <div className='CAE-part2-image-row'>
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

              <div className='part2-image-container-centre'>
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

              <div className='part2-image-container-right'>
                <ExamPicture
                  image={context.imageThreeUrl}
                  setImage={context.handleEditImageThreeUrl}
                >
                  {context.imageThreeUrl ? (
                    <ImageDeleteBtn
                      setImageUrl={context.handleEditImageThreeUrl}
                      setImageRef={context.handleEditImageThreeRef}
                    />
                  ) : (
                    <SimpleModal
                      modalButtonText={'upload'}
                      setImageUrl={context.handleEditImageThreeUrl}
                    />
                  )}
                </ExamPicture>
              </div>
            </div>
            <div className='tool-bar-row'>
              <div className='tool-btn-container'>
                <PublishCAEPart2WarningModal />
                {context.docRef && (
                  <Link
                    to={{
                      pathname: `/CAEPart2/${context.docRef}`,
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
              </div>
            </div>
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

export default EditCAEPart2;
