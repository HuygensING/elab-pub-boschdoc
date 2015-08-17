import dispatcher from "../dispatcher";
import BaseStore from "./base";

const CHANGE_EVENT = "change";

class AppStore extends BaseStore {

	constructor() {
		super();
		this.data = null;
	}

	getState() {
		return this.data;
	}

	receive(data)  {
		console.log("AppStore receive ", data);
		this.data = data;
	}
}

let appStore = new AppStore();

let dispatcherCallback = function(payload) {
	console.log("DISPATCHER CALLBACK", payload.action.data);
	switch(payload.action.actionType) {
		case "SET_CONTROLLER":
			appStore.receive(payload.action.data);
			break;
		default:
			return;
	}

	appStore.emit(CHANGE_EVENT)
};

appStore.dispatcherIndex = dispatcher.register(dispatcherCallback);

export default appStore;