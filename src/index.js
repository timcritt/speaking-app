import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import "./fonts/digital-7.ttf";
import Orbs from "components/Orbs/Orbs";
import "./styles/index.css";
import App from "./components/App";
import { NavBar } from "./components/NavBar/NavBar";

import { CAEPart2ContextProvider } from "context/CAEPart2Context";
import { CAEPart3ContextProvider } from "context/CAEPart3Context";
import { Part4ContextProvider } from "context/Part4Context";
import { FCEPart2ContextProvider } from "context/FCEPart2Context";
import { FCEPart3ContextProvider } from "context/FCEPart3Context";
import { TestModalContextProvider } from "context/TestModalContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<QueryClientProvider client={queryClient}>
		<div className="holy-grail">
			<Orbs />
			<Router>
				<CAEPart2ContextProvider>
					<CAEPart3ContextProvider>
						<Part4ContextProvider>
							<FCEPart3ContextProvider>
								<FCEPart2ContextProvider>
									<TestModalContextProvider>
										<AuthProvider>
											<header>
												<NavBar />
											</header>
											<div className="holy-grail-body">
												<App />
											</div>
											{/*<Footer />*/}
										</AuthProvider>
									</TestModalContextProvider>
								</FCEPart2ContextProvider>
							</FCEPart3ContextProvider>
						</Part4ContextProvider>
					</CAEPart3ContextProvider>
				</CAEPart2ContextProvider>
			</Router>
		</div>
		<ReactQueryDevtools />
	</QueryClientProvider>,
	document.getElementById("root")
);
