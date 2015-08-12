import dispatcher from "../dispatcher";

import API from "../api";

let documentActions = {

	getDocument(id) {
		API.getDocument(id);
	}
};

export default documentActions;