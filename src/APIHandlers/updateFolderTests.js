import { folders } from '../firebase/firebaseConsts';
import { projectFirestore } from '../firebase/firebaseIndex';
import { timestamp } from '../firebase/firebaseIndex';

const updateFolderTests = async (folderId, tests) => {
  const updatedAt = timestamp();

  var objectRef = await projectFirestore.collection(folders).doc(folderId);
  await objectRef.update({
    tests,
    updatedAt,
  });

  return Promise.resolve();
};

export default updateFolderTests;
