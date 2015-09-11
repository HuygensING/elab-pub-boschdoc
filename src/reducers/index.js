import {combineReducers} from "redux";

import controller from "./controller";
import language from "./language";
import pages from "./pages";

export default combineReducers({
	controller: controller,
	language: language,
	pages: pages
});