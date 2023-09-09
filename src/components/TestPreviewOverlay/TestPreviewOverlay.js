import React, { useState, useContext } from "react";

//context
import { firebaseAuth } from "../../context/AuthProvider";

//3rd party components
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";

//custom components
import ShareButton from "components/common/ShareButton";
import AddToMyFolders from "components/common/AddToMyFolders";
import TestModal from "components/common/TestModal";
import FCEPart2View from "components/FCEPart2/FCEPart2View";
import FCEPart3View from "components/FCEPart3/FCEPart3View";
import FCEPart4View from "components/Part4/FCEPart4View";
import EditFCEPart2 from "components/FCEPart2/EditFCEPart2";
import EditFCEPart3 from "components/FCEPart3/EditFCEPart3";
import EditFCEPart4 from "components/Part4/EditFCEPart4";

//custom hooks
import useToggleClassOnClick from "hooks/useToggleClassOnClick";

//styles
import styles from "./TestPreviewOverlay.module.css";

const TestPreviewOverlay = ({ testType, testId }) => {
	//stores the url of the test. is passed down to ShareButton, which appears in the hover overlay.
	const { token } = useContext(firebaseAuth);
	const { ref, classApplied, setClassApplied } = useToggleClassOnClick();

	const [isOpen, setIsOpen] = useState(false);
	const [editMode, setEditMode] = useState(false);

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

	const renderTest = (test) => {
		switch (test) {
			case "FCEPart2":
				return (
					<>
						{editMode ? (
							<EditFCEPart2
								docRef={testId}
								setEditMode={setEditMode}
								handleShowModal={setIsOpen}
							/>
						) : (
							<FCEPart2View docRef={testId} setEditMode={setEditMode} />
						)}
					</>
				);
			case "FCEPart3":
				return (
					<>
						{editMode ? (
							<EditFCEPart3 docRef={testId} setEditMode={setEditMode} />
						) : (
							<FCEPart3View testId={testId} setEditMode={setEditMode} />
						)}
					</>
				);

			case "FCEPart4":
				return (
					<>
						{editMode ? (
							<EditFCEPart4 docRef={testId} setEditMode={setEditMode} />
						) : (
							<FCEPart4View docRef={testId} setEditMode={setEditMode} />
						)}
					</>
				);

			default:
				return "default";
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
				<div className={styles.icon_container} onClick={() => setIsOpen(true)}>
					<VisibilityOutlinedIcon />
				</div>
				{/* </Link> */}
				{token && (
					<div className={`${styles.icon_container} tool-bar-btn`}>
						<AddToMyFolders iconColor={"white"} testId={testId} />
					</div>
				)}
			</div>
			<TestModal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
				{renderTest(testType)}
			</TestModal>
		</div>
	);
};

export default TestPreviewOverlay;
