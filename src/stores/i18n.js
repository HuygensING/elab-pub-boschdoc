import dispatcher from "../dispatcher";
import BaseStore from "./base";

const CHANGE_EVENT = "change";

const KEYS = {
	nl: {
		transcription: "Transcriptie",
		remarks: "Opmerkingen en verwijzingen",
		translation: "Vertaling"
	},
	en: {
		transcription: "Transcription",
		remarks: "Comments and References",
		translation: "Translation"
	},
	es: {
		transcription: "Transcripción",
		remarks: "Comentarios y referencias",
		translation: "Traducción"
	}
};

class I18nStore extends BaseStore {

	constructor() {
		super();
	}

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