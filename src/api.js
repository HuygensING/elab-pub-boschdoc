import xhr from "xhr";
import dispatcher from "./dispatcher";
import serverActions from "./actions/server";

export default {
	performXhr(opts, callback) {
		xhr(opts, callback);
	},

	getDocument(id) {
		this.performXhr({
			method: 'GET',
			uri: '/data/' + id + '.json'
		}, serverActions.receiveDocument);
	}
};