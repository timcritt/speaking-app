import { projectFirestore } from '../firebase/firebaseIndex';
import { timestamp } from '../firebase/firebaseIndex';

const addTestToFolder = async (folderId, testId, creatorId) => {
  const createdAt = timestamp();

  const junctionRef = projectFirestore.doc(
    `junction_folder_test/${folderId}_${testId}`
  );
  await junctionRef.set({ folderId, testId, creatorId, createdAt });
};

export default addTestToFolder;
