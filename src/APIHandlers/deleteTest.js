import deleteTestFirestore from './deleteRecordFirestore';

const deleteTest = async (testId, imageOne, imageTwo) => {
  if (testId) {
    await deleteTestFirestore(testId);
  }
};

export default deleteTest;
