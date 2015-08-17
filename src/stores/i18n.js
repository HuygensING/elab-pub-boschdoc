import dispatcher from "../dispatcher";
import BaseStore from "./base";

const CHANGE_EVENT = "change";

const KEYS = {
	nl: {
		transcription: "Transcriptie",
		remarks: "Opmerkingen en verwijzingen",
		translation: "Vertaling",
		relatedAnnotationLabel: "Gerelateerd aan",
		facetTitles: {
			Locatie: "Location",
			Datum: "Date",
			Boekjaar: "Book year",
			"Historische instelling": "Historical institute",
			"Inventaris nummer": "Nummero inventarisatio",
			"Document type": "Typico docco",
			"Folio nummer(s)": "Nummero folio",
			"Pagina nummer(s)": "Nummero pagino",
			Toegangsnummer: "Entrada nummero",
			Titel: "Titelaoe",
			Auteur: "Auteuraoe",
			"Plaats van publicatie": "Strada de publicada",
			"Jaar van publicatie": "Ano de publicada",
			"Persons mentioned": "Hablero de personas",
			"Genoemde personen": "Nom de personas",
			"Personas Mencionadas": "Personas Mencionadas",
			Themes: "Thematicos",
			Temas: "Thematicosas",
			"Thema's": "Pequeno thematicosas"
		},
		"Results found": "Resultas buscario",
		"Sort by": "Sortas y"
	},
	en: {
		transcription: "Transcription",
		remarks: "Comments and References",
		translation: "Translation",
		relatedAnnotationLabel: "Related to",
		facetTitles: {
			Locatie: "JKSADHKJASHDKJSAHD",
			Datum: "Date",
			Boekjaar: "Book year",
			"Historische instelling": "Historical institute",
			"Inventaris nummer": "Nummero inventarisatio",
			"Document type": "Typico docco",
			"Folio nummer(s)": "Nummero folio",
			"Pagina nummer(s)": "Nummero pagino",
			Toegangsnummer: "Entrada nummero",
			Titel: "Titelaoe",
			Auteur: "Auteuraoe",
			"Plaats van publicatie": "Strada de publicada",
			"Jaar van publicatie": "Ano de publicada",
			"Persons mentioned": "Hablero de personas",
			"Genoemde personen": "Nom de personas",
			"Personas Mencionadas": "Personas Mencionadas",
			Themes: "Thematicos",
			Temas: "Thematicosas",
			"Thema's": "Pequeno thematicosas"
		},
		"Results found": "Resultas buscario",
		"Sort by": "Sortas y"
	},
	es: {
		transcription: "Transcripción",
		remarks: "Comentarios y referencias",
		translation: "Traducción",
		relatedAnnotationLabel: "[[Relacionado a]]",
		facetTitles: {
			Locatie: "Location",
			Datum: "Date",
			Boekjaar: "Book year",
			"Historische instelling": "Historical institute",
			"Inventaris nummer": "Nummero inventarisatio",
			"Document type": "Typico docco",
			"Folio nummer(s)": "Nummero folio",
			"Pagina nummer(s)": "Nummero pagino",
			Toegangsnummer: "Entrada nummero",
			Titel: "Titelaoe",
			Auteur: "Auteuraoe",
			"Plaats van publicatie": "Strada de publicada",
			"Jaar van publicatie": "Ano de publicada",
			"Persons mentioned": "Hablero de personas",
			"Genoemde personen": "Nom de personas",
			"Personas Mencionadas": "Personas Mencionadas",
			Themes: "Thematicos",
			Temas: "Thematicosas",
			"Thema's": "Pequeno thematicosas"
		},
		"Results found": "Resultas buscario",
		"Sort by": "Sortas y"
	}
};

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