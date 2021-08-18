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
  console.log(docRef);
  var objectRef = projectFirestore.collection(testType).doc(docRef);
  await objectRef.update({
    bottomCentre,
    bottomLeft,
    bottomRight,
    questionOne,
    shortTurnQuestion,
    topLeft,
    topRight,
    tags,
  });

  return Promise.resolve();
};

export default updatePart3;
