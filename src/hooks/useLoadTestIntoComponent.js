import { useEffect } from "react";

//API
import getTest from "APIHandlers/getTest";

const useLoadTestIntoComponent = (
	testType,
	docToFetchRef,
	resetState,
	updateTest,
	updateHasFetched,
	docRef
) => {
	useEffect(() => {
		//clear state before attempting to fetch a new test to prevent previous test being displayed while new one is loading (for slower connections)

		const asyncWrapper = async () => {
			updateHasFetched(false);
			const test = await getTest(testType, docToFetchRef);
			console.log(test);
			//change object shape to match state shape before dispatching
			test.docRef = test.id;
			delete test.id;
			test.testTags = test.tags;
			delete test.tags;
			updateTest(test);
			updateHasFetched(true);
			console.log(test);
		};

		//If
		if (docToFetchRef !== "new") {
			if (docToFetchRef !== docRef) {
				resetState();
				asyncWrapper();
			}

			updateHasFetched(true);
		}
	}, [docToFetchRef]);
};

export default useLoadTestIntoComponent;
