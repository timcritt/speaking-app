import React from "react";

//icons
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";

//css modules
import styles from "./ViewButton.module.css";

const ViewButton = ({ handleClickViewButton }) => {
	const handleClickButton = (e) => {
		e.preventDefault();
		handleClickViewButton();
	};

	return (
		<button
			className={styles.view_button}
			onClick={(e) => {
				handleClickButton(e);
			}}
		>
			view
			<VisibilityOutlinedIcon />
		</button>
	);
};

export default ViewButton;
