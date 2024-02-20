import React, { Fragment, useEffect } from "react";

//custom components
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import TestToolBarView from "components/TestCommon/TestToolBarView";
import ToolBarButtonsView from "components/TestCommon/ToolBarButtonsView";
import Timer from "components/common/Timer";
import GrabSlider from "components/common/GrabSlider/GrabSlider";

//API
import getTest from "APIHandlers/getTest";

//API Constants
import { FCEPart4, CAEPart4 } from "APIHandlers/firebaseConsts";

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
	updateHasFetched,
	testType,
}) => {
	//load test into state
	useEffect(() => {
		//clear state before attempting to fetch a new test to prevent previous test being displayed while new one is loading (for slower connections)

		const asyncWrapper = async () => {
			updateHasFetched(false);
			const test = await getTest(testType, docToFetchRef);
			console.log(test);
			//change object shape to match state shape before dispatching
			test.docRef = test.id;
			delete test.id;
			test.testTags = test.tags;
			delete test.tags;
			updateTest(test);
			updateHasFetched(true);
			console.log(test);
		};

		//If
		if (docToFetchRef !== "new") {
			if (docToFetchRef !== docRef) {
				resetState();
				asyncWrapper();
			}

			updateHasFetched(true);
		}
	}, [docToFetchRef]);
	const handleFullScreen = useFullScreenHandle();

	return (
		<Fragment>
			<FullScreen handle={handleFullScreen}>
				<main className="holy-grail-content fade-in">
					<div className={styles.part4_container}>
						<div className={styles.content_container}>
							<span className={styles.title}>
								{testType === FCEPart4
									? "FCE Part 4"
									: testType === CAEPart4
									? "CAE Part 4"
									: ""}
							</span>

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
										testType={testType}
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
