import dispatcher from "../dispatcher";

let serverActions = {
	receiveDocument(err, resp, data) {
		dispatcher.handleServerAction({
			actionType: "DOCUMENT_RECEIVE",
			data: JSON.parse(data)
		});
	},

	receiveNextPages(err, resp, data) {
		dispatcher.handleServerAction({
			actionType: "NEXT_PAGES_RECEIVE",
			data: JSON.parse(data)
		});
	},

	receivePrevPages(err, resp, data) {
		dispatcher.handleServerAction({
			actionType: "PREV_PAGES_RECEIVE",
			data: JSON.parse(data)
		});
	},


};

export default serverActions;