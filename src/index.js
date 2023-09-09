import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import "./fonts/digital-7.ttf";
import Orbs from "components/Orbs/Orbs";
import "./styles/index.css";
import App from "./components/App";
import { NavBar } from "./components/NavBar/NavBar";

import { FCEPart2ContextProvider } from "context/FCEPart2Context";
import { FCEPart3ContextProvider } from "context/FCEPart3Context";
import { CAEPart2ContextProvider } from "context/CAEPart2Context";
import { CAEPart3ContextProvider } from "context/CAEPart3Context";
import { Part4ContextProvider } from "context/Part4Context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<div className="holy-grail">
		<Orbs />
		<Router>
			<FCEPart2ContextProvider>
				<FCEPart3ContextProvider>
					<CAEPart2ContextProvider>
						<CAEPart3ContextProvider>
							<Part4ContextProvider>
								<AuthProvider>
									<header>
										<NavBar />
									</header>
									<div className="holy-grail-body">
										<App />
									</div>
									{/*<Footer />*/}
								</AuthProvider>
							</Part4ContextProvider>
						</CAEPart3ContextProvider>
					</CAEPart2ContextProvider>
				</FCEPart3ContextProvider>
			</FCEPart2ContextProvider>
		</Router>
	</div>,
	document.getElementById("root")
);
