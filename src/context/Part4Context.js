import React, { createContext, useReducer } from "react";

export const Part4Context = createContext();

export const Part4ContextProvider = ({ children }) => {
	const initialState = {
		questionOne: "",
		questionTwo: "",
		questionThree: "",
		questionFour: "",
		questionFive: "",
		questionSix: "",
		testTags: [],
		docRef: "new",
	};
	const reducer = (state, action) => {
		switch (action.type) {
			case "updateQuestionOne":
				return {
					...state,
					questionOne: action.payload,
				};
			case "updateQuestionTwo":
				return {
					...state,
					questionTwo: action.payload,
				};
			case "updateQuestionThree":
				return {
					...state,
					questionThree: action.payload,
				};
			case "updateQuestionFour":
				return {
					...state,
					questionFour: action.payload,
				};
			case "updateQuestionFive":
				return {
					...state,
					questionFive: action.payload,
				};
			case "updateQuestionSix":
				return {
					...state,
					questionSix: action.payload,
				};
			case "testTags":
				return {
					...state,
					testTags: action.payload,
				};
			case "docRef":
				return {
					...state,
					docRef: action.payload,
				};
			case "updateDocRef":
				return {
					...state,
					docRef: action.payload,
				};
			case "loadNewTest":
				return {
					...state,
					...action.payload,
				};
			case "resetState":
				console.log("inside reset state reducer");
				return { ...initialState };
			case "addTestTag": {
				return { ...state, testTags: [...state.testTags, action.payload] };
			}
			case "removeTestTag": {
				return {
					...state,
					testTags: [
						...state.testTags.filter((testTag) => testTag !== action.payload),
					],
				};
			}
			default: {
				return state;
			}
		}
	};

	const [part4State, dispatch] = useReducer(reducer, { ...initialState });

	const handleSetTags = (tag, selected) => {
		if (!selected) {
			//adds tag to the state
			dispatch({ type: "addTestTag", payload: tag });
			//setUnsavedChanges(true);
		} else {
			dispatch({ type: "removeTestTag", payload: tag });
		}
	};

	return (
		<Part4Context.Provider
			value={{
				...part4State,
				dispatch,
				handleSetTags,
			}}
		>
			{children}
		</Part4Context.Provider>
	);
};
