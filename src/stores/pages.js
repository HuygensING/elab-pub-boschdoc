import dispatcher from "../dispatcher";
import BaseStore from "./base";

const CHANGE_EVENT = "change";

class PagesStore extends BaseStore {

	constructor() {
		super();
		this.data = {
			ids: [],
			next: null,
			prev: null,
			loadedStartIndices: []
		};
	}

	getState() {
		return this.data;
	}

	reset(data)  {
		this.data = data;
		this.data.loadedStartIndices = [this.data.start];
	}

	pushPages(data) {
		if(this.data.loadedStartIndices.indexOf(data.start) < 0) {
			let newIds = data.results.map(res => res.id);
			this.data.ids = this.data.ids.concat(data.results.map(res => res.id));
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
			this.data.loadedStartIndices.push(data.start);
		}
	}
}

let pagesStore = new PagesStore();

let dispatcherCallback = function(payload) {
	switch(payload.action.actionType) {
		case "SET_PAGES":
			pagesStore.reset(payload.action.data);
			break;
		case "NEXT_PAGES_RECEIVE":
			pagesStore.pushPages(payload.action.data);
			break;
		default:
			return;
	}

	pagesStore.emit(CHANGE_EVENT)
};

pagesStore.dispatcherIndex = dispatcher.register(dispatcherCallback);

export default pagesStore;