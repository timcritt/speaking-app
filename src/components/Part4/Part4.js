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
}) => {
	//load test into state
	useEffect(() => {
		const asyncWrapper = async () => {
			console.log(docRef);
			const test = await getTest("FCEPart4", docRef);
			//change object shape to match state shape before dispatching
			test.docRef = test.id;
			delete test.id;
			test.testTags = test.tags;
			delete test.tags;
			updateTest(test);
			console.log(test);
		};

		if (docRef) {
			asyncWrapper();
		}
	}, [docRef]);

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
