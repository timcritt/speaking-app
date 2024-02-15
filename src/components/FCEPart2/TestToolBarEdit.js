import React, { Fragment } from "react";

//custom components
import DeleteButton from "components/common/DeleteButton";
import deleteTest from "APIHandlers/deleteTest";
import ViewButton from "components/TestCommon/ViewButton";

//styles
import styles from "./FCEPart2TestToolBarEdit.module.css";

const TestToolBarEdit = ({
	testType,
	docRef,
	handleClickViewButton,
	closeModal,
	clearState,
	publishButtonRenderProp,
}) => {
	const handleDeleteTest = async (e) => {
		console.log("deleting part 4");
		e.preventDefault();
		await deleteTest(docRef, testType);
		clearState();
		closeModal();
	};

	return (
		<div className={styles.container}>
			{publishButtonRenderProp()}
			{docRef !== "new" && (
				<Fragment>
					<ViewButton handleClickViewButton={handleClickViewButton} />
					<DeleteButton
						itemId={docRef}
						deleteItemType={"test"}
						firestoreCollection={testType}
						iconColour={"white"}
						handleDelete={handleDeleteTest}
						buttonText={"delete"}
					/>
				</Fragment>
			)}
		</div>
	);
};

export default TestToolBarEdit;
