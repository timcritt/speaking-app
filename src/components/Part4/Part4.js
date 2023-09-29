import React, { Fragment, useEffect } from "react";

//custom components
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import TestToolBarView from "components/TestCommon/TestToolBarView";
import ToolBarButtonsView from "components/TestCommon/ToolBarButtonsView";
import Timer from "components/common/Timer";
import GrabSlider from "components/common/GrabSlider/GrabSlider";

//API
import getTest from "APIHandlers/getTest";

//styles
import styles from "./Part4.module.css";

const Part4 = ({
	docToFetchRef,
	setEditMode,
	docRef,
	questionOne,
	questionTwo,
	questionThree,
	questionFour,
	questionFive,
	questionSix,
	creatorId,
	time,
	testTags,
	updateTest,
	resetState,
}) => {
	//load test into state
	useEffect(() => {
		//clear state before attempting to fetch a new test to prevent previous test being displayed while new one is loading (for slower connections)

		const asyncWrapper = async () => {
			//context.updateHasFetched(true);
			const test = await getTest("FCEPart4", docToFetchRef);
			console.log(test);
			//change object shape to match state shape before dispatching
			test.docRef = test.id;
			delete test.id;
			test.testTags = test.tags;
			delete test.tags;
			await updateTest(test);
			//context.updateHasFetched(true);
			console.log(test);
		};
		//THESE COMMENTS NEED UPDATING
		//Only fetches new test if the one stored in state is not the one navigated to, i.e, referenced in params
		//Reduces redundant API calls and rerenders when navigating between view test and edit test
		if (docToFetchRef !== docRef) {
			asyncWrapper();

			//context.updateHasFetched(true);
		}
	}, [docToFetchRef]);

	const handleFullScreen = useFullScreenHandle();

	return (
		<Fragment>
			<FullScreen handle={handleFullScreen}>
				<main className="holy-grail-content fade-in">
					<div className={styles.part4_container}>
						<div className={styles.content_container}>
							<span className={styles.title}>FCE Part 4</span>

							<div className={styles.question_container}>
								<span>{questionOne}</span>
								<span>{questionTwo}</span>
								<span>{questionThree}</span>
								<span>{questionFour}</span>
								{questionFive && <span>{questionFive}</span>}
								{questionSix && <span>{questionSix}</span>}
							</div>
						</div>
						{docRef && <GrabSlider testTags={testTags} />}
						<div className={styles.tool_bar_container}>
							<TestToolBarView
								creatorId={creatorId ? creatorId : "1"}
								timer={<Timer time={time} />}
								toolBarButtons={
									<ToolBarButtonsView
										userId={creatorId}
										creatorId={creatorId}
										testType={"FCEPart4"}
										docRef={docRef}
										handleFullScreen={handleFullScreen}
										handleClickEditButton={setEditMode}
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
