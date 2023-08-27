import React from "react";
import { Link } from "react-router-dom";

//icons
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";

//css modules
import styles from "./ViewButton.module.css";

const ViewButton = ({ testType, docRef }) => {
	return (
		<Link
			to={{
				pathname: `/${testType}/${docRef}`,
			}}
		>
			<button className={styles.view_button}>
				view
				<VisibilityOutlinedIcon />
			</button>
		</Link>
	);
};

export default ViewButton;
