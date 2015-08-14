import xhr from "xhr";
import dispatcher from "./dispatcher";
import serverActions from "./actions/server";

export default {
	docroot: "",

	performXhr(opts, callback) {
		xhr(opts, callback);
	},

	getDocument(id) {
		console.log(this.docroot);
		this.performXhr({
			method: 'GET',
			uri: this.docroot + '/data/' + id + '.json'
		}, serverActions.receiveDocument);
	}
};