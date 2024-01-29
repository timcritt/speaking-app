import { projectFirestore } from "../firebaseStuff/firebaseIndex";

//returns an array of the ids of all tests that are in a folder
const getFolderTestsJunctions = async (folderId) => {
	const junctions = await projectFirestore
		.collection(`junction_folder_test`)
		.where("folderId", "==", folderId)
		.get();

	return junctions.docs
		.filter((doc) => doc.exists)
		.map((doc) => doc.data().testId);
};

export default getFolderTestsJunctions;
