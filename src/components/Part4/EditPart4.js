import React, { Fragment, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import getTest from "APIHandlers/getTest";

//custom components
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import TestToolBar from "components/TestCommon/TestToolBar";
import SideBarTags from "components/common/SideBarTags";
import PublishPart4Modal from "./PublishPart4Modal";

//3rd party components
import { TextareaAutosize } from "@material-ui/core";

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
			props.dispatch({ type: "updateDocRef", payload: test });
			console.log(test);
		};

		//Only fetches new test if the one stored in state is not the one navigated to, i.e, referenced in params
		if (props.match.params.id !== props.docRef) {
			asyncWrapper();
			//for if creating a new test rather than editing existing one
		} else if (props.match.params.id === "new") {
			props.dispatch({ type: "resetState" });
		}
	}, [props.match.params]);

	var history = useHistory();

	const handleDeleteTest = async () => {
		//await deleteTest(props.docRef, props.testType);
		//props.clearState();
		//history.push(`/Edit${props.testType}/new`);
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
				setDocRef={props.setDocRef}
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
					<div className={styles.part4_container}>
						<div className={styles.content_container}>
							<span className={styles.title}>FCE Part 4</span>

							<TextareaAutosize
								value={props.questionOne}
								onChange={(e) =>
									props.dispatch({
										type: "updateQuestionOne",
										payload: e.target.value,
									})
								}
							/>
							<TextareaAutosize
								value={props.questionTwo}
								onChange={(e) =>
									props.dispatch({
										type: "updateQuestionTwo",
										payload: e.target.value,
									})
								}
							/>
							<TextareaAutosize
								value={props.questionThree}
								onChange={(e) =>
									props.dispatch({
										type: "updateQuestionThree",
										payload: e.target.value,
									})
								}
							/>
							<TextareaAutosize
								value={props.questionFour}
								onChange={(e) =>
									props.dispatch({
										type: "updateQuestionFour",
										payload: e.target.value,
									})
								}
							/>
							<TextareaAutosize
								value={props.questionFive}
								onChange={(e) =>
									props.dispatch({
										type: "updateQuestionFive",
										payload: e.target.value,
									})
								}
							/>
							<TextareaAutosize
								value={props.questionSix}
								onChange={(e) =>
									props.dispatch({
										type: "updateQuestionSix",
										payload: e.target.value,
									})
								}
							/>
						</div>
						{props.testTags && (
							<SideBarTags
								tags={props.testTags}
								handleSetTags={props.handleSetTags}
								title={"Topic Tags"}
							></SideBarTags>
						)}
						<div className={styles.tool_bar_container}>
							<TestToolBar
								creatorId={props.creatorId ? props.creatorId : "1"}
								buttons={buttons}
							/>
						</div>
					</div>
				</main>
			</FullScreen>
		</Fragment>
	);
};

export default EditPart4;
