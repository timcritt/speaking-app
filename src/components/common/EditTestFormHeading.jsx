import React from "react";

import styles from "./EditTestFormHeading.module.css";

const EditTestFormHeading = ({ docRef, testTypeLabel }) => {
	return (
		<h1 className={styles.h1}>
			{docRef ? "Edit " : "Create "} {testTypeLabel}
		</h1>
	);
};

export default EditTestFormHeading;
