import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/firebaseIndex';

const useGetTest = (collection, testId) => {
  const [doc, setDoc] = useState();

  useEffect(() => {
    //returns a function
    projectFirestore
      .collection(collection)
      .doc(testId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setDoc({ ...doc.data(), id: doc.id });
        } else {
        }
      })
      .catch((error) => {});
  }, [testId]);

  return doc;
};

export default useGetTest;
