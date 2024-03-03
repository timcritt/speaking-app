import React, { useState, useEffect, Fragment, useContext } from "react";

//Custom components
import Modal from "../common/Modal";
import { timestamp } from "firebaseStuff/firebaseIndex";
import SaveButton from "components/TestCommon/SaveButton";

//API
import updateCAEPart2 from "APIHandlers/updateCAEPart2";
import { uploadCAEPart2Images } from "APIHandlers/uploadFCEPart2Images";
import addCAEPart2 from "APIHandlers/addCAEPart2";
import { CAEPart2 } from "APIHandlers/firebaseConsts";
import getFilteredTests from "APIHandlers/getFilteredTests";

//Context
import { firebaseAuth } from "context/AuthProvider";
import { CAEPart2Context } from "context/CAEPart2Context";
import { TestModalContext } from "context/TestModalContext";

//3rd party components
import LinearProgress from "@mui/material/LinearProgress";

//3rd party hooks
import { useMutation, useQueryClient } from "@tanstack/react-query";

const PublishMessage = ({ uploadComplete }) => {
	return uploadComplete ? <h3>Published!</h3> : <LinearProgress />;
};

export default function PublishWarningModal({ setInputStatus }) {
	const [open, setOpen] = useState(false);
	const { userId } = useContext(firebaseAuth);
	const context = useContext(CAEPart2Context);
	const modalContext = useContext(TestModalContext);

	const [allInputsCompleted, setAllInputsCompleted] = useState(false);
	const [uploadComplete, setUploadComplete] = useState(false);

	//React query used to trigger UI updated after change to database
	const queryClient = useQueryClient();

	const queryKey = [CAEPart2];
	const queryFn = () => getFilteredTests(context.userId, null, CAEPart2);

	const mutation = useMutation({
		mutationFn: async (e) => handleOpen(e),

		onSuccess: () => {
			console.log("onMutate in publish modal firing");
			queryClient.fetchQuery({ queryKey, queryFn });
		},
	});

	const validateInputs = () => {
		const {
			questionOne,
			questionTwo,
			shortTurnQuestion,
			imageOneUrl,
			imageTwoUrl,
			imageThreeUrl,
			testTags,
		} = context;

		const newInputStatus = {
			questionOneFailedValidation: !questionOne,
			questionTwoFailedValidation: !questionTwo,
			shortTurnQuestionFailedValidation: !shortTurnQuestion,
			imageOneFailedValidation: !imageOneUrl,
			imageTwoFailedValidation: !imageTwoUrl,
			imageThreeFailedValidation: !imageThreeUrl,
			topicTagsFailedValidation: !(testTags.length > 0),
		};

		setInputStatus((prevState) => ({
			...prevState,
			...newInputStatus,
		}));

		const allInputsCompleted =
			questionOne &&
			questionTwo &&
			shortTurnQuestion &&
			imageOneUrl &&
			imageTwoUrl &&
			imageThreeUrl &&
			testTags.length > 0;

		setAllInputsCompleted(allInputsCompleted);

		return allInputsCompleted;
	};

	const handleOpen = (e) => {
		return new Promise((resolve, reject) => {
			e.preventDefault();

			//must rely on value returned by validateInputs rather than allInputsCompleted due to closure around the top level state value
			const inputsValid = validateInputs();

			//Open the modal
			setOpen(true);

			if (inputsValid) {
				setUploadComplete(false);
				const createdAt = timestamp();

				//Update existing test
				if (context.docRef !== "new") {
					uploadCAEPart2Images(
						context.imageOneUrl,
						context.imageTwoUrl,
						context.imageThreeUrl,
						context.imageOneRef,
						context.imageTwoRef,
						context.imageThreeRef
					)
						.then((data) => {
							updateCAEPart2(
								data.imageOneData.url,
								data.imageTwoData.url,
								data.imageThreeData.url,
								context.questionOne,
								context.questionTwo,
								context.shortTurnQuestion,
								context.testTags,
								context.docRef,
								createdAt,
								data.imageOneData.reference,
								data.imageTwoData.reference,
								data.imageThreeData.reference
							)
								.then(() => {
									context.updateImageOneUrl(data.imageOneData.url);
									context.updateImageTwoUrl(data.imageTwoData.url);
									context.updateImageThreeUrl(data.imageThreeData.url);
									context.updateImageOneRef(data.imageOneData.reference);
									context.updateImageTwoRef(data.imageTwoData.reference);
									context.updateImageThreeRef(data.imageThreeData.reference);
									setUploadComplete(true);
									context.updateUnsavedChanges(false);
									setOpen(false);
									resolve(); // Resolve the promise
								})
								.catch(reject); // Reject the promise if there's an error
						})
						.catch(reject); // Reject the promise if there's an error
				} else {
					setOpen(true);
					//create new test
					//if local test has id "new", it's because it's new. i.e, it doesn't exist in the database.
					//also creates thumbnails
					uploadCAEPart2Images(
						context.imageOneUrl,
						context.imageTwoUrl,
						context.imageThreeUrl
					)
						.then((data) => {
							addCAEPart2(
								data.imageOneData.url,
								data.imageTwoData.url,
								data.imageThreeData.url,
								context.questionOne,
								context.questionTwo,
								context.shortTurnQuestion,
								createdAt,
								context.testTags,
								data.imageOneData.reference,
								data.imageTwoData.reference,
								data.imageThreeData.reference,
								userId
							)
								.then((response) => {
									context.updateDocRef(response.id);
									modalContext.setDocToFetchRef(response.id);
									setUploadComplete(true);
									context.updateCreatorId(userId);
									context.updateUnsavedChanges(false);
									context.updateHasFetched(true);
									resolve(); // Resolve the promise
								})
								.catch(reject); // Reject the promise if there's an error
						})
						.catch(reject); // Reject the promise if there's an error
				}
			} else {
				setOpen(true);
				reject(new Error("Inputs are not valid")); // Reject the promise if inputs are not valid
			}
		});
	};

	const handleClose = () => {
		setOpen(false);
		setUploadComplete(false);
	};

	const body = (
		<div>
			<div>
				{allInputsCompleted ? (
					<PublishMessage uploadComplete={uploadComplete} />
				) : (
					<h3>Oops! You forgot to:</h3>
				)}
			</div>
			<ul>
				{(!context.imageOneUrl ||
					!context.imageTwoUrl ||
					!context.imageThreeUrl) && <li>select three images</li>}
				{(!context.questionOne ||
					!context.questionTwo ||
					!context.questionThree) && <li>enter three questions</li>}
				{context.testTags.length === 0 && <li>select at least one tag</li>}
			</ul>
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
