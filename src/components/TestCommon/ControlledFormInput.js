import React from "react";

//styles
import styles from "./ControlledFormInput.module.css";

const ControlledFormInput = ({
	label,
	failedValidation,
	placeholder,
	onChange,
	required,
	textValue,
}) => {
	return (
		<input
			label={label}
			className={`input question-input ${
				failedValidation && styles.failed_validation
			}`}
			value={textValue}
			placeholder={placeholder}
			onChange={onChange}
			required={required}
		/>
	);
};

export default ControlledFormInput;
