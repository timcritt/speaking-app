import { projectStorage } from '../firebase/firebaseIndex';
import { v4 as uuidv4 } from 'uuid';

//upload new image from localstorage to firestore storage and return reference and download url
export const uploadImage = async (imageUrl) => {
  const image = await fetch(imageUrl).then((r) => r.blob());
  let url;
  const ref = projectStorage.ref(uuidv4());
  let reference;
  try {
    await ref.put(image).then(async () => {
      url = await ref.getDownloadURL();
      reference = ref.fullPath;
      console.log(reference);
    });
  } catch (error) {
    console.log(error.message);
  }
  return Promise.resolve({ url, reference });
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

  //if url does not contain 'firebase', the image is in local storage, and so needs to be uploaded
  if (!imageOneData.url.includes('firebase')) {
    imageOneData = await uploadImage(imageOneUrl);
  }

  if (!imageTwoData.url.includes('firebase')) {
    imageTwoData = await uploadImage(imageTwoUrl);
  }

  return Promise.resolve({ imageOneData, imageTwoData });
};
