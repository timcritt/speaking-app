import React, { useState, useEffect, Fragment, useContext } from "react";
import Modal from "components/common/Modal";
import updatePart3 from "APIHandlers/updatePart3";
import addPart3 from "APIHandlers/addPart3";
import { firebaseAuth } from "context/AuthProvider";
import SaveButton from "components/TestCommon/SaveButton";
import { LinearProgress } from "@mui/material";
import { TestModalContext } from "context/TestModalContext";
import { FCEPart3 } from "APIHandlers/firebaseConsts";

//3rd party Hooks
import { useMutation, useQueryClient } from "@tanstack/react-query";

import getFilteredTests from "APIHandlers/getFilteredTests";

export default function PublishWarningModal({
	bottomCentre,
	bottomLeft,
	bottomRight,
	creatorId,
	questionOne,
	shortTurnQuestion,
	topLeft,
	topRight,
	testTags,
	changesSaved,
	docRef,
	updateDocRef,
	testType,
	setInputStatus,
	updateCreatorId,
}) {
	const [open, setOpen] = useState(false);
	const { userId } = useContext(firebaseAuth);
	const [allInputsCompleted, setAllInputsCompleted] = useState(false);
	const [uploadComplete, setUploadComplete] = useState(false);
	const modalContext = useContext(TestModalContext);

	//React query used to trigger UI updated after change to database
	const queryClient = useQueryClient();

	const queryKey = [FCEPart3];
	const queryFn = () => getFilteredTests(creatorId, null, FCEPart3);

	const mutation = useMutation({
		mutationFn: async (e) => handleOpen(e),

		onSuccess: () => {
			console.log("onSuccess in publish Part 3 modal firing");
			queryClient.fetchQuery({ queryKey, queryFn });
		},
	});

	const validateInputs = () => {
		let newValidationState = {
			bottomCentreFailedValidation: !bottomCentre.length > 0,
			bottomLeftFailedValidation: !bottomLeft.length > 0,
			bottomRightFailedValidation: !bottomRight.length > 0,
			topLeftFailedValidation: !topLeft.length > 0,
			topRightFailedValidation: !topRight.length > 0,
			topicTagsFailedValidation: !testTags.length > 0,
			questionOneFailedValidation: !questionOne.length > 0,
			shortTurnQuestionFailedValidation: !shortTurnQuestion.length > 0,
		};

		setInputStatus((prevState) => {
			return {
				...newValidationState,
			};
		});

		const allValidated = Object.values(newValidationState).every((item) => {
			if (item === false) {
				return true;
			}
		});

		//check if all input validation checks have passed
		if (allValidated) {
			setAllInputsCompleted(true);
			return true;
		} else {
			setAllInputsCompleted(false);
			return false;
		}
	};

	const handleOpen = async (e) => {
		e.preventDefault();

		return new Promise((resolve, reject) => {
			//checks all required inputs have been completed by user
			//returns value rather than save as state value because the next if statement depends on this state,
			//and the calling function would have a stale state value due to closure
			const inputsValid = validateInputs();
			setOpen(true);

			if (inputsValid) {
				if (docRef !== "new") {
					//update fce part 3
					updatePart3(
						bottomCentre,
						bottomLeft,
						bottomRight,
						questionOne,
						shortTurnQuestion,
						topLeft,
						topRight,
						docRef,
						testTags,
						testType
					)
						.then(() => {
							setUploadComplete(true);
							resolve(); // resolve the promise when updatePart3 is complete
						})
						.catch(reject); // reject the promise if updatePart3 fails
				} else {
					//upload new Part 3 - only reached if all fields are complete and docRef is not "new" i.e., the test has just been created
					addPart3(
						bottomCentre,
						bottomLeft,
						bottomRight,
						userId,
						questionOne,
						shortTurnQuestion,
						topLeft,
						topRight,
						testTags,
						testType
					)
						.then((response) => {
							updateDocRef(response.id);
							modalContext.setDocToFetchRef(response.id);
							updateCreatorId(userId);
							setUploadComplete(true);
							resolve(); // resolve the promise when addPart3 is complete
						})
						.catch(reject); // reject the promise if addPart3 fails
				}
			} else {
				setOpen(true);
				resolve(); // resolve the promise when inputs are not valid
			}
		});
	};

	const handleClose = () => {
		setOpen(false);
	};

	const body = (
		<div>
			<div>
				{allInputsCompleted ? (
					uploadComplete ? (
						<h3>Published!</h3>
					) : (
						<LinearProgress />
					)
				) : (
					<h3>
						Oops! You forgot to enter at least 5 questions and select at least
						one tag!
					</h3>
				)}
			</div>

			<div className="center">
				<button onClick={handleClose}>ok</button>
			</div>
		</div>
	);

	return (
		<Fragment>
			<SaveButton handleOpen={mutation.mutate} />

			{open && (
				<Modal
					modalOpen={open}
					setModalOpen={handleClose}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					heading={"Saving"}
				>
					{body}
				</Modal>
			)}
		</Fragment>
	);
}
