import React, { Fragment } from "react";

//custom components
import DeleteButton from "components/common/DeleteButton";
import deleteTest from "APIHandlers/deleteTest";
import ViewButton from "components/TestCommon/ViewButton";

//styles
import styles from "./FCEPart2TestToolBarEdit.module.css";

import getFilteredTests from "APIHandlers/getFilteredTests";

import { useMutation, useQueryClient } from "@tanstack/react-query";

const TestToolBarEdit = ({
	testType,
	docRef,
	handleClickViewButton,
	closeModal,
	clearState,
	publishButtonRenderProp,
	creatorId,
}) => {
	const queryClient = useQueryClient();

	const handleDeleteTest = (e) => {
		console.log("deleting part 4");

		// Wrap everything in a Promise
		return new Promise((resolve, reject) => {
			e.preventDefault();

			// Assuming deleteTest returns a promise
			deleteTest(docRef, testType)
				.then(() => {
					// Assuming clearState and closeModal are synchronous functions
					clearState();
					closeModal();
					resolve(); // Resolve the promise if deletion is successful
				})
				.catch((error) => {
					reject(error); // Reject the promise if an error occurs during deletion
				});
		});
	};

	const queryFn = () => getFilteredTests(creatorId, null, testType);
	const queryKey = [testType];

	const mutation = useMutation({
		mutationFn: (e) => handleDeleteTest(e),
		onSuccess: () => {
			console.log("onMutate in TestToolBarEdit modal firing on delete");
			queryClient.fetchQuery({ queryKey, queryFn });
		},
	});

	return (
		<div className={styles.container}>
			{publishButtonRenderProp()}
			{docRef !== "new" && (
				<Fragment>
					<ViewButton handleClickViewButton={handleClickViewButton} />
					<DeleteButton
						itemId={docRef}
						deleteItemType={"test"}
						firestoreCollection={testType}
						iconColour={"white"}
						handleDelete={(e) => mutation.mutate(e)}
						buttonText={"delete"}
					/>
				</Fragment>
			)}
		</div>
	);
};

export default TestToolBarEdit;
