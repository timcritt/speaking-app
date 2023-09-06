import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import getTest from "APIHandlers/getTest";

//custom components
import FormTags from "components/TestCommon/FormTags";
import PublishPart4Modal from "./PublishPart4Modal";
import ControlledFormInput from "components/TestCommon/ControlledFormInput";
import ToolTip from "components/common/ToolTip";
import TestToolBarEdit from "components/FCEPart2/TestToolBarEdit";

//3rd party Components
import { FullScreen, useFullScreenHandle } from "react-full-screen";

//styles
import styles from "./Part4.module.css";

const EditPart4 = ({
	docRef,
	updateTest,
	resetState,
	questionOne,
	updateQuestionOne,
	questionTwo,
	updateQuestionTwo,
	questionThree,
	updateQuestionThree,
	questionFour,
	updateQuestionFour,
	questionFive,
	updateQuestionFive,
	questionSix,
	updateQuestionSix,
	setEditMode,
	testTags,
	handleSetTags,
}) => {
	const handleFullScreen = useFullScreenHandle();

	const [inputStatus, setInputStatus] = useState({
		questionOneFailedValidation: false,
		questionTwoFailedValidation: false,
		questionThreeFailedValidation: false,
		questionFourFailedValidation: false,
		questionFiveFailedValidation: false,
		topicTagsFailedValidation: false,
	});

	//Get a test from the database according to the params and set state
	useEffect(() => {
		const asyncWrapper = async () => {
			console.log(docRef);
			let test = await getTest("FCEPart4", docRef);
			test.docRef = test.id;
			delete test.id;
			test.testTags = test.tags;
			delete test.tags;
			updateTest();
		};

		//checks if creating a new test rather than editing existing one
		if (docRef === "new") {
			resetState();
			//Only fetches new test if the one stored in state is not the one navigated to, i.e, referenced in params
		} else {
			asyncWrapper();
		}

		return () => {
			setEditMode(false);
		};
	}, [docRef]);

	return (
		<Fragment>
			<FullScreen handle={handleFullScreen}>
				<main className="holy-grail-content fade-in">
					<form className={styles.part4_container}>
						<h1 className={styles.title}>
							{docRef === "new" ? "Create " : "Edit "}FCE Part 4
						</h1>
						<fieldset className={styles.content_container}>
							<legend>
								Questions
								<ToolTip
									text={
										"Each question must generate debate on the topic/s from Part 3. Each candidate is asked their opinion."
									}
								/>
							</legend>
							<ControlledFormInput
								failedValidation={inputStatus.questionOneFailedValidation}
								textValue={questionOne}
								onChange={(e) => {
									updateQuestionOne(e.target.value);
									if (e.target.value.length > 0) {
										setInputStatus((prevState) => {
											return {
												...prevState,
												questionOneFailedValidation: false,
											};
										});
									}
								}}
							/>
							<ControlledFormInput
								failedValidation={inputStatus.questionTwoFailedValidation}
								textValue={questionTwo}
								onChange={(e) => {
									updateQuestionTwo(e.target.value);

									if (e.target.value.length > 0) {
										setInputStatus((prevState) => {
											return {
												...prevState,
												questionTwoFailedValidation: false,
											};
										});
									}
								}}
							/>
							<ControlledFormInput
								failedValidation={inputStatus.questionThreeFailedValidation}
								textValue={questionThree}
								onChange={(e) => {
									updateQuestionThree(e.target.value);
									if (e.target.value.length > 0) {
										setInputStatus((prevState) => {
											return {
												...prevState,
												questionThreeFailedValidation: false,
											};
										});
									}
								}}
							/>
							<ControlledFormInput
								failedValidation={inputStatus.questionFourFailedValidation}
								textValue={questionFour}
								onChange={(e) => {
									updateQuestionFour(e.target.value);
									if (e.target.value.length > 0) {
										setInputStatus((prevState) => {
											return {
												...prevState,
												questionFourFailedValidation: false,
											};
										});
									}
								}}
							/>
							<ControlledFormInput
								failedValidation={inputStatus.questionFiveFailedValidation}
								textValue={questionFive}
								onChange={(e) => {
									updateQuestionFive(e.target.value);

									if (e.target.value.length > 0) {
										setInputStatus((prevState) => {
											return {
												...prevState,
												questionFiveFailedValidation: false,
											};
										});
									}
								}}
							/>
							<ControlledFormInput
								textValue={questionSix}
								onChange={(e) => updateQuestionSix(e.target.value)}
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
								testType={"FCEPart4"}
								docRef={docRef}
								handleClickViewButton={setEditMode}
								closeModal={() => console.log("close modal")}
								clearState={() => resetState()}
								publishButtonRenderProp={() => (
									<PublishPart4Modal
										// changesSaved={changesSaved}
										testType={"FCEPart4"}
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
};

export default EditPart4;
