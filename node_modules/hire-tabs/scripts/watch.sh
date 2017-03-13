#!/bin/sh

node_modules/.bin/watchify src/index.js \
	--detect-globals false \
	--extension=.jsx \
	--external classnames \
	--external react \
	--outfile 'node_modules/.bin/derequire > build/index.js' \
	--standalone HireTabs \
	--transform [ babelify --plugins object-assign ] \
	--verbose