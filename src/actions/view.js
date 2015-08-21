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

	setPages(ids, prev, next) {
		dispatcher.handleViewAction({
			actionType: "SET_PAGES",
			data: {
				ids: ids,
				prev: prev,
				next: next
			}
		});
	}
};

export default viewActions;