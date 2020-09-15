import { folders } from '../firebase/firebaseConsts';
import { projectFirestore } from '../firebase/firebaseIndex';
import { timestamp } from '../firebase/firebaseIndex';

const updateFolder = async (folderId, title, description) => {
  const updatedAt = timestamp();

  var objectRef = await projectFirestore.collection(folders).doc(folderId);
  await objectRef.update({
    title,
    description,
  });

  return Promise.resolve();
};

export default updateFolder;
