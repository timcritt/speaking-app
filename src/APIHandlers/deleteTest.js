import deleteTestFirestore from './deleteRecordFirestore';
import { FCEPart2 } from '../firebase/firebaseConsts';

const deleteTest = async (testId) => {
  if (testId) {
    await deleteTestFirestore(testId, FCEPart2);
  }
};

export default deleteTest;
