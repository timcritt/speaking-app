import React from "react";

//Custom components
import Tags from "components/common/Tags";
import ToolTip from "components/common/ToolTip";

const FormTags = ({ tags, handleSetTags }) => {
	return (
		<>
			<legend>
				Topic Tags{" "}
				<ToolTip
					text={
						"Add at least one tag to help you and others search for your test according to topic"
					}
				/>
			</legend>
			<Tags tags={tags ? tags : ""} handleSetTags={handleSetTags} />
		</>
	);
};

export default FormTags;
