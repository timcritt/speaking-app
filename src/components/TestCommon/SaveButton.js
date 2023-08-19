import React from "react";

//styles
import styles from "./SaveButton";

//3rd party components
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";

const SaveButton = ({ handleOpen }) => {
	return (
		<button className={styles.save_button} onClick={handleOpen}>
			save <SaveOutlinedIcon />
		</button>
	);
};

export default SaveButton;
