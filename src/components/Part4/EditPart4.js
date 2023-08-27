import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import getTest from "APIHandlers/getTest";

//custom components
import FormTags from "components/TestCommon/FormTags";
import PublishPart4Modal from "./PublishPart4Modal";
import ControlledFormInput from "components/TestCommon/ControlledFormInput";
import ToolTip from "components/common/ToolTip";
import DeleteButton from "components/common/DeleteButton";

//3rd party Components
import { FullScreen, useFullScreenHandle } from "react-full-screen";

//API handlers
import deleteTest from "APIHandlers/deleteTest";

//styles
import styles from "./Part4.module.css";
import ViewButton from "components/TestCommon/ViewButton";

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
			let test = await getTest("FCEPart4", props.match.params.id);
			test.docRef = test.id;
			delete test.id;
			test.testTags = test.tags;
			delete test.tags;
			props.dispatch({ type: "loadNewTest", payload: test });
		};

		//checks if creating a new test rather than editing existing one
		if (props.match.params.id === "new") {
			props.dispatch({ type: "resetState" });
			//Only fetches new test if the one stored in state is not the one navigated to, i.e, referenced in params
		} else if (props.match.params.id !== props.docRef) {
			asyncWrapper();
		}
	}, [props.match.params.id]);

	var history = useHistory();

	const handleDeleteTest = async (e) => {
		console.log("handle delete test");
		e.preventDefault();
		await deleteTest(props.docRef, props.testType);
		history.push(`/Edit${props.testType}/new`);
	};

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
							<PublishPart4Modal
								changesSaved={props.changesSaved}
								setInputStatus={setInputStatus}
								testType={"FCEPart4"}
							/>
							{/* only displays if the test has been saved */}
							{props.docRef !== "new" && (
								<>
									<ViewButton testType={"FCEPart4"} docRef={props.docRef} />
									<DeleteButton handleDelete={(e) => handleDeleteTest(e)} />
								</>
							)}
						</div>
					</form>
				</main>
			</FullScreen>
		</Fragment>
	);
};

export default EditPart4;
