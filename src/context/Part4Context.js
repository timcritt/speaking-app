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
			case "updateTest":
				return {
					...state,
					...action.payload,
				};
			case "resetState":
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

	//dispatch handlers
	const updateQuestionOne = (payload) => {
		dispatch({ type: "updateQuestionOne", payload: payload });
	};

	const updateQuestionTwo = (payload) => {
		dispatch({ type: "updateQuestionTwo", payload: payload });
	};

	const updateQuestionThree = (payload) => {
		dispatch({ type: "updateQuestionThree", payload: payload });
	};

	const updateQuestionFour = (payload) => {
		dispatch({ type: "updateQuestionFour", payload: payload });
	};

	const updateQuestionFive = (payload) => {
		dispatch({ type: "updateQuestionFive", payload: payload });
	};

	const updateQuestionSix = (payload) => {
		dispatch({ type: "updateQuestionSix", payload: payload });
	};

	const handleSetTags = (tag, selected) => {
		if (!selected) {
			//adds tag to the state
			dispatch({ type: "addTestTag", payload: tag });
			//setUnsavedChanges(true);
		} else {
			dispatch({ type: "removeTestTag", payload: tag });
		}
	};

	const updateTest = (payload) => {
		dispatch({ type: "updateTest", payload: payload });
	};

	//resets state to initial value
	const resetState = () => {
		dispatch({ type: "resetState" });
	};

	return (
		<Part4Context.Provider
			value={{
				...part4State,
				updateQuestionOne,
				updateQuestionTwo,
				updateQuestionThree,
				updateQuestionFour,
				updateQuestionFive,
				updateQuestionSix,
				handleSetTags,
				updateTest,
				resetState,
			}}
		>
			{children}
		</Part4Context.Provider>
	);
};
