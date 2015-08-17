import Router from "ampersand-router";
import React from "react";

import FacetedSearch from "hire-faceted-search";
import Document from "./components/document-controller";

import actions from "./actions/view";
import App from "./app";
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
		if(lang !== i18nStore.getLanguage()) { actions.setLanguage(lang || "nl"); }
		api.getConfig((function(config) {
			React.render(<App><FacetedSearch config={config} onChange={this.navigateToResult.bind(this)} /></App>, document.body);
		}).bind(this));
	},

	entry: function(lang, id) {
		if(lang !== i18nStore.getLanguage()) { actions.setLanguage(lang || "nl"); }
		React.render(<App><Document id={id} /></App>, document.body);
	}
});

export default new AppRouter();
