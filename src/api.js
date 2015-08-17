import xhr from "xhr";
import dispatcher from "./dispatcher";
import serverActions from "./actions/server";

export default {
	docroot: "",

	performXhr(opts, callback) {
		xhr(opts, callback);
	},

	getDocument(id) {
		this.performXhr({
			method: 'GET',
			uri: this.docroot + '/data/' + id + '.json'
		}, serverActions.receiveDocument);
	},

	getConfig(callback) {
		this.performXhr({
			method: 'GET',
			uri: this.docroot + '/data/config.json'
		}, function(err, resp, body) {
			callback(JSON.parse(body))
		});
	}
};