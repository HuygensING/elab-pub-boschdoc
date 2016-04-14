import React from "react";
import appRouter from "./router";
import api from "./api";
import App from "./app";

let rootPath = BASE_URL.slice(-1) === "/" ? BASE_URL.slice(0, -1) : BASE_URL;
rootPath = rootPath.split("/");
rootPath = rootPath[rootPath.length - 1];
const ROOT = '/' + rootPath;
api.docroot = ROOT;

appRouter.history.start({
	root: ROOT
});


api.getConfig((config) => {
	let [lang, controller, id, activeTab, annotationId] = appRouter.history.fragment.split("/");
	if(controller === "entry") { controller = "document"; }
	let presetThemes = appRouter.history.fragment.match(/\?themes=/) ?
		appRouter.history.fragment.replace(/.*\?themes=/, "").split("|") :
		null;

	React.render(
		<App
			activeTab={activeTab || "transcription"}
			annotationId={annotationId} config={config}
			controller={controller}
			id={id} language={lang}
			presetThemes={presetThemes}
		/>, document.body
	);
});
