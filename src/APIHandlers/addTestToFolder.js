import { projectFirestore, timestamp, increment } from '../firebase/firebaseIndex';

// 1. creates a new junction_folder_test document in firestore.
//2. increments testCount field of the folder document
//Transactions are batched to ensure atomicity

const addTestToFolder = async (folderId, testId, creatorId) => {
  console.log('addTestToFolder is firing');
  let writeBatch = projectFirestore.batch();

  const createdAt = timestamp();

  const junctionRef = projectFirestore.doc(`junction_folder_test/${folderId}_${testId}`);

  writeBatch.set(junctionRef, { folderId, testId, creatorId, createdAt });

  const newTestCount = increment(1);

  const folderRef = projectFirestore.collection('folders').doc(folderId);

  writeBatch.update(folderRef, { testCount: newTestCount });

  await writeBatch.commit();

  return;
};

//const throttledAdtestToFolder =

export default addTestToFolder;
