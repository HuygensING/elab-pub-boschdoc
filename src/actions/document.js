import dispatcher from "../dispatcher";

import API from "../api";

let documentActions = {
	getDocument(id) {
		API.getDocument(id);
	},

	getNextResultPage(url) {
		API.fetchNextResultPage(url, false);
	},

	getPrevResultPage(url) {
		API.fetchNextResultPage(url, true);
	},

};

export default documentActions;