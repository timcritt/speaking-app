import { projectFirestore } from "../firebaseStuff/firebaseIndex";

import { folders } from "./firebaseConsts";
// compat packages are API compatible with namespaced code
import firebase from "firebase/compat/app";

const addFolder = async (title, description, creatorId) => {
	const testCount = 0;
	const createdAt = firebase.firestore.FieldValue.serverTimestamp();
	try {
		return await projectFirestore.collection(folders).add({
			title,
			description,
			createdAt,
			creatorId,
			testCount,
		});
	} catch (error) {}
};

export default addFolder;
