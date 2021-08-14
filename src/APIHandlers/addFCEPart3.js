import { projectFirestore } from '../firebase/firebaseIndex';
import firebase from 'firebase';

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
  const collection = projectFirestore.collection('FCEPart3');

  const result = await collection.add({
    bottomCentre,
    bottomLeft,
    bottomRight,
    creatorId,
    question,
    questionTwo,
    topLeft,
    topRight,
    tags,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

  return result;
};

export default addPart3;
