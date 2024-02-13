import React, { useState, useEffect, useCallback } from "react";
import { Fragment } from "react";

//custom components
import ControlledFormInput from "components/TestCommon/ControlledFormInput";
import TestToolBarEdit from "components/FCEPart2/TestToolBarEdit";
import PublishPart3WarningModal from "components/Part3Common/PublishPart3WarningModal";
import EditTestContainer from "components/EditTestContainer";
import EditTestFormHeading from "components/common/EditTestFormHeading";
import ToolTip from "components/common/ToolTip";

//3rd party components
import LinearProgress from "@mui/material/LinearProgress";
import FormTags from "components/TestCommon/FormTags";

//Custom hooks
import useLoadTestInEditMode from "hooks/useLoadTestInEditMode";

//CSS modules
import styles from "./Part3.module.css";

const EditPart3 = ({
	docToFetchRef,
	docRef,
	updateDocRef,
	questionOne,
	shortTurnQuestion,
	topLeft,
	topRight,
	bottomLeft,
	bottomCentre,
	bottomRight,
	testTags,
	creatorId,
	changesSaved,
	setEditMode,
	updateQuestionOne,
	updateShortTurnQuestion,
	updateTopLeft,
	updateTopRight,
	updateBottomLeft,
	updateBottomCentre,
	updateBottomRight,
	updateTest,
	resetState,
	handleSetTags,
	updateCreatorId,
}) => {
	const [inputStatus, setInputStatus] = useState({
		bottomCentreFailedValidation: false,
		bottomLeftFailedValidation: false,
		bottomRightFailedValidation: false,
		topLeftFailedValidation: false,
		topRightFailedValidation: false,
		topicTagsFailedValidation: false,
		questionOneFailedValidation: false,
		shortTurnQuestionFailedValidation: false,
	});

	useLoadTestInEditMode(
		"FCEPart3",
		docToFetchRef,
		docRef,
		resetState,
		updateDocRef,
		updateTest,
		setEditMode
	);

	if (true) {
		return (
			<Fragment>
				<EditTestContainer>
					<EditTestFormHeading docRef={docRef} testTypeLabel={"FCE Part 3"} />
					<fieldset className={styles.edit_option_container}>
						<legend>
							Options to discuss
							<ToolTip
								text={
									"Candidates are asked to discuss the merits/drawbacks of 5 options in relation to the long and short turn questions."
								}
							/>
						</legend>

						<ControlledFormInput
							failedValidation={inputStatus.topLeftFailedValidation}
							textValue={topLeft}
							onChange={(e) => {
								updateTopLeft(e.target.value);
								if (e.target.value.length > 0) {
									setInputStatus((prevState) => {
										return {
											...prevState,
											topLeftFailedValidation: false,
										};
									});
								}
							}}
						/>
						<ControlledFormInput
							failedValidation={inputStatus.topRightFailedValidation}
							textValue={topRight}
							onChange={(e) => {
								updateTopRight(e.target.value);
								if (e.target.value.length > 0) {
									setInputStatus((prevState) => {
										return {
											...prevState,
											topRightFailedValidation: false,
										};
									});
								}
							}}
						/>
						<ControlledFormInput
							failedValidation={inputStatus.bottomLeftFailedValidation}
							textValue={bottomLeft}
							onChange={(e) => {
								updateBottomLeft(e.target.value);
								if (e.target.value.length > 0) {
									setInputStatus((prevState) => {
										return {
											...prevState,
											bottomLeftFailedValidation: false,
										};
									});
								}
							}}
						/>
						<ControlledFormInput
							failedValidation={inputStatus.bottomCentreFailedValidation}
							textValue={bottomCentre}
							onChange={(e) => {
								updateBottomCentre(e.target.value);
								if (e.target.value.length > 0) {
									setInputStatus((prevState) => {
										return {
											...prevState,
											bottomCentreFailedValidation: false,
										};
									});
								}
							}}
						/>
						<ControlledFormInput
							failedValidation={inputStatus.bottomRightFailedValidation}
							textValue={bottomRight}
							onChange={(e) => {
								updateBottomRight(e.target.value);
								if (e.target.value.length > 0) {
									setInputStatus((prevState) => {
										return {
											...prevState,
											bottomRightFailedValidation: false,
										};
									});
								}
							}}
						/>
					</fieldset>

					<fieldset className={styles.question_field_set}>
						<legend>Questions</legend>
						<label>
							Long turn{" "}
							<ToolTip
								text={
									"The long turn question asks both candidates to discuss together the merits/drawbacks of 5 options."
								}
							/>
						</label>
						<ControlledFormInput
							failedValidation={inputStatus.questionOneFailedValidation}
							textValue={questionOne}
							onChange={(e) => {
								updateQuestionOne(e.target.value);
								if (e.target.value.length > 0) {
									setInputStatus((prevState) => {
										return {
											...prevState,
											questionOneFailedValidation: false,
										};
									});
								}
							}}
						/>

						<label>
							Short turn
							<ToolTip
								text={
									"The short turn question is always phrased as a superlative and asks candidates to choose 1 or 2 of the options as the best/worst, most/least beneficial,"
								}
							/>
						</label>
						<ControlledFormInput
							failedValidation={inputStatus.shortTurnQuestionFailedValidation}
							textValue={shortTurnQuestion}
							onChange={(e) => {
								updateShortTurnQuestion(e.target.value);
								if (e.target.value.length > 0) {
									setInputStatus((prevState) => {
										return {
											...prevState,
											shortTurnQuestionFailedValidation: false,
										};
									});
								}
							}}
						/>
					</fieldset>
					{testTags && (
						<FormTags
							tags={testTags}
							handleSetTags={handleSetTags}
							failedValidation={inputStatus.topicTagsFailedValidation}
						/>
					)}
					<div className={styles.button_container}>
						<TestToolBarEdit
							testType={"FCEPart3"}
							docRef={docRef}
							handleClickViewButton={() => setEditMode(false)}
							closeModal={() => console.log("close modal")}
							clearState={() => resetState()}
							publishButtonRenderProp={() => (
								<PublishPart3WarningModal
									bottomCentre={bottomCentre}
									bottomLeft={bottomLeft}
									bottomRight={bottomRight}
									creatorId={creatorId}
									questionOne={questionOne}
									shortTurnQuestion={shortTurnQuestion}
									topLeft={topLeft}
									topRight={topRight}
									testTags={testTags}
									changesSaved={changesSaved}
									docRef={docRef}
									updateDocRef={updateDocRef}
									testType={"FCEPart3"}
									setInputStatus={setInputStatus}
									updateCreatorId={updateCreatorId}
								/>
							)}
						/>
					</div>
				</EditTestContainer>
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
