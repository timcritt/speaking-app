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

		const asyncWrapper = async () => {
			//context.updateHasFetched(true);
			const test = await getTest(testType, docToFetchRef);
			console.log(test);
			//change object shape to match state shape before dispatching
			test.docRef = test.id;
			delete test.id;
			test.testTags = test.tags;
			delete test.tags;
			await updateTest(test);
			//context.updateHasFetched(true);
			console.log(test);
		};
		//THESE COMMENTS NEED UPDATING
		//Only fetches new test if the one stored in state is not the one navigated to, i.e, referenced in params
		//Reduces redundant API calls and rerenders when navigating between view test and edit test
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
