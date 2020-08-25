import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/firebaseIndex';

const useGetTest = (testId) => {
  const [doc, setDoc] = useState();

  useEffect(() => {
    //returns a function
    var unsub = projectFirestore
      .collection('FCE Part 2')
      .doc(testId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setDoc({ ...doc.data(), id: doc.id });
          console.log(doc);
        } else {
          console.log('no such document');
        }
      })
      .catch((error) => {
        console.log(error);
      });
    //unsubscribe
  }, [testId]);

  return doc;
};

export default useGetTest;
