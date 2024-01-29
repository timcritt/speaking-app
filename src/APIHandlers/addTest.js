import { projectFirestore, timestamp } from "../firebaseStuff/firebaseIndex";
import { FCEPart2 } from "./firebaseConsts";

const addTest = async (
	imageOneUrl,
	imageTwoUrl,
	questionOne,
	shortTurnQuestion,
	tags,
	imageOneRef,
	imageTwoRef,
	creatorId,
	imageOneThumbRef,
	imageOneThumbUrl,
	imageTwoThumbRef,
	imageTwoThumbUrl
) => {
	return await projectFirestore.collection(FCEPart2).add({
		imageOneUrl,
		imageTwoUrl,
		questionOne,
		shortTurnQuestion,
		createdAt: timestamp(),
		tags,
		imageOneRef,
		imageTwoRef,
		creatorId,
		imageOneThumbRef,
		imageOneThumbUrl,
		imageTwoThumbRef,
		imageTwoThumbUrl,
	});
};

export default addTest;
