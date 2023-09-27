import React from "react";
import TestPreviewOverlay from "components/TestPreviewOverlay/TestPreviewOverlay";
import styles from "./TestPreview.module.css";
import { v4 as uuidv4 } from "uuid";
import { TestModalContextProvider } from "context/TestModalContext";

//Thumnail template for preview of each test type

const TestPreview = ({
	questionOne,
	children,
	testId,
	testType,
	testLabel,
	testTags,
}) => {
	return (
		<div className={styles.outer_container} key={testId}>
			<div className={`${styles.inner_container} fade-in`}>
				<div
					className={styles.grow_hover_container}
					onClick={(e) => e.stopPropagation()}
				>
					<div className={`${styles.img_wrap} ${styles.grow_on_hover} `}>
						{/*content of each type of test preview is rendered here via composition */}
						{React.cloneElement(children, {
							testId: testId,
							testType: testType,
						})}
					</div>

					<TestPreviewOverlay testId={testId} testType={testType} />
				</div>
			</div>
			<div className={styles.label_container}>{testLabel}</div>
			<div className={`${styles.question_container} dont-break-out`}>
				{testType !== "FCEPart4" && (
					<span className={styles.question_text}>{questionOne}</span>
				)}
			</div>
			<div className={styles.tags_container}>
				{testTags.map((tag) => {
					return <span key={uuidv4()}>{`#${tag} `}</span>;
				})}
			</div>
		</div>
	);
};

export default TestPreview;
