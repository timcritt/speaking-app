import React, { useState, useEffect } from "react";
import { uniqueId } from "lodash";

//CSS module
import styles from "./Part2QuestionRow.module.css";

const shortTurnLabel = <label className={"fade-in flip180"}>short turn</label>;
const longTurnLabel = <label className={"fade-in"}>long turn</label>;

const Part2QuestionRow = ({
	longTurnQuestions,
	shortTurnQuestion,
	setTime,
	longTime,
	shortTime,
}) => {
	const [shortTurnVisible, setShortTurnVisible] = useState(false);
	const handleViewShortTurnClick = () => {
		setShortTurnVisible((prevState) => !prevState);
	};
	const [questionClass, setQuestionClass] = useState("");
	const dataNotLoadedErrorMessage = "ERROR: missing data";

	useEffect(() => {
		if (!shortTurnVisible) {
			setTime(longTime);
			setQuestionClass("");
		} else {
			setTime(shortTime);
			setQuestionClass(styles.flipped_vertically);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shortTurnVisible]);

	return (
		<div className={styles.container} onClick={handleViewShortTurnClick}>
			<div className={styles.flip_card_container}>
				<div className={`${styles.flip_card_inner} ${questionClass}`}>
					<div className={`${styles.flip_card_front} ${styles.flip_card_face}`}>
						<div className={styles.question_text_container}>
							<label>{longTurnLabel}</label>
							<ul>
								{longTurnQuestions.map((question) => {
									return (
										<li key={uniqueId()} className={styles.question_text}>
											{question}
										</li>
									);
								})}
							</ul>
						</div>
					</div>
					<div
						className={`${styles.flip_card_back_vertical} + ${styles.flip_card_face}`}
					>
						<div className={styles.question_text_container}>
							<label>{shortTurnLabel}</label>
							<ul className={styles.question_text}>
								{shortTurnQuestion
									? shortTurnQuestion
									: dataNotLoadedErrorMessage}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Part2QuestionRow;
