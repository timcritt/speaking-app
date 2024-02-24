import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import "./fonts/digital-7.ttf";
import Orbs from "components/Orbs/Orbs";
import "./styles/index.css";
import App from "./components/App";
import { NavBar } from "./components/NavBar/NavBar";

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
			</Router>
		</div>
		<ReactQueryDevtools />
	</QueryClientProvider>
);
