import { projectFirestore, timestamp } from "../firebase/firebaseIndex";

const addPart4 = async (
	questionOne,
	questionTwo,
	questionThree,
	questionFour,
	questionFive = "",
	questionSix = "",
	tags,
	testType,
	creatorId
) => {
	const collection = projectFirestore.collection(testType);

	const result = await collection.add({
		questionOne,
		questionTwo,
		questionThree,
		questionFour,
		questionFive,
		questionSix,
		tags,
		createdAt: timestamp(),
		creatorId,
	});

	return result;
};

export default addPart4;
