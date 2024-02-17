import { projectFirestore, timestamp } from "../firebaseStuff/firebaseIndex";

const addPart3 = async (
	bottomCentre,
	bottomLeft,
	bottomRight,
	creatorId,
	questionOne,
	shortTurnQuestion,
	topLeft,
	topRight,
	tags,
	testType
) => {
	const collection = projectFirestore.collection(testType);

	return await collection.add({
		bottomCentre,
		bottomLeft,
		bottomRight,
		creatorId,
		questionOne,
		shortTurnQuestion,
		topLeft,
		topRight,
		tags,
		createdAt: timestamp(),
	});
};

export default addPart3;
