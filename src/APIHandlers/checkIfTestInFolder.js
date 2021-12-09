import { projectFirestore } from '../firebase/firebaseIndex';
import { junctionFolderTest } from './firebaseConsts';

//checks if there exists a junction_folder_test document for a pair of folder and test document ids
//i.e. checks if the test has been placed in the folder by a user

const checkIfTestInFolder = async (folderId, testId) => {
  var testInFolder = false;
  var results = projectFirestore.collection(junctionFolderTest).doc(`${folderId}_${testId}`);

  await results
    .get()
    .then((doc) => {
      if (doc.exists) {
        testInFolder = true;
      } else {
        testInFolder = false;
        console.log('no such document');
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return testInFolder;
};

export default checkIfTestInFolder;
