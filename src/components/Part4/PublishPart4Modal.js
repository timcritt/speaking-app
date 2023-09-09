import React, { useState, Fragment, useContext } from "react";
import { useHistory } from "react-router-dom";

//custom components
import Modal from "components/common/Modal";
import SaveButton from "components/TestCommon/SaveButton";

//API
import updatePart4 from "APIHandlers/updatePart4";
import addPart4 from "APIHandlers/addPart4";

//Context
import { firebaseAuth } from "context/AuthProvider";
import { Part4Context } from "context/Part4Context";
import { LinearProgress } from "@mui/material";

export default function PublishPart4Modal({
	setInputStatus,
	testType,
	changesSaved,
}) {
	const [open, setOpen] = useState(false);
	const { userId } = useContext(firebaseAuth);
	const context = useContext(Part4Context);
	const [allInputsCompleted, setAllInputsCompleted] = useState(false);
	const history = useHistory();
	const [uploadComplete, setUploadComplete] = useState(false);

	const validateInputs = () => {
		//create the new state based on current inputs
		let newValidationState = {
			questionOneFailedValidation: !context.questionOne.length > 0,
			questionTwoFailedValidation: !context.questionTwo.length > 0,
			questionThreeFailedValidation: !context.questionThree.length > 0,
			questionFourFailedValidation: !context.questionFour.length > 0,
			questionFiveFailedValidation: !context.questionFive.length > 0,
			topicTagsFailedValidation: !context.testTags.length > 0,
		};

		setInputStatus((prevState) => {
			return {
				...prevState,
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

		//checks all required inputs have been completed by user
		//returns value rather than save as state value because the next if statement depends on this state,
		//and the calling function would have a state state value due to closure
		const inputsValid = validateInputs();

		setOpen(true);

		if (inputsValid) {
			console.log("inputs are valid");
			if (context.docRef !== "new") {
				//update fce part 4

				updatePart4(
					context.questionOne,
					context.questionTwo,
					context.questionThree,
					context.questionFour,
					context.questionFive,
					context.questionSix,
					context.docRef,
					context.testTags,
					testType
				).then(() => {
					setUploadComplete(true);
				});
			} else {
				//upload new Part 4 - only reached if all fields are complete and docRef doesn't exist - i.e., the test has just been created
				console.log("about to addPart4");
				addPart4(
					context.questionOne,
					context.questionTwo,
					context.questionThree,
					context.questionFour,
					context.questionFive,
					context.questionSix,
					context.testTags,
					testType,
					userId
				).then((response) => {
					setUploadComplete(true);
					context.updateDocRef(response.id);
					history.push(`/${testType}/${response.id}`);
				});
			}
		}
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
			<SaveButton handleOpen={handleOpen} changesSaved={changesSaved} />

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
