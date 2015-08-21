import dispatcher from "../dispatcher";
import BaseStore from "./base";

const CHANGE_EVENT = "change";

class PagesStore extends BaseStore {

	constructor() {
		super();
		this.data = {
			ids: [],
			next: null,
			prev: null
		};
	}

	getState() {
		return this.data;
	}

	receive(data)  {
		console.log("SET PAGES", data);
		this.data = data;
	}

	receivePages(data, isPrev) {
		let newIds = data.results.map(res => res.id);

		if(isPrev) {
			this.data.ids = data.results.map(res => res.id).concat(this.data.ids);
		} else {
			this.data.ids = this.data.ids.concat(data.results.map(res => res.id));
		}

		if(data._next) {
			this.data.next = data._next.replace("draft//api", "draft/api");
		} else {
			this.data.next = null
		}
		if(data._prev) {
			this.data.prev = data._prev.replace("draft//api", "draft/api");
		} else {
			this.data.prev = null;
		}
	}
}

let pagesStore = new PagesStore();

let dispatcherCallback = function(payload) {
	switch(payload.action.actionType) {
		case "SET_PAGES":
			pagesStore.receive(payload.action.data);
			break;
		case "NEXT_PAGES_RECEIVE":
			pagesStore.receivePages(payload.action.data, false);
			break;
		case "PREV_PAGES_RECEIVE":
			pagesStore.receivePages(payload.action.data, true);
			break;
		default:
			return;
	}

	pagesStore.emit(CHANGE_EVENT)
};

pagesStore.dispatcherIndex = dispatcher.register(dispatcherCallback);

export default pagesStore;