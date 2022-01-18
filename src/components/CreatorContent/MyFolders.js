import React from 'react';
import useFirestore from '../../hooks/useFirestore';
import { folders } from '../../APIHandlers/firebaseConsts';
import FoldersPresentation from 'components/common/FoldersPresentation';
import VerticallyExpandingFolder from './VerticallyExpandingFolder/VerticallyExpandingFolder';

const MyFolders = ({ testId, creatorId }) => {
  const { docs } = useFirestore(folders, creatorId);

  return (
    <FoldersPresentation folders={docs} testId={testId} addFolder={true} creatorId={creatorId}>
      <VerticallyExpandingFolder />
    </FoldersPresentation>
  );
};

export default MyFolders;
