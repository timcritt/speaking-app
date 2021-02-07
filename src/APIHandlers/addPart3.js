import { projectFirestore } from '../firebase/firebaseIndex';
import { FCEPart2 } from './firebaseConsts';

const addPart3 = async (
  bottomCentre,
  bottomLeft,
  bottomRight,
  createdId,
  question,
  questionTwo,
  topLeft,
  topRight
) => {
  return projectFirestore.collection('Part3').add({
    bottomCentre,
    bottomLeft,
    bottomRight,
    createdId,
    question,
    questionTwo,
    topLeft,
    topRight,
  });
};

export default addPart3;
