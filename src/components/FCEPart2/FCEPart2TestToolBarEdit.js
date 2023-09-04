import React, { Fragment } from "react";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import PublishWarningModal from "components/FCEPart2/PublishWarningModal";
import DeleteButton from "components/common/DeleteButton";
import deleteTest from "APIHandlers/deleteTest";
import { useHistory } from "react-router-dom";
import { FCEPart2 } from "APIHandlers/firebaseConsts";

import ViewButton from "components/TestCommon/ViewButton";

import styles from "./FCEPart2TestToolBarEdit.module.css";

const TestToolBarEdit = ({
	testType,
	docRef,
	validateInputs,
	setInputStatus,
	handleClickViewButton,
	closeModal,
	clearState,
}) => {
	const handleDeleteTest = async (e) => {
		await deleteTest(docRef, testType);
		clearState();
		closeModal();
	};

	return (
		<div className={styles.container}>
			<PublishWarningModal
				validateInputs={validateInputs}
				setInputStatus={setInputStatus}
			/>
			{docRef && (
				<Fragment>
					<ViewButton handleClickViewButton={handleClickViewButton} />
					<DeleteButton
						itemId={docRef}
						deleteItemType={"test"}
						firestoreCollection={testType}
						iconColour={"white"}
						handleDelete={handleDeleteTest}
					/>
				</Fragment>
			)}
		</div>
	);
};

export default TestToolBarEdit;
