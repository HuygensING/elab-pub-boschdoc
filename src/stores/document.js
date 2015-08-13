import dispatcher from "../dispatcher";
import BaseStore from "./base";

const CHANGE_EVENT = "change";

class DocumentStore extends BaseStore {

	constructor() {
		super();
		this.data = null;
	}

	getState() {
		return this.data;
	}

	receive(data)  {
		this.data = data;
	}
}

let documentStore = new DocumentStore();

let dispatcherCallback = function(payload) {
	switch(payload.action.actionType) {
		case "DOCUMENT_RECEIVE":
			documentStore.receive(payload.action.data);
			break;
		default:
			return;
	}

	documentStore.emit(CHANGE_EVENT)
};

documentStore.dispatcherIndex = dispatcher.register(dispatcherCallback);

export default documentStore;