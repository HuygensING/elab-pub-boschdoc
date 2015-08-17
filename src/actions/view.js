import dispatcher from "../dispatcher";

let viewActions = {
	setLanguage(lang) {
		dispatcher.handleViewAction({
			actionType: "LANGUAGE_TOGGLE",
			data: lang
		});
	},

	setController(controller, id) {
		console.log("setController", controller, id);
		dispatcher.handleViewAction({
			actionType: "SET_CONTROLLER",
			data: { 
				controller: controller,
				id: id
			}
		})
	}
};

export default viewActions;