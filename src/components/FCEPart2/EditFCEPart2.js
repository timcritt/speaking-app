import React, { useContext, Fragment, useState, useEffect } from "react";
import { Prompt } from "react-router-dom";

//custom components
import FormTags from "components/TestCommon/FormTags";
import ToolTip from "components/common/ToolTip";
import ExamPicture from "components/FCEPart2/ExamPicture";
import ImageDeleteBtn from "components/FCEPart2/ImageDeleteBtn";
import SimpleModal from "components/common/SimpleModal";
import TestToolBarEdit from "components/FCEPart2/TestToolBarEdit";
import PublishWarningModal from "components/FCEPart2/FCEPart2PublishModalWithButton ";

//3rd party components
import LinearProgress from "@material-ui/core/LinearProgress";

//context
import { FCEPart2Context } from "context/FCEPart2Context";

//API handlers
import getTest from "APIHandlers/getTest";

//styles
import styles from "./EditFCEPart2.module.css";
import { FCEPart2 } from "APIHandlers/firebaseConsts";

const EditFCEPart2 = ({ docRef, testType, setEditMode, handleShowModal }) => {
	const context = useContext(FCEPart2Context);

	const [inputStatus, setInputStatus] = useState({
		questionOneFailedValidation: false,
		shortTurnQuestionFailedValidation: false,
		imageOneFailedValidation: false,
		imageTwoFailedValidation: false,
		topicTagsFailedValidation: false,
	});

	useEffect(() => {
		const asyncWrapper = async () => {
			context.updateHasFetched(false);
			const test = await getTest("FCEPart2", docRef);
			console.log(test);
			//change object shape to match state shape before dispatching
			test.docRef = test.id;
			delete test.id;
			test.testTags = test.tags;
			delete test.tags;
			await context.updateTest(test);
			context.updateHasFetched(true);
			console.log(test);
		};
		//THESE COMMENTS NEED UPDATING
		//Only fetches new test if the one stored in state is not the one navigated to, i.e, referenced in params
		//Reduces redundant API calls and rerenders when navigating between view test and edit test
		if (docRef !== "new") {
			asyncWrapper();
		} else {
			context.resetState();
		}
		context.updateHasFetched(true);
	}, [docRef]);

	useEffect(() => {
		return () => {
			setEditMode(false);
		};
	}, []);

	if (context.hasFetched) {
		return (
			<Fragment>
				<Prompt
					when={context.unsavedChanges}
					message="You have unsaved changes. Are you sure you want to leave? All changes will be lost. "
				/>

				<main className="holy-grail-content centre-vertically">
					<form className={styles.container}>
						<h1 className={styles.h1}>
							{context.docRef ? "Edit " : "Create "}FCE Part 2
						</h1>
						<fieldset className={styles.image_row}>
							<legend>
								Images{" "}
								<ToolTip
									text={
										"Images for this part of the test are related by topic, with notable similarities but also differences. They must show people engaged in an activity or interaction"
									}
								/>
							</legend>
							<div
								className={`${styles.image_container} ${
									inputStatus.imageOneFailedValidation &&
									styles.required_input_incomplete
								}`}
							>
								<ExamPicture
									image={context.imageOneUrl}
									setImage={context.updateImageOneUrl}
								>
									{context.imageOneUrl ? (
										<ImageDeleteBtn
											setImageUrl={context.updateImageOneUrl}
											setImageRef={context.updateImageOneRef}
										/>
									) : (
										<SimpleModal
											modalButtonText={"upload"}
											setImageUrl={context.updateImageOneUrl}
											modalButton={
												<button
													className={styles.clickable_image_overlay}
												></button>
											}
										/>
									)}
								</ExamPicture>
							</div>
							<div className={`${styles.image_container}`}>
								<ExamPicture
									image={context.imageTwoUrl}
									setImage={context.updateImageTwoUrl}
								>
									{context.imageTwoUrl ? (
										<ImageDeleteBtn
											setImageUrl={context.updateImageTwoUrl}
											setImageRef={context.updateImageTwoRef}
										/>
									) : (
										<SimpleModal
											modalButtonText={"upload"}
											setImageUrl={context.updateImageTwoUrl}
											modalButton={
												<button
													className={`${styles.clickable_image_overlay} ${
														styles.image_container
													} ${
														inputStatus.imageTwoFailedValidation &&
														styles.required_input_incomplete
													} `}
												></button>
											}
										/>
									)}
								</ExamPicture>
							</div>
						</fieldset>
						<fieldset className={styles.question_row}>
							<legend>Questions</legend>
							<label>
								long turn{" "}
								<ToolTip
									text={
										"The long turn question asks one candidate to speculate for 1 minute about the photos, e.g, the intentions of the people pictured, the challenges involved, etc."
									}
								/>
							</label>
							<input
								label="long-turn"
								className={`input question-input ${
									inputStatus.questionOneFailedValidation &&
									styles.required_input_incomplete
								}`}
								value={context.questionOne}
								placeholder="enter long turn question"
								onChange={(e) =>
									context.updateQuestionOne(e.currentTarget.value)
								}
								required
							/>
							<label>
								short turn
								<ToolTip
									text={
										"The short turn question asks the other candidate to answer a personal question related to the topic of the pictures"
									}
								/>
							</label>
							<input
								label="short-turn"
								className={`input question-input ${
									inputStatus.shortTurnQuestionFailedValidation &&
									styles.required_input_incomplete
								}`}
								value={context.shortTurnQuestion}
								placeholder="enter short turn question"
								onChange={(e) =>
									context.updateShortTurnQuestion(e.currentTarget.value)
								}
								required
							/>
						</fieldset>

						<FormTags
							tags={context.testTags}
							handleSetTags={context.handleSetTags}
							required_input_incomplete_class={styles.required_input_incomplete}
							failedValidation={inputStatus.topicTagsFailedValidation}
						/>

						<TestToolBarEdit
							docRef={context.docRef}
							clearState={context.resetState}
							setInputStatus={setInputStatus}
							handleClickViewButton={() => setEditMode(false)}
							testType={FCEPart2}
							closeModal={() => handleShowModal(false)}
							publishButtonRenderProp={() => (
								<PublishWarningModal setInputStatus={setInputStatus} />
							)}
						/>
					</form>
				</main>
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

export default EditFCEPart2;
