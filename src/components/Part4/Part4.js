import React, { Fragment, useEffect } from "react";

//custom components
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import TestToolBar from "components/TestCommon/TestToolBar";
import ToolBarButtonsView from "components/TestCommon/ToolBarButtonsView";
import Timer from "components/common/Timer";
import GrabSlider from "components/common/GrabSlider/GrabSlider";

//API
import getTest from "APIHandlers/getTest";

//styles
import styles from "./Part4.module.css";

const Part4 = (props) => {
	//load test into state
	useEffect(() => {
		const asyncWrapper = async () => {
			const test = await getTest("FCEPart4", props.match.params.id);
			//change object shape to match state shape before dispatching
			test.docRef = test.id;
			delete test.id;
			test.testTags = test.tags;
			delete test.tags;
			props.dispatch({ type: "loadNewTest", payload: test });
			console.log(test);
		};

		//Only fetches new test if the one stored in state is not the one navigated to, i.e, referenced in params
		//Reduces redundant API calls and rerenders when navigating between view test and edit test
		if (props.match.params.id !== props.docRef) {
			asyncWrapper();
		}
	}, [props.match.params.id]);

	const handleFullScreen = useFullScreenHandle();

	return (
		<Fragment>
			<FullScreen handle={handleFullScreen}>
				<main className="holy-grail-content fade-in">
					<div className={styles.part4_container}>
						<div className={styles.content_container}>
							<span className={styles.title}>FCE Part 4</span>

							<div className={styles.question_container}>
								<span>{props.questionOne}</span>
								<span>{props.questionTwo}</span>
								<span>{props.questionThree}</span>
								<span>{props.questionFour}</span>
								{props.questionFive && <span>{props.questionFive}</span>}
								{props.questionSix && <span>{props.questionSix}</span>}
							</div>

							{props.docRef && <GrabSlider testTags={props.testTags} />}
						</div>
						<div className={styles.tool_bar_container}>
							<TestToolBar
								creatorId={props.creatorId ? props.creatorId : "1"}
								timer={<Timer time={props.time} />}
								buttons={
									<ToolBarButtonsView
										userId={props.creatorId}
										creatorId={props.creatorId}
										testType={"FCEPart4"}
										docRef={props.match.params.id}
										handleFullScreen={handleFullScreen}
									/>
								}
							/>
						</div>
					</div>
				</main>
			</FullScreen>
		</Fragment>
	);
};

export default Part4;
