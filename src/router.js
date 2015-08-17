import Router from "ampersand-router";
import actions from "./actions/view";
import i18nStore from "./stores/i18n";
import api from "./api";

let AppRouter = Router.extend({

	routes: {
		'': 'search',
		':lang': 'search',
		':lang/search': 'search',
		':lang/entry/:id': 'entry'
	},

	navigateToResult: function(obj) {
		this.navigate(i18nStore.getLanguage() + "/entry/" + obj.id);
	},

	search: function(lang) {
		if(lang !== i18nStore.getLanguage()) { 
			actions.setLanguage(lang || "nl"); 
		}
		actions.setController("search");
	},

	entry: function(lang, id) {
		if(lang !== i18nStore.getLanguage()) { 
			actions.setLanguage(lang || "nl"); 
		}
		console.log(lang, id);
		actions.setController("document", id);
	}
});

export default new AppRouter();
