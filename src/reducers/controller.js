let initialState = {
	id: null,
	current: "search",
	activeTab: "transcription",
	annotationId: null,
	data: {}
};


export default function(state=initialState, action) {
	switch (action.type) {
		case "SET_CONTROLLER":
			return {...state, ...action.data};
		default:
			return state;
	}
}