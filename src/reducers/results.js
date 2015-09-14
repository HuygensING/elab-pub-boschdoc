let initialState = {
	ids: [],
	results: [],
	_next: null,
	_prev: null,
	loadedStartIndices: []
};

let pushPages = function(state, data) {
	if(state.loadedStartIndices.indexOf(data.start) < 0) {
		let newIds = data.results.map(res => res.id);
		state.ids = state.ids.concat(data.results.map(res => res.id));
		if(data._next) {
			state._next = data._next.replace("draft//api", "draft/api");
		} else {
			state._next = null
		}
		if(data._prev) {
			state._prev = data._prev.replace("draft//api", "draft/api");
		} else {
			state._prev = null;
		}
		state.loadedStartIndices.push(data.start);
	}
	return state;
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "SET_RESULTS":
			return {...state, ...action.data, loadedStartIndices: [action.data.start]};
		case "NEXT_PAGES_RECEIVE":
			return pushPages(state, action.data);
		default:
			return state;
	}
}