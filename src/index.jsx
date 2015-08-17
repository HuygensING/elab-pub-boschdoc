import React from "react";
import appRouter from "./router";
import api from "./api";
import App from "./app";


//const ROOT = "/elaborate/publication/boschdoc/development";

const ROOT = "/";

appRouter.history.start({
	root: ROOT
});


api.getConfig((function(config) {
	let [lang, controller, id] = appRouter.history.fragment.split("/");
	if(controller === "entry") { controller = "document"; }
	React.render(<App config={config} controller={controller} id={id} />, document.body);
}).bind(this));