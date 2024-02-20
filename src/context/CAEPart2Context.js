import React, { createContext, useReducer } from "react";

export const CAEPart2Context = createContext();

export const CAEPart2ContextProvider = ({ children }) => {
	const initialState = {
		questionOne: "",
		questionTwo: "",
		shortTurnQuestion: "",
		imageOneUrl: null,
		imageTwoUrl: null,
		imgaeThreeUrl: null,
		imageOneRef: null,
		imageTwoRef: null,
		imageThreeRef: null,
		testTags: [],
		docRef: "",
		creatorId: null,
		shortTurnVisible: false,
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
			case "updateQuestionTwo":
				return {
					...state,
					questionTwo: action.payload,
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
			case "updateImageThreeUrl":
				return {
					...state,
					imageThreeUrl: action.payload,
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
			case "updateImageThreeRef":
				return {
					...state,
					imageThreeRef: action.payload,
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

	const [CAEPart2State, dispatch] = useReducer(reducer, { ...initialState });

	const dispatchHandlers = {
		updateQuestionOne: (payload) => {
			dispatch({ type: "updateQuestionOne", payload: payload });
		},

		updateQuestionTwo: (payload) => {
			dispatch({ type: "updateQuestionTwo", payload: payload });
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

		updateImageThreeUrl: (payload) => {
			dispatch({ type: "updateImageThreeUrl", payload: payload });
		},

		updateImageOneRef: (payload) => {
			dispatch({ type: "updateImageOneRef", payload: payload });
		},

		updateImageTwoRef: (payload) => {
			dispatch({ type: "updateImageTwoRef", payload: payload });
		},
		updateImageThreeRef: (payload) => {
			dispatch({ type: "updateImageThreeRef", payload: payload });
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
			} else {
				dispatch({ type: "removeTestTag", payload: tag });
			}
		},
	};

	return (
		<CAEPart2Context.Provider
			value={{
				...CAEPart2State,
				...dispatchHandlers,
			}}
		>
			{children}
		</CAEPart2Context.Provider>
	);
};
