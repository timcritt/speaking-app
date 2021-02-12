import { projectFirestore } from '../firebase/firebaseIndex';
import { FCEPart3 } from './firebaseConsts';

const addPart3 = async (
  bottomCentre,
  bottomLeft,
  bottomRight,
  creatorId,
  question,
  questionTwo,
  topLeft,
  topRight,
  tags
) => {
  return projectFirestore.collection('Part3').add({
    bottomCentre,
    bottomLeft,
    bottomRight,
    creatorId,
    question,
    questionTwo,
    topLeft,
    topRight,
    tags,
  });
};

export default addPart3;
