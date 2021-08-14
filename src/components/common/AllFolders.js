import React from 'react';
import useFirestore from '../../hooks/useFirestore';
import { folders } from '../../APIHandlers/firebaseConsts';
import FoldersPresentation from 'components/common/FoldersPresentation';
import FolderSummary from './FolderSummary';

const AllFolders = ({ testId }) => {
  const { docs } = useFirestore(folders, '');

  return (
    <FoldersPresentation folders={docs} testId={testId}>
      {/*child is cloned and rendered in Folders */}
      <FolderSummary />
    </FoldersPresentation>
  );
};

export default AllFolders;
