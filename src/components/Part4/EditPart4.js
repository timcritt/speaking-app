import React, { Fragment, useEffect, memo } from "react";
import { Link, useHistory } from "react-router-dom";
import getTest from "APIHandlers/getTest";

//custom components
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import TestToolBar from "components/TestCommon/TestToolBar";
import FormTags from "components/TestCommon/FormTags";
import PublishPart4Modal from "./PublishPart4Modal";
import ControlledFormInput from "components/TestCommon/ControlledFormInput";
import ToolTip from "components/common/ToolTip";

//API handlers
import deleteTest from "APIHandlers/deleteTest";

//icons
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";

//Custom Hooks
//import useLoadTestIntoComponent from "hooks/useLoadTestIntoComponent";

//styles
import styles from "./Part4.module.css";

const EditPart4 = (props) => {
	const handleFullScreen = useFullScreenHandle();

	//Get a test from the database according to the params and set state
	useEffect(() => {
		const asyncWrapper = async () => {
			const test = await getTest("FCEPart4", props.match.params.id);
			test.docRef = test.id;
			delete test.id;
			test.testTags = test.tags;
			delete test.tags;
			props.dispatch({ type: "loadNewTest", payload: test });
		};

		//checks if creating a new test rather than editing existing one
		if (props.match.params.id === "new") {
			console.log("reset set");
			props.dispatch({ type: "resetState" });
			//Only fetches new test if the one stored in state is not the one navigated to, i.e, referenced in params
		} else if (props.match.params.id !== props.docRef) {
			asyncWrapper();
		}
	}, [props.match.params.id]);

	var history = useHistory();

	const handleDeleteTest = async (e) => {
		console.log("handle delete test");
		e.preventDefault(e);
		await deleteTest(props.docRef, props.testType);
		history.push(`/Edit${props.testType}/new`);
	};

	//console.log(props);

	const buttons = (
		<Fragment>
			<PublishPart4Modal
				questionOne={props.questionOne}
				questionTwo={props.questionTwo}
				questionThree={props.questionThree}
				questionFour={props.questionFour}
				questionFive={props.questionFive}
				questionSix={props.questionSix}
				tags={props.testTags}
				testType={props.testType}
				changesSaved={props.changesSaved}
				docRef={props.docRef}
				setDocRef={props.dispatch}
			/>
			{props.docRef && (
				<Link
					to={{
						pathname: `/${props.testType}/${props.docRef}`,
					}}
				>
					<button className="tool-bar-btn">
						<VisibilityOutlinedIcon />
					</button>
				</Link>
			)}
			<button className="tool-bar-btn" onClick={handleDeleteTest}>
				<DeleteForeverOutlinedIcon />
			</button>
		</Fragment>
	);

	return (
		<Fragment>
			<FullScreen handle={handleFullScreen}>
				<main className="holy-grail-content fade-in">
					<form className={styles.part4_container}>
						<h1 className={styles.title}>
							{props.docRef ? "Edit " : "Create "}FCE Part 4
						</h1>
						<fieldset className={styles.content_container}>
							<legend>
								Questions
								<ToolTip
									text={
										"Images for this part of the test are related by topic, with notable similarities but also differences. They must show people engaged in an activity or interaction"
									}
								/>
							</legend>
							<ControlledFormInput
								textValue={props.questionOne}
								onChange={(e) =>
									props.dispatch({
										type: "updateQuestionOne",
										payload: e.target.value,
									})
								}
							/>
							<ControlledFormInput
								textValue={props.questionTwo}
								onChange={(e) =>
									props.dispatch({
										type: "updateQuestionTwo",
										payload: e.target.value,
									})
								}
							/>
							<ControlledFormInput
								textValue={props.questionThree}
								onChange={(e) =>
									props.dispatch({
										type: "updateQuestionThree",
										payload: e.target.value,
									})
								}
							/>
							<ControlledFormInput
								textValue={props.questionFour}
								onChange={(e) =>
									props.dispatch({
										type: "updateQuestionFour",
										payload: e.target.value,
									})
								}
							/>
							<ControlledFormInput
								textValue={props.questionFive}
								onChange={(e) =>
									props.dispatch({
										type: "updateQuestionFive",
										payload: e.target.value,
									})
								}
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
								title={"Topic Tags"}
							></FormTags>
						)}
						<div className={styles.tool_bar_container}>
							<TestToolBar
								creatorId={props.creatorId ? props.creatorId : "1"}
								buttons={buttons}
							/>
						</div>
					</form>
				</main>
			</FullScreen>
		</Fragment>
	);
};

export default EditPart4;
