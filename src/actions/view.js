import dispatcher from "../dispatcher";

let viewActions = {
	setLanguage(lang) {
		dispatcher.handleViewAction({
			actionType: "LANGUAGE_TOGGLE",
			data: lang
		});
	},

	setController(controller, id, activeTab) {
		dispatcher.handleViewAction({
			actionType: "SET_CONTROLLER",
			data: { 
				controller: controller,
				id: id,
				activeTab: activeTab
			}
		})
	}
};

export default viewActions;