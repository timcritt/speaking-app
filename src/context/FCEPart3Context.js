import React, { useState, createContext, useReducer } from "react";

export const FCEPart3Context = createContext();

export const FCEPart3ContextProvider = ({ children }) => {
	const initialState = {
		questionOne: "",
		shortTurnQuestion: "",
		topLeft: "",
		topRight: "",
		bottomLeft: "",
		bottomCentre: "",
		bottomRight: "",
		testTags: [],
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
			case "updateHasFetched":
				return {
					...state,
					hasFetched: action.payload,
				};
			case "updateTest":
				return {
					...state,
					...action.payload,
				};
			case "updateDocRef":
				return {
					...state,
					docRef: action.payload,
				};
			case "resetState":
				return { ...initialState };
			case "updateCreatorId":
				return {
					...state,
					creatorId: action.payload,
				};

			default: {
				console.log("deafult case reached in Part 3 reducer");
				return state;
			}
		}
	};

	const [part3State, dispatch] = useReducer(reducer, { ...initialState });

	const optionPlaceholder = "option";

	//Dispatch handlers to be passed down via context and allow for greater indpendence between context and
	//the consuming components

	const dispatchHandlers = {
		updateQuestionOne(payload) {
			dispatch({ type: "updateQuestionOne", payload: payload });
		},
		updateShortTurnQuestion(payload) {
			dispatch({ type: "updateShortTurnQuestion", payload: payload });
		},
		updateTopLeft(payload) {
			dispatch({ type: "updateTopLeft", payload: payload });
		},
		updateTopRight(payload) {
			dispatch({ type: "updateTopRight", payload: payload });
		},
		updateBottomLeft(payload) {
			dispatch({ type: "updateBottomLeft", payload: payload });
		},
		updateBottomCentre(payload) {
			dispatch({ type: "updateBottomCentre", payload: payload });
		},
		updateBottomRight(payload) {
			dispatch({ type: "updateBottomRight", payload: payload });
		},
		handleSetTags(tag, selected) {
			if (!selected) {
				//adds tag to the state
				dispatch({ type: "addTestTag", payload: tag });
				//setUnsavedChanges(true);
			} else {
				dispatch({ type: "removeTestTag", payload: tag });
			}
		},
		updateTest(payload) {
			dispatch({ type: "updateTest", payload: payload });
		},
		//resets state to initial value
		resetState: (payload) => {
			dispatch({ type: "resetState", payload: payload });
		},
		updateHasFetched(payload) {
			dispatch({ type: "updateHasFetched", payload: payload });
		},
		updateDocRef(payload) {
			dispatch({ type: "updateDocRef", payload: payload });
		},

		updateCreatorId(payload) {
			dispatch({ type: "updateCreatorId", payload: payload });
		},
	};

	return (
		<FCEPart3Context.Provider
			value={{
				...part3State,
				...dispatchHandlers,
			}}
		>
			{children}
		</FCEPart3Context.Provider>
	);
};
