import React, { useEffect, useState } from "react";

import getTest from "APIHandlers/getTest";

const useLoadTestInEditMode = (
	testType,
	docToFetchRef,
	docRef,
	resetState,
	updateDocRef,
	updateTest,
	setEditMode
) => {
	useEffect(() => {
		//clear state before attempting to fetch a new test to prevent previous test being displayed while new one is loading (for slower connections)
		console.log(docRef);
		console.log(docToFetchRef);
		const asyncWrapper = async () => {
			//context.updateHasFetched(true);
			const test = await getTest(testType, docToFetchRef);
			console.log(test);
			//change object shape to match state shape before dispatching
			test.docRef = test.id;

			test.testTags = test.tags;
			delete test.tags;
			await updateTest(test);
			//context.updateHasFetched(true);
			console.log(test);
		};

		if (docToFetchRef !== docRef) {
			resetState();
			if (docToFetchRef !== "new") {
				asyncWrapper();
			} else {
				updateDocRef("new");
			}

			//context.updateHasFetched(true);
		}

		return () => {
			setEditMode(false);
		};
	}, [docToFetchRef]);
};

export default useLoadTestInEditMode;
