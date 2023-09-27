import React from "react";

import styles from "./EditTestContainer.module.css";

const EditTestContainer = ({ children }) => {
	return <form className={styles.container}>{children}</form>;
};

export default EditTestContainer;
