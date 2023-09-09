import React, { useState, useEffect, useCallback } from "react";
import { Fragment } from "react";

//custom components
import ControlledFormInput from "components/TestCommon/ControlledFormInput";
import TestToolBarEdit from "components/FCEPart2/TestToolBarEdit";
import PublishPart3WarningModal from "components/Part3Common/PublishPart3WarningModal";

//3rd party components
import LinearProgress from "@material-ui/core/LinearProgress";
import FormTags from "components/TestCommon/FormTags";

//3rd party hooks
import { FullScreen, useFullScreenHandle } from "react-full-screen";

//API handlers
import getTest from "APIHandlers/getTest";

//CSS modules
import styles from "./Part3.module.css";

const EditPart3 = ({
	context,
	clearState,
	docRef,
	questionOne,
	shortTurnQuestion,
	topLeft,
	topRight,
	bottomLeft,
	bottomCentre,
	bottomRight,
	testTags,
	creatorId,
	changesSaved,
	hasFetched,
	testType,
	setEditMode,
	handleOpenModal,
	updateQuestionOne,
	updateShortTurnQuestion,
	updateTopLeft,
	updateTopRight,
	updateBottomLeft,
	updateBottomCentre,
	updateBottomRight,
	updateTest,
	resetState,
	setHasFetched,
	handleSetTags,
}) => {
	const handleFullScreen = useFullScreenHandle();
	const optionPlaceholder = "option";

	const [inputStatus, setInputStatus] = useState({
		shortTurnQuestionFailedValidation: false,
		questionOneFailedValidation: false,
		questionToFailedValidation: false,
		topLeftFailedValidation: false,
		topRightFailedValidation: false,
		bottomLeftFailedValidation: false,
		bottomCentreFailedValidation: false,
		bottomRightFailedValidation: false,
		topicTagsFailedValidation: false,
	});

	useEffect(() => {
		const asyncWrapper = async () => {
			let test = await getTest("FCEPart3", docRef);
			console.log(test);
			test.docRef = test.id;
			delete test.id;
			test.testTags = test.tags;
			delete test.tags;
			updateTest(test);
		};

		//checks if creating a new test rather than editing existing one
		if (docRef === "new") {
			context.resetState();
			//Only fetches new test if the one stored in state is not the one navigated to, i.e, referenced in params
		} else {
			asyncWrapper();
		}

		return () => {
			//makes sure the modal displays the test in view mode, not edit mode on next open
			setEditMode(false);
		};
	}, [docRef]);

	if (true) {
		return (
			<Fragment>
				<FullScreen handle={handleFullScreen}>
					<main className="holy-grail-content fade-in">
						<form className={styles.container}>
							<fieldset>
								<legend>Options to discuss</legend>
								<ControlledFormInput
									failedValidation={inputStatus.topLeftFailedValidation}
									textValue={topLeft}
									onChange={(e) => {
										updateTopLeft(e.target.value);
										if (e.target.value.length > 0) {
											setInputStatus((prevState) => {
												return {
													...prevState,
													topLeftFailedValidation: false,
												};
											});
										}
									}}
								/>
								<ControlledFormInput
									failedValidation={inputStatus.topRightFailedValidation}
									textValue={topRight}
									onChange={(e) => {
										updateTopRight(e.target.value);
										if (e.target.value.length > 0) {
											setInputStatus((prevState) => {
												return {
													...prevState,
													topRightFailedValidation: false,
												};
											});
										}
									}}
								/>
								<ControlledFormInput
									failedValidation={inputStatus.bottomLeftFailedValidation}
									textValue={bottomLeft}
									onChange={(e) => {
										updateBottomLeft(e.target.value);
										// if (e.target.value.length > 0) {
										// 	setInputStatus((prevState) => {
										// 		return {
										// 			...prevState,
										// 			questionFourFailedValidation: false,
										// 		};
										// 	});
										// }
									}}
								/>
								<ControlledFormInput
									failedValidation={inputStatus.bottomCentreFailedValidation}
									textValue={bottomCentre}
									onChange={(e) => {
										updateBottomCentre(e.target.value);
										// if (e.target.value.length > 0) {
										// 	setInputStatus((prevState) => {
										// 		return {
										// 			...prevState,
										// 			questionFourFailedValidation: false,
										// 		};
										// 	});
										// }
									}}
								/>
								<ControlledFormInput
									failedValidation={inputStatus.bottomRightFailedValidation}
									textValue={bottomRight}
									onChange={(e) => {
										updateBottomRight(e.target.value);
										// if (e.target.value.length > 0) {
										// 	setInputStatus((prevState) => {
										// 		return {
										// 			...prevState,
										// 			questionFourFailedValidation: false,
										// 		};
										// 	});
										// }
									}}
								/>
							</fieldset>

							<fieldset className="part2-edit-question-container part3-questionTwo-container">
								<legend>Short turn question</legend>
								<ControlledFormInput
									//failedValidation={inputStatus.questionFourFailedValidation}
									textValue={shortTurnQuestion}
									onChange={(e) => {
										updateShortTurnQuestion(e.target.value);
										// if (e.target.value.length > 0) {
										// 	setInputStatus((prevState) => {
										// 		return {
										// 			...prevState,
										// 			questionFourFailedValidation: false,
										// 		};
										// 	});
										// }
									}}
								/>
							</fieldset>
							{testTags && (
								<FormTags
									tags={testTags}
									handleSetTags={handleSetTags}
									failedValidation={inputStatus.topicTagsFailedValidation}
								/>
							)}
							<div className={styles.button_container}>
								<TestToolBarEdit
									testType={"FCEPart3"}
									docRef={docRef}
									handleClickViewButton={() => setEditMode(false)}
									closeModal={() => console.log("close modal")}
									clearState={() => resetState()}
									publishButtonRenderProp={() => (
										<PublishPart3WarningModal
											questionOne={questionOne}
											shortTurnQuestion={shortTurnQuestion}
											topLeft={topLeft}
											topRight={topRight}
											bottomLeft={bottomLeft}
											bottomCentre={bottomCentre}
											bottomRight={bottomRight}
											testTags={testTags}
											creatorId={creatorId}
											docRef={docRef}
											testType={testType}
											setInputStatus={setInputStatus}
										/>
									)}
								/>
							</div>
						</form>
					</main>
				</FullScreen>
			</Fragment>
		);
	} else {
		return (
			<div className={"full-width"}>
				<LinearProgress />
			</div>
		);
	}
};

export default EditPart3;
