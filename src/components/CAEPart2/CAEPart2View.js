import React, { Fragment, useState, useContext, useEffect } from "react";

//Context
import { CAEPart2Context } from "context/CAEPart2Context";
import { firebaseAuth } from "context/AuthProvider";

//3rd party modules
import { FullScreen, useFullScreenHandle } from "react-full-screen";
//custom components
import LinearProgress from "@mui/material/LinearProgress";
import Part2QuestionRow from "components/TestCommon/Part2QuestionRow";
import TestToolBar from "components/TestCommon/TestToolBarView";
import useLoadTestIntoComponent from "hooks/useLoadTestIntoComponent";
import Timer from "components/common/Timer";
import ToolBarButtonsView from "components/TestCommon/ToolBarButtonsView";

//CSS Modules
import styles from "./CAEPart2View.module.css";

//constants
import { CAEPart2 } from "APIHandlers/firebaseConsts";

const CAEPart2View = ({ docToFetchRef, setEditMode }) => {
	//max time for short and long terms. Passed down to question row so that flipping it results in time change
	const shortTime = "2000";
	const longTime = "6000";

	const { userId } = useContext(firebaseAuth);
	const handleFullScreen = useFullScreenHandle();
	const [time, setTime] = useState(6000);

	const context = useContext(CAEPart2Context);

	useLoadTestIntoComponent(
		CAEPart2,
		docToFetchRef,
		context.resetState,
		context.updateTest,
		context.updateHasFetched,
		context.docRef
	);

	if (context.hasFetched) {
		return (
			<Fragment>
				<FullScreen handle={handleFullScreen}>
					<main className="holy-grail-content fade-in">
						<div className={styles.container}>
							<div className={styles.question_row}>
								<Part2QuestionRow
									longTurnQuestions={[context.questionOne, context.questionTwo]}
									shortTurnQuestion={context.shortTurnQuestion}
									setTime={setTime}
									longTime={longTime}
									shortTime={shortTime}
								/>
							</div>
							<div className={styles.left_image_container}>
								<img src={context.imageOneUrl} alt="could not load" />
							</div>
							<div className={styles.centre_image_container}>
								<img src={context.imageTwoUrl} alt="could not load" />
							</div>
							<div className={styles.right_image_container}>
								<img src={context.imageThreeUrl} alt="could not load" />
							</div>
							<TestToolBar
								creatorId={context.creatorId}
								timer={<Timer time={time} />}
								toolBarButtons={
									<ToolBarButtonsView
										userId={userId}
										creatorId={context.creatorId}
										testType={"CAEPart2"}
										docRef={context.docRef}
										handleFullScreen={handleFullScreen}
										handleClickEditButton={setEditMode}
									/>
								}
							/>
						</div>
					</main>
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

export default CAEPart2View;
