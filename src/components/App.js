import React, { useContext } from "react";
import "styles/App.css";
import Routes from "routers/Routes";
import TestModal from "components/common/TestModal";
import { TestModalContext } from "context/TestModalContext";
import TestTypeSelector from "./TestModalWithContext/TestTypeSelector";

//context

function App() {
	const context = useContext(TestModalContext);
	return (
		<>
			<TestModal
				isOpen={context.isOpen}
				handleClose={() => context.setIsOpen(false)}
			>
				<TestTypeSelector
					testType={context.testType}
					docToFetchRef={context.docToFetchRef}
					editMode={context.editMode}
					setEditMode={context.setEditMode}
				/>
			</TestModal>

			<Routes />
		</>
	);
}

export default App;
