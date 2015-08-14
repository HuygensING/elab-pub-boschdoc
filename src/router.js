import Router from "ampersand-router";
import React from "react";

import FacetedSearch from "hire-faceted-search";
import Document from "./components/document-controller";

import actions from "./actions/view";
import App from "./app";
import i18nStore from "./stores/i18n";

let AppRouter = Router.extend({

	routes: {
		'': 'search',
		':lang': 'search',
		':lang/search': 'search',
		':lang/entry/:id': 'entry'
	},

	myStart: function(opts) {
		this.history.start(opts);
	},

	navigateToResult: function(obj) {
		this.navigate(i18nStore.getLanguage() + "/entry/" + obj.id);
	},

	search: function(lang) {
		console.log("HOME");
		if(lang !== i18nStore.getLanguage()) { actions.setLanguage(lang || "nl"); }
		React.render(<App><FacetedSearch onChange={this.navigateToResult.bind(this)} /></App>, document.body);
	},

	entry: function(lang, id) {
		if(lang !== i18nStore.getLanguage()) { actions.setLanguage(lang || "nl"); }
		React.render(<App><Document id={id} /></App>, document.body);
	}
});

export default new AppRouter();
