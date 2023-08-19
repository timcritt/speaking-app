import React from "react";

//Custom components
import Tags from "components/common/Tags";
import ToolTip from "components/common/ToolTip";

//styles
import styles from "./FormTags.module.css";

const FormTags = ({
	tags,
	handleSetTags,
	failedValidation,
	required_input_incomplete_class,
}) => {
	return (
		<fieldset>
			<legend>
				Topic Tags
				<ToolTip
					text={
						"Add at least one tag to help you and others search for your test according to topic"
					}
				/>
			</legend>
			<div
				className={` ${styles.container} ${
					failedValidation && required_input_incomplete_class
				}`}
			>
				<Tags tags={tags ? tags : ""} handleSetTags={handleSetTags} />
			</div>
		</fieldset>
	);
};

export default FormTags;
