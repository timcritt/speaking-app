import { projectFirestore } from '../firebase/firebaseIndex';
import { FCEPart2 } from './firebaseConsts';

const updateFCEPart3 = async (
  bottomCentre,
  bottomLeft,
  bottomRight,
  creatorId,
  question,
  questionTwo,
  topLeft,
  topRight,
  id
) => {
  var objectRef = projectFirestore.collection(FCEPart2).doc(id);
  await objectRef.update({
    bottomCentre,
    bottomLeft,
    bottomRight,
    creatorId,
    question,
    questionTwo,
    topLeft,
    topRight,
  });

  return Promise.resolve();
};

export default updateFCEPart3;
