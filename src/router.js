import Router from "ampersand-router";
import React from "react";

import FacetedSearch from "hire-faceted-search";
import Document from "./components/document"

import actions from "./actions/view";
import App from "./app";
import i18nStore from "./stores/i18n";

let AppRouter = Router.extend({

	routes: {
		'': 'search',
		':lang': 'search',
		':lang/search': 'search',
		':lang/details/:id': 'details'
	},

	navigateToResult: function(obj) {
		this.navigate(i18nStore.getLanguage() + "/details/" + obj.id);
	},

	search: function(lang) {
		console.log("ROUTE? search");
		if(lang !== i18nStore.getLanguage()) { actions.setLanguage(lang || "nl"); }
		React.render(<App><FacetedSearch onChange={this.navigateToResult.bind(this)} /></App>, document.body);
	},

	details: function(lang, id) {
		console.log("ROUTE? details");
		if(lang !== i18nStore.getLanguage()) { actions.setLanguage(lang || "nl"); }
		React.render(<App><Document id={id} /></App>, document.body);
	}
});

export default new AppRouter();
