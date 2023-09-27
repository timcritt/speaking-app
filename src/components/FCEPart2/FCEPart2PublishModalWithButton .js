import React, { useState, Fragment, useContext } from "react";
import { useHistory } from "react-router-dom";

//Custom components
import Modal from "../common/Modal";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import { timestamp } from "firebase/firebaseIndex";
import updateTest from "APIHandlers/updateTest";
import SaveButton from "components/TestCommon/SaveButton";

//API
import addTest from "APIHandlers/addTest";
import { uploadFCEPart2Images } from "APIHandlers/uploadFCEPart2Images";

//Context
import { firebaseAuth } from "context/AuthProvider";
import { FCEPart2Context } from "context/FCEPart2Context";

//3rd party components
import LinearProgress from "@material-ui/core/LinearProgress";

//CSS modules
import styles from "./PublishWarningModal.module.css";

const FCEPart2PublishModalWithButton = ({ setInputStatus }) => {
	const [open, setOpen] = useState(false);
	const { userId } = useContext(firebaseAuth);
	const context = useContext(FCEPart2Context);

	const [uploadComplete, setUploadComplete] = useState(false);
	const [allInputsCompleted, setAllInputsCompleted] = useState(false);

	const validateInputs = () => {
		if (!context.questionOne) {
			setInputStatus((prevState) => {
				return {
					...prevState,
					questionOneFailedValidation: true,
				};
			});
		}
		if (!context.shortTurnQuestion) {
			setInputStatus((prevState) => {
				return {
					...prevState,
					shortTurnQuestionFailedValidation: true,
				};
			});
		}
		if (!context.imageOneUrl) {
			setInputStatus((prevState) => {
				return {
					...prevState,
					imageOneFailedValidation: true,
				};
			});
		}
		if (!context.imageTwoUrl) {
			setInputStatus((prevState) => {
				return {
					...prevState,
					imageTwoFailedValidation: true,
				};
			});
		}
		if (!context.testTags.length > 0) {
			setInputStatus((prevState) => {
				return {
					...prevState,
					topicTagsFailedValidation: true,
				};
			});
		}

		if (
			context.testTags.length > 0 &&
			context.imageOneUrl &&
			context.imageTwoUrl &&
			context.questionOne
		) {
			setAllInputsCompleted(true);
			return true;
		} else {
			setAllInputsCompleted(false);
			return false;
		}
	};

	const handleOpen = async (e) => {
		//prevent default form action
		e.preventDefault();

		//must rely on value of inputsValid rather than allInputsCompleted due to closure around the state value
		const inputsValid = validateInputs();

		setOpen(true);

		//must rely on value of inputsValid rather than allInputsCompleted due to closure around the state value
		if (inputsValid) {
			setUploadComplete(false);
			const createdAt = timestamp();

			//update existing test
			if (context.docRef) {
				//updates only if images are new
				uploadFCEPart2Images(
					context.imageOneUrl,
					context.imageTwoUrl,
					context.imageOneRef,
					context.imageTwoRef,
					context.imageOneThumbUrl,
					context.imageOneThumbRef,
					context.imageTwoThumbUrl,
					context.imageTwoThumbRef
				).then((data) => {
					updateTest(
						data.imageOneData.url,
						data.imageTwoData.url,
						context.questionOne,
						context.shortTurnQuestion,
						context.testTags,
						context.docRef,
						createdAt,
						data.imageOneData.reference,
						data.imageTwoData.reference,
						data.imageOneThumbData.url,
						data.imageOneThumbData.reference,
						data.imageTwoThumbData.url,
						data.imageTwoThumbData.reference
					).then(
						context.updateImageOneUrl(data.imageOneData.url),
						context.updateImageTwoUrl(data.imageTwoData.url),
						context.updateImageOneRef(data.imageOneData.reference),
						context.updateImageTwoRef(data.imageTwoData.reference),
						setUploadComplete(true),
						context.updateUnsavedChanges(false),
						setOpen(false)
						//setChangesSaved(true)
					);
				});
			} else {
				setOpen(true);
				//create new test
				//if local test has no docId, it's because it's new. i.e, it doesn't exist in the databse.
				//also creates thumbnails

				uploadFCEPart2Images(context.imageOneUrl, context.imageTwoUrl).then(
					(data) => {
						addTest(
							data.imageOneData.url,
							data.imageTwoData.url,
							context.questionOne,
							context.shortTurnQuestion,
							context.testTags,
							data.imageOneData.reference,
							data.imageTwoData.reference,
							userId,
							data.imageOneThumbData.reference,
							data.imageOneThumbData.url,
							data.imageTwoThumbData.reference,
							data.imageTwoThumbData.url
						).then((response) => {
							context.updateDocRef(response.id);
							setUploadComplete(true);
							context.updateUnsavedChanges(false);
						});
					}
				);
			}
		} else {
			setOpen(true);
		}
	};

	const handleClose = () => {
		setOpen(false);
		setUploadComplete(false);
	};

	return (
		<Fragment>
			<SaveButton handleOpen={handleOpen} />
			{open && (
				<Modal
					modalOpen={open}
					setModalOpen={handleClose}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					heading={"Saving"}
				>
					<div>
						<div>
							{allInputsCompleted ? (
								uploadComplete ? (
									<h3>Published!</h3>
								) : (
									<LinearProgress />
								)
							) : (
								<h3>Oops! You forgot to:</h3>
							)}
						</div>
						<ul>
							{(!context.imageOneUrl || !context.imageTwoUrl) && (
								<li>select two images</li>
							)}
							{!context.questionOne && <li>enter a question</li>}
							{context.testTags.length === 0 && (
								<li>select at least one tag</li>
							)}
						</ul>
						<div className="center">
							<button onClick={handleClose}>ok</button>
						</div>
					</div>
				</Modal>
			)}
		</Fragment>
	);
};

export default FCEPart2PublishModalWithButton;
