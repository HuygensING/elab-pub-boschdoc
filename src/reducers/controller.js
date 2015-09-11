let initialState = {
	id: null,
	current: "search",
	activeTab: "transcription",
	annotationId: null
};


export default function(state=initialState, action) {
	switch (action.type) {
		case "SET_CONTROLLER":
			return {...initialState, ...action.data};
		default:
			return state;
	}
}