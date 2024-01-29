import { projectFirestore } from "../firebaseStuff/firebaseIndex";
import { FCEPart2 } from "./firebaseConsts";

const updateTest = async (
	imageOneUrl,
	imageTwoUrl,
	questionOne,
	shortTurnQuestion,
	tags,
	id,
	createdAt,
	imageOneRef,
	imageTwoRef,
	imageOneThumbUrl,
	imageOneThumbReference,
	imageTwoThumbUrl,
	imageTwoThumbReference
) => {
	var objectRef = projectFirestore.collection(FCEPart2).doc(id);

	const updateObject = {
		imageOneUrl,
		imageTwoUrl,
		questionOne,
		shortTurnQuestion,
		updatedAt: createdAt,
		tags,
		imageOneRef,
		imageTwoRef,
	};

	//only adds thumbs if the corresponding image has been updated and uploded to storage. Valees will be passed to update test as null if not.
	if (imageOneThumbUrl) {
		updateObject.imageOneThumbRef = imageOneThumbReference;
		updateObject.imageOneThumbUrl = imageOneThumbUrl;
	}

	if (imageTwoThumbUrl) {
		updateObject.imageTwoThumbRef = imageTwoThumbReference;
		updateObject.imageTwoThumbUrl = imageTwoThumbUrl;
	}
	await objectRef.update(updateObject);
};

export default updateTest;
