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

//API handlers
import deleteTest from "APIHandlers/deleteTest";

//styles
import styles from "./Part4.module.css";

const EditPart4 = (props) => {
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
			let test = await getTest("FCEPart4", props.docRef);
			test.docRef = test.id;
			delete test.id;
			test.testTags = test.tags;
			delete test.tags;
			props.dispatch({ type: "loadNewTest", payload: test });
		};

		//checks if creating a new test rather than editing existing one
		if (props.docRef === "new") {
			props.dispatch({ type: "resetState" });
			//Only fetches new test if the one stored in state is not the one navigated to, i.e, referenced in params
		} else {
			asyncWrapper();
		}

		return () => {
			props.setEditMode(false);
		};
	}, [props.docRef]);

	return (
		<Fragment>
			<FullScreen handle={handleFullScreen}>
				<main className="holy-grail-content fade-in">
					<form className={styles.part4_container}>
						<h1 className={styles.title}>
							{props.docRef === "new" ? "Create " : "Edit "}FCE Part 4
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
								textValue={props.questionOne}
								onChange={(e) => {
									props.dispatch({
										type: "updateQuestionOne",
										payload: e.target.value,
									});
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
								textValue={props.questionTwo}
								onChange={(e) => {
									props.dispatch({
										type: "updateQuestionTwo",
										payload: e.target.value,
									});
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
								textValue={props.questionThree}
								onChange={(e) => {
									props.dispatch({
										type: "updateQuestionThree",
										payload: e.target.value,
									});
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
								textValue={props.questionFour}
								onChange={(e) => {
									props.dispatch({
										type: "updateQuestionFour",
										payload: e.target.value,
									});
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
								textValue={props.questionFive}
								onChange={(e) => {
									props.dispatch({
										type: "updateQuestionFive",
										payload: e.target.value,
									});
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
								textValue={props.questionSix}
								onChange={(e) =>
									props.dispatch({
										type: "updateQuestionSix",
										payload: e.target.value,
									})
								}
							/>
						</fieldset>
						{props.testTags && (
							<FormTags
								tags={props.testTags}
								handleSetTags={props.handleSetTags}
								failedValidation={inputStatus.topicTagsFailedValidation}
							/>
						)}
						<div className={styles.button_container}>
							<TestToolBarEdit
								testType={"FCEPart4"}
								docRef={props.docRef}
								handleClickViewButton={props.setEditMode}
								closeModal={() => console.log("close modal")}
								clearState={() => props.dispatch({ type: "resetState" })}
								publishButtonRenderProp={() => (
									<PublishPart4Modal
										changesSaved={props.changesSaved}
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
