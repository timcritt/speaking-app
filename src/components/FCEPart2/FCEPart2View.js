import React, { Fragment, useState, useContext, useEffect } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

//context
import { firebaseAuth } from "context/AuthProvider";

//3rd party components
import CircularProgress from "@mui/material/CircularProgress";

//custom components
import TestToolBarView from "components/TestCommon/TestToolBarView";
import Part2QuestionRow from "components/TestCommon/Part2QuestionRow";
import ToolBarButtonsView from "components/TestCommon/ToolBarButtonsView";
import Timer from "components/common/Timer";
import GrabSlider from "components/common/GrabSlider/GrabSlider";
import ImageWithPlaceHolder from "components/TestCommon/ImageWithPlaceHolder";

//constants
import { FCEPart2 } from "APIHandlers/firebaseConsts";

//API Handlers
import getTest from "APIHandlers/getTest";
import { removeTagsFromAllEntries } from "APIHandlers/removeTagsFromAllEntries";

//CSS Modules
import styles from "./FCEPart2View.module.css";

const FCEPart2View = ({ context, docToFetchRef, setEditMode }) => {
	//max time for short and long terms. Passed down to question row so that flipping it results in time change
	const shortTime = "2000";
	const longTime = "6000";

	const { userId } = useContext(firebaseAuth);
	const handleFullScreen = useFullScreenHandle();
	const [time, setTime] = useState(6000);

	useEffect(() => {
		//clear state before attempting to fetch a new test to prevent previous test being displayed while new one is loading (for slower connections)

		const asyncWrapper = async () => {
			context.updateHasFetched(true);
			const test = await getTest(FCEPart2, docToFetchRef);
			console.log(test);
			//change object shape to match state shape before dispatching
			test.docRef = test.id;
			delete test.id;
			test.testTags = test.tags;
			delete test.tags;
			await context.updateTest(test);
			context.updateHasFetched(true);
			console.log(test);
		};
		//THESE COMMENTS NEED UPDATING
		//Only fetches new test if the one stored in state is not the one navigated to, i.e, referenced in params
		//Reduces redundant API calls and rerenders when navigating between view test and edit test
		if (docToFetchRef !== context.docRef) {
			context.resetState();
			if (docToFetchRef !== "new") {
				asyncWrapper();
			}

			context.updateHasFetched(true);
		}
	}, [docToFetchRef]);

	if (context.hasFetched) {
		return (
			<Fragment>
				<FullScreen handle={handleFullScreen}>
					<main className="holy-grail-content fade-in">
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
								<ImageWithPlaceHolder imageSrc={context.imageOneUrl} />
							</div>
							<div className={styles.right_image_container}>
								<ImageWithPlaceHolder imageSrc={context.imageTwoUrl} />
							</div>
							<div className={styles.test_tag_container}>
								{context.hasFetched && (
									<GrabSlider testTags={context.testTags} />
								)}
							</div>
							<div className={styles.tool_bar_container}>
								<TestToolBarView
									creatorId={context.creatorId ? context.creatorId : "1"}
									timer={<Timer time={time} />}
									toolBarButtons={
										<ToolBarButtonsView
											userId={userId}
											creatorId={context.creatorId}
											testType={"FCEPart2"}
											docRef={context.docRef}
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
	} else {
		return (
			<div className={"full-width"}>
				<CircularProgress />
			</div>
		);
	}
};

export default FCEPart2View;
