import xhr from "xhr";
import dispatcher from "./dispatcher";
import serverActions from "./actions/server";

const ROOT = ""; /* TODO: move to config */

export default {
	performXhr(opts, callback) {
		xhr(opts, callback);
	},

	getDocument(id) {
		this.performXhr({
			method: 'GET',
			uri: ROOT + '/data/' + id + '.json'
		}, serverActions.receiveDocument);
	}
};