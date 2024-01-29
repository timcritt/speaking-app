import { projectFirestore } from "../firebaseStuff/firebaseIndex";

const addCAEPart2 = async (
	imageOneUrl,
	imageTwoUrl,
	imageThreeUrl,
	questionOne,
	questionTwo,
	shortTurnQuestion,
	createdAt,
	tags,
	imageOneRef,
	imageTwoRef,
	imageThreeRef,
	creatorId
) => {
	return await projectFirestore.collection("CAEPart2").add({
		imageOneUrl,
		imageTwoUrl,
		imageThreeUrl,
		questionOne,
		questionTwo,
		shortTurnQuestion,
		createdAt,
		tags,
		imageOneRef,
		imageTwoRef,
		imageThreeRef,
		creatorId,
	});
};

export default addCAEPart2;
