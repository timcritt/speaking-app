import React, {
	useState,
	useEffect,
	useContext,
	useCallback,
	Fragment,
	useRef,
} from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { firebaseAuth } from "context/AuthProvider";
import LinearProgress from "@mui/material/LinearProgress";
import Part3Lines from "components/Part3Common/Part3Lines";
// import debounce from 'auxFunctions/debounce';
import TestToolBarView from "components/TestCommon/TestToolBarView";
import ToolBarButtonsView from "components/TestCommon/ToolBarButtonsView";
import Timer from "components/common/Timer";
import GrabSlider from "components/common/GrabSlider/GrabSlider";

import Part2QuestionRow from "components/TestCommon/Part2QuestionRow";

import styles from "./Part3.module.css";

//API
import getTest from "APIHandlers/getTest";

//hooks
// import useToggleShortTurn from 'hooks/useToggleShortTurn';

const Part3ViewOverlay = ({
	context,
	docToFetchRef,
	setEditMode,
	testType,
}) => {
	const { userId } = useContext(firebaseAuth);

	const handleFullScreen = useFullScreenHandle();

	const [lineClass, setLineClass] = useState("line-hidden");
	const [windowDimensions, setWindowDimensions] = useState({
		height: null,
		width: null,
	});

	const longTime = "12000";
	const shortTime = "6000";

	const [time, setTime] = useState(longTime);

	const hideLines = () => {
		setLineClass("line-hidden");
	};
	const showLines = () => {
		setLineClass("");
	};

	const timeout = useRef();

	const handleDebounce = () => {
		//Clear the previous timeout.
		clearTimeout(timeout.current);
		timeout.current = setTimeout(() => {
			handleResize();
		}, 300);
	};

	const handleResize = useCallback(() => {
		setWindowDimensions({
			height: window.innerHeight,
			width: window.innerWidth,
		});
		showLines();
	}, []);

	const handleEndAnimation = (e) => {
		if (e.target !== e.currentTarget) {
			return;
		}
		console.log("animation ended");
		handleDebounce();
	};

	useEffect(() => {
		const animated = document.getElementsByClassName("animated");

		if (animated.length > 0) {
			animated[0].addEventListener("animationend", (e) =>
				handleEndAnimation(e)
			);
		}

		return () => {
			if (animated.length > 0) {
				animated[0].removeEventListener("animationend", function (e) {
					handleEndAnimation(e);
				});
			}
		};
	});

	useEffect(() => {
		//instantly hides the lines on window resize to prevent ugly jumping of lines between positions.
		window.addEventListener("resize", hideLines);
		//listens for window resize and redraws the lines between text areas after a set time. Sets lines to visible when done.
		window.addEventListener("resize", handleDebounce);
		window.addEventListener("fullscreenchange", handleResize);

		//cleanup function - removes listeners on unmount
		return () => {
			window.removeEventListener("resize", hideLines);
			window.removeEventListener("resize", handleDebounce);
			window.removeEventListener("fullscreenchange", handleResize);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [handleResize]);

	useEffect(() => {
		//clear state before attempting to fetch a new test to prevent previous test being displayed while new one is loading (for slower connections)

		const asyncWrapper = async () => {
			//context.updateHasFetched(true);
			const test = await getTest(testType, docToFetchRef);
			console.log(test);
			//change object shape to match state shape before dispatching
			test.docRef = test.id;
			//delete test.id;
			test.testTags = test.tags;
			delete test.tags;
			await context.updateTest(test);
			//context.updateHasFetched(true);
			console.log(test);
		};
		//THESE COMMENTS NEED UPDATING
		//Only fetches new test if the one stored in state is not the one navigated to, i.e, referenced in params
		//Reduces redundant API calls and rerenders when navigating between view test and edit test
		if (docToFetchRef !== "new") {
			if (docToFetchRef !== context.docRef) {
				context.resetState();
				asyncWrapper();
			}

			context.updateHasFetched(true);
		}
	}, [docToFetchRef]);

	if (true) {
		//context.hasFetched
		return (
			<Fragment>
				<FullScreen handle={handleFullScreen}>
					<main className="holy-grail-content fade-in animated">
						<div className={styles.container}>
							<div className={`${styles.grid_container} part3-grid-container`}>
								<div className={`${styles.top_left}`}>
									<div className={styles.option_container}>
										{context.topLeft}
									</div>
								</div>

								<div
									className={`${styles.centre} part3-question-container part3-question-centre`}
								>
									<Part2QuestionRow
										longTurnQuestions={[context.questionOne]}
										shortTurnQuestion={context.shortTurnQuestion}
										setTime={setTime}
										longTime={longTime}
										shortTime={shortTime}
									/>
								</div>
								<div className={styles.top_right}>
									<div className={styles.option_container}>
										{context.topRight}
									</div>
								</div>
								<div className={styles.bottom_left}>
									<div className={styles.option_container}>
										{context.bottomLeft}
									</div>
								</div>
								<div className={styles.bottom_centre}>
									<div className={styles.option_container}>
										{context.bottomCentre}
									</div>
								</div>
								<div className={styles.bottom_right}>
									<div className={styles.option_container}>
										{context.bottomRight}
									</div>
								</div>
								<Part3Lines
									windowDimensions={windowDimensions}
									lineClass={lineClass}
									top_left={styles.top_left}
									top_right={styles.top_right}
									bottom_left={styles.bottom_left}
									bottom_right={styles.bottom_right}
									bottom_centre={styles.bottom_centre}
									centre={styles.centre}
								/>
							</div>
							<div className={styles.test_tag_container}>
								{context.docRef && <GrabSlider testTags={context.testTags} />}
							</div>
							<div className={styles.tool_bar_container}>
								<TestToolBarView
									creatorId={context.creatorId}
									timer={<Timer time={time} />}
									toolBarButtons={
										<ToolBarButtonsView
											userId={userId}
											creatorId={context.creatorId}
											docRef={context.docRef}
											handleFullScreen={handleFullScreen}
											handleClickEditButton={() => setEditMode(true)}
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
				<LinearProgress />
			</div>
		);
	}
};

export default Part3ViewOverlay;
