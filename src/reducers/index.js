import {combineReducers} from "redux";

import controller from "./controller";
import language from "./language";

export default combineReducers({
	controller: controller,
	language: language
});