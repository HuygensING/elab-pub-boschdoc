import dispatcher from "../dispatcher";
import BaseStore from "./base";
import languageKeys from "./i18n-keys";
const CHANGE_EVENT = "change";

const KEYS = languageKeys;

class I18nStore extends BaseStore {

	getState() {
		return {
			language: this.getLanguage(),
			keys: KEYS[this.getLanguage()]
		};
	}

	getLanguage() {
		return localStorage.getItem("lang") || "nl";
	}

	receiveLanguage(lang)  {
		localStorage.setItem("lang", lang)
	}
}

let i18nStore = new I18nStore();

let dispatcherCallback = function(payload) {
	switch(payload.action.actionType) {
		case "LANGUAGE_TOGGLE":
			i18nStore.receiveLanguage(payload.action.data);
			break;
		default:
			return;
	}

	i18nStore.emit(CHANGE_EVENT)
};

i18nStore.dispatcherIndex = dispatcher.register(dispatcherCallback);

export default i18nStore;