import React, { useContext, Fragment, useState, useRef } from "react";
import SideBarTags from "components/common/SideBarTags";
import ExamPicture from "components/FCEPart2/ExamPicture";
import ImageDeleteBtn from "components/FCEPart2/ImageDeleteBtn";
import SimpleModal from "components/common/SimpleModal";
import LinearProgress from "@material-ui/core/LinearProgress";
import { FCEPart2Context } from "context/FCEPart2Context";
import FCEPart2TestToolBarEdit from "components/FCEPart2/FCEPart2TestToolBarEdit";
import { Prompt } from "react-router-dom";
import useLoadTestIntoComponent from "hooks/useLoadTestIntoComponent";
import ToolTip from "components/common/ToolTip";

import FormTags from "components/TestCommon/FormTags";

import styles from "./EditFCEPart2.module.css";

const EditFCEPart2 = (props) => {
	const context = useContext(FCEPart2Context);

	const [inputStatus, setInputStatus] = useState({
		questionOneFailedValidation: false,
		shortTurnQuestionFailedValidation: false,
		imageOneFailedValidation: false,
		imageTwoFailedValidation: false,
		topicTagsFailedValidation: false,
	});

	useLoadTestIntoComponent(
		context.setDocRef,
		context.clearState,
		context.fetchTest,
		context.unsavedChanges,
		context.setUnsavedChanges,
		props.match.params.id
	);

	if (context.hasFetched) {
		return (
			<Fragment>
				<Prompt
					when={context.unsavedChanges}
					message="You have unsaved changes. Are you sure you want to leave? All changes will be lost. "
				/>

				<main className="holy-grail-content centre-vertically">
					<form className={styles.container}>
						<h1 className={styles.h1}>
							{context.docRef ? "Edit " : "Create "}FCE Part 2
						</h1>
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
									setImage={context.handleEditImageOneUrl}
								>
									{context.imageOneUrl ? (
										<ImageDeleteBtn
											setImageUrl={context.handleEditImageOneUrl}
											setImageRef={context.handleEditImageOneRef}
										/>
									) : (
										<SimpleModal
											modalButtonText={"upload"}
											setImageUrl={context.handleEditImageOneUrl}
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
									setImage={context.handleEditImageTwoUrl}
								>
									{context.imageTwoUrl ? (
										<ImageDeleteBtn
											setImageUrl={context.handleEditImageTwoUrl}
											setImageRef={context.handleEditImageTwoRef}
										/>
									) : (
										<SimpleModal
											modalButtonText={"upload"}
											setImageUrl={context.handleEditImageTwoUrl}
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
						</fieldset>
						<fieldset className={styles.question_row}>
							<legend>Questions</legend>
							<label>
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
								onChange={context.handleEditQuestionOne}
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
								onChange={context.handleEditShortTurnQuestion}
								required
							/>
						</fieldset>

						<FormTags
							tags={context.testTags}
							handleSetTags={context.handleSetTags}
							required_input_incomplete_class={styles.required_input_incomplete}
							failedValidation={inputStatus.topicTagsFailedValidation}
						/>

						<FCEPart2TestToolBarEdit
							context={context}
							setInputStatus={setInputStatus}
						/>
					</form>
				</main>
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
