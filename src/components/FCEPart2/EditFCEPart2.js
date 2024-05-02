import React, { Fragment, useState } from "react";
import { Prompt } from "react-router-dom";

//custom components
import FormTags from "components/TestCommon/FormTags";
import ToolTip from "components/common/ToolTip";
import ExamPicture from "components/FCEPart2/ExamPicture";
import ImageDeleteBtn from "components/FCEPart2/ImageDeleteBtn";
import SimpleModal from "components/common/SimpleModal";
import TestToolBarEdit from "components/FCEPart2/TestToolBarEdit";
import PublishWarningModal from "components/FCEPart2/FCEPart2PublishModalWithButton ";
import EditTestContainer from "components/EditTestContainer";
import EditTestFormHeading from "components/common/EditTestFormHeading";

//custom hooks
import useLoadTestInEditMode from "hooks/useLoadTestInEditMode";

//3rd party components
import LinearProgress from "@mui/material/LinearProgress";

//styles
import styles from "./EditFCEPart2.module.css";
import { FCEPart2 } from "APIHandlers/firebaseConsts";

const EditFCEPart2 = ({
	docToFetchRef,
	setEditMode,
	handleShowModal,
	context,
}) => {
	const [inputStatus, setInputStatus] = useState({
		questionOneFailedValidation: false,
		shortTurnQuestionFailedValidation: false,
		imageOneFailedValidation: false,
		imageTwoFailedValidation: false,
		topicTagsFailedValidation: false,
	});

	useLoadTestInEditMode(
		FCEPart2,
		docToFetchRef,
		context.docRef,
		context.resetState,
		context.updateDocRef,
		context.updateTest,
		setEditMode
	);

	if (context.hasFetched || context.docRef == "new") {
		return (
			<Fragment>
				<Prompt
					when={context.unsavedChanges}
					message="You have unsaved changes. Are you sure you want to leave? All changes will be lost. "
				/>
				<EditTestContainer>
					<EditTestFormHeading
						docRef={context.docRef}
						testTypeLabel={"FCE Part 2"}
					/>
					<fieldset className={styles.image_row}>
						<legend>
							Images{" "}
							<ToolTip
								text={
									"Images for this part of the test are related by topic, with notable similarities but also differences. They must show people engaged in an activity or interaction"
								}
							/>
						</legend>
						<div
							className={`${styles.image_container} ${
								inputStatus.imageOneFailedValidation &&
								styles.required_input_incomplete
							}`}
						>
							<ExamPicture
								image={context.imageOneUrl}
								setImage={context.updateImageOneUrl}
							>
								{context.imageOneUrl ? (
									<ImageDeleteBtn
										setImageUrl={context.updateImageOneUrl}
										setImageRef={context.updateImageOneRef}
									/>
								) : (
									<SimpleModal
										modalButtonText={"upload"}
										setImageUrl={context.updateImageOneUrl}
										modalButton={
											<button
												className={styles.clickable_image_overlay}
											></button>
										}
									/>
								)}
							</ExamPicture>
						</div>
						<div
							className={`${styles.image_container} ${
								inputStatus.imageTwoFailedValidation &&
								styles.required_input_incomplete
							}`}
						>
							<ExamPicture
								image={context.imageTwoUrl}
								setImage={context.updateImageTwoUrl}
							>
								{context.imageTwoUrl ? (
									<ImageDeleteBtn
										setImageUrl={context.updateImageTwoUrl}
										setImageRef={context.updateImageTwoRef}
									/>
								) : (
									<SimpleModal
										modalButtonText={"upload"}
										setImageUrl={context.updateImageTwoUrl}
										modalButton={
											<button
												className={styles.clickable_image_overlay}
											></button>
										}
									/>
								)}
							</ExamPicture>
						</div>
					</fieldset>
					<fieldset className={styles.question_row}>
						<legend>Questions</legend>
						<label className={styles.label}>
							long turn{" "}
							<ToolTip
								text={
									"The long turn question asks one candidate to speculate for 1 minute about the photos, e.g, the intentions of the people pictured, the challenges involved, etc."
								}
							/>
						</label>
						<input
							label="long-turn"
							className={`input question-input ${
								inputStatus.questionOneFailedValidation &&
								styles.required_input_incomplete
							}`}
							value={context.questionOne}
							placeholder="enter long turn question"
							onChange={(e) => context.updateQuestionOne(e.currentTarget.value)}
							required
						/>
						<label>
							short turn
							<ToolTip
								text={
									"The short turn question asks the other candidate to answer a personal question related to the topic of the pictures"
								}
							/>
						</label>
						<input
							label="short-turn"
							className={`input question-input ${
								inputStatus.shortTurnQuestionFailedValidation &&
								styles.required_input_incomplete
							}`}
							value={context.shortTurnQuestion}
							placeholder="enter short turn question"
							onChange={(e) =>
								context.updateShortTurnQuestion(e.currentTarget.value)
							}
							required
						/>
					</fieldset>

					<FormTags
						tags={context.testTags}
						handleSetTags={context.handleSetTags}
						required_input_incomplete_class={styles.required_input_incomplete}
						failedValidation={inputStatus.topicTagsFailedValidation}
					/>

					<TestToolBarEdit
						creatorId={context.creatorId}
						docRef={context.docRef}
						clearState={context.resetState}
						setInputStatus={setInputStatus}
						handleClickViewButton={() => setEditMode(false)}
						testType={FCEPart2}
						closeModal={() => handleShowModal(false)}
						publishButtonRenderProp={() => (
							<PublishWarningModal setInputStatus={setInputStatus} />
						)}
					/>
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

export default EditFCEPart2;
