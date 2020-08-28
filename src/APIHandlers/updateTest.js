import { useState } from 'react';
import deleteStorage from './deleteStorage';
import { projectFirestore } from '../firebase/firebaseIndex';

//removes an image from storage if the local state of the test being edited no longer points to it
//i.e, the user has removed it, added a new image, and is about to upload the new test to the store.

// getFireStoreTest.js
const getFirestoreTest = async (id) => {
  var result;
  var unsub = await projectFirestore
    .collection('FCE Part 2')
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

// deleteStorage.js
const deleteStorageOldImage = async (imageOne, imageTwo, id) => {
  const test = await getFirestoreTest(id);

  if (test.imageOne != imageOne) {
    await deleteStorage(test.imageOne);
  }

  if (test.imageTwo != imageTwo) {
    await deleteStorage(test.imageTwo);
  }

  return Promise.resolve();
};

//updateFireStoreTest.js

const updateFireStoreTest = (
  imageOne,
  imageTwo,
  question,
  createdAt,
  tags,
  id
) => {
  var objectRef = projectFirestore.collection('FCE Part 2').doc(id);
  objectRef.update({ imageOne, imageTwo, question, createdAt, tags });

  return Promise.resolve();
};

//publishWarningModal.js

//updateTest.js

const updateTest = async (
  imageOne,
  imageTwo,
  question,
  tags,
  id,
  createdAt
) => {
  console.log(id);
  await deleteStorageOldImage(imageOne, imageTwo, id);
  await updateFireStoreTest(imageOne, imageTwo, question, createdAt, tags, id);

  return Promise.resolve();
};

export default updateTest;
