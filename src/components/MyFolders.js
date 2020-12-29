import React, { useContext } from 'react';
import { firebaseAuth } from '../context/AuthProvider';
import useFirestore from '../hooks/useFirestore';
import { folders } from '../firebase/firebaseConsts';
import FoldersPresentation from './presentation/FoldersPresentation';
import FolderSummary from './FolderSummary';

const MyFolders = ({ testId, creatorId }) => {
  const { docs } = useFirestore(folders, creatorId);

  const addFolder = {};

  return (
    <FoldersPresentation folders={docs} testId={testId} addFolder={true}>
      <FolderSummary />
    </FoldersPresentation>
  );
};

export default MyFolders;
