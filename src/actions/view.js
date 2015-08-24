import dispatcher from "../dispatcher";

let viewActions = {
	setLanguage(lang) {
		dispatcher.handleViewAction({
			actionType: "LANGUAGE_TOGGLE",
			data: lang
		});
	},

	setController(controller, id, activeTab, annotationId) {
		dispatcher.handleViewAction({
			actionType: "SET_CONTROLLER",
			data: { 
				controller: controller,
				id: id,
				activeTab: activeTab,
				annotationId: annotationId
			}
		})
	},

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