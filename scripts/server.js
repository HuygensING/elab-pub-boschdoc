#!/usr/bin/env node

var browserSync = require("browser-sync").create();
var modRewrite = require("connect-modrewrite");
var debounce = require("lodash.debounce");
var proxy = require("proxy-middleware");
var url = require('url');

var baseDir = "./build";
var watchFiles = [
	baseDir + "/js/*.js",
	baseDir + "/css/*.css",
	baseDir + "/img/*.png",
	baseDir + "/index.html"
];

var onFilesChanged = function(event, file) {
	if (event === "change") {
		browserSync.reload(file);
	}
};

browserSync.watch(watchFiles, debounce(onFilesChanged, 300));

var proxyOptions = url.parse("http://boschdoc.huygens.knaw.nl/draft/data");
proxyOptions.route = "/draft/data";

browserSync.init({
	server: {
		baseDir: baseDir,
		middleware: [
			proxy(proxyOptions),
			modRewrite([
				"^/draft/img/(.*)$ /img/$1 [L]",
				"^/draft/css/(.*)$ /css/$1 [L]",
				"^/draft/js/(.*).js$ /js/$1.js [L]",
				"^/draft/?.*$ /index.html [L]"
			]), function(req, res, next) {
				if(req.originalUrl.match(/\.json$/)) {
					res.setHeader('Access-Control-Allow-Origin', '*');
					res.setHeader('Content-type', 'application/json; charset=utf-8');
				}
			next();
		}]
	}
});
