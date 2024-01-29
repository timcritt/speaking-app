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

	const result = await collection.add({
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

	return result;
};

export default addPart3;
