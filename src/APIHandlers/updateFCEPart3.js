import { projectFirestore } from '../firebase/firebaseIndex';
import { FCEPart3 } from './firebaseConsts';

const updateFCEPart3 = async (
  bottomCentre,
  bottomLeft,
  bottomRight,
  question,
  questionTwo,
  topLeft,
  topRight,
  docRef,
  tags
) => {
  console.log(docRef);
  var objectRef = projectFirestore.collection(FCEPart3).doc(docRef);
  await objectRef.update({
    bottomCentre,
    bottomLeft,
    bottomRight,
    question,
    questionTwo,
    topLeft,
    topRight,
    tags,
  });

  return Promise.resolve();
};

export default updateFCEPart3;
