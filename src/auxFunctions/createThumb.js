import { projectStorage, firebaseAuth } from "../firebaseStuff/firebaseIndex";
import { v4 as uuidv4 } from "uuid";
import { readAndCompressImage } from "browser-image-resizer";

const config = {
	quality: 0.5,
	maxWidth: 400,
	maxHeight: 300,
	autoRotate: false,
	mimeType: "image/jpeg",
};

const uploadImage = async (image) => {
	let url;
	const thumbName = uuidv4();
	const ref = projectStorage.ref(`/thumbs/${thumbName}`);

	let reference;
	try {
		await ref
			//adds userId to metadata to allow permissions to be set in firebase
			.put(image, { customMetadata: { uid: firebaseAuth.currentUser.uid } })
			.then(async () => {
				url = await ref.getDownloadURL();
				reference = ref.fullPath;
			});
	} catch (error) {}
	return { url, reference };
};

//takes a blob url, creates a smaller version of it and then uploads it a storage bucket

const createThumb = async (imageUrl) => {
	//convert blob url to blob
	var blob = await fetch(imageUrl).then((r) => r.blob());
	//create thumnail of blob

	return await readAndCompressImage(blob, config).then(async (resizedImage) => {
		//upload to storage. Returns a reference and a url to the uploaded image
		return await uploadImage(resizedImage);
	});
};

export default createThumb;
