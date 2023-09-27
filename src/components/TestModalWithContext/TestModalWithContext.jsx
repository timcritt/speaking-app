import React, { useContext } from "react";
import TestModal from "components/common/TestModal";
import { TestModalContext } from "context/TestModalContext";
import TestTypeSelector from "./TestTypeSelector";

const TestModalWithContext = () => {
	const context = useContext(TestModalContext);
	return (
		<TestModal
			isOpen={context.isOpen}
			handleClose={() => context.setIsOpen(false)}
		>
			<TestTypeSelector
				testType={context.testType}
				docToFetchRef={context.docToFetchRef}
			/>
		</TestModal>
	);
};

export default TestModalWithContext;
