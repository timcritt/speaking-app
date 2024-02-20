import { projectStorage } from "../firebaseStuff/firebaseIndex";
// compat packages are API compatible with namespaced code
import firebase from "firebase/compat/app";
import createThumb from "auxFunctions/createThumb";

import { v4 as uuidv4 } from "uuid";

//upload new image from localstorage to firestore storage and return reference and download url
export const uploadImage = async (imageUrl) => {
	return new Promise(async (resolve, reject) => {
		try {
			const image = await fetch(imageUrl).then((r) => r.blob());
			const ref = projectStorage.ref(uuidv4());
			let url, reference;

			await ref.put(image, {
				customMetadata: { uid: firebase.auth().currentUser.uid },
			});
			url = await ref.getDownloadURL();
			reference = ref.fullPath;

			resolve({ url, reference });
		} catch (error) {
			reject(error);
		}
	});
};

export const uploadFCEPart2Images = (
	imageOneUrl,
	imageTwoUrl,
	imageOneReference,
	imageTwoReference,
	imageOneThumbUrl,
	imageOneThumbReference,
	imageTwoThumbUrl,
	imageTwoThumbReference
) => {
	return new Promise(async (resolve, reject) => {
		let imageOneData = {
			url: imageOneUrl,
			reference: imageOneReference,
		};

		let imageTwoData = {
			url: imageTwoUrl,
			reference: imageTwoReference,
		};

		let imageOneThumbData = {
			url: imageOneThumbUrl,
			reference: imageOneThumbReference,
		};

		let imageTwoThumbData = {
			url: imageTwoThumbUrl,
			reference: imageTwoThumbReference,
		};

		try {
			if (!imageOneData.url.includes("firebase")) {
				imageOneData = await uploadImage(imageOneUrl);
				imageOneThumbData = await createThumb(imageOneUrl);
			}

			if (!imageTwoData.url.includes("firebase")) {
				imageTwoData = await uploadImage(imageTwoUrl);
				imageTwoThumbData = await createThumb(imageTwoUrl);
			}

			resolve({
				imageOneData,
				imageTwoData,
				imageOneThumbData,
				imageTwoThumbData,
			});
		} catch (error) {
			reject(error);
		}
	});
};

//checks if user has changed the images of the test then uploads new image and returns new references if so. Returns original references if not.
export const uploadCAEPart2Images = (
	imageOneUrl,
	imageTwoUrl,
	imageThreeUrl,
	imageOneReference,
	imageTwoReference,
	imageThreeReference
) => {
	return new Promise(async (resolve, reject) => {
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

		try {
			if (!imageOneData.url.includes("firebase")) {
				imageOneData = await uploadImage(imageOneUrl);
			}

			if (!imageTwoData.url.includes("firebase")) {
				imageTwoData = await uploadImage(imageTwoUrl);
			}

			if (!imageThreeData.url.includes("firebase")) {
				imageThreeData = await uploadImage(imageThreeUrl);
			}

			resolve({ imageOneData, imageTwoData, imageThreeData });
		} catch (error) {
			reject(error);
		}
	});
};
