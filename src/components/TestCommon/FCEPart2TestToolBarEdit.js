import React, { Fragment } from 'react';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import PublishWarningModal from 'components/FCEPart2/PublishWarningModal';
import { Link } from 'react-router-dom';
import DeleteButton from 'components/common/DeleteButton';
import deleteTest from 'APIHandlers/deleteTest';
import { useHistory } from 'react-router-dom';
import { FCEPart2 } from 'APIHandlers/firebaseConsts';
import TestToolBar from 'components/TestCommon/TestToolBar';

function TestToolBarEdit({ context }) {
  var history = useHistory();

  const handleDeleteTest = async () => {
    await deleteTest(context.docRef, FCEPart2);
    context.clearState();
    history.push('/EditFCEPart2/new');
  };

  const buttons = (
    <Fragment>
      <PublishWarningModal />
      {context.docRef && (
        <Link
          to={{
            pathname: `/FCEPart2/${context.docRef}`,
          }}
        >
          <button className='tool-bar-btn'>
            <VisibilityOutlinedIcon />
          </button>
        </Link>
      )}

      <DeleteButton
        itemId={context.docRef}
        deleteItemType={'test'}
        firestoreCollection={FCEPart2}
        iconColour={'#fa5454'}
        handleDelete={handleDeleteTest}
      />
    </Fragment>
  );

  return <TestToolBar buttons={buttons} />;
}

export default TestToolBarEdit;
