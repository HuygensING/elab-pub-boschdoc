import dispatcher from "../dispatcher";

let serverActions = {
	receiveDocument(err, resp, data) {
		dispatcher.handleServerAction({
			actionType: "DOCUMENT_RECEIVE",
			data: JSON.parse(data)
		});
	}
};

export default serverActions;