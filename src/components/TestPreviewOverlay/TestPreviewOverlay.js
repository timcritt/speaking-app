import React, { useState, useContext } from "react";

//context
import { firebaseAuth } from "../../context/AuthProvider";
import { TestModalContext } from "context/TestModalContext";

//3rd party components
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

//custom components
import ShareButton from "components/common/ShareButton";
import AddToMyFolders from "components/common/AddToMyFolders";

//custom hooks
import useToggleClassOnClick from "hooks/useToggleClassOnClick";

//styles
import styles from "./TestPreviewOverlay.module.css";

const TestPreviewOverlay = ({ testType, testId, setOpen }) => {
	//stores the url of the test. is passed down to ShareButton, which appears in the hover overlay.
	const { token } = useContext(firebaseAuth);
	const { setDocToFetch, setTestType, setIsOpen } =
		useContext(TestModalContext);

	const { ref, classApplied, setClassApplied } = useToggleClassOnClick();
	const handleClick = () => {
		//checks if device is touchscreen. Needed to deal with lack of hover effect on touchscreen devices, which would cause buttons to be accidentally clicked when overlay touched.
		const isTouchDevice = () => {
			return (
				"ontouchstart" in window ||
				navigator.maxTouchPoints > 0 ||
				navigator.msMaxTouchPoints > 0
			);
		};

		if (isTouchDevice()) {
			setClassApplied(styles.mobile);
		}
	};

	return (
		<div
			className={`${styles.container} ${classApplied}`}
			ref={ref}
			onClick={handleClick}
		>
			<div className={styles.button_container}>
				<div className={styles.icon_container}>
					<ShareButton
						sharedItemType="test"
						iconColour="white"
						location={`${window.location.host}/${testType}/${testId}`}
					/>
				</div>
				<div
					className={styles.icon_container}
					onClick={() => {
						setDocToFetch(testId);
						setTestType(testType);
						setIsOpen(true);
					}}
				>
					<VisibilityOutlinedIcon />
				</div>
				{/* </Link> */}
				{token && (
					<div className={`${styles.icon_container} tool-bar-btn`}>
						<AddToMyFolders iconColor={"white"} testId={testId} />
					</div>
				)}
			</div>
		</div>
	);
};

export default TestPreviewOverlay;
