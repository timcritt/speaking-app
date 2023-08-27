import React from "react";

//styles
import styles from "./SaveButton.module.css";

//3rd party components
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";

const SaveButton = ({ handleOpen, changesSaved }) => {
	return (
		<button
			className={styles.save_button}
			onClick={handleOpen}
			disabled={changesSaved}
		>
			save <SaveOutlinedIcon />
		</button>
	);
};

export default SaveButton;
