import React, { useContext, Fragment, useState } from "react";
import PublishCAEPart2WarningModal from "components/CAEPart2/PublishCAEPart2WarningModal";
import { Link } from "react-router-dom";
import deleteTest from "APIHandlers/deleteTest";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ExamPicture from "components/FCEPart2/ExamPicture";
import ImageDeleteBtn from "components/FCEPart2/ImageDeleteBtn";
import SimpleModal from "components/common/SimpleModal";
import LinearProgress from "@mui/material/LinearProgress";
import { useHistory } from "react-router-dom";
import { CAEPart2Context } from "context/CAEPart2Context";

import TestToolBarEdit from "components/FCEPart2/TestToolBarEdit";

import EditTestContainer from "components/EditTestContainer";
import EditTestFormHeading from "components/common/EditTestFormHeading";
import ToolTip from "components/common/ToolTip";
import FormTags from "components/TestCommon/FormTags";

import { Prompt } from "react-router-dom";

import { CAEPart2 } from "APIHandlers/firebaseConsts";

//styles
//TODO Change this!
import styles from "components/FCEPart2/EditFCEPart2.module.css";

//custom hooks
import useLoadTestInEditMode from "hooks/useLoadTestInEditMode";

const EditCAEPart2 = ({ docToFetchRef, setEditMode, handleShowModal }) => {
	const context = useContext(CAEPart2Context);
	var history = useHistory();

	const [inputStatus, setInputStatus] = useState({
		questionOneFailedValidation: false,
		questionTwoFailedValidation: false,
		shortTurnQuestionFailedValidation: false,
		imageOneFailedValidation: false,
		imageTwoFailedValidation: false,
		imageThreeFailedValidation: false,
		topicTagsFailedValidation: false,
	});

	const handleDeleteTest = async () => {
		await deleteTest(context.docRef, "CAEPart2");
		context.clearState();
		history.push("/EditCAEPart2/new");
	};

	useLoadTestInEditMode(
		CAEPart2,
		docToFetchRef,
		context.docRef,
		context.resetState,
		context.updateDocRef,
		context.updateTest,
		setEditMode
	);

	if (context.hasFetched || context.docRef === "new") {
		return (
			<Fragment>
				<Prompt
					when={context.unsavedChanges}
					message="You have unsaved changes. Are you sure you want to leave? All changes will be lost. "
				/>
				<EditTestContainer>
					<EditTestFormHeading
						docRef={context.docRef}
						testTypeLabel={"CAE Part 2"}
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
						<div className={`${styles.image_container}`}>
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
												className={`${styles.clickable_image_overlay} ${
													styles.image_container
												} ${
													inputStatus.imageTwoFailedValidation &&
													styles.required_input_incomplete
												} `}
											></button>
										}
									/>
								)}
							</ExamPicture>
						</div>

						<div className={`${styles.image_container}`}>
							<ExamPicture
								image={context.imageThreeUrl}
								setImage={context.updateImageThreeUrl}
							>
								{context.imageThreeUrl ? (
									<ImageDeleteBtn
										setImageUrl={context.updateImageThreeUrl}
										setImageRef={context.updateImageThreeRef}
									/>
								) : (
									<SimpleModal
										modalButtonText={"upload"}
										setImageUrl={context.updateImageThreeUrl}
										modalButton={
											<button
												className={`${styles.clickable_image_overlay} ${
													styles.image_container
												} ${
													inputStatus.imageThreeFailedValidation &&
													styles.required_input_incomplete
												} `}
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
							long turn question 1
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
							Long turn question 2
							<ToolTip
								text={
									"The short turn question asks the other candidate to answer a personal question related to the topic of the pictures"
								}
							/>
						</label>
						<input
							label="long-turn"
							className={`input question-input ${
								inputStatus.questionTwoFailedValidation &&
								styles.required_input_incomplete
							}`}
							value={context.questionTwo}
							placeholder="enter long turn question"
							onChange={(e) => context.updateQuestionOne(e.currentTarget.value)}
							required
						/>
						<label>
							short turn question
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
						testType={CAEPart2}
						closeModal={() => handleShowModal(false)}
						publishButtonRenderProp={() => (
							<PublishCAEPart2WarningModal setInputStatus={setInputStatus} />
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

export default EditCAEPart2;
