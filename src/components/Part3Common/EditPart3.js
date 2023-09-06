import React, { useState, useEffect, useCallback } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Fragment } from "react";
import deleteTest from "APIHandlers/deleteTest";
import { TextareaAutosize } from "@material-ui/core";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import PublishPart3WarningModal from "components/Part3Common/PublishPart3WarningModal";
import Part3Lines from "components/Part3Common/Part3Lines";
import LinearProgress from "@material-ui/core/LinearProgress";
import debounce from "auxFunctions/debounce";
import { useHistory } from "react-router-dom";
import FormTags from "components/TestCommon/FormTags";

import getTest from "APIHandlers/getTest";

import styles from "./Part3.module.css";
import TestToolBarEdit from "components/FCEPart2/TestToolBarEdit";
import { FCEPart3 } from "APIHandlers/firebaseConsts";

const EditPart3 = ({
	context,
	testType,
	docRef,
	setEditMode,
	handleOpenModal,
}) => {
	const handleFullScreen = useFullScreenHandle();
	const optionPlaceholder = "option";

	const [inputStatus, setInputStatus] = useState({
		questionOneFailedValidation: false,
		questionTwoFailedValidation: false,
		questionThreeFailedValidation: false,
		questionFourFailedValidation: false,
		questionFiveFailedValidation: false,
		topicTagsFailedValidation: false,
	});

	const [lineClass, setLineClass] = useState("");
	const [windowDimensions, setWindowDimensions] = useState({
		height: null,
		width: null,
	});
	var history = useHistory();

	const hideLines = () => {
		setLineClass("line-hidden");
	};
	const showLines = () => {
		setLineClass("");
	};

	const handleResize = useCallback(() => {
		setWindowDimensions({
			height: window.innerHeight,
			width: window.innerWidth,
		});
		showLines();
	}, []);

	const debouncedHandleResize = debounce(handleResize, 200);

	const handleDeleteTest = async () => {
		await deleteTest(context.docRef, testType);
		context.clearState();
		history.push(`/Edit${testType}/new`);
	};

	useEffect(() => {
		const asyncWrapper = async () => {
			let test = await getTest("FCEPart3", docRef);

			console.log(test);
			test.docRef = test.id;
			delete test.id;
			test.testTags = test.tags;
			delete test.tags;
			context.updateTest(test);
		};

		//checks if creating a new test rather than editing existing one
		if (docRef === "new") {
			context.resetState();
			//Only fetches new test if the one stored in state is not the one navigated to, i.e, referenced in params
		} else {
			asyncWrapper();
		}

		return () => {
			//makes sure the modal displays the test in view mode, not edit mode on next open
			setEditMode(false);
		};
	}, [docRef]);

	useEffect(() => {
		//instantly hides the lines on window resize to prevent jumping lines.
		window.addEventListener("resize", hideLines);
		//listens for window resize and redraws the lines between text areas after a set time. Sets lines to visible when done.
		window.addEventListener("resize", debouncedHandleResize);
		window.addEventListener("fullscreenchange", handleResize);

		//cleanup function - removes listeners on unmount
		return () => {
			window.removeEventListener("resize", hideLines);
			window.removeEventListener("resize", debouncedHandleResize);
			window.removeEventListener("fullscreenchange", handleResize);
		};
	}, [debouncedHandleResize, handleResize]);

	function handleSetDocRef(docRef) {
		context.setDocRef(docRef);
	}

	const handleQuestionChange = (e) => {
		context.updateQuestionOne(e.currentTarget.value);
		setTimeout(function () {
			handleResize();
		}, 100);
	};

	const handleTopLeftChange = (e) => {
		context.updateTopLeft(e.currentTarget.value);
		setTimeout(function () {
			handleResize();
		}, 100);
	};
	const handleTopRightChange = (e) => {
		context.updateTopRight(e.currentTarget.value);
		setTimeout(function () {
			handleResize();
		}, 100);
	};
	const handleBottomLeftChange = (e) => {
		context.updateBottomLeft(e.currentTarget.value);
		setTimeout(function () {
			handleResize();
		}, 100);
	};
	const handleBottomCentreChange = (e) => {
		context.updateBottomCentre(e.currentTarget.value);
		setTimeout(function () {
			handleResize();
		}, 100);
	};
	const handleBottomRightChange = (e) => {
		context.updateBottomRight(e.currentTarget.value);
		setTimeout(function () {
			handleResize();
		}, 100);
	};

	const buttons = (
		<Fragment>
			<PublishPart3WarningModal
				bottomCentre={context.bottomCentre}
				bottomLeft={context.bottomLeft}
				bottomRight={context.bottomRight}
				creatorId={context.creatorId}
				questionOne={context.questionOne}
				shortTurnQuestion={context.shortTurnQuestion}
				topLeft={context.topLeft}
				topRight={context.topRight}
				tags={context.testTags}
				changesSaved={context.changesSaved}
				setChangesSaved={context.setChangesSaved}
				docRef={context.docRef}
				setDocRef={handleSetDocRef}
				testType={testType}
			/>

			<button className="tool-bar-btn" onClick={() => setEditMode(false)}>
				<VisibilityOutlinedIcon />
			</button>

			<button className="tool-bar-btn" onClick={handleDeleteTest}>
				<DeleteForeverOutlinedIcon />
			</button>
		</Fragment>
	);

	if (true) {
		return (
			<Fragment>
				<FullScreen handle={handleFullScreen}>
					<main className="holy-grail-content fade-in">
						<div className={styles.container}>
							<div className={`${styles.grid_container} part3-grid-container`}>
								<div
									className={`${styles.centre} part3-question-container part3-question-centre`}
								>
									<TextareaAutosize
										className={styles.option_container}
										placeholder="enter question"
										value={context.questionOne}
										onChange={handleQuestionChange}
										rowsMin="1"
									/>
								</div>
								<div className={styles.top_right}>
									<TextareaAutosize
										className={styles.option_container}
										placeholder={optionPlaceholder}
										value={context.topRight}
										onChange={handleTopRightChange}
										rowsMin="1"
									/>
								</div>
								<div className={styles.top_left}>
									<TextareaAutosize
										className={styles.option_container}
										placeholder={optionPlaceholder}
										value={context.topLeft}
										onChange={handleTopLeftChange}
										rowsMin="1"
									/>
								</div>

								<div className={styles.bottom_left}>
									<TextareaAutosize
										className={styles.option_container}
										placeholder={optionPlaceholder}
										value={context.bottomLeft}
										onChange={handleBottomLeftChange}
										rowsMin="1"
									/>
								</div>
								<div className={styles.bottom_centre}>
									<TextareaAutosize
										className={styles.option_container}
										placeholder={optionPlaceholder}
										value={context.bottomCentre}
										onChange={handleBottomCentreChange}
										rowsMin="1"
									/>
								</div>
								<div className={styles.bottom_right}>
									<TextareaAutosize
										className={styles.option_container}
										placeholder={optionPlaceholder}
										value={context.bottomRight}
										onChange={handleBottomRightChange}
										rowsMin="1"
									/>
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
							<div className="part2-edit-question-container part3-questionTwo-container">
								<label
									className="part2-question-input-label"
									htmlFor="question-2"
								>
									Question 2
								</label>
								<input
									label="question-2"
									className="input question-input"
									defaultValue={context.shortTurnQuestion}
									placeholder="enter second question"
									onChange={(e) =>
										context.updateShortTurnQuestion(e.currentTarget.value)
									}
								/>
							</div>
							{context.testTags && (
								<FormTags
									tags={context.testTags}
									handleSetTags={context.handleSetTags}
									failedValidation={inputStatus.topicTagsFailedValidation}
								/>
							)}
							<div className={styles.button_container}>
								<TestToolBarEdit
									testType={"FCEPart3"}
									docRef={docRef}
									handleClickViewButton={setEditMode}
									closeModal={() => console.log("close modal")}
									clearState={() => context.resetState()}
									publishButtonRenderProp={() => (
										<PublishPart3WarningModal
											changesSaved={context.changesSaved}
											{...context}
											testType={"FCEPart3"}
											setInputStatus={setInputStatus}
										/>
									)}
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

export default EditPart3;
