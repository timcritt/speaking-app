import { projectStorage } from '../firebase/firebaseIndex';
import firebase from 'firebase';

import { v4 as uuidv4 } from 'uuid';

//upload new image from localstorage to firestore storage and return reference and download url
export const uploadImage = async (imageUrl) => {
  const image = await fetch(imageUrl).then((r) => r.blob());
  let url;
  const ref = projectStorage.ref(uuidv4());
  let reference;
  try {
    await ref
      .put(image, { customMetadata: { uid: firebase.auth().currentUser.uid } })
      .then(async () => {
        url = await ref.getDownloadURL();
        reference = ref.fullPath;
      });
  } catch (error) {
    console.log(error.message);
  }
  return { url, reference };
};

export const uploadFCEPart2Images = async (
  imageOneUrl,
  imageTwoUrl,
  imageOneReference,
  imageTwoReference
) => {
  let imageOneData = {
    url: imageOneUrl,
    reference: imageOneReference,
  };

  let imageTwoData = {
    url: imageTwoUrl,
    reference: imageTwoReference,
  };

  //if url does not contain 'firebase', the image is only in local storage, and so needs to be uploaded
  if (!imageOneData.url.includes('firebase')) {
    imageOneData = await uploadImage(imageOneUrl);
  }

  if (!imageTwoData.url.includes('firebase')) {
    imageTwoData = await uploadImage(imageTwoUrl);
  }

  return { imageOneData, imageTwoData };
};

//checks if user has changed the images of the test then uploads new image and returns new references if so. Returns original references if not.
export const uploadCAEPart2Images = async (
  imageOneUrl,
  imageTwoUrl,
  imageThreeUrl,
  imageOneReference,
  imageTwoReference,
  imageThreeReference
) => {
  let imageOneData = {
    url: imageOneUrl,
    reference: imageOneReference,
  };

  let imageTwoData = {
    url: imageTwoUrl,
    reference: imageTwoReference,
  };

  let imageThreeData = {
    url: imageThreeUrl,
    reference: imageThreeReference,
  };

  if (!imageOneData.url.includes('firebase')) {
    imageOneData = await uploadImage(imageOneUrl);
  }

  if (!imageTwoData.url.includes('firebase')) {
    imageTwoData = await uploadImage(imageTwoUrl);
  }

  if (!imageThreeData.url.includes('firebase')) {
    imageThreeData = await uploadImage(imageThreeUrl);
  }
  return { imageOneData, imageTwoData, imageThreeData };
};
