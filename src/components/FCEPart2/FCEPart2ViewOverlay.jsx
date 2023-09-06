import React, { Fragment, useState, useContext } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
//context
import { firebaseAuth } from "context/AuthProvider";
import { FCEPart2Context } from "context/FCEPart2Context";
//3rd party components
import LinearProgress from "@material-ui/core/LinearProgress";
//custom components
import TestToolBarView from "components/TestCommon/TestToolBarView";
import ToolBarButtonsView from "components/TestCommon/ToolBarButtonsView";
import Part2QuestionRow from "components/TestCommon/Part2QuestionRow";

import Timer from "components/common/Timer";
import GrabSlider from "components/common/GrabSlider/GrabSlider";
//constants
import { FCEPart2 } from "APIHandlers/firebaseConsts";
//custom hooks
import useLoadTestIntoComponent from "hooks/useLoadTestIntoComponent";

//CSS Modules
import styles from "./FCEPart2View.module.css";

const FCEPart2ViewOverlay = ({ docRef, setEditMode }) => {
	//max time for short and long terms. Passed down to question row.
	const shortTime = "2000";
	const longTime = "6000";

	const context = useContext(FCEPart2Context);
	const { userId } = useContext(firebaseAuth);
	const handleFullScreen = useFullScreenHandle();
	const [time, setTime] = useState(6000);

	useLoadTestIntoComponent(
		context.setDocRef,
		context.clearState,
		context.fetchTest,
		context.unsavedChanges,
		context.setUnsavedChanges,
		docRef
	);

	const buttons = (
		<ToolBarButtonsView
			userId={userId}
			creatorId={context.creatorId}
			testType={FCEPart2}
			docRef={context.docRef}
			handleFullScreen={handleFullScreen}
			handleClickEditButton={() => setEditMode(true)}
		/>
	);

	if (context.hasFetched) {
		return (
			<Fragment>
				<FullScreen handle={handleFullScreen}>
					<div className={styles.container}>
						<div className={styles.question_row}>
							<Part2QuestionRow
								longTurnQuestions={[context.questionOne]}
								shortTurnQuestion={context.shortTurnQuestion}
								setTime={setTime}
								longTime={longTime}
								shortTime={shortTime}
							/>
						</div>
						<div className={styles.left_image_container}>
							<img src={context.imageOneUrl} alt="could not load" />
						</div>
						<div className={styles.right_image_container}>
							<img src={context.imageTwoUrl} alt="could not load" />
						</div>
						<div className={styles.test_tag_container}>
							{context.hasFetched && <GrabSlider testTags={context.testTags} />}
						</div>
						<div className={styles.tool_bar_container}>
							<TestToolBarView
								creatorId={context.creatorId ? context.creatorId : "1"}
								timer={<Timer time={time} />}
								toolBarButtons={
									<ToolBarButtonsView
										userId={userId}
										creatorId={context.creatorId}
										testType={FCEPart2}
										docRef={context.docRef}
										handleFullScreen={handleFullScreen}
										handleClickEditButton={setEditMode}
									/>
								}
							/>
						</div>
					</div>
				</FullScreen>
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

export default FCEPart2ViewOverlay;
