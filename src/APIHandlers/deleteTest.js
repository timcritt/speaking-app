import deleteTestFirestore from "./deleteRecordFirestore";

const deleteTest = (testId, testType) => {
	return new Promise((resolve, reject) => {
		// Inside the Promise, perform the asynchronous operation
		if (testId) {
			deleteTestFirestore(testId, testType)
				.then(() => {
					resolve(); // Resolve the promise if deletion is successful
				})
				.catch((error) => {
					reject(error); // Reject the promise if an error occurs during deletion
				});
		} else {
			resolve(); // Resolve the promise immediately if testId is falsy
		}
	});
};

export default deleteTest;
