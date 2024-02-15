import { projectFirestore } from "../firebaseStuff/firebaseIndex";

const deleteRecordFirestore = async (documentId, collectionName) => {
	console.log("inisde deleteRecordFirestore");
	await projectFirestore
		.collection(collectionName)
		.doc(documentId)
		.delete()
		.catch(function (error) {
			console.error("Error removing document: ", error);
		});
};

export default deleteRecordFirestore;
