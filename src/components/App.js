import React, { useContext } from "react";
import "styles/App.css";
import Routes from "routers/Routes";
import TestModal from "components/common/TestModal";
import { TestModalContext } from "context/TestModalContext";
import TestTypeSelector from "./TestModalWithContext/TestTypeSelector";

import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme();

//context

function App() {
	const context = useContext(TestModalContext);
	return (
		<ThemeProvider theme={theme}>
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
		</ThemeProvider>
	);
}

export default App;
