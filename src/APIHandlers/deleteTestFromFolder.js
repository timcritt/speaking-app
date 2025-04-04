import { projectFirestore, increment } from "../firebaseStuff/firebaseIndex";

// 1. creates a new junction_folder_test document in firestore.
//2. increments testCount field of the folder document
//Transactions are batched to ensure atomicity

const deleteTestFromFolder = async (folderId, testId) => {
	let writeBatch = projectFirestore.batch();

	const junctionRef = projectFirestore.doc(
		`junction_folder_test/${folderId}_${testId}`
	);

	writeBatch.delete(junctionRef);

	const newTestCount = increment(-1);

	const folderRef = projectFirestore.collection("folders").doc(folderId);

	writeBatch.update(folderRef, { testCount: newTestCount });

	await writeBatch.commit();

	return;
};

export default deleteTestFromFolder;
