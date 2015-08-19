import dispatcher from "../dispatcher";
import BaseStore from "./base";

const CHANGE_EVENT = "change";

class AppStore extends BaseStore {

	constructor() {
		super();
		this.id = null;
		this.controller = "search";
		this.language = this.getLanguage();
	}

	getState() {
		return {
			language: this.getLanguage(),
			controller: this.controller,
			id: this.id,
			activeTab: this.activeTab
		};
	}

	getLanguage() {
		return localStorage.getItem("lang") || "nl";
	}

	receiveLanguage(lang)  {
		localStorage.setItem("lang", lang)
	}

	receiveController(data)  {
		this.controller = data.controller;
		this.id = data.id;
		this.activeTab = data.activeTab;
	}
}

let appStore = new AppStore();

let dispatcherCallback = function(payload) {
	switch(payload.action.actionType) {
		case "SET_CONTROLLER":
			appStore.receiveController(payload.action.data);
			break;
		case "LANGUAGE_TOGGLE":
			appStore.receiveLanguage(payload.action.data);
			break;
		default:
			return;
	}
	appStore.emit(CHANGE_EVENT)
};

appStore.dispatcherIndex = dispatcher.register(dispatcherCallback);

export default appStore;