import React, { Fragment, useState, useEffect, useContext } from 'react';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import LinearProgress from '@material-ui/core/LinearProgress';
import getTestsById from '../../APIHandlers/getTestsById';
import TestPreview from '../common/TestPreview';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import { FCEPart2, FCEPart3, CAEPart2, CAEPart3 } from 'APIHandlers/firebaseConsts';
import Part3TestPreviewContent from 'components/Part3Common/Part3TestPreviewContent';
import FCEPart2TestPreviewContent from 'components/FCEPart2/FCEPart2TestPreviewContent';
import CAEPart2TestPreviewContent from 'components/CAEPart2/CAEPart2TestPreviewContent';
import getFolderTestsJunctions from 'APIHandlers/getFolderTestsJunctions';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import DeleteButton from 'components/common/DeleteButton';
import { firebaseAuth } from '../../context/AuthProvider';

const VerticallyExpandingFolder = ({ folder }) => {
  const [FCEPart2Tests, setFCEPart2Tests] = useState(null);
  const [FCEPart3Tests, setFCEPart3Tests] = useState(null);
  const [CAEPart2Tests, setCAEPart2Tests] = useState(null);
  const [CAEPart3Tests, setCAEPart3Tests] = useState(null);
  const [folderTitle, setFolderTitle] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [creatorId, setCreatorId] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);
  const [testContainerExpanded, setTestContainerExpanded] = useState(false);

  //context
  const { userId } = useContext(firebaseAuth);

  const toggleExpandContainer = () => {
    if (folder.testCount > 0) {
      setTestContainerExpanded((prevState) => !prevState);
    }
  };
  useEffect(() => {
    var isMounted = true;
    console.log('recalling gettests');
    if (folder.id) {
      const fetchTests = async () => {
        //returns an array of the testIds in the folder
        const folderContent = await getFolderTestsJunctions(folder.id);
        const newFCEPart2Tests = await getTestsById(folderContent, FCEPart2);
        const newFCEPart3Tests = await getTestsById(folderContent, FCEPart3);
        const newCAEPart2Tests = await getTestsById(folderContent, CAEPart2);
        const newCAEPart3Tests = await getTestsById(folderContent, CAEPart3);

        if (isMounted) {
          setFolderTitle(folder.title);
          setCreatorId(folder.creatorId);
          setFCEPart2Tests(newFCEPart2Tests);
          setFCEPart3Tests(newFCEPart3Tests);
          setCAEPart2Tests(newCAEPart2Tests);
          setCAEPart3Tests(newCAEPart3Tests);
          setHasFetched(true);
        }
      };
      fetchTests();
    }
    return () => {
      isMounted = false;
    };
  }, [folder]);
  if (hasFetched) {
    return (
      <Fragment>
        <div
          className={`tests-container-header ${
            testContainerExpanded ? 'test-container-header-expanded' : ''
          } `}
        >
          <div className='tests-container-heading' onClick={(e) => toggleExpandContainer(e)}>
            <div className='folder-info-container'>
              <FolderOutlinedIcon className='folder-summary-icon' />
              <div className='folder-icon-title-container'>
                <span className='folder-title'>{folderTitle}</span>
                <span>({folder.testCount})</span>
              </div>
            </div>

            <div className='tests-container-button'>
              <span className='delete-folder-button-container'>
                {userId === creatorId && (
                  <DeleteButton
                    deleteItemType='folder'
                    iconColour='red'
                    itemId={folder.id}
                    firestoreCollection={'folders'}
                  />
                )}
              </span>
              {testContainerExpanded ? <RemoveRoundedIcon /> : <ArrowDropDownIcon />}
            </div>
          </div>

          <div
            className={
              'user-tests-container ' +
              (testContainerExpanded ? 'user-tests-container-expanded' : '')
            }
          >
            <div className='all-tests-container'>
              {FCEPart2Tests &&
                FCEPart2Tests.map((test) => {
                  return (
                    <TestPreview
                      key={test.id}
                      testId={test.id}
                      questionOne={test.questionOne}
                      testType={FCEPart2}
                    >
                      <FCEPart2TestPreviewContent test={test} />
                    </TestPreview>
                  );
                })}
              {FCEPart3Tests &&
                FCEPart3Tests.map((test) => {
                  return (
                    <TestPreview
                      key={test.id}
                      testId={test.id}
                      questionOne={test.questionOne}
                      testType={FCEPart3}
                    >
                      <Part3TestPreviewContent test={test} bottomLabel={'FCE Part 3'} />
                    </TestPreview>
                  );
                })}
              {CAEPart2Tests &&
                CAEPart2Tests.map((test) => {
                  return (
                    <TestPreview
                      key={test.id}
                      testId={test.id}
                      questionOne={test.questionOne}
                      testType={CAEPart2}
                    >
                      <CAEPart2TestPreviewContent test={test} />
                    </TestPreview>
                  );
                })}
              {CAEPart3Tests &&
                CAEPart3Tests.map((test) => {
                  return (
                    <TestPreview
                      key={test.id}
                      testId={test.id}
                      questionOne={test.questionOne}
                      testType={CAEPart3}
                    >
                      <Part3TestPreviewContent test={test} bottomLabel={'CAE Part 3'} />
                    </TestPreview>
                  );
                })}
            </div>
          </div>
        </div>
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

export default VerticallyExpandingFolder;
