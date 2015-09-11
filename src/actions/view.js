import dispatcher from "../dispatcher";

let viewActions = {
	setPages(ids, prev, next, start) {
		dispatcher.handleViewAction({
			actionType: "SET_PAGES",
			data: {
				ids: ids,
				prev: prev,
				next: next,
				start: start
			}
		});
	},

	pushPages(data) {
		dispatcher.handleServerAction({
			actionType: "NEXT_PAGES_RECEIVE",
			data: data
		});
	}
};

export default viewActions;
export {viewActions as actions};


export function setLanguage(lang) {
	return function(dispatch) {
		dispatch({
			type: "LANGUAGE_TOGGLE",
			data: {current: lang}
		})
	};
}

export function setController(controller, id, activeTab, annotationId) {
	return function(dispatch) {
		dispatch({
			type: "SET_CONTROLLER",
			data: {
				current: controller,
				id: id,
				activeTab: activeTab,
				annotationId: annotationId
			}
		});
	}
}
