import React, { createContext, useReducer } from "react";

export const FCEPart2Context = createContext();

export const FCEPart2ContextProvider = ({ children }) => {
	const initialState = {
		questionOne: "",
		shortTurnQuestion: "",
		imageOneUrl: null,
		imageTwoUrl: null,
		imageOneRef: null,
		imageTwoRef: null,
		testTags: [],
		docRef: "",
		creatorId: "",
		shortTurnVisible: null,
		time: 6000,
		hasFetched: false,
		unsavedChanges: false,
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
			case "updateImageOneUrl":
				return {
					...state,
					imageOneUrl: action.payload,
				};
			case "updateImageTwoUrl":
				return {
					...state,
					imageTwoUrl: action.payload,
				};
			case "updateImageOneRef":
				return {
					...state,
					imageOneRef: action.payload,
				};
			case "updateImageTwoRef":
				return {
					...state,
					imageTwoRef: action.payload,
				};
			case "updateTestTags":
				return {
					...state,
					testTags: action.payload,
				};
			case "addTestTag":
				return { ...state, testTags: [...state.testTags, action.payload] };

			case "removeTestTag":
				return {
					...state,
					testTags: [
						...state.testTags.filter((testTag) => testTag !== action.payload),
					],
				};
			case "updateDocRef":
				return {
					...state,
					docRef: action.payload,
				};
			case "updateDocToFetchRef":
				return {
					...state,
					docToFetchRef: action.payload,
				};
			case "updateCreatorId":
				return {
					...state,
					creatorId: action.payload,
				};
			case "updateShortTurnVisible":
				return {
					...state,
					shortTurnVisible: action.payload,
				};
			case "updateTime":
				return {
					...state,
					updateTime: action.payload,
				};
			case "updateHasFetched":
				return {
					...state,
					hasFetched: action.payload,
				};
			case "updateUnsavedChanges":
				return {
					...state,
					unsavedChanges: action.payload,
				};
			case "updateTest":
				return {
					...state,
					...action.payload,
				};
			case "resetState":
				return { ...initialState };
			default: {
				return state;
			}
		}
	};

	const [part2State, dispatch] = useReducer(reducer, { ...initialState });

	const dispatchHandlers = {
		updateQuestionOne: (payload) => {
			dispatch({ type: "updateQuestionOne", payload: payload });
		},

		updateShortTurnQuestion: (payload) => {
			dispatch({ type: "updateShortTurnQuestion", payload: payload });
		},

		updateImageOneUrl: (payload) => {
			dispatch({ type: "updateImageOneUrl", payload: payload });
		},

		updateImageTwoUrl: (payload) => {
			dispatch({ type: "updateImageTwoUrl", payload: payload });
		},

		updateImageOneRef: (payload) => {
			dispatch({ type: "updateImageOneRef", payload: payload });
		},

		updateImageTwoRef: (payload) => {
			dispatch({ type: "updateImageTwoRef", payload: payload });
		},

		updateTestTags: (payload) => {
			dispatch({ type: "updateTestTags", payload: payload });
		},

		updateDocRef: (payload) => {
			dispatch({ type: "updateDocRef", payload: payload });
		},
		updateDocToFetchRef: (payload) => {
			dispatch({ type: "updateDocToFetchRef", payload: payload });
		},

		updateCreatorId: (payload) => {
			dispatch({ type: "updateCreatorId", payload: payload });
		},

		updateShortTurnVisible: (payload) => {
			dispatch({ type: "updateShortTurnVisible", payload: payload });
		},

		updateTime: (payload) => {
			dispatch({ type: "updateTime", payload: payload });
		},

		updateHasFetched: (payload) => {
			dispatch({ type: "updateHasFetched", payload: payload });
		},

		updateUnsavedChanges: (payload) => {
			dispatch({ type: "updateUnsavedChanges", payload: payload });
		},

		updateTest: (payload) => {
			dispatch({ type: "updateTest", payload: payload });
		},

		resetState: (payload) => {
			dispatch({ type: "resetState", payload: payload });
		},

		handleSetTags: (tag, selected) => {
			if (!selected) {
				//adds tag to the state
				dispatch({ type: "addTestTag", payload: tag });
				//setUnsavedChanges(true);
			} else {
				dispatch({ type: "removeTestTag", payload: tag });
			}
		},
	};

	return (
		<FCEPart2Context.Provider
			value={{
				...part2State,
				...dispatchHandlers,
			}}
		>
			{children}
		</FCEPart2Context.Provider>
	);
};
