import { projectFirestore } from '../firebase/firebaseIndex';
import { FCEPart2 } from '../firebase/firebaseConsts';

// getFireStoreTest.js  NOT CURRENTLY USED
const getFirestoreTest = async (id) => {
  var result;
  var unsub = await projectFirestore
    .collection(FCEPart2)
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        result = doc.data();
      } else {
        console.log('no such document');
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return result;
};

const updateTest = (
  imageOneUrl,
  imageTwoUrl,
  question,
  tags,
  id,
  createdAt,
  imageOneRef,
  imageTwoRef
) => {
  var objectRef = projectFirestore.collection(FCEPart2).doc(id);
  objectRef.update({
    imageOneUrl,
    imageTwoUrl,
    question,
    updatedAt: createdAt,
    tags,
    imageOneRef,
    imageTwoRef,
  });

  return Promise.resolve();
};

export default updateTest;
