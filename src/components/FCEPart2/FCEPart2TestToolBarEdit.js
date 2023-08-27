import React, { Fragment } from "react";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import PublishWarningModal from "components/FCEPart2/PublishWarningModal";
import { Link } from "react-router-dom";
import DeleteButton from "components/common/DeleteButton";
import deleteTest from "APIHandlers/deleteTest";
import { useHistory } from "react-router-dom";
import { FCEPart2 } from "APIHandlers/firebaseConsts";

import styles from "./FCEPart2TestToolBarEdit.module.css";

const TestToolBarEdit = ({ context, validateInputs, setInputStatus }) => {
	var history = useHistory();

	const handleDeleteTest = async (e) => {
		await deleteTest(context.docRef, FCEPart2);
		context.clearState();
		history.push("/EditFCEPart2/new");
	};

	return (
		<div className={styles.container}>
			<PublishWarningModal
				validateInputs={validateInputs}
				setInputStatus={setInputStatus}
			/>
			{context.docRef && (
				<Fragment>
					<Link
						to={{
							pathname: `/FCEPart2/${context.docRef}`,
						}}
					>
						<button className={styles.view_button}>
							view
							<VisibilityOutlinedIcon />
						</button>
					</Link>
					<DeleteButton
						itemId={context.docRef}
						deleteItemType={"test"}
						firestoreCollection={FCEPart2}
						iconColour={"white"}
						handleDelete={handleDeleteTest}
					/>
				</Fragment>
			)}
		</div>
	);
};

export default TestToolBarEdit;
