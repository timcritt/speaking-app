import { projectFirestore, projectStorage, fieldValue } from 'firebase/firebaseIndex';
import { v4 as uuidv4 } from 'uuid';
import { readAndCompressImage } from 'browser-image-resizer';

const config = {
  quality: 0.75,
  maxWidth: 300,
  maxHeight: 225,
  autoRotate: false,
  mimeType: 'image/jpeg',
};

const uploadThumb = async (image, userId) => {
  let url;
  const thumbName = uuidv4();
  const ref = projectStorage.ref(`/thumbs/${thumbName}`);
  let reference;
  try {
    await ref
      //adds userId to metadata to allow permissions to be set in firebase
      .put(image, { customMetadata: { uid: userId } })
      .then(async () => {
        url = await ref.getDownloadURL();
        reference = ref.fullPath;
      });
  } catch (error) {}
  return { url, reference };
};

const createThumbsForExistingPartFce = async () => {
  //get all FCE part 2 records
  var collectionRef = projectFirestore.collection('FCEPart2');
  //.where('creatorId', '==', '7BSLbAk9r2g0PyBNxr4WaavrOK62');
  const results = await collectionRef.get();

  //loop over each record
  results.forEach(async (doc) => {
    //convert image urls to blobs
    var blobOne = await fetch(doc.data().imageOneUrl).then((r) => r.blob());
    var blobTwo = await fetch(doc.data().imageTwoUrl).then((r) => r.blob());

    //convert imageOne blob to thumbnail
    const resizedImageOne = await readAndCompressImage(blobOne, config).then(
      async (resizedImage) => {
        return resizedImage;
      }
    );

    //upload to storage. Returns a reference and a url to the uploaded image
    const imageOneThumbData = await uploadThumb(resizedImageOne);

    //convert imageTwo to thumbnail
    const resizedImageTwo = await readAndCompressImage(blobTwo, config).then(
      async (resizedImage) => {
        //upload to storage. Returns a reference and a url to the uploaded image
        return resizedImage;
      }
    );

    //upload to storage. Returns a reference and a url to the uplaoded image
    const imageTwoThumbData = await uploadThumb(resizedImageTwo);

    if (imageOneThumbData && imageTwoThumbData) {
      var objectRef = projectFirestore.collection('FCEPart2').doc(doc.id);
      await objectRef.update({
        imageOneThumbRef: imageOneThumbData.reference,
        imageOneThumbUrl: imageOneThumbData.url,
        imageTwoThumbUrl: imageTwoThumbData.url,
        imageTwoThumbRef: imageTwoThumbData.reference,
      });
    }
  });
};

export default createThumbsForExistingPartFce;
