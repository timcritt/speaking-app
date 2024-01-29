import { folders } from "./firebaseConsts";
import { projectFirestore } from "../firebaseStuff/firebaseIndex";
import { timestamp } from "../firebaseStuff/firebaseIndex";

const updateFolder = async (folderId, title, description) => {
	const updatedAt = timestamp();

	var objectRef = projectFirestore.collection(folders).doc(folderId);
	await objectRef.update({
		title,
		description,
		updatedAt,
	});

	return Promise.resolve();
};

export default updateFolder;
