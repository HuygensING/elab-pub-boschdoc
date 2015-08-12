import dispatcher from "../dispatcher";

let viewActions = {

	setLanguage(lang) {
		dispatcher.handleViewAction({
			actionType: "LANGUAGE_TOGGLE",
			data: lang
		});
	}
};

export default viewActions;