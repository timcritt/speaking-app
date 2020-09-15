import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/firebaseIndex';
import { FCEPart2 } from '../firebase/firebaseConsts';

const useGetTest = (testId) => {
  const [doc, setDoc] = useState();

  useEffect(() => {
    //returns a function
    projectFirestore
      .collection(FCEPart2)
      .doc(testId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setDoc({ ...doc.data(), id: doc.id });
        } else {
          console.log('no such document');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [testId]);

  return doc;
};

export default useGetTest;
