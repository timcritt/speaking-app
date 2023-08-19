import React from "react";

const ControlledFormInput = ({
	label,
	failedValidation,
	required_input_incomplete,
	placeholder,
	onChange,
	required,
	textValue,
}) => {
	return (
		<input
			label={label}
			key={textValue}
			className={`input question-input ${
				failedValidation && required_input_incomplete
			}`}
			defaultValue={textValue}
			placeholder={placeholder}
			onChange={onChange}
			required={required}
		/>
	);
};

export default ControlledFormInput;
