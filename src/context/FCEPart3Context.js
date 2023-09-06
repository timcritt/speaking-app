import React, { useState, createContext, useEffect, useReducer } from "react";

export const FCEPart3Context = createContext();

export const FCEPart3ContextProvider = ({ children }) => {
	const initialState = {
		questionOne: "",
		shortTurnQuestion: "",
		topleft: "",
		topRight: "",
		bottomLeft: "",
		bottomCentre: "",
		bottomRight: "",
		testTags: "",
		docRef: "",
		creatorId: "",
		changesSaved: "",
		hasFetched: "",
	};

	const reducer = (state, action) => {
		switch (action.type) {
			case "updateQuestionOne":
				return {
					...state,
					questionOne: action.payload,
				};
			case "updateShortTurnQuestion":
				return {
					...state,
					shortTurnQuestion: action.payload,
				};
			case "updateTopLeft":
				return {
					...state,
					topLeft: action.payload,
				};
			case "updateTopRight":
				return {
					...state,
					topRight: action.payload,
				};
			case "updateBottomLeft":
				return {
					...state,
					bottomLeft: action.payload,
				};
			case "updateBottomCentre":
				return {
					...state,
					bottomCentre: action.payload,
				};
			case "updateBottomRight":
				return {
					...state,
					bottomRight: action.payload,
				};
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
			case "updateTest":
				return {
					...state,
					...action.payload,
				};
			case "resetState":
				return { ...initialState };

			default: {
				console.log("deafult case reached in Part 3 reducer");
				return state;
			}
		}
	};

	const [part3State, dispatch] = useReducer(reducer, { ...initialState });

	const [changesSaved, setChangesSaved] = useState(false);
	const optionPlaceholder = "option";
	const [hasFetched, setHasFetched] = useState(false);

	//Dispatch handlers to be passed down via context and allow for greater indpendence between context and
	//the consuming components

	const updateQuestionOne = (payload) => {
		dispatch({ type: "updateQuestionOne", payload: payload });
	};

	const updateShortTurnQuestion = (payload) => {
		dispatch({ type: "updateShortTurnQuestion", payload: payload });
	};

	const updateTopLeft = (payload) => {
		dispatch({ type: "updateTopLeft", payload: payload });
	};

	const updateTopRight = (payload) => {
		dispatch({ type: "updateTopRight", payload: payload });
	};

	const updateBottomLeft = (payload) => {
		dispatch({ type: "updateBottomLeft", payload: payload });
	};

	const updateBottomCentre = (payload) => {
		dispatch({ type: "updateBottomCentre", payload: payload });
	};

	const updateBottomRight = (payload) => {
		dispatch({ type: "updateBottomRight", payload: payload });
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
		<FCEPart3Context.Provider
			value={{
				...part3State,
				updateQuestionOne,
				updateShortTurnQuestion,
				updateTopLeft,
				updateTopRight,
				updateBottomLeft,
				updateBottomCentre,
				updateBottomRight,
				handleSetTags,
				updateTest,
				resetState,
				optionPlaceholder,
				hasFetched,
				setHasFetched,
				handleSetTags,
			}}
		>
			{children}
		</FCEPart3Context.Provider>
	);
};
