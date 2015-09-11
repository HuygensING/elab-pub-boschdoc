import dispatcher from "../dispatcher";
import api from "../api"


let viewActions = {
	
	setPages(ids, prev, next, start) {
		dispatcher.handleViewAction({
			actionType: "SET_PAGES",
			data: {
				ids: ids,
				prev: prev,
				next: next,
				start: start
			}
		});
	},

	pushPages(data) {
		dispatcher.handleServerAction({
			actionType: "NEXT_PAGES_RECEIVE",
			data: data
		});
	}
};

export default viewActions;
export {viewActions as actions};

export function setPages(ids, prev, next, start) {
	return function(dispatch) {
		dispatch({
			type: "SET_PAGES",
			data: {
				ids: ids,
				prev: prev,
				next: next,
				start: start
			}
		})
	}
}

export function setLanguage(lang) {
	return function(dispatch) {
		dispatch({
			type: "LANGUAGE_TOGGLE",
			data: {current: lang}
		})
	};
}

let cached = {};

export function setController(controller, id, activeTab, annotationId) {
	return function(dispatch) {
		if(id) {
			if(cached[id]) {
				dispatch({
					type: "SET_CONTROLLER",
					data: {
						current: controller,
						id: id,
						activeTab: activeTab,
						annotationId: annotationId,
						data: cached[id]
					}
				});
			} else {
				api.performXhr({
					method: 'GET',
					uri: api.docroot + '/data/' + id + '.json'
				}, function(err, resp, data) {
					cached[id] = JSON.parse(data);
					dispatch({
						type: "SET_CONTROLLER",
						data: {
							current: controller,
							id: id,
							activeTab: activeTab,
							annotationId: annotationId,
							data: JSON.parse(data)
						}
					})
				});
			}

		} else {
			dispatch({
				type: "SET_CONTROLLER",
				data: {
					current: controller,
					id: id,
					activeTab: activeTab,
					annotationId: annotationId,
					data: {}
				}
			})		
		}
	}
}
