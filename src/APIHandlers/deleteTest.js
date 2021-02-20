import deleteTestFirestore from './deleteRecordFirestore';

const deleteTest = async (testId, testType) => {
  if (testId) {
    await deleteTestFirestore(testId, testType);
  }
};

export default deleteTest;
