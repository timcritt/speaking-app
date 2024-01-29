import { folders } from "./firebaseConsts";
import { projectFirestore } from "../firebaseStuff/firebaseIndex";
import { timestamp } from "../firebaseStuff/firebaseIndex";

const updateFolderTests = async (folderId, tests) => {
	const updatedAt = timestamp();

	var objectRef = projectFirestore.collection(folders).doc(folderId);
	await objectRef.update({
		tests,
		updatedAt,
	});

	return;
};

export default updateFolderTests;
