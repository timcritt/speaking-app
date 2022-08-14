import { projectFirestore } from '../firebase/firebaseIndex';

const updatePart4 = async (
  questionOne,
  questionTwo,
  questionThree,
  questionFour,
  questionFive = '',
  questionSix = '',
  docRef,
  tags,
  testType
) => {
  var objectRef = projectFirestore.collection(testType).doc(docRef);
  return await objectRef.update({
    questionOne,
    questionTwo,
    questionThree,
    questionFour,
    questionFive,
    questionSix,
    tags,
  });
};

export default updatePart4;
