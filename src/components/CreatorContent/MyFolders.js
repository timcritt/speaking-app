import React from 'react';
import useFirestore from '../../hooks/useFirestore';
import { folders } from '../../APIHandlers/firebaseConsts';
import FoldersPresentation from 'components/common/FoldersPresentation';
import FolderSummary from '../common/FolderSummary';

const MyFolders = ({ testId, creatorId }) => {
  const { docs } = useFirestore(folders, creatorId);

  return (
    <FoldersPresentation folders={docs} testId={testId} addFolder={true}>
      <FolderSummary />
    </FoldersPresentation>
  );
};

export default MyFolders;
