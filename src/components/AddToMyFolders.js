import React, { useContext } from 'react';
import { firebaseAuth } from '../context/AuthProvider';
import useFirestore from '../hooks/useFirestore';
import { folders } from '../firebase/firebaseConsts';
import FoldersPresentation from './presentation/FoldersPresentation';
import FolderSummaryShort from './FolderSummaryShort';

const AddToMyFolders = ({ testId }) => {
  const { userId } = useContext(firebaseAuth);
  const { docs } = useFirestore(folders, userId);
  return (
    <FoldersPresentation folders={docs} testId={testId}>
      <FolderSummaryShort />
    </FoldersPresentation>
  );
};

export default AddToMyFolders;
