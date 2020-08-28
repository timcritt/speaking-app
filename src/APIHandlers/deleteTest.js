import deleteStorage from './deleteStorage';
import deleteTestFirestore from './deleteRecordFirestore';

const deleteTest = async (testId, imageOne, imageTwo) => {
  //delete images from storage by reference

  if (imageOne) {
    await deleteStorage(imageOne);
  }

  if (imageTwo) {
    await deleteStorage(imageTwo);
  }

  if (testId) {
    await deleteTestFirestore(testId);
  }
};

export default deleteTest;
