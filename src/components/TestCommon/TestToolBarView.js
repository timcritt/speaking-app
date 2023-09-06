import React from "react";

//custom component
import CreatorInfo from "components/common/CreatorInfo";

import styles from "./TestToolBar.module.css";

//generic tool bar container for all tests.
const TestToolBarView = ({ creatorId, timer, toolBarButtons }) => {
	return (
		<div className={styles.container}>
			{creatorId && (
				<div className={styles.creator_info_container}>
					<CreatorInfo creatorId={creatorId} />
				</div>
			)}
			{timer}
			<div className={styles.btn_container}>{toolBarButtons}</div>
		</div>
	);
};

export default TestToolBarView;
