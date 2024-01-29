import React, { Fragment } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import styles from "./ImageDeleteBtn.module.css";

const ImageDeleteBtn = ({ setImageUrl, setImageRef }) => {
	const handleDelete = () => {
		setImageUrl(null);
		setImageRef(null);
	};

	return (
		<Fragment>
			<button
				className={`${styles.image_centre_btn} ${styles.delete_image_btn}`}
				onClick={() => handleDelete()}
			>
				<HighlightOffIcon fontSize="large" />
			</button>
		</Fragment>
	);
};

export default ImageDeleteBtn;
