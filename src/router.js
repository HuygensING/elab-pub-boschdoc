import Router from "ampersand-router";
import actions from "./actions/view";
import appStore from "./stores/app";
import api from "./api";

let AppRouter = Router.extend({

	routes: {
		'': 'search',
		':lang': 'search',
		':lang/search': 'search',
		':lang/entry/:id': 'entry'
	},

	navigateToResult: function(obj) {
		this.navigate(appStore.getLanguage() + "/entry/" + obj.id);
	},

	search: function(lang) {
		if(lang !== appStore.getLanguage()) { 
			actions.setLanguage(lang || "nl"); 
		}
		actions.setController("search");
	},

	entry: function(lang, id) {
		if(lang !== appStore.getLanguage()) { 
			actions.setLanguage(lang || "nl"); 
		}
		actions.setController("document", id);
	}
});

export default new AppRouter();
