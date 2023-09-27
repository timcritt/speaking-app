import React, { useReducer, createContext } from "react";

export const TestModalContext = createContext();

export const TestModalContextProvider = ({ children }) => {
	const initialState = {
		isOpen: false,
		docToFetchRef: "new",
		testType: null,
		editMode: false,
	};

	const reducer = (state, action) => {
		switch (action.type) {
			case "setIsOpen":
				console.log("inside reducer");
				return { ...state, isOpen: action.payload };

			case "setDocToFetch":
				return { ...state, docToFetchRef: action.payload };

			case "setTestType":
				return { ...state, testType: action.payload };

			case "setEditMode":
				return { ...state, editMode: action.payload };

			default: {
				return state;
			}
		}
	};

	const [testModalState, dispatch] = useReducer(reducer, { ...initialState });

	const dispatchHandlers = {
		setIsOpen: (payload) => {
			console.log("setting open as", payload);
			dispatch({ type: "setIsOpen", payload: payload });
		},
		setDocToFetch: (payload) => {
			dispatch({ type: "setDocToFetch", payload: payload });
		},
		setTestType: (payload) => {
			dispatch({ type: "setTestType", payload: payload });
		},
		setEditMode: (payload) => {
			dispatch({ type: "setEditMode", payload: payload });
		},
	};

	return (
		<TestModalContext.Provider
			value={{ ...testModalState, ...dispatchHandlers }}
		>
			{children}
		</TestModalContext.Provider>
	);
};
