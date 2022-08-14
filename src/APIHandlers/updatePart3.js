import { projectFirestore } from '../firebase/firebaseIndex';

const updatePart3 = async (
  bottomCentre,
  bottomLeft,
  bottomRight,
  questionOne,
  shortTurnQuestion,
  topLeft,
  topRight,
  docRef,
  tags,
  testType
) => {
  var objectRef = projectFirestore.collection(testType).doc(docRef);
  return await objectRef.update({
    bottomCentre,
    bottomLeft,
    bottomRight,
    questionOne,
    shortTurnQuestion,
    topLeft,
    topRight,
    tags,
  });
};

export default updatePart3;
